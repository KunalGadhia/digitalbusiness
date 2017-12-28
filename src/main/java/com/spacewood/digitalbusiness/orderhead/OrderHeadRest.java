/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.orderhead;

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
@RequestMapping("/order_head")
public class OrderHeadRest {
    
    @Autowired
    private OrderHeadDAL orderHeadDAL;
    
    @RequestMapping(method = RequestMethod.GET)
    public List<OrderHead> findAll(@RequestParam(value = "offset", required = false, defaultValue = "0") Integer offset) throws SQLException {
        return orderHeadDAL.findAll(offset);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public OrderHead findById(@PathVariable("id") Integer id) throws SQLException {
        return orderHeadDAL.findById(id);
    }
    
    @RequestMapping(method = RequestMethod.POST)
    public OrderHead insert(@RequestBody OrderHead orderHead) {
        return orderHeadDAL.insert(orderHead);
    }
    
    @RequestMapping(value = "/find/orderNum", method = RequestMethod.GET)
    public List findByOrderNumber(@RequestParam("orderNum") String orderNum) throws Exception {
        return orderHeadDAL.findByOrderNumber(orderNum);
    }
    
    @RequestMapping(value="/find/initiatedBy", method = RequestMethod.GET)
    public List<OrderHead> findOrderGenerationSource(@RequestParam("userId") Integer userId) throws SQLException {
        return orderHeadDAL.findOrderGenerationSource(userId);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.POST)
    public OrderHead update(@RequestBody OrderHead orderHead) {
        return orderHeadDAL.update(orderHead);
    }

//    @RolesAllowed("ROLE_SUPER_ADMIN")
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable("id") Integer id) throws Exception {
        orderHeadDAL.delete(id);
    }

//    @RequestMapping(value = "/find/name", method = RequestMethod.GET)
//
//    public Employee findByName(@RequestParam("name") String name) throws Exception {
//        return orderHeadDAL.findByName(name);
//    }
//    
//    @RequestMapping(value = "/find/user_like", method = RequestMethod.GET)
//    public List<Employee> findByNameLike(@RequestParam("name") String name) {
//        return orderHeadDAL.findByNameLike(name);
//    }
    
}
