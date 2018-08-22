/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.wardrobecomponent;

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
public class WardrobeComponentDAL {

    public static final class Columns {

        public static final String ID = "id";
        public static final String CATEGORY = "category";
        public static final String PRODUCT_CODE = "product_code";
        public static final String DESCRIPTION = "description";
        public static final String WIDTH = "width";
        public static final String DEPTH = "depth";
        public static final String HEIGHT = "height";
        public static final String DP = "dp";
        public static final String MRP = "mrp";

    }

    public static final String TABLE_NAME = "wardrobe_component_master";

    private final SimpleJdbcInsert insertWardrobeComponent;
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public WardrobeComponentDAL(DataSource dataSource) {
        jdbcTemplate = new JdbcTemplate(dataSource);
        insertWardrobeComponent = new SimpleJdbcInsert(jdbcTemplate)
                .withTableName(TABLE_NAME)
                .usingColumns(
                        Columns.CATEGORY,
                        Columns.PRODUCT_CODE,
                        Columns.DESCRIPTION,
                        Columns.WIDTH,
                        Columns.DEPTH,
                        Columns.HEIGHT,
                        Columns.DP,
                        Columns.MRP
                )
                .usingGeneratedKeyColumns(Columns.ID);
    }

    public List<WardrobeComponent> findAll(Integer offset) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE ORDER BY " + Columns.ID + " DESC LIMIT 10 OFFSET ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{offset}, new BeanPropertyRowMapper<>(WardrobeComponent.class));
    }

    public List<WardrobeComponent> findByCategory(String category) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.CATEGORY + " = ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{category}, new BeanPropertyRowMapper<>(WardrobeComponent.class));
    }

    public WardrobeComponent findById(Integer id) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.ID + " = ?";
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{id}, new BeanPropertyRowMapper<>(WardrobeComponent.class));
    }

    public WardrobeComponent insert(WardrobeComponent wardrobeComponent) {
        Map<String, Object> parameters = new HashMap<>();
        parameters.put(Columns.CATEGORY, wardrobeComponent.getCategory().name());
        parameters.put(Columns.PRODUCT_CODE, wardrobeComponent.getProductCode());
        parameters.put(Columns.DESCRIPTION, wardrobeComponent.getDescription());
        parameters.put(Columns.WIDTH, wardrobeComponent.getWidth());
        parameters.put(Columns.DEPTH, wardrobeComponent.getDepth());
        parameters.put(Columns.HEIGHT, wardrobeComponent.getHeight());
        parameters.put(Columns.DP, wardrobeComponent.getDp());
        parameters.put(Columns.MRP, wardrobeComponent.getMrp());

        Number newId = insertWardrobeComponent.executeAndReturnKey(parameters);
        wardrobeComponent = findById(newId.intValue());
        return wardrobeComponent;
    }

    public void delete(Integer id) {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET deleted=? WHERE " + Columns.ID + "=?";
        jdbcTemplate.update(sqlQuery, new Object[]{true, id});
    }

    public WardrobeComponent update(WardrobeComponent wardrobeComponent) {
        //  String path = wardrobeComponent.getImage().get(0).toString().replace("\\", "\\\\");
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET "
                + Columns.CATEGORY + " = ?,"
                + Columns.PRODUCT_CODE + " = ?,"
                + Columns.DESCRIPTION + " = ?, "
                + Columns.WIDTH + " = ?,"
                + Columns.DEPTH + " = ?,"
                + Columns.HEIGHT + " = ?,"
                + Columns.DP + " = ?,"
                + Columns.MRP + " = ?" + "' WHERE " + Columns.ID + " = ?";
        Number updatedCount = jdbcTemplate.update(sqlQuery,
                new Object[]{
                    wardrobeComponent.getCategory().name(),
                    wardrobeComponent.getProductCode(),
                    wardrobeComponent.getDescription(),
                    wardrobeComponent.getWidth(),
                    wardrobeComponent.getDepth(),
                    wardrobeComponent.getHeight(),
                    wardrobeComponent.getDp(),
                    wardrobeComponent.getMrp(),
                    wardrobeComponent.getId()
                });
        wardrobeComponent = findById(wardrobeComponent.getId());
        return wardrobeComponent;
    }
}
