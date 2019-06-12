package com.bitcamp.web.domain;

import lombok.Data;

@Data
public class ProductDTO {
    private String product_id,
                    product_name,
                    supplier_id,
                    category_id,
                    unit,
                    price,
                    photo;
}