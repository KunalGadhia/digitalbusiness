/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.infinitywardrobemrporderdetails;

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
public class InfinityWardrobeMrpOrderDetailsDAL {

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

    public static final String TABLE_NAME = "infinity_wardrobe_mrp_order_details";

    private final SimpleJdbcInsert insertInfinityWardrobeMrpOrderDetail;
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public InfinityWardrobeMrpOrderDetailsDAL(DataSource dataSource) {
        jdbcTemplate = new JdbcTemplate(dataSource);
        insertInfinityWardrobeMrpOrderDetail = new SimpleJdbcInsert(jdbcTemplate)
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

    public List<InfinityWardrobeMrpOrderDetails> findAll(Integer offset) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE ORDER BY " + Columns.ID + " DESC LIMIT 10 OFFSET ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{offset}, new BeanPropertyRowMapper<>(InfinityWardrobeMrpOrderDetails.class));
    }

    public InfinityWardrobeMrpOrderDetails findById(Integer id) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.ID + " = ?";
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{id}, new BeanPropertyRowMapper<>(InfinityWardrobeMrpOrderDetails.class));
    }

//    public Party findByName(String name) {       
//        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.DEALER_NAME + " = ?";        
//        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{name}, new BeanPropertyRowMapper<>(Party.class));
//    }
//
    public List<InfinityWardrobeMrpOrderDetails> findByOrderHeadId(Integer orderHeadId) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.ORDER_HEAD_ID + " = ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{orderHeadId}, new BeanPropertyRowMapper<>(InfinityWardrobeMrpOrderDetails.class));
    }

    public Integer findPriceByOrderHeadId(Integer orderHeadId) {
        String sqlQuery = "SELECT sum(price) FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.ORDER_HEAD_ID + " = ?";
        return jdbcTemplate.queryForInt(sqlQuery, orderHeadId);
    }

    public InfinityWardrobeMrpOrderDetails insert(InfinityWardrobeMrpOrderDetails infinityWardrobeMrpOrderDetails) {
        System.out.println("Insert Order Detail :" + infinityWardrobeMrpOrderDetails);
        Map<String, Object> parameters = new HashMap<>();
        parameters.put(Columns.ORDER_HEAD_ID, infinityWardrobeMrpOrderDetails.getOrderHeadId());
        parameters.put(Columns.PRODUCT_CODE, infinityWardrobeMrpOrderDetails.getProductCode());        
        parameters.put(Columns.DESCRIPTION, infinityWardrobeMrpOrderDetails.getDescription());
        parameters.put(Columns.CARCASS, infinityWardrobeMrpOrderDetails.getCarcass());
        parameters.put(Columns.CARCASS_PRICE, infinityWardrobeMrpOrderDetails.getCarcassPrice());
        parameters.put(Columns.SHUTTER, infinityWardrobeMrpOrderDetails.getShutter());
        parameters.put(Columns.SHUTTER_PRICE, infinityWardrobeMrpOrderDetails.getShutterPrice());
        parameters.put(Columns.HINGES, infinityWardrobeMrpOrderDetails.getHinges());
        parameters.put(Columns.HINGES_PRICE, infinityWardrobeMrpOrderDetails.getHingesPrice());
        parameters.put(Columns.HANDLE, infinityWardrobeMrpOrderDetails.getHandle());
        parameters.put(Columns.HANDLE_PRICE, infinityWardrobeMrpOrderDetails.getHandlePrice());
        parameters.put(Columns.WIDTH, infinityWardrobeMrpOrderDetails.getWidth());
        parameters.put(Columns.DEPTH, infinityWardrobeMrpOrderDetails.getDepth());
        parameters.put(Columns.HEIGHT, infinityWardrobeMrpOrderDetails.getHeight());
        parameters.put(Columns.CARCASS_COLOR, infinityWardrobeMrpOrderDetails.getCarcassColor());
        parameters.put(Columns.SHUTTER_COLOR, infinityWardrobeMrpOrderDetails.getShutterColor());
        parameters.put(Columns.QUANTITY, infinityWardrobeMrpOrderDetails.getQuantity());                        
        parameters.put(Columns.PRICE, infinityWardrobeMrpOrderDetails.getPrice());        
        parameters.put(Columns.REMARK, infinityWardrobeMrpOrderDetails.getRemark());        

        Number newId = insertInfinityWardrobeMrpOrderDetail.executeAndReturnKey(parameters);
        infinityWardrobeMrpOrderDetails = findById(newId.intValue());
        return infinityWardrobeMrpOrderDetails;
    }

    public void delete(Integer id) {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET deleted=? WHERE " + Columns.ID + "=?";
        jdbcTemplate.update(sqlQuery, new Object[]{true, id});
    }

    public InfinityWardrobeMrpOrderDetails update(InfinityWardrobeMrpOrderDetails infinityWardrobeMrpOrderDetails) {
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
                    infinityWardrobeMrpOrderDetails.getOrderHeadId(),
                    infinityWardrobeMrpOrderDetails.getProductCode(),                    
                    infinityWardrobeMrpOrderDetails.getDescription(),
                    infinityWardrobeMrpOrderDetails.getCarcass(),
                    infinityWardrobeMrpOrderDetails.getCarcassPrice(),
                    infinityWardrobeMrpOrderDetails.getShutter(),
                    infinityWardrobeMrpOrderDetails.getShutterPrice(),
                    infinityWardrobeMrpOrderDetails.getHinges(),
                    infinityWardrobeMrpOrderDetails.getHingesPrice(),
                    infinityWardrobeMrpOrderDetails.getHandle(),
                    infinityWardrobeMrpOrderDetails.getHandlePrice(),
                    infinityWardrobeMrpOrderDetails.getWidth(),
                    infinityWardrobeMrpOrderDetails.getDepth(),
                    infinityWardrobeMrpOrderDetails.getHeight(),
                    infinityWardrobeMrpOrderDetails.getCarcassColor(),
                    infinityWardrobeMrpOrderDetails.getShutterColor(),
                    infinityWardrobeMrpOrderDetails.getQuantity(),                                                            
                    infinityWardrobeMrpOrderDetails.getPrice(),                    
                    infinityWardrobeMrpOrderDetails.getRemark(),                    
                    infinityWardrobeMrpOrderDetails.getId()
                });
        infinityWardrobeMrpOrderDetails = findById(infinityWardrobeMrpOrderDetails.getId());
        return infinityWardrobeMrpOrderDetails;
    }
}
