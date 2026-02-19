package com.timecapsule.service;

import com.timecapsule.dto.AdminLoginRequest;
import com.timecapsule.dto.JwtResponse;
import com.timecapsule.exception.BusinessException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;

@Service
@RequiredArgsConstructor
@Slf4j
public class AdminService {
    
    @Value("${admin.password}")
    private String adminPassword;
    
    @Value("${jwt.secret}")
    private String jwtSecret;
    
    @Value("${jwt.expiration}")
    private Long jwtExpiration;
    
    /**
     * 管理员登录
     */
    public JwtResponse login(AdminLoginRequest request) {
        log.info("管理员尝试登录");
        
        if (!adminPassword.equals(request.getPassword())) {
            throw new BusinessException("密码错误");
        }
        
        String token = generateToken();
        log.info("管理员登录成功");
        
        return new JwtResponse(token);
    }
    
    /**
     * 验证JWT token
     */
    public boolean validateToken(String token) {
        try {
            SecretKey key = Keys.hmacShaKeyFor(jwtSecret.getBytes());
            Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            log.warn("Token验证失败: {}", e.getMessage());
            return false;
        }
    }
    
    /**
     * 生成JWT token
     */
    private String generateToken() {
        SecretKey key = Keys.hmacShaKeyFor(jwtSecret.getBytes());
        Date expiryDate = new Date(System.currentTimeMillis() + jwtExpiration);
        
        return Jwts.builder()
                .setSubject("admin")
                .setIssuedAt(new Date())
                .setExpiration(expiryDate)
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();
    }
}