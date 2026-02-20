package com.timecapsule.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class HealthResponse {
    
    private String status = "UP";
    
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss'Z'", timezone = "UTC")
    private LocalDateTime timestamp;
    
    private String database = "UP";
    private String diskSpace = "UP";
    
    public HealthResponse() {
        this.timestamp = LocalDateTime.now();
    }
}
