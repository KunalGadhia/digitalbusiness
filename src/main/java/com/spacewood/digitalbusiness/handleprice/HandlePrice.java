/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.handleprice;

import java.util.Objects;

/**
 *
 * @author webdesign
 */
public class HandlePrice {
    private Integer id;
    private String kitchenComponent;
    private String finish;
    private Double cd;
    private Double price;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getKitchenComponent() {
        return kitchenComponent;
    }

    public void setKitchenComponent(String kitchenComponent) {
        this.kitchenComponent = kitchenComponent;
    }

    public String getFinish() {
        return finish;
    }

    public void setFinish(String finish) {
        this.finish = finish;
    }

    public Double getCd() {
        return cd;
    }

    public void setCd(Double cd) {
        this.cd = cd;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    @Override
    public int hashCode() {
        int hash = 3;
        hash = 53 * hash + Objects.hashCode(this.id);
        hash = 53 * hash + Objects.hashCode(this.kitchenComponent);
        hash = 53 * hash + Objects.hashCode(this.finish);
        hash = 53 * hash + Objects.hashCode(this.cd);
        hash = 53 * hash + Objects.hashCode(this.price);
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
        final HandlePrice other = (HandlePrice) obj;
        if (!Objects.equals(this.kitchenComponent, other.kitchenComponent)) {
            return false;
        }
        if (!Objects.equals(this.finish, other.finish)) {
            return false;
        }
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        if (!Objects.equals(this.cd, other.cd)) {
            return false;
        }
        if (!Objects.equals(this.price, other.price)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "HandlePrice{" + "id=" + id + ", kitchenComponent=" + kitchenComponent + ", finish=" + finish + ", cd=" + cd + ", price=" + price + '}';
    }
        
}
