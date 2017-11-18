/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.rawmaterial;

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
public class RawMaterialDAL {
    public static final class Columns {

        public static final String ID = "id";
        public static final String MATERIAL = "material";
        public static final String MATERIAL_CODE = "material_code";
        public static final String PRICE = "price";
        
    }

    public static final String TABLE_NAME = "raw_material_master";

    private final SimpleJdbcInsert insertRawMaterial;
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public RawMaterialDAL(DataSource dataSource) {
        jdbcTemplate = new JdbcTemplate(dataSource);
        insertRawMaterial = new SimpleJdbcInsert(jdbcTemplate)
                .withTableName(TABLE_NAME)
                .usingColumns(
                        Columns.MATERIAL,
                        Columns.MATERIAL_CODE,
                        Columns.PRICE
                )
                .usingGeneratedKeyColumns(Columns.ID);
    }

    public List<RawMaterial> findAll(Integer offset) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE ORDER BY " + Columns.ID + " DESC LIMIT 10 OFFSET ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{offset}, new BeanPropertyRowMapper<>(RawMaterial.class));
    }

    public List<RawMaterial> findAllList() {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE";
        return jdbcTemplate.query(sqlQuery, new Object[]{}, new BeanPropertyRowMapper<>(RawMaterial.class));
    }

    public RawMaterial findById(Integer id) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.ID + " = ?";
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{id}, new BeanPropertyRowMapper<>(RawMaterial.class));
    }

    public RawMaterial findByMaterial(String material) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.MATERIAL + " = ?";
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{material}, new BeanPropertyRowMapper<>(RawMaterial.class));
    }
    
    public RawMaterial findByMaterialCode(String materialCode) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.MATERIAL_CODE + " = ?";
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{materialCode}, new BeanPropertyRowMapper<>(RawMaterial.class));
    }

    public List<RawMaterial> findByMaterialLike(String material) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND lower(material) LIKE?";
        String materialNameLike = "%" + material.toLowerCase() + "%";
        return jdbcTemplate.query(sqlQuery, new Object[]{materialNameLike}, new BeanPropertyRowMapper<>(RawMaterial.class));
    }

//    public List<RawMaterial> findByCategory(String category) {
//        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.CA+ " = ?";        
//        return jdbcTemplate.query(sqlQuery, new Object[]{category}, new BeanPropertyRowMapper<>(RawMaterial.class));
//    }

    public RawMaterial insert(RawMaterial rawMaterial) {
        Map<String, Object> parameters = new HashMap<>();
        parameters.put(Columns.MATERIAL, rawMaterial.getMaterial());
        parameters.put(Columns.MATERIAL_CODE, rawMaterial.getMaterialCode());
        parameters.put(Columns.PRICE, rawMaterial.getPrice());
        Number newId = insertRawMaterial.executeAndReturnKey(parameters);
        rawMaterial = findById(newId.intValue());
        return rawMaterial;
    }

    public void delete(Integer id) {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET deleted=? WHERE " + Columns.ID + "=?";
        jdbcTemplate.update(sqlQuery, new Object[]{true, id});
    }

    public RawMaterial update(RawMaterial rawMaterial) {        
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET "
                + Columns.MATERIAL + " = ?, "
                + Columns.MATERIAL_CODE + " = ?, "
                + Columns.PRICE + " = ? WHERE " + Columns.ID + " = ?";
        Number updatedCount = jdbcTemplate.update(sqlQuery,
                new Object[]{
                    rawMaterial.getMaterial(),
                    rawMaterial.getMaterialCode(),                   
                    rawMaterial.getPrice(),
                    rawMaterial.getId()
                });
        rawMaterial = findById(rawMaterial.getId());
        return rawMaterial;
    }
}
