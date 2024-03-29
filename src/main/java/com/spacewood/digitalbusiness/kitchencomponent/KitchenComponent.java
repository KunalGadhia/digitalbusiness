/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.kitchencomponent;

import java.util.List;
import java.util.Objects;

/**
 *
 * @author webdesign
 */
public class KitchenComponent {
    private Integer id;
    private String component;
    private String componentCode;
    private KitchenComponentCategory category;
    private List<String> image;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getComponent() {
        return component;
    }

    public void setComponent(String component) {
        this.component = component;
    }

    public String getComponentCode() {
        return componentCode;
    }

    public void setComponentCode(String componentCode) {
        this.componentCode = componentCode;
    }

    public KitchenComponentCategory getCategory() {
        return category;
    }

    public void setCategory(KitchenComponentCategory category) {
        this.category = category;
    }

    public List<String> getImage() {
        return image;
    }

    public void setImage(List<String> image) {
        this.image = image;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 23 * hash + Objects.hashCode(this.id);
        hash = 23 * hash + Objects.hashCode(this.component);
        hash = 23 * hash + Objects.hashCode(this.componentCode);
        hash = 23 * hash + Objects.hashCode(this.category);
        hash = 23 * hash + Objects.hashCode(this.image);
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
        final KitchenComponent other = (KitchenComponent) obj;
        if (!Objects.equals(this.component, other.component)) {
            return false;
        }
        if (!Objects.equals(this.componentCode, other.componentCode)) {
            return false;
        }
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        if (this.category != other.category) {
            return false;
        }
        if (!Objects.equals(this.image, other.image)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "KitchenComponent{" + "id=" + id + ", component=" + component + ", componentCode=" + componentCode + ", category=" + category + ", image=" + image + '}';
    }
                
}
