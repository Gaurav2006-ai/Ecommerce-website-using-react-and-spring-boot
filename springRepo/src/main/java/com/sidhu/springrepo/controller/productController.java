package com.sidhu.springrepo.controller;


import com.sidhu.springrepo.model.Product;
import com.sidhu.springrepo.service.productService;
import jakarta.servlet.annotation.MultipartConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.ProcessSwitchCallback;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.service.annotation.GetExchange;

import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class productController {

    @Autowired
    private productService service;
    @GetMapping("/")
    public String get(){
        return "string";
    }
    @GetMapping("/product")
    public ResponseEntity<List<Product>> getAllProduct()
    {
        return new ResponseEntity<>(service.getAllProduct(), HttpStatus.OK);
    }

    @GetMapping("/product/{id}")
    public ResponseEntity<Product> getProductByElement(@PathVariable int id)
    {
        Product product = service.getProductByElement(id);

        if(product!=null)
            return new ResponseEntity<>(product,HttpStatus.OK);
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/product")
//    public ResponseEntity<?> addProduct(@RequestPart("product") Product product,
//                                        @RequestPart("imgFile") MultipartFile imgFile)
//    {
//
//        try {
//            System.out.println(product);
//            Product product1 = service.addProduct(product, imgFile);
//            return new ResponseEntity<>(product1,HttpStatus.CREATED);
//        }catch (Exception e){
//            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//
//
//    }
    public ResponseEntity<?> addProduct(@RequestPart Product product, @RequestPart MultipartFile imgFile){

        try{
            Product product1 = service.addProduct(product,imgFile);

            return new ResponseEntity<>(product1,HttpStatus.CREATED);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PutMapping("/product/{id}")
    public ResponseEntity<Product> updateProductById(@PathVariable int  id, @RequestPart Product product, @RequestPart MultipartFile imgFile) throws IOException {


        Product product2 = service.updateProductById(id,product,imgFile);
        if(product2!=null)
            return new ResponseEntity<>(product2,HttpStatus.ACCEPTED);
        else
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping("/product/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable int id){
        Product product = service.getProductByElement(id);

        if(product!=null) {
            service.deleteProduct(id);
            return new ResponseEntity<>("product Deleted succesfully", HttpStatus.OK);
        }
        else
            return new ResponseEntity<>("Product not available",HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/product/search")
    public ResponseEntity<List<Product>> searchProduct(String keyword)
    {
        List<Product> product = service.searchProduct(keyword);
        return new ResponseEntity<>(product,HttpStatus.OK);
    }
}
