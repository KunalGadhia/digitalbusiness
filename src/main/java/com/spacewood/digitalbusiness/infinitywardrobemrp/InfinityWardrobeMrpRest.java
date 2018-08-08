/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.infinitywardrobemrp;

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
@RequestMapping("/infinity_wardrobe_mrp")
public class InfinityWardrobeMrpRest {
    @Autowired
    private InfinityWardrobeMrpDAL infinityWardrobeMrpDAL;
    
    @RequestMapping(method = RequestMethod.GET)
    public List<InfinityWardrobeMrp> findAll(@RequestParam(value = "offset", required = false, defaultValue = "0") Integer offset) throws SQLException {
        return infinityWardrobeMrpDAL.findAll(offset);
    }
    
    @RequestMapping(value="/find/category", method = RequestMethod.GET)
    public List<InfinityWardrobeMrp> findByCategory(@RequestParam("category") String category) throws SQLException {
        return infinityWardrobeMrpDAL.findByCategory(category);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public InfinityWardrobeMrp findById(@PathVariable("id") Integer id) throws SQLException {
        return infinityWardrobeMrpDAL.findById(id);
    }
    
    @RequestMapping(method = RequestMethod.POST)
    public InfinityWardrobeMrp insert(@RequestBody InfinityWardrobeMrp infinityWardrobeMrp) {
        return infinityWardrobeMrpDAL.insert(infinityWardrobeMrp);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.POST)
    public InfinityWardrobeMrp update(@RequestBody InfinityWardrobeMrp infinityWardrobeMrp) {
        return infinityWardrobeMrpDAL.update(infinityWardrobeMrp);
    }

//    @RolesAllowed("ROLE_SUPER_ADMIN")
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable("id") Integer id) throws Exception {
        infinityWardrobeMrpDAL.delete(id);
    }

    @RequestMapping(value = "/find/description", method = RequestMethod.GET)
    public InfinityWardrobeMrp findByDescription(@RequestParam("description") String description) throws Exception {
        return infinityWardrobeMrpDAL.findByDescription(description);
    }
    
    @RequestMapping(value = "/find/description_like", method = RequestMethod.GET)
    public List<InfinityWardrobeMrp> findByDescriptionLike(@RequestParam("description") String description) {
        return infinityWardrobeMrpDAL.findByDescriptionLike(description);
    }
}
