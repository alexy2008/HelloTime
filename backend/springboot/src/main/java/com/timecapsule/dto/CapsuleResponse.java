package com.timecapsule.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CapsuleResponse {
    
    private Long id;
    private String capsuleCode;
    private String title;
    private String content;
    private String creatorNickname;
    private Boolean canOpen;
    private TimeRemaining timeRemaining;
    
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss'Z'", timezone = "UTC")
    private LocalDateTime openTime;
    
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss'Z'", timezone = "UTC")
    private LocalDateTime createdAt;
    
    @Data
    public static class TimeRemaining {
        private long days;
        private long hours;
        private long minutes;
        
        public TimeRemaining(long totalSeconds) {
            this.days = totalSeconds / 86400;
            this.hours = (totalSeconds % 86400) / 3600;
            this.minutes = (totalSeconds % 3600) / 60;
        }
    }
    
    public static CapsuleResponse fromEntity(com.timecapsule.model.Capsule capsule, boolean includeContent) {
        CapsuleResponse response = new CapsuleResponse();
        response.setId(capsule.getId());
        response.setCapsuleCode(capsule.getCapsuleCode());
        response.setTitle(capsule.getTitle());
        response.setCreatorNickname(capsule.getCreatorNickname());
        response.setOpenTime(capsule.getOpenTime());
        response.setCreatedAt(capsule.getCreateTime());
        
        boolean canOpen = capsule.canOpen();
        response.setCanOpen(canOpen);
        
        // 只有可开启时才返回内容
        if (canOpen && includeContent) {
            response.setContent(capsule.getContent());
        }
        
        // 未开启时计算剩余时间
        if (!canOpen) {
            long remainingSeconds = java.time.Duration.between(
                LocalDateTime.now(), 
                capsule.getOpenTime()
            ).getSeconds();
            if (remainingSeconds > 0) {
                response.setTimeRemaining(new TimeRemaining(remainingSeconds));
            }
        }
        
        return response;
    }
    
    public static CapsuleResponse fromEntity(com.timecapsule.model.Capsule capsule) {
        return fromEntity(capsule, true);
    }
}
