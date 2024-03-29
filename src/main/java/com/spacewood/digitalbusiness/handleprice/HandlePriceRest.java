/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.handleprice;

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
@RequestMapping("/handle_price")
public class HandlePriceRest {
    private final Logger logger = LoggerFactory.getLogger(getClass());
    
    @Autowired
    private HandlePriceDAL handlePriceDAL;

    @RequestMapping(method = RequestMethod.GET)
    public List<HandlePrice> findAll(@RequestParam(value = "offset", required = false, defaultValue = "0") Integer offset) throws SQLException {
        return handlePriceDAL.findAll(offset);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public HandlePrice findById(@PathVariable("id") Integer id) throws SQLException {
        return handlePriceDAL.findById(id);
    }

    @RequestMapping(method = RequestMethod.POST)
    public HandlePrice insert(@RequestBody HandlePrice handlePrice) {
        return handlePriceDAL.insert(handlePrice);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.POST)
    public HandlePrice update(@RequestBody HandlePrice handlePrice) {
        return handlePriceDAL.update(handlePrice);
    }

//    @RolesAllowed("ROLE_SUPER_ADMIN")
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable("id") Integer id) throws Exception {
        handlePriceDAL.delete(id);
    }

    @RequestMapping(value = "/find/kitchen_component", method = RequestMethod.GET)
    public List<HandlePrice> findByKitchenComponent(@RequestParam("kitchenComponent") String kitchenComponent) throws Exception {
        return handlePriceDAL.findByKitchenComponent(kitchenComponent);
    }

//    @RequestMapping(value = "/find/material_code", method = RequestMethod.GET)
//    public CarcassSubtype findByMaterialCode(@RequestParam("materialCode") String materialCode) throws Exception {
//        return carcassSubtypeDAL.findByMaterialCode(materialCode);
//    }

//    @RequestMapping(value = "/find/subtype_like", method = RequestMethod.GET)
//    public List<CarcassSubtype> findBySubTypeLike(@RequestParam("subtype") String subtype) {
//        return handlePriceDAL.findBySubTypeLike(subtype);
//    }

    @RequestMapping(value = "/find_all_list", method = RequestMethod.GET)
    public List<HandlePrice> findAllList() {
        return handlePriceDAL.findAllList();
    }
}
