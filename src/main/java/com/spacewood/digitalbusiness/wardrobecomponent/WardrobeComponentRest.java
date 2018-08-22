/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.wardrobecomponent;

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
@RequestMapping("/wardrobe_component")
public class WardrobeComponentRest {

    @Autowired
    private WardrobeComponentDAL wardrobeComponentDAL;

    @RequestMapping(method = RequestMethod.GET)
    public List<WardrobeComponent> findAll(@RequestParam(value = "offset", required = false, defaultValue = "0") Integer offset) throws SQLException {
        return wardrobeComponentDAL.findAll(offset);
    }

    @RequestMapping(value = "/find/category", method = RequestMethod.GET)
    public List<WardrobeComponent> findByCategory(@RequestParam("category") String category) throws SQLException {
        return wardrobeComponentDAL.findByCategory(category);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public WardrobeComponent findById(@PathVariable("id") Integer id) throws SQLException {
        return wardrobeComponentDAL.findById(id);
    }

    @RequestMapping(method = RequestMethod.POST)
    public WardrobeComponent insert(@RequestBody WardrobeComponent wardrobeComponent) {
        return wardrobeComponentDAL.insert(wardrobeComponent);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.POST)
    public WardrobeComponent update(@RequestBody WardrobeComponent wardrobeComponent) {
        return wardrobeComponentDAL.update(wardrobeComponent);
    }

//    @RolesAllowed("ROLE_SUPER_ADMIN")
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable("id") Integer id) throws Exception {
        wardrobeComponentDAL.delete(id);
    }

}
