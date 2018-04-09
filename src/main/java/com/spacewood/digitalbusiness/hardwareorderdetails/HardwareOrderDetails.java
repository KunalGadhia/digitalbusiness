/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.hardwareorderdetails;

import java.util.Objects;

/**
 *
 * @author webdesign
 */
public class HardwareOrderDetails {
    private Integer id;
    private Integer orderHeadId;
    private String productCode;
    private String hardwareName;
    private Double stdPrice;
    private Integer quantity;
    private Double price;
    private String orderFor;

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

    public String getProductCode() {
        return productCode;
    }

    public void setProductCode(String productCode) {
        this.productCode = productCode;
    }

    public String getHardwareName() {
        return hardwareName;
    }

    public void setHardwareName(String hardwareName) {
        this.hardwareName = hardwareName;
    }

    public Double getStdPrice() {
        return stdPrice;
    }

    public void setStdPrice(Double stdPrice) {
        this.stdPrice = stdPrice;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getOrderFor() {
        return orderFor;
    }

    public void setOrderFor(String orderFor) {
        this.orderFor = orderFor;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 53 * hash + Objects.hashCode(this.id);
        hash = 53 * hash + Objects.hashCode(this.orderHeadId);
        hash = 53 * hash + Objects.hashCode(this.productCode);
        hash = 53 * hash + Objects.hashCode(this.hardwareName);
        hash = 53 * hash + Objects.hashCode(this.stdPrice);
        hash = 53 * hash + Objects.hashCode(this.quantity);
        hash = 53 * hash + Objects.hashCode(this.price);
        hash = 53 * hash + Objects.hashCode(this.orderFor);
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
        final HardwareOrderDetails other = (HardwareOrderDetails) obj;
        if (!Objects.equals(this.productCode, other.productCode)) {
            return false;
        }
        if (!Objects.equals(this.hardwareName, other.hardwareName)) {
            return false;
        }
        if (!Objects.equals(this.orderFor, other.orderFor)) {
            return false;
        }
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        if (!Objects.equals(this.orderHeadId, other.orderHeadId)) {
            return false;
        }
        if (!Objects.equals(this.stdPrice, other.stdPrice)) {
            return false;
        }
        if (!Objects.equals(this.quantity, other.quantity)) {
            return false;
        }
        if (!Objects.equals(this.price, other.price)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "HardwareOrderDetails{" + "id=" + id + ", orderHeadId=" + orderHeadId + ", productCode=" + productCode + ", hardwareName=" + hardwareName + ", stdPrice=" + stdPrice + ", quantity=" + quantity + ", price=" + price + ", orderFor=" + orderFor + '}';
    }           
}
