/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.manufacturer;

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
public class ManufacturerDAL {
   public static final class Columns {

        public static final String ID = "id";
        public static final String MANUFACTURER_CODE = "manufacturer_code";
        public static final String MANUFACTURER_NAME = "manufacturer_name";
        public static final String CREATED_BY = "created_by";        
        
    }

    public static final String TABLE_NAME = "manufacturer_master";

    private final SimpleJdbcInsert insertManufacturer;
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public ManufacturerDAL(DataSource dataSource) {
        jdbcTemplate = new JdbcTemplate(dataSource);
        insertManufacturer = new SimpleJdbcInsert(jdbcTemplate)
                .withTableName(TABLE_NAME)
                .usingColumns(
                        Columns.MANUFACTURER_CODE,
                        Columns.MANUFACTURER_NAME,
                        Columns.CREATED_BY                        
                )
                .usingGeneratedKeyColumns(Columns.ID);
    }

    public List<Manufacturer> findAll(Integer offset) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE ORDER BY " + Columns.ID + " DESC LIMIT 10 OFFSET ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{offset}, new BeanPropertyRowMapper<>(Manufacturer.class));
    }

    public List<Manufacturer> findAllList() {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE";
        return jdbcTemplate.query(sqlQuery, new Object[]{}, new BeanPropertyRowMapper<>(Manufacturer.class));
    }

    public Manufacturer findById(Integer id) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.ID + " = ?";
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{id}, new BeanPropertyRowMapper<>(Manufacturer.class));
    }
    
    public Manufacturer findByManufacturerCode(String manufacturerCode) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.MANUFACTURER_CODE + " = ?";
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{manufacturerCode}, new BeanPropertyRowMapper<>(Manufacturer.class));
    }
    
    public List<Manufacturer> findByManufacturerNameLike(String manufacturerName) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND lower(manufacturer_name) LIKE?";
        String subTypeLike = "%" + manufacturerName.toLowerCase() + "%";
        return jdbcTemplate.query(sqlQuery, new Object[]{subTypeLike}, new BeanPropertyRowMapper<>(Manufacturer.class));
    }

    public Manufacturer insert(Manufacturer manufacturer) {
        Map<String, Object> parameters = new HashMap<>();
        parameters.put(Columns.MANUFACTURER_CODE, manufacturer.getManufacturerCode());
        parameters.put(Columns.MANUFACTURER_NAME, manufacturer.getManufacturerName());
        parameters.put(Columns.CREATED_BY, manufacturer.getCreatedBy());        
        Number newId = insertManufacturer.executeAndReturnKey(parameters);
        manufacturer = findById(newId.intValue());
        return manufacturer;
    }

    public void delete(Integer id) {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET deleted=? WHERE " + Columns.ID + "=?";
        jdbcTemplate.update(sqlQuery, new Object[]{true, id});
    }

    public Manufacturer update(Manufacturer manufacturer) {        
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET "
                + Columns.MANUFACTURER_CODE + " = ?, "
                + Columns.MANUFACTURER_NAME + " = ?, "                
                + Columns.CREATED_BY + " = ? WHERE " + Columns.ID + " = ?";
        Number updatedCount = jdbcTemplate.update(sqlQuery,
                new Object[]{
                    manufacturer.getManufacturerCode(),
                    manufacturer.getManufacturerName(),                   
                    manufacturer.getCreatedBy(),                    
                    manufacturer.getId()
                });
        manufacturer = findById(manufacturer.getId());
        return manufacturer;
    } 
}
