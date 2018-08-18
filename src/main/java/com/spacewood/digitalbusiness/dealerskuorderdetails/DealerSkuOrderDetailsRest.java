/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.dealerskuorderdetails;

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
 * @author swapnika
 */
@RestController
@RequestMapping("/dealer_sku_order_details")
public class DealerSkuOrderDetailsRest {

    private final Logger logger = LoggerFactory.getLogger(getClass());

    @Autowired
    private DealerSkuOrderDetailsDAL dealerSkuOrderDetailsDAL;

    @RequestMapping(method = RequestMethod.GET)
    public List<DealerSkuOrderDetails> findAll(@RequestParam(value = "offset", required = false, defaultValue = "0") Integer offset) throws SQLException {
        return dealerSkuOrderDetailsDAL.findAll(offset);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public DealerSkuOrderDetails findById(@PathVariable("id") Integer id) throws SQLException {
        return dealerSkuOrderDetailsDAL.findById(id);
    }

    @RequestMapping(method = RequestMethod.POST)
    public DealerSkuOrderDetails insert(@RequestBody DealerSkuOrderDetails dealerSkuOrderDetails) {
        return dealerSkuOrderDetailsDAL.insert(dealerSkuOrderDetails);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.POST)
    public DealerSkuOrderDetails update(@RequestBody DealerSkuOrderDetails dealerSkuOrderDetails) {
        return dealerSkuOrderDetailsDAL.update(dealerSkuOrderDetails);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable("id") Integer id) throws Exception {
        dealerSkuOrderDetailsDAL.delete(id);
    }

    @RequestMapping(value = "/find/product_code", method = RequestMethod.GET)
    public List<DealerSkuOrderDetails> findByProductCode(@RequestParam("productCode") String productCode) throws Exception {
        return dealerSkuOrderDetailsDAL.findByProductCode(productCode);
    }
    
    @RequestMapping(value = "/find/order_head_id", method = RequestMethod.GET)
    public List<DealerSkuOrderDetails> findByOrderHeadId(@RequestParam("orderHeadId") Integer orderHeadId) throws Exception {
        return dealerSkuOrderDetailsDAL.findByOrderHeadId(orderHeadId);
    }

    @RequestMapping(value = "/find_all_list", method = RequestMethod.GET)
    public List<DealerSkuOrderDetails> findAllList() {
        return dealerSkuOrderDetailsDAL.findAllList();
    }

}
