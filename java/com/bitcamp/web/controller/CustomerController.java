package com.bitcamp.web.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.bitcamp.web.domain.CustomerDTO;
import com.bitcamp.web.mapper.CustomerMapper;
import com.bitcamp.web.service.CustomerService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/customers")
public class CustomerController {

    @Autowired CustomerService customerService;
    @Autowired CustomerDTO customer;

    @PostMapping("")
    public HashMap<String,Object> join(@RequestBody CustomerDTO param) {
        customerService.addCustomer(param);
        HashMap<String, Object> map = new HashMap<>();
        map.put("result", "SUCCESS");
        return map;
    }

    @GetMapping("")
    public List<CustomerDTO> list() {
        List<CustomerDTO> list = new ArrayList<>();
        for (CustomerDTO customers : customerService.findCustomers()) {
            System.out.println(customers.getCustomerId()+" : "
                            +customers.getCustomerName()+" : "
                            +customers.getPassword()+" : "
                            +customers.getSsn()+" : "
                            +customers.getPhone()+" : "
                            +customers.getCity()+" : "
                            +customers.getAddress()+" : "
                            +customers.getPostalcode());
        }
        return list;
    }

    @GetMapping("/count")
    public String count() {
        System.out.println("CustomerController count() 경로로 들어옴");
        int count = customerService.countAll();
        System.out.println("고객의 총인원 : "+count);
        return count+"";
    }

    @GetMapping("/{customerId}/{password}")
    public CustomerDTO login(@PathVariable("customerId")String id, @PathVariable("password") String pass) {
        customer.setCustomerId(id);
        customer.setPassword(pass);
        return customerService.login(customer);
    }

    @GetMapping("/{customerId}")
    public CustomerDTO getCustomer(@PathVariable String customerId) {
        System.out.println("ID 검색 진입 : "+customerId);
        return customerService.findCustomerById(customerId);
    }

    @PutMapping("/{customerId}")
    public CustomerDTO updateCustomer(@RequestBody CustomerDTO customer) {
        int res = customerService.updateCustomer(customer);
        if(res == 1){
            customer = customerService.findCustomerById(customer.getCustomerId());
        }else{
            System.out.println("update 컨트롤러 실패");
        }
        return customer;
    }

    @DeleteMapping("/{customerId}")
    public HashMap<String, Object> deleteCustomer(@PathVariable String customerId) {
        customer.setCustomerId(customerId);
        customerService.deleteCustomer(customer);
        HashMap<String, Object> map = new HashMap<>();
        map.put("result", "SUCCESS");
        return map;
    }

}