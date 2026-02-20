package com.timecapsule.service;

import com.timecapsule.dto.CapsuleCreateRequest;
import com.timecapsule.dto.CapsuleResponse;
import com.timecapsule.dto.PageResponse;
import com.timecapsule.exception.BusinessException;
import com.timecapsule.exception.ErrorCode;
import com.timecapsule.model.Capsule;
import com.timecapsule.repository.CapsuleRepository;
import com.timecapsule.util.CapsuleCodeGenerator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class CapsuleService {
    
    private final CapsuleRepository capsuleRepository;
    private final CapsuleCodeGenerator codeGenerator;
    
    /**
     * 创建新的时间胶囊
     */
    public CapsuleResponse createCapsule(CapsuleCreateRequest request) {
        log.info("开始创建胶囊: title={}", request.getTitle());
        
        // 验证开启时间必须是未来时间
        if (request.getOpenTime().isBefore(LocalDateTime.now())) {
            throw new BusinessException(ErrorCode.INVALID_OPEN_TIME, "开启时间必须是未来的时间");
        }
        
        // 生成唯一的胶囊码
        String capsuleCode;
        int attempts = 0;
        do {
            capsuleCode = codeGenerator.generateCode();
            attempts++;
            if (attempts > 10) {
                throw new BusinessException(ErrorCode.INTERNAL_ERROR, "生成胶囊码失败，请稍后重试");
            }
        } while (capsuleRepository.existsByCapsuleCode(capsuleCode));
        
        // 创建胶囊实体
        Capsule capsule = new Capsule();
        capsule.setCapsuleCode(capsuleCode);
        capsule.setTitle(request.getTitle());
        capsule.setContent(request.getContent());
        capsule.setOpenTime(request.getOpenTime());
        capsule.setCreatorNickname(request.getCreatorNickname());
        capsule.setIsDeleted(false);
        
        // 保存到数据库
        Capsule savedCapsule = capsuleRepository.save(capsule);
        log.info("胶囊创建成功: id={}, code={}", savedCapsule.getId(), savedCapsule.getCapsuleCode());
        
        return CapsuleResponse.fromEntity(savedCapsule, false);
    }
    
    /**
     * 根据胶囊码获取胶囊信息
     */
    @Transactional(readOnly = true)
    public CapsuleResponse getCapsuleByCode(String capsuleCode) {
        log.info("查询胶囊: code={}", capsuleCode);
        
        Capsule capsule = capsuleRepository.findByCapsuleCodeAndNotDeleted(capsuleCode)
                .orElseThrow(() -> new BusinessException(ErrorCode.CAPSULE_NOT_FOUND, 
                    "未找到该胶囊，请检查胶囊码是否正确"));
        
        return CapsuleResponse.fromEntity(capsule, true);
    }
    
    /**
     * 根据胶囊码删除胶囊（管理员功能）
     */
    public CapsuleResponse deleteCapsuleByCode(@NonNull String capsuleCode) {
        log.info("删除胶囊: code={}", capsuleCode);
        
        Capsule capsule = capsuleRepository.findByCapsuleCodeAndNotDeleted(capsuleCode)
                .orElseThrow(() -> new BusinessException(ErrorCode.CAPSULE_NOT_FOUND, "未找到该胶囊"));
        
        capsule.setIsDeleted(true);
        capsuleRepository.save(capsule);
        
        CapsuleResponse response = new CapsuleResponse();
        response.setCapsuleCode(capsuleCode);
        response.setCreatedAt(LocalDateTime.now());
        return response;
    }
    
    /**
     * 获取所有未删除的胶囊（管理员使用）- 分页
     */
    @Transactional(readOnly = true)
    public PageResponse<CapsuleResponse> getAllCapsules(int page, int size, String sort) {
        log.info("获取所有胶囊列表: page={}, size={}, sort={}", page, size, sort);
        
        // 解析排序参数，映射 createdAt -> createTime
        Sort sorting = Sort.by(Sort.Direction.DESC, "createTime");
        if (sort != null && !sort.isEmpty()) {
            String[] parts = sort.split(",");
            if (parts.length == 2) {
                Sort.Direction direction = "asc".equalsIgnoreCase(parts[1]) 
                    ? Sort.Direction.ASC : Sort.Direction.DESC;
                String field = parts[0];
                // 映射 createdAt -> createTime
                if ("createdAt".equals(field)) {
                    field = "createTime";
                }
                sorting = Sort.by(direction, field);
            }
        }
        
        Pageable pageable = PageRequest.of(page - 1, Math.min(size, 100), sorting);
        Page<Capsule> capsulePage = capsuleRepository.findAllNotDeleted(pageable);
        
        List<CapsuleResponse> items = capsulePage.getContent().stream()
                .map(capsule -> CapsuleResponse.fromEntity(capsule, true))
                .collect(Collectors.toList());
        
        PageResponse.Pagination pagination = new PageResponse.Pagination(
            capsulePage.getNumber() + 1,
            capsulePage.getSize(),
            capsulePage.getTotalElements(),
            capsulePage.getTotalPages()
        );
        
        return new PageResponse<>(items, pagination);
    }
    
    /**
     * 检查胶囊码格式是否正确
     */
    public boolean isValidCapsuleCode(String capsuleCode) {
        return capsuleCode != null && capsuleCode.matches("^[A-Z0-9]{8}$");
    }
}
