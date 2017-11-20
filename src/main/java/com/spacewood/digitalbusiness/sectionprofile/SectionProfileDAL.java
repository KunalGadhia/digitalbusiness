/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.sectionprofile;

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
public class SectionProfileDAL {

    public static final class Columns {

        public static final String ID = "id";
        public static final String NAME = "name";
        public static final String DIRECTION = "direction";
        public static final String CARCASS_TYPE = "carcass_type";
        public static final String PRICE = "price";
    }

    public static final String TABLE_NAME = "section_profile_master";

    private final SimpleJdbcInsert insertSectionProfile;
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public SectionProfileDAL(DataSource dataSource) {
        jdbcTemplate = new JdbcTemplate(dataSource);
        insertSectionProfile = new SimpleJdbcInsert(jdbcTemplate)
                .withTableName(TABLE_NAME)
                .usingColumns(
                        Columns.NAME,
                        Columns.DIRECTION,
                        Columns.CARCASS_TYPE,
                        Columns.PRICE
                )
                .usingGeneratedKeyColumns(Columns.ID);
    }

    public List<SectionProfile> findAll(Integer offset) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE ORDER BY " + Columns.ID + " DESC LIMIT 10 OFFSET ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{offset}, new BeanPropertyRowMapper<>(SectionProfile.class));
    }

    public List<SectionProfile> findAllList() {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE";
        return jdbcTemplate.query(sqlQuery, new Object[]{}, new BeanPropertyRowMapper<>(SectionProfile.class));
    }

    public SectionProfile findById(Integer id) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.ID + " = ?";
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{id}, new BeanPropertyRowMapper<>(SectionProfile.class));
    }

    public SectionProfile findByName(String name) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.NAME + " = ?";
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{name}, new BeanPropertyRowMapper<>(SectionProfile.class));
    }
//
//    public SectionProfile findByColorCode(String colorCode) {
//        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.COLOR_CODE + " = ?";
//        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{colorCode}, new BeanPropertyRowMapper<>(SectionProfile.class));
//    }
//    public List<SectionProfile> findByColorLike(String color) {
//        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND lower(color_name) LIKE?";
//        String colorNameLike = color.toLowerCase() + "%";
//        return jdbcTemplate.query(sqlQuery, new Object[]{colorNameLike}, new BeanPropertyRowMapper<>(Color.class));
//    }
    public List<SectionProfile> findByCarassType(String carcassType) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.CARCASS_TYPE + " = ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{carcassType}, new BeanPropertyRowMapper<>(SectionProfile.class));
    }

    public SectionProfile insert(SectionProfile sectionProfile) {
        Map<String, Object> parameters = new HashMap<>();
        parameters.put(Columns.NAME, sectionProfile.getName());
        parameters.put(Columns.DIRECTION, sectionProfile.getDirection().name());
        parameters.put(Columns.CARCASS_TYPE, sectionProfile.getCarcassType().name());
        parameters.put(Columns.PRICE, sectionProfile.getPrice());
        Number newId = insertSectionProfile.executeAndReturnKey(parameters);
        sectionProfile = findById(newId.intValue());
        return sectionProfile;
    }

    public void delete(Integer id) {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET deleted=? WHERE " + Columns.ID + "=?";
        jdbcTemplate.update(sqlQuery, new Object[]{true, id});
    }

    public SectionProfile update(SectionProfile sectionProfile) {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET "
                + Columns.NAME + " = ?, "
                + Columns.DIRECTION + " = ?, "
                + Columns.CARCASS_TYPE + " = ?, "
                + Columns.PRICE + "=? WHERE " + Columns.ID + " = ?";
        Number updatedCount = jdbcTemplate.update(sqlQuery,
                new Object[]{
                    sectionProfile.getName(),
                    sectionProfile.getDirection().name(),
                    sectionProfile.getCarcassType().name(),
                    sectionProfile.getPrice(),
                    sectionProfile.getId()
                });
        sectionProfile = findById(sectionProfile.getId());
        return sectionProfile;
    }
}
