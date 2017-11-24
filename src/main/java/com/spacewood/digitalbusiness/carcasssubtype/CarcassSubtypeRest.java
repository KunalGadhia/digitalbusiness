/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.carcasssubtype;

import java.sql.SQLException;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
@RequestMapping("/carcass_subtype")
public class CarcassSubtypeRest {

    private final Logger logger = LoggerFactory.getLogger(getClass());
    @Autowired
    private CarcassSubtypeDAL carcassSubtypeDAL;

    @RequestMapping(method = RequestMethod.GET)
    public List<CarcassSubtype> findAll(@RequestParam(value = "offset", required = false, defaultValue = "0") Integer offset) throws SQLException {
        return carcassSubtypeDAL.findAll(offset);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public CarcassSubtype findById(@PathVariable("id") Integer id) throws SQLException {
        return carcassSubtypeDAL.findById(id);
    }

    @RequestMapping(method = RequestMethod.POST)
    public CarcassSubtype insert(@RequestBody CarcassSubtype carcassSubtype) {
        return carcassSubtypeDAL.insert(carcassSubtype);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.POST)
    public CarcassSubtype update(@RequestBody CarcassSubtype carcassSubtype) {
        return carcassSubtypeDAL.update(carcassSubtype);
    }

//    @RolesAllowed("ROLE_SUPER_ADMIN")
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable("id") Integer id) throws Exception {
        carcassSubtypeDAL.delete(id);
    }

    @RequestMapping(value = "/find/parent_type", method = RequestMethod.GET)
    public List<CarcassSubtype> findByParentType(@RequestParam("parentType") String parentType) throws Exception {
        return carcassSubtypeDAL.findByParentType(parentType);
    }

//    @RequestMapping(value = "/find/material_code", method = RequestMethod.GET)
//    public CarcassSubtype findByMaterialCode(@RequestParam("materialCode") String materialCode) throws Exception {
//        return carcassSubtypeDAL.findByMaterialCode(materialCode);
//    }

    @RequestMapping(value = "/find/subtype_like", method = RequestMethod.GET)
    public List<CarcassSubtype> findBySubTypeLike(@RequestParam("subtype") String subtype) {
        return carcassSubtypeDAL.findBySubTypeLike(subtype);
    }

    @RequestMapping(value = "/find_all_list", method = RequestMethod.GET)
    public List<CarcassSubtype> findAllList() {
        return carcassSubtypeDAL.findAllList();
    }
}
