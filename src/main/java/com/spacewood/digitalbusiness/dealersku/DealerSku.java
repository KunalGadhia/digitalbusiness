/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.dealersku;

import java.util.List;
import java.util.Objects;

/**
 *
 * @author webdesign
 */
public class DealerSku {
    private Integer id;
    private String productCode;
    private String productDescription;
    private String manufacturerCode;
    private String manufacturerCategoryCode;
    private Double width;
    private Double depth;
    private Double height;
    private String color;
    private Double spPrice;
    private Double price;
    private List<String> image;
    private Integer createdBy;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getProductCode() {
        return productCode;
    }

    public void setProductCode(String productCode) {
        this.productCode = productCode;
    }

    public String getProductDescription() {
        return productDescription;
    }

    public void setProductDescription(String productDescription) {
        this.productDescription = productDescription;
    }

    public String getManufacturerCode() {
        return manufacturerCode;
    }

    public void setManufacturerCode(String manufacturerCode) {
        this.manufacturerCode = manufacturerCode;
    }

    public String getManufacturerCategoryCode() {
        return manufacturerCategoryCode;
    }

    public void setManufacturerCategoryCode(String manufacturerCategoryCode) {
        this.manufacturerCategoryCode = manufacturerCategoryCode;
    }

    public Double getWidth() {
        return width;
    }

    public void setWidth(Double width) {
        this.width = width;
    }

    public Double getDepth() {
        return depth;
    }

    public void setDepth(Double depth) {
        this.depth = depth;
    }

    public Double getHeight() {
        return height;
    }

    public void setHeight(Double height) {
        this.height = height;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public Double getSpPrice() {
        return spPrice;
    }

    public void setSpPrice(Double spPrice) {
        this.spPrice = spPrice;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public List<String> getImage() {
        return image;
    }

    public void setImage(List<String> image) {
        this.image = image;
    }

    public Integer getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(Integer createdBy) {
        this.createdBy = createdBy;
    }

    @Override
    public int hashCode() {
        int hash = 5;
        hash = 97 * hash + Objects.hashCode(this.id);
        hash = 97 * hash + Objects.hashCode(this.productCode);
        hash = 97 * hash + Objects.hashCode(this.productDescription);
        hash = 97 * hash + Objects.hashCode(this.manufacturerCode);
        hash = 97 * hash + Objects.hashCode(this.manufacturerCategoryCode);
        hash = 97 * hash + Objects.hashCode(this.width);
        hash = 97 * hash + Objects.hashCode(this.depth);
        hash = 97 * hash + Objects.hashCode(this.height);
        hash = 97 * hash + Objects.hashCode(this.color);
        hash = 97 * hash + Objects.hashCode(this.spPrice);
        hash = 97 * hash + Objects.hashCode(this.price);
        hash = 97 * hash + Objects.hashCode(this.image);
        hash = 97 * hash + Objects.hashCode(this.createdBy);
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final DealerSku other = (DealerSku) obj;
        if (!Objects.equals(this.productCode, other.productCode)) {
            return false;
        }
        if (!Objects.equals(this.productDescription, other.productDescription)) {
            return false;
        }
        if (!Objects.equals(this.manufacturerCode, other.manufacturerCode)) {
            return false;
        }
        if (!Objects.equals(this.manufacturerCategoryCode, other.manufacturerCategoryCode)) {
            return false;
        }
        if (!Objects.equals(this.color, other.color)) {
            return false;
        }
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        if (!Objects.equals(this.width, other.width)) {
            return false;
        }
        if (!Objects.equals(this.depth, other.depth)) {
            return false;
        }
        if (!Objects.equals(this.height, other.height)) {
            return false;
        }
        if (!Objects.equals(this.spPrice, other.spPrice)) {
            return false;
        }
        if (!Objects.equals(this.price, other.price)) {
            return false;
        }
        if (!Objects.equals(this.image, other.image)) {
            return false;
        }
        if (!Objects.equals(this.createdBy, other.createdBy)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "DealerSku{" + "id=" + id + ", productCode=" + productCode + ", productDescription=" + productDescription + ", manufacturerCode=" + manufacturerCode + ", manufacturerCategoryCode=" + manufacturerCategoryCode + ", width=" + width + ", depth=" + depth + ", height=" + height + ", color=" + color + ", spPrice=" + spPrice + ", price=" + price + ", image=" + image + ", createdBy=" + createdBy + '}';
    }
    
}
