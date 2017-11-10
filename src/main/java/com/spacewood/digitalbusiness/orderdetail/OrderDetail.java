/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.orderdetail;

import java.util.Objects;

/**
 *
 * @author webdesign
 */
public class OrderDetail {
    private Integer id;
    private Integer orderHeadId;
    private String productCode;
    private String component;
    private String material;
    private Double length;
    private Double width;
    private Double depth;
    private Boolean nonStandardDimension;
    private Boolean shelf;

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

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 79 * hash + Objects.hashCode(this.id);
        hash = 79 * hash + Objects.hashCode(this.orderHeadId);
        hash = 79 * hash + Objects.hashCode(this.productCode);
        hash = 79 * hash + Objects.hashCode(this.component);
        hash = 79 * hash + Objects.hashCode(this.material);
        hash = 79 * hash + Objects.hashCode(this.length);
        hash = 79 * hash + Objects.hashCode(this.width);
        hash = 79 * hash + Objects.hashCode(this.depth);
        hash = 79 * hash + Objects.hashCode(this.nonStandardDimension);
        hash = 79 * hash + Objects.hashCode(this.shelf);
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
        final OrderDetail other = (OrderDetail) obj;
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
        return true;
    }

    @Override
    public String toString() {
        return "OrderDetail{" + "id=" + id + ", orderHeadId=" + orderHeadId + ", productCode=" + productCode + ", component=" + component + ", material=" + material + ", length=" + length + ", width=" + width + ", depth=" + depth + ", nonStandardDimension=" + nonStandardDimension + ", shelf=" + shelf + '}';
    }
    
}
