package com.bitcamp.web.domain;

import lombok.Data;

@Data
public class OrderDTO {
    private String order_id,
                    customer_id,
                    employee_id,
                    order_date,
                    shipper_id;
}