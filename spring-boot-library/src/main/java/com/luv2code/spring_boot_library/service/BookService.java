package com.luv2code.spring_boot_library.service;

import com.luv2code.spring_boot_library.dao.BookRepository;
import com.luv2code.spring_boot_library.entity.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

@Service
public class BookService {
    @Autowired
    private BookRepository bookRepository;

    public BookService(BookRepository bookRepository){
        this.bookRepository=bookRepository;
    }


    public Page<Book> getBooksPage(int page, int size){
        return bookRepository.findAll(PageRequest.of(page,size));
    }
//    public List<Book> getAllBooks(){
//        return bookRepository.findAll();
//    }

    public Book getBookById(Long id) {
        Optional<Book> result = bookRepository.findById(id);

        if (result.isPresent()) {
            return result.get();
        } else {
            throw new RuntimeException("Book not found with id: " + id);
        }
    }

    public Page<Book> searchForBook(String title, Pageable pageable){
        return bookRepository.findByTitleContaining(title,pageable);
    }

    public Page<Book>searchByCategory(String category,Pageable pageable ){
        return bookRepository.findByCategory(category,pageable);
    }

}
