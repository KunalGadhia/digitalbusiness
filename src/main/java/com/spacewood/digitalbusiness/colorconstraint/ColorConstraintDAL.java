/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.colorconstraint;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.sql.DataSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.stereotype.Repository;
import com.spacewood.digitalbusiness.kitchencomponent.KitchenComponentCategory;

/**
 *
 * @author webdesign
 */
@Repository
public class ColorConstraintDAL {

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    public static final class Columns {

        public static final String ID = "id";
        public static final String COMPONENT = "component";
        public static final String MATERIAL_CODE = "material_code";
        public static final String COLORS = "colors";
        public static final String FINISH_CODE = "finish_code";

    }

    public static final String TABLE_NAME = "color_constraint_master";

    private final SimpleJdbcInsert insertLocation;
    private final JdbcTemplate jdbcTemplate;
    private static final ObjectMapper mapper = new ObjectMapper();

    @Autowired
    public ColorConstraintDAL(DataSource dataSource) {
        jdbcTemplate = new JdbcTemplate(dataSource);
        insertLocation = new SimpleJdbcInsert(jdbcTemplate)
                .withTableName(TABLE_NAME)
                .usingColumns(
                        Columns.COMPONENT,
                        Columns.MATERIAL_CODE,
                        Columns.COLORS,
                        Columns.FINISH_CODE
                )
                .usingGeneratedKeyColumns(Columns.ID);
    }

    public List<ColorConstraint> findAll(Integer offset) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE ORDER BY " + Columns.ID + " DESC LIMIT 10 OFFSET ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{offset}, colorRowMapper);
    }

    public List<ColorConstraint> findAllColorConstraints() {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE";
        return jdbcTemplate.query(sqlQuery, new Object[]{}, colorRowMapper);
    }

//    public List<ColorConstraint> findByNameLike(String name) {
//        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND lower(name) LIKE?";
//        String nameLike = "" + name.toLowerCase() + "%";
//        return jdbcTemplate.query(sqlQuery, new Object[]{nameLike}, colorRowMapper);
//    }
    public ColorConstraint findById(Integer id) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.ID + " = ?";
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{id}, colorRowMapper);
    }

    public ColorConstraint findByMaterialCode(String materialCode) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.MATERIAL_CODE + " = ?";
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{materialCode}, colorRowMapper);
    }
    
    public ColorConstraint findByFinishCode(String finishCode) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.FINISH_CODE + " = ?";
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{finishCode}, colorRowMapper);
    }

    public ColorConstraint findByComponent(String component) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.COMPONENT + " = ?";
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{component}, colorRowMapper);
    }

    public ColorConstraint insert(ColorConstraint colorConstraint) throws JsonProcessingException {
        logger.info("location object in DAL line95 {}", colorConstraint);
        Map<String, Object> parameters = new HashMap<>();
        parameters.put(Columns.COMPONENT, colorConstraint.getComponent().name());
        parameters.put(Columns.MATERIAL_CODE, colorConstraint.getMaterialCode());
        parameters.put(Columns.COLORS, colorConstraint.getColors() == null ? "[]" : mapper.writeValueAsString(colorConstraint.getColors()));
        parameters.put(Columns.FINISH_CODE, colorConstraint.getFinishCode());
        System.out.println("param" + parameters);
        Number newId = insertLocation.executeAndReturnKey(parameters);
        colorConstraint = findById(newId.intValue());
        return colorConstraint;
    }

    public void delete(Integer id) {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET deleted=? WHERE " + Columns.ID + "=?";
        jdbcTemplate.update(sqlQuery, new Object[]{true, id});
    }

    public ColorConstraint update(ColorConstraint colorConstraint) throws JsonProcessingException {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET "
                + Columns.COMPONENT + "=?, "
                + Columns.MATERIAL_CODE + "=?, "
                + Columns.COLORS + "=?, "
                + Columns.FINISH_CODE + "=?  WHERE " + Columns.ID + " = ?";
        jdbcTemplate.update(sqlQuery,
                new Object[]{
                    colorConstraint.getComponent().name(),
                    colorConstraint.getMaterialCode(),
                    colorConstraint.getColors() == null ? "[]" : mapper.writeValueAsString(colorConstraint.getColors()),
                    colorConstraint.getFinishCode(),
                    colorConstraint.getId()
                }
        );
        colorConstraint = findById(colorConstraint.getId());
        return colorConstraint;
    }

    private final RowMapper<ColorConstraint> colorRowMapper = new RowMapper<ColorConstraint>() {

        @Override
        public ColorConstraint mapRow(ResultSet rs, int i) throws SQLException {
            ColorConstraint colorConstraint = new ColorConstraint();
            colorConstraint.setId(rs.getInt(Columns.ID));
            if (rs.getString(Columns.COMPONENT) != null) {
                colorConstraint.setComponent(ConstraintItem.valueOf(rs.getString(Columns.COMPONENT)));
            }
            colorConstraint.setMaterialCode(rs.getString(Columns.MATERIAL_CODE));

            String colorsList = rs.getString(Columns.COLORS);
            try {
                ObjectMapper mapper = new ObjectMapper();
                List<Integer> colors = mapper.readValue(colorsList, new TypeReference<List<Integer>>() {
                });
                colorConstraint.setColors(colors);
            } catch (IOException ex) {
                throw new RuntimeException("Error parsing colorsList: '" + colorsList + "' ", ex);
            }
            colorConstraint.setFinishCode(rs.getString(Columns.FINISH_CODE));
            return colorConstraint;
        }

    };

}
