/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.drawercomponentmapping;

import java.util.List;
import java.util.Objects;

/**
 *
 * @author webdesign
 */
public class DrawerComponentMapping {
    private Integer id;
    private String finishCode;
    private List<Integer> drawers;

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

    public List<Integer> getDrawers() {
        return drawers;
    }

    public void setDrawers(List<Integer> drawers) {
        this.drawers = drawers;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 79 * hash + Objects.hashCode(this.id);
        hash = 79 * hash + Objects.hashCode(this.finishCode);
        hash = 79 * hash + Objects.hashCode(this.drawers);
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
        final DrawerComponentMapping other = (DrawerComponentMapping) obj;
        if (!Objects.equals(this.finishCode, other.finishCode)) {
            return false;
        }
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        if (!Objects.equals(this.drawers, other.drawers)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "DrawerComponentMapping{" + "id=" + id + ", finishCode=" + finishCode + ", drawers=" + drawers + '}';
    }
        
}
