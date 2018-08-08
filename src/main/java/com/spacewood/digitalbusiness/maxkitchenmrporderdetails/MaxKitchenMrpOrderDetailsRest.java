/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.maxkitchenmrporderdetails;

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
 * @author User
 */
@RestController
@RequestMapping("/max_kitchen_mrp_order_details")
public class MaxKitchenMrpOrderDetailsRest {
    
    @Autowired
    private MaxKitchenMrpOrderDetailsDAL maxKitchenMrpOrderDetailDAL;

    @RequestMapping(method = RequestMethod.GET)
    public List<MaxKitchenMrpOrderDetails> findAll(@RequestParam(value = "offset", required = false, defaultValue = "0") Integer offset) throws SQLException {
        return maxKitchenMrpOrderDetailDAL.findAll(offset);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public MaxKitchenMrpOrderDetails findById(@PathVariable("id") Integer id) throws SQLException {
        return maxKitchenMrpOrderDetailDAL.findById(id);
    }

    @RequestMapping(method = RequestMethod.POST)
    public MaxKitchenMrpOrderDetails insert(@RequestBody MaxKitchenMrpOrderDetails maxWardrobeMrpOrderDetails) {
        return maxKitchenMrpOrderDetailDAL.insert(maxWardrobeMrpOrderDetails);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.POST)
    public MaxKitchenMrpOrderDetails update(@RequestBody MaxKitchenMrpOrderDetails maxKitchenMrpOrderDetails) {
        return maxKitchenMrpOrderDetailDAL.update(maxKitchenMrpOrderDetails);
    }

//    @RolesAllowed("ROLE_SUPER_ADMIN")
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable("id") Integer id) throws Exception {
        maxKitchenMrpOrderDetailDAL.delete(id);
    }

    @RequestMapping(value = "/find_by/order_head", method = RequestMethod.GET)
    public List<MaxKitchenMrpOrderDetails> findByOrderHeadId(@RequestParam("orderHeadId") Integer orderHeadId) {
        return maxKitchenMrpOrderDetailDAL.findByOrderHeadId(orderHeadId);
    }

    @RequestMapping(value = "/find_price_by/order_head", method = RequestMethod.GET)
    public Integer findPriceByOrderHeadId(@RequestParam("orderHeadId") Integer orderHeadId) {
        return maxKitchenMrpOrderDetailDAL.findPriceByOrderHeadId(orderHeadId);
    }
}
