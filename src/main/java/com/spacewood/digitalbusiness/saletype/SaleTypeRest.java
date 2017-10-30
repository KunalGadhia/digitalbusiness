/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.saletype;

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
@RequestMapping("/sale_type")
public class SaleTypeRest {
     @Autowired
    private SaleTypeDAL saleTypeDAL;
    
    @RequestMapping(method = RequestMethod.GET)
    public List<SaleType> findAll(@RequestParam(value = "offset", required = false, defaultValue = "0") Integer offset) throws SQLException {
        return saleTypeDAL.findAll(offset);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public SaleType findById(@PathVariable("id") Integer id) throws SQLException {
        return saleTypeDAL.findById(id);
    }
    
    @RequestMapping(method = RequestMethod.POST)
    public SaleType insert(@RequestBody SaleType saleType) {
        return saleTypeDAL.insert(saleType);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.POST)
    public SaleType update(@RequestBody SaleType saleType) {
        return saleTypeDAL.update(saleType);
    }

//    @RolesAllowed("ROLE_SUPER_ADMIN")
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable("id") Integer id) throws Exception {
        saleTypeDAL.delete(id);
    }

    @RequestMapping(value = "/find/saleType", method = RequestMethod.GET)
    public SaleType findBySegment(@RequestParam("saleType") String saleType) throws Exception {
        return saleTypeDAL.findBySegment(saleType);
    }
    
    @RequestMapping(value = "/find/saleTypeLike", method = RequestMethod.GET)
    public List<SaleType> findBySaleTypeLike(@RequestParam("saleType") String saleType) {
        return saleTypeDAL.findBySaleTypeLike(saleType);
    }
}
