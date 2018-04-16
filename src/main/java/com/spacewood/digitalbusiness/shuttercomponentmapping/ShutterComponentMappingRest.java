/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.shuttercomponentmapping;

import com.fasterxml.jackson.core.JsonProcessingException;
import java.sql.SQLException;
import java.text.ParseException;
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
@RequestMapping("/shutter_component_mapping")
public class ShutterComponentMappingRest {
    @Autowired
    private ShutterComponentMappingDAL shutterComponentMappingDAL;

    @RequestMapping(method = RequestMethod.GET)
    public List<ShutterComponentMapping> findAll(@RequestParam(value = "offset", required = false, defaultValue = "0") Integer offset) throws SQLException {
        return shutterComponentMappingDAL.findAll(offset);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ShutterComponentMapping findById(@PathVariable("id") Integer id) throws SQLException {

        return shutterComponentMappingDAL.findById(id);

    }
    
//    @RequestMapping(value = "/find/shutter_code", method = RequestMethod.GET)
//    public ShutterHandleMapping findByShutterCode(@RequestParam("shutterCode") String shutterCode) throws Exception {
//        return shutterComponentMappingDAL.findByShutterCode(shutterCode);
//    }
//    
    @RequestMapping(value = "/find/finish_code", method = RequestMethod.GET)
    public ShutterComponentMapping findByFinishCode(@RequestParam("finishCode") String finishCode) throws Exception {
        return shutterComponentMappingDAL.findByFinishCode(finishCode);
    }
    
    @RequestMapping(method = RequestMethod.POST)
    public ShutterComponentMapping insert(@RequestBody ShutterComponentMapping shutterComponentMapping) throws JsonProcessingException, ParseException {
        return shutterComponentMappingDAL.insert(shutterComponentMapping);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.POST)
    public ShutterComponentMapping update(@RequestBody ShutterComponentMapping shutterComponentMapping) throws Exception {
        return shutterComponentMappingDAL.update(shutterComponentMapping);
    }

//    @RolesAllowed("ROLE_SUPER_ADMIN")
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable("id") Integer id) throws Exception {
        shutterComponentMappingDAL.delete(id);
    }
}
