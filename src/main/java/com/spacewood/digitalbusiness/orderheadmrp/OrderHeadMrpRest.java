/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.orderheadmrp;

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
 * @author User
 */
@RestController
@RequestMapping("/order_head_mrp")
public class OrderHeadMrpRest {    
    
    @Autowired
    private OrderHeadMrpDAL orderHeadMrpDAL;

    @RequestMapping(method = RequestMethod.GET)
    public List<OrderHeadMrp> findAll(@RequestParam(value = "offset", required = false, defaultValue = "0") Integer offset) throws SQLException {
        return orderHeadMrpDAL.findAll(offset);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public OrderHeadMrp findById(@PathVariable("id") Integer id) throws SQLException {
        return orderHeadMrpDAL.findById(id);
    }

    @RequestMapping(method = RequestMethod.POST)
    public OrderHeadMrp insert(@RequestBody OrderHeadMrp orderHeadMrp) {
        return orderHeadMrpDAL.insert(orderHeadMrp);
    }

    @RequestMapping(value = "/find/orderNum", method = RequestMethod.GET)
    public List<OrderHeadMrp> findByOrderNumber(@RequestParam("orderNum") String orderNum) throws SQLException {
        return orderHeadMrpDAL.findByOrderNumber(orderNum);
    }

    @RequestMapping(value = "/find/initiatedBy", method = RequestMethod.GET)
    public List<OrderHeadMrp> findOrderGenerationSource(@RequestParam("userId") Integer userId) throws SQLException {
        return orderHeadMrpDAL.findOrderGenerationSource(userId);
    }

//    @RequestMapping(value = "/find/by/billingParty", method = RequestMethod.GET)
//    public List<OrderHead> findByBillingPartyId(@RequestParam("partyId") Integer partyId) throws SQLException {
//        return orderHeadMrpDAL.findByBillingPartyId(partyId);
//    }
//
//    @RequestMapping(value = "/find/by/billingParty/offset", method = RequestMethod.GET)
//    public List<OrderHead> findByBillingPartyIdOffset(@RequestParam("partyId") Integer partyId, @RequestParam("offset") Integer offset) throws SQLException {
//        return orderHeadMrpDAL.findByBillingPartyIdOffset(partyId, offset);
//    }
//
//    @RequestMapping(value = "/find/approvalDate", method = RequestMethod.GET)
//    public List<OrderHead> findByApprovalDate(@RequestParam("approvalDate") String approvalDate) throws SQLException {
//        return orderHeadMrpDAL.findByApprovalDate(approvalDate);
//    }
//
//    @RequestMapping(value = "/find/approval/duration", method = RequestMethod.GET)
//    public List<OrderHead> findApprovalByDuration(@RequestParam("startDate") String startDate, @RequestParam("endDate") String endDate) throws SQLException {
//        return orderHeadMrpDAL.findApprovalByDuration(startDate, endDate);
//    }
//
//    @RequestMapping(value = "/find/unapproval/duration", method = RequestMethod.GET)
//    public List<OrderHead> findUnApprovedOrderByDuration(@RequestParam("startDate") String startDate, @RequestParam("endDate") String endDate) throws SQLException {
//        return orderHeadMrpDAL.findUnApprovedOrderByDuration(startDate, endDate);
//    }
//
//    @RequestMapping(value = "/find/party/duration", method = RequestMethod.GET)
//    public List<OrderHead> findOrderByPartyAndDuration(@RequestParam("partyId") Integer partyId, @RequestParam("startDate") String startDate, @RequestParam("endDate") String endDate) throws SQLException {
//        return orderHeadMrpDAL.findOrderByPartyAndDuration(partyId, startDate, endDate);
//    }
//
    @RequestMapping(value = "/{id}", method = RequestMethod.POST)
    public OrderHeadMrp update(@RequestBody OrderHeadMrp orderHeadMrp) {
        return orderHeadMrpDAL.update(orderHeadMrp);
    }

//    @RolesAllowed("ROLE_SUPER_ADMIN")
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable("id") Integer id) throws Exception {
        orderHeadMrpDAL.delete(id);
    }
}
