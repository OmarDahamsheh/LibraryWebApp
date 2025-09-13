package com.luv2code.spring_boot_library.controller;

import com.luv2code.spring_boot_library.entity.Review;
import com.luv2code.spring_boot_library.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.config.EnableSpringDataWebSupport;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
//@EnableSpringDataWebSupport(pageSerializationMode = EnableSpringDataWebSupport.PageSerializationMode.VIA_DTO)
@RequestMapping("api/")
public class ReviewController {
    @Autowired
    ReviewService reviewService;
    public ReviewController(ReviewService reviewService){
        this.reviewService=reviewService;
    }

    @GetMapping("/reviews")
    public ResponseEntity<List<Review>> findAllReviews(){
        List<Review> reviews=reviewService.findAllReviews();
        return ResponseEntity.ok(reviews);
    }

    @GetMapping("/books/{id}/reviews")
    public ResponseEntity<?>getReviewsForBook(@PathVariable Long id,
                                              @RequestParam(defaultValue = "0") int page,
                                              @RequestParam(defaultValue = "5")int size){
        try{
            Pageable pageable= PageRequest.of(page,size);
            Page<Review> review=reviewService.findReviewByBookId(id,pageable);
            return ResponseEntity.ok(review);
        }catch (RuntimeException e){
            return ResponseEntity.status(404).body("Review not found with id : " + id);
        }
    }
}
