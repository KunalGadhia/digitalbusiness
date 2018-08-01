/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.ultimawardrobeorderdetails;

import java.util.Objects;

/**
 *
 * @author webdesign
 */
public class UltimaWardrobeOrderDetails {
    private Integer id;
    private Integer orderHeadId;
    private String productCode;
    private String component;
    private String description;
    private String carcassMaterial;
    private String shutterFinish;
    private String handle;
    private Double width;
    private Double depth;
    private Double height;
    private Integer quantity;
    private Double carcassPrice;
    private Double shutterPrice;
    private Double handlePrice;
    private Double price;
    private Integer carcassColorId;
    private Integer shutterColorId;
    private String carcassColorCode;
    private String shutterColorCode;
    private String remark;
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

    public String getCarcassMaterial() {
        return carcassMaterial;
    }

    public void setCarcassMaterial(String carcassMaterial) {
        this.carcassMaterial = carcassMaterial;
    }

    public String getShutterFinish() {
        return shutterFinish;
    }

    public void setShutterFinish(String shutterFinish) {
        this.shutterFinish = shutterFinish;
    }

    public String getHandle() {
        return handle;
    }

    public void setHandle(String handle) {
        this.handle = handle;
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

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
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

    public Double getHandlePrice() {
        return handlePrice;
    }

    public void setHandlePrice(Double handlePrice) {
        this.handlePrice = handlePrice;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Integer getCarcassColorId() {
        return carcassColorId;
    }

    public void setCarcassColorId(Integer carcassColorId) {
        this.carcassColorId = carcassColorId;
    }

    public Integer getShutterColorId() {
        return shutterColorId;
    }

    public void setShutterColorId(Integer shutterColorId) {
        this.shutterColorId = shutterColorId;
    }

    public String getCarcassColorCode() {
        return carcassColorCode;
    }

    public void setCarcassColorCode(String carcassColorCode) {
        this.carcassColorCode = carcassColorCode;
    }

    public String getShutterColorCode() {
        return shutterColorCode;
    }

    public void setShutterColorCode(String shutterColorCode) {
        this.shutterColorCode = shutterColorCode;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
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
        hash = 59 * hash + Objects.hashCode(this.id);
        hash = 59 * hash + Objects.hashCode(this.orderHeadId);
        hash = 59 * hash + Objects.hashCode(this.productCode);
        hash = 59 * hash + Objects.hashCode(this.component);
        hash = 59 * hash + Objects.hashCode(this.description);
        hash = 59 * hash + Objects.hashCode(this.carcassMaterial);
        hash = 59 * hash + Objects.hashCode(this.shutterFinish);
        hash = 59 * hash + Objects.hashCode(this.handle);
        hash = 59 * hash + Objects.hashCode(this.width);
        hash = 59 * hash + Objects.hashCode(this.depth);
        hash = 59 * hash + Objects.hashCode(this.height);
        hash = 59 * hash + Objects.hashCode(this.quantity);
        hash = 59 * hash + Objects.hashCode(this.carcassPrice);
        hash = 59 * hash + Objects.hashCode(this.shutterPrice);
        hash = 59 * hash + Objects.hashCode(this.handlePrice);
        hash = 59 * hash + Objects.hashCode(this.price);
        hash = 59 * hash + Objects.hashCode(this.carcassColorId);
        hash = 59 * hash + Objects.hashCode(this.shutterColorId);
        hash = 59 * hash + Objects.hashCode(this.carcassColorCode);
        hash = 59 * hash + Objects.hashCode(this.shutterColorCode);
        hash = 59 * hash + Objects.hashCode(this.remark);
        hash = 59 * hash + Objects.hashCode(this.orderFor);
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
        final UltimaWardrobeOrderDetails other = (UltimaWardrobeOrderDetails) obj;
        if (!Objects.equals(this.productCode, other.productCode)) {
            return false;
        }
        if (!Objects.equals(this.component, other.component)) {
            return false;
        }
        if (!Objects.equals(this.description, other.description)) {
            return false;
        }
        if (!Objects.equals(this.carcassMaterial, other.carcassMaterial)) {
            return false;
        }
        if (!Objects.equals(this.shutterFinish, other.shutterFinish)) {
            return false;
        }
        if (!Objects.equals(this.handle, other.handle)) {
            return false;
        }
        if (!Objects.equals(this.carcassColorCode, other.carcassColorCode)) {
            return false;
        }
        if (!Objects.equals(this.shutterColorCode, other.shutterColorCode)) {
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
        if (!Objects.equals(this.depth, other.depth)) {
            return false;
        }
        if (!Objects.equals(this.height, other.height)) {
            return false;
        }
        if (!Objects.equals(this.quantity, other.quantity)) {
            return false;
        }
        if (!Objects.equals(this.carcassPrice, other.carcassPrice)) {
            return false;
        }
        if (!Objects.equals(this.shutterPrice, other.shutterPrice)) {
            return false;
        }
        if (!Objects.equals(this.handlePrice, other.handlePrice)) {
            return false;
        }
        if (!Objects.equals(this.price, other.price)) {
            return false;
        }
        if (!Objects.equals(this.carcassColorId, other.carcassColorId)) {
            return false;
        }
        if (!Objects.equals(this.shutterColorId, other.shutterColorId)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "UltimaWardrobeOrderDetails{" + "id=" + id + ", orderHeadId=" + orderHeadId + ", productCode=" + productCode + ", component=" + component + ", description=" + description + ", carcassMaterial=" + carcassMaterial + ", shutterFinish=" + shutterFinish + ", handle=" + handle + ", width=" + width + ", depth=" + depth + ", height=" + height + ", quantity=" + quantity + ", carcassPrice=" + carcassPrice + ", shutterPrice=" + shutterPrice + ", handlePrice=" + handlePrice + ", price=" + price + ", carcassColorId=" + carcassColorId + ", shutterColorId=" + shutterColorId + ", carcassColorCode=" + carcassColorCode + ", shutterColorCode=" + shutterColorCode + ", remark=" + remark + ", orderFor=" + orderFor + '}';
    }   
        
}
