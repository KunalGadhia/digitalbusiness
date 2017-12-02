/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.panelorderdetails;

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
@RequestMapping("/panel_order_details")
public class PanelOrderDetailsRest {
    @Autowired
    private PanelOrderDetailsDAL panelOrderDetailDAL;
    
    @RequestMapping(method = RequestMethod.GET)
    public List<PanelOrderDetails> findAll(@RequestParam(value = "offset", required = false, defaultValue = "0") Integer offset) throws SQLException {
        return panelOrderDetailDAL.findAll(offset);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public PanelOrderDetails findById(@PathVariable("id") Integer id) throws SQLException {
        return panelOrderDetailDAL.findById(id);
    }
    
    @RequestMapping(method = RequestMethod.POST)
    public PanelOrderDetails insert(@RequestBody PanelOrderDetails panelOrderDetails) {
        return panelOrderDetailDAL.insert(panelOrderDetails);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.POST)
    public PanelOrderDetails update(@RequestBody PanelOrderDetails panelOrderDetails) {
        return panelOrderDetailDAL.update(panelOrderDetails);
    }

//    @RolesAllowed("ROLE_SUPER_ADMIN")
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable("id") Integer id) throws Exception {
        panelOrderDetailDAL.delete(id);
    }
    
    @RequestMapping(value = "/find_by/order_head", method = RequestMethod.GET)
    public List<PanelOrderDetails> findByOrderHeadId(@RequestParam("orderHeadId") Integer orderHeadId) {
        return panelOrderDetailDAL.findByOrderHeadId(orderHeadId);
    }
    
    @RequestMapping(value = "/find_price_by/order_head", method = RequestMethod.GET)
    public Integer findPriceByOrderHeadId(@RequestParam("orderHeadId") Integer orderHeadId) {
        return panelOrderDetailDAL.findPriceByOrderHeadId(orderHeadId);
    }
    
//    @RequestMapping(value = "/find_price_by/order_head", method = RequestMethod.GET)
//    public Integer findPriceByOrderHeadId(@RequestParam("orderHeadId") Integer orderHeadId) {
//        return panelOrderDetailDAL.findPriceByOrderHeadId(orderHeadId);
//    }
}
