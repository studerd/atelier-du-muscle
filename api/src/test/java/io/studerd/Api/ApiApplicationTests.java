package io.studerd.Api;

import io.studerd.api.common.service.EmailService;
import io.studerd.api.module.order.service.OrderService;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.UUID;
import java.util.logging.Level;
import java.util.logging.Logger;

@SpringBootTest

@RunWith(SpringRunner.class)
class ApiApplicationTests {
    private static final Logger logger = Logger.getLogger(ApiApplicationTests.class.getName());

    @Autowired
    EmailService service;
    @Autowired
    OrderService orderService;
    @Test
    void contextLoads() {

    }

}
