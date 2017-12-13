/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.drawerorderdetails;

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
@RequestMapping("/drawer_order_details")
public class DrawerOrderDetailsRest {

    @Autowired
    private DrawerOrderDetailsDAL drawerOrderDetailDAL;

    @RequestMapping(method = RequestMethod.GET)
    public List<DrawerOrderDetails> findAll(@RequestParam(value = "offset", required = false, defaultValue = "0") Integer offset) throws SQLException {
        return drawerOrderDetailDAL.findAll(offset);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public DrawerOrderDetails findById(@PathVariable("id") Integer id) throws SQLException {
        return drawerOrderDetailDAL.findById(id);
    }

    @RequestMapping(method = RequestMethod.POST)
    public DrawerOrderDetails insert(@RequestBody DrawerOrderDetails drawerOrderDetails) {
        return drawerOrderDetailDAL.insert(drawerOrderDetails);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.POST)
    public DrawerOrderDetails update(@RequestBody DrawerOrderDetails drawerOrderDetails) {
        return drawerOrderDetailDAL.update(drawerOrderDetails);
    }

//    @RolesAllowed("ROLE_SUPER_ADMIN")
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable("id") Integer id) throws Exception {
        drawerOrderDetailDAL.delete(id);
    }

    @RequestMapping(value = "/find_by/order_head", method = RequestMethod.GET)
    public List<DrawerOrderDetails> findByOrderHeadId(@RequestParam("orderHeadId") Integer orderHeadId) {
        return drawerOrderDetailDAL.findByOrderHeadId(orderHeadId);
    }

    @RequestMapping(value = "/find_price_by/order_head", method = RequestMethod.GET)
    public Integer findPriceByOrderHeadId(@RequestParam("orderHeadId") Integer orderHeadId) {
        return drawerOrderDetailDAL.findPriceByOrderHeadId(orderHeadId);
    }

}
