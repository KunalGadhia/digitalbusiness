/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.maxkitchenmrp;

import java.util.Objects;

/**
 *
 * @author User
 */
public class MaxKitchenMrp {
    private Integer id;
    private Category category;
    private String productCode;
    private String description;
    private Double width;
    private Double depth;
    private Double height;
    private Double carcassPrice;
    private Double price1;
    private Double price2;    
    private Double softCloseHinges;
    private Double accessories;    
    private Double priceh1;
    private Double priceh2;
    private Double priceh3;
    private Double priceh4;
    private Double priceh5;

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

    public Double getCarcassPrice() {
        return carcassPrice;
    }

    public void setCarcassPrice(Double carcassPrice) {
        this.carcassPrice = carcassPrice;
    }

    public Double getPrice1() {
        return price1;
    }

    public void setPrice1(Double price1) {
        this.price1 = price1;
    }

    public Double getPrice2() {
        return price2;
    }

    public void setPrice2(Double price2) {
        this.price2 = price2;
    }

    public Double getSoftCloseHinges() {
        return softCloseHinges;
    }

    public void setSoftCloseHinges(Double softCloseHinges) {
        this.softCloseHinges = softCloseHinges;
    }

    public Double getAccessories() {
        return accessories;
    }

    public void setAccessories(Double accessories) {
        this.accessories = accessories;
    }

    public Double getPriceh1() {
        return priceh1;
    }

    public void setPriceh1(Double priceh1) {
        this.priceh1 = priceh1;
    }

    public Double getPriceh2() {
        return priceh2;
    }

    public void setPriceh2(Double priceh2) {
        this.priceh2 = priceh2;
    }

    public Double getPriceh3() {
        return priceh3;
    }

    public void setPriceh3(Double priceh3) {
        this.priceh3 = priceh3;
    }

    public Double getPriceh4() {
        return priceh4;
    }

    public void setPriceh4(Double priceh4) {
        this.priceh4 = priceh4;
    }

    public Double getPriceh5() {
        return priceh5;
    }

    public void setPriceh5(Double priceh5) {
        this.priceh5 = priceh5;
    }

    @Override
    public int hashCode() {
        int hash = 5;
        hash = 79 * hash + Objects.hashCode(this.id);
        hash = 79 * hash + Objects.hashCode(this.category);
        hash = 79 * hash + Objects.hashCode(this.productCode);
        hash = 79 * hash + Objects.hashCode(this.description);
        hash = 79 * hash + Objects.hashCode(this.width);
        hash = 79 * hash + Objects.hashCode(this.depth);
        hash = 79 * hash + Objects.hashCode(this.height);
        hash = 79 * hash + Objects.hashCode(this.carcassPrice);
        hash = 79 * hash + Objects.hashCode(this.price1);
        hash = 79 * hash + Objects.hashCode(this.price2);
        hash = 79 * hash + Objects.hashCode(this.softCloseHinges);
        hash = 79 * hash + Objects.hashCode(this.accessories);
        hash = 79 * hash + Objects.hashCode(this.priceh1);
        hash = 79 * hash + Objects.hashCode(this.priceh2);
        hash = 79 * hash + Objects.hashCode(this.priceh3);
        hash = 79 * hash + Objects.hashCode(this.priceh4);
        hash = 79 * hash + Objects.hashCode(this.priceh5);
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
        final MaxKitchenMrp other = (MaxKitchenMrp) obj;
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
        if (!Objects.equals(this.depth, other.depth)) {
            return false;
        }
        if (!Objects.equals(this.height, other.height)) {
            return false;
        }
        if (!Objects.equals(this.carcassPrice, other.carcassPrice)) {
            return false;
        }
        if (!Objects.equals(this.price1, other.price1)) {
            return false;
        }
        if (!Objects.equals(this.price2, other.price2)) {
            return false;
        }
        if (!Objects.equals(this.softCloseHinges, other.softCloseHinges)) {
            return false;
        }
        if (!Objects.equals(this.accessories, other.accessories)) {
            return false;
        }
        if (!Objects.equals(this.priceh1, other.priceh1)) {
            return false;
        }
        if (!Objects.equals(this.priceh2, other.priceh2)) {
            return false;
        }
        if (!Objects.equals(this.priceh3, other.priceh3)) {
            return false;
        }
        if (!Objects.equals(this.priceh4, other.priceh4)) {
            return false;
        }
        if (!Objects.equals(this.priceh5, other.priceh5)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "MaxKitchenMrp{" + "id=" + id + ", category=" + category + ", productCode=" + productCode + ", description=" + description + ", width=" + width + ", depth=" + depth + ", height=" + height + ", carcassPrice=" + carcassPrice + ", price1=" + price1 + ", price2=" + price2 + ", softCloseHinges=" + softCloseHinges + ", accessories=" + accessories + ", priceh1=" + priceh1 + ", priceh2=" + priceh2 + ", priceh3=" + priceh3 + ", priceh4=" + priceh4 + ", priceh5=" + priceh5 + '}';
    }
        
}
