/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.dealerinvoicedetails;

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
public class DealerInvoiceDetailsDAL {
    public static final class Columns {

        public static final String ID = "id";
        public static final String ORDER_HEAD_ID = "order_head_id";
        public static final String TRANSPORT_MODE = "transport_mode";
        public static final String VEHICLE_NUMBER = "vehicle_number";
        public static final String DATE_OF_SUPPLY = "date_of_supply";
        public static final String EWAY_BILL_NO = "eway_bill_no";
        public static final String REVERSE_CHARGE = "reverse_charge";
        public static final String BILLING_PARTY_NAME = "billing_party_name";
        public static final String BILLING_PARTY_ADDRESS = "billing_party_address";
        public static final String BILLING_PARTY_GSTIN = "billing_party_gstin";
        public static final String BILLING_PARTY_STATE = "billing_party_state";
        public static final String BILLING_PARTY_CODE = "billing_party_code";
        public static final String SHIPPING_PARTY_NAME = "shipping_party_name";
        public static final String SHIPPING_PARTY_ADDRESS = "shipping_party_address";
        public static final String SHIPPING_PARTY_GSTIN = "shipping_party_gstin";
        public static final String SHIPPING_PARTY_STATE = "shipping_party_state";
        public static final String SHIPPING_PARTY_CODE = "shipping_party_code";
        public static final String DESCRIPTION_OF_GOODS = "description_of_goods";
        public static final String HSN_CODE = "hsn_code";
        public static final String TAX = "tax";
        public static final String TERMS_AND_CONDITIONS = "terms_and_conditions";

    }

    public static final String TABLE_NAME = "dealer_invoice_details";

    private final SimpleJdbcInsert insertDealerInvoiceDetail;
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public DealerInvoiceDetailsDAL(DataSource dataSource) {
        jdbcTemplate = new JdbcTemplate(dataSource);
        insertDealerInvoiceDetail = new SimpleJdbcInsert(jdbcTemplate)
                .withTableName(TABLE_NAME)
                .usingColumns(
                        Columns.ORDER_HEAD_ID,
                        Columns.TRANSPORT_MODE,
                        Columns.VEHICLE_NUMBER,
                        Columns.DATE_OF_SUPPLY,
                        Columns.EWAY_BILL_NO,
                        Columns.REVERSE_CHARGE,
                        Columns.BILLING_PARTY_NAME,
                        Columns.BILLING_PARTY_ADDRESS,
                        Columns.BILLING_PARTY_GSTIN,
                        Columns.BILLING_PARTY_STATE,
                        Columns.BILLING_PARTY_CODE,
                        Columns.SHIPPING_PARTY_NAME,
                        Columns.SHIPPING_PARTY_ADDRESS,
                        Columns.SHIPPING_PARTY_GSTIN,
                        Columns.SHIPPING_PARTY_STATE,
                        Columns.SHIPPING_PARTY_CODE,
                        Columns.DESCRIPTION_OF_GOODS,
                        Columns.HSN_CODE,
                        Columns.TAX,
                        Columns.TERMS_AND_CONDITIONS
                )
                .usingGeneratedKeyColumns(Columns.ID);
    }

    public List<DealerInvoiceDetails> findAll(Integer offset) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE ORDER BY " + Columns.ID + " DESC LIMIT 10 OFFSET ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{offset}, new BeanPropertyRowMapper<>(DealerInvoiceDetails.class));
    }

    public DealerInvoiceDetails findById(Integer id) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.ID + " = ?";
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{id}, new BeanPropertyRowMapper<>(DealerInvoiceDetails.class));
    }

//    public Party findByName(String name) {       
//        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.DEALER_NAME + " = ?";        
//        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{name}, new BeanPropertyRowMapper<>(Party.class));
//    }
//
    public DealerInvoiceDetails findByOrderHeadId(Integer orderHeadId) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.ORDER_HEAD_ID + " = ?";
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{orderHeadId}, new BeanPropertyRowMapper<>(DealerInvoiceDetails.class));
    }

    public DealerInvoiceDetails insert(DealerInvoiceDetails dealerInvoiceDetails) {
        System.out.println("Dealer Invoice Detail :" + dealerInvoiceDetails);
        Map<String, Object> parameters = new HashMap<>();
        parameters.put(Columns.ORDER_HEAD_ID, dealerInvoiceDetails.getOrderHeadId());
        parameters.put(Columns.TRANSPORT_MODE, dealerInvoiceDetails.getTransportMode());
        parameters.put(Columns.VEHICLE_NUMBER, dealerInvoiceDetails.getVehicleNumber());
        parameters.put(Columns.DATE_OF_SUPPLY, dealerInvoiceDetails.getDateOfSupply());
        parameters.put(Columns.EWAY_BILL_NO, dealerInvoiceDetails.getEwayBillNo());
        parameters.put(Columns.REVERSE_CHARGE, dealerInvoiceDetails.getReverseCharge());
        parameters.put(Columns.BILLING_PARTY_NAME, dealerInvoiceDetails.getBillingPartyName());
        parameters.put(Columns.BILLING_PARTY_ADDRESS, dealerInvoiceDetails.getBillingPartyAddress());
        parameters.put(Columns.BILLING_PARTY_GSTIN, dealerInvoiceDetails.getBillingPartyGstin());
        parameters.put(Columns.BILLING_PARTY_STATE, dealerInvoiceDetails.getBillingPartyState());
        parameters.put(Columns.BILLING_PARTY_CODE, dealerInvoiceDetails.getBillingPartyCode());
        parameters.put(Columns.SHIPPING_PARTY_NAME, dealerInvoiceDetails.getShippingPartyName());
        parameters.put(Columns.SHIPPING_PARTY_ADDRESS, dealerInvoiceDetails.getShippingPartyAddress());
        parameters.put(Columns.SHIPPING_PARTY_GSTIN, dealerInvoiceDetails.getShippingPartyGstin());
        parameters.put(Columns.SHIPPING_PARTY_STATE, dealerInvoiceDetails.getShippingPartyState());
        parameters.put(Columns.SHIPPING_PARTY_CODE, dealerInvoiceDetails.getShippingPartyCode());
        parameters.put(Columns.DESCRIPTION_OF_GOODS, dealerInvoiceDetails.getDescriptionOfGoods());
        parameters.put(Columns.HSN_CODE, dealerInvoiceDetails.getHsnCode());
        parameters.put(Columns.TAX, dealerInvoiceDetails.getTax());
        parameters.put(Columns.TERMS_AND_CONDITIONS, dealerInvoiceDetails.getTermsAndConditions());
        Number newId = insertDealerInvoiceDetail.executeAndReturnKey(parameters);
        dealerInvoiceDetails = findById(newId.intValue());
        return dealerInvoiceDetails;
    }

    public void delete(Integer id) {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET deleted=? WHERE " + Columns.ID + "=?";
        jdbcTemplate.update(sqlQuery, new Object[]{true, id});
    }

    public DealerInvoiceDetails update(DealerInvoiceDetails dealerInvoiceDetails) {
        System.out.println("Dealer Invocie Details Data DAL :%O"+dealerInvoiceDetails);
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET "
                + Columns.ORDER_HEAD_ID + " = ?,"
                + Columns.TRANSPORT_MODE + " = ?,"
                + Columns.VEHICLE_NUMBER + " = ?,"
                + Columns.DATE_OF_SUPPLY + " = ?,"
                + Columns.EWAY_BILL_NO + " = ?,"
                + Columns.REVERSE_CHARGE + " = ?,"
                + Columns.BILLING_PARTY_NAME + " = ?,"
                + Columns.BILLING_PARTY_ADDRESS + " = ?,"
                + Columns.BILLING_PARTY_GSTIN + " = ?, "
                + Columns.BILLING_PARTY_STATE + " = ?,"
                + Columns.BILLING_PARTY_CODE + " = ?,"
                + Columns.SHIPPING_PARTY_NAME + " = ?,"
                + Columns.SHIPPING_PARTY_ADDRESS + " = ?,"
                + Columns.SHIPPING_PARTY_GSTIN + " = ?,"
                + Columns.SHIPPING_PARTY_STATE + " = ?,"
                + Columns.SHIPPING_PARTY_CODE + " = ?,"
                + Columns.DESCRIPTION_OF_GOODS + " = ?,"
                + Columns.HSN_CODE + " = ?,"
                + Columns.TAX + " = ?,"                
                + Columns.TERMS_AND_CONDITIONS + " = ? WHERE " + Columns.ID + " = ?";
        Number updatedCount = jdbcTemplate.update(sqlQuery,
                new Object[]{
                    dealerInvoiceDetails.getOrderHeadId(),
                    dealerInvoiceDetails.getTransportMode(),
                    dealerInvoiceDetails.getVehicleNumber(),
                    dealerInvoiceDetails.getDateOfSupply(),
                    dealerInvoiceDetails.getEwayBillNo(),
                    dealerInvoiceDetails.getReverseCharge(),
                    dealerInvoiceDetails.getBillingPartyName(),
                    dealerInvoiceDetails.getBillingPartyAddress(),
                    dealerInvoiceDetails.getBillingPartyGstin(),
                    dealerInvoiceDetails.getBillingPartyState(),
                    dealerInvoiceDetails.getBillingPartyCode(),
                    dealerInvoiceDetails.getShippingPartyName(),
                    dealerInvoiceDetails.getShippingPartyAddress(),
                    dealerInvoiceDetails.getShippingPartyGstin(),
                    dealerInvoiceDetails.getShippingPartyState(),
                    dealerInvoiceDetails.getShippingPartyCode(),
                    dealerInvoiceDetails.getDescriptionOfGoods(),
                    dealerInvoiceDetails.getHsnCode(),
                    dealerInvoiceDetails.getTax(),
                    dealerInvoiceDetails.getTermsAndConditions(),
                    dealerInvoiceDetails.getId()
                });
        dealerInvoiceDetails = findById(dealerInvoiceDetails.getId());
        return dealerInvoiceDetails;
    }
}
