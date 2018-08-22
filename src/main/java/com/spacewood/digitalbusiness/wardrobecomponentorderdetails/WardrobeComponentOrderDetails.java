/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.wardrobecomponentorderdetails;

import java.util.Objects;

/**
 *
 * @author swapnika
 */
public class WardrobeComponentOrderDetails {

    private Integer id;
    private Integer orderHeadId;
    private String productCode;
    private String component;
    private String description;
    private double width;
    private double depth;
    private double height;
    private double stdPrice;
    private Integer quantity;
    private double price;
    private String remark;
    private double displayDiscount;
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

    public String getComponent() {
        return component;
    }

    public void setComponent(String component) {
        this.component = component;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getWidth() {
        return width;
    }

    public void setWidth(double width) {
        this.width = width;
    }

    public double getDepth() {
        return depth;
    }

    public void setDepth(double depth) {
        this.depth = depth;
    }

    public double getHeight() {
        return height;
    }

    public void setHeight(double height) {
        this.height = height;
    }

    public double getStdPrice() {
        return stdPrice;
    }

    public void setStdPrice(double stdPrice) {
        this.stdPrice = stdPrice;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public double getDisplayDiscount() {
        return displayDiscount;
    }

    public void setDisplayDiscount(double displayDiscount) {
        this.displayDiscount = displayDiscount;
    }

    public String getOrderFor() {
        return orderFor;
    }

    public void setOrderFor(String orderFor) {
        this.orderFor = orderFor;
    }

    @Override
    public String toString() {
        return "WardrobeComponentOrderDetails{" + "id=" + id + ", orderHeadId=" + orderHeadId + ", productCode=" + productCode + ", component=" + component + ", description=" + description + ", width=" + width + ", depth=" + depth + ", height=" + height + ", stdPrice=" + stdPrice + ", quantity=" + quantity + ", price=" + price + ", remark=" + remark + ", displayDiscount=" + displayDiscount + ", orderFor=" + orderFor + '}';
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 29 * hash + Objects.hashCode(this.id);
        hash = 29 * hash + Objects.hashCode(this.orderHeadId);
        hash = 29 * hash + Objects.hashCode(this.productCode);
        hash = 29 * hash + Objects.hashCode(this.component);
        hash = 29 * hash + Objects.hashCode(this.description);
        hash = 29 * hash + (int) (Double.doubleToLongBits(this.width) ^ (Double.doubleToLongBits(this.width) >>> 32));
        hash = 29 * hash + (int) (Double.doubleToLongBits(this.depth) ^ (Double.doubleToLongBits(this.depth) >>> 32));
        hash = 29 * hash + (int) (Double.doubleToLongBits(this.height) ^ (Double.doubleToLongBits(this.height) >>> 32));
        hash = 29 * hash + (int) (Double.doubleToLongBits(this.stdPrice) ^ (Double.doubleToLongBits(this.stdPrice) >>> 32));
        hash = 29 * hash + Objects.hashCode(this.quantity);
        hash = 29 * hash + (int) (Double.doubleToLongBits(this.price) ^ (Double.doubleToLongBits(this.price) >>> 32));
        hash = 29 * hash + Objects.hashCode(this.remark);
        hash = 29 * hash + (int) (Double.doubleToLongBits(this.displayDiscount) ^ (Double.doubleToLongBits(this.displayDiscount) >>> 32));
        hash = 29 * hash + Objects.hashCode(this.orderFor);
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
        final WardrobeComponentOrderDetails other = (WardrobeComponentOrderDetails) obj;
        if (Double.doubleToLongBits(this.width) != Double.doubleToLongBits(other.width)) {
            return false;
        }
        if (Double.doubleToLongBits(this.depth) != Double.doubleToLongBits(other.depth)) {
            return false;
        }
        if (Double.doubleToLongBits(this.height) != Double.doubleToLongBits(other.height)) {
            return false;
        }
        if (Double.doubleToLongBits(this.stdPrice) != Double.doubleToLongBits(other.stdPrice)) {
            return false;
        }
        if (Double.doubleToLongBits(this.price) != Double.doubleToLongBits(other.price)) {
            return false;
        }
        if (Double.doubleToLongBits(this.displayDiscount) != Double.doubleToLongBits(other.displayDiscount)) {
            return false;
        }
        if (!Objects.equals(this.productCode, other.productCode)) {
            return false;
        }
        if (!Objects.equals(this.component, other.component)) {
            return false;
        }
        if (!Objects.equals(this.description, other.description)) {
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
        if (!Objects.equals(this.quantity, other.quantity)) {
            return false;
        }
        return true;
    }

}
