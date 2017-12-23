/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.shutterhandlemapping;

import java.util.List;
import java.util.Objects;

/**
 *
 * @author webdesign
 */
public class ShutterHandleMapping {
    private Integer id;
    private String finishCode;
    private String shutterCode;
    private List<Integer> handles;

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

    public String getShutterCode() {
        return shutterCode;
    }

    public void setShutterCode(String shutterCode) {
        this.shutterCode = shutterCode;
    }

    public List<Integer> getHandles() {
        return handles;
    }

    public void setHandles(List<Integer> handles) {
        this.handles = handles;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 29 * hash + Objects.hashCode(this.id);
        hash = 29 * hash + Objects.hashCode(this.finishCode);
        hash = 29 * hash + Objects.hashCode(this.shutterCode);
        hash = 29 * hash + Objects.hashCode(this.handles);
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
        final ShutterHandleMapping other = (ShutterHandleMapping) obj;
        if (!Objects.equals(this.finishCode, other.finishCode)) {
            return false;
        }
        if (!Objects.equals(this.shutterCode, other.shutterCode)) {
            return false;
        }
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        if (!Objects.equals(this.handles, other.handles)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "ShutterHandleMapping{" + "id=" + id + ", finishCode=" + finishCode + ", shutterCode=" + shutterCode + ", handles=" + handles + '}';
    }
    
}
