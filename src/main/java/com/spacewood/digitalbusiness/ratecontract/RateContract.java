/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.ratecontract;

import java.util.Objects;

/**
 *
 * @author webdesign
 */
public class RateContract {
    private Integer id;
    private String contractName;
    private String contractDescription;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getContractName() {
        return contractName;
    }

    public void setContractName(String contractName) {
        this.contractName = contractName;
    }

    public String getContractDescription() {
        return contractDescription;
    }

    public void setContractDescription(String contractDescription) {
        this.contractDescription = contractDescription;
    }

    @Override
    public int hashCode() {
        int hash = 5;
        hash = 17 * hash + Objects.hashCode(this.id);
        hash = 17 * hash + Objects.hashCode(this.contractName);
        hash = 17 * hash + Objects.hashCode(this.contractDescription);
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
        final RateContract other = (RateContract) obj;
        if (!Objects.equals(this.contractName, other.contractName)) {
            return false;
        }
        if (!Objects.equals(this.contractDescription, other.contractDescription)) {
            return false;
        }
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "RateContract{" + "id=" + id + ", contractName=" + contractName + ", contractDescription=" + contractDescription + '}';
    }
        
}
