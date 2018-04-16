/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.shuttercomponentmapping;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.sql.DataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.stereotype.Repository;

/**
 *
 * @author webdesign
 */
@Repository
public class ShutterComponentMappingDAL {

    public static final class Columns {

        public static final String ID = "id";
        public static final String FINISH_CODE = "finish_code";        
        public static final String SHUTTERS = "shutters";
    }
    public static final String TABLE_NAME = "shutter_component_mapping_master";
    private final SimpleJdbcInsert insertShutterComponentMapping;
    private final JdbcTemplate jdbcTemplate;
    private static final ObjectMapper mapper = new ObjectMapper();

    @Autowired
    public ShutterComponentMappingDAL(DataSource dataSource) {
        jdbcTemplate = new JdbcTemplate(dataSource);
        insertShutterComponentMapping = new SimpleJdbcInsert(jdbcTemplate)
                .withTableName(TABLE_NAME)
                .usingColumns(
                        Columns.FINISH_CODE,                        
                        Columns.SHUTTERS
                )
                .usingGeneratedKeyColumns(Columns.ID);
    }

    public List<ShutterComponentMapping> findAll(Integer offset) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE ORDER BY " + Columns.ID + " DESC LIMIT 10 OFFSET ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{offset}, shutterComponentRowMapper);
    }

    public ShutterComponentMapping findById(Integer id) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.ID + " = ?";
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{id}, shutterComponentRowMapper);
    }

//    public ShutterComponentMapping findByShutterCode(String shutterCode) {
//        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.SHUTTER_CODE + " = ?";
//        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{shutterCode}, userRowMapper);
//    }

    public ShutterComponentMapping findByFinishCode(String finishCode) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.FINISH_CODE + " = ?";
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{finishCode}, shutterComponentRowMapper);
    }

//    public ShutterHandleMapping findByUsername(String username) {
//        System.out.println("Inside DAL with String :" + username);
//        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.USERNAME + " = ?";
//        System.out.println("SQL String :" + sqlQuery);
//        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{username}, userRowMapper);
//    }
//
//    public List<ShutterHandleMapping> findByNameLike(String username) {
//        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND lower(username) LIKE?";
//        String userNameLike = "%" + username.toLowerCase() + "%";
//        return jdbcTemplate.query(sqlQuery, new Object[]{userNameLike}, userRowMapper);
//    }
    public ShutterComponentMapping insert(ShutterComponentMapping shutterComponentMapping) throws JsonProcessingException {
        Map<String, Object> parameters = new HashMap<>();
        parameters.put(Columns.FINISH_CODE, shutterComponentMapping.getFinishCode());        
        parameters.put(Columns.SHUTTERS, shutterComponentMapping.getShutters() == null ? "[]" : mapper.writeValueAsString(shutterComponentMapping.getShutters()));
        Number newId = insertShutterComponentMapping.executeAndReturnKey(parameters);
        shutterComponentMapping = findById(newId.intValue());
        return shutterComponentMapping;
    }

    public void delete(Integer id) {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET deleted=? WHERE " + Columns.ID + "=?";
        jdbcTemplate.update(sqlQuery, new Object[]{true, id});
    }

    public ShutterComponentMapping update(ShutterComponentMapping shutterComponentMapping) throws JsonProcessingException {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET "
                + Columns.FINISH_CODE + " = ?,"                
                + Columns.SHUTTERS + " = ? WHERE " + Columns.ID + " = ?";
        Number updatedCount = jdbcTemplate.update(sqlQuery,
                new Object[]{
                    shutterComponentMapping.getFinishCode(),                    
                    shutterComponentMapping.getShutters() == null ? "[]" : mapper.writeValueAsString(shutterComponentMapping.getShutters()),
                    shutterComponentMapping.getId()
                });
        shutterComponentMapping = findById(shutterComponentMapping.getId());
        return shutterComponentMapping;
    }

    private final RowMapper<ShutterComponentMapping> shutterComponentRowMapper = new RowMapper<ShutterComponentMapping>() {

        @Override
        public ShutterComponentMapping mapRow(ResultSet rs, int i) throws SQLException {
            ShutterComponentMapping shutterComponentMappingConstraint = new ShutterComponentMapping();
            shutterComponentMappingConstraint.setId(rs.getInt(Columns.ID));
            shutterComponentMappingConstraint.setFinishCode(rs.getString(Columns.FINISH_CODE));            

            String componentList = rs.getString(Columns.SHUTTERS);
            try {
                ObjectMapper mapper = new ObjectMapper();
                List<Integer> shutters = mapper.readValue(componentList, new TypeReference<List<Integer>>() {
                });
                shutterComponentMappingConstraint.setShutters(shutters);
            } catch (IOException ex) {
                throw new RuntimeException("Error parsing shutter List: '" + componentList + "' ", ex);
            }
            return shutterComponentMappingConstraint;
        }

    };
}
