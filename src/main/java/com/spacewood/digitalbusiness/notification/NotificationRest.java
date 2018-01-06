/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.notification;

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
@RequestMapping("/notification")
public class NotificationRest {
   @Autowired
    private NotificationDAL notificationDAL;
    
    @RequestMapping(method = RequestMethod.GET)
    public List<Notification> findAll(@RequestParam(value = "offset", required = false, defaultValue = "0") Integer offset) throws SQLException {
        return notificationDAL.findAll(offset);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Notification findById(@PathVariable("id") Integer id) throws SQLException {
        return notificationDAL.findById(id);
    }
    
    @RequestMapping(method = RequestMethod.POST)
    public Notification insert(@RequestBody Notification notification) {
        return notificationDAL.insert(notification);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.POST)
    public Notification update(@RequestBody Notification notification) {
        return notificationDAL.update(notification);
    }

//    @RolesAllowed("ROLE_SUPER_ADMIN")
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable("id") Integer id) throws Exception {
        notificationDAL.delete(id);
    }

//    @RequestMapping(value = "/find/name", method = RequestMethod.GET)
//
//    public Employee findByName(@RequestParam("name") String name) throws Exception {
//        return notificationDAL.findByName(name);
//    }
    
    @RequestMapping(value = "/find_all_list", method = RequestMethod.GET)
    public List<Notification> findAllList() {
        return notificationDAL.findAllList();
    } 
}
