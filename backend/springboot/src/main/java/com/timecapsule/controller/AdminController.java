package com.timecapsule.controller;

import com.timecapsule.dto.*;
import com.timecapsule.exception.BusinessException;
import com.timecapsule.exception.ErrorCode;
import com.timecapsule.service.AdminService;
import com.timecapsule.service.CapsuleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "管理员接口", description = "管理员登录和胶囊管理接口，需要Bearer Token认证")
public class AdminController {
    
    private final AdminService adminService;
    private final CapsuleService capsuleService;
    
    /**
     * 管理员登录
     */
    @Operation(summary = "管理员登录", description = "使用管理员密码登录，获取JWT Token")
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<JwtResponse>> login(
            @Valid @RequestBody AdminLoginRequest request) {
        log.info("管理员登录请求");
        
        JwtResponse response = adminService.login(request);
        return ResponseEntity.ok(ApiResponse.success("登录成功", response));
    }
    
    /**
     * 获取所有胶囊（需要管理员权限）- 分页
     */
    @Operation(summary = "获取所有胶囊", description = "获取所有胶囊列表，支持分页，需要Bearer Token认证")
    @GetMapping("/capsules")
    public ResponseEntity<ApiResponse<PageResponse<CapsuleResponse>>> getAllCapsules(
            @Parameter(description = "页码（从1开始）", example = "1")
            @RequestParam(defaultValue = "1") int page,
            @Parameter(description = "每页数量", example = "20")
            @RequestParam(defaultValue = "20") int size,
            @Parameter(description = "排序字段和方向", example = "createdAt,desc")
            @RequestParam(defaultValue = "createdAt,desc") String sort,
            HttpServletRequest request) {
        log.info("获取所有胶囊列表: page={}, size={}", page, size);
        
        // 验证管理员权限
        String token = extractToken(request);
        if (token == null || !adminService.validateToken(token)) {
            throw new BusinessException(ErrorCode.UNAUTHORIZED, "未授权访问");
        }
        
        PageResponse<CapsuleResponse> capsules = capsuleService.getAllCapsules(page, size, sort);
        return ResponseEntity.ok(ApiResponse.success("获取成功", capsules));
    }
    
    /**
     * 删除胶囊（需要管理员权限）
     */
    @Operation(summary = "删除胶囊", description = "根据胶囊码删除胶囊，需要Bearer Token认证")
    @DeleteMapping("/capsules/{capsuleCode}")
    public ResponseEntity<ApiResponse<CapsuleResponse>> deleteCapsule(
            @Parameter(description = "8位胶囊码", example = "A3X9K2M7")
            @PathVariable String capsuleCode,
            HttpServletRequest request) {
        log.info("删除胶囊请求: code={}", capsuleCode);
        
        // 验证管理员权限
        String token = extractToken(request);
        if (token == null || !adminService.validateToken(token)) {
            throw new BusinessException(ErrorCode.UNAUTHORIZED, "未授权访问");
        }
        
        // 验证胶囊码格式
        if (!capsuleService.isValidCapsuleCode(capsuleCode)) {
            throw new BusinessException(ErrorCode.INVALID_CAPSULE_CODE, "无效的胶囊码");
        }
        
        CapsuleResponse response = capsuleService.deleteCapsuleByCode(capsuleCode);
        return ResponseEntity.ok(ApiResponse.success("胶囊删除成功", response));
    }
    
    /**
     * 从请求头中提取JWT token
     */
    private String extractToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}
