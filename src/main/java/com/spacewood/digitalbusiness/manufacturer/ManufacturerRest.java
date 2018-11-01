/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.manufacturer;

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
@RequestMapping("/manufacturer")
public class ManufacturerRest {

    private final Logger logger = LoggerFactory.getLogger(getClass());

    @Autowired
    private ManufacturerDAL manufacturerDAL;

    @RequestMapping(method = RequestMethod.GET)
    public List<Manufacturer> findAll(@RequestParam(value = "offset", required = false, defaultValue = "0") Integer offset) throws SQLException {
        return manufacturerDAL.findAll(offset);
    }

    @RequestMapping(value = "/find/creator", method = RequestMethod.GET)
    public List<Manufacturer> findByCreator(@RequestParam(value = "userId") Integer userId, @RequestParam(value = "offset", required = false, defaultValue = "0") Integer offset) throws SQLException {
        return manufacturerDAL.findByCreator(userId, offset);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Manufacturer findById(@PathVariable("id") Integer id) throws SQLException {
        return manufacturerDAL.findById(id);
    }

    @RequestMapping(method = RequestMethod.POST)
    public Manufacturer insert(@RequestBody Manufacturer manufacturer) {
        return manufacturerDAL.insert(manufacturer);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.POST)
    public Manufacturer update(@RequestBody Manufacturer manufacturer) {
        return manufacturerDAL.update(manufacturer);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable("id") Integer id) throws Exception {
        manufacturerDAL.delete(id);
    }

    @RequestMapping(value = "/find/manufacturer_code", method = RequestMethod.GET)
    public Manufacturer findByManufacturerCode(@RequestParam("manufacturerCode") String manufacturerCode) throws Exception {
        return manufacturerDAL.findByManufacturerCode(manufacturerCode);
    }
    
    @RequestMapping(value = "/find/manufacturer_code/creator", method = RequestMethod.GET)
    public Manufacturer findByManufacturerCodeByCreator(@RequestParam("manufacturerCode") String manufacturerCode, @RequestParam("createdBy") Integer createdBy) throws Exception {
        return manufacturerDAL.findByManufacturerCodeByCreator(manufacturerCode, createdBy);
    }

    @RequestMapping(value = "/find/manufacturer_like", method = RequestMethod.GET)
    public List<Manufacturer> findByManufacturerNameLike(@RequestParam("manufacturerName") String manufacturerName) {
        return manufacturerDAL.findByManufacturerNameLike(manufacturerName);
    }

    @RequestMapping(value = "/find/manufacturer_like/creator", method = RequestMethod.GET)
    public List<Manufacturer> findByManufacturerNameLikeByCreator(@RequestParam("createdBy") Integer createdBy, @RequestParam("manufacturerName") String manufacturerName) {
        return manufacturerDAL.findByManufacturerNameLikeByCreator(createdBy, manufacturerName);
    }

    @RequestMapping(value = "/find_all_list", method = RequestMethod.GET)
    public List<Manufacturer> findAllList() {
        return manufacturerDAL.findAllList();
    }
}
