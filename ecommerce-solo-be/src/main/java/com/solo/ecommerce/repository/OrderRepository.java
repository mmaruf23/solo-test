package com.solo.ecommerce.repository;

import com.solo.ecommerce.model.Order;
import com.solo.ecommerce.model.Status;
import com.solo.ecommerce.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUser(User user);
    Optional<Order> findByUserAndId(User user, Long id);
    List<Order> findByStatus(Status status);

}
