/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.finishprice;

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
@RequestMapping("/finish_price")
public class FinishPriceRest {
   @Autowired
    private FinishPriceDAL finishPriceDAL;
    
    @RequestMapping(method = RequestMethod.GET)
    public List<FinishPrice> findAll(@RequestParam(value = "offset", required = false, defaultValue = "0") Integer offset) throws SQLException {
        return finishPriceDAL.findAll(offset);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public FinishPrice findById(@PathVariable("id") Integer id) throws SQLException {
        return finishPriceDAL.findById(id);
    }
    
    @RequestMapping(method = RequestMethod.POST)
    public FinishPrice insert(@RequestBody FinishPrice finishPrice) {
        return finishPriceDAL.insert(finishPrice);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.POST)
    public FinishPrice update(@RequestBody FinishPrice finishPrice) {
        return finishPriceDAL.update(finishPrice);
    }

//    @RolesAllowed("ROLE_SUPER_ADMIN")
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable("id") Integer id) throws Exception {
        finishPriceDAL.delete(id);
    }

    @RequestMapping(value = "/find/name", method = RequestMethod.GET)

    public FinishPrice findByName(@RequestParam("finishName") String finishName) throws Exception {
        return finishPriceDAL.findByName(finishName);
    }
    
    @RequestMapping(value = "/find/name_like", method = RequestMethod.GET)
    public List<FinishPrice> findByNameLike(@RequestParam("finishName") String finishName) {
        return finishPriceDAL.findByNameLike(finishName);
    }
    
    @RequestMapping(value = "/find/material_id", method = RequestMethod.GET)
    public List<FinishPrice> findByMaterialId(@RequestParam("materialId") Integer materialId) {
        return finishPriceDAL.findByMaterialId(materialId);
    }
    
    @RequestMapping(value = "/find/finish_code", method = RequestMethod.GET)
    public FinishPrice findByFinishCode(@RequestParam("finishCode") String finishCode) throws Exception {
        return finishPriceDAL.findByFinishCode(finishCode);
    }
    
}
