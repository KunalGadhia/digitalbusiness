/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.shuttercomponentmapping;

import java.util.List;
import java.util.Objects;

/**
 *
 * @author webdesign
 */
public class ShutterComponentMapping {
    private Integer id;
    private String finishCode;
    private List<Integer> shutters;

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

    public List<Integer> getShutters() {
        return shutters;
    }

    public void setShutters(List<Integer> shutters) {
        this.shutters = shutters;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 37 * hash + Objects.hashCode(this.id);
        hash = 37 * hash + Objects.hashCode(this.finishCode);
        hash = 37 * hash + Objects.hashCode(this.shutters);
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
        final ShutterComponentMapping other = (ShutterComponentMapping) obj;
        if (!Objects.equals(this.finishCode, other.finishCode)) {
            return false;
        }
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        if (!Objects.equals(this.shutters, other.shutters)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "ShutterComponentMapping{" + "id=" + id + ", finishCode=" + finishCode + ", shutters=" + shutters + '}';
    }
        
}
