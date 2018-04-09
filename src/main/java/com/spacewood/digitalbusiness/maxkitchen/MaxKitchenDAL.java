/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.maxkitchen;

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
 * @author user
 */
@Repository
public class MaxKitchenDAL {

    public static final class Columns {

        public static final String ID = "id";
        public static final String CATEGORY = "category";
        public static final String DESCRIPTION = "description";
        public static final String WIDTH = "width";
        public static final String HEIGHT = "height";
        public static final String DEPTH = "depth";
        public static final String HDF_MATT_PRICE = "hdf_matt_price";
        public static final String HDF_GLOSS_PRICE = "hdf_gloss_price";
        public static final String GLASS_G50_ALU_PRICE = "glass_g50_alu_price";
        public static final String GLASS = "glass";
    }

    public static final String TABLE_NAME = "max_kitchen_master";

    private final SimpleJdbcInsert insertMaxKitchen;
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public MaxKitchenDAL(DataSource dataSource) {
        jdbcTemplate = new JdbcTemplate(dataSource);
        insertMaxKitchen = new SimpleJdbcInsert(jdbcTemplate)
                .withTableName(TABLE_NAME)
                .usingColumns(
                        Columns.CATEGORY,
                        Columns.DESCRIPTION,
                        Columns.WIDTH,
                        Columns.HEIGHT,
                        Columns.DEPTH,
                        Columns.HDF_MATT_PRICE,
                        Columns.HDF_GLOSS_PRICE,
                        Columns.GLASS_G50_ALU_PRICE,
                        Columns.GLASS
                )
                .usingGeneratedKeyColumns(Columns.ID);
    }

    public List<MaxKitchen> findAll(Integer offset) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE ORDER BY " + Columns.ID + " DESC LIMIT 10 OFFSET ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{offset}, new BeanPropertyRowMapper<>(MaxKitchen.class));
    }
    
    public List<MaxKitchen> findByCategory(String category) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.CATEGORY + " = ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{category}, new BeanPropertyRowMapper<>(MaxKitchen.class));
    }

    public MaxKitchen findById(Integer id) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.ID + " = ?";
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{id}, new BeanPropertyRowMapper<>(MaxKitchen.class));
    }

    public MaxKitchen findByDescription(String description) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.DESCRIPTION + " = ?";
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{description}, new BeanPropertyRowMapper<>(MaxKitchen.class));
    }

    public List<MaxKitchen> findByDescriptionLike(String description) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND lower(description) LIKE?";
        String nameLike = "%" + description.toLowerCase() + "%";
        return jdbcTemplate.query(sqlQuery, new Object[]{nameLike}, new BeanPropertyRowMapper<>(MaxKitchen.class));
    }

    public MaxKitchen insert(MaxKitchen maxKitchen) {
        Map<String, Object> parameters = new HashMap<>();
        parameters.put(Columns.CATEGORY, maxKitchen.getCategory().name());
        parameters.put(Columns.DESCRIPTION, maxKitchen.getDescription());
        parameters.put(Columns.WIDTH, maxKitchen.getWidth());
        parameters.put(Columns.HEIGHT, maxKitchen.getHeight());
        parameters.put(Columns.DEPTH, maxKitchen.getDepth());
        parameters.put(Columns.HDF_MATT_PRICE, maxKitchen.getHdfMattPrice());
        parameters.put(Columns.HDF_GLOSS_PRICE, maxKitchen.getHdfGlossPrice());
        parameters.put(Columns.GLASS_G50_ALU_PRICE, maxKitchen.getGlassG50AluPrice());
        parameters.put(Columns.GLASS, maxKitchen.getGlass());

        Number newId = insertMaxKitchen.executeAndReturnKey(parameters);
        maxKitchen = findById(newId.intValue());
        return maxKitchen;
    }

    public void delete(Integer id) {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET deleted=? WHERE " + Columns.ID + "=?";
        jdbcTemplate.update(sqlQuery, new Object[]{true, id});
    }

    public MaxKitchen update(MaxKitchen maxKitchen) {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET "
                + Columns.CATEGORY + " = ?,"
                + Columns.DESCRIPTION + " = ?, "
                + Columns.WIDTH + " = ?,"
                + Columns.HEIGHT + " = ?,"
                + Columns.DEPTH + " = ?,"
                + Columns.HDF_MATT_PRICE + " = ?,"
                + Columns.HDF_GLOSS_PRICE + " = ?,"
                + Columns.GLASS_G50_ALU_PRICE + " = ?,"
                + Columns.GLASS + " = ? WHERE " + Columns.ID + " = ?";
        Number updatedCount = jdbcTemplate.update(sqlQuery,
                new Object[]{
                    maxKitchen.getCategory().name(),
                    maxKitchen.getDescription(),
                    maxKitchen.getWidth(),
                    maxKitchen.getHeight(),
                    maxKitchen.getDepth(),
                    maxKitchen.getHdfMattPrice(),
                    maxKitchen.getHdfGlossPrice(),
                    maxKitchen.getGlassG50AluPrice(),
                    maxKitchen.getGlass(),
                    maxKitchen.getId()
                });
        maxKitchen = findById(maxKitchen.getId());
        return maxKitchen;
    }
}
