/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.shutterorderdetails;

import java.util.Objects;

/**
 *
 * @author webdesign
 */
public class ShutterOrderDetails {
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
    private String handle;
    private Double handleLength;
    private String handleFinish;
    private Double handlePrice;
    private HingePosition hingePosition;
    private Glass glass;
    private Boolean step;
    private Boolean jali;
    private Integer straightener;
    private Double straightenerPrice;
    private Boolean asPerDrawing;
    private String remark;
    private String orderFor;
    private String intColorCode;
    private String colorCode;
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

    public Integer getIntColorId() {
        return intColorId;
    }

    public void setIntColorId(Integer intColorId) {
        this.intColorId = intColorId;
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

    public GrainDirection getGrain() {
        return grain;
    }

    public void setGrain(GrainDirection grain) {
        this.grain = grain;
    }

    public String getHandle() {
        return handle;
    }

    public void setHandle(String handle) {
        this.handle = handle;
    }

    public Double getHandleLength() {
        return handleLength;
    }

    public void setHandleLength(Double handleLength) {
        this.handleLength = handleLength;
    }

    public String getHandleFinish() {
        return handleFinish;
    }

    public void setHandleFinish(String handleFinish) {
        this.handleFinish = handleFinish;
    }

    public Double getHandlePrice() {
        return handlePrice;
    }

    public void setHandlePrice(Double handlePrice) {
        this.handlePrice = handlePrice;
    }

    public HingePosition getHingePosition() {
        return hingePosition;
    }

    public void setHingePosition(HingePosition hingePosition) {
        this.hingePosition = hingePosition;
    }

    public Glass getGlass() {
        return glass;
    }

    public void setGlass(Glass glass) {
        this.glass = glass;
    }

    public Boolean getStep() {
        return step;
    }

    public void setStep(Boolean step) {
        this.step = step;
    }

    public Boolean getJali() {
        return jali;
    }

    public void setJali(Boolean jali) {
        this.jali = jali;
    }

    public Integer getStraightener() {
        return straightener;
    }

    public void setStraightener(Integer straightener) {
        this.straightener = straightener;
    }

    public Double getStraightenerPrice() {
        return straightenerPrice;
    }

    public void setStraightenerPrice(Double straightenerPrice) {
        this.straightenerPrice = straightenerPrice;
    }

    public Boolean getAsPerDrawing() {
        return asPerDrawing;
    }

    public void setAsPerDrawing(Boolean asPerDrawing) {
        this.asPerDrawing = asPerDrawing;
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

    public String getIntColorCode() {
        return intColorCode;
    }

    public void setIntColorCode(String intColorCode) {
        this.intColorCode = intColorCode;
    }

    public String getColorCode() {
        return colorCode;
    }

    public void setColorCode(String colorCode) {
        this.colorCode = colorCode;
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
        hash = 47 * hash + Objects.hashCode(this.id);
        hash = 47 * hash + Objects.hashCode(this.productCode);
        hash = 47 * hash + Objects.hashCode(this.material);
        hash = 47 * hash + Objects.hashCode(this.orderHeadId);
        hash = 47 * hash + Objects.hashCode(this.component);
        hash = 47 * hash + Objects.hashCode(this.width);
        hash = 47 * hash + Objects.hashCode(this.length);
        hash = 47 * hash + Objects.hashCode(this.thickness);
        hash = 47 * hash + Objects.hashCode(this.quantity);
        hash = 47 * hash + Objects.hashCode(this.colorId);
        hash = 47 * hash + Objects.hashCode(this.intColorId);
        hash = 47 * hash + Objects.hashCode(this.price);
        hash = 47 * hash + Objects.hashCode(this.stdOneSidePrice);
        hash = 47 * hash + Objects.hashCode(this.stdBothSidePrice);
        hash = 47 * hash + Objects.hashCode(this.finish);
        hash = 47 * hash + Objects.hashCode(this.bsm);
        hash = 47 * hash + Objects.hashCode(this.grain);
        hash = 47 * hash + Objects.hashCode(this.handle);
        hash = 47 * hash + Objects.hashCode(this.handleLength);
        hash = 47 * hash + Objects.hashCode(this.handleFinish);
        hash = 47 * hash + Objects.hashCode(this.handlePrice);
        hash = 47 * hash + Objects.hashCode(this.hingePosition);
        hash = 47 * hash + Objects.hashCode(this.glass);
        hash = 47 * hash + Objects.hashCode(this.step);
        hash = 47 * hash + Objects.hashCode(this.jali);
        hash = 47 * hash + Objects.hashCode(this.straightener);
        hash = 47 * hash + Objects.hashCode(this.straightenerPrice);
        hash = 47 * hash + Objects.hashCode(this.asPerDrawing);
        hash = 47 * hash + Objects.hashCode(this.remark);
        hash = 47 * hash + Objects.hashCode(this.orderFor);
        hash = 47 * hash + Objects.hashCode(this.intColorCode);
        hash = 47 * hash + Objects.hashCode(this.colorCode);
        hash = 47 * hash + Objects.hashCode(this.discountPer);
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
        final ShutterOrderDetails other = (ShutterOrderDetails) obj;
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
        if (!Objects.equals(this.handle, other.handle)) {
            return false;
        }
        if (!Objects.equals(this.handleFinish, other.handleFinish)) {
            return false;
        }
        if (!Objects.equals(this.remark, other.remark)) {
            return false;
        }
        if (!Objects.equals(this.orderFor, other.orderFor)) {
            return false;
        }
        if (!Objects.equals(this.intColorCode, other.intColorCode)) {
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
        if (!Objects.equals(this.handleLength, other.handleLength)) {
            return false;
        }
        if (!Objects.equals(this.handlePrice, other.handlePrice)) {
            return false;
        }
        if (this.hingePosition != other.hingePosition) {
            return false;
        }
        if (this.glass != other.glass) {
            return false;
        }
        if (!Objects.equals(this.step, other.step)) {
            return false;
        }
        if (!Objects.equals(this.jali, other.jali)) {
            return false;
        }
        if (!Objects.equals(this.straightener, other.straightener)) {
            return false;
        }
        if (!Objects.equals(this.straightenerPrice, other.straightenerPrice)) {
            return false;
        }
        if (!Objects.equals(this.asPerDrawing, other.asPerDrawing)) {
            return false;
        }
        if (!Objects.equals(this.discountPer, other.discountPer)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "ShutterOrderDetails{" + "id=" + id + ", productCode=" + productCode + ", material=" + material + ", orderHeadId=" + orderHeadId + ", component=" + component + ", width=" + width + ", length=" + length + ", thickness=" + thickness + ", quantity=" + quantity + ", colorId=" + colorId + ", intColorId=" + intColorId + ", price=" + price + ", stdOneSidePrice=" + stdOneSidePrice + ", stdBothSidePrice=" + stdBothSidePrice + ", finish=" + finish + ", bsm=" + bsm + ", grain=" + grain + ", handle=" + handle + ", handleLength=" + handleLength + ", handleFinish=" + handleFinish + ", handlePrice=" + handlePrice + ", hingePosition=" + hingePosition + ", glass=" + glass + ", step=" + step + ", jali=" + jali + ", straightener=" + straightener + ", straightenerPrice=" + straightenerPrice + ", asPerDrawing=" + asPerDrawing + ", remark=" + remark + ", orderFor=" + orderFor + ", intColorCode=" + intColorCode + ", colorCode=" + colorCode + ", discountPer=" + discountPer + '}';
    }
    
}
