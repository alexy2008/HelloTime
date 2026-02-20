package com.timecapsule.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class AboutResponse {
    
    private String name = "Time Capsule";
    private String version = "1.0.0";
    private String description = "一个简洁优雅的时间胶囊应用";
    private String backend = "Spring Boot 3.2.0";
    private String database = "PostgreSQL 15";
    
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss'Z'", timezone = "UTC")
    private LocalDateTime buildTime;
    
    public AboutResponse() {
        this.buildTime = LocalDateTime.now();
    }
}
