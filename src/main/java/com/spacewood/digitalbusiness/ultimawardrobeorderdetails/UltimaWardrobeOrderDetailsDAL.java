/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.ultimawardrobeorderdetails;

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
public class UltimaWardrobeOrderDetailsDAL {

    public static final class Columns {

        public static final String ID = "id";
        public static final String ORDER_HEAD_ID = "order_head_id";
        public static final String PRODUCT_CODE = "product_code";
        public static final String COMPONENT = "component";
        public static final String DESCRIPTION = "description";
        public static final String CARCASS_MATERIAL = "carcass_material";
        public static final String SHUTTER_FINISH = "shutter_finish";
        public static final String HANDLE = "handle";
        public static final String WIDTH = "width";
        public static final String DEPTH = "depth";
        public static final String HEIGHT = "height";
        public static final String QUANTITY = "quantity";
        public static final String CARCASS_PRICE = "carcass_price";
        public static final String SHUTTER_PRICE = "shutter_price";
        public static final String HANDLE_PRICE = "handle_price";
        public static final String PRICE = "price";
        public static final String CARCASS_COLOR_ID = "carcass_color_id";
        public static final String SHUTTER_COLOR_ID = "shutter_color_id";
        public static final String CARCASS_COLOR_CODE = "carcass_color_code";
        public static final String SHUTTER_COLOR_CODE = "shutter_color_code";
        public static final String REMARK = "remark";
        public static final String ORDER_FOR = "order_for";
    }

    public static final String TABLE_NAME = "ultima_wardrobe_order_details";

    private final SimpleJdbcInsert insertUltimaWardrobeOrderDetail;
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public UltimaWardrobeOrderDetailsDAL(DataSource dataSource) {
        jdbcTemplate = new JdbcTemplate(dataSource);
        insertUltimaWardrobeOrderDetail = new SimpleJdbcInsert(jdbcTemplate)
                .withTableName(TABLE_NAME)
                .usingColumns(
                        Columns.ORDER_HEAD_ID,
                        Columns.PRODUCT_CODE,
                        Columns.COMPONENT,
                        Columns.DESCRIPTION,
                        Columns.CARCASS_MATERIAL,
                        Columns.SHUTTER_FINISH,
                        Columns.HANDLE,
                        Columns.WIDTH,
                        Columns.DEPTH,
                        Columns.HEIGHT,
                        Columns.QUANTITY,
                        Columns.CARCASS_PRICE,
                        Columns.SHUTTER_PRICE,
                        Columns.HANDLE_PRICE,
                        Columns.PRICE,
                        Columns.CARCASS_COLOR_ID,
                        Columns.SHUTTER_COLOR_ID,
                        Columns.CARCASS_COLOR_CODE,
                        Columns.SHUTTER_COLOR_ID,
                        Columns.REMARK,
                        Columns.ORDER_FOR
                )
                .usingGeneratedKeyColumns(Columns.ID);
    }

    public List<UltimaWardrobeOrderDetails> findAll(Integer offset) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE ORDER BY " + Columns.ID + " DESC LIMIT 10 OFFSET ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{offset}, new BeanPropertyRowMapper<>(UltimaWardrobeOrderDetails.class));
    }

    public UltimaWardrobeOrderDetails findById(Integer id) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.ID + " = ?";
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{id}, new BeanPropertyRowMapper<>(UltimaWardrobeOrderDetails.class));
    }

//    public Party findByName(String name) {       
//        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.DEALER_NAME + " = ?";        
//        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{name}, new BeanPropertyRowMapper<>(Party.class));
//    }
//
    public List<UltimaWardrobeOrderDetails> findByOrderHeadId(Integer orderHeadId) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.ORDER_HEAD_ID + " = ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{orderHeadId}, new BeanPropertyRowMapper<>(UltimaWardrobeOrderDetails.class));
    }

    public Integer findPriceByOrderHeadId(Integer orderHeadId) {
        String sqlQuery = "SELECT sum(price) FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.ORDER_HEAD_ID + " = ?";
        return jdbcTemplate.queryForInt(sqlQuery, orderHeadId);
    }

    public UltimaWardrobeOrderDetails insert(UltimaWardrobeOrderDetails ultimaWardrobeOrderDetails) {
        System.out.println("Insert Order Detail :" + ultimaWardrobeOrderDetails);
        Map<String, Object> parameters = new HashMap<>();
        parameters.put(Columns.ORDER_HEAD_ID, ultimaWardrobeOrderDetails.getOrderHeadId());
        parameters.put(Columns.PRODUCT_CODE, ultimaWardrobeOrderDetails.getProductCode());
        parameters.put(Columns.COMPONENT, ultimaWardrobeOrderDetails.getComponent());
        parameters.put(Columns.DESCRIPTION, ultimaWardrobeOrderDetails.getDescription());
        parameters.put(Columns.CARCASS_MATERIAL, ultimaWardrobeOrderDetails.getCarcassMaterial());
        parameters.put(Columns.SHUTTER_FINISH, ultimaWardrobeOrderDetails.getShutterFinish());
        parameters.put(Columns.HANDLE, ultimaWardrobeOrderDetails.getHandle());
        parameters.put(Columns.WIDTH, ultimaWardrobeOrderDetails.getWidth());
        parameters.put(Columns.DEPTH, ultimaWardrobeOrderDetails.getDepth());
        parameters.put(Columns.HEIGHT, ultimaWardrobeOrderDetails.getHeight());
        parameters.put(Columns.QUANTITY, ultimaWardrobeOrderDetails.getQuantity());
        parameters.put(Columns.CARCASS_PRICE, ultimaWardrobeOrderDetails.getCarcassPrice());
        parameters.put(Columns.SHUTTER_PRICE, ultimaWardrobeOrderDetails.getShutterPrice());
        parameters.put(Columns.HANDLE_PRICE, ultimaWardrobeOrderDetails.getHandlePrice());
        parameters.put(Columns.PRICE, ultimaWardrobeOrderDetails.getPrice());
        parameters.put(Columns.CARCASS_COLOR_ID, ultimaWardrobeOrderDetails.getCarcassColorId());
        parameters.put(Columns.SHUTTER_COLOR_ID, ultimaWardrobeOrderDetails.getShutterColorId());
        parameters.put(Columns.CARCASS_COLOR_CODE, ultimaWardrobeOrderDetails.getCarcassColorCode());
        parameters.put(Columns.SHUTTER_COLOR_CODE, ultimaWardrobeOrderDetails.getShutterColorCode());
        parameters.put(Columns.REMARK, ultimaWardrobeOrderDetails.getRemark());
        parameters.put(Columns.ORDER_FOR, ultimaWardrobeOrderDetails.getOrderFor());

        Number newId = insertUltimaWardrobeOrderDetail.executeAndReturnKey(parameters);
        ultimaWardrobeOrderDetails = findById(newId.intValue());
        return ultimaWardrobeOrderDetails;
    }

    public void delete(Integer id) {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET deleted=? WHERE " + Columns.ID + "=?";
        jdbcTemplate.update(sqlQuery, new Object[]{true, id});
    }

    public UltimaWardrobeOrderDetails update(UltimaWardrobeOrderDetails ultimaWardrobeOrderDetails) {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET "
                + Columns.ORDER_HEAD_ID + " = ?,"
                + Columns.PRODUCT_CODE + " = ?,"
                + Columns.COMPONENT + " = ?,"
                + Columns.DESCRIPTION + " = ?,"
                + Columns.CARCASS_MATERIAL + " = ?,"
                + Columns.SHUTTER_FINISH + " = ?,"
                + Columns.HANDLE + " = ?,"
                + Columns.WIDTH + " = ?,"
                + Columns.DEPTH + " = ?,"
                + Columns.HEIGHT + " = ?,"
                + Columns.QUANTITY + " = ?,"
                + Columns.CARCASS_PRICE + " = ?,"
                + Columns.SHUTTER_PRICE + " = ?,"
                + Columns.HANDLE_PRICE + " = ?,"
                + Columns.PRICE + " = ?,"
                + Columns.CARCASS_COLOR_ID + " = ?,"
                + Columns.SHUTTER_COLOR_ID + " = ?,"
                + Columns.CARCASS_COLOR_CODE + " = ?,"
                + Columns.SHUTTER_COLOR_CODE + " = ?,"
                + Columns.REMARK + " = ?,"
                + Columns.ORDER_FOR + " = ? WHERE " + Columns.ID + " = ?";
        Number updatedCount = jdbcTemplate.update(sqlQuery,
                new Object[]{
                    ultimaWardrobeOrderDetails.getOrderHeadId(),
                    ultimaWardrobeOrderDetails.getProductCode(),
                    ultimaWardrobeOrderDetails.getComponent(),
                    ultimaWardrobeOrderDetails.getDescription(),
                    ultimaWardrobeOrderDetails.getCarcassMaterial(),
                    ultimaWardrobeOrderDetails.getShutterFinish(),
                    ultimaWardrobeOrderDetails.getHandle(),
                    ultimaWardrobeOrderDetails.getWidth(),
                    ultimaWardrobeOrderDetails.getDepth(),
                    ultimaWardrobeOrderDetails.getHeight(),
                    ultimaWardrobeOrderDetails.getQuantity(),
                    ultimaWardrobeOrderDetails.getCarcassPrice(),
                    ultimaWardrobeOrderDetails.getShutterPrice(),
                    ultimaWardrobeOrderDetails.getHandlePrice(),
                    ultimaWardrobeOrderDetails.getPrice(),
                    ultimaWardrobeOrderDetails.getCarcassColorId(),
                    ultimaWardrobeOrderDetails.getShutterColorId(),
                    ultimaWardrobeOrderDetails.getCarcassColorCode(),
                    ultimaWardrobeOrderDetails.getShutterColorCode(),
                    ultimaWardrobeOrderDetails.getRemark(),
                    ultimaWardrobeOrderDetails.getOrderFor(),
                    ultimaWardrobeOrderDetails.getId()
                });
        ultimaWardrobeOrderDetails = findById(ultimaWardrobeOrderDetails.getId());
        return ultimaWardrobeOrderDetails;
    }
}
