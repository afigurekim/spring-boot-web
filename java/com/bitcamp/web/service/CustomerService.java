package com.bitcamp.web.service;

import java.util.List;
import java.util.Map;

import com.bitcamp.web.domain.CustomerDTO;

import org.springframework.stereotype.Component;

@Component
public interface CustomerService {
    public void addCustomer(CustomerDTO customer);
    public List<CustomerDTO> findCustomers(Map<?,?> param);
    public List<CustomerDTO> findCustomersByOption(CustomerDTO option);
    public CustomerDTO findCustomerById(String customerId);
    public int updateCustomer(CustomerDTO customer);
    public void deleteCustomer(CustomerDTO customer);
    public int countAll();
    public CustomerDTO login(CustomerDTO customer);
}