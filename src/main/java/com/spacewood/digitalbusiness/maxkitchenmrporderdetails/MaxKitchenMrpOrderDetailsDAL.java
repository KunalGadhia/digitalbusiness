/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.maxkitchenmrporderdetails;

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
public class MaxKitchenMrpOrderDetailsDAL {
    public static final class Columns {

        public static final String ID = "id";
        public static final String ORDER_HEAD_ID = "order_head_id";
        public static final String PRODUCT_CODE = "product_code";        
        public static final String DESCRIPTION = "description";
        public static final String CARCASS = "carcass";
        public static final String CARCASS_PRICE = "carcass_price";
        public static final String SHUTTER = "shutter";
        public static final String SHUTTER_PRICE = "shutter_price";
        public static final String HINGES = "hinges";
        public static final String HINGES_PRICE = "hinges_price";
        public static final String HANDLE = "handle";
        public static final String HANDLE_PRICE = "handle_price";
        public static final String ACCESSORIES_PRICE = "accessories_price";
        public static final String WIDTH = "width";
        public static final String DEPTH = "depth";
        public static final String HEIGHT = "height";
        public static final String CARCASS_COLOR = "carcass_color";
        public static final String SHUTTER_COLOR = "shutter_color";
        public static final String QUANTITY = "quantity";                        
        public static final String PRICE = "price";        
        public static final String REMARK = "remark";        
    }

    public static final String TABLE_NAME = "max_kitchen_mrp_order_details";

    private final SimpleJdbcInsert insertMaxKitchenMrpOrderDetail;
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public MaxKitchenMrpOrderDetailsDAL(DataSource dataSource) {
        jdbcTemplate = new JdbcTemplate(dataSource);
        insertMaxKitchenMrpOrderDetail = new SimpleJdbcInsert(jdbcTemplate)
                .withTableName(TABLE_NAME)
                .usingColumns(
                        Columns.ORDER_HEAD_ID,
                        Columns.PRODUCT_CODE,                        
                        Columns.DESCRIPTION,
                        Columns.CARCASS,
                        Columns.CARCASS_PRICE,
                        Columns.SHUTTER,
                        Columns.SHUTTER_PRICE,
                        Columns.HINGES,
                        Columns.HINGES_PRICE,
                        Columns.HANDLE,
                        Columns.HANDLE_PRICE,
                        Columns.ACCESSORIES_PRICE,
                        Columns.WIDTH,
                        Columns.DEPTH,
                        Columns.HEIGHT,
                        Columns.CARCASS_COLOR,
                        Columns.SHUTTER_COLOR,
                        Columns.QUANTITY,                        
                        Columns.PRICE,
                        Columns.REMARK                        
                )
                .usingGeneratedKeyColumns(Columns.ID);
    }

    public List<MaxKitchenMrpOrderDetails> findAll(Integer offset) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE ORDER BY " + Columns.ID + " DESC LIMIT 10 OFFSET ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{offset}, new BeanPropertyRowMapper<>(MaxKitchenMrpOrderDetails.class));
    }

    public MaxKitchenMrpOrderDetails findById(Integer id) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.ID + " = ?";
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{id}, new BeanPropertyRowMapper<>(MaxKitchenMrpOrderDetails.class));
    }

//    public Party findByName(String name) {       
//        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.DEALER_NAME + " = ?";        
//        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{name}, new BeanPropertyRowMapper<>(Party.class));
//    }
//
    public List<MaxKitchenMrpOrderDetails> findByOrderHeadId(Integer orderHeadId) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.ORDER_HEAD_ID + " = ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{orderHeadId}, new BeanPropertyRowMapper<>(MaxKitchenMrpOrderDetails.class));
    }

    public Integer findPriceByOrderHeadId(Integer orderHeadId) {
        String sqlQuery = "SELECT sum(price) FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.ORDER_HEAD_ID + " = ?";
        return jdbcTemplate.queryForInt(sqlQuery, orderHeadId);
    }

    public MaxKitchenMrpOrderDetails insert(MaxKitchenMrpOrderDetails maxKitchenMrpOrderDetails) {
        System.out.println("Insert Order Detail :" + maxKitchenMrpOrderDetails);
        Map<String, Object> parameters = new HashMap<>();
        parameters.put(Columns.ORDER_HEAD_ID, maxKitchenMrpOrderDetails.getOrderHeadId());
        parameters.put(Columns.PRODUCT_CODE, maxKitchenMrpOrderDetails.getProductCode());        
        parameters.put(Columns.DESCRIPTION, maxKitchenMrpOrderDetails.getDescription());
        parameters.put(Columns.CARCASS, maxKitchenMrpOrderDetails.getCarcass());
        parameters.put(Columns.CARCASS_PRICE, maxKitchenMrpOrderDetails.getCarcassPrice());
        parameters.put(Columns.SHUTTER, maxKitchenMrpOrderDetails.getShutter());
        parameters.put(Columns.SHUTTER_PRICE, maxKitchenMrpOrderDetails.getShutterPrice());
        parameters.put(Columns.HINGES, maxKitchenMrpOrderDetails.getHinges());
        parameters.put(Columns.HINGES_PRICE, maxKitchenMrpOrderDetails.getHingesPrice());
        parameters.put(Columns.HANDLE, maxKitchenMrpOrderDetails.getHandle());
        parameters.put(Columns.HANDLE_PRICE, maxKitchenMrpOrderDetails.getHandlePrice());
        parameters.put(Columns.ACCESSORIES_PRICE, maxKitchenMrpOrderDetails.getAccessoriesPrice());
        parameters.put(Columns.WIDTH, maxKitchenMrpOrderDetails.getWidth());
        parameters.put(Columns.DEPTH, maxKitchenMrpOrderDetails.getDepth());
        parameters.put(Columns.HEIGHT, maxKitchenMrpOrderDetails.getHeight());
        parameters.put(Columns.CARCASS_COLOR, maxKitchenMrpOrderDetails.getCarcassColor());
        parameters.put(Columns.SHUTTER_COLOR, maxKitchenMrpOrderDetails.getShutterColor());
        parameters.put(Columns.QUANTITY, maxKitchenMrpOrderDetails.getQuantity());                        
        parameters.put(Columns.PRICE, maxKitchenMrpOrderDetails.getPrice());        
        parameters.put(Columns.REMARK, maxKitchenMrpOrderDetails.getRemark());        

        Number newId = insertMaxKitchenMrpOrderDetail.executeAndReturnKey(parameters);
        maxKitchenMrpOrderDetails = findById(newId.intValue());
        return maxKitchenMrpOrderDetails;
    }

    public void delete(Integer id) {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET deleted=? WHERE " + Columns.ID + "=?";
        jdbcTemplate.update(sqlQuery, new Object[]{true, id});
    }

    public MaxKitchenMrpOrderDetails update(MaxKitchenMrpOrderDetails maxKitchenMrpOrderDetails) {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET "
                + Columns.ORDER_HEAD_ID + " = ?,"
                + Columns.PRODUCT_CODE + " = ?,"                
                + Columns.DESCRIPTION + " = ?,"
                + Columns.CARCASS + " = ?,"
                + Columns.CARCASS_PRICE + " = ?,"
                + Columns.SHUTTER + " = ?,"
                + Columns.SHUTTER_PRICE + " = ?,"
                + Columns.HINGES + " = ?,"
                + Columns.HINGES_PRICE + " = ?,"
                + Columns.HANDLE + " = ?,"
                + Columns.HANDLE_PRICE + " = ?,"
                + Columns.ACCESSORIES_PRICE + " = ?,"
                + Columns.WIDTH + " = ?,"
                + Columns.DEPTH + " = ?,"
                + Columns.HEIGHT + " = ?,"
                + Columns.CARCASS_COLOR + " = ?,"
                + Columns.SHUTTER_COLOR + " = ?,"
                + Columns.QUANTITY + " = ?,"                                                
                + Columns.PRICE + " = ?,"                
                + Columns.REMARK + " = ? WHERE " + Columns.ID + " = ?";
        Number updatedCount = jdbcTemplate.update(sqlQuery,
                new Object[]{
                    maxKitchenMrpOrderDetails.getOrderHeadId(),
                    maxKitchenMrpOrderDetails.getProductCode(),                    
                    maxKitchenMrpOrderDetails.getDescription(),
                    maxKitchenMrpOrderDetails.getCarcass(),
                    maxKitchenMrpOrderDetails.getCarcassPrice(),
                    maxKitchenMrpOrderDetails.getShutter(),
                    maxKitchenMrpOrderDetails.getShutterPrice(),
                    maxKitchenMrpOrderDetails.getHinges(),
                    maxKitchenMrpOrderDetails.getHingesPrice(),
                    maxKitchenMrpOrderDetails.getHandle(),
                    maxKitchenMrpOrderDetails.getHandlePrice(),
                    maxKitchenMrpOrderDetails.getAccessoriesPrice(),
                    maxKitchenMrpOrderDetails.getWidth(),
                    maxKitchenMrpOrderDetails.getDepth(),
                    maxKitchenMrpOrderDetails.getHeight(),
                    maxKitchenMrpOrderDetails.getCarcassColor(),
                    maxKitchenMrpOrderDetails.getShutterColor(),
                    maxKitchenMrpOrderDetails.getQuantity(),                                                            
                    maxKitchenMrpOrderDetails.getPrice(),                    
                    maxKitchenMrpOrderDetails.getRemark(),                    
                    maxKitchenMrpOrderDetails.getId()
                });
        maxKitchenMrpOrderDetails = findById(maxKitchenMrpOrderDetails.getId());
        return maxKitchenMrpOrderDetails;
    }
}
