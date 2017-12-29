/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.fillerorderdetails;

import com.spacewood.digitalbusiness.shutterorderdetails.GrainDirection;
import java.util.Objects;

/**
 *
 * @author webdesign
 */
public class FillerOrderDetails {
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
    private Integer intColorId;
    private Double price;
    private Double stdOneSidePrice;
    private Double stdBothSidePrice;
    private String finish;
    private Boolean bsm;
    private GrainDirection grain;
    private String orderFor;

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

    public Double getStdOneSidePrice() {
        return stdOneSidePrice;
    }

    public void setStdOneSidePrice(Double stdOneSidePrice) {
        this.stdOneSidePrice = stdOneSidePrice;
    }

    public Double getStdBothSidePrice() {
        return stdBothSidePrice;
    }

    public void setStdBothSidePrice(Double stdBothSidePrice) {
        this.stdBothSidePrice = stdBothSidePrice;
    }

    public String getFinish() {
        return finish;
    }

    public void setFinish(String finish) {
        this.finish = finish;
    }

    public Boolean getBsm() {
        return bsm;
    }

    public void setBsm(Boolean bsm) {
        this.bsm = bsm;
    }

    public String getOrderFor() {
        return orderFor;
    }

    public void setOrderFor(String orderFor) {
        this.orderFor = orderFor;
    }

    public GrainDirection getGrain() {
        return grain;
    }

    public void setGrain(GrainDirection grain) {
        this.grain = grain;
    }

    public Integer getIntColorId() {
        return intColorId;
    }

    public void setIntColorId(Integer intColorId) {
        this.intColorId = intColorId;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 17 * hash + Objects.hashCode(this.id);
        hash = 17 * hash + Objects.hashCode(this.productCode);
        hash = 17 * hash + Objects.hashCode(this.material);
        hash = 17 * hash + Objects.hashCode(this.orderHeadId);
        hash = 17 * hash + Objects.hashCode(this.component);
        hash = 17 * hash + Objects.hashCode(this.width);
        hash = 17 * hash + Objects.hashCode(this.length);
        hash = 17 * hash + Objects.hashCode(this.thickness);
        hash = 17 * hash + Objects.hashCode(this.quantity);
        hash = 17 * hash + Objects.hashCode(this.colorId);
        hash = 17 * hash + Objects.hashCode(this.intColorId);
        hash = 17 * hash + Objects.hashCode(this.price);
        hash = 17 * hash + Objects.hashCode(this.stdOneSidePrice);
        hash = 17 * hash + Objects.hashCode(this.stdBothSidePrice);
        hash = 17 * hash + Objects.hashCode(this.finish);
        hash = 17 * hash + Objects.hashCode(this.bsm);
        hash = 17 * hash + Objects.hashCode(this.grain);
        hash = 17 * hash + Objects.hashCode(this.orderFor);
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
        final FillerOrderDetails other = (FillerOrderDetails) obj;
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
        if (!Objects.equals(this.intColorId, other.intColorId)) {
            return false;
        }
        if (!Objects.equals(this.price, other.price)) {
            return false;
        }
        if (!Objects.equals(this.stdOneSidePrice, other.stdOneSidePrice)) {
            return false;
        }
        if (!Objects.equals(this.stdBothSidePrice, other.stdBothSidePrice)) {
            return false;
        }
        if (!Objects.equals(this.bsm, other.bsm)) {
            return false;
        }
        if (this.grain != other.grain) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "FillerOrderDetails{" + "id=" + id + ", productCode=" + productCode + ", material=" + material + ", orderHeadId=" + orderHeadId + ", component=" + component + ", width=" + width + ", length=" + length + ", thickness=" + thickness + ", quantity=" + quantity + ", colorId=" + colorId + ", intColorId=" + intColorId + ", price=" + price + ", stdOneSidePrice=" + stdOneSidePrice + ", stdBothSidePrice=" + stdBothSidePrice + ", finish=" + finish + ", bsm=" + bsm + ", grain=" + grain + ", orderFor=" + orderFor + '}';
    }
       
}
