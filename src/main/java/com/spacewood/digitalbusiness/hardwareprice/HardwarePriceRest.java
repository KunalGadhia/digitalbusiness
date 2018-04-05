/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.hardwareprice;

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
@RequestMapping("/hardware_price")
public class HardwarePriceRest {
    @Autowired
    private HardwarePriceDAL hardwarePriceDAL;
    
    @RequestMapping(method = RequestMethod.GET)
    public List<HardwarePrice> findAll(@RequestParam(value = "offset", required = false, defaultValue = "0") Integer offset) throws SQLException {
        return hardwarePriceDAL.findAll(offset);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public HardwarePrice findById(@PathVariable("id") Integer id) throws SQLException {
        return hardwarePriceDAL.findById(id);
    }
    
    @RequestMapping(method = RequestMethod.POST)
    public HardwarePrice insert(@RequestBody HardwarePrice hardwarePrice) {
        return hardwarePriceDAL.insert(hardwarePrice);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.POST)
    public HardwarePrice update(@RequestBody HardwarePrice hardwarePrice) {
        return hardwarePriceDAL.update(hardwarePrice);
    }

//    @RolesAllowed("ROLE_SUPER_ADMIN")
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable("id") Integer id) throws Exception {
        hardwarePriceDAL.delete(id);
    }

    @RequestMapping(value = "/find/name", method = RequestMethod.GET)

    public HardwarePrice findByName(@RequestParam("name") String name) throws Exception {
        return hardwarePriceDAL.findByName(name);
    }
    
    @RequestMapping(value = "/find/name_like", method = RequestMethod.GET)
    public List<HardwarePrice> findByNameLike(@RequestParam("name") String name) {
        return hardwarePriceDAL.findByNameLike(name);
    }
}
