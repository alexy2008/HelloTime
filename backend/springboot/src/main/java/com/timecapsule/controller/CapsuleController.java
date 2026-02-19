package com.timecapsule.controller;

import com.timecapsule.dto.ApiResponse;
import com.timecapsule.dto.CapsuleCreateRequest;
import com.timecapsule.dto.CapsuleResponse;
import com.timecapsule.service.CapsuleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/capsules")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "胶囊管理", description = "胶囊的创建和查询接口")
public class CapsuleController {
    
    private final CapsuleService capsuleService;
    
    /**
     * 创建时间胶囊
     */
    @Operation(summary = "创建胶囊", description = "创建一个新的时间胶囊，返回8位胶囊码")
    @PostMapping
    public ResponseEntity<ApiResponse<CapsuleResponse>> createCapsule(
            @Valid @RequestBody CapsuleCreateRequest request) {
        log.info("收到创建胶囊请求: title={}", request.getTitle());
        
        CapsuleResponse response = capsuleService.createCapsule(request);
        return ResponseEntity.ok(ApiResponse.success("胶囊创建成功", response));
    }
    
    /**
     * 根据胶囊码获取胶囊信息
     */
    @Operation(summary = "获取胶囊", description = "根据胶囊码获取胶囊信息，未到开启时间不返回内容")
    @GetMapping("/{capsuleCode}")
    public ResponseEntity<ApiResponse<CapsuleResponse>> getCapsule(
            @Parameter(description = "8位胶囊码", example = "ABC123DE")
            @PathVariable String capsuleCode) {
        log.info("收到查询胶囊请求: code={}", capsuleCode);
        
        // 验证胶囊码格式
        if (!capsuleService.isValidCapsuleCode(capsuleCode)) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error(400, "胶囊码格式不正确"));
        }
        
        CapsuleResponse response = capsuleService.getCapsuleByCode(capsuleCode);
        return ResponseEntity.ok(ApiResponse.success(response));
    }
    
    /**
     * 获取胶囊状态信息（不包含内容）
     */
    @Operation(summary = "获取胶囊状态", description = "获取胶囊的基本状态信息，不包含内容")
    @GetMapping("/{capsuleCode}/status")
    public ResponseEntity<ApiResponse<CapsuleResponse>> getCapsuleStatus(
            @Parameter(description = "8位胶囊码", example = "ABC123DE")
            @PathVariable String capsuleCode) {
        log.info("收到查询胶囊状态请求: code={}", capsuleCode);
        
        // 验证胶囊码格式
        if (!capsuleService.isValidCapsuleCode(capsuleCode)) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error(400, "胶囊码格式不正确"));
        }
        
        CapsuleResponse response = capsuleService.getCapsuleStatus(capsuleCode);
        return ResponseEntity.ok(ApiResponse.success(response));
    }
}