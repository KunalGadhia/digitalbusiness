/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.color;

import java.util.List;
import java.util.Objects;

/**
 *
 * @author webdesign
 */
public class Color {
    private Integer id;
    private String colorCode;
    private String colorName;
    private ColorCategory colorCategory;
    private List<String> image;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getColorCode() {
        return colorCode;
    }

    public void setColorCode(String colorCode) {
        this.colorCode = colorCode;
    }

    public String getColorName() {
        return colorName;
    }

    public void setColorName(String colorName) {
        this.colorName = colorName;
    }

    public ColorCategory getColorCategory() {
        return colorCategory;
    }

    public void setColorCategory(ColorCategory colorCategory) {
        this.colorCategory = colorCategory;
    }

    public List<String> getImage() {
        return image;
    }

    public void setImage(List<String> image) {
        this.image = image;
    }

    @Override
    public int hashCode() {
        int hash = 5;
        hash = 29 * hash + Objects.hashCode(this.id);
        hash = 29 * hash + Objects.hashCode(this.colorCode);
        hash = 29 * hash + Objects.hashCode(this.colorName);
        hash = 29 * hash + Objects.hashCode(this.colorCategory);
        hash = 29 * hash + Objects.hashCode(this.image);
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
        final Color other = (Color) obj;
        if (!Objects.equals(this.colorCode, other.colorCode)) {
            return false;
        }
        if (!Objects.equals(this.colorName, other.colorName)) {
            return false;
        }
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        if (this.colorCategory != other.colorCategory) {
            return false;
        }
        if (!Objects.equals(this.image, other.image)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "Color{" + "id=" + id + ", colorCode=" + colorCode + ", colorName=" + colorName + ", colorCategory=" + colorCategory + ", image=" + image + '}';
    }

        
}
