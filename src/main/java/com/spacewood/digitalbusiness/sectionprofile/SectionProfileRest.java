/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.sectionprofile;

import java.sql.SQLException;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
@RequestMapping("/section_profile")
public class SectionProfileRest {

    private final Logger logger = LoggerFactory.getLogger(getClass());
    @Autowired
    private SectionProfileDAL sectionProfileDAL;

    @RequestMapping(method = RequestMethod.GET)
    public List<SectionProfile> findAll(@RequestParam(value = "offset", required = false, defaultValue = "0") Integer offset) throws SQLException {
        return sectionProfileDAL.findAll(offset);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public SectionProfile findById(@PathVariable("id") Integer id) throws SQLException {
        return sectionProfileDAL.findById(id);
    }

    @RequestMapping(method = RequestMethod.POST)
    public SectionProfile insert(@RequestBody SectionProfile sectionProfile) {
        return sectionProfileDAL.insert(sectionProfile);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.POST)
    public SectionProfile update(@RequestBody SectionProfile sectionProfile) {
        return sectionProfileDAL.update(sectionProfile);
    }

//    @RolesAllowed("ROLE_SUPER_ADMIN")
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable("id") Integer id) throws Exception {
        sectionProfileDAL.delete(id);
    }

    @RequestMapping(value = "/find/name", method = RequestMethod.GET)
    public SectionProfile findByName(@RequestParam("name") String name) throws Exception {
        return sectionProfileDAL.findByName(name);
    }
//
//    @RequestMapping(value = "/find/color_code", method = RequestMethod.GET)
//    public Color findByColorCode(@RequestParam("colorCode") String colorCode) throws Exception {
//        return sectionProfileDAL.findByColorCode(colorCode);
//    }
//
//    @RequestMapping(value = "/find/color_like", method = RequestMethod.GET)
//    public List<Color> findByColorLike(@RequestParam("color") String color) {
//        return sectionProfileDAL.findByColorLike(color);
//    }
    @RequestMapping(value = "/find/carcass_type", method = RequestMethod.GET)
    public List<SectionProfile> findByCarassType(@RequestParam("carcassType") String carcassType) {
        return sectionProfileDAL.findByCarassType(carcassType);
    }

    @RequestMapping(value = "/find_all_list", method = RequestMethod.GET)
    public List<SectionProfile> findAllList() {
        return sectionProfileDAL.findAllList();
    }

}
