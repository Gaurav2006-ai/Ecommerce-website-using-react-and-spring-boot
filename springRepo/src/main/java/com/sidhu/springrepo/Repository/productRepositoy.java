package com.sidhu.springrepo.Repository;

import com.sidhu.springrepo.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface productRepositoy extends JpaRepository<Product,Integer> {

    @Query("""
            SELECT p FROM Product p WHERE
                    lower(p.name) LIKE lower(concat('%', :keyword, '%')) OR 
                    lower(p.Description) LIKE lower(concat('%', :keyword, '%')) OR 
                    lower(p.brand) LIKE lower(concat('%', :keyword, '%')) OR 
                    lower(p.category) LIKE lower(concat('%', :keyword, '%'))
                """)
    public List<Product> searchProductBy(String keyword);

}
