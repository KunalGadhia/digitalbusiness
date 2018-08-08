/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.infinitywardrobemrporderdetails;

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
@RequestMapping("/infinity_wardrobe_mrp_order_details")
public class InfinityWardrobeMrpOrderDetailsRest {
   @Autowired
    private InfinityWardrobeMrpOrderDetailsDAL infinityWardrobeMrpOrderDetailDAL;

    @RequestMapping(method = RequestMethod.GET)
    public List<InfinityWardrobeMrpOrderDetails> findAll(@RequestParam(value = "offset", required = false, defaultValue = "0") Integer offset) throws SQLException {
        return infinityWardrobeMrpOrderDetailDAL.findAll(offset);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public InfinityWardrobeMrpOrderDetails findById(@PathVariable("id") Integer id) throws SQLException {
        return infinityWardrobeMrpOrderDetailDAL.findById(id);
    }

    @RequestMapping(method = RequestMethod.POST)
    public InfinityWardrobeMrpOrderDetails insert(@RequestBody InfinityWardrobeMrpOrderDetails infinityWardrobeMrpOrderDetails) {
        return infinityWardrobeMrpOrderDetailDAL.insert(infinityWardrobeMrpOrderDetails);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.POST)
    public InfinityWardrobeMrpOrderDetails update(@RequestBody InfinityWardrobeMrpOrderDetails infinityWardrobeMrpOrderDetails) {
        return infinityWardrobeMrpOrderDetailDAL.update(infinityWardrobeMrpOrderDetails);
    }

//    @RolesAllowed("ROLE_SUPER_ADMIN")
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable("id") Integer id) throws Exception {
        infinityWardrobeMrpOrderDetailDAL.delete(id);
    }

    @RequestMapping(value = "/find_by/order_head", method = RequestMethod.GET)
    public List<InfinityWardrobeMrpOrderDetails> findByOrderHeadId(@RequestParam("orderHeadId") Integer orderHeadId) {
        return infinityWardrobeMrpOrderDetailDAL.findByOrderHeadId(orderHeadId);
    }

    @RequestMapping(value = "/find_price_by/order_head", method = RequestMethod.GET)
    public Integer findPriceByOrderHeadId(@RequestParam("orderHeadId") Integer orderHeadId) {
        return infinityWardrobeMrpOrderDetailDAL.findPriceByOrderHeadId(orderHeadId);
    } 
}
