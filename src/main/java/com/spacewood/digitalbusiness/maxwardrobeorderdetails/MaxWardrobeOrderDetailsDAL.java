/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.maxwardrobeorderdetails;

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
public class MaxWardrobeOrderDetailsDAL {

    public static final class Columns {

        public static final String ID = "id";
        public static final String ORDER_HEAD_ID = "order_head_id";
        public static final String PRODUCT_CODE = "product_code";
        public static final String DESCRIPTION = "description";
        public static final String CARCASS = "carcass";
        public static final String SHUTTER_FINISH = "shutter_finish";
        public static final String CARCASS_PRICE = "carcass_price";
        public static final String SHUTTER_PRICE = "shutter_price";
        public static final String SOFT_HINGES_PRICE = "soft_hinges_price";
        public static final String WIDTH = "width";
        public static final String HEIGHT = "height";
        public static final String DEPTH = "depth";
        public static final String QUANTITY = "quantity";        
        public static final String PRICE = "price";
        public static final String REMARK = "remark";
        public static final String ORDER_FOR = "order_for";

    }

    public static final String TABLE_NAME = "max_wardrobe_order_details";

    private final SimpleJdbcInsert insertMaxWardrobeOrderDetail;
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public MaxWardrobeOrderDetailsDAL(DataSource dataSource) {
        jdbcTemplate = new JdbcTemplate(dataSource);
        insertMaxWardrobeOrderDetail = new SimpleJdbcInsert(jdbcTemplate)
                .withTableName(TABLE_NAME)
                .usingColumns(
                        Columns.ORDER_HEAD_ID,
                        Columns.PRODUCT_CODE,
                        Columns.DESCRIPTION,
                        Columns.CARCASS,
                        Columns.SHUTTER_FINISH,
                        Columns.CARCASS_PRICE,
                        Columns.SHUTTER_PRICE,
                        Columns.SOFT_HINGES_PRICE,
                        Columns.WIDTH,
                        Columns.HEIGHT,
                        Columns.DEPTH,                        
                        Columns.QUANTITY,
                        Columns.PRICE,
                        Columns.REMARK,
                        Columns.ORDER_FOR
                )
                .usingGeneratedKeyColumns(Columns.ID);
    }

    public List<MaxWardrobeOrderDetails> findAll(Integer offset) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE ORDER BY " + Columns.ID + " DESC LIMIT 10 OFFSET ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{offset}, new BeanPropertyRowMapper<>(MaxWardrobeOrderDetails.class));
    }

    public MaxWardrobeOrderDetails findById(Integer id) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.ID + " = ?";
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{id}, new BeanPropertyRowMapper<>(MaxWardrobeOrderDetails.class));
    }

//    public Party findByName(String name) {       
//        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.DEALER_NAME + " = ?";        
//        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{name}, new BeanPropertyRowMapper<>(Party.class));
//    }
//
    public List<MaxWardrobeOrderDetails> findByOrderHeadId(Integer orderHeadId) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.ORDER_HEAD_ID + " = ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{orderHeadId}, new BeanPropertyRowMapper<>(MaxWardrobeOrderDetails.class));
    }

    public MaxWardrobeOrderDetails insert(MaxWardrobeOrderDetails maxWardrobeOrderDetails) {
        System.out.println("Insert Order Detail :" + maxWardrobeOrderDetails);
        Map<String, Object> parameters = new HashMap<>();
        parameters.put(Columns.ORDER_HEAD_ID, maxWardrobeOrderDetails.getOrderHeadId());
        parameters.put(Columns.PRODUCT_CODE, maxWardrobeOrderDetails.getProductCode());
        parameters.put(Columns.DESCRIPTION, maxWardrobeOrderDetails.getDescription());
        parameters.put(Columns.CARCASS, maxWardrobeOrderDetails.getCarcass());
        parameters.put(Columns.SHUTTER_FINISH, maxWardrobeOrderDetails.getShutterFinish());
        parameters.put(Columns.CARCASS_PRICE, maxWardrobeOrderDetails.getCarcassPrice());
        parameters.put(Columns.SHUTTER_PRICE, maxWardrobeOrderDetails.getShutterPrice());
        parameters.put(Columns.SOFT_HINGES_PRICE, maxWardrobeOrderDetails.getSoftHingesPrice());
        parameters.put(Columns.WIDTH, maxWardrobeOrderDetails.getWidth());
        parameters.put(Columns.HEIGHT, maxWardrobeOrderDetails.getHeight());
        parameters.put(Columns.DEPTH, maxWardrobeOrderDetails.getDepth());        
        parameters.put(Columns.QUANTITY, maxWardrobeOrderDetails.getQuantity());
        parameters.put(Columns.PRICE, Math.round(maxWardrobeOrderDetails.getPrice()));
        parameters.put(Columns.REMARK, maxWardrobeOrderDetails.getRemark());
        parameters.put(Columns.ORDER_FOR, "MAX_WARDROBE");

        Number newId = insertMaxWardrobeOrderDetail.executeAndReturnKey(parameters);
        maxWardrobeOrderDetails = findById(newId.intValue());
        return maxWardrobeOrderDetails;
    }

    public void delete(Integer id) {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET deleted=? WHERE " + Columns.ID + "=?";
        jdbcTemplate.update(sqlQuery, new Object[]{true, id});
    }

    public MaxWardrobeOrderDetails update(MaxWardrobeOrderDetails maxWardrobeOrderDetails) {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET "
                + Columns.ORDER_HEAD_ID + " = ?,"
                + Columns.PRODUCT_CODE + " = ?, "
                + Columns.DESCRIPTION + " = ?,"
                + Columns.CARCASS + " = ?,"
                + Columns.SHUTTER_FINISH + " = ?,"
                + Columns.CARCASS_PRICE + " = ?,"
                + Columns.SHUTTER_PRICE + " = ?,"
                + Columns.SOFT_HINGES_PRICE + " = ?,"
                + Columns.WIDTH + " = ?,"
                + Columns.HEIGHT + " = ?,"
                + Columns.DEPTH + " = ?,"                
                + Columns.QUANTITY + " = ?,"
                + Columns.PRICE + " = ?,"
                + Columns.REMARK + " = ? WHERE " + Columns.ID + " = ?";
        Number updatedCount = jdbcTemplate.update(sqlQuery,
                new Object[]{
                    maxWardrobeOrderDetails.getOrderHeadId(),
                    maxWardrobeOrderDetails.getProductCode(),
                    maxWardrobeOrderDetails.getDescription(),
                    maxWardrobeOrderDetails.getCarcass(),
                    maxWardrobeOrderDetails.getShutterFinish(),
                    maxWardrobeOrderDetails.getCarcassPrice(),
                    maxWardrobeOrderDetails.getShutterPrice(),
                    maxWardrobeOrderDetails.getSoftHingesPrice(),
                    maxWardrobeOrderDetails.getWidth(),
                    maxWardrobeOrderDetails.getHeight(),
                    maxWardrobeOrderDetails.getDepth(),                    
                    maxWardrobeOrderDetails.getQuantity(),
                    maxWardrobeOrderDetails.getPrice(),
                    maxWardrobeOrderDetails.getRemark(),
                    maxWardrobeOrderDetails.getId()
                });
        maxWardrobeOrderDetails = findById(maxWardrobeOrderDetails.getId());
        return maxWardrobeOrderDetails;
    }
}
