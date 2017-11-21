/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.carcassorderdetails;

import java.util.Objects;

/**
 *
 * @author webdesign
 */
public class CarcassOrderDetails {

    private Integer id;
    private Integer orderHeadId;
    private Integer stdCarcassPriceId;
    private Integer intColorId;
    private Integer leftColorId;
    private Integer rightColorId;
    private Integer backColorId;
    private Integer topColorId;
    private Integer bottomColorId;
    private String productCode;
    private String component;
    private String material;
    private Double length;
    private Double width;
    private Double depth;
    private Boolean nonStandardDimension;
    private Boolean shelf;
    private Integer shelfCount;
    private SideMatching sideMatching;
    private SideSelection sideSelection;
    private String sideMaterial;
    private String sideFinish;
    private Integer quantity;
    private Double price;
    private Double stdMaterialPrice;
    private Double finishPrice;
    private Integer sectionProfileId;
    private Double sectionProfilePrice;

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

    public Integer getStdCarcassPriceId() {
        return stdCarcassPriceId;
    }

    public void setStdCarcassPriceId(Integer stdCarcassPriceId) {
        this.stdCarcassPriceId = stdCarcassPriceId;
    }

    public Integer getIntColorId() {
        return intColorId;
    }

    public void setIntColorId(Integer intColorId) {
        this.intColorId = intColorId;
    }

    public Integer getLeftColorId() {
        return leftColorId;
    }

    public void setLeftColorId(Integer leftColorId) {
        this.leftColorId = leftColorId;
    }

    public Integer getRightColorId() {
        return rightColorId;
    }

    public void setRightColorId(Integer rightColorId) {
        this.rightColorId = rightColorId;
    }

    public Integer getBackColorId() {
        return backColorId;
    }

    public void setBackColorId(Integer backColorId) {
        this.backColorId = backColorId;
    }

    public Integer getTopColorId() {
        return topColorId;
    }

    public void setTopColorId(Integer topColorId) {
        this.topColorId = topColorId;
    }

    public Integer getBottomColorId() {
        return bottomColorId;
    }

    public void setBottomColorId(Integer bottomColorId) {
        this.bottomColorId = bottomColorId;
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

    public String getMaterial() {
        return material;
    }

    public void setMaterial(String material) {
        this.material = material;
    }

    public Double getLength() {
        return length;
    }

    public void setLength(Double length) {
        this.length = length;
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

    public Boolean getNonStandardDimension() {
        return nonStandardDimension;
    }

    public void setNonStandardDimension(Boolean nonStandardDimension) {
        this.nonStandardDimension = nonStandardDimension;
    }

    public Boolean getShelf() {
        return shelf;
    }

    public void setShelf(Boolean shelf) {
        this.shelf = shelf;
    }

    public Integer getShelfCount() {
        return shelfCount;
    }

    public void setShelfCount(Integer shelfCount) {
        this.shelfCount = shelfCount;
    }

    public SideMatching getSideMatching() {
        return sideMatching;
    }

    public void setSideMatching(SideMatching sideMatching) {
        this.sideMatching = sideMatching;
    }

    public SideSelection getSideSelection() {
        return sideSelection;
    }

    public void setSideSelection(SideSelection sideSelection) {
        this.sideSelection = sideSelection;
    }

    public String getSideMaterial() {
        return sideMaterial;
    }

    public void setSideMaterial(String sideMaterial) {
        this.sideMaterial = sideMaterial;
    }

    public String getSideFinish() {
        return sideFinish;
    }

    public void setSideFinish(String sideFinish) {
        this.sideFinish = sideFinish;
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

    public Double getStdMaterialPrice() {
        return stdMaterialPrice;
    }

    public void setStdMaterialPrice(Double stdMaterialPrice) {
        this.stdMaterialPrice = stdMaterialPrice;
    }

    public Double getFinishPrice() {
        return finishPrice;
    }

    public void setFinishPrice(Double finishPrice) {
        this.finishPrice = finishPrice;
    }

    public Integer getSectionProfileId() {
        return sectionProfileId;
    }

    public void setSectionProfileId(Integer sectionProfileId) {
        this.sectionProfileId = sectionProfileId;
    }

    public Double getSectionProfilePrice() {
        return sectionProfilePrice;
    }

    public void setSectionProfilePrice(Double sectionProfilePrice) {
        this.sectionProfilePrice = sectionProfilePrice;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 23 * hash + Objects.hashCode(this.id);
        hash = 23 * hash + Objects.hashCode(this.orderHeadId);
        hash = 23 * hash + Objects.hashCode(this.stdCarcassPriceId);
        hash = 23 * hash + Objects.hashCode(this.intColorId);
        hash = 23 * hash + Objects.hashCode(this.leftColorId);
        hash = 23 * hash + Objects.hashCode(this.rightColorId);
        hash = 23 * hash + Objects.hashCode(this.backColorId);
        hash = 23 * hash + Objects.hashCode(this.topColorId);
        hash = 23 * hash + Objects.hashCode(this.bottomColorId);
        hash = 23 * hash + Objects.hashCode(this.productCode);
        hash = 23 * hash + Objects.hashCode(this.component);
        hash = 23 * hash + Objects.hashCode(this.material);
        hash = 23 * hash + Objects.hashCode(this.length);
        hash = 23 * hash + Objects.hashCode(this.width);
        hash = 23 * hash + Objects.hashCode(this.depth);
        hash = 23 * hash + Objects.hashCode(this.nonStandardDimension);
        hash = 23 * hash + Objects.hashCode(this.shelf);
        hash = 23 * hash + Objects.hashCode(this.shelfCount);
        hash = 23 * hash + Objects.hashCode(this.sideMatching);
        hash = 23 * hash + Objects.hashCode(this.sideSelection);
        hash = 23 * hash + Objects.hashCode(this.sideMaterial);
        hash = 23 * hash + Objects.hashCode(this.sideFinish);
        hash = 23 * hash + Objects.hashCode(this.quantity);
        hash = 23 * hash + Objects.hashCode(this.price);
        hash = 23 * hash + Objects.hashCode(this.stdMaterialPrice);
        hash = 23 * hash + Objects.hashCode(this.finishPrice);
        hash = 23 * hash + Objects.hashCode(this.sectionProfileId);
        hash = 23 * hash + Objects.hashCode(this.sectionProfilePrice);
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
        final CarcassOrderDetails other = (CarcassOrderDetails) obj;
        if (!Objects.equals(this.productCode, other.productCode)) {
            return false;
        }
        if (!Objects.equals(this.component, other.component)) {
            return false;
        }
        if (!Objects.equals(this.material, other.material)) {
            return false;
        }
        if (!Objects.equals(this.sideMaterial, other.sideMaterial)) {
            return false;
        }
        if (!Objects.equals(this.sideFinish, other.sideFinish)) {
            return false;
        }
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        if (!Objects.equals(this.orderHeadId, other.orderHeadId)) {
            return false;
        }
        if (!Objects.equals(this.stdCarcassPriceId, other.stdCarcassPriceId)) {
            return false;
        }
        if (!Objects.equals(this.intColorId, other.intColorId)) {
            return false;
        }
        if (!Objects.equals(this.leftColorId, other.leftColorId)) {
            return false;
        }
        if (!Objects.equals(this.rightColorId, other.rightColorId)) {
            return false;
        }
        if (!Objects.equals(this.backColorId, other.backColorId)) {
            return false;
        }
        if (!Objects.equals(this.topColorId, other.topColorId)) {
            return false;
        }
        if (!Objects.equals(this.bottomColorId, other.bottomColorId)) {
            return false;
        }
        if (!Objects.equals(this.length, other.length)) {
            return false;
        }
        if (!Objects.equals(this.width, other.width)) {
            return false;
        }
        if (!Objects.equals(this.depth, other.depth)) {
            return false;
        }
        if (!Objects.equals(this.nonStandardDimension, other.nonStandardDimension)) {
            return false;
        }
        if (!Objects.equals(this.shelf, other.shelf)) {
            return false;
        }
        if (!Objects.equals(this.shelfCount, other.shelfCount)) {
            return false;
        }
        if (this.sideMatching != other.sideMatching) {
            return false;
        }
        if (this.sideSelection != other.sideSelection) {
            return false;
        }
        if (!Objects.equals(this.quantity, other.quantity)) {
            return false;
        }
        if (!Objects.equals(this.price, other.price)) {
            return false;
        }
        if (!Objects.equals(this.stdMaterialPrice, other.stdMaterialPrice)) {
            return false;
        }
        if (!Objects.equals(this.finishPrice, other.finishPrice)) {
            return false;
        }
        if (!Objects.equals(this.sectionProfileId, other.sectionProfileId)) {
            return false;
        }
        if (!Objects.equals(this.sectionProfilePrice, other.sectionProfilePrice)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "CarcassOrderDetails{" + "id=" + id + ", orderHeadId=" + orderHeadId + ", stdCarcassPriceId=" + stdCarcassPriceId + ", intColorId=" + intColorId + ", leftColorId=" + leftColorId + ", rightColorId=" + rightColorId + ", backColorId=" + backColorId + ", topColorId=" + topColorId + ", bottomColorId=" + bottomColorId + ", productCode=" + productCode + ", component=" + component + ", material=" + material + ", length=" + length + ", width=" + width + ", depth=" + depth + ", nonStandardDimension=" + nonStandardDimension + ", shelf=" + shelf + ", shelfCount=" + shelfCount + ", sideMatching=" + sideMatching + ", sideSelection=" + sideSelection + ", sideMaterial=" + sideMaterial + ", sideFinish=" + sideFinish + ", quantity=" + quantity + ", price=" + price + ", stdMaterialPrice=" + stdMaterialPrice + ", finishPrice=" + finishPrice + ", sectionProfileId=" + sectionProfileId + ", sectionProfilePrice=" + sectionProfilePrice + '}';
    }
    
}
