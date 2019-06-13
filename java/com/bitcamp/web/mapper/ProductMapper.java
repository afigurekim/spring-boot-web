package com.bitcamp.web.mapper;

import java.util.List;

import com.bitcamp.web.domain.ProductDTO;

import org.springframework.stereotype.Repository;

@Repository
public interface ProductMapper {
    public void insertProduct(ProductDTO product);
    public List<ProductDTO> selectProducts();
    public List<ProductDTO> selectProductsByOption(ProductDTO option);
    public ProductDTO selectProductById(String productId);
    public void updateProduct(ProductDTO product);
    public void deleteProduct(ProductDTO product);
    
}