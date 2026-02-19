package com.timecapsule.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CapsuleCreateRequest {
    
    @NotBlank(message = "标题不能为空")
    @Size(max = 100, message = "标题长度不能超过100个字符")
    private String title;
    
    @NotBlank(message = "内容不能为空")
    @Size(max = 1000, message = "内容长度不能超过1000个字符")
    private String content;
    
    @NotNull(message = "开启时间不能为空")
    private LocalDateTime openTime;
    
    @Size(max = 50, message = "作者名称长度不能超过50个字符")
    private String author;
}