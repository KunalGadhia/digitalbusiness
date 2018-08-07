/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.shutterorderdetails;

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
public class ShutterOrderDetailsDAL {

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
        public static final String STD_BOTH_SIDE_PRICE = "std_both_side_price";
        public static final String FINISH = "finish";
        public static final String BSM = "bsm";
        public static final String GRAIN = "grain";
        public static final String HANDLE = "handle";
        public static final String HANDLE_LENGTH = "handle_length";
        public static final String HANDLE_FINISH = "handle_finish";
        public static final String HANDLE_PRICE = "handle_price";
        public static final String HINGE_POSITION = "hinge_position";
        public static final String GLASS = "glass";
        public static final String STEP = "step";
        public static final String JALI = "jali";
        public static final String STRAIGHTENER = "straightener";
        public static final String STRAIGHTENER_PRICE = "straightener_price";
        public static final String AS_PER_DRAWING = "as_per_drawing";
        public static final String REMARK = "remark";
        public static final String ORDER_FOR = "order_for";
        public static final String INT_COLOR_CODE = "int_color_code";
        public static final String COLOR_CODE = "color_code";
        public static final String DISPLAY_DISCOUNT = "display_discount";
        public static final String DISCOUNT_PER = "discount_per";
    }

    public static final String TABLE_NAME = "shutter_order_details";

    private final SimpleJdbcInsert insertShutterOrderDetail;
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public ShutterOrderDetailsDAL(DataSource dataSource) {
        jdbcTemplate = new JdbcTemplate(dataSource);
        insertShutterOrderDetail = new SimpleJdbcInsert(jdbcTemplate)
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
                        Columns.STD_BOTH_SIDE_PRICE,
                        Columns.FINISH,
                        Columns.BSM,
                        Columns.GRAIN,
                        Columns.HANDLE,
                        Columns.HANDLE_LENGTH,
                        Columns.HANDLE_FINISH,
                        Columns.HANDLE_PRICE,
                        Columns.HINGE_POSITION,
                        Columns.GLASS,
                        Columns.STEP,
                        Columns.JALI,
                        Columns.STRAIGHTENER,
                        Columns.STRAIGHTENER_PRICE,
                        Columns.AS_PER_DRAWING,
                        Columns.REMARK,
                        Columns.ORDER_FOR,
                        Columns.INT_COLOR_CODE,
                        Columns.COLOR_CODE,
                        Columns.DISPLAY_DISCOUNT,
                        Columns.DISCOUNT_PER
                )
                .usingGeneratedKeyColumns(Columns.ID);
    }

    public List<ShutterOrderDetails> findAll(Integer offset) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE ORDER BY " + Columns.ID + " DESC LIMIT 10 OFFSET ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{offset}, new BeanPropertyRowMapper<>(ShutterOrderDetails.class));
    }

    public ShutterOrderDetails findById(Integer id) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.ID + " = ?";
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{id}, new BeanPropertyRowMapper<>(ShutterOrderDetails.class));
    }

//    public Party findByName(String name) {       
//        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.DEALER_NAME + " = ?";        
//        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{name}, new BeanPropertyRowMapper<>(Party.class));
//    }
//
    public List<ShutterOrderDetails> findByOrderHeadId(Integer orderHeadId) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.ORDER_HEAD_ID + " = ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{orderHeadId}, new BeanPropertyRowMapper<>(ShutterOrderDetails.class));
    }

    public Integer findPriceByOrderHeadId(Integer orderHeadId) {
        String sqlQuery = "SELECT sum(price) FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.ORDER_HEAD_ID + " = ?";
        return jdbcTemplate.queryForInt(sqlQuery, orderHeadId);
    }

    public ShutterOrderDetails insert(ShutterOrderDetails shutterOrderDetails) {
        System.out.println("Insert Order Detail :" + shutterOrderDetails);
        Map<String, Object> parameters = new HashMap<>();
        parameters.put(Columns.ORDER_HEAD_ID, shutterOrderDetails.getOrderHeadId());
        parameters.put(Columns.COLOR_ID, shutterOrderDetails.getColorId());
        parameters.put(Columns.INT_COLOR_ID, shutterOrderDetails.getIntColorId());
        parameters.put(Columns.PRODUCT_CODE, shutterOrderDetails.getProductCode());
        parameters.put(Columns.COMPONENT, shutterOrderDetails.getComponent());
        parameters.put(Columns.MATERIAL, shutterOrderDetails.getMaterial());
        parameters.put(Columns.LENGTH, shutterOrderDetails.getLength());
        parameters.put(Columns.WIDTH, shutterOrderDetails.getWidth());
        parameters.put(Columns.THICKNESS, shutterOrderDetails.getThickness());
        parameters.put(Columns.QUANTITY, shutterOrderDetails.getQuantity());
        parameters.put(Columns.PRICE, Math.round(shutterOrderDetails.getPrice()));
        parameters.put(Columns.STD_ONE_SIDE_PRICE, shutterOrderDetails.getStdOneSidePrice());
        parameters.put(Columns.STD_BOTH_SIDE_PRICE, shutterOrderDetails.getStdBothSidePrice());
        parameters.put(Columns.FINISH, shutterOrderDetails.getFinish());
        if (shutterOrderDetails.getBsm() == null) {
            parameters.put(Columns.BSM, 0);
        } else {
            parameters.put(Columns.BSM, shutterOrderDetails.getBsm());
        }
        if (shutterOrderDetails.getGrain() == null) {
            parameters.put(Columns.GRAIN, GrainDirection.NO_GRAIN);
        } else {
            parameters.put(Columns.GRAIN, shutterOrderDetails.getGrain().name());
        }
        parameters.put(Columns.HANDLE, shutterOrderDetails.getHandle());
        parameters.put(Columns.HANDLE_LENGTH, shutterOrderDetails.getHandleLength());
        parameters.put(Columns.HANDLE_FINISH, shutterOrderDetails.getHandleFinish());
        parameters.put(Columns.HANDLE_PRICE, shutterOrderDetails.getHandlePrice());
        if (shutterOrderDetails.getHingePosition() == null) {
            parameters.put(Columns.HINGE_POSITION, HingePosition.NO_HINGE);
        }else {
            parameters.put(Columns.HINGE_POSITION, shutterOrderDetails.getHingePosition().name());
        }
        if (shutterOrderDetails.getGlass() == null) {
            parameters.put(Columns.GLASS, Glass.NO_GLASS);
        } else {
            parameters.put(Columns.GLASS, shutterOrderDetails.getGlass().name());
        }
        parameters.put(Columns.STEP, shutterOrderDetails.getStep());
        parameters.put(Columns.JALI, shutterOrderDetails.getJali());
        parameters.put(Columns.STRAIGHTENER, shutterOrderDetails.getStraightener());
        parameters.put(Columns.STRAIGHTENER_PRICE, shutterOrderDetails.getStraightenerPrice());
        if (shutterOrderDetails.getAsPerDrawing() == null) {
            parameters.put(Columns.AS_PER_DRAWING, false);
        } else {
            parameters.put(Columns.AS_PER_DRAWING, shutterOrderDetails.getAsPerDrawing());
        }
        parameters.put(Columns.REMARK, shutterOrderDetails.getRemark());
        parameters.put(Columns.ORDER_FOR, "SHUTTER");
        parameters.put(Columns.INT_COLOR_CODE, shutterOrderDetails.getIntColorCode());
        parameters.put(Columns.COLOR_CODE, shutterOrderDetails.getColorCode());
        parameters.put(Columns.DISPLAY_DISCOUNT, shutterOrderDetails.getDisplayDiscount());
        parameters.put(Columns.DISCOUNT_PER, shutterOrderDetails.getDiscountPer());

        Number newId = insertShutterOrderDetail.executeAndReturnKey(parameters);
        shutterOrderDetails = findById(newId.intValue());
        return shutterOrderDetails;
    }

    public void delete(Integer id) {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET deleted=? WHERE " + Columns.ID + "=?";
        jdbcTemplate.update(sqlQuery, new Object[]{true, id});
    }

    public ShutterOrderDetails update(ShutterOrderDetails shutterOrderDetails) {
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
                + Columns.STD_BOTH_SIDE_PRICE + " = ?,"
                + Columns.FINISH + " = ?,"
                + Columns.BSM + " = ?,"
                + Columns.GRAIN + " = ?,"
                + Columns.HANDLE + " = ?,"
                + Columns.HANDLE_LENGTH + " = ?,"
                + Columns.HANDLE_FINISH + " = ?,"
                + Columns.HANDLE_PRICE + " = ? WHERE " + Columns.ID + " = ?";
        Number updatedCount = jdbcTemplate.update(sqlQuery,
                new Object[]{
                    shutterOrderDetails.getOrderHeadId(),
                    shutterOrderDetails.getColorId(),
                    shutterOrderDetails.getIntColorId(),
                    shutterOrderDetails.getProductCode(),
                    shutterOrderDetails.getComponent(),
                    shutterOrderDetails.getMaterial(),
                    shutterOrderDetails.getLength(),
                    shutterOrderDetails.getWidth(),
                    shutterOrderDetails.getThickness(),
                    shutterOrderDetails.getQuantity(),
                    shutterOrderDetails.getPrice(),
                    shutterOrderDetails.getStdOneSidePrice(),
                    shutterOrderDetails.getStdBothSidePrice(),
                    shutterOrderDetails.getFinish(),
                    shutterOrderDetails.getBsm(),
                    shutterOrderDetails.getGrain(),
                    shutterOrderDetails.getHandle(),
                    shutterOrderDetails.getHandleLength(),
                    shutterOrderDetails.getHandleFinish(),
                    shutterOrderDetails.getHandlePrice(),
                    shutterOrderDetails.getId()
                });
        shutterOrderDetails = findById(shutterOrderDetails.getId());
        return shutterOrderDetails;
    }
}
