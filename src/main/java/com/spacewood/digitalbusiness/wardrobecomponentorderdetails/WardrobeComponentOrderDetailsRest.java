/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.wardrobecomponentorderdetails;

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
 * @author swapnika
 */
@RestController
@RequestMapping("/wardrobe_component_order_details")
public class WardrobeComponentOrderDetailsRest {

    @Autowired
    private WardrobeComponentOrderDetailsDAL wardrobeComponentOrderDetailsDAL;

    @RequestMapping(method = RequestMethod.GET)
    public List<WardrobeComponentOrderDetails> findAll(@RequestParam(value = "offset", required = false, defaultValue = "0") Integer offset) throws SQLException {
        return wardrobeComponentOrderDetailsDAL.findAll(offset);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public WardrobeComponentOrderDetails findById(@PathVariable("id") Integer id) throws SQLException {
        return wardrobeComponentOrderDetailsDAL.findById(id);
    }

    @RequestMapping(method = RequestMethod.POST)
    public WardrobeComponentOrderDetails insert(@RequestBody WardrobeComponentOrderDetails wardrobeComponentOrderDetails) {
        return wardrobeComponentOrderDetailsDAL.insert(wardrobeComponentOrderDetails);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.POST)
    public WardrobeComponentOrderDetails update(@RequestBody WardrobeComponentOrderDetails wardrobeComponentOrderDetails) {
        return wardrobeComponentOrderDetailsDAL.update(wardrobeComponentOrderDetails);
    }

//    @RolesAllowed("ROLE_SUPER_ADMIN")
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable("id") Integer id) throws Exception {
        wardrobeComponentOrderDetailsDAL.delete(id);
    }

}
