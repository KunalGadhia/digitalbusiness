/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.colorconstraint;

import com.spacewood.digitalbusiness.kitchencomponent.KitchenComponentCategory;
import java.util.List;
import java.util.Objects;

/**
 *
 * @author webdesign
 */
public class ColorConstraint {
    private Integer id;
    private KitchenComponentCategory component;
    private String materialCode;
    private List<Integer> colors;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public KitchenComponentCategory getComponent() {
        return component;
    }

    public void setComponent(KitchenComponentCategory component) {
        this.component = component;
    }

    public String getMaterialCode() {
        return materialCode;
    }

    public void setMaterialCode(String materialCode) {
        this.materialCode = materialCode;
    }

    public List<Integer> getColors() {
        return colors;
    }

    public void setColors(List<Integer> colors) {
        this.colors = colors;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 37 * hash + Objects.hashCode(this.id);
        hash = 37 * hash + Objects.hashCode(this.component);
        hash = 37 * hash + Objects.hashCode(this.materialCode);
        hash = 37 * hash + Objects.hashCode(this.colors);
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
        final ColorConstraint other = (ColorConstraint) obj;
        if (!Objects.equals(this.materialCode, other.materialCode)) {
            return false;
        }
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        if (this.component != other.component) {
            return false;
        }
        if (!Objects.equals(this.colors, other.colors)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "ColorConstraint{" + "id=" + id + ", component=" + component + ", materialCode=" + materialCode + ", colors=" + colors + '}';
    }
        
}
