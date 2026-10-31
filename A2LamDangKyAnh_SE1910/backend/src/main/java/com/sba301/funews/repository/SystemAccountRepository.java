package com.sba301.funews.repository;

import com.sba301.funews.entity.SystemAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SystemAccountRepository extends JpaRepository<SystemAccount, Short> {
    Optional<SystemAccount> findByAccountEmail(String email);
    Optional<SystemAccount> findByAccountEmailIgnoreCase(String email);
    boolean existsByAccountEmailIgnoreCase(String email);
    
    @Query("SELECT a FROM SystemAccount a WHERE " +
           "LOWER(a.accountName) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(a.accountEmail) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<SystemAccount> searchAccounts(@Param("query") String query);
}
