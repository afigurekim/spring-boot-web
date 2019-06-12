package com.bitcamp.web.domain;

import lombok.Data;

@Data
public class EmployeeDTO {
    private String employee_id,
                    manager,
                    name,
                    birth_date,
                    photo,
                    notes;
}