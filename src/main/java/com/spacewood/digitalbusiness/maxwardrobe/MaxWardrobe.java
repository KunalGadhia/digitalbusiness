/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.maxwardrobe;

import java.util.Objects;

/**
 *
 * @author webdesign
 */
public class MaxWardrobe {
    private Integer id;
    private Category category;
    private String productCode;
    private String description;
    private Double width;
    private Double height;
    private Double depth;
    private Double cpPpbPrice;
    private Double cpHdHmrPrice;
    private Double cpHdfPrice;
    private Double spFoiledMattPrice;
    private Double spFoiledGlossyPrice;
    private Double spPrelamMattPrice;
    private Double spPcppbPrice;
    private Double spGlassG50AluPrice;
    private Double spPvcMdfStdPrice;
    private Double spPvcMdfDesgPrice;
    private Double spPvcMdfGlossyPrice;
    private Double spPvcMdfPremPrice;
    private Double softHingesPrice;

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

    public Double getWidth() {
        return width;
    }

    public void setWidth(Double width) {
        this.width = width;
    }

    public Double getHeight() {
        return height;
    }

    public void setHeight(Double height) {
        this.height = height;
    }

    public Double getDepth() {
        return depth;
    }

    public void setDepth(Double depth) {
        this.depth = depth;
    }

    public Double getCpPpbPrice() {
        return cpPpbPrice;
    }

    public void setCpPpbPrice(Double cpPpbPrice) {
        this.cpPpbPrice = cpPpbPrice;
    }

    public Double getCpHdHmrPrice() {
        return cpHdHmrPrice;
    }

    public void setCpHdHmrPrice(Double cpHdHmrPrice) {
        this.cpHdHmrPrice = cpHdHmrPrice;
    }

    public Double getCpHdfPrice() {
        return cpHdfPrice;
    }

    public void setCpHdfPrice(Double cpHdfPrice) {
        this.cpHdfPrice = cpHdfPrice;
    }

    public Double getSpFoiledMattPrice() {
        return spFoiledMattPrice;
    }

    public void setSpFoiledMattPrice(Double spFoiledMattPrice) {
        this.spFoiledMattPrice = spFoiledMattPrice;
    }

    public Double getSpFoiledGlossyPrice() {
        return spFoiledGlossyPrice;
    }

    public void setSpFoiledGlossyPrice(Double spFoiledGlossyPrice) {
        this.spFoiledGlossyPrice = spFoiledGlossyPrice;
    }

    public Double getSpPrelamMattPrice() {
        return spPrelamMattPrice;
    }

    public void setSpPrelamMattPrice(Double spPrelamMattPrice) {
        this.spPrelamMattPrice = spPrelamMattPrice;
    }

    public Double getSpPcppbPrice() {
        return spPcppbPrice;
    }

    public void setSpPcppbPrice(Double spPcppbPrice) {
        this.spPcppbPrice = spPcppbPrice;
    }

    public Double getSpGlassG50AluPrice() {
        return spGlassG50AluPrice;
    }

    public void setSpGlassG50AluPrice(Double spGlassG50AluPrice) {
        this.spGlassG50AluPrice = spGlassG50AluPrice;
    }

    public Double getSpPvcMdfStdPrice() {
        return spPvcMdfStdPrice;
    }

    public void setSpPvcMdfStdPrice(Double spPvcMdfStdPrice) {
        this.spPvcMdfStdPrice = spPvcMdfStdPrice;
    }

    public Double getSpPvcMdfDesgPrice() {
        return spPvcMdfDesgPrice;
    }

    public void setSpPvcMdfDesgPrice(Double spPvcMdfDesgPrice) {
        this.spPvcMdfDesgPrice = spPvcMdfDesgPrice;
    }

    public Double getSpPvcMdfGlossyPrice() {
        return spPvcMdfGlossyPrice;
    }

    public void setSpPvcMdfGlossyPrice(Double spPvcMdfGlossyPrice) {
        this.spPvcMdfGlossyPrice = spPvcMdfGlossyPrice;
    }

    public Double getSpPvcMdfPremPrice() {
        return spPvcMdfPremPrice;
    }

    public void setSpPvcMdfPremPrice(Double spPvcMdfPremPrice) {
        this.spPvcMdfPremPrice = spPvcMdfPremPrice;
    }

    public Double getSoftHingesPrice() {
        return softHingesPrice;
    }

    public void setSoftHingesPrice(Double softHingesPrice) {
        this.softHingesPrice = softHingesPrice;
    }

    @Override
    public int hashCode() {
        int hash = 3;
        hash = 97 * hash + Objects.hashCode(this.id);
        hash = 97 * hash + Objects.hashCode(this.category);
        hash = 97 * hash + Objects.hashCode(this.productCode);
        hash = 97 * hash + Objects.hashCode(this.description);
        hash = 97 * hash + Objects.hashCode(this.width);
        hash = 97 * hash + Objects.hashCode(this.height);
        hash = 97 * hash + Objects.hashCode(this.depth);
        hash = 97 * hash + Objects.hashCode(this.cpPpbPrice);
        hash = 97 * hash + Objects.hashCode(this.cpHdHmrPrice);
        hash = 97 * hash + Objects.hashCode(this.cpHdfPrice);
        hash = 97 * hash + Objects.hashCode(this.spFoiledMattPrice);
        hash = 97 * hash + Objects.hashCode(this.spFoiledGlossyPrice);
        hash = 97 * hash + Objects.hashCode(this.spPrelamMattPrice);
        hash = 97 * hash + Objects.hashCode(this.spPcppbPrice);
        hash = 97 * hash + Objects.hashCode(this.spGlassG50AluPrice);
        hash = 97 * hash + Objects.hashCode(this.spPvcMdfStdPrice);
        hash = 97 * hash + Objects.hashCode(this.spPvcMdfDesgPrice);
        hash = 97 * hash + Objects.hashCode(this.spPvcMdfGlossyPrice);
        hash = 97 * hash + Objects.hashCode(this.spPvcMdfPremPrice);
        hash = 97 * hash + Objects.hashCode(this.softHingesPrice);
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
        final MaxWardrobe other = (MaxWardrobe) obj;
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
        if (!Objects.equals(this.width, other.width)) {
            return false;
        }
        if (!Objects.equals(this.height, other.height)) {
            return false;
        }
        if (!Objects.equals(this.depth, other.depth)) {
            return false;
        }
        if (!Objects.equals(this.cpPpbPrice, other.cpPpbPrice)) {
            return false;
        }
        if (!Objects.equals(this.cpHdHmrPrice, other.cpHdHmrPrice)) {
            return false;
        }
        if (!Objects.equals(this.cpHdfPrice, other.cpHdfPrice)) {
            return false;
        }
        if (!Objects.equals(this.spFoiledMattPrice, other.spFoiledMattPrice)) {
            return false;
        }
        if (!Objects.equals(this.spFoiledGlossyPrice, other.spFoiledGlossyPrice)) {
            return false;
        }
        if (!Objects.equals(this.spPrelamMattPrice, other.spPrelamMattPrice)) {
            return false;
        }
        if (!Objects.equals(this.spPcppbPrice, other.spPcppbPrice)) {
            return false;
        }
        if (!Objects.equals(this.spGlassG50AluPrice, other.spGlassG50AluPrice)) {
            return false;
        }
        if (!Objects.equals(this.spPvcMdfStdPrice, other.spPvcMdfStdPrice)) {
            return false;
        }
        if (!Objects.equals(this.spPvcMdfDesgPrice, other.spPvcMdfDesgPrice)) {
            return false;
        }
        if (!Objects.equals(this.spPvcMdfGlossyPrice, other.spPvcMdfGlossyPrice)) {
            return false;
        }
        if (!Objects.equals(this.spPvcMdfPremPrice, other.spPvcMdfPremPrice)) {
            return false;
        }
        if (!Objects.equals(this.softHingesPrice, other.softHingesPrice)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "MaxWardrobe{" + "id=" + id + ", category=" + category + ", productCode=" + productCode + ", description=" + description + ", width=" + width + ", height=" + height + ", depth=" + depth + ", cpPpbPrice=" + cpPpbPrice + ", cpHdHmrPrice=" + cpHdHmrPrice + ", cpHdfPrice=" + cpHdfPrice + ", spFoiledMattPrice=" + spFoiledMattPrice + ", spFoiledGlossyPrice=" + spFoiledGlossyPrice + ", spPrelamMattPrice=" + spPrelamMattPrice + ", spPcppbPrice=" + spPcppbPrice + ", spGlassG50AluPrice=" + spGlassG50AluPrice + ", spPvcMdfStdPrice=" + spPvcMdfStdPrice + ", spPvcMdfDesgPrice=" + spPvcMdfDesgPrice + ", spPvcMdfGlossyPrice=" + spPvcMdfGlossyPrice + ", spPvcMdfPremPrice=" + spPvcMdfPremPrice + ", softHingesPrice=" + softHingesPrice + '}';
    }
                        
}
