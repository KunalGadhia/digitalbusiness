/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.orderdetail;

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
public class OrderDetailDAL {

    public static final class Columns {

        public static final String ID = "id";
        public static final String ORDER_HEAD_ID = "order_head_id";
        public static final String PRODUCT_CODE = "product_code";
        public static final String COMPONENT = "component";
        public static final String MATERIAL = "material";
        public static final String LENGTH = "length";
        public static final String WIDTH = "width";
        public static final String DEPTH = "depth";

    }

    public static final String TABLE_NAME = "order_details";

    private final SimpleJdbcInsert insertOrderDetail;
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public OrderDetailDAL(DataSource dataSource) {
        jdbcTemplate = new JdbcTemplate(dataSource);
        insertOrderDetail = new SimpleJdbcInsert(jdbcTemplate)
                .withTableName(TABLE_NAME)
                .usingColumns(
                        Columns.ORDER_HEAD_ID,
                        Columns.PRODUCT_CODE,
                        Columns.COMPONENT,
                        Columns.MATERIAL,
                        Columns.LENGTH,
                        Columns.WIDTH,
                        Columns.DEPTH
                )
                .usingGeneratedKeyColumns(Columns.ID);
    }

    public List<OrderDetail> findAll(Integer offset) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE ORDER BY " + Columns.ID + " DESC LIMIT 10 OFFSET ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{offset}, new BeanPropertyRowMapper<>(OrderDetail.class));
    }

    public OrderDetail findById(Integer id) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.ID + " = ?";
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{id}, new BeanPropertyRowMapper<>(OrderDetail.class));
    }

//    public Party findByName(String name) {       
//        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.DEALER_NAME + " = ?";        
//        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{name}, new BeanPropertyRowMapper<>(Party.class));
//    }
//
    public List<OrderDetail> findByOrderHeadId(Integer orderHeadId) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.ORDER_HEAD_ID + " = ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{orderHeadId}, new BeanPropertyRowMapper<>(OrderDetail.class));
    }

    public OrderDetail insert(OrderDetail orderDetail) {
        Map<String, Object> parameters = new HashMap<>();
        parameters.put(Columns.ORDER_HEAD_ID, orderDetail.getOrderHeadId());
        parameters.put(Columns.PRODUCT_CODE, orderDetail.getProductCode());
        parameters.put(Columns.COMPONENT, orderDetail.getComponent());
        parameters.put(Columns.MATERIAL, orderDetail.getMaterial());
        parameters.put(Columns.LENGTH, orderDetail.getLength());
        parameters.put(Columns.WIDTH, orderDetail.getWidth());
        parameters.put(Columns.DEPTH, orderDetail.getDepth());

        Number newId = insertOrderDetail.executeAndReturnKey(parameters);
        orderDetail = findById(newId.intValue());
        return orderDetail;
    }

    public void delete(Integer id) {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET deleted=? WHERE " + Columns.ID + "=?";
        jdbcTemplate.update(sqlQuery, new Object[]{true, id});
    }

    public OrderDetail update(OrderDetail orderDetail) {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET "
                + Columns.ORDER_HEAD_ID + " = ?,"
                + Columns.PRODUCT_CODE + " = ?, "
                + Columns.COMPONENT + " = ?,"
                + Columns.MATERIAL + " = ?,"
                + Columns.LENGTH + " = ?,"
                + Columns.WIDTH + " = ?,"
                + Columns.DEPTH + " = ? WHERE " + Columns.ID + " = ?";
        Number updatedCount = jdbcTemplate.update(sqlQuery,
                new Object[]{
                    orderDetail.getOrderHeadId(),
                    orderDetail.getProductCode(),
                    orderDetail.getComponent(),
                    orderDetail.getMaterial(),
                    orderDetail.getLength(),
                    orderDetail.getWidth(),
                    orderDetail.getDepth(),
                    orderDetail.getId()
                });
        orderDetail = findById(orderDetail.getId());
        return orderDetail;
    }

}
