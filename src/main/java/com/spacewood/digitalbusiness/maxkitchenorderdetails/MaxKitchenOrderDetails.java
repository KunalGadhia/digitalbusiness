/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.maxkitchenorderdetails;

import java.util.Objects;

/**
 *
 * @author user
 */
public class MaxKitchenOrderDetails {
    private Integer id;
    private Integer orderHeadId;
    private String productCode;
    private String component;
    private String description;
    private String shutterFinish;
    private Double width;
    private Double height;
    private Double depth;
    private Double stdPrice;
    private Integer quantity;
    private Integer shutterPrice;
    private Double price;
    private Integer shutterColorId;
    private String shutterColorCode;
    private String shutterColorName;
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

    public String getShutterFinish() {
        return shutterFinish;
    }

    public void setShutterFinish(String shutterFinish) {
        this.shutterFinish = shutterFinish;
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

    public Double getStdPrice() {
        return stdPrice;
    }

    public void setStdPrice(Double stdPrice) {
        this.stdPrice = stdPrice;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Integer getShutterPrice() {
        return shutterPrice;
    }

    public void setShutterPrice(Integer shutterPrice) {
        this.shutterPrice = shutterPrice;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Integer getShutterColorId() {
        return shutterColorId;
    }

    public void setShutterColorId(Integer shutterColorId) {
        this.shutterColorId = shutterColorId;
    }

    public String getShutterColorCode() {
        return shutterColorCode;
    }

    public void setShutterColorCode(String shutterColorCode) {
        this.shutterColorCode = shutterColorCode;
    }

    public String getShutterColorName() {
        return shutterColorName;
    }

    public void setShutterColorName(String shutterColorName) {
        this.shutterColorName = shutterColorName;
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
        int hash = 5;
        hash = 11 * hash + Objects.hashCode(this.id);
        hash = 11 * hash + Objects.hashCode(this.orderHeadId);
        hash = 11 * hash + Objects.hashCode(this.productCode);
        hash = 11 * hash + Objects.hashCode(this.component);
        hash = 11 * hash + Objects.hashCode(this.description);
        hash = 11 * hash + Objects.hashCode(this.shutterFinish);
        hash = 11 * hash + Objects.hashCode(this.width);
        hash = 11 * hash + Objects.hashCode(this.height);
        hash = 11 * hash + Objects.hashCode(this.depth);
        hash = 11 * hash + Objects.hashCode(this.stdPrice);
        hash = 11 * hash + Objects.hashCode(this.quantity);
        hash = 11 * hash + Objects.hashCode(this.shutterPrice);
        hash = 11 * hash + Objects.hashCode(this.price);
        hash = 11 * hash + Objects.hashCode(this.shutterColorId);
        hash = 11 * hash + Objects.hashCode(this.shutterColorCode);
        hash = 11 * hash + Objects.hashCode(this.shutterColorName);
        hash = 11 * hash + Objects.hashCode(this.remark);
        hash = 11 * hash + Objects.hashCode(this.displayDiscount);
        hash = 11 * hash + Objects.hashCode(this.orderFor);
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
        final MaxKitchenOrderDetails other = (MaxKitchenOrderDetails) obj;
        if (!Objects.equals(this.productCode, other.productCode)) {
            return false;
        }
        if (!Objects.equals(this.component, other.component)) {
            return false;
        }
        if (!Objects.equals(this.description, other.description)) {
            return false;
        }
        if (!Objects.equals(this.shutterFinish, other.shutterFinish)) {
            return false;
        }
        if (!Objects.equals(this.shutterColorCode, other.shutterColorCode)) {
            return false;
        }
        if (!Objects.equals(this.shutterColorName, other.shutterColorName)) {
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
        if (!Objects.equals(this.width, other.width)) {
            return false;
        }
        if (!Objects.equals(this.height, other.height)) {
            return false;
        }
        if (!Objects.equals(this.depth, other.depth)) {
            return false;
        }
        if (!Objects.equals(this.stdPrice, other.stdPrice)) {
            return false;
        }
        if (!Objects.equals(this.quantity, other.quantity)) {
            return false;
        }
        if (!Objects.equals(this.shutterPrice, other.shutterPrice)) {
            return false;
        }
        if (!Objects.equals(this.price, other.price)) {
            return false;
        }
        if (!Objects.equals(this.shutterColorId, other.shutterColorId)) {
            return false;
        }
        if (!Objects.equals(this.displayDiscount, other.displayDiscount)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "MaxKitchenOrderDetails{" + "id=" + id + ", orderHeadId=" + orderHeadId + ", productCode=" + productCode + ", component=" + component + ", description=" + description + ", shutterFinish=" + shutterFinish + ", width=" + width + ", height=" + height + ", depth=" + depth + ", stdPrice=" + stdPrice + ", quantity=" + quantity + ", shutterPrice=" + shutterPrice + ", price=" + price + ", shutterColorId=" + shutterColorId + ", shutterColorCode=" + shutterColorCode + ", shutterColorName=" + shutterColorName + ", remark=" + remark + ", displayDiscount=" + displayDiscount + ", orderFor=" + orderFor + '}';
    }
        
}
