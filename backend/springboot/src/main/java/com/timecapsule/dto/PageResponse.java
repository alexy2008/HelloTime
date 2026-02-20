package com.timecapsule.dto;

import lombok.Data;

import java.util.List;

@Data
public class PageResponse<T> {
    
    private List<T> items;
    private Pagination pagination;
    
    public PageResponse(List<T> items, Pagination pagination) {
        this.items = items;
        this.pagination = pagination;
    }
    
    @Data
    public static class Pagination {
        private int currentPage;
        private int pageSize;
        private long totalItems;
        private int totalPages;
        
        public Pagination(int currentPage, int pageSize, long totalItems, int totalPages) {
            this.currentPage = currentPage;
            this.pageSize = pageSize;
            this.totalItems = totalItems;
            this.totalPages = totalPages;
        }
    }
}
