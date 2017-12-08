/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.shutterfinishprice;

import java.util.Objects;

/**
 *
 * @author webdesign
 */
public class ShutterFinishPrice {
    private Integer id;
    private String finish;
    private String material;
    private Double thickness;
    private Double oneSidePrice;
    private Double bothSidePrice;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

    public Double getOneSidePrice() {
        return oneSidePrice;
    }

    public void setOneSidePrice(Double oneSidePrice) {
        this.oneSidePrice = oneSidePrice;
    }

    public Double getBothSidePrice() {
        return bothSidePrice;
    }

    public void setBothSidePrice(Double bothSidePrice) {
        this.bothSidePrice = bothSidePrice;
    }

    @Override
    public int hashCode() {
        int hash = 5;
        hash = 97 * hash + Objects.hashCode(this.id);
        hash = 97 * hash + Objects.hashCode(this.finish);
        hash = 97 * hash + Objects.hashCode(this.material);
        hash = 97 * hash + Objects.hashCode(this.thickness);
        hash = 97 * hash + Objects.hashCode(this.oneSidePrice);
        hash = 97 * hash + Objects.hashCode(this.bothSidePrice);
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
        final ShutterFinishPrice other = (ShutterFinishPrice) obj;
        if (!Objects.equals(this.finish, other.finish)) {
            return false;
        }
        if (!Objects.equals(this.material, other.material)) {
            return false;
        }
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        if (!Objects.equals(this.thickness, other.thickness)) {
            return false;
        }
        if (!Objects.equals(this.oneSidePrice, other.oneSidePrice)) {
            return false;
        }
        if (!Objects.equals(this.bothSidePrice, other.bothSidePrice)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "ShutterFinishPrice{" + "id=" + id + ", finish=" + finish + ", material=" + material + ", thickness=" + thickness + ", oneSidePrice=" + oneSidePrice + ", bothSidePrice=" + bothSidePrice + '}';
    }
            
}
