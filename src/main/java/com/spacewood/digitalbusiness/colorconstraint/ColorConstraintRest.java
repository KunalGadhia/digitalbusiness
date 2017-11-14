/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.colorconstraint;

import com.fasterxml.jackson.core.JsonProcessingException;
import java.io.IOException;
import java.sql.SQLException;
import java.text.ParseException;
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
@RequestMapping("/color_constraint")
public class ColorConstraintRest {
    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private ColorConstraintDAL colorConstraintDAL;

//    @RequestMapping(value = "/current", method = RequestMethod.GET)
//    public org.springframework.security.core.locationdetails.Location getPrincipal(
//            @AuthenticationPrincipal org.springframework.security.core.locationdetails.Location location) {
//        return location;
//    }
    @RequestMapping(method = RequestMethod.GET)
    public List<ColorConstraint> findAll(@RequestParam(value = "offset", required = false, defaultValue = "0") Integer offset) {      
        return colorConstraintDAL.findAll(offset);
    }

    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public List<ColorConstraint> findAllColorConstraints() {
        return colorConstraintDAL.findAllColorConstraints();
    }

//    @RequestMapping(value = "/find/location_like", method = RequestMethod.GET)
//    public List<Location> findByNameLike(@RequestParam("name") String name) {
//        logger.info("Name in REST :" + name);
//        return colorConstraintDAL.findByNameLike(name);
//    }
//
//    @RequestMapping(value = "/export", method = RequestMethod.POST)
//    public Boolean exportExcelData() throws IOException {
//        logger.info("exportExcelData EXCEL DATA {}");
//        return locationservice.exportExcel();
//    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ColorConstraint findById(@PathVariable("id") Integer id) throws SQLException {
        return colorConstraintDAL.findById(id);

    }

//    @RequestMapping(value = "/find/name", method = RequestMethod.GET)
//    public List<Location> findByNameAndCityId(
//            @RequestParam("name") String name,
//            @RequestParam("cityId") Integer cityId) {
//        return colorConstraintDAL.findByNameAndCityId(name, cityId);
//    }

    @RequestMapping(method = RequestMethod.POST)
    public ColorConstraint insert(@RequestBody ColorConstraint colorConstraint) throws JsonProcessingException, ParseException {
        logger.info("location obj in rest {}", colorConstraint);
        return colorConstraintDAL.insert(colorConstraint);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.POST)
    public ColorConstraint update(@RequestBody ColorConstraint colorConstraint) throws Exception {
        return colorConstraintDAL.update(colorConstraint);
    }

//    @RolesAllowed("ROLE_SUPER_ADMIN")
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable("id") Integer id) throws Exception {
        colorConstraintDAL.delete(id);
    }
    
}
