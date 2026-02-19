package com.timecapsule.controller;

import com.timecapsule.dto.AdminLoginRequest;
import com.timecapsule.dto.ApiResponse;
import com.timecapsule.dto.CapsuleResponse;
import com.timecapsule.dto.JwtResponse;
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

import java.util.List;

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
     * 获取所有胶囊（需要管理员权限）
     */
    @Operation(summary = "获取所有胶囊", description = "获取所有胶囊列表，需要Bearer Token认证")
    @GetMapping("/capsules")
    public ResponseEntity<ApiResponse<List<CapsuleResponse>>> getAllCapsules(
            HttpServletRequest request) {
        log.info("获取所有胶囊列表");
        
        // 验证管理员权限
        String token = extractToken(request);
        if (token == null || !adminService.validateToken(token)) {
            return ResponseEntity.status(401)
                    .body(ApiResponse.error(401, "未授权访问"));
        }
        
        List<CapsuleResponse> capsules = capsuleService.getAllCapsules();
        return ResponseEntity.ok(ApiResponse.success(capsules));
    }
    
    /**
     * 删除胶囊（需要管理员权限）
     */
    @Operation(summary = "删除胶囊", description = "根据ID删除胶囊，需要Bearer Token认证")
    @DeleteMapping("/capsules/{id}")
    public ResponseEntity<ApiResponse<Object>> deleteCapsule(
            @Parameter(description = "胶囊ID", example = "1")
            @PathVariable Long id,
            HttpServletRequest request) {
        log.info("删除胶囊请求: id={}", id);
        
        // 验证ID参数
        if (id == null) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error(400, "ID参数不能为空"));
        }
        
        // 验证管理员权限
        String token = extractToken(request);
        if (token == null || !adminService.validateToken(token)) {
            return ResponseEntity.status(401)
                    .body(ApiResponse.error(401, "未授权访问"));
        }
        
        capsuleService.deleteCapsule(id);
        return ResponseEntity.ok(ApiResponse.success("删除成功", null));
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