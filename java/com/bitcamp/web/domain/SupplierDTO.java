package com.bitcamp.web.domain;

import lombok.Data;

@Data
public class SupplierDTO {
    private String supplier_id,
                    supplier_name,
                    contact_name,
                    address,
                    city,
                    postal_code,
                    country,
                    phone;
}