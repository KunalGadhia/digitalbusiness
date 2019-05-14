/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.ratecontractdetail;

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
@RequestMapping("/rate_contract_detail")
public class RateContractDetailRest {

    @Autowired
    private RateContractDetailDAL rateContractDetailDAL;

    @RequestMapping(method = RequestMethod.GET)
    public List<RateContractDetail> findAll(@RequestParam(value = "offset", required = false, defaultValue = "0") Integer offset) throws SQLException {
        return rateContractDetailDAL.findAll(offset);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public RateContractDetail findById(@PathVariable("id") Integer id) throws SQLException {
        return rateContractDetailDAL.findById(id);
    }

    @RequestMapping(method = RequestMethod.POST)
    public RateContractDetail insert(@RequestBody RateContractDetail rateContractDetail) {
        return rateContractDetailDAL.insert(rateContractDetail);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.POST)
    public RateContractDetail update(@RequestBody RateContractDetail rateContractDetail) {
        return rateContractDetailDAL.update(rateContractDetail);
    }

//    @RolesAllowed("ROLE_SUPER_ADMIN")
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable("id") Integer id) throws Exception {
        rateContractDetailDAL.delete(id);
    }

    @RequestMapping(value = "/find/rate_contract_id", method = RequestMethod.GET)
    public List<RateContractDetail> findByRateContractId(@RequestParam("rateContractId") Integer rateContractId) throws Exception {
        return rateContractDetailDAL.findByRateContractId(rateContractId);
    }

    @RequestMapping(value = "/find/shutter/finish/material/thickness", method = RequestMethod.GET)
    public RateContractDetail findByShutterFinishMaterialThickness(@RequestParam("finish") String finish, @RequestParam(value = "material", required = false, defaultValue = "AL") String material, @RequestParam("thickness") Double thickness, @RequestParam("rateContractId") Integer rateContractId) throws Exception {
        return rateContractDetailDAL.findByShutterFinishMaterialThickness(finish, material, thickness, rateContractId);
    }

    @RequestMapping(value = "/find/panel/material/thickness", method = RequestMethod.GET)
    public RateContractDetail findByPanelMaterialThickness(@RequestParam("material") String material, @RequestParam("thickness") Double thickness, @RequestParam("rateContractId") Integer rateContractId) throws Exception {
        return rateContractDetailDAL.findByPanelMaterialThickness(material, thickness, rateContractId);
    }

    @RequestMapping(value = "/find/carcass/material/thickness", method = RequestMethod.GET)
    public RateContractDetail findByCarcassMaterialThickness(@RequestParam("material") String material, @RequestParam("thickness") Double thickness, @RequestParam("rateContractId") Integer rateContractId) throws Exception {
        return rateContractDetailDAL.findByCarcassMaterialThickness(material, thickness, rateContractId);
    }
//    
//    @RequestMapping(value = "/find/contract_name_like", method = RequestMethod.GET)
//    public List<RateContract> findByContractNameLike(@RequestParam("contractName") String contractName) {
//        return rateContractDetailDAL.findByContractNameLike(contractName);
//    }
}
