/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.maxkitchen;

import java.util.Objects;

/**
 *
 * @author user
 */
public class MaxKitchen {
    private Integer id;
    private Category category;
    private String productCode;
    private String description;
    private Double width;
    private Double height;
    private Double depth;
    private Double hdfMattPrice;
    private Double hdfGlossPrice;
    private Double glassG50AluPrice;
    private Boolean glass;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public String getProductCode() {
        return productCode;
    }

    public void setProductCode(String productCode) {
        this.productCode = productCode;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getWidth() {
        return width;
    }

    public void setWidth(Double width) {
        this.width = width;
    }

    public Double getHeight() {
        return height;
    }

    public void setHeight(Double height) {
        this.height = height;
    }

    public Double getDepth() {
        return depth;
    }

    public void setDepth(Double depth) {
        this.depth = depth;
    }

    public Double getHdfMattPrice() {
        return hdfMattPrice;
    }

    public void setHdfMattPrice(Double hdfMattPrice) {
        this.hdfMattPrice = hdfMattPrice;
    }

    public Double getHdfGlossPrice() {
        return hdfGlossPrice;
    }

    public void setHdfGlossPrice(Double hdfGlossPrice) {
        this.hdfGlossPrice = hdfGlossPrice;
    }

    public Double getGlassG50AluPrice() {
        return glassG50AluPrice;
    }

    public void setGlassG50AluPrice(Double glassG50AluPrice) {
        this.glassG50AluPrice = glassG50AluPrice;
    }

    public Boolean getGlass() {
        return glass;
    }

    public void setGlass(Boolean glass) {
        this.glass = glass;
    }

    @Override
    public int hashCode() {
        int hash = 3;
        hash = 67 * hash + Objects.hashCode(this.id);
        hash = 67 * hash + Objects.hashCode(this.category);
        hash = 67 * hash + Objects.hashCode(this.productCode);
        hash = 67 * hash + Objects.hashCode(this.description);
        hash = 67 * hash + Objects.hashCode(this.width);
        hash = 67 * hash + Objects.hashCode(this.height);
        hash = 67 * hash + Objects.hashCode(this.depth);
        hash = 67 * hash + Objects.hashCode(this.hdfMattPrice);
        hash = 67 * hash + Objects.hashCode(this.hdfGlossPrice);
        hash = 67 * hash + Objects.hashCode(this.glassG50AluPrice);
        hash = 67 * hash + Objects.hashCode(this.glass);
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
        final MaxKitchen other = (MaxKitchen) obj;
        if (!Objects.equals(this.productCode, other.productCode)) {
            return false;
        }
        if (!Objects.equals(this.description, other.description)) {
            return false;
        }
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        if (this.category != other.category) {
            return false;
        }
        if (!Objects.equals(this.width, other.width)) {
            return false;
        }
        if (!Objects.equals(this.height, other.height)) {
            return false;
        }
        if (!Objects.equals(this.depth, other.depth)) {
            return false;
        }
        if (!Objects.equals(this.hdfMattPrice, other.hdfMattPrice)) {
            return false;
        }
        if (!Objects.equals(this.hdfGlossPrice, other.hdfGlossPrice)) {
            return false;
        }
        if (!Objects.equals(this.glassG50AluPrice, other.glassG50AluPrice)) {
            return false;
        }
        if (!Objects.equals(this.glass, other.glass)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "MaxKitchen{" + "id=" + id + ", category=" + category + ", productCode=" + productCode + ", description=" + description + ", width=" + width + ", height=" + height + ", depth=" + depth + ", hdfMattPrice=" + hdfMattPrice + ", hdfGlossPrice=" + hdfGlossPrice + ", glassG50AluPrice=" + glassG50AluPrice + ", glass=" + glass + '}';
    }
        
}
