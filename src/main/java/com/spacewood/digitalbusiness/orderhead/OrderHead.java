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

    @Override
    public int hashCode() {
        int hash = 3;
        hash = 79 * hash + Objects.hashCode(this.id);
        hash = 79 * hash + Objects.hashCode(this.orderNum);
        hash = 79 * hash + Objects.hashCode(this.segment);
        hash = 79 * hash + Objects.hashCode(this.saleType);
        hash = 79 * hash + Objects.hashCode(this.entryType);
        hash = 79 * hash + Objects.hashCode(this.orderType);
        hash = 79 * hash + Objects.hashCode(this.billingPartyId);
        hash = 79 * hash + Objects.hashCode(this.deliveryPartyId);
        hash = 79 * hash + Objects.hashCode(this.postalCode);
        hash = 79 * hash + Objects.hashCode(this.billType);
        hash = 79 * hash + Objects.hashCode(this.orderSubType);
        hash = 79 * hash + Objects.hashCode(this.projectName);
        hash = 79 * hash + Objects.hashCode(this.poNum);
        hash = 79 * hash + Objects.hashCode(this.orderId);
        hash = 79 * hash + Objects.hashCode(this.poDate);
        hash = 79 * hash + Objects.hashCode(this.poValue);
        hash = 79 * hash + Objects.hashCode(this.marketingHead);
        hash = 79 * hash + Objects.hashCode(this.orderInitiatedBy);
        hash = 79 * hash + Objects.hashCode(this.rateApplicability);
        hash = 79 * hash + Objects.hashCode(this.rateContract);
        hash = 79 * hash + Objects.hashCode(this.orcPer);
        hash = 79 * hash + Objects.hashCode(this.approved);
        hash = 79 * hash + Objects.hashCode(this.approvalDate);
        hash = 79 * hash + Objects.hashCode(this.orderAmount);
        hash = 79 * hash + Objects.hashCode(this.cgstAmount);
        hash = 79 * hash + Objects.hashCode(this.sgstAmount);
        hash = 79 * hash + Objects.hashCode(this.igstAmount);
        hash = 79 * hash + Objects.hashCode(this.netAmount);
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
        return true;
    }

    @Override
    public String toString() {
        return "OrderHead{" + "id=" + id + ", orderNum=" + orderNum + ", segment=" + segment + ", saleType=" + saleType + ", entryType=" + entryType + ", orderType=" + orderType + ", billingPartyId=" + billingPartyId + ", deliveryPartyId=" + deliveryPartyId + ", postalCode=" + postalCode + ", billType=" + billType + ", orderSubType=" + orderSubType + ", projectName=" + projectName + ", poNum=" + poNum + ", orderId=" + orderId + ", poDate=" + poDate + ", poValue=" + poValue + ", marketingHead=" + marketingHead + ", orderInitiatedBy=" + orderInitiatedBy + ", rateApplicability=" + rateApplicability + ", rateContract=" + rateContract + ", orcPer=" + orcPer + ", approved=" + approved + ", approvalDate=" + approvalDate + ", orderAmount=" + orderAmount + ", cgstAmount=" + cgstAmount + ", sgstAmount=" + sgstAmount + ", igstAmount=" + igstAmount + ", netAmount=" + netAmount + '}';
    }
    
}
