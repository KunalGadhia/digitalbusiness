/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.infinitywardrobeorderdetails;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.sql.DataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.stereotype.Repository;
import org.xlsx4j.sml.Col;

/**
 *
 * @author webdesign
 */
@Repository
public class InfinityWardrobeOrderDetailsDAL {

    public static final class Columns {

        public static final String ID = "id";
        public static final String ORDER_HEAD_ID = "order_head_id";
        public static final String PRODUCT_CODE = "product_code";
        public static final String COMPONENT = "component";
        public static final String DESCRIPTION = "description";
        public static final String CARCASS_MATERIAL = "carcass_material";
        public static final String SHUTTER_FINISH = "shutter_finish";
        public static final String HINGE = "hinge";
        public static final String WIDTH = "width";
        public static final String DEPTH = "depth";
        public static final String HEIGHT = "height";
        public static final String QUANTITY = "quantity";
        public static final String CARCASS_PRICE = "carcass_price";
        public static final String SHUTTER_PRICE = "shutter_price";
        public static final String HINGE_PRICE = "hinge_price";
        public static final String PRICE = "price";
        public static final String CARCASS_COLOR_ID = "carcass_color_id";
        public static final String SHUTTER_COLOR_ID = "shutter_color_id";
        public static final String CARCASS_COLOR_CODE = "carcass_color_code";
        public static final String SHUTTER_COLOR_CODE = "shutter_color_code";
        public static final String CARCASS_COLOR_NAME = "carcass_color_name";
        public static final String SHUTTER_COLOR_NAME = "shutter_color_name";
        public static final String REMARK = "remark";
        public static final String ORDER_FOR = "order_for";
    }

    public static final String TABLE_NAME = "infinity_wardrobe_order_details";

    private final SimpleJdbcInsert insertInfinityWardrobeOrderDetail;
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public InfinityWardrobeOrderDetailsDAL(DataSource dataSource) {
        jdbcTemplate = new JdbcTemplate(dataSource);
        insertInfinityWardrobeOrderDetail = new SimpleJdbcInsert(jdbcTemplate)
                .withTableName(TABLE_NAME)
                .usingColumns(
                        Columns.ORDER_HEAD_ID,
                        Columns.PRODUCT_CODE,
                        Columns.COMPONENT,
                        Columns.DESCRIPTION,
                        Columns.CARCASS_MATERIAL,
                        Columns.SHUTTER_FINISH,
                        Columns.HINGE,
                        Columns.WIDTH,
                        Columns.DEPTH,
                        Columns.HEIGHT,
                        Columns.QUANTITY,
                        Columns.CARCASS_PRICE,
                        Columns.SHUTTER_PRICE,
                        Columns.HINGE_PRICE,
                        Columns.PRICE,
                        Columns.CARCASS_COLOR_ID,
                        Columns.SHUTTER_COLOR_ID,
                        Columns.CARCASS_COLOR_CODE,
                        Columns.SHUTTER_COLOR_CODE,
                        Columns.CARCASS_COLOR_NAME,
                        Columns.SHUTTER_COLOR_NAME,
                        Columns.REMARK,
                        Columns.ORDER_FOR
                )
                .usingGeneratedKeyColumns(Columns.ID);
    }

    public List<InfinityWardrobeOrderDetails> findAll(Integer offset) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE ORDER BY " + Columns.ID + " DESC LIMIT 10 OFFSET ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{offset}, new BeanPropertyRowMapper<>(InfinityWardrobeOrderDetails.class));
    }

    public InfinityWardrobeOrderDetails findById(Integer id) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.ID + " = ?";
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{id}, new BeanPropertyRowMapper<>(InfinityWardrobeOrderDetails.class));
    }

//    public Party findByName(String name) {       
//        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.DEALER_NAME + " = ?";        
//        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{name}, new BeanPropertyRowMapper<>(Party.class));
//    }
//
    public List<InfinityWardrobeOrderDetails> findByOrderHeadId(Integer orderHeadId) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.ORDER_HEAD_ID + " = ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{orderHeadId}, new BeanPropertyRowMapper<>(InfinityWardrobeOrderDetails.class));
    }

    public Integer findPriceByOrderHeadId(Integer orderHeadId) {
        String sqlQuery = "SELECT sum(price) FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.ORDER_HEAD_ID + " = ?";
        return jdbcTemplate.queryForInt(sqlQuery, orderHeadId);
    }

    public InfinityWardrobeOrderDetails insert(InfinityWardrobeOrderDetails infinityWardrobeOrderDetails) {
        System.out.println("Insert Order Detail :" + infinityWardrobeOrderDetails);
        Map<String, Object> parameters = new HashMap<>();
        parameters.put(Columns.ORDER_HEAD_ID, infinityWardrobeOrderDetails.getOrderHeadId());
        parameters.put(Columns.PRODUCT_CODE, infinityWardrobeOrderDetails.getProductCode());
        parameters.put(Columns.COMPONENT, infinityWardrobeOrderDetails.getComponent());
        parameters.put(Columns.DESCRIPTION, infinityWardrobeOrderDetails.getDescription());
        parameters.put(Columns.CARCASS_MATERIAL, infinityWardrobeOrderDetails.getCarcassMaterial());
        parameters.put(Columns.SHUTTER_FINISH, infinityWardrobeOrderDetails.getShutterFinish());
        parameters.put(Columns.HINGE, infinityWardrobeOrderDetails.getHinge());
        parameters.put(Columns.WIDTH, infinityWardrobeOrderDetails.getWidth());
        parameters.put(Columns.DEPTH, infinityWardrobeOrderDetails.getDepth());
        parameters.put(Columns.HEIGHT, infinityWardrobeOrderDetails.getHeight());
        parameters.put(Columns.QUANTITY, infinityWardrobeOrderDetails.getQuantity());
        parameters.put(Columns.CARCASS_PRICE, infinityWardrobeOrderDetails.getCarcassPrice());
        parameters.put(Columns.SHUTTER_PRICE, infinityWardrobeOrderDetails.getShutterPrice());
        parameters.put(Columns.HINGE_PRICE, infinityWardrobeOrderDetails.getHingePrice());
        parameters.put(Columns.PRICE, infinityWardrobeOrderDetails.getPrice());
        parameters.put(Columns.CARCASS_COLOR_ID, infinityWardrobeOrderDetails.getCarcassColorId());
        parameters.put(Columns.SHUTTER_COLOR_ID, infinityWardrobeOrderDetails.getShutterColorId());
        parameters.put(Columns.CARCASS_COLOR_CODE, infinityWardrobeOrderDetails.getCarcassColorCode());
        parameters.put(Columns.SHUTTER_COLOR_CODE, infinityWardrobeOrderDetails.getShutterColorCode());
        parameters.put(Columns.CARCASS_COLOR_NAME, infinityWardrobeOrderDetails.getCarcassColorName());
        parameters.put(Columns.SHUTTER_COLOR_NAME, infinityWardrobeOrderDetails.getShutterColorName());
        parameters.put(Columns.REMARK, infinityWardrobeOrderDetails.getRemark());
        parameters.put(Columns.ORDER_FOR, infinityWardrobeOrderDetails.getOrderFor());

        Number newId = insertInfinityWardrobeOrderDetail.executeAndReturnKey(parameters);
        infinityWardrobeOrderDetails = findById(newId.intValue());
        return infinityWardrobeOrderDetails;
    }

    public void delete(Integer id) {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET deleted=? WHERE " + Columns.ID + "=?";
        jdbcTemplate.update(sqlQuery, new Object[]{true, id});
    }

    public InfinityWardrobeOrderDetails update(InfinityWardrobeOrderDetails infinityWardrobeOrderDetails) {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET "
                + Columns.ORDER_HEAD_ID + " = ?,"
                + Columns.PRODUCT_CODE + " = ?,"
                + Columns.COMPONENT + " = ?,"
                + Columns.DESCRIPTION + " = ?,"
                + Columns.CARCASS_MATERIAL + " = ?,"
                + Columns.SHUTTER_FINISH + " = ?,"
                + Columns.HINGE + " = ?,"
                + Columns.WIDTH + " = ?,"
                + Columns.DEPTH + " = ?,"
                + Columns.HEIGHT + " = ?,"
                + Columns.QUANTITY + " = ?,"
                + Columns.CARCASS_PRICE + " = ?,"
                + Columns.SHUTTER_PRICE + " = ?,"
                + Columns.HINGE_PRICE + " = ?,"
                + Columns.PRICE + " = ?,"
                + Columns.CARCASS_COLOR_ID + " = ?,"
                + Columns.SHUTTER_COLOR_ID + " = ?,"
                + Columns.CARCASS_COLOR_CODE + " = ?,"
                + Columns.SHUTTER_COLOR_CODE + " = ?,"
                + Columns.CARCASS_COLOR_NAME + " = ?,"
                + Columns.SHUTTER_COLOR_NAME + " = ?,"
                + Columns.REMARK + " = ?,"
                + Columns.ORDER_FOR + " = ? WHERE " + Columns.ID + " = ?";
        Number updatedCount = jdbcTemplate.update(sqlQuery,
                new Object[]{
                    infinityWardrobeOrderDetails.getOrderHeadId(),
                    infinityWardrobeOrderDetails.getProductCode(),
                    infinityWardrobeOrderDetails.getComponent(),
                    infinityWardrobeOrderDetails.getDescription(),
                    infinityWardrobeOrderDetails.getCarcassMaterial(),
                    infinityWardrobeOrderDetails.getShutterFinish(),
                    infinityWardrobeOrderDetails.getHinge(),
                    infinityWardrobeOrderDetails.getWidth(),
                    infinityWardrobeOrderDetails.getDepth(),
                    infinityWardrobeOrderDetails.getHeight(),
                    infinityWardrobeOrderDetails.getQuantity(),
                    infinityWardrobeOrderDetails.getCarcassPrice(),
                    infinityWardrobeOrderDetails.getShutterPrice(),
                    infinityWardrobeOrderDetails.getHingePrice(),
                    infinityWardrobeOrderDetails.getPrice(),
                    infinityWardrobeOrderDetails.getCarcassColorId(),
                    infinityWardrobeOrderDetails.getShutterColorId(),
                    infinityWardrobeOrderDetails.getCarcassColorCode(),
                    infinityWardrobeOrderDetails.getShutterColorCode(),
                    infinityWardrobeOrderDetails.getCarcassColorName(),
                    infinityWardrobeOrderDetails.getShutterColorName(),
                    infinityWardrobeOrderDetails.getRemark(),
                    infinityWardrobeOrderDetails.getOrderFor(),
                    infinityWardrobeOrderDetails.getId()
                });
        infinityWardrobeOrderDetails = findById(infinityWardrobeOrderDetails.getId());
        return infinityWardrobeOrderDetails;
    }
}
