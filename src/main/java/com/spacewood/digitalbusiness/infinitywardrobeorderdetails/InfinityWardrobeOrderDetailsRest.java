/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.infinitywardrobeorderdetails;

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
 * @author webdesign
 */
@RestController
@RequestMapping("/infinity_wardrobe_order_details")
public class InfinityWardrobeOrderDetailsRest {
   @Autowired
    private InfinityWardrobeOrderDetailsDAL infinityWardrobeOrderDetailDAL;

    @RequestMapping(method = RequestMethod.GET)
    public List<InfinityWardrobeOrderDetails> findAll(@RequestParam(value = "offset", required = false, defaultValue = "0") Integer offset) throws SQLException {
        return infinityWardrobeOrderDetailDAL.findAll(offset);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public InfinityWardrobeOrderDetails findById(@PathVariable("id") Integer id) throws SQLException {
        return infinityWardrobeOrderDetailDAL.findById(id);
    }

    @RequestMapping(method = RequestMethod.POST)
    public InfinityWardrobeOrderDetails insert(@RequestBody InfinityWardrobeOrderDetails infinityWardrobeOrderDetails) {
        return infinityWardrobeOrderDetailDAL.insert(infinityWardrobeOrderDetails);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.POST)
    public InfinityWardrobeOrderDetails update(@RequestBody InfinityWardrobeOrderDetails infinityWardrobeOrderDetails) {
        return infinityWardrobeOrderDetailDAL.update(infinityWardrobeOrderDetails);
    }

//    @RolesAllowed("ROLE_SUPER_ADMIN")
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable("id") Integer id) throws Exception {
        infinityWardrobeOrderDetailDAL.delete(id);
    }

    @RequestMapping(value = "/find_by/order_head", method = RequestMethod.GET)
    public List<InfinityWardrobeOrderDetails> findByOrderHeadId(@RequestParam("orderHeadId") Integer orderHeadId) {
        return infinityWardrobeOrderDetailDAL.findByOrderHeadId(orderHeadId);
    }

    @RequestMapping(value = "/find_price_by/order_head", method = RequestMethod.GET)
    public Integer findPriceByOrderHeadId(@RequestParam("orderHeadId") Integer orderHeadId) {
        return infinityWardrobeOrderDetailDAL.findPriceByOrderHeadId(orderHeadId);
    } 
}
