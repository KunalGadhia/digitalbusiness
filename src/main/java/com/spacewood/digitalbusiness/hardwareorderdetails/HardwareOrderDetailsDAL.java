/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.hardwareorderdetails;

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
public class HardwareOrderDetailsDAL {

    public static final class Columns {

        public static final String ID = "id";
        public static final String ORDER_HEAD_ID = "order_head_id";
        public static final String PRODUCT_CODE = "product_code";
        public static final String HARDWARE_NAME = "hardware_name";
        public static final String STD_PRICE = "std_price";
        public static final String QUANTITY = "quantity";
        public static final String PRICE = "price";
        public static final String DISPLAY_DISCOUNT = "display_discount";
        public static final String ORDER_FOR = "order_for";

    }

    public static final String TABLE_NAME = "hardware_order_details";

    private final SimpleJdbcInsert insertHardwareOrderDetail;
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public HardwareOrderDetailsDAL(DataSource dataSource) {
        jdbcTemplate = new JdbcTemplate(dataSource);
        insertHardwareOrderDetail = new SimpleJdbcInsert(jdbcTemplate)
                .withTableName(TABLE_NAME)
                .usingColumns(
                        Columns.ORDER_HEAD_ID,
                        Columns.PRODUCT_CODE,
                        Columns.HARDWARE_NAME,
                        Columns.STD_PRICE,
                        Columns.QUANTITY,
                        Columns.PRICE,
                        Columns.DISPLAY_DISCOUNT,
                        Columns.ORDER_FOR
                )
                .usingGeneratedKeyColumns(Columns.ID);
    }

    public List<HardwareOrderDetails> findAll(Integer offset) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE ORDER BY " + Columns.ID + " DESC LIMIT 10 OFFSET ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{offset}, new BeanPropertyRowMapper<>(HardwareOrderDetails.class));
    }

    public HardwareOrderDetails findById(Integer id) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.ID + " = ?";
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{id}, new BeanPropertyRowMapper<>(HardwareOrderDetails.class));
    }

//    public Party findByName(String name) {       
//        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.DEALER_NAME + " = ?";        
//        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{name}, new BeanPropertyRowMapper<>(Party.class));
//    }
//
    public List<HardwareOrderDetails> findByOrderHeadId(Integer orderHeadId) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.ORDER_HEAD_ID + " = ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{orderHeadId}, new BeanPropertyRowMapper<>(HardwareOrderDetails.class));
    }

    public HardwareOrderDetails insert(HardwareOrderDetails hardwareOrderDetails) {
        System.out.println("Insert Order Detail :" + hardwareOrderDetails);
        Map<String, Object> parameters = new HashMap<>();
        parameters.put(Columns.ORDER_HEAD_ID, hardwareOrderDetails.getOrderHeadId());
        parameters.put(Columns.PRODUCT_CODE, hardwareOrderDetails.getProductCode());
        parameters.put(Columns.HARDWARE_NAME, hardwareOrderDetails.getHardwareName());
        parameters.put(Columns.STD_PRICE, hardwareOrderDetails.getStdPrice());
        parameters.put(Columns.QUANTITY, hardwareOrderDetails.getQuantity());
        parameters.put(Columns.PRICE, Math.round(hardwareOrderDetails.getPrice()));
        parameters.put(Columns.DISPLAY_DISCOUNT, hardwareOrderDetails.getDisplayDiscount());
        parameters.put(Columns.ORDER_FOR, "HARDWARE");

        Number newId = insertHardwareOrderDetail.executeAndReturnKey(parameters);
        hardwareOrderDetails = findById(newId.intValue());
        return hardwareOrderDetails;
    }

    public void delete(Integer id) {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET deleted=? WHERE " + Columns.ID + "=?";
        jdbcTemplate.update(sqlQuery, new Object[]{true, id});
    }

    public HardwareOrderDetails update(HardwareOrderDetails hardwareOrderDetails) {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET "
                + Columns.ORDER_HEAD_ID + " = ?,"
                + Columns.PRODUCT_CODE + " = ?, "
                + Columns.HARDWARE_NAME + " = ?,"
                + Columns.STD_PRICE + " = ?,"
                + Columns.QUANTITY + " = ?,"
                + Columns.PRICE + " = ? WHERE " + Columns.ID + " = ?";
        Number updatedCount = jdbcTemplate.update(sqlQuery,
                new Object[]{
                    hardwareOrderDetails.getOrderHeadId(),
                    hardwareOrderDetails.getProductCode(),
                    hardwareOrderDetails.getHardwareName(),
                    hardwareOrderDetails.getStdPrice(),
                    hardwareOrderDetails.getQuantity(),
                    hardwareOrderDetails.getPrice(),
                    hardwareOrderDetails.getId()
                });
        hardwareOrderDetails = findById(hardwareOrderDetails.getId());
        return hardwareOrderDetails;
    }
}
