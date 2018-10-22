/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.orderhead;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.sql.DataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.stereotype.Repository;

/**
 *
 * @author webdesign
 */
@Repository
public class OrderHeadDAL {

    public static final class Columns {

        public static final String ID = "id";
        public static final String ORDER_NUM = "order_num";
        public static final String SEGMENT = "segment";
        public static final String SALE_TYPE = "sale_type";
        public static final String ENTRY_TYPE = "entry_type";
        public static final String ORDER_TYPE = "order_type";
        public static final String BILLING_PARTY_ID = "billing_party_id";
        public static final String DELIVERY_PARTY_ID = "delivery_party_id";
        public static final String POSTAL_CODE = "postal_code";
        public static final String BILL_TYPE = "bill_type";
        public static final String ORDER_SUB_TYPE = "order_sub_type";
        public static final String PROJECT_NAME = "project_name";
        public static final String PO_NUM = "po_num";
        public static final String ORDER_ID = "order_id";
        public static final String PO_DATE = "po_date";
        public static final String PO_VALUE = "po_value";
        public static final String MARKETING_HEAD = "marketing_head";
        public static final String ORDER_INITIATED_BY = "order_initiated_by";
        public static final String RATE_APPLICABILITY = "rate_applicability";
        public static final String RATE_CONTRACT = "rate_contract";
        public static final String ORC_PER = "orc_per";
        public static final String APPROVAL_DATE = "approval_date";
        public static final String APPROVED = "approved";
        public static final String ORDER_AMOUNT = "order_amount";
        public static final String CGST_AMOUNT = "cgst_amount";
        public static final String SGST_AMOUNT = "sgst_amount";
        public static final String IGST_AMOUNT = "igst_amount";
        public static final String NET_AMOUNT = "net_amount";
        public static final String DELIVERY_PARTY_NAME = "delivery_party_name";
        public static final String DELIVERY_PARTY_ADDRESS1 = "delivery_party_address1";
        public static final String DELIVERY_PARTY_ADDRESS2 = "delivery_party_address2";
        public static final String DELIVERY_PARTY_ADDRESS3 = "delivery_party_address3";
        public static final String DELIVERY_PARTY_ADDRESS4 = "delivery_party_address4";
        public static final String DELIVERY_PARTY_EMAIL = "delivery_party_email";
        public static final String DELIVERY_PARTY_POSTAL_CODE = "delivery_party_postal_code";
        public static final String DELIVERY_PARTY_DIRECT_TEL_NO = "delivery_party_direct_tel_no";
        public static final String DELIVERY_PARTY_BILL_BOARD_TEL = "delivery_party_bill_board_tel";
        public static final String DELIVERY_PARTY_FAX = "delivery_party_fax";
        public static final String DELIVERY_PARTY_CITY = "delivery_party_city";        

    }

    public static final String TABLE_NAME = "order_head";
    private static Integer srNumber = 0;
    private final SimpleJdbcInsert insertOrderHead;
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public OrderHeadDAL(DataSource dataSource) {
        jdbcTemplate = new JdbcTemplate(dataSource);
        insertOrderHead = new SimpleJdbcInsert(jdbcTemplate)
                .withTableName(TABLE_NAME)
                .usingColumns(
                        Columns.ORDER_NUM,
                        Columns.SEGMENT,
                        Columns.SALE_TYPE,
                        Columns.ENTRY_TYPE,
                        Columns.ORDER_TYPE,
                        Columns.BILLING_PARTY_ID,
                        Columns.DELIVERY_PARTY_ID,
                        Columns.POSTAL_CODE,
                        Columns.BILL_TYPE,
                        Columns.ORDER_SUB_TYPE,
                        Columns.PROJECT_NAME,
                        Columns.PO_NUM,
                        Columns.ORDER_ID,
                        Columns.PO_DATE,
                        Columns.PO_VALUE,
                        Columns.MARKETING_HEAD,
                        Columns.ORDER_INITIATED_BY,
                        Columns.RATE_APPLICABILITY,
                        Columns.RATE_CONTRACT,
                        Columns.ORC_PER,
                        Columns.APPROVAL_DATE,
                        Columns.APPROVED,
                        Columns.ORDER_AMOUNT,
                        Columns.CGST_AMOUNT,
                        Columns.SGST_AMOUNT,
                        Columns.IGST_AMOUNT,
                        Columns.NET_AMOUNT,
                        Columns.DELIVERY_PARTY_NAME,
                        Columns.DELIVERY_PARTY_ADDRESS1,
                        Columns.DELIVERY_PARTY_ADDRESS2,
                        Columns.DELIVERY_PARTY_ADDRESS3,
                        Columns.DELIVERY_PARTY_ADDRESS4,
                        Columns.DELIVERY_PARTY_EMAIL,
                        Columns.DELIVERY_PARTY_POSTAL_CODE,
                        Columns.DELIVERY_PARTY_DIRECT_TEL_NO,
                        Columns.DELIVERY_PARTY_BILL_BOARD_TEL,
                        Columns.DELIVERY_PARTY_FAX,
                        Columns.DELIVERY_PARTY_CITY
                )
                .usingGeneratedKeyColumns(Columns.ID);
    }

    public List<OrderHead> findAll(Integer offset) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE ORDER BY " + Columns.ID + " DESC LIMIT 10 OFFSET ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{offset}, new BeanPropertyRowMapper<>(OrderHead.class));
    }

    public OrderHead findById(Integer id) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.ID + " = ?";
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{id}, new BeanPropertyRowMapper<>(OrderHead.class));
    }

    public List<OrderHead> findByOrderNumber(String orderNum) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE " + Columns.ORDER_NUM + " LIKE ?";
        String stringEntry = orderNum + "%";
        return jdbcTemplate.query(sqlQuery, new Object[]{stringEntry}, new BeanPropertyRowMapper<>(OrderHead.class));
    }

    public List<OrderHead> findOrderGenerationSource(Integer userId) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.ORDER_INITIATED_BY + " = ? ORDER BY " + Columns.ID + " DESC";
        return jdbcTemplate.query(sqlQuery, new Object[]{userId}, new BeanPropertyRowMapper<>(OrderHead.class));
    }

    public List<OrderHead> findByBillingPartyId(Integer partyId) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.BILLING_PARTY_ID + " = ? ORDER BY " + Columns.ID + " DESC";
        return jdbcTemplate.query(sqlQuery, new Object[]{partyId}, new BeanPropertyRowMapper<>(OrderHead.class));
    }

    public List<OrderHead> findByBillingPartyIdOffset(Integer partyId, Integer offset) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.BILLING_PARTY_ID + " = ? ORDER BY " + Columns.ID + " DESC LIMIT 10 OFFSET ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{partyId, offset}, new BeanPropertyRowMapper<>(OrderHead.class));
    }

    public List<OrderHead> findByApprovalDate(String approvalDate) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.APPROVED + " = TRUE AND " + Columns.APPROVAL_DATE + " = ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{approvalDate}, new BeanPropertyRowMapper<>(OrderHead.class));
    }

    public List<OrderHead> findApprovalByDuration(String starDate, String endDate) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND approved = true AND " + Columns.APPROVAL_DATE + " >= ? AND " + Columns.APPROVAL_DATE + " <= ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{starDate, endDate}, new BeanPropertyRowMapper<>(OrderHead.class));
    }

    public List<OrderHead> findUnApprovedOrderByDuration(String starDate, String endDate) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND approved = false AND " + Columns.PO_DATE + " >= ? AND " + Columns.PO_DATE + " <= ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{starDate, endDate}, new BeanPropertyRowMapper<>(OrderHead.class));
    }

    public List<OrderHead> findOrderByPartyAndDuration(Integer partyId, String starDate, String endDate) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.BILLING_PARTY_ID + " = ? AND " + Columns.PO_DATE + " >= ? AND " + Columns.PO_DATE + " <= ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{partyId, starDate, endDate}, new BeanPropertyRowMapper<>(OrderHead.class));
    }

//    public Employee findByName(String name) {       
//        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.EMP_NAME + " = ?";        
//        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{name}, new BeanPropertyRowMapper<>(Employee.class));
//    }
//    public List<Employee> findByNameLike(String name) {
//        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND lower(emp_name) LIKE?";
//        String nameLike = "%" + name.toLowerCase() + "%";
//        return jdbcTemplate.query(sqlQuery, new Object[]{nameLike}, new BeanPropertyRowMapper<>(Employee.class));
//    }
    public OrderHead insert(OrderHead orderHead) {
        System.out.println("Order Head :{}" + orderHead);
        Map<String, Object> parameters = new HashMap<>();
        String OrderNumber;

        List likeOrders = findByOrderNumber("OC");

        if (!likeOrders.isEmpty()) {
            srNumber = likeOrders.size() + 1;
        } else {
            srNumber = 1;
        }

        OrderNumber = "OC" + srNumber;
        parameters.put(Columns.ORDER_NUM, OrderNumber);
        parameters.put(Columns.SEGMENT, "K");
        parameters.put(Columns.SALE_TYPE, "KC");
        parameters.put(Columns.ENTRY_TYPE, EntryType.NON_PROJECTS);
        parameters.put(Columns.ORDER_TYPE, OrderType.COMPONENTS);
        parameters.put(Columns.BILLING_PARTY_ID, orderHead.getBillingPartyId());
        parameters.put(Columns.DELIVERY_PARTY_ID, orderHead.getDeliveryPartyId());
        parameters.put(Columns.POSTAL_CODE, orderHead.getPostalCode());
        parameters.put(Columns.BILL_TYPE, orderHead.getBillType().name());
        parameters.put(Columns.ORDER_SUB_TYPE, orderHead.getOrderSubType().name());
        parameters.put(Columns.PROJECT_NAME, orderHead.getProjectName());
        parameters.put(Columns.PO_NUM, orderHead.getPoNum());
        parameters.put(Columns.ORDER_ID, orderHead.getOrderId());
        parameters.put(Columns.PO_DATE, orderHead.getPoDate());
        parameters.put(Columns.PO_VALUE, orderHead.getPoValue());
        parameters.put(Columns.MARKETING_HEAD, orderHead.getMarketingHead());
        parameters.put(Columns.ORDER_INITIATED_BY, orderHead.getOrderInitiatedBy());
        if (orderHead.getRateApplicability() == null) {
            parameters.put(Columns.RATE_APPLICABILITY, RateApplicability.NA);
        } else {
            parameters.put(Columns.RATE_APPLICABILITY, orderHead.getRateApplicability().name());
        }
        if (orderHead.getRateContract() == null) {
            parameters.put(Columns.RATE_CONTRACT, "N/A");
        } else {
            parameters.put(Columns.RATE_CONTRACT, orderHead.getRateContract());
        }

        parameters.put(Columns.ORC_PER, orderHead.getOrcPer());
        parameters.put(Columns.APPROVED, "0");
        parameters.put(Columns.ORDER_AMOUNT, "0");
        parameters.put(Columns.CGST_AMOUNT, "0");
        parameters.put(Columns.SGST_AMOUNT, "0");
        parameters.put(Columns.IGST_AMOUNT, "0");
        parameters.put(Columns.NET_AMOUNT, "0");
        parameters.put(Columns.DELIVERY_PARTY_NAME, orderHead.getDeliveryPartyName());
        parameters.put(Columns.DELIVERY_PARTY_ADDRESS1, orderHead.getDeliveryPartyAddress1());
        parameters.put(Columns.DELIVERY_PARTY_ADDRESS2, orderHead.getDeliveryPartyAddress2());
        parameters.put(Columns.DELIVERY_PARTY_ADDRESS3, orderHead.getDeliveryPartyAddress3());
        parameters.put(Columns.DELIVERY_PARTY_ADDRESS4, orderHead.getDeliveryPartyAddress4());
        parameters.put(Columns.DELIVERY_PARTY_EMAIL, orderHead.getDeliveryPartyEmail());
        parameters.put(Columns.DELIVERY_PARTY_POSTAL_CODE, orderHead.getDeliveryPartyPostalCode());
        parameters.put(Columns.DELIVERY_PARTY_DIRECT_TEL_NO, orderHead.getDeliveryPartyDirectTelNo());
        parameters.put(Columns.DELIVERY_PARTY_BILL_BOARD_TEL, orderHead.getDeliveryPartyBillBoardTel());
        parameters.put(Columns.DELIVERY_PARTY_FAX, orderHead.getDeliveryPartyFax());
        parameters.put(Columns.DELIVERY_PARTY_CITY, orderHead.getDeliveryPartyCity());        

        Number newId = insertOrderHead.executeAndReturnKey(parameters);
        orderHead = findById(newId.intValue());
        return orderHead;
    }

    public void delete(Integer id) {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET deleted=? WHERE " + Columns.ID + "=?";
        jdbcTemplate.update(sqlQuery, new Object[]{true, id});
    }

    public OrderHead update(OrderHead orderHead) {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET "
                + Columns.ORDER_NUM + " = ?,"
                + Columns.SEGMENT + " = ?, "
                + Columns.SALE_TYPE + " = ?,"
                + Columns.ENTRY_TYPE + " = ?,"
                + Columns.ORDER_TYPE + " = ?,"
                + Columns.BILLING_PARTY_ID + " = ?,"
                + Columns.DELIVERY_PARTY_ID + " = ?,"
                + Columns.POSTAL_CODE + " = ?,"
                + Columns.BILL_TYPE + " = ?,"
                + Columns.ORDER_SUB_TYPE + " = ?,"
                + Columns.PROJECT_NAME + " = ?,"
                + Columns.PO_NUM + " = ?,"
                + Columns.ORDER_ID + " = ?,"
                + Columns.PO_DATE + " = ?,"
                + Columns.PO_VALUE + " = ?,"
                + Columns.MARKETING_HEAD + " = ?,"
                + Columns.ORDER_INITIATED_BY + " = ?,"
                + Columns.RATE_APPLICABILITY + " = ?,"
                + Columns.RATE_CONTRACT + " = ?,"
                + Columns.ORC_PER + " = ?,"
                + Columns.APPROVAL_DATE + " = ?,"
                + Columns.APPROVED + " = ?,"
                + Columns.ORDER_AMOUNT + " = ?,"
                + Columns.CGST_AMOUNT + " = ?,"
                + Columns.SGST_AMOUNT + " = ?,"
                + Columns.IGST_AMOUNT + " = ?,"
                + Columns.NET_AMOUNT + " = ?,"
                + Columns.DELIVERY_PARTY_NAME + " = ?,"
                + Columns.DELIVERY_PARTY_ADDRESS1 + " = ?,"
                + Columns.DELIVERY_PARTY_ADDRESS2 + " = ?,"
                + Columns.DELIVERY_PARTY_ADDRESS3 + " = ?,"
                + Columns.DELIVERY_PARTY_ADDRESS4 + " = ?,"
                + Columns.DELIVERY_PARTY_EMAIL + " = ?,"
                + Columns.DELIVERY_PARTY_POSTAL_CODE + " = ?,"
                + Columns.DELIVERY_PARTY_DIRECT_TEL_NO + " = ?,"
                + Columns.DELIVERY_PARTY_BILL_BOARD_TEL + " = ?,"
                + Columns.DELIVERY_PARTY_FAX + " = ?,"
                + Columns.DELIVERY_PARTY_CITY + " = ? WHERE " + Columns.ID + " = ?";
        Number updatedCount = jdbcTemplate.update(sqlQuery,
                new Object[]{
                    orderHead.getOrderNum(),
                    orderHead.getSegment(),
                    orderHead.getSaleType(),
                    orderHead.getEntryType().name(),
                    orderHead.getOrderType().name(),
                    orderHead.getBillingPartyId(),
                    orderHead.getDeliveryPartyId(),
                    orderHead.getPostalCode(),
                    orderHead.getBillType().name(),
                    orderHead.getOrderSubType().name(),
                    orderHead.getProjectName(),
                    orderHead.getPoNum(),
                    orderHead.getOrderId(),
                    orderHead.getPoDate(),
                    orderHead.getPoValue(),
                    orderHead.getMarketingHead(),
                    orderHead.getOrderInitiatedBy(),
                    orderHead.getRateApplicability().name(),
                    orderHead.getRateContract(),
                    orderHead.getOrcPer(),
                    orderHead.getApprovalDate(),
                    orderHead.getApproved(),
                    orderHead.getOrderAmount(),
                    orderHead.getCgstAmount(),
                    orderHead.getSgstAmount(),
                    orderHead.getIgstAmount(),
                    orderHead.getNetAmount(),
                    orderHead.getDeliveryPartyName(),
                    orderHead.getDeliveryPartyAddress1(),
                    orderHead.getDeliveryPartyAddress1(),
                    orderHead.getNetAmount(),
                    orderHead.getNetAmount(),
                    orderHead.getNetAmount(),
                    orderHead.getNetAmount(),
                    orderHead.getNetAmount(),
                    orderHead.getNetAmount(),
                    orderHead.getNetAmount(),
                    orderHead.getNetAmount(),
                    orderHead.getId()
                });
        orderHead = findById(orderHead.getId());
        return orderHead;
    }
}
