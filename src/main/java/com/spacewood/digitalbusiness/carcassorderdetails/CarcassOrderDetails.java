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

    @Override
    public int hashCode() {
        int hash = 3;
        hash = 67 * hash + Objects.hashCode(this.id);
        hash = 67 * hash + Objects.hashCode(this.orderHeadId);
        hash = 67 * hash + Objects.hashCode(this.stdCarcassPriceId);
        hash = 67 * hash + Objects.hashCode(this.intColorId);
        hash = 67 * hash + Objects.hashCode(this.leftColorId);
        hash = 67 * hash + Objects.hashCode(this.rightColorId);
        hash = 67 * hash + Objects.hashCode(this.backColorId);
        hash = 67 * hash + Objects.hashCode(this.topColorId);
        hash = 67 * hash + Objects.hashCode(this.bottomColorId);
        hash = 67 * hash + Objects.hashCode(this.productCode);
        hash = 67 * hash + Objects.hashCode(this.component);
        hash = 67 * hash + Objects.hashCode(this.material);
        hash = 67 * hash + Objects.hashCode(this.length);
        hash = 67 * hash + Objects.hashCode(this.width);
        hash = 67 * hash + Objects.hashCode(this.depth);
        hash = 67 * hash + Objects.hashCode(this.nonStandardDimension);
        hash = 67 * hash + Objects.hashCode(this.shelf);
        hash = 67 * hash + Objects.hashCode(this.shelfCount);
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
        return true;
    }

    @Override
    public String toString() {
        return "CarcassOrderDetails{" + "id=" + id + ", orderHeadId=" + orderHeadId + ", stdCarcassPriceId=" + stdCarcassPriceId + ", intColorId=" + intColorId + ", leftColorId=" + leftColorId + ", rightColorId=" + rightColorId + ", backColorId=" + backColorId + ", topColorId=" + topColorId + ", bottomColorId=" + bottomColorId + ", productCode=" + productCode + ", component=" + component + ", material=" + material + ", length=" + length + ", width=" + width + ", depth=" + depth + ", nonStandardDimension=" + nonStandardDimension + ", shelf=" + shelf + ", shelfCount=" + shelfCount + '}';
    }
    
}
