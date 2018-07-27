/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.maxbeds;

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
@RequestMapping("/max_beds")
public class MaxBedsRest {

    @Autowired
    private MaxBedsDAL maxBedsDAL;

    @RequestMapping(method = RequestMethod.GET)
    public List<MaxBeds> findAll(@RequestParam(value = "offset", required = false, defaultValue = "0") Integer offset) throws SQLException {
        return maxBedsDAL.findAll(offset);
    }

    @RequestMapping(value = "/find/category", method = RequestMethod.GET)
    public List<MaxBeds> findByCategory(@RequestParam("category") String category) throws SQLException {
        return maxBedsDAL.findByCategory(category);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public MaxBeds findById(@PathVariable("id") Integer id) throws SQLException {
        return maxBedsDAL.findById(id);
    }

    @RequestMapping(method = RequestMethod.POST)
    public MaxBeds insert(@RequestBody MaxBeds maxBeds) {
        return maxBedsDAL.insert(maxBeds);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.POST)
    public MaxBeds update(@RequestBody MaxBeds maxBeds) {
        return maxBedsDAL.update(maxBeds);
    }

//    @RolesAllowed("ROLE_SUPER_ADMIN")
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable("id") Integer id) throws Exception {
        maxBedsDAL.delete(id);
    }

    @RequestMapping(value = "/find/description", method = RequestMethod.GET)
    public MaxBeds findByDescription(@RequestParam("description") String description) throws Exception {
        return maxBedsDAL.findByDescription(description);
    }

    @RequestMapping(value = "/find/description_like", method = RequestMethod.GET)
    public List<MaxBeds> findByDescriptionLike(@RequestParam("description") String description) {
        return maxBedsDAL.findByDescriptionLike(description);
    }
}
