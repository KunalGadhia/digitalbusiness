/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.wardrobecomponentorderdetails;

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
 * @author swapnika
 */
@Repository
public class WardrobeComponentOrderDetailsDAL {

    public static final class Columns {

        public static final String ID = "id";
        public static final String ORDER_HEAD_ID = "id";
        public static final String PRODUCT_CODE = "product_code";
        public static final String COMPONENT = "component";
        public static final String DESCRIPTION = "description";
        public static final String WIDTH = "width";
        public static final String DEPTH = "depth";
        public static final String HEIGHT = "height";
        public static final String STD_PRICE = "std_price";
        public static final String QUANTITY = "quantity";
        public static final String PRICE = "price";
        public static final String REMARK = "remark";
        public static final String DISPLAY_DISCOUNT = "display_discount";
        public static final String ORDER_FOR = "order_for";

    }

    public static final String TABLE_NAME = "wardrobe_component_order_details";

    private final SimpleJdbcInsert insertWardrobeComponentOrderDetails;
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public WardrobeComponentOrderDetailsDAL(DataSource dataSource) {
        jdbcTemplate = new JdbcTemplate(dataSource);
        insertWardrobeComponentOrderDetails = new SimpleJdbcInsert(jdbcTemplate)
                .withTableName(TABLE_NAME)
                .usingColumns(
                        Columns.ORDER_HEAD_ID,
                        Columns.PRODUCT_CODE,
                        Columns.COMPONENT,
                        Columns.DESCRIPTION,
                        Columns.WIDTH,
                        Columns.DEPTH,
                        Columns.HEIGHT,
                        Columns.STD_PRICE,
                        Columns.QUANTITY,
                        Columns.PRICE,
                        Columns.REMARK,
                        Columns.DISPLAY_DISCOUNT,
                        Columns.ORDER_FOR
                )
                .usingGeneratedKeyColumns(Columns.ID);
    }

    public List<WardrobeComponentOrderDetails> findAll(Integer offset) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE ORDER BY " + Columns.ID + " DESC LIMIT 10 OFFSET ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{offset}, new BeanPropertyRowMapper<>(WardrobeComponentOrderDetails.class));
    }

    public WardrobeComponentOrderDetails findById(Integer id) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.ID + " = ?";
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{id}, new BeanPropertyRowMapper<>(WardrobeComponentOrderDetails.class));
    }

    public WardrobeComponentOrderDetails insert(WardrobeComponentOrderDetails wardrobeComponentOrderDetails) {
        Map<String, Object> parameters = new HashMap<>();
        parameters.put(Columns.ORDER_HEAD_ID, wardrobeComponentOrderDetails.getOrderHeadId());
        parameters.put(Columns.PRODUCT_CODE, wardrobeComponentOrderDetails.getProductCode());
        parameters.put(Columns.COMPONENT, wardrobeComponentOrderDetails.getComponent());
        parameters.put(Columns.DESCRIPTION, wardrobeComponentOrderDetails.getDescription());
        parameters.put(Columns.WIDTH, wardrobeComponentOrderDetails.getWidth());
        parameters.put(Columns.DEPTH, wardrobeComponentOrderDetails.getDepth());
        parameters.put(Columns.HEIGHT, wardrobeComponentOrderDetails.getHeight());
        parameters.put(Columns.STD_PRICE, wardrobeComponentOrderDetails.getStdPrice());
        parameters.put(Columns.QUANTITY, wardrobeComponentOrderDetails.getQuantity());
        parameters.put(Columns.PRICE, wardrobeComponentOrderDetails.getPrice());
        parameters.put(Columns.REMARK, wardrobeComponentOrderDetails.getRemark());
        parameters.put(Columns.DISPLAY_DISCOUNT, wardrobeComponentOrderDetails.getDisplayDiscount());
        parameters.put(Columns.ORDER_FOR, wardrobeComponentOrderDetails.getOrderFor());
        Number newId = insertWardrobeComponentOrderDetails.executeAndReturnKey(parameters);
        wardrobeComponentOrderDetails = findById(newId.intValue());
        return wardrobeComponentOrderDetails;
    }

    public void delete(Integer id) {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET deleted=? WHERE " + Columns.ID + "=?";
        jdbcTemplate.update(sqlQuery, new Object[]{true, id});
    }

    public WardrobeComponentOrderDetails update(WardrobeComponentOrderDetails wardrobeComponentOrderDetails) {
        //  String path = wardrobeComponentOrderDetails.getImage().get(0).toString().replace("\\", "\\\\");
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET "
                + Columns.ORDER_HEAD_ID + " = ?,"
                + Columns.PRODUCT_CODE + " = ?,"
                + Columns.COMPONENT + " = ?,"
                + Columns.DESCRIPTION + " = ?, "
                + Columns.WIDTH + " = ?,"
                + Columns.DEPTH + " = ?,"
                + Columns.HEIGHT + " = ?,"
                + Columns.STD_PRICE + " = ?,"
                + Columns.QUANTITY + " = ?, "
                + Columns.PRICE + " = ?,"
                + Columns.REMARK + " = ?,"
                + Columns.DISPLAY_DISCOUNT + " = ?,"
                + Columns.ORDER_FOR + " = ?" + "' WHERE " + Columns.ID + " = ?";
        Number updatedCount = jdbcTemplate.update(sqlQuery,
                new Object[]{
                    wardrobeComponentOrderDetails.getOrderHeadId(),
                    wardrobeComponentOrderDetails.getProductCode(),
                    wardrobeComponentOrderDetails.getComponent(),
                    wardrobeComponentOrderDetails.getDescription(),
                    wardrobeComponentOrderDetails.getWidth(),
                    wardrobeComponentOrderDetails.getDepth(),
                    wardrobeComponentOrderDetails.getHeight(),
                    wardrobeComponentOrderDetails.getStdPrice(),
                    wardrobeComponentOrderDetails.getQuantity(),
                    wardrobeComponentOrderDetails.getPrice(),
                    wardrobeComponentOrderDetails.getRemark(),
                    wardrobeComponentOrderDetails.getDisplayDiscount(),
                    wardrobeComponentOrderDetails.getOrderFor(),
                    wardrobeComponentOrderDetails.getId()
                });
        wardrobeComponentOrderDetails = findById(wardrobeComponentOrderDetails.getId());
        return wardrobeComponentOrderDetails;
    }
}
