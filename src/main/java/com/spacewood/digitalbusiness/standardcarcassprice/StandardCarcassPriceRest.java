/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.standardcarcassprice;

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
@RequestMapping("/std_carcass_price")
public class StandardCarcassPriceRest {
    
    private final Logger logger = LoggerFactory.getLogger(getClass());
    @Autowired
    private StandardCarcassPriceDAL standardCarcassPriceDAL;

    @RequestMapping(method = RequestMethod.GET)
    public List<StandardCarcassPrice> findAll(@RequestParam(value = "offset", required = false, defaultValue = "0") Integer offset) throws SQLException {
        return standardCarcassPriceDAL.findAll(offset);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public StandardCarcassPrice findById(@PathVariable("id") Integer id) throws SQLException {
        return standardCarcassPriceDAL.findById(id);
    }

    @RequestMapping(method = RequestMethod.POST)
    public StandardCarcassPrice insert(@RequestBody StandardCarcassPrice standardCarcassPanel) {
        return standardCarcassPriceDAL.insert(standardCarcassPanel);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.POST)
    public StandardCarcassPrice update(@RequestBody StandardCarcassPrice standardCarcassPanel) {
        return standardCarcassPriceDAL.update(standardCarcassPanel);
    }

//    @RolesAllowed("ROLE_SUPER_ADMIN")
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable("id") Integer id) throws Exception {
        standardCarcassPriceDAL.delete(id);
    }

//    @RequestMapping(value = "/find/dimension_attribute", method = RequestMethod.GET)
//    public List<StandardCarcassDimension> findByDimensionAttribute(@RequestParam("dimensionAttribute") String dimensionAttribute) {
//        return standardCarcassPriceDAL.findByDimensionAttribute(dimensionAttribute);
//    }
//
//    @RequestMapping(value = "/find/carcass_category", method = RequestMethod.GET)
//    public List<StandardCarcassDimension> findByCarcassCategory(@RequestParam("carcassCategory") String carcassCategory) {
//        return standardCarcassPriceDAL.findByCarcassCategory(carcassCategory);
//    }
//
//    @RequestMapping(value = "/find/carcass_category/dimension_attribute", method = RequestMethod.GET)
//    public List<StandardCarcassDimension> findByCarcassCategoryDimensionAttribute(@RequestParam(value = "carcassCategory", required = false) String carcassCategory, @RequestParam(value = "dimensionAttribute", required = false) String dimensionAttribute) {
//        return standardCarcassPriceDAL.findByCarcassCategoryDimensionAttribute(carcassCategory, dimensionAttribute);
//    }

    @RequestMapping(value = "/find_all_list", method = RequestMethod.GET)
    public List<StandardCarcassPrice> findAllList() {
        return standardCarcassPriceDAL.findAllList();
    }
}
