package com.timecapsule.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum ErrorCode {
    
    CAPSULE_NOT_FOUND("CAPSULE_NOT_FOUND", "未找到该胶囊", HttpStatus.NOT_FOUND),
    INVALID_CAPSULE_CODE("INVALID_CAPSULE_CODE", "无效的胶囊码", HttpStatus.BAD_REQUEST),
    INVALID_OPEN_TIME("INVALID_OPEN_TIME", "开启时间必须是未来时间", HttpStatus.BAD_REQUEST),
    CONTENT_TOO_LONG("CONTENT_TOO_LONG", "内容超过长度限制", HttpStatus.BAD_REQUEST),
    UNAUTHORIZED("UNAUTHORIZED", "未授权访问", HttpStatus.UNAUTHORIZED),
    INVALID_PASSWORD("INVALID_PASSWORD", "密码错误", HttpStatus.UNAUTHORIZED),
    VALIDATION_ERROR("VALIDATION_ERROR", "数据验证失败", HttpStatus.BAD_REQUEST),
    INTERNAL_ERROR("INTERNAL_ERROR", "服务器内部错误", HttpStatus.INTERNAL_SERVER_ERROR);
    
    private final String code;
    private final String message;
    private final HttpStatus httpStatus;
    
    ErrorCode(String code, String message, HttpStatus httpStatus) {
        this.code = code;
        this.message = message;
        this.httpStatus = httpStatus;
    }
}
