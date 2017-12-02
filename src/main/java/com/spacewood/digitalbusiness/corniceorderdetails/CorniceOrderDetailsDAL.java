/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.corniceorderdetails;

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
public class CorniceOrderDetailsDAL {
    public static final class Columns {

        public static final String ID = "id";
        public static final String ORDER_HEAD_ID = "order_head_id";
        public static final String COLOR_ID = "color_id";
        public static final String PRODUCT_CODE = "product_code";
        public static final String COMPONENT = "component";
        public static final String MATERIAL = "material";
        public static final String LENGTH = "length";
        public static final String WIDTH = "width";
        public static final String THICKNESS = "thickness";
        public static final String QUANTITY = "quantity";
        public static final String PRICE = "price";
        public static final String FINISH_PRICE = "finish_price";
        public static final String FINISH = "finish";        

    }

    public static final String TABLE_NAME = "cornice_order_details";

    private final SimpleJdbcInsert insertCorniceOrderDetail;
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public CorniceOrderDetailsDAL(DataSource dataSource) {
        jdbcTemplate = new JdbcTemplate(dataSource);
        insertCorniceOrderDetail = new SimpleJdbcInsert(jdbcTemplate)
                .withTableName(TABLE_NAME)
                .usingColumns(
                        Columns.ORDER_HEAD_ID,
                        Columns.COLOR_ID,
                        Columns.PRODUCT_CODE,
                        Columns.COMPONENT,
                        Columns.MATERIAL,
                        Columns.LENGTH,
                        Columns.WIDTH,
                        Columns.THICKNESS,
                        Columns.QUANTITY,
                        Columns.PRICE,
                        Columns.FINISH_PRICE,
                        Columns.FINISH                        
                )
                .usingGeneratedKeyColumns(Columns.ID);
    }

    public List<CorniceOrderDetails> findAll(Integer offset) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE ORDER BY " + Columns.ID + " DESC LIMIT 10 OFFSET ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{offset}, new BeanPropertyRowMapper<>(CorniceOrderDetails.class));
    }

    public CorniceOrderDetails findById(Integer id) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.ID + " = ?";
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{id}, new BeanPropertyRowMapper<>(CorniceOrderDetails.class));
    }

//    public Party findByName(String name) {       
//        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.DEALER_NAME + " = ?";        
//        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{name}, new BeanPropertyRowMapper<>(Party.class));
//    }
//
    public List<CorniceOrderDetails> findByOrderHeadId(Integer orderHeadId) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.ORDER_HEAD_ID + " = ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{orderHeadId}, new BeanPropertyRowMapper<>(CorniceOrderDetails.class));
    }

    public Integer findPriceByOrderHeadId(Integer orderHeadId) {
        String sqlQuery = "SELECT sum(price) FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.ORDER_HEAD_ID + " = ?";
        return jdbcTemplate.queryForInt(sqlQuery, orderHeadId);
    }

    public CorniceOrderDetails insert(CorniceOrderDetails corniceOrderDetails) {
        System.out.println("Insert Order Detail :" + corniceOrderDetails);
        Map<String, Object> parameters = new HashMap<>();
        parameters.put(Columns.ORDER_HEAD_ID, corniceOrderDetails.getOrderHeadId());
        parameters.put(Columns.COLOR_ID, corniceOrderDetails.getColorId());
        parameters.put(Columns.PRODUCT_CODE, corniceOrderDetails.getProductCode());
        parameters.put(Columns.COMPONENT, corniceOrderDetails.getComponent());
        parameters.put(Columns.MATERIAL, corniceOrderDetails.getMaterial());
        parameters.put(Columns.LENGTH, corniceOrderDetails.getLength());
        parameters.put(Columns.WIDTH, corniceOrderDetails.getWidth());
        parameters.put(Columns.THICKNESS, corniceOrderDetails.getThickness());
        parameters.put(Columns.QUANTITY, corniceOrderDetails.getQuantity());
        parameters.put(Columns.PRICE, Math.round(corniceOrderDetails.getPrice()));
        parameters.put(Columns.FINISH_PRICE, corniceOrderDetails.getFinishPrice());
        parameters.put(Columns.FINISH, corniceOrderDetails.getFinish());        
        Number newId = insertCorniceOrderDetail.executeAndReturnKey(parameters);
        corniceOrderDetails = findById(newId.intValue());
        return corniceOrderDetails;
    }

    public void delete(Integer id) {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET deleted=? WHERE " + Columns.ID + "=?";
        jdbcTemplate.update(sqlQuery, new Object[]{true, id});
    }

    public CorniceOrderDetails update(CorniceOrderDetails corniceOrderDetails) {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET "
                + Columns.ORDER_HEAD_ID + " = ?,"
                + Columns.COLOR_ID + " = ?,"
                + Columns.PRODUCT_CODE + " = ?, "
                + Columns.COMPONENT + " = ?,"
                + Columns.MATERIAL + " = ?,"
                + Columns.LENGTH + " = ?,"
                + Columns.WIDTH + " = ?,"
                + Columns.THICKNESS + " = ?,"
                + Columns.QUANTITY + " = ?,"
                + Columns.PRICE + " = ?,"
                + Columns.FINISH_PRICE + " = ?,"                
                + Columns.FINISH + " = ? WHERE " + Columns.ID + " = ?";
        Number updatedCount = jdbcTemplate.update(sqlQuery,
                new Object[]{
                    corniceOrderDetails.getOrderHeadId(),
                    corniceOrderDetails.getColorId(),
                    corniceOrderDetails.getProductCode(),
                    corniceOrderDetails.getComponent(),
                    corniceOrderDetails.getMaterial(),
                    corniceOrderDetails.getLength(),
                    corniceOrderDetails.getWidth(),
                    corniceOrderDetails.getThickness(),
                    corniceOrderDetails.getQuantity(),
                    corniceOrderDetails.getPrice(),
                    corniceOrderDetails.getFinishPrice(),
                    corniceOrderDetails.getFinish(),                    
                    corniceOrderDetails.getId()
                });
        corniceOrderDetails = findById(corniceOrderDetails.getId());
        return corniceOrderDetails;
    }
}
