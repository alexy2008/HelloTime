package com.timecapsule.controller;

import com.timecapsule.dto.AboutResponse;
import com.timecapsule.dto.ApiResponse;
import com.timecapsule.dto.HealthResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Slf4j
@Tag(name = "系统信息", description = "系统信息和健康检查接口")
public class SystemController {
    
    /**
     * 获取应用信息
     */
    @Operation(summary = "获取应用信息", description = "获取应用的基本信息和版本")
    @GetMapping("/about")
    public ResponseEntity<ApiResponse<AboutResponse>> getAbout() {
        log.info("获取应用信息");
        AboutResponse response = new AboutResponse();
        return ResponseEntity.ok(ApiResponse.success("获取成功", response));
    }
    
    /**
     * 健康检查
     */
    @Operation(summary = "健康检查", description = "检查服务是否正常运行")
    @GetMapping("/health")
    public ResponseEntity<ApiResponse<HealthResponse>> getHealth() {
        log.info("健康检查");
        HealthResponse response = new HealthResponse();
        return ResponseEntity.ok(ApiResponse.success(response));
    }
}
