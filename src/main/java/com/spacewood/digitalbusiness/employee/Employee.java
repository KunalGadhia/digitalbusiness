/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.employee;

import java.util.Objects;

/**
 *
 * @author webdesign
 */
public class Employee {
        private Integer id;
	private String empCode;
	private String empName;
        private String empMailid;
        private String empMobileNumber;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getEmpCode() {
        return empCode;
    }

    public void setEmpCode(String empCode) {
        this.empCode = empCode;
    }

    public String getEmpName() {
        return empName;
    }

    public void setEmpName(String empName) {
        this.empName = empName;
    }

    public String getEmpMailid() {
        return empMailid;
    }

    public void setEmpMailid(String empMailid) {
        this.empMailid = empMailid;
    }

    public String getEmpMobileNumber() {
        return empMobileNumber;
    }

    public void setEmpMobileNumber(String empMobileNumber) {
        this.empMobileNumber = empMobileNumber;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 59 * hash + Objects.hashCode(this.id);
        hash = 59 * hash + Objects.hashCode(this.empCode);
        hash = 59 * hash + Objects.hashCode(this.empName);
        hash = 59 * hash + Objects.hashCode(this.empMailid);
        hash = 59 * hash + Objects.hashCode(this.empMobileNumber);
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
        final Employee other = (Employee) obj;
        if (!Objects.equals(this.empCode, other.empCode)) {
            return false;
        }
        if (!Objects.equals(this.empName, other.empName)) {
            return false;
        }
        if (!Objects.equals(this.empMailid, other.empMailid)) {
            return false;
        }
        if (!Objects.equals(this.empMobileNumber, other.empMobileNumber)) {
            return false;
        }
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "Employee{" + "id=" + id + ", empCode=" + empCode + ", empName=" + empName + ", empMailid=" + empMailid + ", empMobileNumber=" + empMobileNumber + '}';
    }                
        
}
