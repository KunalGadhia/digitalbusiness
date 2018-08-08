/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.maxwardrobemrporderdetails;

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
@RequestMapping("/max_wardrobe_mrp_order_details")
public class MaxWardrobesMrpOrderDetailsRest {
    @Autowired
    private MaxWardrobesMrpOrderDetailsDAL maxWardrobeMrpOrderDetailDAL;

    @RequestMapping(method = RequestMethod.GET)
    public List<MaxWardrobesMrpOrderDetails> findAll(@RequestParam(value = "offset", required = false, defaultValue = "0") Integer offset) throws SQLException {
        return maxWardrobeMrpOrderDetailDAL.findAll(offset);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public MaxWardrobesMrpOrderDetails findById(@PathVariable("id") Integer id) throws SQLException {
        return maxWardrobeMrpOrderDetailDAL.findById(id);
    }

    @RequestMapping(method = RequestMethod.POST)
    public MaxWardrobesMrpOrderDetails insert(@RequestBody MaxWardrobesMrpOrderDetails maxWardrobeMrpOrderDetails) {
        return maxWardrobeMrpOrderDetailDAL.insert(maxWardrobeMrpOrderDetails);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.POST)
    public MaxWardrobesMrpOrderDetails update(@RequestBody MaxWardrobesMrpOrderDetails maxWardrobeMrpOrderDetails) {
        return maxWardrobeMrpOrderDetailDAL.update(maxWardrobeMrpOrderDetails);
    }

//    @RolesAllowed("ROLE_SUPER_ADMIN")
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable("id") Integer id) throws Exception {
        maxWardrobeMrpOrderDetailDAL.delete(id);
    }

    @RequestMapping(value = "/find_by/order_head", method = RequestMethod.GET)
    public List<MaxWardrobesMrpOrderDetails> findByOrderHeadId(@RequestParam("orderHeadId") Integer orderHeadId) {
        return maxWardrobeMrpOrderDetailDAL.findByOrderHeadId(orderHeadId);
    }

    @RequestMapping(value = "/find_price_by/order_head", method = RequestMethod.GET)
    public Integer findPriceByOrderHeadId(@RequestParam("orderHeadId") Integer orderHeadId) {
        return maxWardrobeMrpOrderDetailDAL.findPriceByOrderHeadId(orderHeadId);
    }
}
