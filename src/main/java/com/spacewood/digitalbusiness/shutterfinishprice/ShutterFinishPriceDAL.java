/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.shutterfinishprice;

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
public class ShutterFinishPriceDAL {

    public static final class Columns {

        public static final String ID = "id";
        public static final String FINISH = "finish";
        public static final String MATERIAL = "material";
        public static final String THICKNESS = "thickness";
        public static final String ONE_SIDE_PRICE = "one_side_price";
        public static final String BOTH_SIDE_PRICE = "both_side_price";
        public static final String FINISH_CATEGORY = "finish_category";
        public static final String DRAWING_NUMBER = "drawing_number";
    }

    public static final String TABLE_NAME = "shutter_finish_price_master";

    private final SimpleJdbcInsert insertShutterFinishPrice;
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public ShutterFinishPriceDAL(DataSource dataSource) {
        jdbcTemplate = new JdbcTemplate(dataSource);
        insertShutterFinishPrice = new SimpleJdbcInsert(jdbcTemplate)
                .withTableName(TABLE_NAME)
                .usingColumns(
                        Columns.FINISH,
                        Columns.MATERIAL,
                        Columns.THICKNESS,
                        Columns.ONE_SIDE_PRICE,
                        Columns.BOTH_SIDE_PRICE,
                        Columns.FINISH_CATEGORY,
                        Columns.DRAWING_NUMBER
                )
                .usingGeneratedKeyColumns(Columns.ID);
    }

    public List<ShutterFinishPrice> findAll(Integer offset) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE ORDER BY " + Columns.ID + " DESC LIMIT 10 OFFSET ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{offset}, new BeanPropertyRowMapper<>(ShutterFinishPrice.class));
    }

    public List<ShutterFinishPrice> findAllList() {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE";
        return jdbcTemplate.query(sqlQuery, new Object[]{}, new BeanPropertyRowMapper<>(ShutterFinishPrice.class));
    }

    public List<ShutterFinishPrice> findByFinish(String finish) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.FINISH + " = ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{finish}, new BeanPropertyRowMapper<>(ShutterFinishPrice.class));
    }

    public List<String> findUniqueFinish() {
        String sqlQuery = "SELECT DISTINCT finish FROM " + TABLE_NAME + " WHERE deleted = FALSE";
        return jdbcTemplate.queryForList(sqlQuery, String.class);
    }

    public List<String> findUniqueFinishWithCategory(String finishCategory) {
        String sqlQuery = "SELECT DISTINCT finish FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.FINISH_CATEGORY + " = ?";
        return jdbcTemplate.queryForList(sqlQuery, new Object[]{finishCategory}, String.class);
    }

    public ShutterFinishPrice findById(Integer id) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.ID + " = ?";
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{id}, new BeanPropertyRowMapper<>(ShutterFinishPrice.class));
    }

    public ShutterFinishPrice findByFinishThickness(String finish, Double thickness) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.FINISH + " = ? AND " + Columns.THICKNESS + " = ?";
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{finish, thickness}, new BeanPropertyRowMapper<>(ShutterFinishPrice.class));
    }

//    public List<ShutterFinishPrice> findByParentType(String parentType) {
//        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.PARENT_TYPE + " = ?";
//        return jdbcTemplate.query(sqlQuery, new Object[]{parentType}, new BeanPropertyRowMapper<>(CarcassSubtype.class));
//    }
//
//    public List<ShutterFinishPrice> findBySubTypeLike(String subtype) {
//        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND lower(sub_typr) LIKE?";
//        String subTypeLike = "%" + subtype.toLowerCase() + "%";
//        return jdbcTemplate.query(sqlQuery, new Object[]{subTypeLike}, new BeanPropertyRowMapper<>(CarcassSubtype.class));
//    }
    public ShutterFinishPrice insert(ShutterFinishPrice shutterFinishPrice) {
        Map<String, Object> parameters = new HashMap<>();
        parameters.put(Columns.FINISH, shutterFinishPrice.getFinish());
        parameters.put(Columns.MATERIAL, shutterFinishPrice.getMaterial());
        parameters.put(Columns.THICKNESS, shutterFinishPrice.getThickness());
        parameters.put(Columns.ONE_SIDE_PRICE, shutterFinishPrice.getOneSidePrice());
        parameters.put(Columns.BOTH_SIDE_PRICE, shutterFinishPrice.getBothSidePrice());
        parameters.put(Columns.FINISH_CATEGORY, shutterFinishPrice.getFinishCategory());
        parameters.put(Columns.DRAWING_NUMBER, shutterFinishPrice.getDrawingNumber());
        Number newId = insertShutterFinishPrice.executeAndReturnKey(parameters);
        shutterFinishPrice = findById(newId.intValue());
        return shutterFinishPrice;
    }

    public void delete(Integer id) {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET deleted=? WHERE " + Columns.ID + "=?";
        jdbcTemplate.update(sqlQuery, new Object[]{true, id});
    }

    public ShutterFinishPrice update(ShutterFinishPrice shutterFinishPrice) {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET "
                + Columns.FINISH + " = ?, "
                + Columns.MATERIAL + " = ?, "
                + Columns.THICKNESS + " = ?, "
                + Columns.ONE_SIDE_PRICE + " = ?, "
                + Columns.BOTH_SIDE_PRICE + " = ?, "
                + Columns.FINISH_CATEGORY + " = ?, "
                + Columns.DRAWING_NUMBER + " = ? WHERE " + Columns.ID + " = ?";
        Number updatedCount = jdbcTemplate.update(sqlQuery,
                new Object[]{
                    shutterFinishPrice.getFinish(),
                    shutterFinishPrice.getMaterial(),
                    shutterFinishPrice.getThickness(),
                    shutterFinishPrice.getOneSidePrice(),
                    shutterFinishPrice.getBothSidePrice(),
                    shutterFinishPrice.getFinishCategory(),
                    shutterFinishPrice.getDrawingNumber(),
                    shutterFinishPrice.getId()
                });
        shutterFinishPrice = findById(shutterFinishPrice.getId());
        return shutterFinishPrice;
    }
}
