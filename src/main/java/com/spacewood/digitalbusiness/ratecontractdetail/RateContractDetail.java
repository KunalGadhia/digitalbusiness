/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.ratecontractdetail;

import java.util.Objects;

/**
 *
 * @author webdesign
 */
public class RateContractDetail {
    private Integer id;
    private Integer rateContractId;
    private String finish;
    private String material;
    private Double thickness;
    private Component component;
    private Double discountPer;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getRateContractId() {
        return rateContractId;
    }

    public void setRateContractId(Integer rateContractId) {
        this.rateContractId = rateContractId;
    }

    public String getFinish() {
        return finish;
    }

    public void setFinish(String finish) {
        this.finish = finish;
    }

    public String getMaterial() {
        return material;
    }

    public void setMaterial(String material) {
        this.material = material;
    }

    public Double getThickness() {
        return thickness;
    }

    public void setThickness(Double thickness) {
        this.thickness = thickness;
    }

    public Component getComponent() {
        return component;
    }

    public void setComponent(Component component) {
        this.component = component;
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
        hash = 79 * hash + Objects.hashCode(this.id);
        hash = 79 * hash + Objects.hashCode(this.rateContractId);
        hash = 79 * hash + Objects.hashCode(this.finish);
        hash = 79 * hash + Objects.hashCode(this.material);
        hash = 79 * hash + Objects.hashCode(this.thickness);
        hash = 79 * hash + Objects.hashCode(this.component);
        hash = 79 * hash + Objects.hashCode(this.discountPer);
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
        final RateContractDetail other = (RateContractDetail) obj;
        if (!Objects.equals(this.finish, other.finish)) {
            return false;
        }
        if (!Objects.equals(this.material, other.material)) {
            return false;
        }
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        if (!Objects.equals(this.rateContractId, other.rateContractId)) {
            return false;
        }
        if (!Objects.equals(this.thickness, other.thickness)) {
            return false;
        }
        if (this.component != other.component) {
            return false;
        }
        if (!Objects.equals(this.discountPer, other.discountPer)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "RateContractDetail{" + "id=" + id + ", rateContractId=" + rateContractId + ", finish=" + finish + ", material=" + material + ", thickness=" + thickness + ", component=" + component + ", discountPer=" + discountPer + '}';
    }                    
    
}
