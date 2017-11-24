/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.carcasssubtype;

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
public class CarcassSubtypeDAL {
    public static final class Columns {

        public static final String ID = "id";
        public static final String SUB_TYPE = "sub_type";
        public static final String PARENT_TYPE = "parent_type";
        public static final String DESCRIPTION = "description";
        public static final String SUB_TYPE_CODE = "sub_type_code";
        
    }

    public static final String TABLE_NAME = "carcass_subtype_master";

    private final SimpleJdbcInsert insertCarcassSubtype;
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public CarcassSubtypeDAL(DataSource dataSource) {
        jdbcTemplate = new JdbcTemplate(dataSource);
        insertCarcassSubtype = new SimpleJdbcInsert(jdbcTemplate)
                .withTableName(TABLE_NAME)
                .usingColumns(
                        Columns.SUB_TYPE,
                        Columns.PARENT_TYPE,
                        Columns.DESCRIPTION,
                        Columns.SUB_TYPE_CODE
                )
                .usingGeneratedKeyColumns(Columns.ID);
    }

    public List<CarcassSubtype> findAll(Integer offset) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE ORDER BY " + Columns.ID + " DESC LIMIT 10 OFFSET ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{offset}, new BeanPropertyRowMapper<>(CarcassSubtype.class));
    }

    public List<CarcassSubtype> findAllList() {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE";
        return jdbcTemplate.query(sqlQuery, new Object[]{}, new BeanPropertyRowMapper<>(CarcassSubtype.class));
    }

    public CarcassSubtype findById(Integer id) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.ID + " = ?";
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{id}, new BeanPropertyRowMapper<>(CarcassSubtype.class));
    }
    
    public CarcassSubtype findByParentType(String parentType) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.PARENT_TYPE + " = ?";
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{parentType}, new BeanPropertyRowMapper<>(CarcassSubtype.class));
    }

    public List<CarcassSubtype> findBySubTypeLike(String subtype) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND lower(sub_typr) LIKE?";
        String subTypeLike = "%" + subtype.toLowerCase() + "%";
        return jdbcTemplate.query(sqlQuery, new Object[]{subTypeLike}, new BeanPropertyRowMapper<>(CarcassSubtype.class));
    }

    public CarcassSubtype insert(CarcassSubtype carcassSubType) {
        Map<String, Object> parameters = new HashMap<>();
        parameters.put(Columns.SUB_TYPE, carcassSubType.getSubType());
        parameters.put(Columns.PARENT_TYPE, carcassSubType.getParentType().name());
        parameters.put(Columns.DESCRIPTION, carcassSubType.getDescription());
        parameters.put(Columns.SUB_TYPE_CODE, carcassSubType.getSubTypeCode());
        Number newId = insertCarcassSubtype.executeAndReturnKey(parameters);
        carcassSubType = findById(newId.intValue());
        return carcassSubType;
    }

    public void delete(Integer id) {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET deleted=? WHERE " + Columns.ID + "=?";
        jdbcTemplate.update(sqlQuery, new Object[]{true, id});
    }

    public CarcassSubtype update(CarcassSubtype carcassSubType) {        
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET "
                + Columns.SUB_TYPE + " = ?, "
                + Columns.PARENT_TYPE + " = ?, "
                + Columns.DESCRIPTION + " = ?, "
                + Columns.SUB_TYPE_CODE + " = ? WHERE " + Columns.ID + " = ?";
        Number updatedCount = jdbcTemplate.update(sqlQuery,
                new Object[]{
                    carcassSubType.getSubType(),
                    carcassSubType.getParentType().name(),                   
                    carcassSubType.getDescription(),
                    carcassSubType.getSubTypeCode(),
                    carcassSubType.getId()
                });
        carcassSubType = findById(carcassSubType.getId());
        return carcassSubType;
    }
}
