/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.infinitywardrobe;

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
@RequestMapping("/infinity_wardrobe")
public class InfinityWardrobeRest {
    @Autowired
    private InfinityWardrobeDAL infinityWardrobeDAL;
    
    @RequestMapping(method = RequestMethod.GET)
    public List<InfinityWardrobe> findAll(@RequestParam(value = "offset", required = false, defaultValue = "0") Integer offset) throws SQLException {
        return infinityWardrobeDAL.findAll(offset);
    }
    
    @RequestMapping(value="/find/category", method = RequestMethod.GET)
    public List<InfinityWardrobe> findByCategory(@RequestParam("category") String category) throws SQLException {
        return infinityWardrobeDAL.findByCategory(category);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public InfinityWardrobe findById(@PathVariable("id") Integer id) throws SQLException {
        return infinityWardrobeDAL.findById(id);
    }
    
    @RequestMapping(method = RequestMethod.POST)
    public InfinityWardrobe insert(@RequestBody InfinityWardrobe infinityWardrobe) {
        return infinityWardrobeDAL.insert(infinityWardrobe);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.POST)
    public InfinityWardrobe update(@RequestBody InfinityWardrobe infinityWardrobe) {
        return infinityWardrobeDAL.update(infinityWardrobe);
    }

//    @RolesAllowed("ROLE_SUPER_ADMIN")
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable("id") Integer id) throws Exception {
        infinityWardrobeDAL.delete(id);
    }

    @RequestMapping(value = "/find/description", method = RequestMethod.GET)
    public InfinityWardrobe findByDescription(@RequestParam("description") String description) throws Exception {
        return infinityWardrobeDAL.findByDescription(description);
    }
    
    @RequestMapping(value = "/find/description_like", method = RequestMethod.GET)
    public List<InfinityWardrobe> findByDescriptionLike(@RequestParam("description") String description) {
        return infinityWardrobeDAL.findByDescriptionLike(description);
    }
}
