/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.drawerhandlemapping;

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
@RequestMapping("/drawer_handle_mapping")
public class DrawerHandleMappingRest {
    
    @Autowired
    private DrawerHandleMappingDAL drawerHandleMappingDAL;    

    @RequestMapping(method = RequestMethod.GET)
    public List<DrawerHandleMapping> findAll(@RequestParam(value = "offset", required = false, defaultValue = "0") Integer offset) throws SQLException {
        return drawerHandleMappingDAL.findAll(offset);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public DrawerHandleMapping findById(@PathVariable("id") Integer id) throws SQLException {

        return drawerHandleMappingDAL.findById(id);

    }
    
    @RequestMapping(value = "/find/drawer_code", method = RequestMethod.GET)
    public DrawerHandleMapping findByDrawerCode(@RequestParam("drawerCode") String drawerCode) throws Exception {
        return drawerHandleMappingDAL.findByDrawerCode(drawerCode);
    }
    
    @RequestMapping(value = "/find/finish_code", method = RequestMethod.GET)
    public DrawerHandleMapping findByFinishCode(@RequestParam("finishCode") String finishCode) throws Exception {
        return drawerHandleMappingDAL.findByFinishCode(finishCode);
    }
    
    @RequestMapping(method = RequestMethod.POST)
    public DrawerHandleMapping insert(@RequestBody DrawerHandleMapping drawerHandleMapping) throws JsonProcessingException, ParseException {
        return drawerHandleMappingDAL.insert(drawerHandleMapping);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.POST)
    public DrawerHandleMapping update(@RequestBody DrawerHandleMapping drawerHandleMapping) throws Exception {
        return drawerHandleMappingDAL.update(drawerHandleMapping);
    }

//    @RolesAllowed("ROLE_SUPER_ADMIN")
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable("id") Integer id) throws Exception {
        drawerHandleMappingDAL.delete(id);
    }   
    
}
