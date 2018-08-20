/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.infinitywardrobemrp;

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
public class InfinityWardrobeMrpDAL {

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
        public static final String PRICE5 = "price5";
        public static final String PRICE6 = "price6";
        public static final String PRICE7 = "price7";
        public static final String PRICE8 = "price8";
        public static final String PRICE9 = "price9";
        public static final String PRICE10 = "price10";
        public static final String SOFT_CLOSE_HINGES = "soft_close_hinges";
        public static final String BLUM_SOFT_CLOSE = "blum_soft_close";
        public static final String DEGREE155 = "degree155";
        public static final String PRICEH1 = "priceh1";
        public static final String PRICEH2 = "priceh2";
        public static final String PRICEH3 = "priceh3";
        public static final String PRICEH4 = "priceh4";
        public static final String PRICEH5 = "priceh5";
        public static final String IMAGE = "image";

    }

    public static final String TABLE_NAME = "infinity_wardrobe_mrp";

    private final SimpleJdbcInsert insertInfinityWardrobeMrp;
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public InfinityWardrobeMrpDAL(DataSource dataSource) {
        jdbcTemplate = new JdbcTemplate(dataSource);
        insertInfinityWardrobeMrp = new SimpleJdbcInsert(jdbcTemplate)
                .withTableName(TABLE_NAME)
                .usingColumns(
                        Columns.CATEGORY,
                        Columns.PRODUCT_CODE,
                        Columns.DESCRIPTION,
                        Columns.WIDTH,
                        Columns.DEPTH,
                        Columns.HEIGHT,
                        Columns.CARCASS_PRICE,
                        Columns.PRICE1,
                        Columns.PRICE2,
                        Columns.PRICE3,
                        Columns.PRICE4,
                        Columns.PRICE5,
                        Columns.PRICE6,
                        Columns.PRICE7,
                        Columns.PRICE8,
                        Columns.PRICE9,
                        Columns.PRICE10,
                        Columns.SOFT_CLOSE_HINGES,
                        Columns.BLUM_SOFT_CLOSE,
                        Columns.DEGREE155,
                        Columns.PRICEH1,
                        Columns.PRICEH2,
                        Columns.PRICEH3,
                        Columns.PRICEH4,
                        Columns.PRICEH5
                )
                .usingGeneratedKeyColumns(Columns.ID);
    }

    public List<InfinityWardrobeMrp> findAll(Integer offset) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE ORDER BY " + Columns.ID + " DESC LIMIT 10 OFFSET ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{offset}, new BeanPropertyRowMapper<>(InfinityWardrobeMrp.class));
    }

    public List<InfinityWardrobeMrp> findByCategory(String category) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.CATEGORY + " = ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{category}, new BeanPropertyRowMapper<>(InfinityWardrobeMrp.class));
    }

    public List<InfinityWardrobeMrp> findByCategoryDimensions(String category, Double width, Double depth, Double height) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.CATEGORY + " = ? AND " + Columns.WIDTH + " = ? AND " + Columns.DEPTH + " = ? AND " + Columns.HEIGHT + " = ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{category, width, depth, height}, new BeanPropertyRowMapper<>(InfinityWardrobeMrp.class));
    }

    public List<Double> findDistinctWidth(String category) {
        String sqlQuery = "SELECT distinct(width) FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.CATEGORY + " = ? ORDER BY width DESC";
        return jdbcTemplate.queryForList(sqlQuery, new Object[]{category}, Double.class);
    }

    public List<Double> findDistinctDepth(String category) {
        String sqlQuery = "SELECT distinct(depth) FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.CATEGORY + " = ? ORDER BY depth DESC";
        return jdbcTemplate.queryForList(sqlQuery, new Object[]{category}, Double.class);
    }

    public List<Double> findDistinctHeight(String category) {
        String sqlQuery = "SELECT distinct(height) FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.CATEGORY + " = ? ORDER BY height DESC";
        return jdbcTemplate.queryForList(sqlQuery, new Object[]{category}, Double.class);
    }

    public InfinityWardrobeMrp findById(Integer id) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.ID + " = ?";
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{id}, new BeanPropertyRowMapper<>(InfinityWardrobeMrp.class));
    }

    public InfinityWardrobeMrp findByDescription(String description) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.DESCRIPTION + " = ?";
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{description}, new BeanPropertyRowMapper<>(InfinityWardrobeMrp.class));
    }

    public List<InfinityWardrobeMrp> findByDescriptionLike(String description) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND lower(description) LIKE?";
        String nameLike = "%" + description.toLowerCase() + "%";
        return jdbcTemplate.query(sqlQuery, new Object[]{nameLike}, new BeanPropertyRowMapper<>(InfinityWardrobeMrp.class));
    }

    public InfinityWardrobeMrp insert(InfinityWardrobeMrp infinityWardrobeMrp) {
        Map<String, Object> parameters = new HashMap<>();
        parameters.put(Columns.CATEGORY, infinityWardrobeMrp.getCategory().name());
        parameters.put(Columns.PRODUCT_CODE, infinityWardrobeMrp.getProductCode());
        parameters.put(Columns.DESCRIPTION, infinityWardrobeMrp.getDescription());
        parameters.put(Columns.WIDTH, infinityWardrobeMrp.getWidth());
        parameters.put(Columns.DEPTH, infinityWardrobeMrp.getDepth());
        parameters.put(Columns.HEIGHT, infinityWardrobeMrp.getHeight());
        parameters.put(Columns.CARCASS_PRICE, infinityWardrobeMrp.getCarcassPrice());
        parameters.put(Columns.PRICE1, infinityWardrobeMrp.getPrice1());
        parameters.put(Columns.PRICE2, infinityWardrobeMrp.getPrice2());
        parameters.put(Columns.PRICE3, infinityWardrobeMrp.getPrice3());
        parameters.put(Columns.PRICE4, infinityWardrobeMrp.getPrice4());
        parameters.put(Columns.PRICE5, infinityWardrobeMrp.getPrice5());
        parameters.put(Columns.PRICE6, infinityWardrobeMrp.getPrice6());
        parameters.put(Columns.PRICE7, infinityWardrobeMrp.getPrice7());
        parameters.put(Columns.PRICE8, infinityWardrobeMrp.getPrice8());
        parameters.put(Columns.PRICE9, infinityWardrobeMrp.getPrice9());
        parameters.put(Columns.PRICE10, infinityWardrobeMrp.getPrice10());
        parameters.put(Columns.SOFT_CLOSE_HINGES, infinityWardrobeMrp.getSoftCloseHinges());
        parameters.put(Columns.BLUM_SOFT_CLOSE, infinityWardrobeMrp.getBlumSoftClose());
        parameters.put(Columns.DEGREE155, infinityWardrobeMrp.getDegree155());
        parameters.put(Columns.PRICEH1, infinityWardrobeMrp.getPriceh1());
        parameters.put(Columns.PRICEH2, infinityWardrobeMrp.getPriceh2());
        parameters.put(Columns.PRICEH3, infinityWardrobeMrp.getPriceh3());
        parameters.put(Columns.PRICEH4, infinityWardrobeMrp.getPriceh4());
        parameters.put(Columns.PRICEH5, infinityWardrobeMrp.getPriceh5());

        Number newId = insertInfinityWardrobeMrp.executeAndReturnKey(parameters);
        infinityWardrobeMrp = findById(newId.intValue());
        return infinityWardrobeMrp;
    }

    public void delete(Integer id) {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET deleted=? WHERE " + Columns.ID + "=?";
        jdbcTemplate.update(sqlQuery, new Object[]{true, id});
    }

    public InfinityWardrobeMrp update(InfinityWardrobeMrp infinityWardrobeMrp) {
        String path = infinityWardrobeMrp.getImage().get(0).toString().replace("\\", "\\\\");
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
                + Columns.PRICE5 + " = ?,"
                + Columns.PRICE6 + " = ?,"
                + Columns.PRICE7 + " = ?,"
                + Columns.PRICE8 + " = ?,"
                + Columns.PRICE9 + " = ?,"
                + Columns.PRICE10 + " = ?,"
                + Columns.SOFT_CLOSE_HINGES + " = ?,"
                + Columns.BLUM_SOFT_CLOSE + " = ?,"
                + Columns.DEGREE155 + " = ?,"
                + Columns.PRICEH1 + " = ?,"
                + Columns.PRICEH2 + " = ?,"
                + Columns.PRICEH3 + " = ?,"
                + Columns.PRICEH4 + " = ?,"
                + Columns.PRICEH5 + " = ?,"
                + Columns.IMAGE + " = '" + path + "' WHERE " + Columns.ID + " = ?";
        Number updatedCount = jdbcTemplate.update(sqlQuery,
                new Object[]{
                    infinityWardrobeMrp.getProductCode(),
                    infinityWardrobeMrp.getCategory().name(),
                    infinityWardrobeMrp.getDescription(),
                    infinityWardrobeMrp.getWidth(),
                    infinityWardrobeMrp.getDepth(),
                    infinityWardrobeMrp.getHeight(),
                    infinityWardrobeMrp.getCarcassPrice(),
                    infinityWardrobeMrp.getPrice1(),
                    infinityWardrobeMrp.getPrice2(),
                    infinityWardrobeMrp.getPrice3(),
                    infinityWardrobeMrp.getPrice4(),
                    infinityWardrobeMrp.getPrice5(),
                    infinityWardrobeMrp.getPrice6(),
                    infinityWardrobeMrp.getPrice7(),
                    infinityWardrobeMrp.getPrice8(),
                    infinityWardrobeMrp.getPrice9(),
                    infinityWardrobeMrp.getPrice10(),
                    infinityWardrobeMrp.getSoftCloseHinges(),
                    infinityWardrobeMrp.getBlumSoftClose(),
                    infinityWardrobeMrp.getDegree155(),
                    infinityWardrobeMrp.getPriceh1(),
                    infinityWardrobeMrp.getPriceh2(),
                    infinityWardrobeMrp.getPriceh3(),
                    infinityWardrobeMrp.getPriceh4(),
                    infinityWardrobeMrp.getPriceh5(),
                    infinityWardrobeMrp.getId()
                });
        infinityWardrobeMrp = findById(infinityWardrobeMrp.getId());
        return infinityWardrobeMrp;
    }
}
