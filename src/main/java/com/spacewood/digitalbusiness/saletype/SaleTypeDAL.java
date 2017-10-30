/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.saletype;

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
public class SaleTypeDAL {
    public static final class Columns {

        public static final String ID = "id";
        public static final String SALE_TYPE = "sale_type";
        public static final String SALE_TYPE_CODE = "sale_type_code";
        public static final String DESCRIPTION = "description";
        
    }

    public static final String TABLE_NAME = "sale_type_master";

    private final SimpleJdbcInsert insertSaleType;
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public SaleTypeDAL(DataSource dataSource) {
        jdbcTemplate = new JdbcTemplate(dataSource);
        insertSaleType = new SimpleJdbcInsert(jdbcTemplate)
                .withTableName(TABLE_NAME)
                .usingColumns(
                        Columns.SALE_TYPE,
                        Columns.SALE_TYPE_CODE,
                        Columns.DESCRIPTION
                )
                .usingGeneratedKeyColumns(Columns.ID);
    }

    public List<SaleType> findAll(Integer offset) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE ORDER BY " + Columns.ID + " DESC LIMIT 5 OFFSET ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{offset}, new BeanPropertyRowMapper<>(SaleType.class));
    }

    public SaleType findById(Integer id) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.ID + " = ?";
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{id}, new BeanPropertyRowMapper<>(SaleType.class));
    }   
    
    public SaleType findBySegment(String segment) {       
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.SALE_TYPE + " = ?";        
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{segment}, new BeanPropertyRowMapper<>(SaleType.class));
    }

    public List<SaleType> findBySaleTypeLike(String saleType) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND lower(sale_type) LIKE?";
        String nameLike = "%" + saleType.toLowerCase() + "%";
        return jdbcTemplate.query(sqlQuery, new Object[]{nameLike}, new BeanPropertyRowMapper<>(SaleType.class));
    }

    public SaleType insert(SaleType saleType) {
        Map<String, Object> parameters = new HashMap<>();
        parameters.put(Columns.SALE_TYPE, saleType.getSaleType());
        parameters.put(Columns.SALE_TYPE_CODE, saleType.getSaleTypeCode());
        parameters.put(Columns.DESCRIPTION, saleType.getDescription());        
        
        Number newId = insertSaleType.executeAndReturnKey(parameters);
        saleType = findById(newId.intValue());
        return saleType;
    }

    public void delete(Integer id) {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET deleted=? WHERE " + Columns.ID + "=?";
        jdbcTemplate.update(sqlQuery, new Object[]{true, id});
    }

    public SaleType update(SaleType saleType) {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET "
                + Columns.SALE_TYPE + " = ?,"
                + Columns.SALE_TYPE_CODE + " = ?, "                
                + Columns.DESCRIPTION + " = ? WHERE " + Columns.ID + " = ?";
        Number updatedCount = jdbcTemplate.update(sqlQuery,
                new Object[]{
                    saleType.getSaleType(),
                    saleType.getSaleTypeCode(),
                    saleType.getDescription(),
                    saleType.getId()
                });
        saleType = findById(saleType.getId());
        return saleType;
    }
}
