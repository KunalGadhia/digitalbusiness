/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.standardcarcassdimension;

import java.util.Objects;

/**
 *
 * @author webdesign
 */
public class StandardCarcassDimension {
 private Integer id;
 private DimensionAttribute dimensionAttribute;
 private CarcassCategory carcassCategory;
 private double stdValue;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public DimensionAttribute getDimensionAttribute() {
        return dimensionAttribute;
    }

    public void setDimensionAttribute(DimensionAttribute dimensionAttribute) {
        this.dimensionAttribute = dimensionAttribute;
    }

    public CarcassCategory getCarcassCategory() {
        return carcassCategory;
    }

    public void setCarcassCategory(CarcassCategory carcassCategory) {
        this.carcassCategory = carcassCategory;
    }

    public double getStdValue() {
        return stdValue;
    }

    public void setStdValue(double stdValue) {
        this.stdValue = stdValue;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 41 * hash + Objects.hashCode(this.id);
        hash = 41 * hash + Objects.hashCode(this.dimensionAttribute);
        hash = 41 * hash + Objects.hashCode(this.carcassCategory);
        hash = 41 * hash + (int) (Double.doubleToLongBits(this.stdValue) ^ (Double.doubleToLongBits(this.stdValue) >>> 32));
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
        final StandardCarcassDimension other = (StandardCarcassDimension) obj;
        if (Double.doubleToLongBits(this.stdValue) != Double.doubleToLongBits(other.stdValue)) {
            return false;
        }
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        if (this.dimensionAttribute != other.dimensionAttribute) {
            return false;
        }
        if (this.carcassCategory != other.carcassCategory) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "StandardCarcassDimension{" + "id=" + id + ", dimensionAttribute=" + dimensionAttribute + ", carcassCategory=" + carcassCategory + ", stdValue=" + stdValue + '}';
    }

    
  
}
