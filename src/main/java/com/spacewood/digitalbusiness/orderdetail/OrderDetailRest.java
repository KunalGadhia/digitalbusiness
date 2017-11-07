/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.orderdetail;

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
@RequestMapping("/order_details")
public class OrderDetailRest {
    @Autowired
    private OrderDetailDAL orderDetailDAL;
    
    @RequestMapping(method = RequestMethod.GET)
    public List<OrderDetail> findAll(@RequestParam(value = "offset", required = false, defaultValue = "0") Integer offset) throws SQLException {
        return orderDetailDAL.findAll(offset);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public OrderDetail findById(@PathVariable("id") Integer id) throws SQLException {
        return orderDetailDAL.findById(id);
    }
    
    @RequestMapping(method = RequestMethod.POST)
    public OrderDetail insert(@RequestBody OrderDetail orderDetail) {
        return orderDetailDAL.insert(orderDetail);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.POST)
    public OrderDetail update(@RequestBody OrderDetail orderDetail) {
        return orderDetailDAL.update(orderDetail);
    }

//    @RolesAllowed("ROLE_SUPER_ADMIN")
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable("id") Integer id) throws Exception {
        orderDetailDAL.delete(id);
    }
    
    @RequestMapping(value = "/find_by/order_head", method = RequestMethod.GET)
    public List<OrderDetail> findByOrderHeadId(@RequestParam("orderHeadId") Integer orderHeadId) {
        return orderDetailDAL.findByOrderHeadId(orderHeadId);
    }
    
}
