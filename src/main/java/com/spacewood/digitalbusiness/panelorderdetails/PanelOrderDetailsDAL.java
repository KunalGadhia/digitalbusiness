/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.panelorderdetails;

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
public class PanelOrderDetailsDAL {

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
        public static final String MATERIAL_PRICE = "material_price";

    }

    public static final String TABLE_NAME = "panel_order_details";

    private final SimpleJdbcInsert insertPanelOrderDetail;
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public PanelOrderDetailsDAL(DataSource dataSource) {
        jdbcTemplate = new JdbcTemplate(dataSource);
        insertPanelOrderDetail = new SimpleJdbcInsert(jdbcTemplate)
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
                        Columns.MATERIAL_PRICE
                )
                .usingGeneratedKeyColumns(Columns.ID);
    }

    public List<PanelOrderDetails> findAll(Integer offset) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE ORDER BY " + Columns.ID + " DESC LIMIT 10 OFFSET ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{offset}, new BeanPropertyRowMapper<>(PanelOrderDetails.class));
    }

    public PanelOrderDetails findById(Integer id) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.ID + " = ?";
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{id}, new BeanPropertyRowMapper<>(PanelOrderDetails.class));
    }

//    public Party findByName(String name) {       
//        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.DEALER_NAME + " = ?";        
//        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{name}, new BeanPropertyRowMapper<>(Party.class));
//    }
//
    public List<PanelOrderDetails> findByOrderHeadId(Integer orderHeadId) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.ORDER_HEAD_ID + " = ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{orderHeadId}, new BeanPropertyRowMapper<>(PanelOrderDetails.class));
    }
    
    public Integer findPriceByOrderHeadId(Integer orderHeadId) {
        String sqlQuery = "SELECT sum(price) FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.ORDER_HEAD_ID + " = ?";
        return jdbcTemplate.queryForInt(sqlQuery, orderHeadId);
    }

    public PanelOrderDetails insert(PanelOrderDetails panelOrderDetails) {
        System.out.println("Insert Order Detail :" + panelOrderDetails);
        Map<String, Object> parameters = new HashMap<>();
        parameters.put(Columns.ORDER_HEAD_ID, panelOrderDetails.getOrderHeadId());
        parameters.put(Columns.COLOR_ID, panelOrderDetails.getColorId());
        parameters.put(Columns.PRODUCT_CODE, panelOrderDetails.getProductCode());
        parameters.put(Columns.COMPONENT, panelOrderDetails.getComponent());
        parameters.put(Columns.MATERIAL, panelOrderDetails.getMaterial());
        parameters.put(Columns.LENGTH, panelOrderDetails.getLength());
        parameters.put(Columns.WIDTH, panelOrderDetails.getWidth());
        parameters.put(Columns.THICKNESS, panelOrderDetails.getThickness());
        parameters.put(Columns.QUANTITY, panelOrderDetails.getQuantity());
        parameters.put(Columns.PRICE, Math.round(panelOrderDetails.getPrice()));
        parameters.put(Columns.MATERIAL_PRICE, panelOrderDetails.getMaterialPrice());

        Number newId = insertPanelOrderDetail.executeAndReturnKey(parameters);
        panelOrderDetails = findById(newId.intValue());
        return panelOrderDetails;
    }

    public void delete(Integer id) {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET deleted=? WHERE " + Columns.ID + "=?";
        jdbcTemplate.update(sqlQuery, new Object[]{true, id});
    }

    public PanelOrderDetails update(PanelOrderDetails panelOrderDetails) {
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
                + Columns.MATERIAL_PRICE + " = ? WHERE " + Columns.ID + " = ?";
        Number updatedCount = jdbcTemplate.update(sqlQuery,
                new Object[]{
                    panelOrderDetails.getOrderHeadId(),
                    panelOrderDetails.getColorId(),
                    panelOrderDetails.getProductCode(),
                    panelOrderDetails.getComponent(),
                    panelOrderDetails.getMaterial(),
                    panelOrderDetails.getLength(),
                    panelOrderDetails.getWidth(),
                    panelOrderDetails.getThickness(),
                    panelOrderDetails.getQuantity(),
                    panelOrderDetails.getPrice(),
                    panelOrderDetails.getMaterialPrice(),
                    panelOrderDetails.getId()
                });
        panelOrderDetails = findById(panelOrderDetails.getId());
        return panelOrderDetails;
    }
}
