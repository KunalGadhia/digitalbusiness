/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.fillerfinishprice;

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
@RequestMapping("/filler_finish_price")
public class FillerFinishPriceRest {
    private final Logger logger = LoggerFactory.getLogger(getClass());
    
    @Autowired
    private FillerFinishPriceDAL fillerFinishPriceDAL;

    @RequestMapping(method = RequestMethod.GET)
    public List<FillerFinishPrice> findAll(@RequestParam(value = "offset", required = false, defaultValue = "0") Integer offset) throws SQLException {
        return fillerFinishPriceDAL.findAll(offset);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public FillerFinishPrice findById(@PathVariable("id") Integer id) throws SQLException {
        return fillerFinishPriceDAL.findById(id);
    }

    @RequestMapping(method = RequestMethod.POST)
    public FillerFinishPrice insert(@RequestBody FillerFinishPrice fillerFinishPrice) {
        return fillerFinishPriceDAL.insert(fillerFinishPrice);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.POST)
    public FillerFinishPrice update(@RequestBody FillerFinishPrice fillerFinishPrice) {
        return fillerFinishPriceDAL.update(fillerFinishPrice);
    }

//  @RolesAllowed("ROLE_SUPER_ADMIN")
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable("id") Integer id) throws Exception {
        fillerFinishPriceDAL.delete(id);
    }

    @RequestMapping(value = "/find/finish/thickness", method = RequestMethod.GET)
    public FillerFinishPrice findByFinishThickness(@RequestParam("finish") String finish, @RequestParam("thickness") Double thickness) throws Exception {
        return fillerFinishPriceDAL.findByFinishThickness(finish, thickness);
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
    public List<FillerFinishPrice> findAllList() {
        return fillerFinishPriceDAL.findAllList();
    }
    
    @RequestMapping(value = "/find_by_finish", method = RequestMethod.GET)
    public List<FillerFinishPrice> findByFinish(@RequestParam("finish") String finish) {
        return fillerFinishPriceDAL.findByFinish(finish);
    }
    
    @RequestMapping(value = "/find_unique_finish", method = RequestMethod.GET)
    public List<String> findUniqueFinish() {
        return fillerFinishPriceDAL.findUniqueFinish();
    }
}
