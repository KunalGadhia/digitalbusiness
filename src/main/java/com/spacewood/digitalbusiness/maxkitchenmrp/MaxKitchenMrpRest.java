/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.maxkitchenmrp;

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
 * @author User
 */
@RestController
@RequestMapping("/max_kitchen_mrp")
public class MaxKitchenMrpRest {
    
    @Autowired
    private MaxKitchenMrpDAL maxKitchenMrpDAL;
    
    @RequestMapping(method = RequestMethod.GET)
    public List<MaxKitchenMrp> findAll(@RequestParam(value = "offset", required = false, defaultValue = "0") Integer offset) throws SQLException {
        return maxKitchenMrpDAL.findAll(offset);
    }
    
    @RequestMapping(value="/find/category", method = RequestMethod.GET)
    public List<MaxKitchenMrp> findByCategory(@RequestParam("category") String category) throws SQLException {
        return maxKitchenMrpDAL.findByCategory(category);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public MaxKitchenMrp findById(@PathVariable("id") Integer id) throws SQLException {
        return maxKitchenMrpDAL.findById(id);
    }
    
    @RequestMapping(method = RequestMethod.POST)
    public MaxKitchenMrp insert(@RequestBody MaxKitchenMrp maxKitchenMrp) {
        return maxKitchenMrpDAL.insert(maxKitchenMrp);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.POST)
    public MaxKitchenMrp update(@RequestBody MaxKitchenMrp maxKitchenMrp) {
        return maxKitchenMrpDAL.update(maxKitchenMrp);
    }

//    @RolesAllowed("ROLE_SUPER_ADMIN")
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable("id") Integer id) throws Exception {
        maxKitchenMrpDAL.delete(id);
    }

    @RequestMapping(value = "/find/description", method = RequestMethod.GET)
    public MaxKitchenMrp findByDescription(@RequestParam("description") String description) throws Exception {
        return maxKitchenMrpDAL.findByDescription(description);
    }
    
    @RequestMapping(value = "/find/description_like", method = RequestMethod.GET)
    public List<MaxKitchenMrp> findByDescriptionLike(@RequestParam("description") String description) {
        return maxKitchenMrpDAL.findByDescriptionLike(description);
    }
}
