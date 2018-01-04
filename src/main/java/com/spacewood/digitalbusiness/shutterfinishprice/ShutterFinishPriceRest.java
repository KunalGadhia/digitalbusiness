/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.shutterfinishprice;

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
@RequestMapping("/shutter_finish_price")
public class ShutterFinishPriceRest {
    
    private final Logger logger = LoggerFactory.getLogger(getClass());
    
    @Autowired
    private ShutterFinishPriceDAL shutterFinishPriceDAL;

    @RequestMapping(method = RequestMethod.GET)
    public List<ShutterFinishPrice> findAll(@RequestParam(value = "offset", required = false, defaultValue = "0") Integer offset) throws SQLException {
        return shutterFinishPriceDAL.findAll(offset);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ShutterFinishPrice findById(@PathVariable("id") Integer id) throws SQLException {
        return shutterFinishPriceDAL.findById(id);
    }

    @RequestMapping(method = RequestMethod.POST)
    public ShutterFinishPrice insert(@RequestBody ShutterFinishPrice shutterFinishPrice) {
        return shutterFinishPriceDAL.insert(shutterFinishPrice);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.POST)
    public ShutterFinishPrice update(@RequestBody ShutterFinishPrice shutterFinishPrice) {
        return shutterFinishPriceDAL.update(shutterFinishPrice);
    }

//  @RolesAllowed("ROLE_SUPER_ADMIN")
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable("id") Integer id) throws Exception {
        shutterFinishPriceDAL.delete(id);
    }

    @RequestMapping(value = "/find/finish/thickness", method = RequestMethod.GET)
    public ShutterFinishPrice findByFinishThickness(@RequestParam("finish") String finish, @RequestParam("thickness") Double thickness) throws Exception {
        return shutterFinishPriceDAL.findByFinishThickness(finish, thickness);
    }

//    @RequestMapping(value = "/find/material_code", method = RequestMethod.GET)
//    public CarcassSubtype findByMaterialCode(@RequestParam("materialCode") String materialCode) throws Exception {
//        return carcassSubtypeDAL.findByMaterialCode(materialCode);
//    }

//    @RequestMapping(value = "/find/subtype_like", method = RequestMethod.GET)
//    public List<CarcassSubtype> findBySubTypeLike(@RequestParam("subtype") String subtype) {
//        return shutterFinishPriceDAL.findBySubTypeLike(subtype);
//    }

    @RequestMapping(value = "/find_all_list", method = RequestMethod.GET)
    public List<ShutterFinishPrice> findAllList() {
        return shutterFinishPriceDAL.findAllList();
    }
    
    @RequestMapping(value = "/find_by_finish", method = RequestMethod.GET)
    public List<ShutterFinishPrice> findByFinish(@RequestParam("finish") String finish) {
        return shutterFinishPriceDAL.findByFinish(finish);
    }
    
    @RequestMapping(value = "/find_unique_finish", method = RequestMethod.GET)
    public List<String> findUniqueFinish() {
        return shutterFinishPriceDAL.findUniqueFinish();
    }
    
    @RequestMapping(value = "/find_unique_finish/finish_category", method = RequestMethod.GET)
    public List<String> findUniqueFinishWithCategory(@RequestParam("finishCategory") String finishCategory) {
        return shutterFinishPriceDAL.findUniqueFinishWithCategory(finishCategory);
    }
    
}
