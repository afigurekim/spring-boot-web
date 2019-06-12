package com.bitcamp.web.domain;

import lombok.Data;

@Data
public class OrderDTO {
    private String orderId,
                    customerId,
                    employeeId,
                    orderDate,
                    shipperId;
}