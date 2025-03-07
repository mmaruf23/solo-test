package com.solo.ecommerce.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;

import java.util.List;

/**
 *
 * @param <T>
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaginatedResponse<T> {
    private int status;
    private List<T> data;
    private int totalPage;
    private int currentPage;
    private int size;
    private long totalElements;

    public PaginatedResponse(int status, Page<T> page) {
        this.status = status;
        this.data = page.getContent();
        this.totalPage = page.getTotalPages();
        this.currentPage = page.getNumber() + 1; // biar nggak mulai dari nol banget
        this.size = page.getSize();
        this.totalElements = page.getTotalElements();
    }
}
