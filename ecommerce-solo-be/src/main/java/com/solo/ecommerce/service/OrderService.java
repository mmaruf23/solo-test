package com.solo.ecommerce.service;

import com.solo.ecommerce.dto.response.OrderResponse;
import com.solo.ecommerce.exception.DataNotFoundException;
import com.solo.ecommerce.model.*;
import com.solo.ecommerce.repository.*;
import com.solo.ecommerce.util.ConvertToResponse;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private OrderItemsRepository orderItemsRepository;
    @Autowired
    private OrderHistoryRepository orderHistoryRepository;
    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private CartItemsRepository cartItemsRepository;
    @Autowired
    private ProductRepository productRepository;


    public OrderResponse checkoutCart(User user) {
        Cart cart = cartRepository.findByUser(user).orElseThrow(() -> new DataNotFoundException("Cart not found for user"));
        if (cart.getCartItems().isEmpty()) {
            throw new DataNotFoundException("Cart is empty, cannot checkout");
        }

        Order order = new Order();
        order.setUser(user);
        order.setTotalPrice(cart.getCartItems().stream()
                .mapToDouble(item -> item.getProduct().getPrice() * item.getQty()).sum());
        order.setStatus(Status.PENDING);
        order = orderRepository.save(order);


        List<OrderItem> orderItems = new ArrayList<>();
        for (CartItem item : cart.getCartItems()) {
            if (item.getProduct().getStock() < item.getQty()) throw new DataIntegrityViolationException("Stok tidak cukup!");

            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setProduct(item.getProduct());
            orderItem.setProductName(item.getProduct().getName());
            orderItem.setProductPrice(item.getProduct().getPrice());
            orderItem.setQty(item.getQty());
            orderItems.add(orderItem);
        }


        for (OrderItem orderItem : orderItems) {
            Product product = orderItem.getProduct();
            product.setStock(product.getStock() - orderItem.getQty());
            productRepository.save(product);
        }


        orderItemsRepository.saveAll(orderItems);
        order.setOrderItems(orderItems);
        order = orderRepository.save(order);

        cartItemsRepository.deleteAll(cart.getCartItems());
        cartRepository.delete(cart);


        OrderHistory history = new OrderHistory();
        history.setOrder(order);
        history.setStatus(Status.PENDING);
        history.setChangeAt(LocalDateTime.now());
        orderHistoryRepository.save(history);

        return ConvertToResponse.orderToResponse(order);
    }

    @Transactional
    public OrderResponse updateOrderStatus(Long OrderId, Status newStatus) {
        Order order = orderRepository.findById(OrderId).orElseThrow(() -> new DataNotFoundException("Order not found"));

        if (order.getStatus() == newStatus) throw new IllegalStateException("Status tidak berubah");

        OrderHistory orderHistory = new OrderHistory();
        orderHistory.setOrder(order);
        orderHistory.setStatus(newStatus);
        orderHistory.setChangeAt(LocalDateTime.now());
        orderHistoryRepository.save(orderHistory);

        order.setStatus(newStatus);
        Order updatedOrder = orderRepository.save(order);
        return ConvertToResponse.orderToResponse(updatedOrder);
    }

    public OrderResponse cancelOrder(User user, Long orderId) {
        Order order = orderRepository.findByUserAndId(user,orderId).orElseThrow(() -> new DataNotFoundException("Order not found"));
        if (order.getStatus() == Status.SHIPPED || order.getStatus() == Status.DELIVERED) {
            throw new IllegalStateException("Cannot cancel order that has shipped or delivered");
        }
        if (order.getStatus() == Status.CANCELED) {
            throw new IllegalStateException("Order already canceled");
        }
        order.setStatus(Status.CANCELED);
        Order updatedOrder = orderRepository.save(order);
        return ConvertToResponse.orderToResponse(updatedOrder);
    }

    public List<OrderHistory> getOrderHistory(Long orderId) {
        Order order = orderRepository.findById(orderId).orElseThrow(() -> new DataNotFoundException("Order not found"));
        return orderHistoryRepository.findByOrder(order);
    }


    public List<OrderResponse> getAllOrder() {
        List<Order> orders = orderRepository.findAll();
        return orders.stream().map(ConvertToResponse::orderToResponse).toList();
    }
    public List<OrderHistory> getAllOrderHistory() {
        return orderHistoryRepository.findAll();
    }

    public OrderResponse getOrderById(User user, Long id) {
        Order order = orderRepository.findById(id).orElseThrow(() -> new DataNotFoundException("Order not found"));

        if (!order.getUser().equals(user) && !user.getRole().equals(Role.ADMIN)) throw new AccessDeniedException("Order not found");

        return ConvertToResponse.orderToResponse(order);
    }

    public List<OrderResponse> getOrdersByStatus(Status status) {
        List<Order> orders = orderRepository.findByStatus(status);
        return orders.stream().map(ConvertToResponse::orderToResponse).toList();
    }

    public List<Order> getOrdersByUser(User user) {
        return orderRepository.findByUser(user);
    }
}
