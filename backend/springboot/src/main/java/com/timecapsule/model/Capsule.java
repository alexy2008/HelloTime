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
    
    @Column(name = "creator_nickname", length = 50)
    private String creatorNickname;
    
    @CreationTimestamp
    @Column(name = "create_time")
    private LocalDateTime createTime;
    
    @Column(name = "is_deleted", nullable = false)
    private Boolean isDeleted = false;
    
    /**
     * 检查胶囊是否已到开启时间
     */
    public boolean canOpen() {
        return !LocalDateTime.now().isBefore(this.openTime);
    }
    
    // 向后兼容
    public boolean isOpen() {
        return canOpen();
    }
    
    // 向后兼容
    public String getAuthor() {
        return creatorNickname;
    }
    
    // 向后兼容
    public void setAuthor(String author) {
        this.creatorNickname = author;
    }
}
