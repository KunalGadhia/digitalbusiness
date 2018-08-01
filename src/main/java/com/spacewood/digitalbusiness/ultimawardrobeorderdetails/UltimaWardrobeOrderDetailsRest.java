/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.ultimawardrobeorderdetails;

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
@RequestMapping("/ultima_wardrobe_order_details")
public class UltimaWardrobeOrderDetailsRest {

    @Autowired
    private UltimaWardrobeOrderDetailsDAL ultimaWardrobeOrderDetailDAL;

    @RequestMapping(method = RequestMethod.GET)
    public List<UltimaWardrobeOrderDetails> findAll(@RequestParam(value = "offset", required = false, defaultValue = "0") Integer offset) throws SQLException {
        return ultimaWardrobeOrderDetailDAL.findAll(offset);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public UltimaWardrobeOrderDetails findById(@PathVariable("id") Integer id) throws SQLException {
        return ultimaWardrobeOrderDetailDAL.findById(id);
    }

    @RequestMapping(method = RequestMethod.POST)
    public UltimaWardrobeOrderDetails insert(@RequestBody UltimaWardrobeOrderDetails ultimaWardrobeOrderDetails) {
        return ultimaWardrobeOrderDetailDAL.insert(ultimaWardrobeOrderDetails);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.POST)
    public UltimaWardrobeOrderDetails update(@RequestBody UltimaWardrobeOrderDetails ultimaWardrobeOrderDetails) {
        return ultimaWardrobeOrderDetailDAL.update(ultimaWardrobeOrderDetails);
    }

//    @RolesAllowed("ROLE_SUPER_ADMIN")
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable("id") Integer id) throws Exception {
        ultimaWardrobeOrderDetailDAL.delete(id);
    }

    @RequestMapping(value = "/find_by/order_head", method = RequestMethod.GET)
    public List<UltimaWardrobeOrderDetails> findByOrderHeadId(@RequestParam("orderHeadId") Integer orderHeadId) {
        return ultimaWardrobeOrderDetailDAL.findByOrderHeadId(orderHeadId);
    }

    @RequestMapping(value = "/find_price_by/order_head", method = RequestMethod.GET)
    public Integer findPriceByOrderHeadId(@RequestParam("orderHeadId") Integer orderHeadId) {
        return ultimaWardrobeOrderDetailDAL.findPriceByOrderHeadId(orderHeadId);
    }
}
