package com.bitcamp.web.mapper;

import java.util.List;
import java.util.Map;

import com.bitcamp.web.domain.CustomerDTO;

import org.springframework.stereotype.Repository;

@Repository
public interface CustomerMapper {
    public void insertCustomer(CustomerDTO customer);
    public List<CustomerDTO> selectCustomers(Map<?,?> param);
    public List<CustomerDTO> selectCustomersByOption(CustomerDTO option);
    public CustomerDTO selectCustomerById(String customerId);
    public int updateCustomer(CustomerDTO customer);
    public void deleteCustomer(CustomerDTO customer);
    public int selectCount();
    public CustomerDTO login(CustomerDTO customer);
}