/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.carcasssubtype;

import java.util.Objects;

/**
 *
 * @author webdesign
 */
public class CarcassSubtype {
    private Integer id;
    private String subType;
    private ParentType parentType;
    private String description;
    private String subTypeCode;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getSubType() {
        return subType;
    }

    public void setSubType(String subType) {
        this.subType = subType;
    }

    public ParentType getParentType() {
        return parentType;
    }

    public void setParentType(ParentType parentType) {
        this.parentType = parentType;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getSubTypeCode() {
        return subTypeCode;
    }

    public void setSubTypeCode(String subTypeCode) {
        this.subTypeCode = subTypeCode;
    }

    @Override
    public int hashCode() {
        int hash = 5;
        hash = 11 * hash + Objects.hashCode(this.id);
        hash = 11 * hash + Objects.hashCode(this.subType);
        hash = 11 * hash + Objects.hashCode(this.parentType);
        hash = 11 * hash + Objects.hashCode(this.description);
        hash = 11 * hash + Objects.hashCode(this.subTypeCode);
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
        final CarcassSubtype other = (CarcassSubtype) obj;
        if (!Objects.equals(this.subType, other.subType)) {
            return false;
        }
        if (!Objects.equals(this.description, other.description)) {
            return false;
        }
        if (!Objects.equals(this.subTypeCode, other.subTypeCode)) {
            return false;
        }
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        if (this.parentType != other.parentType) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "CarcassSubtype{" + "id=" + id + ", subType=" + subType + ", parentType=" + parentType + ", description=" + description + ", subTypeCode=" + subTypeCode + '}';
    }
        
}
