/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.handleorderdetails;

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
public class HandleOrderDetailsDAL {
   public static final class Columns {

        public static final String ID = "id";
        public static final String ORDER_HEAD_ID = "order_head_id";        
        public static final String PRODUCT_CODE = "product_code";
        public static final String COMPONENT = "component";        
        public static final String LENGTH = "length";                
        public static final String QUANTITY = "quantity";
        public static final String PRICE = "price";
        public static final String FINISH = "finish";
        public static final String ORDER_FOR = "order_for";

    }

    public static final String TABLE_NAME = "handle_order_details";

    private final SimpleJdbcInsert insertHandleOrderDetail;
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public HandleOrderDetailsDAL(DataSource dataSource) {
        jdbcTemplate = new JdbcTemplate(dataSource);
        insertHandleOrderDetail = new SimpleJdbcInsert(jdbcTemplate)
                .withTableName(TABLE_NAME)
                .usingColumns(
                        Columns.ORDER_HEAD_ID,                        
                        Columns.PRODUCT_CODE,
                        Columns.COMPONENT,                        
                        Columns.LENGTH,                        
                        Columns.QUANTITY,
                        Columns.PRICE,
                        Columns.FINISH,
                        Columns.ORDER_FOR
                )
                .usingGeneratedKeyColumns(Columns.ID);
    }

    public List<HandleOrderDetails> findAll(Integer offset) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE ORDER BY " + Columns.ID + " DESC LIMIT 10 OFFSET ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{offset}, new BeanPropertyRowMapper<>(HandleOrderDetails.class));
    }

    public HandleOrderDetails findById(Integer id) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.ID + " = ?";
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{id}, new BeanPropertyRowMapper<>(HandleOrderDetails.class));
    }

//    public Party findByName(String name) {       
//        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.DEALER_NAME + " = ?";        
//        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{name}, new BeanPropertyRowMapper<>(Party.class));
//    }
//
    public List<HandleOrderDetails> findByOrderHeadId(Integer orderHeadId) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.ORDER_HEAD_ID + " = ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{orderHeadId}, new BeanPropertyRowMapper<>(HandleOrderDetails.class));
    }
    
    public Integer findPriceByOrderHeadId(Integer orderHeadId) {
        String sqlQuery = "SELECT sum(price) FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.ORDER_HEAD_ID + " = ?";
        return jdbcTemplate.queryForInt(sqlQuery, orderHeadId);
    }

    public HandleOrderDetails insert(HandleOrderDetails handleOrderDetails) {
        System.out.println("Insert Order Detail :" + handleOrderDetails);
        Map<String, Object> parameters = new HashMap<>();
        parameters.put(Columns.ORDER_HEAD_ID, handleOrderDetails.getOrderHeadId());        
        parameters.put(Columns.PRODUCT_CODE, handleOrderDetails.getProductCode());
        parameters.put(Columns.COMPONENT, handleOrderDetails.getComponent());        
        parameters.put(Columns.LENGTH, handleOrderDetails.getLength());        
        parameters.put(Columns.QUANTITY, handleOrderDetails.getQuantity());
        parameters.put(Columns.PRICE, Math.round(handleOrderDetails.getPrice()));
        parameters.put(Columns.FINISH, handleOrderDetails.getFinish());
        parameters.put(Columns.ORDER_FOR, "HANDLE");

        Number newId = insertHandleOrderDetail.executeAndReturnKey(parameters);
        handleOrderDetails = findById(newId.intValue());
        return handleOrderDetails;
    }

    public void delete(Integer id) {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET deleted=? WHERE " + Columns.ID + "=?";
        jdbcTemplate.update(sqlQuery, new Object[]{true, id});
    }

    public HandleOrderDetails update(HandleOrderDetails handleOrderDetails) {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET "
                + Columns.ORDER_HEAD_ID + " = ?,"                
                + Columns.PRODUCT_CODE + " = ?, "
                + Columns.COMPONENT + " = ?,"                
                + Columns.LENGTH + " = ?,"                
                + Columns.QUANTITY + " = ?,"
                + Columns.PRICE + " = ?,"
                + Columns.FINISH + " = ? WHERE " + Columns.ID + " = ?";
        Number updatedCount = jdbcTemplate.update(sqlQuery,
                new Object[]{
                    handleOrderDetails.getOrderHeadId(),                    
                    handleOrderDetails.getProductCode(),
                    handleOrderDetails.getComponent(),                    
                    handleOrderDetails.getLength(),                    
                    handleOrderDetails.getQuantity(),
                    handleOrderDetails.getPrice(),
                    handleOrderDetails.getFinish(),
                    handleOrderDetails.getId()
                });
        handleOrderDetails = findById(handleOrderDetails.getId());
        return handleOrderDetails;
    } 
}
