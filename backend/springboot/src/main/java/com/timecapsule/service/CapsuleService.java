package com.timecapsule.service;

import com.timecapsule.dto.CapsuleCreateRequest;
import com.timecapsule.dto.CapsuleResponse;
import com.timecapsule.exception.BusinessException;
import com.timecapsule.model.Capsule;
import com.timecapsule.repository.CapsuleRepository;
import com.timecapsule.util.CapsuleCodeGenerator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
            throw new BusinessException("开启时间必须是未来时间");
        }
        
        // 生成唯一的胶囊码
        String capsuleCode;
        int attempts = 0;
        do {
            capsuleCode = codeGenerator.generateCode();
            attempts++;
            if (attempts > 10) {
                throw new BusinessException("生成胶囊码失败，请稍后重试");
            }
        } while (capsuleRepository.existsByCapsuleCode(capsuleCode));
        
        // 创建胶囊实体
        Capsule capsule = new Capsule();
        capsule.setCapsuleCode(capsuleCode);
        capsule.setTitle(request.getTitle());
        capsule.setContent(request.getContent());
        capsule.setOpenTime(request.getOpenTime());
        capsule.setAuthor(request.getAuthor());
        capsule.setIsDeleted(false);
        
        // 保存到数据库
        Capsule savedCapsule = capsuleRepository.save(capsule);
        log.info("胶囊创建成功: id={}, code={}", savedCapsule.getId(), savedCapsule.getCapsuleCode());
        
        return CapsuleResponse.fromEntity(savedCapsule);
    }
    
    /**
     * 根据胶囊码获取胶囊信息
     */
    @Transactional(readOnly = true)
    public CapsuleResponse getCapsuleByCode(String capsuleCode) {
        log.info("查询胶囊: code={}", capsuleCode);
        
        Capsule capsule = capsuleRepository.findByCapsuleCodeAndNotDeleted(capsuleCode)
                .orElseThrow(() -> new BusinessException("胶囊不存在或已被删除"));
        
        // 如果未到开启时间，隐藏内容
        if (!capsule.isOpen()) {
            capsule.setContent(null);
        }
        
        return CapsuleResponse.fromEntity(capsule);
    }
    
    /**
     * 获取胶囊状态信息（不包含内容）
     */
    @Transactional(readOnly = true)
    public CapsuleResponse getCapsuleStatus(String capsuleCode) {
        log.info("查询胶囊状态: code={}", capsuleCode);
        
        Capsule capsule = capsuleRepository.findByCapsuleCodeAndNotDeleted(capsuleCode)
                .orElseThrow(() -> new BusinessException("胶囊不存在或已被删除"));
        
        CapsuleResponse response = CapsuleResponse.fromEntity(capsule);
        response.setContent(null); // 不返回内容
        return response;
    }
    
    /**
     * 获取所有未删除的胶囊（管理员使用）
     */
    @Transactional(readOnly = true)
    public List<CapsuleResponse> getAllCapsules() {
        log.info("获取所有胶囊列表");
        
        List<Capsule> capsules = capsuleRepository.findAllNotDeleted();
        return capsules.stream()
                .map(CapsuleResponse::fromEntity)
                .collect(Collectors.toList());
    }
    
    /**
     * 删除胶囊（管理员功能）
     */
    public void deleteCapsule(@NonNull Long id) {
        log.info("删除胶囊: id={}", id);
        
        Capsule capsule = capsuleRepository.findById(id)
                .orElseThrow(() -> new BusinessException("胶囊不存在"));
        
        capsule.setIsDeleted(true);
        capsuleRepository.save(capsule);
        log.info("胶囊删除成功: id={}", id);
    }
    
    /**
     * 检查胶囊码格式是否正确
     */
    public boolean isValidCapsuleCode(String capsuleCode) {
        return capsuleCode != null && capsuleCode.matches("^[A-Z0-9]{8}$");
    }
}