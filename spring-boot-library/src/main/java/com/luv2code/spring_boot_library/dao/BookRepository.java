package com.luv2code.spring_boot_library.dao;

import com.luv2code.spring_boot_library.entity.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;

@Repository
public interface BookRepository extends JpaRepository<Book,Long> {
    //To enable Search in API /
    Page<Book> findByTitleContaining(String title, Pageable pageable);
    Page<Book>findByCategory(String category,Pageable pageable);
}
