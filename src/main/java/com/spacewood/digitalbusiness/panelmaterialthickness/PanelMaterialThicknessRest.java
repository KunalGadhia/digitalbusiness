/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.panelmaterialthickness;

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
@RequestMapping("/panel_material_thickness")
public class PanelMaterialThicknessRest {
    @Autowired
    private PanelMaterialThicknessDAL panelMaterialThicknessDAL;
    
    @RequestMapping(method = RequestMethod.GET)
    public List<PanelMaterialThickness> findAll(@RequestParam(value = "offset", required = false, defaultValue = "0") Integer offset) throws SQLException {
        return panelMaterialThicknessDAL.findAll(offset);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public PanelMaterialThickness findById(@PathVariable("id") Integer id) throws SQLException {
        return panelMaterialThicknessDAL.findById(id);
    }
    
    @RequestMapping(method = RequestMethod.POST)
    public PanelMaterialThickness insert(@RequestBody PanelMaterialThickness panelMaterialThickness) {
        return panelMaterialThicknessDAL.insert(panelMaterialThickness);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.POST)
    public PanelMaterialThickness update(@RequestBody PanelMaterialThickness panelMaterialThickness) {
        return panelMaterialThicknessDAL.update(panelMaterialThickness);
    }

//    @RolesAllowed("ROLE_SUPER_ADMIN")
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable("id") Integer id) throws Exception {
        panelMaterialThicknessDAL.delete(id);
    }
    
    @RequestMapping(value = "/find/material", method = RequestMethod.GET)
    public List<PanelMaterialThickness> findByMaterial(@RequestParam("material") String material) throws Exception {
        return panelMaterialThicknessDAL.findByMaterial(material);
    }
    
//    @RequestMapping(value = "/find/reason_like", method = RequestMethod.GET)
//    public List<Reason> findByReasonLike(@RequestParam("reason") String reason) {
//        return panelMaterialThicknessDAL.findByReasonLike(reason);
//    }
    
    @RequestMapping(value = "/find_all_list", method = RequestMethod.GET)
    public List<PanelMaterialThickness> findAllList() {
        return panelMaterialThicknessDAL.findAllList();
    }
}
