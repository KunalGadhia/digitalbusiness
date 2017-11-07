/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.rawmaterial;

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
@RequestMapping("/raw_material")
public class RawMaterialRest {
    private final Logger logger = LoggerFactory.getLogger(getClass());
    @Autowired
    private RawMaterialDAL rawMaterialDAL;        
    
    @RequestMapping(method = RequestMethod.GET)
    public List<RawMaterial> findAll(@RequestParam(value = "offset", required = false, defaultValue = "0") Integer offset) throws SQLException {
        return rawMaterialDAL.findAll(offset);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public RawMaterial findById(@PathVariable("id") Integer id) throws SQLException {
        return rawMaterialDAL.findById(id);
    }
    
    @RequestMapping(method = RequestMethod.POST)
    public RawMaterial insert(@RequestBody RawMaterial rawMaterial) {
        return rawMaterialDAL.insert(rawMaterial);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.POST)
    public RawMaterial update(@RequestBody RawMaterial rawMaterial) {
        return rawMaterialDAL.update(rawMaterial);
    }

//    @RolesAllowed("ROLE_SUPER_ADMIN")
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable("id") Integer id) throws Exception {
        rawMaterialDAL.delete(id);
    }
    
    @RequestMapping(value = "/find/material", method = RequestMethod.GET)
    public RawMaterial findByMaterial(@RequestParam("material") String material) throws Exception {
        return rawMaterialDAL.findByMaterial(material);
    }
    
    @RequestMapping(value = "/find/material_code", method = RequestMethod.GET)
    public RawMaterial findByMaterialCode(@RequestParam("materialCode") String materialCode) throws Exception {
        return rawMaterialDAL.findByMaterialCode(materialCode);
    }
    
    @RequestMapping(value = "/find/material_like", method = RequestMethod.GET)
    public List<RawMaterial> findByMaterialLike(@RequestParam("material") String material) {
        return rawMaterialDAL.findByMaterialLike(material);
    }       
    
    @RequestMapping(value = "/find_all_list", method = RequestMethod.GET)
    public List<RawMaterial> findAllList() {
        return rawMaterialDAL.findAllList();
    }
}
