/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.corniceorderdetails;

import java.util.Objects;

/**
 *
 * @author webdesign
 */
public class CorniceOrderDetails {
    
    private Integer id;
    private String productCode;
    private String material;
    private Integer orderHeadId;
    private String component;
    private Double width;
    private Double length;
    private Double thickness;
    private Integer quantity;
    private Integer colorId;
    private Double price;
    private Double finishPrice;
    private String finish;
    private String remark;
    private String orderFor;
    private String colorCode;
    private Double displayDiscount;
    private Double discountPer;

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

    public String getMaterial() {
        return material;
    }

    public void setMaterial(String material) {
        this.material = material;
    }

    public Integer getOrderHeadId() {
        return orderHeadId;
    }

    public void setOrderHeadId(Integer orderHeadId) {
        this.orderHeadId = orderHeadId;
    }

    public String getComponent() {
        return component;
    }

    public void setComponent(String component) {
        this.component = component;
    }

    public Double getWidth() {
        return width;
    }

    public void setWidth(Double width) {
        this.width = width;
    }

    public Double getLength() {
        return length;
    }

    public void setLength(Double length) {
        this.length = length;
    }

    public Double getThickness() {
        return thickness;
    }

    public void setThickness(Double thickness) {
        this.thickness = thickness;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Integer getColorId() {
        return colorId;
    }

    public void setColorId(Integer colorId) {
        this.colorId = colorId;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Double getFinishPrice() {
        return finishPrice;
    }

    public void setFinishPrice(Double finishPrice) {
        this.finishPrice = finishPrice;
    }

    public String getFinish() {
        return finish;
    }

    public void setFinish(String finish) {
        this.finish = finish;
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

    public String getColorCode() {
        return colorCode;
    }

    public void setColorCode(String colorCode) {
        this.colorCode = colorCode;
    }

    public Double getDisplayDiscount() {
        return displayDiscount;
    }

    public void setDisplayDiscount(Double displayDiscount) {
        this.displayDiscount = displayDiscount;
    }

    public Double getDiscountPer() {
        return discountPer;
    }

    public void setDiscountPer(Double discountPer) {
        this.discountPer = discountPer;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 97 * hash + Objects.hashCode(this.id);
        hash = 97 * hash + Objects.hashCode(this.productCode);
        hash = 97 * hash + Objects.hashCode(this.material);
        hash = 97 * hash + Objects.hashCode(this.orderHeadId);
        hash = 97 * hash + Objects.hashCode(this.component);
        hash = 97 * hash + Objects.hashCode(this.width);
        hash = 97 * hash + Objects.hashCode(this.length);
        hash = 97 * hash + Objects.hashCode(this.thickness);
        hash = 97 * hash + Objects.hashCode(this.quantity);
        hash = 97 * hash + Objects.hashCode(this.colorId);
        hash = 97 * hash + Objects.hashCode(this.price);
        hash = 97 * hash + Objects.hashCode(this.finishPrice);
        hash = 97 * hash + Objects.hashCode(this.finish);
        hash = 97 * hash + Objects.hashCode(this.remark);
        hash = 97 * hash + Objects.hashCode(this.orderFor);
        hash = 97 * hash + Objects.hashCode(this.colorCode);
        hash = 97 * hash + Objects.hashCode(this.displayDiscount);
        hash = 97 * hash + Objects.hashCode(this.discountPer);
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
        final CorniceOrderDetails other = (CorniceOrderDetails) obj;
        if (!Objects.equals(this.productCode, other.productCode)) {
            return false;
        }
        if (!Objects.equals(this.material, other.material)) {
            return false;
        }
        if (!Objects.equals(this.component, other.component)) {
            return false;
        }
        if (!Objects.equals(this.finish, other.finish)) {
            return false;
        }
        if (!Objects.equals(this.remark, other.remark)) {
            return false;
        }
        if (!Objects.equals(this.orderFor, other.orderFor)) {
            return false;
        }
        if (!Objects.equals(this.colorCode, other.colorCode)) {
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
        if (!Objects.equals(this.length, other.length)) {
            return false;
        }
        if (!Objects.equals(this.thickness, other.thickness)) {
            return false;
        }
        if (!Objects.equals(this.quantity, other.quantity)) {
            return false;
        }
        if (!Objects.equals(this.colorId, other.colorId)) {
            return false;
        }
        if (!Objects.equals(this.price, other.price)) {
            return false;
        }
        if (!Objects.equals(this.finishPrice, other.finishPrice)) {
            return false;
        }
        if (!Objects.equals(this.displayDiscount, other.displayDiscount)) {
            return false;
        }
        if (!Objects.equals(this.discountPer, other.discountPer)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "CorniceOrderDetails{" + "id=" + id + ", productCode=" + productCode + ", material=" + material + ", orderHeadId=" + orderHeadId + ", component=" + component + ", width=" + width + ", length=" + length + ", thickness=" + thickness + ", quantity=" + quantity + ", colorId=" + colorId + ", price=" + price + ", finishPrice=" + finishPrice + ", finish=" + finish + ", remark=" + remark + ", orderFor=" + orderFor + ", colorCode=" + colorCode + ", displayDiscount=" + displayDiscount + ", discountPer=" + discountPer + '}';
    }
    
}
