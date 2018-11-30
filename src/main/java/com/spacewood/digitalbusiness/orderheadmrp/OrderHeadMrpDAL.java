/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.orderheadmrp;

import java.util.Date;
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
 * @author User
 */
@Repository
public class OrderHeadMrpDAL {

    public static final class Columns {

        public static final String ID = "id";
        public static final String ORDER_NUM = "order_num";
        public static final String PARTY_NAME = "party_name";
        public static final String PROJECT_NAME = "project_name";
        public static final String ADDRESS1 = "address1";
        public static final String ADDRESS2 = "address2";
        public static final String ADDRESS3 = "address3";
        public static final String ADDRESS4 = "address4";
        public static final String PARTY_EMAIL = "party_email";
        public static final String POSTAL_CODE = "postal_code";
        public static final String PARTY_MOBILE_NO = "party_mobile_no";
        public static final String PARTY_TELEPHONE_NO = "party_telephone_no";
        public static final String PARTY_CITY = "party_city";
        public static final String PO_DATE = "po_date";
        public static final String ORDER_INITIATED_BY = "order_initiated_by";
        public static final String ORDER_AMOUNT = "order_amount";
        public static final String CGST_AMOUNT = "cgst_amount";
        public static final String SGST_AMOUNT = "sgst_amount";
        public static final String IGST_AMOUNT = "igst_amount";
        public static final String NET_AMOUNT = "net_amount";
        public static final String TRANSPORTATION_CHARGES = "transportation_charges";
        public static final String LOADING_UNLOADING_CHARGES = "loading_unloading_charges";
        public static final String INSTALLATION_CHARGES = "installation_charges";
        public static final String OTHER_CHARGES = "other_charges";
        public static final String DISCOUNT = "discount";
        public static final String MRP_RAMPUP_PERCENTAGE = "mrp_rampup_percentage";
        public static final String MRP_RAMPUP_FACTOR = "mrp_rampup_factor";

    }

    public static final String TABLE_NAME = "order_head_mrp";
    private static Integer srNumber = 0;
    private final SimpleJdbcInsert insertOrderHead;
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public OrderHeadMrpDAL(DataSource dataSource) {
        jdbcTemplate = new JdbcTemplate(dataSource);
        insertOrderHead = new SimpleJdbcInsert(jdbcTemplate)
                .withTableName(TABLE_NAME)
                .usingColumns(
                        Columns.ORDER_NUM,
                        Columns.PARTY_NAME,
                        Columns.PROJECT_NAME,
                        Columns.ADDRESS1,
                        Columns.ADDRESS2,
                        Columns.ADDRESS3,
                        Columns.ADDRESS4,
                        Columns.PARTY_EMAIL,
                        Columns.POSTAL_CODE,
                        Columns.PARTY_MOBILE_NO,
                        Columns.PARTY_TELEPHONE_NO,
                        Columns.PARTY_CITY,
                        Columns.PO_DATE,
                        Columns.ORDER_INITIATED_BY,
                        Columns.ORDER_AMOUNT,
                        Columns.CGST_AMOUNT,
                        Columns.SGST_AMOUNT,
                        Columns.IGST_AMOUNT,
                        Columns.NET_AMOUNT,
                        Columns.TRANSPORTATION_CHARGES,
                        Columns.LOADING_UNLOADING_CHARGES,
                        Columns.INSTALLATION_CHARGES,
                        Columns.OTHER_CHARGES,
                        Columns.DISCOUNT,
                        Columns.MRP_RAMPUP_PERCENTAGE,
                        Columns.MRP_RAMPUP_FACTOR
                )
                .usingGeneratedKeyColumns(Columns.ID);
    }

    public List<OrderHeadMrp> findAll(Integer offset) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE ORDER BY " + Columns.ID + " DESC LIMIT 10 OFFSET ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{offset}, new BeanPropertyRowMapper<>(OrderHeadMrp.class));
    }

    public OrderHeadMrp findById(Integer id) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.ID + " = ?";
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{id}, new BeanPropertyRowMapper<>(OrderHeadMrp.class));
    }

    public List<OrderHeadMrp> findByOrderNumber(String orderNum) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE " + Columns.ORDER_NUM + " LIKE ?";
        String stringEntry = orderNum + "%";
        return jdbcTemplate.query(sqlQuery, new Object[]{stringEntry}, new BeanPropertyRowMapper<>(OrderHeadMrp.class));
    }

    public List<OrderHeadMrp> findOrderGenerationSource(Integer userId) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.ORDER_INITIATED_BY + " = ? ORDER BY " + Columns.ID + " DESC";
        return jdbcTemplate.query(sqlQuery, new Object[]{userId}, new BeanPropertyRowMapper<>(OrderHeadMrp.class));
    }
    
    public OrderHeadMrp insert(OrderHeadMrp orderHeadMrp) {
        System.out.println("Order Head :{}" + orderHeadMrp);
        Map<String, Object> parameters = new HashMap<>();
        String OrderNumber;

        List likeOrders = findByOrderNumber("RI");

        if (!likeOrders.isEmpty()) {
            srNumber = likeOrders.size() + 1;
        } else {
            srNumber = 1;
        }

        OrderNumber = "RI" + srNumber;
        parameters.put(Columns.ORDER_NUM, OrderNumber);
        parameters.put(Columns.PARTY_NAME ,orderHeadMrp.getPartyName());
        parameters.put(Columns.PROJECT_NAME, orderHeadMrp.getProjectName());
        parameters.put(Columns.ADDRESS1, orderHeadMrp.getAddress1());
        parameters.put(Columns.ADDRESS2, orderHeadMrp.getAddress2());
        parameters.put(Columns.ADDRESS3, orderHeadMrp.getAddress3());
        parameters.put(Columns.ADDRESS4, orderHeadMrp.getAddress4());
        parameters.put(Columns.PARTY_EMAIL, orderHeadMrp.getPartyEmail());        
        parameters.put(Columns.POSTAL_CODE, orderHeadMrp.getPostalCode());
        parameters.put(Columns.PARTY_MOBILE_NO, orderHeadMrp.getPartyMobileNo());
        parameters.put(Columns.PARTY_TELEPHONE_NO, orderHeadMrp.getPartyTelephoneNo());
        parameters.put(Columns.PARTY_CITY, orderHeadMrp.getPartyCity());
        parameters.put(Columns.PO_DATE, new Date());
        parameters.put(Columns.ORDER_INITIATED_BY, orderHeadMrp.getOrderInitiatedBy());
        parameters.put(Columns.ORDER_AMOUNT, "0");
        parameters.put(Columns.CGST_AMOUNT, "0");
        parameters.put(Columns.SGST_AMOUNT, "0");
        parameters.put(Columns.IGST_AMOUNT, "0");
        parameters.put(Columns.NET_AMOUNT, "0");
        parameters.put(Columns.TRANSPORTATION_CHARGES, orderHeadMrp.getTransportationCharges());
        parameters.put(Columns.LOADING_UNLOADING_CHARGES, orderHeadMrp.getLoadingUnloadingCharges());
        parameters.put(Columns.INSTALLATION_CHARGES, orderHeadMrp.getInstallationCharges());
        parameters.put(Columns.OTHER_CHARGES, orderHeadMrp.getOtherCharges());
        parameters.put(Columns.DISCOUNT, orderHeadMrp.getDiscount());
        parameters.put(Columns.MRP_RAMPUP_PERCENTAGE, orderHeadMrp.getMrpRampupPercentage());
        parameters.put(Columns.MRP_RAMPUP_FACTOR, orderHeadMrp.getMrpRampupFactor());

        Number newId = insertOrderHead.executeAndReturnKey(parameters);
        orderHeadMrp = findById(newId.intValue());
        return orderHeadMrp;
    }

    public void delete(Integer id) {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET deleted=? WHERE " + Columns.ID + "=?";
        jdbcTemplate.update(sqlQuery, new Object[]{true, id});
    }
//                        Columns.ORDER_NUM,
//                        Columns.PARTY_NAME,
//                        Columns.PROJECT_NAME,
//                        Columns.ADDRESS1,
//                        Columns.ADDRESS2,
//                        Columns.ADDRESS3,
//                        Columns.ADDRESS4,
//                        Columns.PARTY_EMAIL,
//                        Columns.POSTAL_CODE,
//                        Columns.PARTY_MOBILE_NO,
//                        Columns.PARTY_TELEPHONE_NO,
//                        Columns.PARTY_CITY,
//                        Columns.PO_DATE,
//                        Columns.ORDER_INITIATED_BY,
//                        Columns.ORDER_AMOUNT,
//                        Columns.CGST_AMOUNT,
//                        Columns.SGST_AMOUNT,
//                        Columns.IGST_AMOUNT,
//                        Columns.NET_AMOUNT,
//                        Columns.TRANSPORTATION_CHARGES,
//                        Columns.LOADING_UNLOADING_CHARGES,
//                        Columns.INSTALLATION_CHARGES,
//                        Columns.OTHER_CHARGES,
//                        Columns.DISCOUNT,
//                        Columns.MRP_RAMPUP_PERCENTAGE,
//                        Columns.MRP_RAMPUP_FACTOR
    public OrderHeadMrp update(OrderHeadMrp orderHeadMrp) {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET "
                + Columns.ORDER_NUM + " = ?,"
                + Columns.PARTY_NAME + " = ?, "
                + Columns.PROJECT_NAME + " = ?,"
                + Columns.ADDRESS1 + " = ?,"
                + Columns.ADDRESS2 + " = ?,"
                + Columns.ADDRESS3 + " = ?,"
                + Columns.ADDRESS4 + " = ?,"
                + Columns.PARTY_NAME + " = ?,"
                + Columns.POSTAL_CODE + " = ?,"
                + Columns.PARTY_MOBILE_NO + " = ?,"
                + Columns.PARTY_TELEPHONE_NO + " = ?,"
                + Columns.PARTY_CITY + " = ?,"
                + Columns.PO_DATE + " = ?,"
                + Columns.ORDER_INITIATED_BY + " = ?,"
                + Columns.ORDER_AMOUNT + " = ?,"
                + Columns.CGST_AMOUNT + " = ?,"
                + Columns.SGST_AMOUNT + " = ?,"
                + Columns.IGST_AMOUNT + " = ?,"
                + Columns.NET_AMOUNT + " = ?,"
                + Columns.TRANSPORTATION_CHARGES + " = ?,"
                + Columns.LOADING_UNLOADING_CHARGES + " = ?,"
                + Columns.INSTALLATION_CHARGES + " = ?,"
                + Columns.OTHER_CHARGES + " = ?,"
                + Columns.DISCOUNT + " = ?,"
                + Columns.MRP_RAMPUP_PERCENTAGE + " = ?,"                
                + Columns.MRP_RAMPUP_FACTOR + " = ? WHERE " + Columns.ID + " = ?";
        Number updatedCount = jdbcTemplate.update(sqlQuery,
                new Object[]{
                    orderHeadMrp.getOrderNum(),
                    orderHeadMrp.getPartyName(),
                    orderHeadMrp.getProjectName(),
                    orderHeadMrp.getAddress1(),
                    orderHeadMrp.getAddress2(),
                    orderHeadMrp.getAddress3(),
                    orderHeadMrp.getAddress4(),
                    orderHeadMrp.getPartyName(),
                    orderHeadMrp.getPostalCode(),
                    orderHeadMrp.getPartyMobileNo(),
                    orderHeadMrp.getPartyTelephoneNo(),
                    orderHeadMrp.getPartyCity(),
                    orderHeadMrp.getPoDate(),
                    orderHeadMrp.getOrderInitiatedBy(),
                    orderHeadMrp.getOrderAmount(),
                    orderHeadMrp.getCgstAmount(),
                    orderHeadMrp.getSgstAmount(),
                    orderHeadMrp.getIgstAmount(),
                    orderHeadMrp.getNetAmount(),
                    orderHeadMrp.getTransportationCharges(),
                    orderHeadMrp.getLoadingUnloadingCharges(),
                    orderHeadMrp.getInstallationCharges(),
                    orderHeadMrp.getOtherCharges(),
                    orderHeadMrp.getDiscount(),
                    orderHeadMrp.getMrpRampupPercentage(),
                    orderHeadMrp.getMrpRampupFactor(),                    
                    orderHeadMrp.getId()
                });
        orderHeadMrp = findById(orderHeadMrp.getId());
        return orderHeadMrp;
    }
}
