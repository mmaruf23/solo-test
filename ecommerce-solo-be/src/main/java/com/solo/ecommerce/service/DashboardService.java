package com.solo.ecommerce.service;

import com.solo.ecommerce.model.Order;
import com.solo.ecommerce.repository.OrderRepository;
import com.solo.ecommerce.repository.ProductRepository;
import com.solo.ecommerce.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class DashboardService {

    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ProductRepository productRepository;

    public Map<String, Long> countAll() {
        Map<String, Long> result = new HashMap<>();
        result.put("order", orderRepository.count());
        result.put("user", userRepository.count());
        result.put("product", productRepository.count());
        return result;
    }
}

