/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.corniceorderdetails;

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
@RequestMapping("/cornice_order_details")
public class CorniceOrderDetailsRest {
    @Autowired
    private CorniceOrderDetailsDAL corniceOrderDetailDAL;

    @RequestMapping(method = RequestMethod.GET)
    public List<CorniceOrderDetails> findAll(@RequestParam(value = "offset", required = false, defaultValue = "0") Integer offset) throws SQLException {
        return corniceOrderDetailDAL.findAll(offset);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public CorniceOrderDetails findById(@PathVariable("id") Integer id) throws SQLException {
        return corniceOrderDetailDAL.findById(id);
    }

    @RequestMapping(method = RequestMethod.POST)
    public CorniceOrderDetails insert(@RequestBody CorniceOrderDetails corniceOrderDetails) {
        return corniceOrderDetailDAL.insert(corniceOrderDetails);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.POST)
    public CorniceOrderDetails update(@RequestBody CorniceOrderDetails corniceOrderDetails) {
        return corniceOrderDetailDAL.update(corniceOrderDetails);
    }

//    @RolesAllowed("ROLE_SUPER_ADMIN")
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable("id") Integer id) throws Exception {
        corniceOrderDetailDAL.delete(id);
    }

    @RequestMapping(value = "/find_by/order_head", method = RequestMethod.GET)
    public List<CorniceOrderDetails> findByOrderHeadId(@RequestParam("orderHeadId") Integer orderHeadId) {
        return corniceOrderDetailDAL.findByOrderHeadId(orderHeadId);
    }

    @RequestMapping(value = "/find_price_by/order_head", method = RequestMethod.GET)
    public Integer findPriceByOrderHeadId(@RequestParam("orderHeadId") Integer orderHeadId) {
        return corniceOrderDetailDAL.findPriceByOrderHeadId(orderHeadId);
    }
}
