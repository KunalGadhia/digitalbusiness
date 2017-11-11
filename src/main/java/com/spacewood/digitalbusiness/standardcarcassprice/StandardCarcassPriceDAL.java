/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.standardcarcassprice;

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
public class StandardCarcassPriceDAL {

    public static final class Columns {

        public static final String ID = "id";
        public static final String CODE = "code";
        public static final String DESCRIPTION = "description";
        public static final String WIDTH = "width";
        public static final String LENGTH = "length";
        public static final String DEPTH = "depth";
        public static final String SHELF = "shelf";
        public static final String MATERIAL = "material";
        public static final String PB_PRICE = "pb_price";
        public static final String MDF_PRICE = "mdf_price";
        public static final String HDF_PRICE = "hdf_price";
        public static final String PLY_PRICE = "ply_price";
    }

    public static final String TABLE_NAME = "standard_carcass_price_master";

    private final SimpleJdbcInsert insertStandardCarcassPrice;
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public StandardCarcassPriceDAL(DataSource dataSource) {
        jdbcTemplate = new JdbcTemplate(dataSource);
        insertStandardCarcassPrice = new SimpleJdbcInsert(jdbcTemplate)
                .withTableName(TABLE_NAME)
                .usingColumns(
                        Columns.CODE,
                        Columns.DESCRIPTION,
                        Columns.WIDTH,
                        Columns.LENGTH,
                        Columns.DEPTH,
                        Columns.SHELF,
                        Columns.MATERIAL,
                        Columns.PB_PRICE,
                        Columns.MDF_PRICE,
                        Columns.HDF_PRICE,
                        Columns.PLY_PRICE
                )
                .usingGeneratedKeyColumns(Columns.ID);
    }

    public List<StandardCarcassPrice> findAll(Integer offset) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE ORDER BY " + Columns.ID + " DESC LIMIT 10 OFFSET ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{offset}, new BeanPropertyRowMapper<>(StandardCarcassPrice.class));
    }

    public List<StandardCarcassPrice> findAllList() {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE";
        return jdbcTemplate.query(sqlQuery, new Object[]{}, new BeanPropertyRowMapper<>(StandardCarcassPrice.class));
    }

    public StandardCarcassPrice findById(Integer id) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.ID + " = ?";
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{id}, new BeanPropertyRowMapper<>(StandardCarcassPrice.class));
    }

//    public List<StandardCarcassPrice> findByDimensionAttribute(String dimensionAttribute) {
//        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.DIMENSION_ATTRIBUTE + " = ?";
//        return jdbcTemplate.query(sqlQuery, new Object[]{dimensionAttribute}, new BeanPropertyRowMapper<>(StandardCarcassPrice.class));
//    }
//
//    public List<StandardCarcassPrice> findByCarcassCategory(String carcassCategory) {
//        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.CARCASS_CATEGORY + " = ?";
//        return jdbcTemplate.query(sqlQuery, new Object[]{carcassCategory}, new BeanPropertyRowMapper<>(StandardCarcassPrice.class));
//    }
//
//    public List<StandardCarcassPrice> findByCarcassCategoryDimensionAttribute(String carcassCategory, String dimensionAttribute) {
//        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.CARCASS_CATEGORY + " = ? AND " + Columns.DIMENSION_ATTRIBUTE + " = ?";
//        return jdbcTemplate.query(sqlQuery, new Object[]{carcassCategory, dimensionAttribute}, new BeanPropertyRowMapper<>(StandardCarcassPrice.class));
//    }

    public StandardCarcassPrice insert(StandardCarcassPrice standardCarcassPrice) {
        System.out.println("This are standard dimension :{}" + standardCarcassPrice);

        Map<String, Object> parameters = new HashMap<>();
        parameters.put(Columns.CODE, standardCarcassPrice.getCode());
        parameters.put(Columns.DESCRIPTION, standardCarcassPrice.getDescription());
        parameters.put(Columns.WIDTH, standardCarcassPrice.getWidth());
        parameters.put(Columns.LENGTH, standardCarcassPrice.getLength());
        parameters.put(Columns.DEPTH, standardCarcassPrice.getDepth());
        parameters.put(Columns.SHELF, standardCarcassPrice.getShelf());
        parameters.put(Columns.MATERIAL, standardCarcassPrice.getMaterial());
        parameters.put(Columns.PB_PRICE, standardCarcassPrice.getPbPrice());
        parameters.put(Columns.MDF_PRICE, standardCarcassPrice.getMdfPrice());
        parameters.put(Columns.HDF_PRICE, standardCarcassPrice.getHdfPrice());
        parameters.put(Columns.PLY_PRICE, standardCarcassPrice.getPlyPrice());
        Number newId = insertStandardCarcassPrice.executeAndReturnKey(parameters);
        standardCarcassPrice = findById(newId.intValue());
        return standardCarcassPrice;
    }

    public void delete(Integer id) {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET deleted=? WHERE " + Columns.ID + "=?";
        jdbcTemplate.update(sqlQuery, new Object[]{true, id});
    }

    public StandardCarcassPrice update(StandardCarcassPrice standardCarcassPrice) {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET "
                + Columns.CODE + " = ?, "
                + Columns.DESCRIPTION + " = ?, "
                + Columns.WIDTH + " = ?, "
                + Columns.LENGTH + " = ?, "
                + Columns.DEPTH + " = ?, "
                + Columns.SHELF + " = ?, "
                + Columns.MATERIAL + " = ?, "
                + Columns.PB_PRICE + " = ?, "
                + Columns.MDF_PRICE + " = ?, "
                + Columns.HDF_PRICE + " = ?, "
                + Columns.PLY_PRICE + " = ? WHERE " + Columns.ID + " = ?";
        Number updatedCount = jdbcTemplate.update(sqlQuery,
                new Object[]{
                    standardCarcassPrice.getCode(),
                    standardCarcassPrice.getDescription(),
                    standardCarcassPrice.getWidth(),
                    standardCarcassPrice.getLength(),
                    standardCarcassPrice.getDepth(),
                    standardCarcassPrice.getShelf(),
                    standardCarcassPrice.getMaterial(),
                    standardCarcassPrice.getPbPrice(),
                    standardCarcassPrice.getMdfPrice(),
                    standardCarcassPrice.getHdfPrice(),
                    standardCarcassPrice.getPlyPrice(),
                    standardCarcassPrice.getId()
                });
        standardCarcassPrice = findById(standardCarcassPrice.getId());
        return standardCarcassPrice;
    }
}
