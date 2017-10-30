/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.saletype;

import java.util.Objects;

/**
 *
 * @author webdesign
 */
public class SaleType {
    private Integer id;
    private String saleType;
    private String saleTypeCode;
    private String description;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getSaleType() {
        return saleType;
    }

    public void setSaleType(String saleType) {
        this.saleType = saleType;
    }

    public String getSaleTypeCode() {
        return saleTypeCode;
    }

    public void setSaleTypeCode(String saleTypeCode) {
        this.saleTypeCode = saleTypeCode;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 79 * hash + Objects.hashCode(this.id);
        hash = 79 * hash + Objects.hashCode(this.saleType);
        hash = 79 * hash + Objects.hashCode(this.saleTypeCode);
        hash = 79 * hash + Objects.hashCode(this.description);
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
        final SaleType other = (SaleType) obj;
        if (!Objects.equals(this.saleType, other.saleType)) {
            return false;
        }
        if (!Objects.equals(this.saleTypeCode, other.saleTypeCode)) {
            return false;
        }
        if (!Objects.equals(this.description, other.description)) {
            return false;
        }
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "SaleType{" + "id=" + id + ", saleType=" + saleType + ", saleTypeCode=" + saleTypeCode + ", description=" + description + '}';
    }
        
}
