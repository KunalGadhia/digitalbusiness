/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.maxwardrobemrp;

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
@RequestMapping("/max_wardrobe_mrp")
public class MaxWardrobeMrpRest {
    @Autowired
    private MaxWardrobeMrpDAL maxWardrobeMrpDAL;
    
    @RequestMapping(method = RequestMethod.GET)
    public List<MaxWardrobeMrp> findAll(@RequestParam(value = "offset", required = false, defaultValue = "0") Integer offset) throws SQLException {
        return maxWardrobeMrpDAL.findAll(offset);
    }
    
    @RequestMapping(value="/find/category", method = RequestMethod.GET)
    public List<MaxWardrobeMrp> findByCategory(@RequestParam("category") String category) throws SQLException {
        return maxWardrobeMrpDAL.findByCategory(category);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public MaxWardrobeMrp findById(@PathVariable("id") Integer id) throws SQLException {
        return maxWardrobeMrpDAL.findById(id);
    }
    
    @RequestMapping(method = RequestMethod.POST)
    public MaxWardrobeMrp insert(@RequestBody MaxWardrobeMrp maxWardrobeMrp) {
        return maxWardrobeMrpDAL.insert(maxWardrobeMrp);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.POST)
    public MaxWardrobeMrp update(@RequestBody MaxWardrobeMrp maxWardrobeMrp) {
        return maxWardrobeMrpDAL.update(maxWardrobeMrp);
    }

//    @RolesAllowed("ROLE_SUPER_ADMIN")
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable("id") Integer id) throws Exception {
        maxWardrobeMrpDAL.delete(id);
    }

    @RequestMapping(value = "/find/description", method = RequestMethod.GET)
    public MaxWardrobeMrp findByDescription(@RequestParam("description") String description) throws Exception {
        return maxWardrobeMrpDAL.findByDescription(description);
    }
    
    @RequestMapping(value = "/find/description_like", method = RequestMethod.GET)
    public List<MaxWardrobeMrp> findByDescriptionLike(@RequestParam("description") String description) {
        return maxWardrobeMrpDAL.findByDescriptionLike(description);
    }
}
