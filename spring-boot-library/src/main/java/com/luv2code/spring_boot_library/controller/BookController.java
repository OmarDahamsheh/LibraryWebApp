package com.luv2code.spring_boot_library.controller;

import com.luv2code.spring_boot_library.entity.Book;
import com.luv2code.spring_boot_library.service.BookService;
import org.springframework.data.domain.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class BookController {

    @Autowired
    private BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping("/books")
    public ResponseEntity<Page<Book>> getBooks(@RequestParam(defaultValue = "0") int page,
                                               @RequestParam(defaultValue = "5") int size) {
        Page<Book> booksPage = bookService.getBooksPage(page, size);
        return ResponseEntity.ok(booksPage);
    }
//    @GetMapping("/books")
//    public ResponseEntity<List<Book>> getBooks() {
//        List<Book> books = bookService.getAllBooks();
//        return ResponseEntity.ok(books);
//    }

    @GetMapping("/books/{id}")
    public ResponseEntity<?> getSingleBook(@PathVariable Long id) {
        try {
            Book book = bookService.getBookById(id);
            return ResponseEntity.ok(book);
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body("Book not found with id : " + id);
        }
    }

    @GetMapping("/books/search")
    public ResponseEntity<Page<Book>> searchForBook(@RequestParam("title") String title,
                                                    @RequestParam(defaultValue = "0") int page,
                                                    @RequestParam(defaultValue = "5") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Book> searchedBook = bookService.searchForBook(title, pageable);
        return ResponseEntity.ok(searchedBook);
    }

    @GetMapping("/books/searchByCategory")
    public ResponseEntity<Page<Book>> searchByCategory(@RequestParam("category") String category,
                                                       @RequestParam(defaultValue = "0") int page,
                                                       @RequestParam(defaultValue = "5") int size) {

        Pageable pageable = PageRequest.of(page, size);
        Page<Book> searchedBook = bookService.searchByCategory(category, pageable);
        return ResponseEntity.ok(searchedBook);
    }

}


