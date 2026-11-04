package com.sba301.fuminihotel;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Lớp khởi chạy ứng dụng FUMiniHotel Management System.
 * Assignment 03 - SBA301: Securing REST Services with Spring Boot
 * Sinh viên: Lam Dang Ky Anh - SE1910
 */
@SpringBootApplication
public class A3LamDangKyAnhSe1910Application {

    public static void main(String[] args) {
        // Khởi động Spring Boot Application context và embedded Tomcat container
        SpringApplication.run(A3LamDangKyAnhSe1910Application.class, args);
    }
}

