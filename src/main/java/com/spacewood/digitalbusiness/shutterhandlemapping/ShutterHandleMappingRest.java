/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.shutterhandlemapping;

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
@RequestMapping("/shutter_handle_mapping")
public class ShutterHandleMappingRest {
    
    @Autowired
    private ShutterHandleMappingDAL shutterHandleMappingDAL;    

    @RequestMapping(method = RequestMethod.GET)
    public List<ShutterHandleMapping> findAll(@RequestParam(value = "offset", required = false, defaultValue = "0") Integer offset) throws SQLException {
        return shutterHandleMappingDAL.findAll(offset);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ShutterHandleMapping findById(@PathVariable("id") Integer id) throws SQLException {

        return shutterHandleMappingDAL.findById(id);

    }
    
    @RequestMapping(value = "/find/shutter_code", method = RequestMethod.GET)
    public ShutterHandleMapping findByShutterCode(@RequestParam("shutterCode") String shutterCode) throws Exception {
        return shutterHandleMappingDAL.findByShutterCode(shutterCode);
    }
    
    @RequestMapping(value = "/find/finish_code", method = RequestMethod.GET)
    public ShutterHandleMapping findByFinishCode(@RequestParam("finishCode") String finishCode) throws Exception {
        return shutterHandleMappingDAL.findByFinishCode(finishCode);
    }
    
    @RequestMapping(method = RequestMethod.POST)
    public ShutterHandleMapping insert(@RequestBody ShutterHandleMapping shutterHandleMapping) throws JsonProcessingException, ParseException {
        return shutterHandleMappingDAL.insert(shutterHandleMapping);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.POST)
    public ShutterHandleMapping update(@RequestBody ShutterHandleMapping shutterHandleMapping) throws Exception {
        return shutterHandleMappingDAL.update(shutterHandleMapping);
    }

//    @RolesAllowed("ROLE_SUPER_ADMIN")
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable("id") Integer id) throws Exception {
        shutterHandleMappingDAL.delete(id);
    }   
            
}
