/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.manufacturercategory;

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
public class ManufacturerCategoryDAL {
    public static final class Columns {

        public static final String ID = "id";
        public static final String CATEGORY_NAME = "category_name";
        public static final String CATEGORY_CODE = "category_code";
        public static final String MANUFACTURER_CODE = "manufacturer_code";  
        public static final String CREATED_BY = "created_by";  
        
    }

    public static final String TABLE_NAME = "manufacturer_categoy_master";

    private final SimpleJdbcInsert insertManufacturerCategory;
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public ManufacturerCategoryDAL(DataSource dataSource) {
        jdbcTemplate = new JdbcTemplate(dataSource);
        insertManufacturerCategory = new SimpleJdbcInsert(jdbcTemplate)
                .withTableName(TABLE_NAME)
                .usingColumns(
                        Columns.CATEGORY_NAME,
                        Columns.CATEGORY_CODE,
                        Columns.MANUFACTURER_CODE,
                        Columns.CREATED_BY                        
                )
                .usingGeneratedKeyColumns(Columns.ID);
    }

    public List<ManufacturerCategory> findAll(Integer offset) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE ORDER BY " + Columns.ID + " DESC LIMIT 10 OFFSET ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{offset}, new BeanPropertyRowMapper<>(ManufacturerCategory.class));
    }

    public List<ManufacturerCategory> findAllList() {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE";
        return jdbcTemplate.query(sqlQuery, new Object[]{}, new BeanPropertyRowMapper<>(ManufacturerCategory.class));
    }

    public ManufacturerCategory findById(Integer id) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.ID + " = ?";
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{id}, new BeanPropertyRowMapper<>(ManufacturerCategory.class));
    }
    
    public ManufacturerCategory findByCategoryCode(String categoryCode) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.CATEGORY_CODE + " = ?";
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{categoryCode}, new BeanPropertyRowMapper<>(ManufacturerCategory.class));
    }
    
    public List<ManufacturerCategory> findByManufacturerCode(String manufacturerCode) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.MANUFACTURER_CODE + " = ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{manufacturerCode}, new BeanPropertyRowMapper<>(ManufacturerCategory.class));
    }
    
    public List<ManufacturerCategory> findByManufacturerCategoryLike(String manufacturerCategory) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND lower(category_name) LIKE?";
        String subTypeLike = "%" + manufacturerCategory.toLowerCase() + "%";
        return jdbcTemplate.query(sqlQuery, new Object[]{subTypeLike}, new BeanPropertyRowMapper<>(ManufacturerCategory.class));
    }

    public ManufacturerCategory insert(ManufacturerCategory manufacturerCategory) {
        Map<String, Object> parameters = new HashMap<>();
        parameters.put(Columns.CATEGORY_NAME, manufacturerCategory.getCategoryName());
        parameters.put(Columns.CATEGORY_CODE, manufacturerCategory.getCategoryCode());
        parameters.put(Columns.MANUFACTURER_CODE, manufacturerCategory.getManufacturerCode());
        parameters.put(Columns.CREATED_BY, manufacturerCategory.getCreatedBy());
        Number newId = insertManufacturerCategory.executeAndReturnKey(parameters);
        manufacturerCategory = findById(newId.intValue());
        return manufacturerCategory;
    }

    public void delete(Integer id) {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET deleted=? WHERE " + Columns.ID + "=?";
        jdbcTemplate.update(sqlQuery, new Object[]{true, id});
    }

    public ManufacturerCategory update(ManufacturerCategory manufacturerCategory) {        
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET "
                + Columns.CATEGORY_NAME + " = ?, "
                + Columns.CATEGORY_CODE + " = ?, "
                + Columns.MANUFACTURER_CODE + " = ?, "                
                + Columns.CREATED_BY + " = ? WHERE " + Columns.ID + " = ?";
        Number updatedCount = jdbcTemplate.update(sqlQuery,
                new Object[]{
                    manufacturerCategory.getCategoryName(),
                    manufacturerCategory.getCategoryCode(),
                    manufacturerCategory.getManufacturerCode(),
                    manufacturerCategory.getCreatedBy(),                    
                    manufacturerCategory.getId()
                });
        manufacturerCategory = findById(manufacturerCategory.getId());
        return manufacturerCategory;
    } 
}
