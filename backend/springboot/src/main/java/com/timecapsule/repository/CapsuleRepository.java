package com.timecapsule.repository;

import com.timecapsule.model.Capsule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface CapsuleRepository extends JpaRepository<Capsule, Long> {
    
    /**
     * 根据胶囊码查找胶囊（排除已删除的）
     */
    @Query("SELECT c FROM Capsule c WHERE c.capsuleCode = ?1 AND c.isDeleted = false")
    Optional<Capsule> findByCapsuleCodeAndNotDeleted(String capsuleCode);
    
    /**
     * 查找所有未删除的胶囊
     */
    @Query("SELECT c FROM Capsule c WHERE c.isDeleted = false ORDER BY c.createTime DESC")
    List<Capsule> findAllNotDeleted();
    
    /**
     * 查找已到期可开启的胶囊（排除已删除的）
     */
    @Query("SELECT c FROM Capsule c WHERE c.openTime <= ?1 AND c.isDeleted = false")
    List<Capsule> findOpenableCapsules(LocalDateTime currentTime);
    
    /**
     * 检查胶囊码是否存在
     */
    boolean existsByCapsuleCode(String capsuleCode);
}