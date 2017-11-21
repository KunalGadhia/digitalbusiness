/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.colorconstraint;

import java.util.List;
import java.util.Objects;

/**
 *
 * @author webdesign
 */
public class ColorConstraint {
    private Integer id;
    private ConstraintItem component;
    private String materialCode;
    private List<Integer> colors;
    private String finishCode;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public ConstraintItem getComponent() {
        return component;
    }

    public void setComponent(ConstraintItem component) {
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

    public String getFinishCode() {
        return finishCode;
    }

    public void setFinishCode(String finishCode) {
        this.finishCode = finishCode;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 61 * hash + Objects.hashCode(this.id);
        hash = 61 * hash + Objects.hashCode(this.component);
        hash = 61 * hash + Objects.hashCode(this.materialCode);
        hash = 61 * hash + Objects.hashCode(this.colors);
        hash = 61 * hash + Objects.hashCode(this.finishCode);
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
        if (!Objects.equals(this.finishCode, other.finishCode)) {
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
        return "ColorConstraint{" + "id=" + id + ", component=" + component + ", materialCode=" + materialCode + ", colors=" + colors + ", finishCode=" + finishCode + '}';
    }

        
}
