package com.bitcamp.web.domain;

import lombok.Data;

@Data
public class CategoryDTO {
    private String categoryId,
                    categoryName,
                    description;
}