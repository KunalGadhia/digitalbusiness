/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.dealerinvoicedetails;

import java.util.Date;
import java.util.Objects;

/**
 *
 * @author webdesign
 */
public class DealerInvoiceDetails {
    
    private Integer id;
    private Integer orderHeadId;
    private String transportMode;
    private String vehicleNumber;
    private Date dateOfSupply;
    private String ewayBillNo;
    private Boolean reverseCharge;
    private String billingPartyName;
    private String billingPartyAddress;
    private String billingPartyGstin;
    private String billingPartyState;
    private String billingPartyCode;
    private String shippingPartyName;
    private String shippingPartyAddress;
    private String shippingPartyGstin;
    private String shippingPartyState;
    private String shippingPartyCode;
    private String descriptionOfGoods;
    private String hsnCode;
    private String tax;
    private String termsAndConditions;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getOrderHeadId() {
        return orderHeadId;
    }

    public void setOrderHeadId(Integer orderHeadId) {
        this.orderHeadId = orderHeadId;
    }

    public String getTransportMode() {
        return transportMode;
    }

    public void setTransportMode(String transportMode) {
        this.transportMode = transportMode;
    }

    public String getVehicleNumber() {
        return vehicleNumber;
    }

    public void setVehicleNumber(String vehicleNumber) {
        this.vehicleNumber = vehicleNumber;
    }

    public Date getDateOfSupply() {
        return dateOfSupply;
    }

    public void setDateOfSupply(Date dateOfSupply) {
        this.dateOfSupply = dateOfSupply;
    }

    public String getEwayBillNo() {
        return ewayBillNo;
    }

    public void setEwayBillNo(String ewayBillNo) {
        this.ewayBillNo = ewayBillNo;
    }

    public Boolean getReverseCharge() {
        return reverseCharge;
    }

    public void setReverseCharge(Boolean reverseCharge) {
        this.reverseCharge = reverseCharge;
    }

    public String getBillingPartyName() {
        return billingPartyName;
    }

    public void setBillingPartyName(String billingPartyName) {
        this.billingPartyName = billingPartyName;
    }

    public String getBillingPartyAddress() {
        return billingPartyAddress;
    }

    public void setBillingPartyAddress(String billingPartyAddress) {
        this.billingPartyAddress = billingPartyAddress;
    }

    public String getBillingPartyGstin() {
        return billingPartyGstin;
    }

    public void setBillingPartyGstin(String billingPartyGstin) {
        this.billingPartyGstin = billingPartyGstin;
    }

    public String getBillingPartyState() {
        return billingPartyState;
    }

    public void setBillingPartyState(String billingPartyState) {
        this.billingPartyState = billingPartyState;
    }

    public String getBillingPartyCode() {
        return billingPartyCode;
    }

    public void setBillingPartyCode(String billingPartyCode) {
        this.billingPartyCode = billingPartyCode;
    }

    public String getShippingPartyName() {
        return shippingPartyName;
    }

    public void setShippingPartyName(String shippingPartyName) {
        this.shippingPartyName = shippingPartyName;
    }

    public String getShippingPartyAddress() {
        return shippingPartyAddress;
    }

    public void setShippingPartyAddress(String shippingPartyAddress) {
        this.shippingPartyAddress = shippingPartyAddress;
    }

    public String getShippingPartyGstin() {
        return shippingPartyGstin;
    }

    public void setShippingPartyGstin(String shippingPartyGstin) {
        this.shippingPartyGstin = shippingPartyGstin;
    }

    public String getShippingPartyState() {
        return shippingPartyState;
    }

    public void setShippingPartyState(String shippingPartyState) {
        this.shippingPartyState = shippingPartyState;
    }

    public String getShippingPartyCode() {
        return shippingPartyCode;
    }

    public void setShippingPartyCode(String shippingPartyCode) {
        this.shippingPartyCode = shippingPartyCode;
    }

    public String getDescriptionOfGoods() {
        return descriptionOfGoods;
    }

    public void setDescriptionOfGoods(String descriptionOfGoods) {
        this.descriptionOfGoods = descriptionOfGoods;
    }

    public String getHsnCode() {
        return hsnCode;
    }

    public void setHsnCode(String hsnCode) {
        this.hsnCode = hsnCode;
    }

    public String getTax() {
        return tax;
    }

    public void setTax(String tax) {
        this.tax = tax;
    }

    public String getTermsAndConditions() {
        return termsAndConditions;
    }

    public void setTermsAndConditions(String termsAndConditions) {
        this.termsAndConditions = termsAndConditions;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 41 * hash + Objects.hashCode(this.id);
        hash = 41 * hash + Objects.hashCode(this.orderHeadId);
        hash = 41 * hash + Objects.hashCode(this.transportMode);
        hash = 41 * hash + Objects.hashCode(this.vehicleNumber);
        hash = 41 * hash + Objects.hashCode(this.dateOfSupply);
        hash = 41 * hash + Objects.hashCode(this.ewayBillNo);
        hash = 41 * hash + Objects.hashCode(this.reverseCharge);
        hash = 41 * hash + Objects.hashCode(this.billingPartyName);
        hash = 41 * hash + Objects.hashCode(this.billingPartyAddress);
        hash = 41 * hash + Objects.hashCode(this.billingPartyGstin);
        hash = 41 * hash + Objects.hashCode(this.billingPartyState);
        hash = 41 * hash + Objects.hashCode(this.billingPartyCode);
        hash = 41 * hash + Objects.hashCode(this.shippingPartyName);
        hash = 41 * hash + Objects.hashCode(this.shippingPartyAddress);
        hash = 41 * hash + Objects.hashCode(this.shippingPartyGstin);
        hash = 41 * hash + Objects.hashCode(this.shippingPartyState);
        hash = 41 * hash + Objects.hashCode(this.shippingPartyCode);
        hash = 41 * hash + Objects.hashCode(this.descriptionOfGoods);
        hash = 41 * hash + Objects.hashCode(this.hsnCode);
        hash = 41 * hash + Objects.hashCode(this.tax);
        hash = 41 * hash + Objects.hashCode(this.termsAndConditions);
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
        final DealerInvoiceDetails other = (DealerInvoiceDetails) obj;
        if (!Objects.equals(this.transportMode, other.transportMode)) {
            return false;
        }
        if (!Objects.equals(this.vehicleNumber, other.vehicleNumber)) {
            return false;
        }
        if (!Objects.equals(this.ewayBillNo, other.ewayBillNo)) {
            return false;
        }
        if (!Objects.equals(this.billingPartyName, other.billingPartyName)) {
            return false;
        }
        if (!Objects.equals(this.billingPartyAddress, other.billingPartyAddress)) {
            return false;
        }
        if (!Objects.equals(this.billingPartyGstin, other.billingPartyGstin)) {
            return false;
        }
        if (!Objects.equals(this.billingPartyState, other.billingPartyState)) {
            return false;
        }
        if (!Objects.equals(this.billingPartyCode, other.billingPartyCode)) {
            return false;
        }
        if (!Objects.equals(this.shippingPartyName, other.shippingPartyName)) {
            return false;
        }
        if (!Objects.equals(this.shippingPartyAddress, other.shippingPartyAddress)) {
            return false;
        }
        if (!Objects.equals(this.shippingPartyGstin, other.shippingPartyGstin)) {
            return false;
        }
        if (!Objects.equals(this.shippingPartyState, other.shippingPartyState)) {
            return false;
        }
        if (!Objects.equals(this.shippingPartyCode, other.shippingPartyCode)) {
            return false;
        }
        if (!Objects.equals(this.descriptionOfGoods, other.descriptionOfGoods)) {
            return false;
        }
        if (!Objects.equals(this.hsnCode, other.hsnCode)) {
            return false;
        }
        if (!Objects.equals(this.tax, other.tax)) {
            return false;
        }
        if (!Objects.equals(this.termsAndConditions, other.termsAndConditions)) {
            return false;
        }
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        if (!Objects.equals(this.orderHeadId, other.orderHeadId)) {
            return false;
        }
        if (!Objects.equals(this.dateOfSupply, other.dateOfSupply)) {
            return false;
        }
        if (!Objects.equals(this.reverseCharge, other.reverseCharge)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "DealerInvoiceDetails{" + "id=" + id + ", orderHeadId=" + orderHeadId + ", transportMode=" + transportMode + ", vehicleNumber=" + vehicleNumber + ", dateOfSupply=" + dateOfSupply + ", ewayBillNo=" + ewayBillNo + ", reverseCharge=" + reverseCharge + ", billingPartyName=" + billingPartyName + ", billingPartyAddress=" + billingPartyAddress + ", billingPartyGstin=" + billingPartyGstin + ", billingPartyState=" + billingPartyState + ", billingPartyCode=" + billingPartyCode + ", shippingPartyName=" + shippingPartyName + ", shippingPartyAddress=" + shippingPartyAddress + ", shippingPartyGstin=" + shippingPartyGstin + ", shippingPartyState=" + shippingPartyState + ", shippingPartyCode=" + shippingPartyCode + ", descriptionOfGoods=" + descriptionOfGoods + ", hsnCode=" + hsnCode + ", tax=" + tax + ", termsAndConditions=" + termsAndConditions + '}';
    }
        
}
