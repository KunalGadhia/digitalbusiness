/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.maxkitchenorderdetails;

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
 * @author user
 */
@Repository
public class MaxKitchenOrderDetailsDAL {
    public static final class Columns {

        public static final String ID = "id";
        public static final String ORDER_HEAD_ID = "order_head_id";
        public static final String PRODUCT_CODE = "product_code";
        public static final String DESCRIPTION = "hardware_name";
        public static final String SHUTTER_FINISH = "hardware_name";
        public static final String WIDTH = "hardware_name";
        public static final String HEIGHT = "hardware_name";
        public static final String DEPTH = "hardware_name";
        public static final String STD_PRICE = "std_price";
        public static final String QUANTITY = "quantity";
        public static final String PRICE = "price";        
        public static final String ORDER_FOR = "order_for";

    }

    public static final String TABLE_NAME = "max_kitchen_order_details";

    private final SimpleJdbcInsert insertMaxKitchenOrderDetail;
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public MaxKitchenOrderDetailsDAL(DataSource dataSource) {
        jdbcTemplate = new JdbcTemplate(dataSource);
        insertMaxKitchenOrderDetail = new SimpleJdbcInsert(jdbcTemplate)
                .withTableName(TABLE_NAME)
                .usingColumns(
                        Columns.ORDER_HEAD_ID,
                        Columns.PRODUCT_CODE,
                        Columns.DESCRIPTION,
                        Columns.SHUTTER_FINISH,
                        Columns.WIDTH,
                        Columns.HEIGHT,
                        Columns.DEPTH,
                        Columns.STD_PRICE,
                        Columns.QUANTITY,
                        Columns.PRICE,                        
                        Columns.ORDER_FOR
                )
                .usingGeneratedKeyColumns(Columns.ID);
    }

    public List<MaxKitchenOrderDetails> findAll(Integer offset) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE ORDER BY " + Columns.ID + " DESC LIMIT 10 OFFSET ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{offset}, new BeanPropertyRowMapper<>(MaxKitchenOrderDetails.class));
    }

    public MaxKitchenOrderDetails findById(Integer id) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.ID + " = ?";
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{id}, new BeanPropertyRowMapper<>(MaxKitchenOrderDetails.class));
    }

//    public Party findByName(String name) {       
//        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.DEALER_NAME + " = ?";        
//        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{name}, new BeanPropertyRowMapper<>(Party.class));
//    }
//
    public List<MaxKitchenOrderDetails> findByOrderHeadId(Integer orderHeadId) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.ORDER_HEAD_ID + " = ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{orderHeadId}, new BeanPropertyRowMapper<>(MaxKitchenOrderDetails.class));
    }    

    public MaxKitchenOrderDetails insert(MaxKitchenOrderDetails maxKitchenOrderDetails) {
        System.out.println("Insert Order Detail :" + maxKitchenOrderDetails);
        Map<String, Object> parameters = new HashMap<>();
        parameters.put(Columns.ORDER_HEAD_ID, maxKitchenOrderDetails.getOrderHeadId());
        parameters.put(Columns.PRODUCT_CODE, maxKitchenOrderDetails.getProductCode());
        parameters.put(Columns.DESCRIPTION, maxKitchenOrderDetails.getDescription());
        parameters.put(Columns.SHUTTER_FINISH, maxKitchenOrderDetails.getShutterFinish());
        parameters.put(Columns.WIDTH, maxKitchenOrderDetails.getWidth());
        parameters.put(Columns.HEIGHT, maxKitchenOrderDetails.getHeight());
        parameters.put(Columns.DEPTH, maxKitchenOrderDetails.getDepth());
        parameters.put(Columns.STD_PRICE, maxKitchenOrderDetails.getStdPrice());
        parameters.put(Columns.QUANTITY, maxKitchenOrderDetails.getQuantity());
        parameters.put(Columns.PRICE, Math.round(maxKitchenOrderDetails.getPrice()));        
        parameters.put(Columns.ORDER_FOR, "MAX_KITCHEN");

        Number newId = insertMaxKitchenOrderDetail.executeAndReturnKey(parameters);
        maxKitchenOrderDetails = findById(newId.intValue());
        return maxKitchenOrderDetails;
    }

    public void delete(Integer id) {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET deleted=? WHERE " + Columns.ID + "=?";
        jdbcTemplate.update(sqlQuery, new Object[]{true, id});
    }

    public MaxKitchenOrderDetails update(MaxKitchenOrderDetails maxKitchenOrderDetails) {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET "
                + Columns.ORDER_HEAD_ID + " = ?,"
                + Columns.PRODUCT_CODE + " = ?, "
                + Columns.DESCRIPTION + " = ?,"
                + Columns.SHUTTER_FINISH + " = ?,"
                + Columns.WIDTH + " = ?,"
                + Columns.HEIGHT + " = ?,"
                + Columns.DEPTH + " = ?,"
                + Columns.STD_PRICE + " = ?,"
                + Columns.QUANTITY + " = ?,"                
                + Columns.PRICE + " = ? WHERE " + Columns.ID + " = ?";
        Number updatedCount = jdbcTemplate.update(sqlQuery,
                new Object[]{
                    maxKitchenOrderDetails.getOrderHeadId(),
                    maxKitchenOrderDetails.getProductCode(),
                    maxKitchenOrderDetails.getDescription(),
                    maxKitchenOrderDetails.getShutterFinish(),
                    maxKitchenOrderDetails.getWidth(),
                    maxKitchenOrderDetails.getHeight(),
                    maxKitchenOrderDetails.getDepth(),
                    maxKitchenOrderDetails.getStdPrice(),
                    maxKitchenOrderDetails.getQuantity(),
                    maxKitchenOrderDetails.getPrice(),                    
                    maxKitchenOrderDetails.getId()
                });
        maxKitchenOrderDetails = findById(maxKitchenOrderDetails.getId());
        return maxKitchenOrderDetails;
    }
}
