/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.fillerorderdetails;

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
public class FillerOrderDetailsDAL {

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
        public static final String BSM = "bsm";
        public static final String ORDER_FOR = "order_for";

    }

    public static final String TABLE_NAME = "filler_order_details";

    private final SimpleJdbcInsert insertFillerOrderDetail;
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public FillerOrderDetailsDAL(DataSource dataSource) {
        jdbcTemplate = new JdbcTemplate(dataSource);
        insertFillerOrderDetail = new SimpleJdbcInsert(jdbcTemplate)
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
                        Columns.FINISH,
                        Columns.BSM,
                        Columns.ORDER_FOR
                )
                .usingGeneratedKeyColumns(Columns.ID);
    }

    public List<FillerOrderDetails> findAll(Integer offset) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE ORDER BY " + Columns.ID + " DESC LIMIT 10 OFFSET ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{offset}, new BeanPropertyRowMapper<>(FillerOrderDetails.class));
    }

    public FillerOrderDetails findById(Integer id) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.ID + " = ?";
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{id}, new BeanPropertyRowMapper<>(FillerOrderDetails.class));
    }

//    public Party findByName(String name) {       
//        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.DEALER_NAME + " = ?";        
//        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{name}, new BeanPropertyRowMapper<>(Party.class));
//    }
//
    public List<FillerOrderDetails> findByOrderHeadId(Integer orderHeadId) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.ORDER_HEAD_ID + " = ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{orderHeadId}, new BeanPropertyRowMapper<>(FillerOrderDetails.class));
    }

    public Integer findPriceByOrderHeadId(Integer orderHeadId) {
        String sqlQuery = "SELECT sum(price) FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.ORDER_HEAD_ID + " = ?";
        return jdbcTemplate.queryForInt(sqlQuery, orderHeadId);
    }

    public FillerOrderDetails insert(FillerOrderDetails fillerOrderDetails) {
        System.out.println("Insert Order Detail :" + fillerOrderDetails);
        Map<String, Object> parameters = new HashMap<>();
        parameters.put(Columns.ORDER_HEAD_ID, fillerOrderDetails.getOrderHeadId());
        parameters.put(Columns.COLOR_ID, fillerOrderDetails.getColorId());
        parameters.put(Columns.PRODUCT_CODE, fillerOrderDetails.getProductCode());
        parameters.put(Columns.COMPONENT, fillerOrderDetails.getComponent());
        parameters.put(Columns.MATERIAL, fillerOrderDetails.getMaterial());
        parameters.put(Columns.LENGTH, fillerOrderDetails.getLength());
        parameters.put(Columns.WIDTH, fillerOrderDetails.getWidth());
        parameters.put(Columns.THICKNESS, fillerOrderDetails.getThickness());
        parameters.put(Columns.QUANTITY, fillerOrderDetails.getQuantity());
        parameters.put(Columns.PRICE, Math.round(fillerOrderDetails.getPrice()));
        parameters.put(Columns.FINISH_PRICE, fillerOrderDetails.getFinishPrice());
        parameters.put(Columns.FINISH, fillerOrderDetails.getFinish());
        if (fillerOrderDetails.getBsm() == null) {
            parameters.put(Columns.BSM, 0);
        } else {
            parameters.put(Columns.BSM, fillerOrderDetails.getBsm());
        }
        parameters.put(Columns.ORDER_FOR, "FILLER");
        Number newId = insertFillerOrderDetail.executeAndReturnKey(parameters);
        fillerOrderDetails = findById(newId.intValue());
        return fillerOrderDetails;
    }

    public void delete(Integer id) {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET deleted=? WHERE " + Columns.ID + "=?";
        jdbcTemplate.update(sqlQuery, new Object[]{true, id});
    }

    public FillerOrderDetails update(FillerOrderDetails fillerOrderDetails) {
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
                + Columns.FINISH + " = ?,"
                + Columns.BSM + " = ? WHERE " + Columns.ID + " = ?";
        Number updatedCount = jdbcTemplate.update(sqlQuery,
                new Object[]{
                    fillerOrderDetails.getOrderHeadId(),
                    fillerOrderDetails.getColorId(),
                    fillerOrderDetails.getProductCode(),
                    fillerOrderDetails.getComponent(),
                    fillerOrderDetails.getMaterial(),
                    fillerOrderDetails.getLength(),
                    fillerOrderDetails.getWidth(),
                    fillerOrderDetails.getThickness(),
                    fillerOrderDetails.getQuantity(),
                    fillerOrderDetails.getPrice(),
                    fillerOrderDetails.getFinishPrice(),
                    fillerOrderDetails.getFinish(),
                    fillerOrderDetails.getBsm(),
                    fillerOrderDetails.getId()
                });
        fillerOrderDetails = findById(fillerOrderDetails.getId());
        return fillerOrderDetails;
    }
}
