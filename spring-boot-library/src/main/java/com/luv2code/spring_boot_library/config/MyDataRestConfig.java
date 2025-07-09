//package com.luv2code.spring_boot_library.config;
//
//import com.luv2code.spring_boot_library.entity.Book;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
//import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
//import org.springframework.http.HttpMethod;
//import org.springframework.web.servlet.config.annotation.CorsRegistry;
//
//    //This code for blocking the methods (Delete, Post, Put, Patch) and allow just the Get method.
//@Configuration
//public class MyDataRestConfig implements RepositoryRestConfigurer { //this implement will allow us to edit the setting of the REST
//
//    private String theAllowedOrigins = "http://localhost:3000"; //this will allow us to make a request to our frontend
//
//
//    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
//
//        HttpMethod[] theUnsupportedActions = {HttpMethod.POST, HttpMethod.DELETE, HttpMethod.PATCH, HttpMethod.PUT};
//        config.exposeIdsFor(Book.class);
//        disableHttpMethods(Book.class,config,theUnsupportedActions);
//
//        /*Configure CORS Mapping*/
//        cors.addMapping(config.getBasePath()+"/**")
//                .allowedOrigins(theAllowedOrigins); //Will allow the frontend to send requests to the backend
//    }
//
//    private void disableHttpMethods(Class theClass, RepositoryRestConfiguration config, HttpMethod[] theUnsupportedActions) {
//        config.getExposureConfiguration()
//                .forDomainType(theClass)
//                .withItemExposure((metadata,httpMethods)-> httpMethods.disable(theUnsupportedActions)) //Will prevent the methods on one record (/api/books/1)
//                .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions)); //Will prevent the methods on the whole collection (/api/books)
//    }
//
//
//}
