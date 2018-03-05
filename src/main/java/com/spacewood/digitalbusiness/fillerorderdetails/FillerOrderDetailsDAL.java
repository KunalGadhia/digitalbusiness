/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.fillerorderdetails;

import com.spacewood.digitalbusiness.shutterorderdetails.GrainDirection;
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
        public static final String AS_PER_DRAWING = "as_per_drawing";
        public static final String REMARK = "remark";
        public static final String ORDER_FOR = "order_for";
        public static final String INT_COLOR_CODE = "int_color_code";
        public static final String COLOR_CODE = "color_code";
        public static final String DISCOUNT_PER = "discount_per";

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
                        Columns.AS_PER_DRAWING,
                        Columns.REMARK,
                        Columns.ORDER_FOR,
                        Columns.INT_COLOR_CODE,
                        Columns.COLOR_CODE,
                        Columns.DISCOUNT_PER
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
        parameters.put(Columns.INT_COLOR_ID, fillerOrderDetails.getIntColorId());
        parameters.put(Columns.PRODUCT_CODE, fillerOrderDetails.getProductCode());
        parameters.put(Columns.COMPONENT, fillerOrderDetails.getComponent());
        parameters.put(Columns.MATERIAL, fillerOrderDetails.getMaterial());
        parameters.put(Columns.LENGTH, fillerOrderDetails.getLength());
        parameters.put(Columns.WIDTH, fillerOrderDetails.getWidth());
        parameters.put(Columns.THICKNESS, fillerOrderDetails.getThickness());
        parameters.put(Columns.QUANTITY, fillerOrderDetails.getQuantity());
        parameters.put(Columns.PRICE, Math.round(fillerOrderDetails.getPrice()));
        parameters.put(Columns.STD_ONE_SIDE_PRICE, fillerOrderDetails.getStdOneSidePrice());
        parameters.put(Columns.STD_BOTH_SIDE_PRICE, fillerOrderDetails.getStdBothSidePrice());
        parameters.put(Columns.FINISH, fillerOrderDetails.getFinish());
        if (fillerOrderDetails.getBsm() == null) {
            parameters.put(Columns.BSM, 0);
        } else {
            parameters.put(Columns.BSM, fillerOrderDetails.getBsm());
        }
        if (fillerOrderDetails.getGrain() == null) {
            parameters.put(Columns.GRAIN, GrainDirection.NO_GRAIN);
        } else {
            parameters.put(Columns.GRAIN, fillerOrderDetails.getGrain());
        }
        if (fillerOrderDetails.getAsPerDrawing() == null) {
            parameters.put(Columns.AS_PER_DRAWING, false);
        } else {
            parameters.put(Columns.AS_PER_DRAWING, fillerOrderDetails.getAsPerDrawing());
        }
        parameters.put(Columns.REMARK, fillerOrderDetails.getRemark());
        parameters.put(Columns.ORDER_FOR, "FILLER");
        parameters.put(Columns.INT_COLOR_CODE, fillerOrderDetails.getIntColorCode());
        parameters.put(Columns.COLOR_CODE, fillerOrderDetails.getColorCode());
        parameters.put(Columns.DISCOUNT_PER, fillerOrderDetails.getDiscountPer());
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
                + Columns.GRAIN + " = ? WHERE " + Columns.ID + " = ?";
        Number updatedCount = jdbcTemplate.update(sqlQuery,
                new Object[]{
                    fillerOrderDetails.getOrderHeadId(),
                    fillerOrderDetails.getColorId(),
                    fillerOrderDetails.getIntColorId(),
                    fillerOrderDetails.getProductCode(),
                    fillerOrderDetails.getComponent(),
                    fillerOrderDetails.getMaterial(),
                    fillerOrderDetails.getLength(),
                    fillerOrderDetails.getWidth(),
                    fillerOrderDetails.getThickness(),
                    fillerOrderDetails.getQuantity(),
                    fillerOrderDetails.getPrice(),
                    fillerOrderDetails.getStdOneSidePrice(),
                    fillerOrderDetails.getStdBothSidePrice(),
                    fillerOrderDetails.getFinish(),
                    fillerOrderDetails.getBsm(),
                    fillerOrderDetails.getGrain(),
                    fillerOrderDetails.getId()
                });
        fillerOrderDetails = findById(fillerOrderDetails.getId());
        return fillerOrderDetails;
    }
}
