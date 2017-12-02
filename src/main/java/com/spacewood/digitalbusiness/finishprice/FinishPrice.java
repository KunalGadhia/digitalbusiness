/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.finishprice;

import java.util.Objects;

/**
 *
 * @author webdesign
 */
public class FinishPrice {
    private Integer id;
    private String finishCode;
    private Integer materialId;
    private String finishName;
    private Double price;
    private Boolean forCarcass;
    private Boolean forShutter;
    private FinishCategory category;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getFinishCode() {
        return finishCode;
    }

    public void setFinishCode(String finishCode) {
        this.finishCode = finishCode;
    }

    public Integer getMaterialId() {
        return materialId;
    }

    public void setMaterialId(Integer materialId) {
        this.materialId = materialId;
    }

    public String getFinishName() {
        return finishName;
    }

    public void setFinishName(String finishName) {
        this.finishName = finishName;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Boolean getForCarcass() {
        return forCarcass;
    }

    public void setForCarcass(Boolean forCarcass) {
        this.forCarcass = forCarcass;
    }

    public Boolean getForShutter() {
        return forShutter;
    }

    public void setForShutter(Boolean forShutter) {
        this.forShutter = forShutter;
    }

    public FinishCategory getCategory() {
        return category;
    }

    public void setCategory(FinishCategory category) {
        this.category = category;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 17 * hash + Objects.hashCode(this.id);
        hash = 17 * hash + Objects.hashCode(this.finishCode);
        hash = 17 * hash + Objects.hashCode(this.materialId);
        hash = 17 * hash + Objects.hashCode(this.finishName);
        hash = 17 * hash + Objects.hashCode(this.price);
        hash = 17 * hash + Objects.hashCode(this.forCarcass);
        hash = 17 * hash + Objects.hashCode(this.forShutter);
        hash = 17 * hash + Objects.hashCode(this.category);
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
        final FinishPrice other = (FinishPrice) obj;
        if (!Objects.equals(this.finishCode, other.finishCode)) {
            return false;
        }
        if (!Objects.equals(this.finishName, other.finishName)) {
            return false;
        }
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        if (!Objects.equals(this.materialId, other.materialId)) {
            return false;
        }
        if (!Objects.equals(this.price, other.price)) {
            return false;
        }
        if (!Objects.equals(this.forCarcass, other.forCarcass)) {
            return false;
        }
        if (!Objects.equals(this.forShutter, other.forShutter)) {
            return false;
        }
        if (this.category != other.category) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "FinishPrice{" + "id=" + id + ", finishCode=" + finishCode + ", materialId=" + materialId + ", finishName=" + finishName + ", price=" + price + ", forCarcass=" + forCarcass + ", forShutter=" + forShutter + ", category=" + category + '}';
    }
    
}

