/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.fillerorderdetails;

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
@RequestMapping("/filler_order_details")
public class FillerOrderDetailsRest {
    
  @Autowired
    private FillerOrderDetailsDAL fillerOrderDetailDAL;
    
    @RequestMapping(method = RequestMethod.GET)
    public List<FillerOrderDetails> findAll(@RequestParam(value = "offset", required = false, defaultValue = "0") Integer offset) throws SQLException {
        return fillerOrderDetailDAL.findAll(offset);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public FillerOrderDetails findById(@PathVariable("id") Integer id) throws SQLException {
        return fillerOrderDetailDAL.findById(id);
    }
    
    @RequestMapping(method = RequestMethod.POST)
    public FillerOrderDetails insert(@RequestBody FillerOrderDetails panelOrderDetails) {
        return fillerOrderDetailDAL.insert(panelOrderDetails);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.POST)
    public FillerOrderDetails update(@RequestBody FillerOrderDetails panelOrderDetails) {
        return fillerOrderDetailDAL.update(panelOrderDetails);
    }

//    @RolesAllowed("ROLE_SUPER_ADMIN")
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable("id") Integer id) throws Exception {
        fillerOrderDetailDAL.delete(id);
    }
    
    @RequestMapping(value = "/find_by/order_head", method = RequestMethod.GET)
    public List<FillerOrderDetails> findByOrderHeadId(@RequestParam("orderHeadId") Integer orderHeadId) {
        return fillerOrderDetailDAL.findByOrderHeadId(orderHeadId);
    }
    
    @RequestMapping(value = "/find_price_by/order_head", method = RequestMethod.GET)
    public Integer findPriceByOrderHeadId(@RequestParam("orderHeadId") Integer orderHeadId) {
        return fillerOrderDetailDAL.findPriceByOrderHeadId(orderHeadId);
    }  
    
}
