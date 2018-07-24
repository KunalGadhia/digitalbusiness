/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.party;

import java.util.Objects;

/**
 *
 * @author webdesign
 */
public class Party {

    private Integer id;
    private String dealerCode;
    private String dealerName;
    private String glCode;
    private String contactPerson;
    private String billingAdd1;
    private String billingAdd2;
    private String billingAdd3;
    private String billingAdd4;
    private String billingEmail;
    private String city;
    private String billingFax;
    private String billBoardTel;
    private String directTelNo;
    private String panNumber;
    private String gstNumber;
    private String state;
    private Integer marketingHeadId;
    private Integer rateContractId;
    private String paymentTerms;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDealerCode() {
        return dealerCode;
    }

    public void setDealerCode(String dealerCode) {
        this.dealerCode = dealerCode;
    }

    public String getDealerName() {
        return dealerName;
    }

    public void setDealerName(String dealerName) {
        this.dealerName = dealerName;
    }

    public String getGlCode() {
        return glCode;
    }

    public void setGlCode(String glCode) {
        this.glCode = glCode;
    }

    public String getContactPerson() {
        return contactPerson;
    }

    public void setContactPerson(String contactPerson) {
        this.contactPerson = contactPerson;
    }

    public String getBillingAdd1() {
        return billingAdd1;
    }

    public void setBillingAdd1(String billingAdd1) {
        this.billingAdd1 = billingAdd1;
    }

    public String getBillingAdd2() {
        return billingAdd2;
    }

    public void setBillingAdd2(String billingAdd2) {
        this.billingAdd2 = billingAdd2;
    }

    public String getBillingAdd3() {
        return billingAdd3;
    }

    public void setBillingAdd3(String billingAdd3) {
        this.billingAdd3 = billingAdd3;
    }

    public String getBillingAdd4() {
        return billingAdd4;
    }

    public void setBillingAdd4(String billingAdd4) {
        this.billingAdd4 = billingAdd4;
    }

    public String getBillingEmail() {
        return billingEmail;
    }

    public void setBillingEmail(String billingEmail) {
        this.billingEmail = billingEmail;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getBillingFax() {
        return billingFax;
    }

    public void setBillingFax(String billingFax) {
        this.billingFax = billingFax;
    }

    public String getBillBoardTel() {
        return billBoardTel;
    }

    public void setBillBoardTel(String billBoardTel) {
        this.billBoardTel = billBoardTel;
    }

    public String getDirectTelNo() {
        return directTelNo;
    }

    public void setDirectTelNo(String directTelNo) {
        this.directTelNo = directTelNo;
    }

    public String getPanNumber() {
        return panNumber;
    }

    public void setPanNumber(String panNumber) {
        this.panNumber = panNumber;
    }

    public String getGstNumber() {
        return gstNumber;
    }

    public void setGstNumber(String gstNumber) {
        this.gstNumber = gstNumber;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public Integer getMarketingHeadId() {
        return marketingHeadId;
    }

    public void setMarketingHeadId(Integer marketingHeadId) {
        this.marketingHeadId = marketingHeadId;
    }

    public Integer getRateContractId() {
        return rateContractId;
    }

    public void setRateContractId(Integer rateContractId) {
        this.rateContractId = rateContractId;
    }

    public String getPaymentTerms() {
        return paymentTerms;
    }

    public void setPaymentTerms(String paymentTerms) {
        this.paymentTerms = paymentTerms;
    }

    @Override
    public int hashCode() {
        int hash = 3;
        hash = 23 * hash + Objects.hashCode(this.id);
        hash = 23 * hash + Objects.hashCode(this.dealerCode);
        hash = 23 * hash + Objects.hashCode(this.dealerName);
        hash = 23 * hash + Objects.hashCode(this.glCode);
        hash = 23 * hash + Objects.hashCode(this.contactPerson);
        hash = 23 * hash + Objects.hashCode(this.billingAdd1);
        hash = 23 * hash + Objects.hashCode(this.billingAdd2);
        hash = 23 * hash + Objects.hashCode(this.billingAdd3);
        hash = 23 * hash + Objects.hashCode(this.billingAdd4);
        hash = 23 * hash + Objects.hashCode(this.billingEmail);
        hash = 23 * hash + Objects.hashCode(this.city);
        hash = 23 * hash + Objects.hashCode(this.billingFax);
        hash = 23 * hash + Objects.hashCode(this.billBoardTel);
        hash = 23 * hash + Objects.hashCode(this.directTelNo);
        hash = 23 * hash + Objects.hashCode(this.panNumber);
        hash = 23 * hash + Objects.hashCode(this.gstNumber);
        hash = 23 * hash + Objects.hashCode(this.state);
        hash = 23 * hash + Objects.hashCode(this.marketingHeadId);
        hash = 23 * hash + Objects.hashCode(this.rateContractId);
        hash = 23 * hash + Objects.hashCode(this.paymentTerms);
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
        final Party other = (Party) obj;
        if (!Objects.equals(this.dealerCode, other.dealerCode)) {
            return false;
        }
        if (!Objects.equals(this.dealerName, other.dealerName)) {
            return false;
        }
        if (!Objects.equals(this.glCode, other.glCode)) {
            return false;
        }
        if (!Objects.equals(this.contactPerson, other.contactPerson)) {
            return false;
        }
        if (!Objects.equals(this.billingAdd1, other.billingAdd1)) {
            return false;
        }
        if (!Objects.equals(this.billingAdd2, other.billingAdd2)) {
            return false;
        }
        if (!Objects.equals(this.billingAdd3, other.billingAdd3)) {
            return false;
        }
        if (!Objects.equals(this.billingAdd4, other.billingAdd4)) {
            return false;
        }
        if (!Objects.equals(this.billingEmail, other.billingEmail)) {
            return false;
        }
        if (!Objects.equals(this.city, other.city)) {
            return false;
        }
        if (!Objects.equals(this.billingFax, other.billingFax)) {
            return false;
        }
        if (!Objects.equals(this.billBoardTel, other.billBoardTel)) {
            return false;
        }
        if (!Objects.equals(this.directTelNo, other.directTelNo)) {
            return false;
        }
        if (!Objects.equals(this.panNumber, other.panNumber)) {
            return false;
        }
        if (!Objects.equals(this.gstNumber, other.gstNumber)) {
            return false;
        }
        if (!Objects.equals(this.state, other.state)) {
            return false;
        }
        if (!Objects.equals(this.paymentTerms, other.paymentTerms)) {
            return false;
        }
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        if (!Objects.equals(this.marketingHeadId, other.marketingHeadId)) {
            return false;
        }
        if (!Objects.equals(this.rateContractId, other.rateContractId)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "Party{" + "id=" + id + ", dealerCode=" + dealerCode + ", dealerName=" + dealerName + ", glCode=" + glCode + ", contactPerson=" + contactPerson + ", billingAdd1=" + billingAdd1 + ", billingAdd2=" + billingAdd2 + ", billingAdd3=" + billingAdd3 + ", billingAdd4=" + billingAdd4 + ", billingEmail=" + billingEmail + ", city=" + city + ", billingFax=" + billingFax + ", billBoardTel=" + billBoardTel + ", directTelNo=" + directTelNo + ", panNumber=" + panNumber + ", gstNumber=" + gstNumber + ", state=" + state + ", marketingHeadId=" + marketingHeadId + ", rateContractId=" + rateContractId + ", paymentTerms=" + paymentTerms + '}';
    }
    
}
