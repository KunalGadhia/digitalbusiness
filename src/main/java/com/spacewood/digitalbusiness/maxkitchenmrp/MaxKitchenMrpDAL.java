/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.maxkitchenmrp;

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
 * @author User
 */
@Repository
public class MaxKitchenMrpDAL {
    public static final class Columns {

        public static final String ID = "id";
        public static final String CATEGORY = "category";
        public static final String PRODUCT_CODE = "product_code";        
        public static final String DESCRIPTION = "description";
        public static final String WIDTH = "width";
        public static final String DEPTH = "depth";
        public static final String HEIGHT = "height";
        public static final String CARCASS_PRICE = "carcass_price";
        public static final String PRICE1 = "price1";
        public static final String PRICE2 = "price2";        
        public static final String SOFT_CLOSE_HINGES = "soft_close_hinges";
        public static final String ACCESSORIES = "accessories";        
        public static final String PRICEH1 = "priceh1";
        public static final String PRICEH2 = "priceh2";
        public static final String PRICEH3 = "priceh3";
        public static final String PRICEH4 = "priceh4";
        public static final String PRICEH5 = "priceh5";

    }

    public static final String TABLE_NAME = "max_kitchen_mrp";

    private final SimpleJdbcInsert insertMaxKitchenMrp;
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public MaxKitchenMrpDAL(DataSource dataSource) {
        jdbcTemplate = new JdbcTemplate(dataSource);
        insertMaxKitchenMrp = new SimpleJdbcInsert(jdbcTemplate)
                .withTableName(TABLE_NAME)
                .usingColumns(
                        Columns.PRODUCT_CODE,
                        Columns.CATEGORY,
                        Columns.DESCRIPTION,
                        Columns.WIDTH,
                        Columns.DEPTH,
                        Columns.HEIGHT,
                        Columns.CARCASS_PRICE,
                        Columns.PRICE1,
                        Columns.PRICE2,                        
                        Columns.SOFT_CLOSE_HINGES,
                        Columns.ACCESSORIES,                        
                        Columns.PRICEH1,
                        Columns.PRICEH2,
                        Columns.PRICEH3,
                        Columns.PRICEH4,
                        Columns.PRICEH5
                )
                .usingGeneratedKeyColumns(Columns.ID);
    }

    public List<MaxKitchenMrp> findAll(Integer offset) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE ORDER BY " + Columns.ID + " DESC LIMIT 10 OFFSET ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{offset}, new BeanPropertyRowMapper<>(MaxKitchenMrp.class));
    }

    public List<MaxKitchenMrp> findByCategory(String category) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.CATEGORY + " = ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{category}, new BeanPropertyRowMapper<>(MaxKitchenMrp.class));
    }

    public MaxKitchenMrp findById(Integer id) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.ID + " = ?";
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{id}, new BeanPropertyRowMapper<>(MaxKitchenMrp.class));
    }

    public MaxKitchenMrp findByDescription(String description) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.DESCRIPTION + " = ?";
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{description}, new BeanPropertyRowMapper<>(MaxKitchenMrp.class));
    }

    public List<MaxKitchenMrp> findByDescriptionLike(String description) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND lower(description) LIKE?";
        String nameLike = "%" + description.toLowerCase() + "%";
        return jdbcTemplate.query(sqlQuery, new Object[]{nameLike}, new BeanPropertyRowMapper<>(MaxKitchenMrp.class));
    }

    public MaxKitchenMrp insert(MaxKitchenMrp maxKitchenMrp) {
        Map<String, Object> parameters = new HashMap<>();
        parameters.put(Columns.CATEGORY, maxKitchenMrp.getCategory().name());
        parameters.put(Columns.PRODUCT_CODE, maxKitchenMrp.getProductCode());        
        parameters.put(Columns.DESCRIPTION, maxKitchenMrp.getDescription());
        parameters.put(Columns.WIDTH, maxKitchenMrp.getWidth());
        parameters.put(Columns.DEPTH, maxKitchenMrp.getDepth());
        parameters.put(Columns.HEIGHT, maxKitchenMrp.getHeight());
        parameters.put(Columns.CARCASS_PRICE, maxKitchenMrp.getCarcassPrice());
        parameters.put(Columns.PRICE1, maxKitchenMrp.getPrice1());
        parameters.put(Columns.PRICE2, maxKitchenMrp.getPrice2());        
        parameters.put(Columns.SOFT_CLOSE_HINGES, maxKitchenMrp.getSoftCloseHinges());
        parameters.put(Columns.ACCESSORIES, maxKitchenMrp.getAccessories());        
        parameters.put(Columns.PRICEH1, maxKitchenMrp.getPriceh1());
        parameters.put(Columns.PRICEH2, maxKitchenMrp.getPriceh2());
        parameters.put(Columns.PRICEH3, maxKitchenMrp.getPriceh3());
        parameters.put(Columns.PRICEH4, maxKitchenMrp.getPriceh4());
        parameters.put(Columns.PRICEH5, maxKitchenMrp.getPriceh5());        

        Number newId = insertMaxKitchenMrp.executeAndReturnKey(parameters);
        maxKitchenMrp = findById(newId.intValue());
        return maxKitchenMrp;
    }

    public void delete(Integer id) {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET deleted=? WHERE " + Columns.ID + "=?";
        jdbcTemplate.update(sqlQuery, new Object[]{true, id});
    }

    public MaxKitchenMrp update(MaxKitchenMrp maxKitchenMrp) {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET "
                + Columns.PRODUCT_CODE + " = ?,"
                + Columns.CATEGORY + " = ?,"
                + Columns.DESCRIPTION + " = ?, "
                + Columns.WIDTH + " = ?,"
                + Columns.DEPTH + " = ?,"
                + Columns.HEIGHT + " = ?,"
                + Columns.PRICE1 + " = ?,"
                + Columns.PRICE2 + " = ?,"                
                + Columns.SOFT_CLOSE_HINGES + " = ?,"
                + Columns.ACCESSORIES + " = ?,"                
                + Columns.PRICEH1 + " = ?,"
                + Columns.PRICEH2 + " = ?,"
                + Columns.PRICEH3 + " = ?,"
                + Columns.PRICEH4 + " = ?,"                
                + Columns.PRICEH5 + " = ? WHERE " + Columns.ID + " = ?";
        Number updatedCount = jdbcTemplate.update(sqlQuery,
                new Object[]{
                    maxKitchenMrp.getProductCode(),
                    maxKitchenMrp.getCategory().name(),
                    maxKitchenMrp.getDescription(),
                    maxKitchenMrp.getWidth(),
                    maxKitchenMrp.getDepth(),
                    maxKitchenMrp.getHeight(),
                    maxKitchenMrp.getCarcassPrice(),
                    maxKitchenMrp.getPrice1(),
                    maxKitchenMrp.getPrice2(),                    
                    maxKitchenMrp.getSoftCloseHinges(),
                    maxKitchenMrp.getAccessories(),                    
                    maxKitchenMrp.getPriceh1(),
                    maxKitchenMrp.getPriceh2(),
                    maxKitchenMrp.getPriceh3(),
                    maxKitchenMrp.getPriceh4(),
                    maxKitchenMrp.getPriceh5(),
                    maxKitchenMrp.getId()
                });
        maxKitchenMrp = findById(maxKitchenMrp.getId());
        return maxKitchenMrp;
    }
}
