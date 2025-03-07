package com.solo.ecommerce.repository;

import com.solo.ecommerce.model.Order;
import com.solo.ecommerce.model.OrderHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderHistoryRepository extends JpaRepository<OrderHistory, Long> {
    List<OrderHistory> findByOrder(Order order);
}
