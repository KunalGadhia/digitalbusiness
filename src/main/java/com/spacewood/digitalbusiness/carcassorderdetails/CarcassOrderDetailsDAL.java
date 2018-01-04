/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.carcassorderdetails;

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
public class CarcassOrderDetailsDAL {

    public static final class Columns {

        public static final String ID = "id";
        public static final String ORDER_HEAD_ID = "order_head_id";
        public static final String STD_CARCASS_PRICE_ID = "std_carcass_price_id";
        public static final String INT_COLOR_ID = "int_color_id";
        public static final String LEFT_COLOR_ID = "left_color_id";
        public static final String RIGHT_COLOR_ID = "right_color_id";
        public static final String BACK_COLOR_ID = "back_color_id";
        public static final String TOP_COLOR_ID = "top_color_id";
        public static final String BOTTOM_COLOR_ID = "bottom_color_id";
        public static final String PRODUCT_CODE = "product_code";
        public static final String COMPONENT = "component";
        public static final String MATERIAL = "material";
        public static final String LENGTH = "length";
        public static final String WIDTH = "width";
        public static final String DEPTH = "depth";
        public static final String NON_STANDARD_DIMENSION = "non_standard_dimension";
        public static final String SHELF = "shelf";
        public static final String SHELF_COUNT = "shelf_count";
        public static final String SIDE_MATCHING = "side_matching";
        public static final String SIDE_SELECTION = "side_selection";
        public static final String SIDE_MATERIAL = "side_material";
        public static final String SIDE_FINISH = "side_finish";
        public static final String QUANTITY = "quantity";
        public static final String PRICE = "price";
        public static final String STD_MATERIAL_PRICE = "std_material_price";
        public static final String FINISH_PRICE = "finish_price";
        public static final String SECTION_PROFILE_ID = "section_profile_id";
        public static final String SECTION_PROFILE_PRICE = "section_profile_price";
        public static final String CARCASS_SUB_TYPE = "carcass_sub_type";
        public static final String GRAIN_DIRECTION = "grain_direction";
        public static final String AS_PER_DRAWING = "as_per_drawing";
        public static final String REMARK = "remark";
        public static final String ORDER_FOR = "order_for";

    }

    public static final String TABLE_NAME = "carcass_order_details";

    private final SimpleJdbcInsert insertCarcassOrderDetail;
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public CarcassOrderDetailsDAL(DataSource dataSource) {
        jdbcTemplate = new JdbcTemplate(dataSource);
        insertCarcassOrderDetail = new SimpleJdbcInsert(jdbcTemplate)
                .withTableName(TABLE_NAME)
                .usingColumns(
                        Columns.ORDER_HEAD_ID,
                        Columns.STD_CARCASS_PRICE_ID,
                        Columns.INT_COLOR_ID,
                        Columns.LEFT_COLOR_ID,
                        Columns.RIGHT_COLOR_ID,
                        Columns.BACK_COLOR_ID,
                        Columns.TOP_COLOR_ID,
                        Columns.BOTTOM_COLOR_ID,
                        Columns.PRODUCT_CODE,
                        Columns.COMPONENT,
                        Columns.MATERIAL,
                        Columns.LENGTH,
                        Columns.WIDTH,
                        Columns.DEPTH,
                        Columns.NON_STANDARD_DIMENSION,
                        Columns.SHELF,
                        Columns.SHELF_COUNT,
                        Columns.SIDE_MATCHING,
                        Columns.SIDE_SELECTION,
                        Columns.SIDE_MATERIAL,
                        Columns.SIDE_FINISH,
                        Columns.QUANTITY,
                        Columns.PRICE,
                        Columns.STD_MATERIAL_PRICE,
                        Columns.FINISH_PRICE,
                        Columns.SECTION_PROFILE_ID,
                        Columns.SECTION_PROFILE_PRICE,
                        Columns.CARCASS_SUB_TYPE,
                        Columns.GRAIN_DIRECTION,
                        Columns.AS_PER_DRAWING,
                        Columns.REMARK,
                        Columns.ORDER_FOR
                )
                .usingGeneratedKeyColumns(Columns.ID);
    }

    public List<CarcassOrderDetails> findAll(Integer offset) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE ORDER BY " + Columns.ID + " DESC LIMIT 10 OFFSET ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{offset}, new BeanPropertyRowMapper<>(CarcassOrderDetails.class));
    }

    public CarcassOrderDetails findById(Integer id) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.ID + " = ?";
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{id}, new BeanPropertyRowMapper<>(CarcassOrderDetails.class));
    }

//    public Party findByName(String name) {       
//        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.DEALER_NAME + " = ?";        
//        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{name}, new BeanPropertyRowMapper<>(Party.class));
//    }
//
    public List<CarcassOrderDetails> findByOrderHeadId(Integer orderHeadId) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.ORDER_HEAD_ID + " = ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{orderHeadId}, new BeanPropertyRowMapper<>(CarcassOrderDetails.class));
    }

    public Double findPriceByOrderHeadId(Integer orderHeadId) {
        String sqlQuery = "SELECT sum(price) FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.ORDER_HEAD_ID + " = ?";
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{orderHeadId}, Double.class);
    }

    public CarcassOrderDetails insert(CarcassOrderDetails carcassOrderDetails) {
        System.out.println("Insert Order Detail :" + carcassOrderDetails);
        Map<String, Object> parameters = new HashMap<>();
        parameters.put(Columns.ORDER_HEAD_ID, carcassOrderDetails.getOrderHeadId());
        parameters.put(Columns.STD_CARCASS_PRICE_ID, carcassOrderDetails.getStdCarcassPriceId());
        parameters.put(Columns.INT_COLOR_ID, carcassOrderDetails.getIntColorId());
        parameters.put(Columns.LEFT_COLOR_ID, carcassOrderDetails.getLeftColorId());
        parameters.put(Columns.RIGHT_COLOR_ID, carcassOrderDetails.getRightColorId());
        parameters.put(Columns.BACK_COLOR_ID, carcassOrderDetails.getBackColorId());
        parameters.put(Columns.TOP_COLOR_ID, carcassOrderDetails.getTopColorId());
        parameters.put(Columns.BOTTOM_COLOR_ID, carcassOrderDetails.getBottomColorId());
        parameters.put(Columns.PRODUCT_CODE, carcassOrderDetails.getProductCode());
        parameters.put(Columns.COMPONENT, carcassOrderDetails.getComponent());
        parameters.put(Columns.MATERIAL, carcassOrderDetails.getMaterial());
        parameters.put(Columns.LENGTH, carcassOrderDetails.getLength());
        parameters.put(Columns.WIDTH, carcassOrderDetails.getWidth());
        parameters.put(Columns.DEPTH, carcassOrderDetails.getDepth());
        if (carcassOrderDetails.getNonStandardDimension() == null) {
            parameters.put(Columns.NON_STANDARD_DIMENSION, 0);
        } else {
            parameters.put(Columns.NON_STANDARD_DIMENSION, carcassOrderDetails.getNonStandardDimension());
        }
        if (carcassOrderDetails.getShelf() == null) {
            parameters.put(Columns.SHELF, 0);
        } else {
            parameters.put(Columns.SHELF, carcassOrderDetails.getShelf());
        }
        if (carcassOrderDetails.getShelfCount() == null) {
            parameters.put(Columns.SHELF_COUNT, 0);
        } else {
            parameters.put(Columns.SHELF_COUNT, carcassOrderDetails.getShelfCount());
        }
        if (carcassOrderDetails.getSideMatching() == null) {
            parameters.put(Columns.SIDE_MATCHING, SideMatching.NSM);
        } else {
            parameters.put(Columns.SIDE_MATCHING, carcassOrderDetails.getSideMatching().name());
        }
        if (carcassOrderDetails.getSideSelection() == null) {
            parameters.put(Columns.SIDE_SELECTION, SideSelection.NSS);
        } else {
            parameters.put(Columns.SIDE_SELECTION, carcassOrderDetails.getSideSelection().name());
        }
        if (carcassOrderDetails.getSideMaterial() == null) {
            parameters.put(Columns.SIDE_MATERIAL, 0);
        } else {
            parameters.put(Columns.SIDE_MATERIAL, carcassOrderDetails.getSideMaterial());
        }
        if (carcassOrderDetails.getSideFinish() == null) {
            parameters.put(Columns.SIDE_FINISH, 0);
        } else {
            parameters.put(Columns.SIDE_FINISH, carcassOrderDetails.getSideFinish());
        }
//        parameters.put(Columns.SIDE_MATCHING, carcassOrderDetails.getSideMatching().name());
//        parameters.put(Columns.SIDE_SELECTION, carcassOrderDetails.getSideSelection().name());
//        parameters.put(Columns.SIDE_MATERIAL, carcassOrderDetails.getSideMaterial());
//        parameters.put(Columns.SIDE_FINISH, carcassOrderDetails.getSideFinish());
        parameters.put(Columns.QUANTITY, carcassOrderDetails.getQuantity());
        parameters.put(Columns.PRICE, Math.round(carcassOrderDetails.getPrice()));
        parameters.put(Columns.STD_MATERIAL_PRICE, carcassOrderDetails.getStdMaterialPrice());
        parameters.put(Columns.FINISH_PRICE, carcassOrderDetails.getFinishPrice());
        parameters.put(Columns.SECTION_PROFILE_ID, carcassOrderDetails.getSectionProfileId());
        parameters.put(Columns.SECTION_PROFILE_PRICE, carcassOrderDetails.getSectionProfilePrice());
        parameters.put(Columns.CARCASS_SUB_TYPE, carcassOrderDetails.getCarcassSubType());
        if (carcassOrderDetails.getGrainDirection() == null) {
            parameters.put(Columns.GRAIN_DIRECTION, carcassOrderDetails.getGrainDirection().NO_GRAIN);
        } else {
            parameters.put(Columns.GRAIN_DIRECTION, carcassOrderDetails.getGrainDirection().name());
        }
        if (carcassOrderDetails.getAsPerDrawing() == null) {
            parameters.put(Columns.AS_PER_DRAWING, false);
        } else {
            parameters.put(Columns.AS_PER_DRAWING, carcassOrderDetails.getAsPerDrawing());
        }
        parameters.put(Columns.REMARK, carcassOrderDetails.getRemark());
        parameters.put(Columns.ORDER_FOR, "CARCASS");
        Number newId = insertCarcassOrderDetail.executeAndReturnKey(parameters);
        carcassOrderDetails = findById(newId.intValue());
        return carcassOrderDetails;
    }

    public void delete(Integer id) {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET deleted=? WHERE " + Columns.ID + "=?";
        jdbcTemplate.update(sqlQuery, new Object[]{true, id});
    }

    public CarcassOrderDetails update(CarcassOrderDetails carcassOrderDetails) {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET "
                + Columns.ORDER_HEAD_ID + " = ?,"
                + Columns.STD_CARCASS_PRICE_ID + " = ?,"
                + Columns.INT_COLOR_ID + " = ?,"
                + Columns.LEFT_COLOR_ID + " = ?,"
                + Columns.RIGHT_COLOR_ID + " = ?,"
                + Columns.BACK_COLOR_ID + " = ?,"
                + Columns.TOP_COLOR_ID + " = ?,"
                + Columns.BOTTOM_COLOR_ID + " = ?,"
                + Columns.PRODUCT_CODE + " = ?, "
                + Columns.COMPONENT + " = ?,"
                + Columns.MATERIAL + " = ?,"
                + Columns.LENGTH + " = ?,"
                + Columns.WIDTH + " = ?,"
                + Columns.DEPTH + " = ?,"
                + Columns.NON_STANDARD_DIMENSION + " = ?,"
                + Columns.SHELF + " = ?,"
                + Columns.SHELF_COUNT + " = ?,"
                + Columns.SIDE_MATCHING + " = ?,"
                + Columns.SIDE_SELECTION + " = ?,"
                + Columns.SIDE_MATERIAL + " = ?,"
                + Columns.SIDE_FINISH + " = ?,"
                + Columns.QUANTITY + " = ?,"
                + Columns.PRICE + " = ?,"
                + Columns.STD_MATERIAL_PRICE + " = ?,"
                + Columns.FINISH_PRICE + " = ?,"
                + Columns.SECTION_PROFILE_ID + " = ?,"
                + Columns.SECTION_PROFILE_PRICE + " = ?,"
                + Columns.CARCASS_SUB_TYPE + " = ?,"
                + Columns.AS_PER_DRAWING + " = ?,"
                + Columns.GRAIN_DIRECTION + " = ? WHERE " + Columns.ID + " = ?";
        Number updatedCount = jdbcTemplate.update(sqlQuery,
                new Object[]{
                    carcassOrderDetails.getOrderHeadId(),
                    carcassOrderDetails.getStdCarcassPriceId(),
                    carcassOrderDetails.getIntColorId(),
                    carcassOrderDetails.getLeftColorId(),
                    carcassOrderDetails.getRightColorId(),
                    carcassOrderDetails.getBackColorId(),
                    carcassOrderDetails.getTopColorId(),
                    carcassOrderDetails.getBottomColorId(),
                    carcassOrderDetails.getProductCode(),
                    carcassOrderDetails.getComponent(),
                    carcassOrderDetails.getMaterial(),
                    carcassOrderDetails.getLength(),
                    carcassOrderDetails.getWidth(),
                    carcassOrderDetails.getDepth(),
                    carcassOrderDetails.getNonStandardDimension(),
                    carcassOrderDetails.getShelf(),
                    carcassOrderDetails.getShelfCount(),
                    carcassOrderDetails.getSideMatching().name(),
                    carcassOrderDetails.getSideSelection().name(),
                    carcassOrderDetails.getSideMaterial(),
                    carcassOrderDetails.getSideFinish(),
                    carcassOrderDetails.getQuantity(),
                    carcassOrderDetails.getPrice(),
                    carcassOrderDetails.getStdMaterialPrice(),
                    carcassOrderDetails.getFinishPrice(),
                    carcassOrderDetails.getSectionProfileId(),
                    carcassOrderDetails.getSectionProfilePrice(),
                    carcassOrderDetails.getCarcassSubType(),
                    carcassOrderDetails.getAsPerDrawing(),
                    carcassOrderDetails.getGrainDirection().name(),
                    carcassOrderDetails.getId()
                });
        carcassOrderDetails = findById(carcassOrderDetails.getId());
        return carcassOrderDetails;
    }
}
