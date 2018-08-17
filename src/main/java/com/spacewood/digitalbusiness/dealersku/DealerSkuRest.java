/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.dealersku;

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
@RequestMapping("/dealer_sku")
public class DealerSkuRest {

    @Autowired
    private DealerSkuDAL dealerSkuDAL;

    @RequestMapping(method = RequestMethod.GET)
    public List<DealerSku> findAll(@RequestParam(value = "offset", required = false, defaultValue = "0") Integer offset) throws SQLException {
        return dealerSkuDAL.findAll(offset);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public DealerSku findById(@PathVariable("id") Integer id) throws SQLException {
        return dealerSkuDAL.findById(id);
    }

    @RequestMapping(method = RequestMethod.POST)
    public DealerSku insert(@RequestBody DealerSku dealerSku) {
        return dealerSkuDAL.insert(dealerSku);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.POST)
    public DealerSku update(@RequestBody DealerSku dealerSku) {
        return dealerSkuDAL.update(dealerSku);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable("id") Integer id) throws Exception {
        dealerSkuDAL.delete(id);
    }

    @RequestMapping(value = "/find/manufacturer_code", method = RequestMethod.GET)
    public List<DealerSku> findByManufacturerCode(@RequestParam("manufacturerCode") String manufacturerCode) throws Exception {
        return dealerSkuDAL.findByManufacturerCode(manufacturerCode);
    }

    @RequestMapping(value = "/find/category_code", method = RequestMethod.GET)
    public List<DealerSku> findByCategoryCode(@RequestParam("categoryCode") String categoryCode) throws Exception {
        return dealerSkuDAL.findByCategoryCode(categoryCode);
    }

    @RequestMapping(value = "/find/description/like", method = RequestMethod.GET)
    public List<DealerSku> findByDescriptionLike(@RequestParam("description") String description) throws Exception {
        return dealerSkuDAL.findByDescriptionLike(description);
    }

    @RequestMapping(value = "/find/description/filter", method = RequestMethod.GET)
    public List<DealerSku> findByDescriptionFilter(@RequestParam("categoryCode") String categoryCode, @RequestParam("manufacturerCode") String manufacturerCode) throws Exception {
        return dealerSkuDAL.findByDescriptionFilter(categoryCode, manufacturerCode);
    }

    @RequestMapping(value = "/find_all_list", method = RequestMethod.GET)
    public List<DealerSku> findAllList() {
        return dealerSkuDAL.findAllList();
    }
}
