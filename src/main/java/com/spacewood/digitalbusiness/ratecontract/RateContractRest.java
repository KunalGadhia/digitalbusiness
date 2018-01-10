/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.ratecontract;

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
@RequestMapping("/rate_contract")
public class RateContractRest {
    @Autowired
    private RateContractDAL rateContractDAL;
    
    @RequestMapping(method = RequestMethod.GET)
    public List<RateContract> findAll(@RequestParam(value = "offset", required = false, defaultValue = "0") Integer offset) throws SQLException {
        return rateContractDAL.findAll(offset);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public RateContract findById(@PathVariable("id") Integer id) throws SQLException {
        return rateContractDAL.findById(id);
    }
    
    @RequestMapping(method = RequestMethod.POST)
    public RateContract insert(@RequestBody RateContract rateContract) {
        return rateContractDAL.insert(rateContract);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.POST)
    public RateContract update(@RequestBody RateContract rateContract) {
        return rateContractDAL.update(rateContract);
    }

//    @RolesAllowed("ROLE_SUPER_ADMIN")
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable("id") Integer id) throws Exception {
        rateContractDAL.delete(id);
    }

    @RequestMapping(value = "/find/contract", method = RequestMethod.GET)
    public RateContract findByContractName(@RequestParam("contractName") String contractName) throws Exception {
        return rateContractDAL.findByContractName(contractName);
    }
    
    @RequestMapping(value = "/find/contract_name_like", method = RequestMethod.GET)
    public List<RateContract> findByContractNameLike(@RequestParam("contractName") String contractName) {
        return rateContractDAL.findByContractNameLike(contractName);
    }
    
}
