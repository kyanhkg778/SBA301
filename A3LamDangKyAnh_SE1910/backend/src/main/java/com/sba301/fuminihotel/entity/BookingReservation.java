package com.sba301.fuminihotel.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "BookingReservation")
public class BookingReservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "BookingReservationID")
    private Long bookingReservationId;

    @Column(name = "BookingDate", nullable = false)
    private LocalDate bookingDate = LocalDate.now();

    @Column(name = "TotalPrice", precision = 18, scale = 2, nullable = false)
    private BigDecimal totalPrice;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "CustomerID", nullable = false)
    @JsonIgnoreProperties({"bookingReservations", "password"})
    private Customer customer;

    // 1: Confirmed, 2: Completed, 0: Cancelled
    @Column(name = "BookingStatus", nullable = false)
    private Integer bookingStatus = 1;

    // Danh sách các phòng trong đơn đặt phòng
    @OneToMany(mappedBy = "bookingReservation", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JsonIgnoreProperties("bookingReservation")
    private List<BookingDetail> bookingDetails = new ArrayList<>();

    public BookingReservation() {
    }

    public BookingReservation(LocalDate bookingDate, BigDecimal totalPrice, Customer customer, Integer bookingStatus) {
        this.bookingDate = bookingDate;
        this.totalPrice = totalPrice;
        this.customer = customer;
        this.bookingStatus = bookingStatus;
    }

    public Long getBookingReservationId() {
        return bookingReservationId;
    }

    public void setBookingReservationId(Long bookingReservationId) {
        this.bookingReservationId = bookingReservationId;
    }

    public LocalDate getBookingDate() {
        return bookingDate;
    }

    public void setBookingDate(LocalDate bookingDate) {
        this.bookingDate = bookingDate;
    }

    public BigDecimal getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(BigDecimal totalPrice) {
        this.totalPrice = totalPrice;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Integer getBookingStatus() {
        return bookingStatus;
    }

    public void setBookingStatus(Integer bookingStatus) {
        this.bookingStatus = bookingStatus;
    }

    public List<BookingDetail> getBookingDetails() {
        return bookingDetails;
    }

    public void setBookingDetails(List<BookingDetail> bookingDetails) {
        this.bookingDetails = bookingDetails;
    }

    public void addBookingDetail(BookingDetail detail) {
        bookingDetails.add(detail);
        detail.setBookingReservation(this);
    }
}
