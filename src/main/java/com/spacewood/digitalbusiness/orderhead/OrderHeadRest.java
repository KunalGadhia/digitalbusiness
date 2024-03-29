/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.orderhead;

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
@RequestMapping("/order_head")
public class OrderHeadRest {

    @Autowired
    private OrderHeadDAL orderHeadDAL;

    @RequestMapping(method = RequestMethod.GET)
    public List<OrderHead> findAll(@RequestParam(value = "offset", required = false, defaultValue = "0") Integer offset) throws SQLException {
        return orderHeadDAL.findAll(offset);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public OrderHead findById(@PathVariable("id") Integer id) throws SQLException {
        return orderHeadDAL.findById(id);
    }

    @RequestMapping(method = RequestMethod.POST)
    public OrderHead insert(@RequestBody OrderHead orderHead) {
        return orderHeadDAL.insert(orderHead);
    }

    @RequestMapping(value = "/find/orderNum", method = RequestMethod.GET)
    public List<OrderHead> findByOrderNumber(@RequestParam("orderNum") String orderNum) throws SQLException {
        return orderHeadDAL.findByOrderNumber(orderNum);
    }

    @RequestMapping(value = "/find/initiatedBy", method = RequestMethod.GET)
    public List<OrderHead> findOrderGenerationSource(@RequestParam("userId") Integer userId) throws SQLException {
        return orderHeadDAL.findOrderGenerationSource(userId);
    }

    @RequestMapping(value = "/find/by/billingParty", method = RequestMethod.GET)
    public List<OrderHead> findByBillingPartyId(@RequestParam("partyId") Integer partyId) throws SQLException {
        return orderHeadDAL.findByBillingPartyId(partyId);
    }

    @RequestMapping(value = "/find/by/billingParty/offset", method = RequestMethod.GET)
    public List<OrderHead> findByBillingPartyIdOffset(@RequestParam("partyId") Integer partyId, @RequestParam("offset") Integer offset) throws SQLException {
        return orderHeadDAL.findByBillingPartyIdOffset(partyId, offset);
    }

    @RequestMapping(value = "/find/approvalDate", method = RequestMethod.GET)
    public List<OrderHead> findByApprovalDate(@RequestParam("approvalDate") String approvalDate) throws SQLException {
        return orderHeadDAL.findByApprovalDate(approvalDate);
    }

    @RequestMapping(value = "/find/approval/duration", method = RequestMethod.GET)
    public List<OrderHead> findApprovalByDuration(@RequestParam("startDate") String startDate, @RequestParam("endDate") String endDate) throws SQLException {
        return orderHeadDAL.findApprovalByDuration(startDate, endDate);
    }

    @RequestMapping(value = "/find/unapproval/duration", method = RequestMethod.GET)
    public List<OrderHead> findUnApprovedOrderByDuration(@RequestParam("startDate") String startDate, @RequestParam("endDate") String endDate) throws SQLException {
        return orderHeadDAL.findUnApprovedOrderByDuration(startDate, endDate);
    }

    @RequestMapping(value = "/find/party/duration", method = RequestMethod.GET)
    public List<OrderHead> findOrderByPartyAndDuration(@RequestParam("partyId") Integer partyId, @RequestParam("startDate") String startDate, @RequestParam("endDate") String endDate) throws SQLException {
        return orderHeadDAL.findOrderByPartyAndDuration(partyId, startDate, endDate);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.POST)
    public OrderHead update(@RequestBody OrderHead orderHead) {
        return orderHeadDAL.update(orderHead);
    }

//    @RolesAllowed("ROLE_SUPER_ADMIN")
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable("id") Integer id) throws Exception {
        orderHeadDAL.delete(id);
    }

//    @RequestMapping(value = "/find/name", method = RequestMethod.GET)
//
//    public Employee findByName(@RequestParam("name") String name) throws Exception {
//        return orderHeadDAL.findByName(name);
//    }
//    
//    @RequestMapping(value = "/find/user_like", method = RequestMethod.GET)
//    public List<Employee> findByNameLike(@RequestParam("name") String name) {
//        return orderHeadDAL.findByNameLike(name);
//    }
}
