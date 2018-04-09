/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.maxkitchenorderdetails;

import com.spacewood.digitalbusiness.hardwareorderdetails.HardwareOrderDetails;
import java.sql.SQLException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author user
 */
@RestController
@RequestMapping("/max_kitchen_order_details")
public class MaxKitchenOrderDetailsRest {
    @Autowired
    private MaxKitchenOrderDetailsDAL maxKitchenOrderDetailDAL;
    
    @RequestMapping(method = RequestMethod.GET)
    public List<MaxKitchenOrderDetails> findAll(@RequestParam(value = "offset", required = false, defaultValue = "0") Integer offset) throws SQLException {
        return maxKitchenOrderDetailDAL.findAll(offset);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public MaxKitchenOrderDetails findById(@PathVariable("id") Integer id) throws SQLException {
        return maxKitchenOrderDetailDAL.findById(id);
    }
    
    @RequestMapping(method = RequestMethod.POST)
    public MaxKitchenOrderDetails insert(@RequestBody MaxKitchenOrderDetails maxKitchenOrderDetails) {
        return maxKitchenOrderDetailDAL.insert(maxKitchenOrderDetails);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.POST)
    public MaxKitchenOrderDetails update(@RequestBody MaxKitchenOrderDetails maxKitchenOrderDetails) {
        return maxKitchenOrderDetailDAL.update(maxKitchenOrderDetails);
    }

//    @RolesAllowed("ROLE_SUPER_ADMIN")
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable("id") Integer id) throws Exception {
        maxKitchenOrderDetailDAL.delete(id);
    }
    
    @RequestMapping(value = "/find_by/order_head", method = RequestMethod.GET)
    public List<MaxKitchenOrderDetails> findByOrderHeadId(@RequestParam("orderHeadId") Integer orderHeadId) {
        return maxKitchenOrderDetailDAL.findByOrderHeadId(orderHeadId);
    }
}
