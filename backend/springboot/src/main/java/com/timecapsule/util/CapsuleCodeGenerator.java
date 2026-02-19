package com.timecapsule.util;

import org.springframework.stereotype.Component;

import java.util.Random;

@Component
public class CapsuleCodeGenerator {
    
    private static final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    private static final int CODE_LENGTH = 8;
    private final Random random = new Random();
    
    /**
     * 生成8位随机胶囊码
     */
    public String generateCode() {
        StringBuilder code = new StringBuilder();
        for (int i = 0; i < CODE_LENGTH; i++) {
            code.append(CHARACTERS.charAt(random.nextInt(CHARACTERS.length())));
        }
        return code.toString();
    }
}