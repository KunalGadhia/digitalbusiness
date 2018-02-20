/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.drawerorderdetails;

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
public class DrawerOrderDetailsDAL {

    public static final class Columns {

        public static final String ID = "id";
        public static final String ORDER_HEAD_ID = "order_head_id";
        public static final String COLOR_ID = "color_id";
        public static final String INT_COLOR_ID = "int_color_id";
        public static final String PRODUCT_CODE = "product_code";
        public static final String COMPONENT = "component";
        public static final String MATERIAL = "material";
        public static final String LENGTH = "length";
        public static final String WIDTH = "width";
        public static final String THICKNESS = "thickness";
        public static final String QUANTITY = "quantity";
        public static final String PRICE = "price";
        public static final String STD_ONE_SIDE_PRICE = "std_one_side_price";
        public static final String FINISH = "finish";
        public static final String GRAIN = "grain";
        public static final String HANDLE = "handle";
        public static final String HANDLE_LENGTH = "handle_length";
        public static final String HANDLE_FINISH = "handle_finish";
        public static final String HANDLE_PRICE = "handle_price";
        public static final String AS_PER_DRAWING = "as_per_drawing";
        public static final String REMARK = "remark";
        public static final String ORDER_FOR = "order_for";
        public static final String INT_COLOR_CODE = "int_color_code";
        public static final String COLOR_CODE = "color_code";
    }

    public static final String TABLE_NAME = "drawer_order_details";

    private final SimpleJdbcInsert insertDrawerOrderDetail;
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public DrawerOrderDetailsDAL(DataSource dataSource) {
        jdbcTemplate = new JdbcTemplate(dataSource);
        insertDrawerOrderDetail = new SimpleJdbcInsert(jdbcTemplate)
                .withTableName(TABLE_NAME)
                .usingColumns(
                        Columns.ORDER_HEAD_ID,
                        Columns.COLOR_ID,
                        Columns.INT_COLOR_ID,
                        Columns.PRODUCT_CODE,
                        Columns.COMPONENT,
                        Columns.MATERIAL,
                        Columns.LENGTH,
                        Columns.WIDTH,
                        Columns.THICKNESS,
                        Columns.QUANTITY,
                        Columns.PRICE,
                        Columns.STD_ONE_SIDE_PRICE,
                        Columns.FINISH,
                        Columns.GRAIN,
                        Columns.HANDLE,
                        Columns.HANDLE_LENGTH,
                        Columns.HANDLE_FINISH,
                        Columns.HANDLE_PRICE,
                        Columns.AS_PER_DRAWING,
                        Columns.REMARK,
                        Columns.ORDER_FOR,
                        Columns.INT_COLOR_CODE,
                        Columns.COLOR_CODE
                )
                .usingGeneratedKeyColumns(Columns.ID);
    }

    public List<DrawerOrderDetails> findAll(Integer offset) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE ORDER BY " + Columns.ID + " DESC LIMIT 10 OFFSET ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{offset}, new BeanPropertyRowMapper<>(DrawerOrderDetails.class));
    }

    public DrawerOrderDetails findById(Integer id) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.ID + " = ?";
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{id}, new BeanPropertyRowMapper<>(DrawerOrderDetails.class));
    }

//    public Party findByName(String name) {       
//        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.DEALER_NAME + " = ?";        
//        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{name}, new BeanPropertyRowMapper<>(Party.class));
//    }
//
    public List<DrawerOrderDetails> findByOrderHeadId(Integer orderHeadId) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.ORDER_HEAD_ID + " = ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{orderHeadId}, new BeanPropertyRowMapper<>(DrawerOrderDetails.class));
    }

    public Integer findPriceByOrderHeadId(Integer orderHeadId) {
        String sqlQuery = "SELECT sum(price) FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.ORDER_HEAD_ID + " = ?";
        return jdbcTemplate.queryForInt(sqlQuery, orderHeadId);
    }

    public DrawerOrderDetails insert(DrawerOrderDetails drawerOrderDetails) {
        System.out.println("Insert Order Detail :" + drawerOrderDetails);
        Map<String, Object> parameters = new HashMap<>();
        parameters.put(Columns.ORDER_HEAD_ID, drawerOrderDetails.getOrderHeadId());
        parameters.put(Columns.COLOR_ID, drawerOrderDetails.getColorId());
        parameters.put(Columns.INT_COLOR_ID, drawerOrderDetails.getIntColorId());
        parameters.put(Columns.PRODUCT_CODE, drawerOrderDetails.getProductCode());
        parameters.put(Columns.COMPONENT, drawerOrderDetails.getComponent());
        parameters.put(Columns.MATERIAL, drawerOrderDetails.getMaterial());
        parameters.put(Columns.LENGTH, drawerOrderDetails.getLength());
        parameters.put(Columns.WIDTH, drawerOrderDetails.getWidth());
        parameters.put(Columns.THICKNESS, drawerOrderDetails.getThickness());
        parameters.put(Columns.QUANTITY, drawerOrderDetails.getQuantity());
        parameters.put(Columns.PRICE, Math.round(drawerOrderDetails.getPrice()));
        parameters.put(Columns.STD_ONE_SIDE_PRICE, drawerOrderDetails.getStdOneSidePrice());
        parameters.put(Columns.FINISH, drawerOrderDetails.getFinish());
        if (drawerOrderDetails.getGrain() == null) {
            parameters.put(Columns.GRAIN, com.spacewood.digitalbusiness.shutterorderdetails.GrainDirection.NO_GRAIN);
        } else {
            parameters.put(Columns.GRAIN, drawerOrderDetails.getGrain().name());
        }
        parameters.put(Columns.HANDLE, drawerOrderDetails.getHandle());
        parameters.put(Columns.HANDLE_LENGTH, drawerOrderDetails.getHandleLength());
        parameters.put(Columns.HANDLE_FINISH, drawerOrderDetails.getHandleFinish());
        parameters.put(Columns.HANDLE_PRICE, drawerOrderDetails.getHandlePrice());
        if (drawerOrderDetails.getAsPerDrawing() == null) {
            parameters.put(Columns.AS_PER_DRAWING, false);
        } else {
            parameters.put(Columns.AS_PER_DRAWING, drawerOrderDetails.getAsPerDrawing());
        }
        parameters.put(Columns.REMARK, drawerOrderDetails.getRemark());
        parameters.put(Columns.ORDER_FOR, "DRAWER");
        parameters.put(Columns.INT_COLOR_CODE, drawerOrderDetails.getIntColorCode());
        parameters.put(Columns.COLOR_CODE, drawerOrderDetails.getColorCode());

        Number newId = insertDrawerOrderDetail.executeAndReturnKey(parameters);
        drawerOrderDetails = findById(newId.intValue());
        return drawerOrderDetails;
    }

    public void delete(Integer id) {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET deleted=? WHERE " + Columns.ID + "=?";
        jdbcTemplate.update(sqlQuery, new Object[]{true, id});
    }

    public DrawerOrderDetails update(DrawerOrderDetails drawerOrderDetails) {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET "
                + Columns.ORDER_HEAD_ID + " = ?,"
                + Columns.COLOR_ID + " = ?,"
                + Columns.INT_COLOR_ID + " = ?,"
                + Columns.PRODUCT_CODE + " = ?, "
                + Columns.COMPONENT + " = ?,"
                + Columns.MATERIAL + " = ?,"
                + Columns.LENGTH + " = ?,"
                + Columns.WIDTH + " = ?,"
                + Columns.THICKNESS + " = ?,"
                + Columns.QUANTITY + " = ?,"
                + Columns.PRICE + " = ?,"
                + Columns.STD_ONE_SIDE_PRICE + " = ?,"
                + Columns.FINISH + " = ?,"
                + Columns.GRAIN + " = ?,"
                + Columns.HANDLE + " = ?,"
                + Columns.HANDLE_LENGTH + " = ?,"
                + Columns.HANDLE_FINISH + " = ?,"
                + Columns.HANDLE_PRICE + " = ? WHERE " + Columns.ID + " = ?";
        Number updatedCount = jdbcTemplate.update(sqlQuery,
                new Object[]{
                    drawerOrderDetails.getOrderHeadId(),
                    drawerOrderDetails.getColorId(),
                    drawerOrderDetails.getIntColorId(),
                    drawerOrderDetails.getProductCode(),
                    drawerOrderDetails.getComponent(),
                    drawerOrderDetails.getMaterial(),
                    drawerOrderDetails.getLength(),
                    drawerOrderDetails.getWidth(),
                    drawerOrderDetails.getThickness(),
                    drawerOrderDetails.getQuantity(),
                    drawerOrderDetails.getPrice(),
                    drawerOrderDetails.getStdOneSidePrice(),
                    drawerOrderDetails.getFinish(),
                    drawerOrderDetails.getGrain(),
                    drawerOrderDetails.getHandle(),
                    drawerOrderDetails.getHandleLength(),
                    drawerOrderDetails.getHandleFinish(),
                    drawerOrderDetails.getHandlePrice(),
                    drawerOrderDetails.getId()
                });
        drawerOrderDetails = findById(drawerOrderDetails.getId());
        return drawerOrderDetails;
    }
}
