/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.kitchencomponent;

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

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 53 * hash + Objects.hashCode(this.id);
        hash = 53 * hash + Objects.hashCode(this.component);
        hash = 53 * hash + Objects.hashCode(this.componentCode);
        hash = 53 * hash + Objects.hashCode(this.category);
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
        return true;
    }

    @Override
    public String toString() {
        return "KitchenComponent{" + "id=" + id + ", component=" + component + ", componentCode=" + componentCode + ", category=" + category + '}';
    }
        
}
