/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.dealersku;

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
public class DealerSkuDAL {

    public static final class Columns {

        public static final String ID = "id";
        public static final String PRODUCT_CODE = "product_code";
        public static final String PRODUCT_DESCRIPTION = "category_code";
        public static final String MANUFACTURER_CODE = "manufacturer_code";
        public static final String MANUFACTURER_CATEGORY_CODE = "manufacturer_category_code";
        public static final String WIDTH = "width";
        public static final String DEPTH = "depth";
        public static final String HEIGHT = "height";
        public static final String COLOR = "color";
        public static final String SP_PRICE = "sp_price";
        public static final String PRICE = "price";
        public static final String IMAGE = "image";
        public static final String CREATED_BY = "created_by";

    }

    public static final String TABLE_NAME = "dealer_sku_master";

    private final SimpleJdbcInsert insertDealerSku;
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public DealerSkuDAL(DataSource dataSource) {
        jdbcTemplate = new JdbcTemplate(dataSource);
        insertDealerSku = new SimpleJdbcInsert(jdbcTemplate)
                .withTableName(TABLE_NAME)
                .usingColumns(
                        Columns.PRODUCT_CODE,
                        Columns.PRODUCT_DESCRIPTION,
                        Columns.MANUFACTURER_CODE,
                        Columns.MANUFACTURER_CATEGORY_CODE,
                        Columns.WIDTH,
                        Columns.DEPTH,
                        Columns.HEIGHT,
                        Columns.COLOR,
                        Columns.SP_PRICE,
                        Columns.PRICE,
                        Columns.IMAGE,
                        Columns.CREATED_BY
                )
                .usingGeneratedKeyColumns(Columns.ID);
    }

    public List<DealerSku> findAll(Integer offset) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE ORDER BY " + Columns.ID + " DESC LIMIT 10 OFFSET ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{offset}, new BeanPropertyRowMapper<>(DealerSku.class));
    }

    public List<DealerSku> findAllList() {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE";
        return jdbcTemplate.query(sqlQuery, new Object[]{}, new BeanPropertyRowMapper<>(DealerSku.class));
    }

    public DealerSku findById(Integer id) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.ID + " = ?";
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{id}, new BeanPropertyRowMapper<>(DealerSku.class));
    }

    public List<DealerSku> findByCategoryCode(String categoryCode) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.MANUFACTURER_CATEGORY_CODE + " = ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{categoryCode}, new BeanPropertyRowMapper<>(DealerSku.class));
    }

    public List<DealerSku> findByManufacturerCode(String manufacturerCode) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.MANUFACTURER_CODE + " = ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{manufacturerCode}, new BeanPropertyRowMapper<>(DealerSku.class));
    }

    public List<DealerSku> findByProductCode(String productCode) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.PRODUCT_CODE + " = ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{productCode}, new BeanPropertyRowMapper<>(DealerSku.class));
    }

    public List<DealerSku> findByDescriptionLike(String description) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND lower(product_description) LIKE?";
        String subTypeLike = "%" + description.toLowerCase() + "%";
        return jdbcTemplate.query(sqlQuery, new Object[]{subTypeLike}, new BeanPropertyRowMapper<>(DealerSku.class));
    }

    public List<DealerSku> findByDescriptionFilter(String manufacturerCategoryCode, String manufacturerCode) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.MANUFACTURER_CATEGORY_CODE + " = ? AND " + Columns.MANUFACTURER_CODE + " = ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{manufacturerCategoryCode, manufacturerCode}, new BeanPropertyRowMapper<>(DealerSku.class));
    }

    public DealerSku insert(DealerSku dealerSku) {
        Map<String, Object> parameters = new HashMap<>();
        parameters.put(Columns.PRODUCT_CODE, dealerSku.getProductCode());
        parameters.put(Columns.PRODUCT_DESCRIPTION, dealerSku.getProductDescription());
        parameters.put(Columns.MANUFACTURER_CODE, dealerSku.getManufacturerCode());
        parameters.put(Columns.MANUFACTURER_CATEGORY_CODE, dealerSku.getManufacturerCategoryCode());
        parameters.put(Columns.WIDTH, dealerSku.getManufacturerCode());
        parameters.put(Columns.DEPTH, dealerSku.getManufacturerCode());
        parameters.put(Columns.HEIGHT, dealerSku.getManufacturerCode());
        parameters.put(Columns.COLOR, dealerSku.getManufacturerCode());
        parameters.put(Columns.SP_PRICE, dealerSku.getManufacturerCode());
        parameters.put(Columns.PRICE, dealerSku.getManufacturerCode());
        parameters.put(Columns.IMAGE, dealerSku.getManufacturerCode());
        parameters.put(Columns.CREATED_BY, dealerSku.getCreatedBy());
        Number newId = insertDealerSku.executeAndReturnKey(parameters);
        dealerSku = findById(newId.intValue());
        return dealerSku;
    }

    public void delete(Integer id) {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET deleted=? WHERE " + Columns.ID + "=?";
        jdbcTemplate.update(sqlQuery, new Object[]{true, id});
    }

    public DealerSku update(DealerSku dealerSku) {
        String path = dealerSku.getImage().get(0).toString().replace("\\", "\\\\");
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET "
                + Columns.PRODUCT_CODE + " = ?, "
                + Columns.PRODUCT_DESCRIPTION + " = ?, "
                + Columns.MANUFACTURER_CODE + " = ?, "
                + Columns.MANUFACTURER_CATEGORY_CODE + " = ?, "
                + Columns.WIDTH + " = ?, "
                + Columns.DEPTH + " = ?, "
                + Columns.HEIGHT + " = ?, "
                + Columns.COLOR + " = ?, "
                + Columns.SP_PRICE + " = ?, "
                + Columns.PRICE + " = ?, "
                + Columns.PRICE + " = ?, "
                + Columns.CREATED_BY + " = ?, "
                + Columns.IMAGE + " = '" + path + "' WHERE " + Columns.ID + " = ?";
        Number updatedCount = jdbcTemplate.update(sqlQuery,
                new Object[]{
                    dealerSku.getProductCode(),
                    dealerSku.getProductDescription(),
                    dealerSku.getManufacturerCode(),
                    dealerSku.getManufacturerCode(),
                    dealerSku.getManufacturerCategoryCode(),
                    dealerSku.getWidth(),
                    dealerSku.getDepth(),
                    dealerSku.getHeight(),
                    dealerSku.getColor(),
                    dealerSku.getSpPrice(),
                    dealerSku.getPrice(),
                    dealerSku.getCreatedBy(),
                    dealerSku.getId()
                });
        dealerSku = findById(dealerSku.getId());
        return dealerSku;
    }
}
