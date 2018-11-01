/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.manufacturercategory;

import com.fasterxml.jackson.core.JsonProcessingException;
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
@RequestMapping("/manufacturer_category")
public class ManufacturerCategoryRest {
    @Autowired
    private ManufacturerCategoryDAL manufacturerCategoryDAL;

    @RequestMapping(method = RequestMethod.GET)
    public List<ManufacturerCategory> findAll(@RequestParam(value = "offset", required = false, defaultValue = "0") Integer offset) throws SQLException {
        return manufacturerCategoryDAL.findAll(offset);
    }
    
    @RequestMapping(value = "/find/creator", method = RequestMethod.GET)
    public List<ManufacturerCategory> findByCreator(@RequestParam(value = "userId") Integer userId, @RequestParam(value = "offset", required = false, defaultValue = "0") Integer offset) throws SQLException {
        return manufacturerCategoryDAL.findByCreator(userId, offset);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ManufacturerCategory findById(@PathVariable("id") Integer id) throws SQLException {
        return manufacturerCategoryDAL.findById(id);
    }

    @RequestMapping(method = RequestMethod.POST)
    public ManufacturerCategory insert(@RequestBody ManufacturerCategory manufacturerCategory) throws JsonProcessingException {
        return manufacturerCategoryDAL.insert(manufacturerCategory);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.POST)
    public ManufacturerCategory update(@RequestBody ManufacturerCategory manufacturerCategory) throws JsonProcessingException {
        return manufacturerCategoryDAL.update(manufacturerCategory);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable("id") Integer id) throws Exception {
        manufacturerCategoryDAL.delete(id);
    }

//    @RequestMapping(value = "/find/manufacturer_code", method = RequestMethod.GET)
//    public List<ManufacturerCategory> findByManufacturerCode(@RequestParam("manufacturerCode") String manufacturerCode) throws Exception {
//        return manufacturerCategoryDAL.findByManufacturerCode(manufacturerCode);
//    }
    
    @RequestMapping(value = "/find/category_code", method = RequestMethod.GET)
    public ManufacturerCategory findByCategoryCode(@RequestParam("categoryCode") String categoryCode) throws Exception {
        return manufacturerCategoryDAL.findByCategoryCode(categoryCode);
    }
    
    @RequestMapping(value = "/find/category_code/creator", method = RequestMethod.GET)
    public ManufacturerCategory findByCategoryCodeByCreator(@RequestParam("categoryCode") String categoryCode, @RequestParam("createdBy") Integer createdBy) throws Exception {
        return manufacturerCategoryDAL.findByCategoryCodeByCreator(categoryCode, createdBy);
    }

    @RequestMapping(value = "/find/manufacturer_category_like", method = RequestMethod.GET)
    public List<ManufacturerCategory> findByManufacturerCategoryLike(@RequestParam("manufacturerCategory") String manufacturerCategory) {
        return manufacturerCategoryDAL.findByManufacturerCategoryLike(manufacturerCategory);
    }
    
    @RequestMapping(value = "/find/manufacturer_category_like/creator", method = RequestMethod.GET)
    public List<ManufacturerCategory> findByManufacturerCategoryLikeByCreator(@RequestParam("createdBy") Integer createdBy, @RequestParam("manufacturerCategory") String manufacturerCategory) {
        return manufacturerCategoryDAL.findByManufacturerCategoryLikeByCreator(createdBy, manufacturerCategory);
    }

    @RequestMapping(value = "/find_all_list", method = RequestMethod.GET)
    public List<ManufacturerCategory> findAllList() {
        return manufacturerCategoryDAL.findAllList();
    }
}
