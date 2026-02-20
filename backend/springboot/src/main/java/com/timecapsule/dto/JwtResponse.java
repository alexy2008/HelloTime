package com.timecapsule.dto;

import lombok.Data;

@Data
public class JwtResponse {
    
    private String token;
    private String type = "Bearer";
    private Long expiresIn;
    
    public JwtResponse(String token) {
        this.token = token;
    }
    
    public JwtResponse(String token, Long expiresIn) {
        this.token = token;
        this.expiresIn = expiresIn;
    }
}
