/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.color;

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
public class ColorDAL {

    public static final class Columns {

        public static final String ID = "id";
        public static final String COLOR_CODE = "color_code";
        public static final String COLOR_NAME = "color_name";
        public static final String COLOR_CATEGORY = "color_category";
        public static final String IMAGE = "image";
    }

    public static final String TABLE_NAME = "color_code_master";

    private final SimpleJdbcInsert insertColorCode;
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public ColorDAL(DataSource dataSource) {
        jdbcTemplate = new JdbcTemplate(dataSource);
        insertColorCode = new SimpleJdbcInsert(jdbcTemplate)
                .withTableName(TABLE_NAME)
                .usingColumns(
                        Columns.COLOR_CODE,
                        Columns.COLOR_NAME,
                        Columns.COLOR_CATEGORY
                )
                .usingGeneratedKeyColumns(Columns.ID);
    }

    public List<Color> findAll(Integer offset) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE ORDER BY " + Columns.ID + " DESC LIMIT 10 OFFSET ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{offset}, new BeanPropertyRowMapper<>(Color.class));
    }

    public List<Color> findAllList() {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE";
        return jdbcTemplate.query(sqlQuery, new Object[]{}, new BeanPropertyRowMapper<>(Color.class));
    }

    public Color findById(Integer id) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.ID + " = ?";
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{id}, new BeanPropertyRowMapper<>(Color.class));
    }

    public Color findByColor(String color) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.COLOR_NAME + " = ?";
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{color}, new BeanPropertyRowMapper<>(Color.class));
    }

    public Color findByColorCode(String colorCode) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.COLOR_CODE + " = ?";
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{colorCode}, new BeanPropertyRowMapper<>(Color.class));
    }

//    public List<Color> findByComponentLike(String component) {
//        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND lower(component) LIKE?";
//        String userNameLike = "%" + component.toLowerCase() + "%";
//        return jdbcTemplate.query(sqlQuery, new Object[]{userNameLike}, new BeanPropertyRowMapper<>(KitchenComponent.class));
//    }
    public List<Color> findByColorCategory(String colorCategory) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.COLOR_CATEGORY + " = ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{colorCategory}, new BeanPropertyRowMapper<>(Color.class));
    }

    public Color insert(Color color) {
        Map<String, Object> parameters = new HashMap<>();
        parameters.put(Columns.COLOR_CODE, color.getColorCode());
        parameters.put(Columns.COLOR_NAME, color.getColorName());
        parameters.put(Columns.COLOR_CATEGORY, color.getColorCategory().name());
        Number newId = insertColorCode.executeAndReturnKey(parameters);
        color = findById(newId.intValue());
        return color;
    }

    public void delete(Integer id) {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET deleted=? WHERE " + Columns.ID + "=?";
        jdbcTemplate.update(sqlQuery, new Object[]{true, id});
    }

    public Color update(Color color) {
        String path = color.getImage().get(0).toString().replace("\\", "\\\\");
        System.out.println("Image Path :" + path);
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET "
                + Columns.COLOR_CODE + " = ?, "
                + Columns.COLOR_NAME + " = ?, "
                + Columns.COLOR_CATEGORY + " = ?,"
                + Columns.IMAGE + " = '" + path + "' WHERE " + Columns.ID + " = ?";
        Number updatedCount = jdbcTemplate.update(sqlQuery,
                new Object[]{
                    color.getColorCode(),
                    color.getColorName(),
                    color.getColorCategory().name(),
                    color.getId()
                });
        color = findById(color.getId());
        return color;
    }
}
