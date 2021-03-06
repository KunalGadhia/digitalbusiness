/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.carcassorderdetails;

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
@RequestMapping("/carcass_order_details")
public class CarcassOrderDetailsRest {
    @Autowired
    private CarcassOrderDetailsDAL carcassOrderDetailDAL;
     
    @RequestMapping(method = RequestMethod.GET)
    public List<CarcassOrderDetails> findAll(@RequestParam(value = "offset", required = false, defaultValue = "0") Integer offset) throws SQLException {
        return carcassOrderDetailDAL.findAll(offset);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public CarcassOrderDetails findById(@PathVariable("id") Integer id) throws SQLException {
        return carcassOrderDetailDAL.findById(id);
    }
    
    @RequestMapping(method = RequestMethod.POST)
    public CarcassOrderDetails insert(@RequestBody CarcassOrderDetails carcassOrderDetails) {
        return carcassOrderDetailDAL.insert(carcassOrderDetails);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.POST)
    public CarcassOrderDetails update(@RequestBody CarcassOrderDetails carcassOrderDetails) {
        System.out.println("Update Carcass Details Data REST :%O"+carcassOrderDetails);
        return carcassOrderDetailDAL.update(carcassOrderDetails);
    }

//    @RolesAllowed("ROLE_SUPER_ADMIN")
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable("id") Integer id) throws Exception {
        carcassOrderDetailDAL.delete(id);
    }
    
    @RequestMapping(value = "/find_by/order_head", method = RequestMethod.GET)
    public List<CarcassOrderDetails> findByOrderHeadId(@RequestParam("orderHeadId") Integer orderHeadId) {
        return carcassOrderDetailDAL.findByOrderHeadId(orderHeadId);
    }
    
    @RequestMapping(value = "/find_price_by/order_head", method = RequestMethod.GET)
    public Double findPriceByOrderHeadId(@RequestParam("orderHeadId") Integer orderHeadId) {
        return carcassOrderDetailDAL.findPriceByOrderHeadId(orderHeadId);
    }
}
