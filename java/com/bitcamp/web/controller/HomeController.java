package com.bitcamp.web.controller;

import com.bitcamp.web.common.util.Printer;
import com.bitcamp.web.service.CustomerService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {

    @Autowired CustomerService customerService;
    @Autowired Printer p;
    @RequestMapping("/")
    public String index() {
        p.accept("[lambda]루트 URL 경로로 들어옴");
        
        int count = customerService.countAll();
        p.accept("[lambda]고객의 총 인원 : " + count);

        return "index";
    }

}
