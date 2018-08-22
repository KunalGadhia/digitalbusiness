/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.wardrobecomponent;

import java.util.Objects;

/**
 *
 * @author swapnika
 */
public class WardrobeComponent {

    private Integer id;
    private Category category;
    private String productCode;
    private String description;
    private double width;
    private double depth;
    private double height;
    private double dp;
    private double mrp;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
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

    public double getDp() {
        return dp;
    }

    public void setDp(double dp) {
        this.dp = dp;
    }

    public double getMrp() {
        return mrp;
    }

    public void setMrp(double mrp) {
        this.mrp = mrp;
    }

    @Override
    public String toString() {
        return "WardrobeComponent{" + "id=" + id + ", category=" + category + ", productCode=" + productCode + ", description=" + description + ", width=" + width + ", depth=" + depth + ", height=" + height + ", dp=" + dp + ", mrp=" + mrp + '}';
    }

    @Override
    public int hashCode() {
        int hash = 3;
        hash = 79 * hash + Objects.hashCode(this.id);
        hash = 79 * hash + Objects.hashCode(this.category);
        hash = 79 * hash + Objects.hashCode(this.productCode);
        hash = 79 * hash + Objects.hashCode(this.description);
        hash = 79 * hash + (int) (Double.doubleToLongBits(this.width) ^ (Double.doubleToLongBits(this.width) >>> 32));
        hash = 79 * hash + (int) (Double.doubleToLongBits(this.depth) ^ (Double.doubleToLongBits(this.depth) >>> 32));
        hash = 79 * hash + (int) (Double.doubleToLongBits(this.height) ^ (Double.doubleToLongBits(this.height) >>> 32));
        hash = 79 * hash + (int) (Double.doubleToLongBits(this.dp) ^ (Double.doubleToLongBits(this.dp) >>> 32));
        hash = 79 * hash + (int) (Double.doubleToLongBits(this.mrp) ^ (Double.doubleToLongBits(this.mrp) >>> 32));
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
        final WardrobeComponent other = (WardrobeComponent) obj;
        if (Double.doubleToLongBits(this.width) != Double.doubleToLongBits(other.width)) {
            return false;
        }
        if (Double.doubleToLongBits(this.depth) != Double.doubleToLongBits(other.depth)) {
            return false;
        }
        if (Double.doubleToLongBits(this.height) != Double.doubleToLongBits(other.height)) {
            return false;
        }
        if (Double.doubleToLongBits(this.dp) != Double.doubleToLongBits(other.dp)) {
            return false;
        }
        if (Double.doubleToLongBits(this.mrp) != Double.doubleToLongBits(other.mrp)) {
            return false;
        }
        if (!Objects.equals(this.productCode, other.productCode)) {
            return false;
        }
        if (!Objects.equals(this.description, other.description)) {
            return false;
        }
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        if (this.category != other.category) {
            return false;
        }
        return true;
    }

}
