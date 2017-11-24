/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.finishprice;

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
public class FinishPriceDAL {
  public static final class Columns {

        public static final String ID = "id";
        public static final String FINISH_CODE = "finish_code";
        public static final String MATERIAL_ID = "material_id";       
        public static final String FINISH_NAME = "finish_name";
        public static final String PRICE = "price";
        public static final String FOR_CARCASS = "for_carcass";
        public static final String FOR_SHUTTER = "for_shutter";
        
    }

    public static final String TABLE_NAME = "finish_price";

    private final SimpleJdbcInsert insertFinishPrice;
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public FinishPriceDAL(DataSource dataSource) {
        jdbcTemplate = new JdbcTemplate(dataSource);
        insertFinishPrice = new SimpleJdbcInsert(jdbcTemplate)
                .withTableName(TABLE_NAME)
                .usingColumns(
                        Columns.FINISH_CODE,
                        Columns.MATERIAL_ID,
                        Columns.FINISH_NAME,
                        Columns.PRICE,
                        Columns.FOR_CARCASS,
                        Columns.FOR_SHUTTER
                )
                .usingGeneratedKeyColumns(Columns.ID);
    }

    public List<FinishPrice> findAll(Integer offset) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE ORDER BY " + Columns.ID + " DESC LIMIT 10 OFFSET ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{offset}, new BeanPropertyRowMapper<>(FinishPrice.class));
    }
    
    public List<FinishPrice> findAllList() {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE";
        return jdbcTemplate.query(sqlQuery, new Object[]{}, new BeanPropertyRowMapper<>(FinishPrice.class));
    }
//    public List<KitchenComponent> findAllList() {
//        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE";
//        return jdbcTemplate.query(sqlQuery, new Object[]{}, new BeanPropertyRowMapper<>(KitchenComponent.class));
//    }

    public FinishPrice findById(Integer id) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.ID + " = ?";
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{id}, new BeanPropertyRowMapper<>(FinishPrice.class));
    }   
    
    public FinishPrice findByName(String finishName) {       
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.FINISH_NAME + " = ?";        
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{finishName}, new BeanPropertyRowMapper<>(FinishPrice.class));
    }
    
    public FinishPrice findByFinishCode(String finishCode) {       
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.FINISH_CODE + " = ?";
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{finishCode}, new BeanPropertyRowMapper<>(FinishPrice.class));
    }

    public List<FinishPrice> findByNameLike(String finishName) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND lower(finish_name) LIKE?";
        String nameLike = "%" + finishName.toLowerCase() + "%";
        return jdbcTemplate.query(sqlQuery, new Object[]{nameLike}, new BeanPropertyRowMapper<>(FinishPrice.class));
    }
    
    public List<FinishPrice> findByMaterialId(Integer materialId) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND "+Columns.MATERIAL_ID+" = ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{materialId}, new BeanPropertyRowMapper<>(FinishPrice.class));
    }
    
    public List<FinishPrice> findCarcassFinishByMaterialId(Integer materialId) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND for_carcass = TRUE AND "+Columns.MATERIAL_ID+" = ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{materialId}, new BeanPropertyRowMapper<>(FinishPrice.class));
    }
    
    public List<FinishPrice> findShutterFinishByMaterialId(Integer materialId) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND for_shutter = TRUE AND "+Columns.MATERIAL_ID+" = ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{materialId}, new BeanPropertyRowMapper<>(FinishPrice.class));
    }

    public FinishPrice insert(FinishPrice finishPrice) {
        Map<String, Object> parameters = new HashMap<>();
        parameters.put(Columns.FINISH_CODE, finishPrice.getFinishCode()); 
        parameters.put(Columns.FINISH_NAME, finishPrice.getFinishName());        
        parameters.put(Columns.MATERIAL_ID, finishPrice.getMaterialId());
        parameters.put(Columns.PRICE, finishPrice.getPrice());
        parameters.put(Columns.FOR_CARCASS, finishPrice.getForCarcass());
        parameters.put(Columns.FOR_SHUTTER, finishPrice.getForShutter());
        
        Number newId = insertFinishPrice.executeAndReturnKey(parameters);
        finishPrice = findById(newId.intValue());
        return finishPrice;
    }

    public void delete(Integer id) {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET deleted=? WHERE " + Columns.ID + "=?";
        jdbcTemplate.update(sqlQuery, new Object[]{true, id});
    }

    public FinishPrice update(FinishPrice finishPrice) {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET "                
                + Columns.FINISH_NAME + " = ?,"
                + Columns.FINISH_CODE + " = ?,"
                + Columns.MATERIAL_ID + " = ?,"
                + Columns.PRICE + " = ?,"
                + Columns.FOR_CARCASS + " = ?,"
                + Columns.FOR_SHUTTER + " = ? WHERE " + Columns.ID + " = ?";
        Number updatedCount = jdbcTemplate.update(sqlQuery,
                new Object[]{
                    finishPrice.getFinishName(),
                    finishPrice.getFinishCode(),
                    finishPrice.getMaterialId(),
                    finishPrice.getPrice(),
                    finishPrice.getForCarcass(),
                    finishPrice.getForShutter(),
                    finishPrice.getId()
                });
        finishPrice = findById(finishPrice.getId());
        return finishPrice;
    }  
}
