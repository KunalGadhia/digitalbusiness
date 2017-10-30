/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.party;


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
@RequestMapping("/party")
public class PartyRest {
    
    @Autowired
    private PartyDAL partyDAL;
    
    @RequestMapping(method = RequestMethod.GET)
    public List<Party> findAll(@RequestParam(value = "offset", required = false, defaultValue = "0") Integer offset) throws SQLException {
        return partyDAL.findAll(offset);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Party findById(@PathVariable("id") Integer id) throws SQLException {
        return partyDAL.findById(id);
    }
    
    @RequestMapping(method = RequestMethod.POST)
    public Party insert(@RequestBody Party party) {
        return partyDAL.insert(party);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.POST)
    public Party update(@RequestBody Party party) {
        return partyDAL.update(party);
    }

//    @RolesAllowed("ROLE_SUPER_ADMIN")
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable("id") Integer id) throws Exception {
        partyDAL.delete(id);
    }

    @RequestMapping(value = "/find/name", method = RequestMethod.GET)

    public Party findByName(@RequestParam("name") String name) throws Exception {
        return partyDAL.findByName(name);
    }
    
    @RequestMapping(value = "/find/user_like", method = RequestMethod.GET)
    public List<Party> findByNameLike(@RequestParam("name") String name) {
        return partyDAL.findByNameLike(name);
    }
        
}
