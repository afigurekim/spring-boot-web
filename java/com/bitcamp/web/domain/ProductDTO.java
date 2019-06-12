package com.bitcamp.web.domain;

import lombok.Data;

@Data
public class ProductDTO {
    private String productId,
                    productName,
                    supplierId,
                    categoryId,
                    unit,
                    price,
                    photo;
}