package com.bitcamp.web.domain;

import lombok.Data;

@Data
public class EmployeeDTO {
    private String employeeId,
                    manager,
                    name,
                    birthDate,
                    photo,
                    notes;
}