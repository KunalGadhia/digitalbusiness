/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.maxwardrobemrporderdetails;

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
public class MaxWardrobesMrpOrderDetailsDAL {
    
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
        public static final String WIDTH = "width";
        public static final String DEPTH = "depth";
        public static final String HEIGHT = "height";
        public static final String CARCASS_COLOR = "carcass_color";
        public static final String SHUTTER_COLOR = "shutter_color";
        public static final String QUANTITY = "quantity";                        
        public static final String PRICE = "price";        
        public static final String REMARK = "remark";        
    }

    public static final String TABLE_NAME = "max_wardrobe_mrp_order_details";

    private final SimpleJdbcInsert insertMaxWardrobeMrpOrderDetail;
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public MaxWardrobesMrpOrderDetailsDAL(DataSource dataSource) {
        jdbcTemplate = new JdbcTemplate(dataSource);
        insertMaxWardrobeMrpOrderDetail = new SimpleJdbcInsert(jdbcTemplate)
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

    public List<MaxWardrobesMrpOrderDetails> findAll(Integer offset) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE ORDER BY " + Columns.ID + " DESC LIMIT 10 OFFSET ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{offset}, new BeanPropertyRowMapper<>(MaxWardrobesMrpOrderDetails.class));
    }

    public MaxWardrobesMrpOrderDetails findById(Integer id) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.ID + " = ?";
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{id}, new BeanPropertyRowMapper<>(MaxWardrobesMrpOrderDetails.class));
    }

//    public Party findByName(String name) {       
//        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.DEALER_NAME + " = ?";        
//        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{name}, new BeanPropertyRowMapper<>(Party.class));
//    }
//
    public List<MaxWardrobesMrpOrderDetails> findByOrderHeadId(Integer orderHeadId) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.ORDER_HEAD_ID + " = ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{orderHeadId}, new BeanPropertyRowMapper<>(MaxWardrobesMrpOrderDetails.class));
    }

    public Integer findPriceByOrderHeadId(Integer orderHeadId) {
        String sqlQuery = "SELECT sum(price) FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.ORDER_HEAD_ID + " = ?";
        return jdbcTemplate.queryForInt(sqlQuery, orderHeadId);
    }

    public MaxWardrobesMrpOrderDetails insert(MaxWardrobesMrpOrderDetails maxWardrobeMrpOrderDetails) {
        System.out.println("Insert Order Detail :" + maxWardrobeMrpOrderDetails);
        Map<String, Object> parameters = new HashMap<>();
        parameters.put(Columns.ORDER_HEAD_ID, maxWardrobeMrpOrderDetails.getOrderHeadId());
        parameters.put(Columns.PRODUCT_CODE, maxWardrobeMrpOrderDetails.getProductCode());        
        parameters.put(Columns.DESCRIPTION, maxWardrobeMrpOrderDetails.getDescription());
        parameters.put(Columns.CARCASS, maxWardrobeMrpOrderDetails.getCarcass());
        parameters.put(Columns.CARCASS_PRICE, maxWardrobeMrpOrderDetails.getCarcassPrice());
        parameters.put(Columns.SHUTTER, maxWardrobeMrpOrderDetails.getShutter());
        parameters.put(Columns.SHUTTER_PRICE, maxWardrobeMrpOrderDetails.getShutterPrice());
        parameters.put(Columns.HINGES, maxWardrobeMrpOrderDetails.getHinges());
        parameters.put(Columns.HINGES_PRICE, maxWardrobeMrpOrderDetails.getHingesPrice());
        parameters.put(Columns.HANDLE, maxWardrobeMrpOrderDetails.getHandle());
        parameters.put(Columns.HANDLE_PRICE, maxWardrobeMrpOrderDetails.getHandlePrice());
        parameters.put(Columns.WIDTH, maxWardrobeMrpOrderDetails.getWidth());
        parameters.put(Columns.DEPTH, maxWardrobeMrpOrderDetails.getDepth());
        parameters.put(Columns.HEIGHT, maxWardrobeMrpOrderDetails.getHeight());
        parameters.put(Columns.CARCASS_COLOR, maxWardrobeMrpOrderDetails.getCarcassColor());
        parameters.put(Columns.SHUTTER_COLOR, maxWardrobeMrpOrderDetails.getShutterColor());
        parameters.put(Columns.QUANTITY, maxWardrobeMrpOrderDetails.getQuantity());                        
        parameters.put(Columns.PRICE, maxWardrobeMrpOrderDetails.getPrice());        
        parameters.put(Columns.REMARK, maxWardrobeMrpOrderDetails.getRemark());        

        Number newId = insertMaxWardrobeMrpOrderDetail.executeAndReturnKey(parameters);
        maxWardrobeMrpOrderDetails = findById(newId.intValue());
        return maxWardrobeMrpOrderDetails;
    }

    public void delete(Integer id) {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET deleted=? WHERE " + Columns.ID + "=?";
        jdbcTemplate.update(sqlQuery, new Object[]{true, id});
    }

    public MaxWardrobesMrpOrderDetails update(MaxWardrobesMrpOrderDetails maxWardrobeMrpOrderDetails) {
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
                    maxWardrobeMrpOrderDetails.getOrderHeadId(),
                    maxWardrobeMrpOrderDetails.getProductCode(),                    
                    maxWardrobeMrpOrderDetails.getDescription(),
                    maxWardrobeMrpOrderDetails.getCarcass(),
                    maxWardrobeMrpOrderDetails.getCarcassPrice(),
                    maxWardrobeMrpOrderDetails.getShutter(),
                    maxWardrobeMrpOrderDetails.getShutterPrice(),
                    maxWardrobeMrpOrderDetails.getHinges(),
                    maxWardrobeMrpOrderDetails.getHingesPrice(),
                    maxWardrobeMrpOrderDetails.getHandle(),
                    maxWardrobeMrpOrderDetails.getHandlePrice(),
                    maxWardrobeMrpOrderDetails.getWidth(),
                    maxWardrobeMrpOrderDetails.getDepth(),
                    maxWardrobeMrpOrderDetails.getHeight(),
                    maxWardrobeMrpOrderDetails.getCarcassColor(),
                    maxWardrobeMrpOrderDetails.getShutterColor(),
                    maxWardrobeMrpOrderDetails.getQuantity(),                                                            
                    maxWardrobeMrpOrderDetails.getPrice(),                    
                    maxWardrobeMrpOrderDetails.getRemark(),                    
                    maxWardrobeMrpOrderDetails.getId()
                });
        maxWardrobeMrpOrderDetails = findById(maxWardrobeMrpOrderDetails.getId());
        return maxWardrobeMrpOrderDetails;
    }
}
