package com.bitcamp.web.domain;

import lombok.Data;

@Data
public class CategoryDTO {
    private String category_id,
                    category_name,
                    description;
}