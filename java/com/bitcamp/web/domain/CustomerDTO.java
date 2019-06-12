package com.bitcamp.web.domain;

import lombok.Data;

@Data
public class CustomerDTO {
    private String customer_id,
                    customer_name,
                    password,
                    ssn,
                    phone,
                    city,
                    address,
                    postalcode,
                    photo;
}