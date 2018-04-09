/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.hardwareorderdetails;

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
@RequestMapping("/hardware_order_details")
public class HardwareOrderDetailsRest {
    @Autowired
    private HardwareOrderDetailsDAL hardwareOrderDetailDAL;
    
    @RequestMapping(method = RequestMethod.GET)
    public List<HardwareOrderDetails> findAll(@RequestParam(value = "offset", required = false, defaultValue = "0") Integer offset) throws SQLException {
        return hardwareOrderDetailDAL.findAll(offset);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public HardwareOrderDetails findById(@PathVariable("id") Integer id) throws SQLException {
        return hardwareOrderDetailDAL.findById(id);
    }
    
    @RequestMapping(method = RequestMethod.POST)
    public HardwareOrderDetails insert(@RequestBody HardwareOrderDetails hardwareOrderDetails) {
        return hardwareOrderDetailDAL.insert(hardwareOrderDetails);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.POST)
    public HardwareOrderDetails update(@RequestBody HardwareOrderDetails hardwareOrderDetails) {
        return hardwareOrderDetailDAL.update(hardwareOrderDetails);
    }

//    @RolesAllowed("ROLE_SUPER_ADMIN")
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable("id") Integer id) throws Exception {
        hardwareOrderDetailDAL.delete(id);
    }
    
    @RequestMapping(value = "/find_by/order_head", method = RequestMethod.GET)
    public List<HardwareOrderDetails> findByOrderHeadId(@RequestParam("orderHeadId") Integer orderHeadId) {
        return hardwareOrderDetailDAL.findByOrderHeadId(orderHeadId);
    }
    
}
