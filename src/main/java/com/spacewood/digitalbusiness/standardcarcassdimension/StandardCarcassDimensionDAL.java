/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.standardcarcassdimension;

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
public class StandardCarcassDimensionDAL {

    public static final class Columns {

        public static final String ID = "id";
        public static final String DIMENSION_ATTRIBUTE = "dimension_attribute";
        public static final String CARCASS_CATEGORY = "carcass_category";
        public static final String STD_VALUE = "std_value";
    }

    public static final String TABLE_NAME = "standard_carcass_dimension_master";

    private final SimpleJdbcInsert insertStandardCarcassDimesion;
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public StandardCarcassDimensionDAL(DataSource dataSource) {
        jdbcTemplate = new JdbcTemplate(dataSource);
        insertStandardCarcassDimesion = new SimpleJdbcInsert(jdbcTemplate)
                .withTableName(TABLE_NAME)
                .usingColumns(
                        Columns.DIMENSION_ATTRIBUTE,
                        Columns.CARCASS_CATEGORY,
                        Columns.STD_VALUE
                )
                .usingGeneratedKeyColumns(Columns.ID);
    }

    public List<StandardCarcassDimension> findAll(Integer offset) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE ORDER BY " + Columns.ID + " DESC LIMIT 10 OFFSET ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{offset}, new BeanPropertyRowMapper<>(StandardCarcassDimension.class));
    }

    public List<StandardCarcassDimension> findAllList() {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE";
        return jdbcTemplate.query(sqlQuery, new Object[]{}, new BeanPropertyRowMapper<>(StandardCarcassDimension.class));
    }

    public StandardCarcassDimension findById(Integer id) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.ID + " = ?";
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{id}, new BeanPropertyRowMapper<>(StandardCarcassDimension.class));
    }

    public List<StandardCarcassDimension> findByDimensionAttribute(String dimensionAttribute) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.DIMENSION_ATTRIBUTE + " = ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{dimensionAttribute}, new BeanPropertyRowMapper<>(StandardCarcassDimension.class));
    }

    public List<StandardCarcassDimension> findByCarcassCategory(String carcassCategory) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.CARCASS_CATEGORY + " = ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{carcassCategory}, new BeanPropertyRowMapper<>(StandardCarcassDimension.class));
    }

    public List<StandardCarcassDimension> findByCarcassCategoryDimensionAttribute(String carcassCategory, String dimensionAttribute) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.CARCASS_CATEGORY + " = ? AND " + Columns.DIMENSION_ATTRIBUTE + " = ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{carcassCategory, dimensionAttribute}, new BeanPropertyRowMapper<>(StandardCarcassDimension.class));
    }
//    
//    public KitchenComponent findByComponentCode(String componentCode) {
//        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.COMPONENT_CODE + " = ?";
//        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{componentCode}, new BeanPropertyRowMapper<>(KitchenComponent.class));
//    }
//
//    public List<KitchenComponent> findByComponentLike(String component) {
//        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND lower(component) LIKE?";
//        String userNameLike = "%" + component.toLowerCase() + "%";
//        return jdbcTemplate.query(sqlQuery, new Object[]{userNameLike}, new BeanPropertyRowMapper<>(KitchenComponent.class));
//    }
//
//    public List<KitchenComponent> findByCategory(String category) {
//        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.CATEGORY + " = ?";        
//        return jdbcTemplate.query(sqlQuery, new Object[]{category}, new BeanPropertyRowMapper<>(KitchenComponent.class));
//    }

    public StandardCarcassDimension insert(StandardCarcassDimension standardCarcassDimension) {
        System.out.println("This are standard dimension :{}"+standardCarcassDimension);

        Map<String, Object> parameters = new HashMap<>();
        parameters.put(Columns.DIMENSION_ATTRIBUTE, standardCarcassDimension.getDimensionAttribute().name());
        parameters.put(Columns.CARCASS_CATEGORY, standardCarcassDimension.getCarcassCategory().name());
        parameters.put(Columns.STD_VALUE, standardCarcassDimension.getStdValue());
        Number newId = insertStandardCarcassDimesion.executeAndReturnKey(parameters);
        standardCarcassDimension = findById(newId.intValue());
        return standardCarcassDimension;
    }

    public void delete(Integer id) {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET deleted=? WHERE " + Columns.ID + "=?";
        jdbcTemplate.update(sqlQuery, new Object[]{true, id});
    }

    public StandardCarcassDimension update(StandardCarcassDimension standardCarcassDimension) {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET "
                + Columns.DIMENSION_ATTRIBUTE + " = ?, "
                + Columns.CARCASS_CATEGORY + " = ?, "
                + Columns.STD_VALUE + " = ? WHERE " + Columns.ID + " = ?";
        Number updatedCount = jdbcTemplate.update(sqlQuery,
                new Object[]{
                    standardCarcassDimension.getDimensionAttribute().name(),
                    standardCarcassDimension.getCarcassCategory().name(),
                    standardCarcassDimension.getStdValue(),
                    standardCarcassDimension.getId()
                });
        standardCarcassDimension = findById(standardCarcassDimension.getId());
        return standardCarcassDimension;
    }
}
