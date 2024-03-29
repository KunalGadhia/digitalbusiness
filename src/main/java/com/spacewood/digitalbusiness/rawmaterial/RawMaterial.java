/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.rawmaterial;

import java.util.Objects;

/**
 *
 * @author webdesign
 */
public class RawMaterial {
    private Integer id;
    private String material;
    private String materialCode;
    private Double price;
    private Double backPanelPrice;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getMaterial() {
        return material;
    }

    public void setMaterial(String material) {
        this.material = material;
    }

    public String getMaterialCode() {
        return materialCode;
    }

    public void setMaterialCode(String materialCode) {
        this.materialCode = materialCode;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Double getBackPanelPrice() {
        return backPanelPrice;
    }

    public void setBackPanelPrice(Double backPanelPrice) {
        this.backPanelPrice = backPanelPrice;
    }

    @Override
    public int hashCode() {
        int hash = 3;
        hash = 11 * hash + Objects.hashCode(this.id);
        hash = 11 * hash + Objects.hashCode(this.material);
        hash = 11 * hash + Objects.hashCode(this.materialCode);
        hash = 11 * hash + Objects.hashCode(this.price);
        hash = 11 * hash + Objects.hashCode(this.backPanelPrice);
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
        final RawMaterial other = (RawMaterial) obj;
        if (!Objects.equals(this.material, other.material)) {
            return false;
        }
        if (!Objects.equals(this.materialCode, other.materialCode)) {
            return false;
        }
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        if (!Objects.equals(this.price, other.price)) {
            return false;
        }
        if (!Objects.equals(this.backPanelPrice, other.backPanelPrice)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "RawMaterial{" + "id=" + id + ", material=" + material + ", materialCode=" + materialCode + ", price=" + price + ", backPanelPrice=" + backPanelPrice + '}';
    }
    
}
