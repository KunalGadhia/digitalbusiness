/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.drawercomponentmapping;

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
@RequestMapping("/drawer_component_mapping")
public class DrawerComponentMappingRest {
    @Autowired
    private DrawerComponentMappingDAL drawerComponentMappingDAL;

    @RequestMapping(method = RequestMethod.GET)
    public List<DrawerComponentMapping> findAll(@RequestParam(value = "offset", required = false, defaultValue = "0") Integer offset) throws SQLException {
        return drawerComponentMappingDAL.findAll(offset);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public DrawerComponentMapping findById(@PathVariable("id") Integer id) throws SQLException {

        return drawerComponentMappingDAL.findById(id);

    }
    
    @RequestMapping(value = "/find/finish_code", method = RequestMethod.GET)
    public DrawerComponentMapping findByFinishCode(@RequestParam("finishCode") String finishCode) throws Exception {
        return drawerComponentMappingDAL.findByFinishCode(finishCode);
    }
    
    @RequestMapping(method = RequestMethod.POST)
    public DrawerComponentMapping insert(@RequestBody DrawerComponentMapping drawerComponentMapping) throws JsonProcessingException, ParseException {
        return drawerComponentMappingDAL.insert(drawerComponentMapping);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.POST)
    public DrawerComponentMapping update(@RequestBody DrawerComponentMapping drawerComponentMapping) throws Exception {
        return drawerComponentMappingDAL.update(drawerComponentMapping);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable("id") Integer id) throws Exception {
        drawerComponentMappingDAL.delete(id);
    }
}
