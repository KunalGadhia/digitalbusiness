/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.reason;

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
public class ReasonDAL {
    public static final class Columns {

        public static final String ID = "id";
        public static final String REASON = "reason";
        public static final String DESCRIPTION = "description";        
    }

    public static final String TABLE_NAME = "reason_master";

    private final SimpleJdbcInsert insertReason;
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public ReasonDAL(DataSource dataSource) {
        jdbcTemplate = new JdbcTemplate(dataSource);
        insertReason = new SimpleJdbcInsert(jdbcTemplate)
                .withTableName(TABLE_NAME)
                .usingColumns(
                        Columns.REASON,
                        Columns.DESCRIPTION                        
                )
                .usingGeneratedKeyColumns(Columns.ID);
    }

    public List<Reason> findAll(Integer offset) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE ORDER BY " + Columns.ID + " DESC LIMIT 10 OFFSET ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{offset}, new BeanPropertyRowMapper<>(Reason.class));
    } 
    
    public List<Reason> findAllList() {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE";
        return jdbcTemplate.query(sqlQuery, new Object[]{}, new BeanPropertyRowMapper<>(Reason.class));
    } 

    public Reason findById(Integer id) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.ID + " = ?";
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{id}, new BeanPropertyRowMapper<>(Reason.class));
    }

    public Reason findByReason(String reason) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.REASON + " = ?";        
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{reason}, new BeanPropertyRowMapper<>(Reason.class));
    }

    public List<Reason> findByReasonLike(String reason) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND lower(reason) LIKE?";
        String userNameLike = "%" + reason.toLowerCase() + "%";
        return jdbcTemplate.query(sqlQuery, new Object[]{userNameLike}, new BeanPropertyRowMapper<>(Reason.class));
    }

    public Reason insert(Reason Reason) {
        Map<String, Object> parameters = new HashMap<>();        
        parameters.put(Columns.REASON, Reason.getReason());
        parameters.put(Columns.DESCRIPTION, Reason.getDescription());        
        Number newId = insertReason.executeAndReturnKey(parameters);
        Reason = findById(newId.intValue());
        return Reason;
    }

    public void delete(Integer id) {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET deleted=? WHERE " + Columns.ID + "=?";
        jdbcTemplate.update(sqlQuery, new Object[]{true, id});
    }

    public Reason update(Reason reason) {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET "                
                + Columns.REASON + " = ?, "                   
                + Columns.DESCRIPTION + " = ? WHERE " + Columns.ID + " = ?";
        Number updatedCount = jdbcTemplate.update(sqlQuery,
                new Object[]{
                    reason.getReason(),
                    reason.getDescription(),                    
                    reason.getId()
                });
        reason = findById(reason.getId());
        return reason;
    }

}
