/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.orderhead;

import java.util.Date;
import java.util.Objects;

/**
 *
 * @author webdesign
 */
public class OrderHead {
    private Integer id;
    private String orderNum;
    private String segment;
    private String saleType;
    private EntryType entryType;
    private OrderType orderType;
    private Integer billingPartyId;
    private Integer deliveryPartyId;
    private String postalCode;
    private BillType billType;
    private OrderSubType orderSubType;
    private String projectName;
    private String poNum;
    private String orderId;
    private Date poDate;
    private String poValue;
    private String marketingHead;
    private Integer orderInitiatedBy;
    private RateApplicability rateApplicability;
    private String rateContract;
    private String orcPer;
    private Boolean approved;
    private Date approvalDate;
    private Double orderAmount;
    private Double cgstAmount;
    private Double sgstAmount;
    private Double igstAmount;
    private Double netAmount;
    private String deliveryPartyName;
    private String deliveryPartyAddress1;
    private String deliveryPartyAddress2;
    private String deliveryPartyAddress3;
    private String deliveryPartyAddress4;
    private String deliveryPartyEmail;
    private String deliveryPartyPostalCode;
    private String deliveryPartyDirectTelNo;
    private String deliveryPartyBillBoardTel;
    private String deliveryPartyFax;
    private String deliveryPartyCity;
    private Double transportationCharges;
    private Double loadingUnloadingCharges;
    private Double installationCharges;
    private Double otherCharges;

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

    public String getSegment() {
        return segment;
    }

    public void setSegment(String segment) {
        this.segment = segment;
    }

    public String getSaleType() {
        return saleType;
    }

    public void setSaleType(String saleType) {
        this.saleType = saleType;
    }

    public EntryType getEntryType() {
        return entryType;
    }

    public void setEntryType(EntryType entryType) {
        this.entryType = entryType;
    }

    public OrderType getOrderType() {
        return orderType;
    }

    public void setOrderType(OrderType orderType) {
        this.orderType = orderType;
    }

    public Integer getBillingPartyId() {
        return billingPartyId;
    }

    public void setBillingPartyId(Integer billingPartyId) {
        this.billingPartyId = billingPartyId;
    }

    public Integer getDeliveryPartyId() {
        return deliveryPartyId;
    }

    public void setDeliveryPartyId(Integer deliveryPartyId) {
        this.deliveryPartyId = deliveryPartyId;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public BillType getBillType() {
        return billType;
    }

    public void setBillType(BillType billType) {
        this.billType = billType;
    }

    public OrderSubType getOrderSubType() {
        return orderSubType;
    }

    public void setOrderSubType(OrderSubType orderSubType) {
        this.orderSubType = orderSubType;
    }

    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

    public String getPoNum() {
        return poNum;
    }

    public void setPoNum(String poNum) {
        this.poNum = poNum;
    }

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    public Date getPoDate() {
        return poDate;
    }

    public void setPoDate(Date poDate) {
        this.poDate = poDate;
    }

    public String getPoValue() {
        return poValue;
    }

    public void setPoValue(String poValue) {
        this.poValue = poValue;
    }

    public String getMarketingHead() {
        return marketingHead;
    }

    public void setMarketingHead(String marketingHead) {
        this.marketingHead = marketingHead;
    }

    public Integer getOrderInitiatedBy() {
        return orderInitiatedBy;
    }

    public void setOrderInitiatedBy(Integer orderInitiatedBy) {
        this.orderInitiatedBy = orderInitiatedBy;
    }

    public RateApplicability getRateApplicability() {
        return rateApplicability;
    }

    public void setRateApplicability(RateApplicability rateApplicability) {
        this.rateApplicability = rateApplicability;
    }

    public String getRateContract() {
        return rateContract;
    }

    public void setRateContract(String rateContract) {
        this.rateContract = rateContract;
    }

    public String getOrcPer() {
        return orcPer;
    }

    public void setOrcPer(String orcPer) {
        this.orcPer = orcPer;
    }

    public Boolean getApproved() {
        return approved;
    }

    public void setApproved(Boolean approved) {
        this.approved = approved;
    }

    public Date getApprovalDate() {
        return approvalDate;
    }

    public void setApprovalDate(Date approvalDate) {
        this.approvalDate = approvalDate;
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

    public String getDeliveryPartyName() {
        return deliveryPartyName;
    }

    public void setDeliveryPartyName(String deliveryPartyName) {
        this.deliveryPartyName = deliveryPartyName;
    }

    public String getDeliveryPartyAddress1() {
        return deliveryPartyAddress1;
    }

    public void setDeliveryPartyAddress1(String deliveryPartyAddress1) {
        this.deliveryPartyAddress1 = deliveryPartyAddress1;
    }

    public String getDeliveryPartyAddress2() {
        return deliveryPartyAddress2;
    }

    public void setDeliveryPartyAddress2(String deliveryPartyAddress2) {
        this.deliveryPartyAddress2 = deliveryPartyAddress2;
    }

    public String getDeliveryPartyAddress3() {
        return deliveryPartyAddress3;
    }

    public void setDeliveryPartyAddress3(String deliveryPartyAddress3) {
        this.deliveryPartyAddress3 = deliveryPartyAddress3;
    }

    public String getDeliveryPartyAddress4() {
        return deliveryPartyAddress4;
    }

    public void setDeliveryPartyAddress4(String deliveryPartyAddress4) {
        this.deliveryPartyAddress4 = deliveryPartyAddress4;
    }

    public String getDeliveryPartyEmail() {
        return deliveryPartyEmail;
    }

    public void setDeliveryPartyEmail(String deliveryPartyEmail) {
        this.deliveryPartyEmail = deliveryPartyEmail;
    }

    public String getDeliveryPartyPostalCode() {
        return deliveryPartyPostalCode;
    }

    public void setDeliveryPartyPostalCode(String deliveryPartyPostalCode) {
        this.deliveryPartyPostalCode = deliveryPartyPostalCode;
    }

    public String getDeliveryPartyDirectTelNo() {
        return deliveryPartyDirectTelNo;
    }

    public void setDeliveryPartyDirectTelNo(String deliveryPartyDirectTelNo) {
        this.deliveryPartyDirectTelNo = deliveryPartyDirectTelNo;
    }

    public String getDeliveryPartyBillBoardTel() {
        return deliveryPartyBillBoardTel;
    }

    public void setDeliveryPartyBillBoardTel(String deliveryPartyBillBoardTel) {
        this.deliveryPartyBillBoardTel = deliveryPartyBillBoardTel;
    }

    public String getDeliveryPartyFax() {
        return deliveryPartyFax;
    }

    public void setDeliveryPartyFax(String deliveryPartyFax) {
        this.deliveryPartyFax = deliveryPartyFax;
    }

    public String getDeliveryPartyCity() {
        return deliveryPartyCity;
    }

    public void setDeliveryPartyCity(String deliveryPartyCity) {
        this.deliveryPartyCity = deliveryPartyCity;
    }

    public Double getTransportationCharges() {
        return transportationCharges;
    }

    public void setTransportationCharges(Double transportationCharges) {
        this.transportationCharges = transportationCharges;
    }

    public Double getLoadingUnloadingCharges() {
        return loadingUnloadingCharges;
    }

    public void setLoadingUnloadingCharges(Double loadingUnloadingCharges) {
        this.loadingUnloadingCharges = loadingUnloadingCharges;
    }

    public Double getInstallationCharges() {
        return installationCharges;
    }

    public void setInstallationCharges(Double installationCharges) {
        this.installationCharges = installationCharges;
    }

    public Double getOtherCharges() {
        return otherCharges;
    }

    public void setOtherCharges(Double otherCharges) {
        this.otherCharges = otherCharges;
    }

    @Override
    public int hashCode() {
        int hash = 5;
        hash = 89 * hash + Objects.hashCode(this.id);
        hash = 89 * hash + Objects.hashCode(this.orderNum);
        hash = 89 * hash + Objects.hashCode(this.segment);
        hash = 89 * hash + Objects.hashCode(this.saleType);
        hash = 89 * hash + Objects.hashCode(this.entryType);
        hash = 89 * hash + Objects.hashCode(this.orderType);
        hash = 89 * hash + Objects.hashCode(this.billingPartyId);
        hash = 89 * hash + Objects.hashCode(this.deliveryPartyId);
        hash = 89 * hash + Objects.hashCode(this.postalCode);
        hash = 89 * hash + Objects.hashCode(this.billType);
        hash = 89 * hash + Objects.hashCode(this.orderSubType);
        hash = 89 * hash + Objects.hashCode(this.projectName);
        hash = 89 * hash + Objects.hashCode(this.poNum);
        hash = 89 * hash + Objects.hashCode(this.orderId);
        hash = 89 * hash + Objects.hashCode(this.poDate);
        hash = 89 * hash + Objects.hashCode(this.poValue);
        hash = 89 * hash + Objects.hashCode(this.marketingHead);
        hash = 89 * hash + Objects.hashCode(this.orderInitiatedBy);
        hash = 89 * hash + Objects.hashCode(this.rateApplicability);
        hash = 89 * hash + Objects.hashCode(this.rateContract);
        hash = 89 * hash + Objects.hashCode(this.orcPer);
        hash = 89 * hash + Objects.hashCode(this.approved);
        hash = 89 * hash + Objects.hashCode(this.approvalDate);
        hash = 89 * hash + Objects.hashCode(this.orderAmount);
        hash = 89 * hash + Objects.hashCode(this.cgstAmount);
        hash = 89 * hash + Objects.hashCode(this.sgstAmount);
        hash = 89 * hash + Objects.hashCode(this.igstAmount);
        hash = 89 * hash + Objects.hashCode(this.netAmount);
        hash = 89 * hash + Objects.hashCode(this.deliveryPartyName);
        hash = 89 * hash + Objects.hashCode(this.deliveryPartyAddress1);
        hash = 89 * hash + Objects.hashCode(this.deliveryPartyAddress2);
        hash = 89 * hash + Objects.hashCode(this.deliveryPartyAddress3);
        hash = 89 * hash + Objects.hashCode(this.deliveryPartyAddress4);
        hash = 89 * hash + Objects.hashCode(this.deliveryPartyEmail);
        hash = 89 * hash + Objects.hashCode(this.deliveryPartyPostalCode);
        hash = 89 * hash + Objects.hashCode(this.deliveryPartyDirectTelNo);
        hash = 89 * hash + Objects.hashCode(this.deliveryPartyBillBoardTel);
        hash = 89 * hash + Objects.hashCode(this.deliveryPartyFax);
        hash = 89 * hash + Objects.hashCode(this.deliveryPartyCity);
        hash = 89 * hash + Objects.hashCode(this.transportationCharges);
        hash = 89 * hash + Objects.hashCode(this.loadingUnloadingCharges);
        hash = 89 * hash + Objects.hashCode(this.installationCharges);
        hash = 89 * hash + Objects.hashCode(this.otherCharges);
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
        final OrderHead other = (OrderHead) obj;
        if (!Objects.equals(this.orderNum, other.orderNum)) {
            return false;
        }
        if (!Objects.equals(this.segment, other.segment)) {
            return false;
        }
        if (!Objects.equals(this.saleType, other.saleType)) {
            return false;
        }
        if (!Objects.equals(this.postalCode, other.postalCode)) {
            return false;
        }
        if (!Objects.equals(this.projectName, other.projectName)) {
            return false;
        }
        if (!Objects.equals(this.poNum, other.poNum)) {
            return false;
        }
        if (!Objects.equals(this.orderId, other.orderId)) {
            return false;
        }
        if (!Objects.equals(this.poValue, other.poValue)) {
            return false;
        }
        if (!Objects.equals(this.marketingHead, other.marketingHead)) {
            return false;
        }
        if (!Objects.equals(this.rateContract, other.rateContract)) {
            return false;
        }
        if (!Objects.equals(this.orcPer, other.orcPer)) {
            return false;
        }
        if (!Objects.equals(this.deliveryPartyName, other.deliveryPartyName)) {
            return false;
        }
        if (!Objects.equals(this.deliveryPartyAddress1, other.deliveryPartyAddress1)) {
            return false;
        }
        if (!Objects.equals(this.deliveryPartyAddress2, other.deliveryPartyAddress2)) {
            return false;
        }
        if (!Objects.equals(this.deliveryPartyAddress3, other.deliveryPartyAddress3)) {
            return false;
        }
        if (!Objects.equals(this.deliveryPartyAddress4, other.deliveryPartyAddress4)) {
            return false;
        }
        if (!Objects.equals(this.deliveryPartyEmail, other.deliveryPartyEmail)) {
            return false;
        }
        if (!Objects.equals(this.deliveryPartyPostalCode, other.deliveryPartyPostalCode)) {
            return false;
        }
        if (!Objects.equals(this.deliveryPartyDirectTelNo, other.deliveryPartyDirectTelNo)) {
            return false;
        }
        if (!Objects.equals(this.deliveryPartyBillBoardTel, other.deliveryPartyBillBoardTel)) {
            return false;
        }
        if (!Objects.equals(this.deliveryPartyFax, other.deliveryPartyFax)) {
            return false;
        }
        if (!Objects.equals(this.deliveryPartyCity, other.deliveryPartyCity)) {
            return false;
        }
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        if (this.entryType != other.entryType) {
            return false;
        }
        if (this.orderType != other.orderType) {
            return false;
        }
        if (!Objects.equals(this.billingPartyId, other.billingPartyId)) {
            return false;
        }
        if (!Objects.equals(this.deliveryPartyId, other.deliveryPartyId)) {
            return false;
        }
        if (this.billType != other.billType) {
            return false;
        }
        if (this.orderSubType != other.orderSubType) {
            return false;
        }
        if (!Objects.equals(this.poDate, other.poDate)) {
            return false;
        }
        if (!Objects.equals(this.orderInitiatedBy, other.orderInitiatedBy)) {
            return false;
        }
        if (this.rateApplicability != other.rateApplicability) {
            return false;
        }
        if (!Objects.equals(this.approved, other.approved)) {
            return false;
        }
        if (!Objects.equals(this.approvalDate, other.approvalDate)) {
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
        if (!Objects.equals(this.transportationCharges, other.transportationCharges)) {
            return false;
        }
        if (!Objects.equals(this.loadingUnloadingCharges, other.loadingUnloadingCharges)) {
            return false;
        }
        if (!Objects.equals(this.installationCharges, other.installationCharges)) {
            return false;
        }
        if (!Objects.equals(this.otherCharges, other.otherCharges)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "OrderHead{" + "id=" + id + ", orderNum=" + orderNum + ", segment=" + segment + ", saleType=" + saleType + ", entryType=" + entryType + ", orderType=" + orderType + ", billingPartyId=" + billingPartyId + ", deliveryPartyId=" + deliveryPartyId + ", postalCode=" + postalCode + ", billType=" + billType + ", orderSubType=" + orderSubType + ", projectName=" + projectName + ", poNum=" + poNum + ", orderId=" + orderId + ", poDate=" + poDate + ", poValue=" + poValue + ", marketingHead=" + marketingHead + ", orderInitiatedBy=" + orderInitiatedBy + ", rateApplicability=" + rateApplicability + ", rateContract=" + rateContract + ", orcPer=" + orcPer + ", approved=" + approved + ", approvalDate=" + approvalDate + ", orderAmount=" + orderAmount + ", cgstAmount=" + cgstAmount + ", sgstAmount=" + sgstAmount + ", igstAmount=" + igstAmount + ", netAmount=" + netAmount + ", deliveryPartyName=" + deliveryPartyName + ", deliveryPartyAddress1=" + deliveryPartyAddress1 + ", deliveryPartyAddress2=" + deliveryPartyAddress2 + ", deliveryPartyAddress3=" + deliveryPartyAddress3 + ", deliveryPartyAddress4=" + deliveryPartyAddress4 + ", deliveryPartyEmail=" + deliveryPartyEmail + ", deliveryPartyPostalCode=" + deliveryPartyPostalCode + ", deliveryPartyDirectTelNo=" + deliveryPartyDirectTelNo + ", deliveryPartyBillBoardTel=" + deliveryPartyBillBoardTel + ", deliveryPartyFax=" + deliveryPartyFax + ", deliveryPartyCity=" + deliveryPartyCity + ", transportationCharges=" + transportationCharges + ", loadingUnloadingCharges=" + loadingUnloadingCharges + ", installationCharges=" + installationCharges + ", otherCharges=" + otherCharges + '}';
    }

    
}
