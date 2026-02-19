package com.timecapsule.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CapsuleResponse {
    
    private Long id;
    private String capsuleCode;
    private String title;
    private String content;
    private String author;
    
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private LocalDateTime openTime;
    
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private LocalDateTime createTime;
    
    private Boolean isOpen;
    
    public static CapsuleResponse fromEntity(com.timecapsule.model.Capsule capsule) {
        CapsuleResponse response = new CapsuleResponse();
        response.setId(capsule.getId());
        response.setCapsuleCode(capsule.getCapsuleCode());
        response.setTitle(capsule.getTitle());
        response.setContent(capsule.getContent());
        response.setAuthor(capsule.getAuthor());
        response.setOpenTime(capsule.getOpenTime());
        response.setCreateTime(capsule.getCreateTime());
        response.setIsOpen(capsule.isOpen());
        return response;
    }
}