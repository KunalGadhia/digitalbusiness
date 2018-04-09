/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.maxkitchen;

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
 * @author user
 */
@RestController
@RequestMapping("/max_kitchen")
public class MaxKitchenRest {
    
    @Autowired
    private MaxKitchenDAL maxKitchenDAL;
    
    @RequestMapping(method = RequestMethod.GET)
    public List<MaxKitchen> findAll(@RequestParam(value = "offset", required = false, defaultValue = "0") Integer offset) throws SQLException {
        return maxKitchenDAL.findAll(offset);
    }
    
    @RequestMapping(value="/find/category", method = RequestMethod.GET)
    public List<MaxKitchen> findByCategory(@RequestParam("category") String category) throws SQLException {
        return maxKitchenDAL.findByCategory(category);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public MaxKitchen findById(@PathVariable("id") Integer id) throws SQLException {
        return maxKitchenDAL.findById(id);
    }
    
    @RequestMapping(method = RequestMethod.POST)
    public MaxKitchen insert(@RequestBody MaxKitchen maxKitchen) {
        return maxKitchenDAL.insert(maxKitchen);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.POST)
    public MaxKitchen update(@RequestBody MaxKitchen maxKitchen) {
        return maxKitchenDAL.update(maxKitchen);
    }

//    @RolesAllowed("ROLE_SUPER_ADMIN")
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable("id") Integer id) throws Exception {
        maxKitchenDAL.delete(id);
    }

    @RequestMapping(value = "/find/description", method = RequestMethod.GET)
    public MaxKitchen findByDescription(@RequestParam("description") String description) throws Exception {
        return maxKitchenDAL.findByDescription(description);
    }
    
    @RequestMapping(value = "/find/description_like", method = RequestMethod.GET)
    public List<MaxKitchen> findByDescriptionLike(@RequestParam("description") String description) {
        return maxKitchenDAL.findByDescriptionLike(description);
    }
}
