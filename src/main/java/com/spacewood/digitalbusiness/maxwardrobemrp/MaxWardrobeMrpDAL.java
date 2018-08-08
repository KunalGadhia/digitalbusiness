/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.maxwardrobemrp;

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
public class MaxWardrobeMrpDAL {
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
        public static final String PRICE3 = "price3";
        public static final String PRICE4 = "price4";        
        public static final String SOFT_CLOSE_HINGES = "soft_close_hinges";        
        public static final String PRICEH1 = "priceh1";
        public static final String PRICEH2 = "priceh2";
        public static final String PRICEH3 = "priceh3";
        public static final String PRICEH4 = "priceh4";
        public static final String PRICEH5 = "priceh5";

    }

    public static final String TABLE_NAME = "max_wardrobe_mrp";

    private final SimpleJdbcInsert insertMaxWardrobeMrp;
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public MaxWardrobeMrpDAL(DataSource dataSource) {
        jdbcTemplate = new JdbcTemplate(dataSource);
        insertMaxWardrobeMrp = new SimpleJdbcInsert(jdbcTemplate)
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
                        Columns.PRICE3,
                        Columns.PRICE4,                        
                        Columns.SOFT_CLOSE_HINGES,                        
                        Columns.PRICEH1,
                        Columns.PRICEH2,
                        Columns.PRICEH3,
                        Columns.PRICEH4,
                        Columns.PRICEH5
                )
                .usingGeneratedKeyColumns(Columns.ID);
    }

    public List<MaxWardrobeMrp> findAll(Integer offset) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE ORDER BY " + Columns.ID + " DESC LIMIT 10 OFFSET ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{offset}, new BeanPropertyRowMapper<>(MaxWardrobeMrp.class));
    }

    public List<MaxWardrobeMrp> findByCategory(String category) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.CATEGORY + " = ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{category}, new BeanPropertyRowMapper<>(MaxWardrobeMrp.class));
    }

    public MaxWardrobeMrp findById(Integer id) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.ID + " = ?";
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{id}, new BeanPropertyRowMapper<>(MaxWardrobeMrp.class));
    }

    public MaxWardrobeMrp findByDescription(String description) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.DESCRIPTION + " = ?";
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{description}, new BeanPropertyRowMapper<>(MaxWardrobeMrp.class));
    }

    public List<MaxWardrobeMrp> findByDescriptionLike(String description) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND lower(description) LIKE?";
        String nameLike = "%" + description.toLowerCase() + "%";
        return jdbcTemplate.query(sqlQuery, new Object[]{nameLike}, new BeanPropertyRowMapper<>(MaxWardrobeMrp.class));
    }

    public MaxWardrobeMrp insert(MaxWardrobeMrp maxWardrobeMrp) {
        Map<String, Object> parameters = new HashMap<>();
        parameters.put(Columns.CATEGORY, maxWardrobeMrp.getCategory().name());
        parameters.put(Columns.PRODUCT_CODE, maxWardrobeMrp.getProductCode());        
        parameters.put(Columns.DESCRIPTION, maxWardrobeMrp.getDescription());
        parameters.put(Columns.WIDTH, maxWardrobeMrp.getWidth());
        parameters.put(Columns.DEPTH, maxWardrobeMrp.getDepth());
        parameters.put(Columns.HEIGHT, maxWardrobeMrp.getHeight());
        parameters.put(Columns.CARCASS_PRICE, maxWardrobeMrp.getCarcassPrice());
        parameters.put(Columns.PRICE1, maxWardrobeMrp.getPrice1());
        parameters.put(Columns.PRICE2, maxWardrobeMrp.getPrice2());
        parameters.put(Columns.PRICE3, maxWardrobeMrp.getPrice3());
        parameters.put(Columns.PRICE4, maxWardrobeMrp.getPrice4());        
        parameters.put(Columns.SOFT_CLOSE_HINGES, maxWardrobeMrp.getSoftCloseHinges());        
        parameters.put(Columns.PRICEH1, maxWardrobeMrp.getPriceh1());
        parameters.put(Columns.PRICEH2, maxWardrobeMrp.getPriceh2());
        parameters.put(Columns.PRICEH3, maxWardrobeMrp.getPriceh3());
        parameters.put(Columns.PRICEH4, maxWardrobeMrp.getPriceh4());
        parameters.put(Columns.PRICEH5, maxWardrobeMrp.getPriceh5());        

        Number newId = insertMaxWardrobeMrp.executeAndReturnKey(parameters);
        maxWardrobeMrp = findById(newId.intValue());
        return maxWardrobeMrp;
    }

    public void delete(Integer id) {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET deleted=? WHERE " + Columns.ID + "=?";
        jdbcTemplate.update(sqlQuery, new Object[]{true, id});
    }

    public MaxWardrobeMrp update(MaxWardrobeMrp maxWardrobeMrp) {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET "
                + Columns.PRODUCT_CODE + " = ?,"
                + Columns.CATEGORY + " = ?,"
                + Columns.DESCRIPTION + " = ?, "
                + Columns.WIDTH + " = ?,"
                + Columns.DEPTH + " = ?,"
                + Columns.HEIGHT + " = ?,"
                + Columns.PRICE1 + " = ?,"
                + Columns.PRICE2 + " = ?,"
                + Columns.PRICE3 + " = ?,"
                + Columns.PRICE4 + " = ?,"                
                + Columns.SOFT_CLOSE_HINGES + " = ?,"                
                + Columns.PRICEH1 + " = ?,"
                + Columns.PRICEH2 + " = ?,"
                + Columns.PRICEH3 + " = ?,"
                + Columns.PRICEH4 + " = ?,"                
                + Columns.PRICEH5 + " = ? WHERE " + Columns.ID + " = ?";
        Number updatedCount = jdbcTemplate.update(sqlQuery,
                new Object[]{
                    maxWardrobeMrp.getProductCode(),
                    maxWardrobeMrp.getCategory().name(),
                    maxWardrobeMrp.getDescription(),
                    maxWardrobeMrp.getWidth(),
                    maxWardrobeMrp.getDepth(),
                    maxWardrobeMrp.getHeight(),
                    maxWardrobeMrp.getCarcassPrice(),
                    maxWardrobeMrp.getPrice1(),
                    maxWardrobeMrp.getPrice2(),
                    maxWardrobeMrp.getPrice3(),
                    maxWardrobeMrp.getPrice4(),                    
                    maxWardrobeMrp.getSoftCloseHinges(),                    
                    maxWardrobeMrp.getPriceh1(),
                    maxWardrobeMrp.getPriceh2(),
                    maxWardrobeMrp.getPriceh3(),
                    maxWardrobeMrp.getPriceh4(),
                    maxWardrobeMrp.getPriceh5(),
                    maxWardrobeMrp.getId()
                });
        maxWardrobeMrp = findById(maxWardrobeMrp.getId());
        return maxWardrobeMrp;
    }
}
