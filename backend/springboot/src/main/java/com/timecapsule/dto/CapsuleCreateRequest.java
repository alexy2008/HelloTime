package com.timecapsule.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CapsuleCreateRequest {
    
    @NotBlank(message = "标题不能为空")
    @Size(min = 1, max = 100, message = "标题长度必须在1-100个字符之间")
    private String title;
    
    @NotBlank(message = "内容不能为空")
    @Size(min = 1, max = 10000, message = "内容长度必须在1-10000个字符之间")
    private String content;
    
    @NotNull(message = "开启时间不能为空")
    private LocalDateTime openTime;
    
    @NotBlank(message = "发布者昵称不能为空")
    @Size(min = 1, max = 50, message = "昵称长度必须在1-50个字符之间")
    private String creatorNickname;
}
