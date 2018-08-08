/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.maxkitchenmrporderdetails;

import java.util.Objects;

/**
 *
 * @author User
 */
public class MaxKitchenMrpOrderDetails {
    
    private Integer id;
    private Integer orderHeadId;
    private String productCode;
    private String description;
    private String carcass;
    private Double carcassPrice;
    private String shutter;
    private Double shutterPrice;
    private String hinges;
    private Double hingesPrice;
    private String handle;
    private Double handlePrice;
    private Double accessoriesPrice;
    private Double width;
    private Double depth;
    private Double height;
    private String carcassColor;
    private String shutterColor;
    private Integer quantity;
    private Double price;
    private String remark;

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

    public Double getCarcassPrice() {
        return carcassPrice;
    }

    public void setCarcassPrice(Double carcassPrice) {
        this.carcassPrice = carcassPrice;
    }

    public String getShutter() {
        return shutter;
    }

    public void setShutter(String shutter) {
        this.shutter = shutter;
    }

    public Double getShutterPrice() {
        return shutterPrice;
    }

    public void setShutterPrice(Double shutterPrice) {
        this.shutterPrice = shutterPrice;
    }

    public String getHinges() {
        return hinges;
    }

    public void setHinges(String hinges) {
        this.hinges = hinges;
    }

    public Double getHingesPrice() {
        return hingesPrice;
    }

    public void setHingesPrice(Double hingesPrice) {
        this.hingesPrice = hingesPrice;
    }

    public String getHandle() {
        return handle;
    }

    public void setHandle(String handle) {
        this.handle = handle;
    }

    public Double getHandlePrice() {
        return handlePrice;
    }

    public void setHandlePrice(Double handlePrice) {
        this.handlePrice = handlePrice;
    }

    public Double getAccessoriesPrice() {
        return accessoriesPrice;
    }

    public void setAccessoriesPrice(Double accessoriesPrice) {
        this.accessoriesPrice = accessoriesPrice;
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

    public String getCarcassColor() {
        return carcassColor;
    }

    public void setCarcassColor(String carcassColor) {
        this.carcassColor = carcassColor;
    }

    public String getShutterColor() {
        return shutterColor;
    }

    public void setShutterColor(String shutterColor) {
        this.shutterColor = shutterColor;
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

    @Override
    public int hashCode() {
        int hash = 5;
        hash = 53 * hash + Objects.hashCode(this.id);
        hash = 53 * hash + Objects.hashCode(this.orderHeadId);
        hash = 53 * hash + Objects.hashCode(this.productCode);
        hash = 53 * hash + Objects.hashCode(this.description);
        hash = 53 * hash + Objects.hashCode(this.carcass);
        hash = 53 * hash + Objects.hashCode(this.carcassPrice);
        hash = 53 * hash + Objects.hashCode(this.shutter);
        hash = 53 * hash + Objects.hashCode(this.shutterPrice);
        hash = 53 * hash + Objects.hashCode(this.hinges);
        hash = 53 * hash + Objects.hashCode(this.hingesPrice);
        hash = 53 * hash + Objects.hashCode(this.handle);
        hash = 53 * hash + Objects.hashCode(this.handlePrice);
        hash = 53 * hash + Objects.hashCode(this.accessoriesPrice);
        hash = 53 * hash + Objects.hashCode(this.width);
        hash = 53 * hash + Objects.hashCode(this.depth);
        hash = 53 * hash + Objects.hashCode(this.height);
        hash = 53 * hash + Objects.hashCode(this.carcassColor);
        hash = 53 * hash + Objects.hashCode(this.shutterColor);
        hash = 53 * hash + Objects.hashCode(this.quantity);
        hash = 53 * hash + Objects.hashCode(this.price);
        hash = 53 * hash + Objects.hashCode(this.remark);
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
        final MaxKitchenMrpOrderDetails other = (MaxKitchenMrpOrderDetails) obj;
        if (!Objects.equals(this.productCode, other.productCode)) {
            return false;
        }
        if (!Objects.equals(this.description, other.description)) {
            return false;
        }
        if (!Objects.equals(this.carcass, other.carcass)) {
            return false;
        }
        if (!Objects.equals(this.shutter, other.shutter)) {
            return false;
        }
        if (!Objects.equals(this.hinges, other.hinges)) {
            return false;
        }
        if (!Objects.equals(this.handle, other.handle)) {
            return false;
        }
        if (!Objects.equals(this.carcassColor, other.carcassColor)) {
            return false;
        }
        if (!Objects.equals(this.shutterColor, other.shutterColor)) {
            return false;
        }
        if (!Objects.equals(this.remark, other.remark)) {
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
        if (!Objects.equals(this.hingesPrice, other.hingesPrice)) {
            return false;
        }
        if (!Objects.equals(this.handlePrice, other.handlePrice)) {
            return false;
        }
        if (!Objects.equals(this.accessoriesPrice, other.accessoriesPrice)) {
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
        if (!Objects.equals(this.quantity, other.quantity)) {
            return false;
        }
        if (!Objects.equals(this.price, other.price)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "MaxKitchenMrpOrderDetails{" + "id=" + id + ", orderHeadId=" + orderHeadId + ", productCode=" + productCode + ", description=" + description + ", carcass=" + carcass + ", carcassPrice=" + carcassPrice + ", shutter=" + shutter + ", shutterPrice=" + shutterPrice + ", hinges=" + hinges + ", hingesPrice=" + hingesPrice + ", handle=" + handle + ", handlePrice=" + handlePrice + ", accessoriesPrice=" + accessoriesPrice + ", width=" + width + ", depth=" + depth + ", height=" + height + ", carcassColor=" + carcassColor + ", shutterColor=" + shutterColor + ", quantity=" + quantity + ", price=" + price + ", remark=" + remark + '}';
    }
        
}
