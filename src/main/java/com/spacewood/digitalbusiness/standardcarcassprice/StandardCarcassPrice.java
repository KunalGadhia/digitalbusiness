/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.standardcarcassprice;

import java.util.Objects;

/**
 *
 * @author webdesign
 */
public class StandardCarcassPrice {

    private Integer id;
    private String code;
    private String description;
    private Double width;
    private Double length;
    private Double depth;
    private Integer shelf;
    private String material;
    private Integer pbPrice;
    private Integer mdfPrice;
    private Integer hdfPrice;
    private Integer plyPrice;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getWidth() {
        return width;
    }

    public void setWidth(Double width) {
        this.width = width;
    }

    public Double getLength() {
        return length;
    }

    public void setLength(Double length) {
        this.length = length;
    }

    public Double getDepth() {
        return depth;
    }

    public void setDepth(Double depth) {
        this.depth = depth;
    }

    public Integer getShelf() {
        return shelf;
    }

    public void setShelf(Integer shelf) {
        this.shelf = shelf;
    }

    public String getMaterial() {
        return material;
    }

    public void setMaterial(String material) {
        this.material = material;
    }

    public Integer getPbPrice() {
        return pbPrice;
    }

    public void setPbPrice(Integer pbPrice) {
        this.pbPrice = pbPrice;
    }

    public Integer getMdfPrice() {
        return mdfPrice;
    }

    public void setMdfPrice(Integer mdfPrice) {
        this.mdfPrice = mdfPrice;
    }

    public Integer getHdfPrice() {
        return hdfPrice;
    }

    public void setHdfPrice(Integer hdfPrice) {
        this.hdfPrice = hdfPrice;
    }

    public Integer getPlyPrice() {
        return plyPrice;
    }

    public void setPlyPrice(Integer plyPrice) {
        this.plyPrice = plyPrice;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 59 * hash + Objects.hashCode(this.id);
        hash = 59 * hash + Objects.hashCode(this.code);
        hash = 59 * hash + Objects.hashCode(this.description);
        hash = 59 * hash + Objects.hashCode(this.width);
        hash = 59 * hash + Objects.hashCode(this.length);
        hash = 59 * hash + Objects.hashCode(this.depth);
        hash = 59 * hash + Objects.hashCode(this.shelf);
        hash = 59 * hash + Objects.hashCode(this.material);
        hash = 59 * hash + Objects.hashCode(this.pbPrice);
        hash = 59 * hash + Objects.hashCode(this.mdfPrice);
        hash = 59 * hash + Objects.hashCode(this.hdfPrice);
        hash = 59 * hash + Objects.hashCode(this.plyPrice);
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
        final StandardCarcassPrice other = (StandardCarcassPrice) obj;
        if (!Objects.equals(this.code, other.code)) {
            return false;
        }
        if (!Objects.equals(this.description, other.description)) {
            return false;
        }
        if (!Objects.equals(this.material, other.material)) {
            return false;
        }
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        if (!Objects.equals(this.width, other.width)) {
            return false;
        }
        if (!Objects.equals(this.length, other.length)) {
            return false;
        }
        if (!Objects.equals(this.depth, other.depth)) {
            return false;
        }
        if (!Objects.equals(this.shelf, other.shelf)) {
            return false;
        }
        if (!Objects.equals(this.pbPrice, other.pbPrice)) {
            return false;
        }
        if (!Objects.equals(this.mdfPrice, other.mdfPrice)) {
            return false;
        }
        if (!Objects.equals(this.hdfPrice, other.hdfPrice)) {
            return false;
        }
        if (!Objects.equals(this.plyPrice, other.plyPrice)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "StandardCarcassPrice{" + "id=" + id + ", code=" + code + ", description=" + description + ", width=" + width + ", length=" + length + ", depth=" + depth + ", shelf=" + shelf + ", material=" + material + ", pbPrice=" + pbPrice + ", mdfPrice=" + mdfPrice + ", hdfPrice=" + hdfPrice + ", plyPrice=" + plyPrice + '}';
    }

}
