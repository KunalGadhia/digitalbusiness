/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.hardwareprice;

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
public class HardwarePriceDAL {
    public static final class Columns {

        public static final String ID = "id";
        public static final String PRODUCT_CODE = "product_code";
        public static final String HARDWARE_NAME = "hardware_name";
        public static final String PRICE = "price";
    }

    public static final String TABLE_NAME = "hardware_price_master";

    private final SimpleJdbcInsert insertHardwarePrice;
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public HardwarePriceDAL(DataSource dataSource) {
        jdbcTemplate = new JdbcTemplate(dataSource);
        insertHardwarePrice = new SimpleJdbcInsert(jdbcTemplate)
                .withTableName(TABLE_NAME)
                .usingColumns(
                        Columns.PRODUCT_CODE,
                        Columns.HARDWARE_NAME,
                        Columns.PRICE
                )
                .usingGeneratedKeyColumns(Columns.ID);
    }

    public List<HardwarePrice> findAll(Integer offset) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE ORDER BY " + Columns.ID + " DESC LIMIT 10 OFFSET ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{offset}, new BeanPropertyRowMapper<>(HardwarePrice.class));
    }

    public HardwarePrice findById(Integer id) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.ID + " = ?";
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{id}, new BeanPropertyRowMapper<>(HardwarePrice.class));
    }   
    
    public HardwarePrice findByName(String name) {       
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.HARDWARE_NAME + " = ?";        
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{name}, new BeanPropertyRowMapper<>(HardwarePrice.class));
    }

    public List<HardwarePrice> findByNameLike(String name) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND lower(hardware_name) LIKE?";
        String nameLike = "%" + name.toLowerCase() + "%";
        return jdbcTemplate.query(sqlQuery, new Object[]{nameLike}, new BeanPropertyRowMapper<>(HardwarePrice.class));
    }

    public HardwarePrice insert(HardwarePrice hardwarePrice) {
        Map<String, Object> parameters = new HashMap<>();
        parameters.put(Columns.PRODUCT_CODE, hardwarePrice.getProductCode());
        parameters.put(Columns.HARDWARE_NAME, hardwarePrice.getHardwareName());
        parameters.put(Columns.PRICE, hardwarePrice.getPrice());        
        
        Number newId = insertHardwarePrice.executeAndReturnKey(parameters);
        hardwarePrice = findById(newId.intValue());
        return hardwarePrice;
    }

    public void delete(Integer id) {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET deleted=? WHERE " + Columns.ID + "=?";
        jdbcTemplate.update(sqlQuery, new Object[]{true, id});
    }

    public HardwarePrice update(HardwarePrice hardwarePrice) {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET "
                + Columns.PRODUCT_CODE + " = ?,"
                + Columns.HARDWARE_NAME + " = ?, "                
                + Columns.PRICE + " = ? WHERE " + Columns.ID + " = ?";
        Number updatedCount = jdbcTemplate.update(sqlQuery,
                new Object[]{
                    hardwarePrice.getProductCode(),
                    hardwarePrice.getHardwareName(),                    
                    hardwarePrice.getPrice(),                    
                    hardwarePrice.getId()
                });
        hardwarePrice = findById(hardwarePrice.getId());
        return hardwarePrice;
    }
}
