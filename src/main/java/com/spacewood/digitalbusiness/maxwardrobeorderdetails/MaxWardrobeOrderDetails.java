/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.maxwardrobeorderdetails;

import java.util.Objects;

/**
 *
 * @author webdesign
 */
public class MaxWardrobeOrderDetails {
    private Integer id;
    private Integer orderHeadId;
    private String productCode;
    private String description;
    private String carcass;
    private String shutterFinish;
    private Double carcassPrice;
    private Double shutterPrice;
    private Double softHingesPrice;
    private Double width;
    private Double height;
    private Double depth;    
    private Integer quantity;
    private Double price;
    private String remark;
    private Double displayDiscount;
    private String orderFor;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getOrderHeadId() {
        return orderHeadId;
    }

    public void setOrderHeadId(Integer orderHeadId) {
        this.orderHeadId = orderHeadId;
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

    public String getCarcass() {
        return carcass;
    }

    public void setCarcass(String carcass) {
        this.carcass = carcass;
    }

    public String getShutterFinish() {
        return shutterFinish;
    }

    public void setShutterFinish(String shutterFinish) {
        this.shutterFinish = shutterFinish;
    }

    public Double getCarcassPrice() {
        return carcassPrice;
    }

    public void setCarcassPrice(Double carcassPrice) {
        this.carcassPrice = carcassPrice;
    }

    public Double getShutterPrice() {
        return shutterPrice;
    }

    public void setShutterPrice(Double shutterPrice) {
        this.shutterPrice = shutterPrice;
    }

    public Double getSoftHingesPrice() {
        return softHingesPrice;
    }

    public void setSoftHingesPrice(Double softHingesPrice) {
        this.softHingesPrice = softHingesPrice;
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

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public Double getDisplayDiscount() {
        return displayDiscount;
    }

    public void setDisplayDiscount(Double displayDiscount) {
        this.displayDiscount = displayDiscount;
    }

    public String getOrderFor() {
        return orderFor;
    }

    public void setOrderFor(String orderFor) {
        this.orderFor = orderFor;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 37 * hash + Objects.hashCode(this.id);
        hash = 37 * hash + Objects.hashCode(this.orderHeadId);
        hash = 37 * hash + Objects.hashCode(this.productCode);
        hash = 37 * hash + Objects.hashCode(this.description);
        hash = 37 * hash + Objects.hashCode(this.carcass);
        hash = 37 * hash + Objects.hashCode(this.shutterFinish);
        hash = 37 * hash + Objects.hashCode(this.carcassPrice);
        hash = 37 * hash + Objects.hashCode(this.shutterPrice);
        hash = 37 * hash + Objects.hashCode(this.softHingesPrice);
        hash = 37 * hash + Objects.hashCode(this.width);
        hash = 37 * hash + Objects.hashCode(this.height);
        hash = 37 * hash + Objects.hashCode(this.depth);
        hash = 37 * hash + Objects.hashCode(this.quantity);
        hash = 37 * hash + Objects.hashCode(this.price);
        hash = 37 * hash + Objects.hashCode(this.remark);
        hash = 37 * hash + Objects.hashCode(this.displayDiscount);
        hash = 37 * hash + Objects.hashCode(this.orderFor);
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
        final MaxWardrobeOrderDetails other = (MaxWardrobeOrderDetails) obj;
        if (!Objects.equals(this.productCode, other.productCode)) {
            return false;
        }
        if (!Objects.equals(this.description, other.description)) {
            return false;
        }
        if (!Objects.equals(this.carcass, other.carcass)) {
            return false;
        }
        if (!Objects.equals(this.shutterFinish, other.shutterFinish)) {
            return false;
        }
        if (!Objects.equals(this.remark, other.remark)) {
            return false;
        }
        if (!Objects.equals(this.orderFor, other.orderFor)) {
            return false;
        }
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        if (!Objects.equals(this.orderHeadId, other.orderHeadId)) {
            return false;
        }
        if (!Objects.equals(this.carcassPrice, other.carcassPrice)) {
            return false;
        }
        if (!Objects.equals(this.shutterPrice, other.shutterPrice)) {
            return false;
        }
        if (!Objects.equals(this.softHingesPrice, other.softHingesPrice)) {
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
        if (!Objects.equals(this.quantity, other.quantity)) {
            return false;
        }
        if (!Objects.equals(this.price, other.price)) {
            return false;
        }
        if (!Objects.equals(this.displayDiscount, other.displayDiscount)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "MaxWardrobeOrderDetails{" + "id=" + id + ", orderHeadId=" + orderHeadId + ", productCode=" + productCode + ", description=" + description + ", carcass=" + carcass + ", shutterFinish=" + shutterFinish + ", carcassPrice=" + carcassPrice + ", shutterPrice=" + shutterPrice + ", softHingesPrice=" + softHingesPrice + ", width=" + width + ", height=" + height + ", depth=" + depth + ", quantity=" + quantity + ", price=" + price + ", remark=" + remark + ", displayDiscount=" + displayDiscount + ", orderFor=" + orderFor + '}';
    }

        
}
