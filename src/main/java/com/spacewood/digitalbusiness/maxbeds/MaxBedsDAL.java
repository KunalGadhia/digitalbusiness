/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.maxbeds;

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
public class MaxBedsDAL {

    public static final class Columns {

        public static final String ID = "id";
        public static final String CATEGORY = "category";
        public static final String DESCRIPTION = "description";
        public static final String WIDTH = "width";
        public static final String DEPTH = "depth";
        public static final String HEIGHT = "height";
        public static final String PRICE = "price";
    }

    public static final String TABLE_NAME = "max_beds";

    private final SimpleJdbcInsert insertMaxBeds;
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public MaxBedsDAL(DataSource dataSource) {
        jdbcTemplate = new JdbcTemplate(dataSource);
        insertMaxBeds = new SimpleJdbcInsert(jdbcTemplate)
                .withTableName(TABLE_NAME)
                .usingColumns(
                        Columns.CATEGORY,
                        Columns.DESCRIPTION,
                        Columns.WIDTH,
                        Columns.DEPTH,
                        Columns.HEIGHT,
                        Columns.PRICE
                )
                .usingGeneratedKeyColumns(Columns.ID);
    }

    public List<MaxBeds> findAll(Integer offset) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE ORDER BY " + Columns.ID + " DESC LIMIT 10 OFFSET ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{offset}, new BeanPropertyRowMapper<>(MaxBeds.class));
    }

    public List<MaxBeds> findByCategory(String category) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.CATEGORY + " = ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{category}, new BeanPropertyRowMapper<>(MaxBeds.class));
    }

    public MaxBeds findById(Integer id) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.ID + " = ?";
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{id}, new BeanPropertyRowMapper<>(MaxBeds.class));
    }

    public MaxBeds findByDescription(String description) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.DESCRIPTION + " = ?";
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{description}, new BeanPropertyRowMapper<>(MaxBeds.class));
    }

    public List<MaxBeds> findByDescriptionLike(String description) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND lower(description) LIKE?";
        String nameLike = "%" + description.toLowerCase() + "%";
        return jdbcTemplate.query(sqlQuery, new Object[]{nameLike}, new BeanPropertyRowMapper<>(MaxBeds.class));
    }

    public MaxBeds insert(MaxBeds maxBeds) {
        Map<String, Object> parameters = new HashMap<>();
        parameters.put(Columns.CATEGORY, maxBeds.getCategory().name());
        parameters.put(Columns.DESCRIPTION, maxBeds.getDescription());
        parameters.put(Columns.WIDTH, maxBeds.getWidth());
        parameters.put(Columns.DEPTH, maxBeds.getDepth());
        parameters.put(Columns.HEIGHT, maxBeds.getHeight());
        parameters.put(Columns.PRICE, maxBeds.getPrice());

        Number newId = insertMaxBeds.executeAndReturnKey(parameters);
        maxBeds = findById(newId.intValue());
        return maxBeds;
    }

    public void delete(Integer id) {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET deleted=? WHERE " + Columns.ID + "=?";
        jdbcTemplate.update(sqlQuery, new Object[]{true, id});
    }

    public MaxBeds update(MaxBeds maxBeds) {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET "
                + Columns.CATEGORY + " = ?,"
                + Columns.DESCRIPTION + " = ?, "
                + Columns.WIDTH + " = ?,"
                + Columns.DEPTH + " = ?,"
                + Columns.HEIGHT + " = ?,"
                + Columns.PRICE + " = ? WHERE " + Columns.ID + " = ?";
        Number updatedCount = jdbcTemplate.update(sqlQuery,
                new Object[]{
                    maxBeds.getCategory().name(),
                    maxBeds.getDescription(),
                    maxBeds.getWidth(),
                    maxBeds.getDepth(),
                    maxBeds.getHeight(),
                    maxBeds.getPrice(),
                    maxBeds.getId()
                });
        maxBeds = findById(maxBeds.getId());
        return maxBeds;
    }
}
