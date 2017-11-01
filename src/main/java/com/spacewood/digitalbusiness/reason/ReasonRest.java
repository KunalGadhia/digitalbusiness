/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.reason;

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
@RequestMapping("/reason")
public class ReasonRest {
    @Autowired
    private ReasonDAL reasonDAL;
    
    @RequestMapping(method = RequestMethod.GET)
    public List<Reason> findAll(@RequestParam(value = "offset", required = false, defaultValue = "0") Integer offset) throws SQLException {
        return reasonDAL.findAll(offset);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Reason findById(@PathVariable("id") Integer id) throws SQLException {
        return reasonDAL.findById(id);
    }
    
    @RequestMapping(method = RequestMethod.POST)
    public Reason insert(@RequestBody Reason reason) {
        return reasonDAL.insert(reason);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.POST)
    public Reason update(@RequestBody Reason reason) {
        return reasonDAL.update(reason);
    }

//    @RolesAllowed("ROLE_SUPER_ADMIN")
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable("id") Integer id) throws Exception {
        reasonDAL.delete(id);
    }
    
    @RequestMapping(value = "/find/reason", method = RequestMethod.GET)
    public Reason findByReason(@RequestParam("reason") String reason) throws Exception {
        return reasonDAL.findByReason(reason);
    }
    
    @RequestMapping(value = "/find/reason_like", method = RequestMethod.GET)
    public List<Reason> findByReasonLike(@RequestParam("reason") String reason) {
        return reasonDAL.findByReasonLike(reason);
    }
    
    @RequestMapping(value = "/find_all_list", method = RequestMethod.GET)
    public List<Reason> findAllList() {
        return reasonDAL.findAllList();
    }
}
