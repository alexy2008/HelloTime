package com.timecapsule.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "capsules")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Capsule {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "capsule_code", unique = true, nullable = false, length = 8)
    private String capsuleCode;
    
    @Column(nullable = false, length = 100)
    private String title;
    
    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;
    
    @Column(name = "open_time", nullable = false)
    private LocalDateTime openTime;
    
    @Column(length = 50)
    private String author;
    
    @CreationTimestamp
    @Column(name = "create_time")
    private LocalDateTime createTime;
    
    @Column(name = "is_deleted", nullable = false)
    private Boolean isDeleted = false;
    
    /**
     * 检查胶囊是否已到开启时间
     */
    public boolean isOpen() {
        return LocalDateTime.now().isAfter(this.openTime) || 
               LocalDateTime.now().isEqual(this.openTime);
    }
}