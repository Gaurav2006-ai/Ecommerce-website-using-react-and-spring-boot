package com.sidhu.springrepo.service;

import com.sidhu.springrepo.Repository.productRepositoy;
import com.sidhu.springrepo.model.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class productService {

    @Autowired
    private productRepositoy repo;

    public List<Product> getAllProduct() {
        return repo.findAll();
    }

    public Product getProductByElement(int id) {
        return repo.findById(id).orElse(null);
    }

    public Product addProduct(Product product, MultipartFile imgFile) throws IOException {

        product.setImgName(imgFile.getOriginalFilename());
        product.setImgType(imgFile.getContentType());
        product.setImgDate(imgFile.getBytes());
       return repo.save(product);
    }

    public Product updateProductById(int id, Product product,MultipartFile imgFile) throws IOException {

        product.setImgDate(imgFile.getBytes());
        product.setImgType(imgFile.getContentType());
        product.setImgName(imgFile.getOriginalFilename());
        return repo.save(product);
    }

    public void deleteProduct(int id) {
         repo.deleteById(id);
    }

    public List<Product> searchProduct(String keyword) {

        return repo.searchProductBy(keyword);
    }
}
