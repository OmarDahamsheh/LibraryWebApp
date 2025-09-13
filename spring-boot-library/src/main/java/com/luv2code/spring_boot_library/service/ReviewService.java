package com.luv2code.spring_boot_library.service;

import com.luv2code.spring_boot_library.dao.ReviewRepository;
import com.luv2code.spring_boot_library.entity.Review;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {

    @Autowired
    ReviewRepository reviewRepository;

    public ReviewService(ReviewRepository reviewRepository){
        this.reviewRepository=reviewRepository;
    }

    public List<Review> findAllReviews(){
        List<Review> reviews =reviewRepository.findAll();
        return reviews;
    }

    public Page<Review> findReviewByBookId(Long bookId, Pageable pageable){
        Page<Review> review=reviewRepository.findByBookId(bookId,pageable);
        return review;
    }

}
