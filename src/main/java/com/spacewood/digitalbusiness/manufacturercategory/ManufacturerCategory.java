/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.manufacturercategory;

import java.util.List;
import java.util.Objects;

/**
 *
 * @author webdesign
 */
public class ManufacturerCategory {
    private Integer id;
    private String categoryName;
    private String categoryCode;    
    private Integer createdBy;
    private List<Integer> manufacturers;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public String getCategoryCode() {
        return categoryCode;
    }

    public void setCategoryCode(String categoryCode) {
        this.categoryCode = categoryCode;
    }

    public Integer getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(Integer createdBy) {
        this.createdBy = createdBy;
    }

    public List<Integer> getManufacturers() {
        return manufacturers;
    }

    public void setManufacturers(List<Integer> manufacturers) {
        this.manufacturers = manufacturers;
    }

    @Override
    public int hashCode() {
        int hash = 3;
        hash = 29 * hash + Objects.hashCode(this.id);
        hash = 29 * hash + Objects.hashCode(this.categoryName);
        hash = 29 * hash + Objects.hashCode(this.categoryCode);
        hash = 29 * hash + Objects.hashCode(this.createdBy);
        hash = 29 * hash + Objects.hashCode(this.manufacturers);
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
        final ManufacturerCategory other = (ManufacturerCategory) obj;
        if (!Objects.equals(this.categoryName, other.categoryName)) {
            return false;
        }
        if (!Objects.equals(this.categoryCode, other.categoryCode)) {
            return false;
        }
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        if (!Objects.equals(this.createdBy, other.createdBy)) {
            return false;
        }
        if (!Objects.equals(this.manufacturers, other.manufacturers)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "ManufacturerCategory{" + "id=" + id + ", categoryName=" + categoryName + ", categoryCode=" + categoryCode + ", createdBy=" + createdBy + ", manufacturers=" + manufacturers + '}';
    }
            
}
