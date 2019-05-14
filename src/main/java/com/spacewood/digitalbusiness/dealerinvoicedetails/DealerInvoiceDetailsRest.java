/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.dealerinvoicedetails;

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
@RequestMapping("/dealer_invoice_details")
public class DealerInvoiceDetailsRest {
    @Autowired
    private DealerInvoiceDetailsDAL dealerInvoiceDetailsDAL;
     
    @RequestMapping(method = RequestMethod.GET)
    public List<DealerInvoiceDetails> findAll(@RequestParam(value = "offset", required = false, defaultValue = "0") Integer offset) throws SQLException {
        return dealerInvoiceDetailsDAL.findAll(offset);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public DealerInvoiceDetails findById(@PathVariable("id") Integer id) throws SQLException {
        return dealerInvoiceDetailsDAL.findById(id);
    }
    
    @RequestMapping(method = RequestMethod.POST)
    public DealerInvoiceDetails insert(@RequestBody DealerInvoiceDetails dealerInvoiceDetails) {
        return dealerInvoiceDetailsDAL.insert(dealerInvoiceDetails);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.POST)
    public DealerInvoiceDetails update(@RequestBody DealerInvoiceDetails dealerInvoiceDetails) {
        System.out.println("Dealer Invocie Details Data REST :%O"+dealerInvoiceDetails);
        return dealerInvoiceDetailsDAL.update(dealerInvoiceDetails);
    }

//    @RolesAllowed("ROLE_SUPER_ADMIN")
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable("id") Integer id) throws Exception {
        dealerInvoiceDetailsDAL.delete(id);
    }
    
    @RequestMapping(value = "/find_by/order_head", method = RequestMethod.GET)
    public DealerInvoiceDetails findByOrderHeadId(@RequestParam("orderHeadId") Integer orderHeadId) {
        return dealerInvoiceDetailsDAL.findByOrderHeadId(orderHeadId);
    }        
}
