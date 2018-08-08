/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.orderheadmrp;

import java.util.Date;
import java.util.Objects;

/**
 *
 * @author User
 */
public class OrderHeadMrp {
    private Integer id;
    private String orderNum;
    private String partyName;
    private String projectName;
    private String address1;
    private String address2;
    private String address3;
    private String address4;
    private String partyEmail;
    private String postalCode;
    private String partyMobileNo;
    private String partyTelephoneNo;
    private String partyCity;    
    private Date poDate;    
    private Integer orderInitiatedBy;    
    private Double orderAmount;
    private Double cgstAmount;
    private Double sgstAmount;
    private Double igstAmount;
    private Double netAmount;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getOrderNum() {
        return orderNum;
    }

    public void setOrderNum(String orderNum) {
        this.orderNum = orderNum;
    }

    public String getPartyName() {
        return partyName;
    }

    public void setPartyName(String partyName) {
        this.partyName = partyName;
    }

    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

    public String getAddress1() {
        return address1;
    }

    public void setAddress1(String address1) {
        this.address1 = address1;
    }

    public String getAddress2() {
        return address2;
    }

    public void setAddress2(String address2) {
        this.address2 = address2;
    }

    public String getAddress3() {
        return address3;
    }

    public void setAddress3(String address3) {
        this.address3 = address3;
    }

    public String getAddress4() {
        return address4;
    }

    public void setAddress4(String address4) {
        this.address4 = address4;
    }

    public String getPartyEmail() {
        return partyEmail;
    }

    public void setPartyEmail(String partyEmail) {
        this.partyEmail = partyEmail;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public String getPartyMobileNo() {
        return partyMobileNo;
    }

    public void setPartyMobileNo(String partyMobileNo) {
        this.partyMobileNo = partyMobileNo;
    }

    public String getPartyTelephoneNo() {
        return partyTelephoneNo;
    }

    public void setPartyTelephoneNo(String partyTelephoneNo) {
        this.partyTelephoneNo = partyTelephoneNo;
    }

    public String getPartyCity() {
        return partyCity;
    }

    public void setPartyCity(String partyCity) {
        this.partyCity = partyCity;
    }

    public Date getPoDate() {
        return poDate;
    }

    public void setPoDate(Date poDate) {
        this.poDate = poDate;
    }

    public Integer getOrderInitiatedBy() {
        return orderInitiatedBy;
    }

    public void setOrderInitiatedBy(Integer orderInitiatedBy) {
        this.orderInitiatedBy = orderInitiatedBy;
    }

    public Double getOrderAmount() {
        return orderAmount;
    }

    public void setOrderAmount(Double orderAmount) {
        this.orderAmount = orderAmount;
    }

    public Double getCgstAmount() {
        return cgstAmount;
    }

    public void setCgstAmount(Double cgstAmount) {
        this.cgstAmount = cgstAmount;
    }

    public Double getSgstAmount() {
        return sgstAmount;
    }

    public void setSgstAmount(Double sgstAmount) {
        this.sgstAmount = sgstAmount;
    }

    public Double getIgstAmount() {
        return igstAmount;
    }

    public void setIgstAmount(Double igstAmount) {
        this.igstAmount = igstAmount;
    }

    public Double getNetAmount() {
        return netAmount;
    }

    public void setNetAmount(Double netAmount) {
        this.netAmount = netAmount;
    }

    @Override
    public int hashCode() {
        int hash = 5;
        hash = 41 * hash + Objects.hashCode(this.id);
        hash = 41 * hash + Objects.hashCode(this.orderNum);
        hash = 41 * hash + Objects.hashCode(this.partyName);
        hash = 41 * hash + Objects.hashCode(this.projectName);
        hash = 41 * hash + Objects.hashCode(this.address1);
        hash = 41 * hash + Objects.hashCode(this.address2);
        hash = 41 * hash + Objects.hashCode(this.address3);
        hash = 41 * hash + Objects.hashCode(this.address4);
        hash = 41 * hash + Objects.hashCode(this.partyEmail);
        hash = 41 * hash + Objects.hashCode(this.postalCode);
        hash = 41 * hash + Objects.hashCode(this.partyMobileNo);
        hash = 41 * hash + Objects.hashCode(this.partyTelephoneNo);
        hash = 41 * hash + Objects.hashCode(this.partyCity);
        hash = 41 * hash + Objects.hashCode(this.poDate);
        hash = 41 * hash + Objects.hashCode(this.orderInitiatedBy);
        hash = 41 * hash + Objects.hashCode(this.orderAmount);
        hash = 41 * hash + Objects.hashCode(this.cgstAmount);
        hash = 41 * hash + Objects.hashCode(this.sgstAmount);
        hash = 41 * hash + Objects.hashCode(this.igstAmount);
        hash = 41 * hash + Objects.hashCode(this.netAmount);
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
        final OrderHeadMrp other = (OrderHeadMrp) obj;
        if (!Objects.equals(this.orderNum, other.orderNum)) {
            return false;
        }
        if (!Objects.equals(this.partyName, other.partyName)) {
            return false;
        }
        if (!Objects.equals(this.projectName, other.projectName)) {
            return false;
        }
        if (!Objects.equals(this.address1, other.address1)) {
            return false;
        }
        if (!Objects.equals(this.address2, other.address2)) {
            return false;
        }
        if (!Objects.equals(this.address3, other.address3)) {
            return false;
        }
        if (!Objects.equals(this.address4, other.address4)) {
            return false;
        }
        if (!Objects.equals(this.partyEmail, other.partyEmail)) {
            return false;
        }
        if (!Objects.equals(this.postalCode, other.postalCode)) {
            return false;
        }
        if (!Objects.equals(this.partyMobileNo, other.partyMobileNo)) {
            return false;
        }
        if (!Objects.equals(this.partyTelephoneNo, other.partyTelephoneNo)) {
            return false;
        }
        if (!Objects.equals(this.partyCity, other.partyCity)) {
            return false;
        }
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        if (!Objects.equals(this.poDate, other.poDate)) {
            return false;
        }
        if (!Objects.equals(this.orderInitiatedBy, other.orderInitiatedBy)) {
            return false;
        }
        if (!Objects.equals(this.orderAmount, other.orderAmount)) {
            return false;
        }
        if (!Objects.equals(this.cgstAmount, other.cgstAmount)) {
            return false;
        }
        if (!Objects.equals(this.sgstAmount, other.sgstAmount)) {
            return false;
        }
        if (!Objects.equals(this.igstAmount, other.igstAmount)) {
            return false;
        }
        if (!Objects.equals(this.netAmount, other.netAmount)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "OrderHeadMrp{" + "id=" + id + ", orderNum=" + orderNum + ", partyName=" + partyName + ", projectName=" + projectName + ", address1=" + address1 + ", address2=" + address2 + ", address3=" + address3 + ", address4=" + address4 + ", partyEmail=" + partyEmail + ", postalCode=" + postalCode + ", partyMobileNo=" + partyMobileNo + ", partyTelephoneNo=" + partyTelephoneNo + ", partyCity=" + partyCity + ", poDate=" + poDate + ", orderInitiatedBy=" + orderInitiatedBy + ", orderAmount=" + orderAmount + ", cgstAmount=" + cgstAmount + ", sgstAmount=" + sgstAmount + ", igstAmount=" + igstAmount + ", netAmount=" + netAmount + '}';
    }
    
    
}
