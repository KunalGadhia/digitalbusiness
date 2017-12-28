/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.fillerfinishprice;

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
public class FillerFinishPriceDAL {
    public static final class Columns {

        public static final String ID = "id";
        public static final String FINISH = "finish";
        public static final String MATERIAL = "material";
        public static final String THICKNESS = "thickness";
        public static final String ONE_SIDE_PRICE = "one_side_price";
        public static final String BOTH_SIDE_PRICE = "both_side_price";
    }

    public static final String TABLE_NAME = "filler_finish_price_master";

    private final SimpleJdbcInsert insertFillerFinishPrice;
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public FillerFinishPriceDAL(DataSource dataSource) {
        jdbcTemplate = new JdbcTemplate(dataSource);
        insertFillerFinishPrice = new SimpleJdbcInsert(jdbcTemplate)
                .withTableName(TABLE_NAME)
                .usingColumns(
                        Columns.FINISH,
                        Columns.MATERIAL,
                        Columns.THICKNESS,
                        Columns.ONE_SIDE_PRICE,
                        Columns.BOTH_SIDE_PRICE
                )
                .usingGeneratedKeyColumns(Columns.ID);
    }

    public List<FillerFinishPrice> findAll(Integer offset) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE ORDER BY " + Columns.ID + " DESC LIMIT 10 OFFSET ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{offset}, new BeanPropertyRowMapper<>(FillerFinishPrice.class));
    }

    public List<FillerFinishPrice> findAllList() {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE";
        return jdbcTemplate.query(sqlQuery, new Object[]{}, new BeanPropertyRowMapper<>(FillerFinishPrice.class));
    }

    public List<FillerFinishPrice> findByFinish(String finish) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.FINISH + " = ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{finish}, new BeanPropertyRowMapper<>(FillerFinishPrice.class));
    }

    public List<String> findUniqueFinish() {
        String sqlQuery = "SELECT DISTINCT finish FROM " + TABLE_NAME + " WHERE deleted = FALSE";
        return jdbcTemplate.queryForList(sqlQuery, String.class);
    }

    public FillerFinishPrice findById(Integer id) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.ID + " = ?";
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{id}, new BeanPropertyRowMapper<>(FillerFinishPrice.class));
    }

    public FillerFinishPrice findByFinishThickness(String finish, Double thickness) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.FINISH + " = ? AND " + Columns.THICKNESS + " = ?";
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{finish, thickness}, new BeanPropertyRowMapper<>(FillerFinishPrice.class));
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
    public FillerFinishPrice insert(FillerFinishPrice fillerFinishPrice) {
        Map<String, Object> parameters = new HashMap<>();
        parameters.put(Columns.FINISH, fillerFinishPrice.getFinish());
        parameters.put(Columns.MATERIAL, fillerFinishPrice.getMaterial());
        parameters.put(Columns.THICKNESS, fillerFinishPrice.getThickness());
        parameters.put(Columns.ONE_SIDE_PRICE, fillerFinishPrice.getOneSidePrice());
        parameters.put(Columns.BOTH_SIDE_PRICE, fillerFinishPrice.getBothSidePrice());
        Number newId = insertFillerFinishPrice.executeAndReturnKey(parameters);
        fillerFinishPrice = findById(newId.intValue());
        return fillerFinishPrice;
    }

    public void delete(Integer id) {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET deleted=? WHERE " + Columns.ID + "=?";
        jdbcTemplate.update(sqlQuery, new Object[]{true, id});
    }

    public FillerFinishPrice update(FillerFinishPrice fillerFinishPrice) {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET "
                + Columns.FINISH + " = ?, "
                + Columns.MATERIAL + " = ?, "
                + Columns.THICKNESS + " = ?, "
                + Columns.ONE_SIDE_PRICE + " = ?, "
                + Columns.BOTH_SIDE_PRICE + " = ? WHERE " + Columns.ID + " = ?";
        Number updatedCount = jdbcTemplate.update(sqlQuery,
                new Object[]{
                    fillerFinishPrice.getFinish(),
                    fillerFinishPrice.getMaterial(),
                    fillerFinishPrice.getThickness(),
                    fillerFinishPrice.getOneSidePrice(),
                    fillerFinishPrice.getBothSidePrice(),
                    fillerFinishPrice.getId()
                });
        fillerFinishPrice = findById(fillerFinishPrice.getId());
        return fillerFinishPrice;
    }
}
