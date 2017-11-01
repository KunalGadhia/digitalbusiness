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
                        Columns.ORC_PER
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

    public List findByOrderNumber(String orderNum) {
        String sqlQuery = "SELECT " + Columns.ORDER_NUM + " FROM " + TABLE_NAME + " WHERE " + Columns.ORDER_NUM + " LIKE ?";
        String stringEntry = orderNum + "%";
        return jdbcTemplate.query(sqlQuery, new Object[]{stringEntry}, new BeanPropertyRowMapper<>(OrderHead.class));
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
        parameters.put(Columns.SEGMENT, orderHead.getSegment());
        parameters.put(Columns.SALE_TYPE, orderHead.getSaleType());
        parameters.put(Columns.ENTRY_TYPE, orderHead.getEntryType().name());
        parameters.put(Columns.ORDER_TYPE, orderHead.getOrderType().name());
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
        parameters.put(Columns.RATE_APPLICABILITY, orderHead.getRateApplicability().name());
        parameters.put(Columns.RATE_CONTRACT, orderHead.getRateContract());
        parameters.put(Columns.ORC_PER, orderHead.getOrcPer());

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
                + Columns.ORC_PER + " = ? WHERE " + Columns.ID + " = ?";
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
                    orderHead.getId()
                });
        orderHead = findById(orderHead.getId());
        return orderHead;
    }
}
