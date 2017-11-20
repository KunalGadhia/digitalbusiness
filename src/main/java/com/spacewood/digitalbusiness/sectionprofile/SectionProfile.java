/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.sectionprofile;

import java.util.Objects;

/**
 *
 * @author webdesign
 */
public class SectionProfile {

    private Integer id;
    private String name;
    private Direction direction;
    private CarcassType carcassType;
    private Double price;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Direction getDirection() {
        return direction;
    }

    public void setDirection(Direction direction) {
        this.direction = direction;
    }

    public CarcassType getCarcassType() {
        return carcassType;
    }

    public void setCarcassType(CarcassType carcassType) {
        this.carcassType = carcassType;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    @Override
    public int hashCode() {
        int hash = 3;
        hash = 17 * hash + Objects.hashCode(this.id);
        hash = 17 * hash + Objects.hashCode(this.name);
        hash = 17 * hash + Objects.hashCode(this.direction);
        hash = 17 * hash + Objects.hashCode(this.carcassType);
        hash = 17 * hash + Objects.hashCode(this.price);
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
        final SectionProfile other = (SectionProfile) obj;
        if (!Objects.equals(this.name, other.name)) {
            return false;
        }
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        if (this.direction != other.direction) {
            return false;
        }
        if (this.carcassType != other.carcassType) {
            return false;
        }
        if (!Objects.equals(this.price, other.price)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "SectionProfile{" + "id=" + id + ", name=" + name + ", direction=" + direction + ", carcassType=" + carcassType + ", price=" + price + '}';
    }
    
}
