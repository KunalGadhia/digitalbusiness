/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.shutterorderdetails;

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
@RequestMapping("/shutter_order_details")
public class ShutterOrderDetailsRest {

    @Autowired
    private ShutterOrderDetailsDAL shutterOrderDetailDAL;

    @RequestMapping(method = RequestMethod.GET)
    public List<ShutterOrderDetails> findAll(@RequestParam(value = "offset", required = false, defaultValue = "0") Integer offset) throws SQLException {
        return shutterOrderDetailDAL.findAll(offset);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ShutterOrderDetails findById(@PathVariable("id") Integer id) throws SQLException {
        return shutterOrderDetailDAL.findById(id);
    }

    @RequestMapping(method = RequestMethod.POST)
    public ShutterOrderDetails insert(@RequestBody ShutterOrderDetails shutterOrderDetails) {
        return shutterOrderDetailDAL.insert(shutterOrderDetails);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.POST)
    public ShutterOrderDetails update(@RequestBody ShutterOrderDetails shutterOrderDetails) {
        return shutterOrderDetailDAL.update(shutterOrderDetails);
    }

//    @RolesAllowed("ROLE_SUPER_ADMIN")
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable("id") Integer id) throws Exception {
        shutterOrderDetailDAL.delete(id);
    }

    @RequestMapping(value = "/find_by/order_head", method = RequestMethod.GET)
    public List<ShutterOrderDetails> findByOrderHeadId(@RequestParam("orderHeadId") Integer orderHeadId) {
        return shutterOrderDetailDAL.findByOrderHeadId(orderHeadId);
    }

    @RequestMapping(value = "/find_price_by/order_head", method = RequestMethod.GET)
    public Integer findPriceByOrderHeadId(@RequestParam("orderHeadId") Integer orderHeadId) {
        return shutterOrderDetailDAL.findPriceByOrderHeadId(orderHeadId);
    }

}
