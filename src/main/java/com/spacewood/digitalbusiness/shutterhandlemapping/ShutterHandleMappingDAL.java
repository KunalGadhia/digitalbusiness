/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.shutterhandlemapping;

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
public class ShutterHandleMappingDAL {

    public static final class Columns {

        public static final String ID = "id";
        public static final String FINISH_CODE = "finish_code";
        public static final String SHUTTER_CODE = "shutter_code";
        public static final String HANDLES = "handles";                     
    }
    public static final String TABLE_NAME = "shutter_handle_mapping_master";
    private final SimpleJdbcInsert insertShutterHandleMapping;
    private final JdbcTemplate jdbcTemplate;
    private static final ObjectMapper mapper = new ObjectMapper();

    @Autowired
    public ShutterHandleMappingDAL(DataSource dataSource) {
        jdbcTemplate = new JdbcTemplate(dataSource);
        insertShutterHandleMapping = new SimpleJdbcInsert(jdbcTemplate)
                .withTableName(TABLE_NAME)
                .usingColumns(
                        Columns.FINISH_CODE,
                        Columns.SHUTTER_CODE,                        
                        Columns.HANDLES                        
                )
                .usingGeneratedKeyColumns(Columns.ID);
    }

    public List<ShutterHandleMapping> findAll(Integer offset) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE ORDER BY " + Columns.ID + " DESC LIMIT 10 OFFSET ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{offset}, userRowMapper);
    }      

    public ShutterHandleMapping findById(Integer id) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.ID + " = ?";
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{id}, userRowMapper);
    }
    
    public ShutterHandleMapping findByShutterCode(String shutterCode) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.SHUTTER_CODE + " = ?";
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{shutterCode}, userRowMapper);
    }
    
    public ShutterHandleMapping findByFinishCode(String finishCode) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.FINISH_CODE + " = ?";
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{finishCode}, userRowMapper);
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

    public ShutterHandleMapping insert(ShutterHandleMapping shutterHandleMapping) throws JsonProcessingException {
        Map<String, Object> parameters = new HashMap<>();
        parameters.put(Columns.FINISH_CODE, shutterHandleMapping.getFinishCode());
        parameters.put(Columns.SHUTTER_CODE, shutterHandleMapping.getShutterCode());
        parameters.put(Columns.HANDLES, shutterHandleMapping.getHandles() == null ? "[]" : mapper.writeValueAsString(shutterHandleMapping.getHandles()));
        Number newId = insertShutterHandleMapping.executeAndReturnKey(parameters);
        shutterHandleMapping = findById(newId.intValue());
        return shutterHandleMapping;
    }

    public void delete(Integer id) {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET deleted=? WHERE " + Columns.ID + "=?";
        jdbcTemplate.update(sqlQuery, new Object[]{true, id});
    }

    public ShutterHandleMapping update(ShutterHandleMapping shutterHandleMapping) throws JsonProcessingException {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET "
                + Columns.FINISH_CODE + " = ?,"
                + Columns.SHUTTER_CODE + " = ?, "                
                + Columns.HANDLES + " = ? WHERE " + Columns.ID + " = ?";
        Number updatedCount = jdbcTemplate.update(sqlQuery,
                new Object[]{
                    shutterHandleMapping.getFinishCode(),
                    shutterHandleMapping.getShutterCode(),                    
                    shutterHandleMapping.getHandles() == null ? "[]" : mapper.writeValueAsString(shutterHandleMapping.getHandles()),
                    shutterHandleMapping.getId()
                });
        shutterHandleMapping = findById(shutterHandleMapping.getId());
        return shutterHandleMapping;
    }
    
    private final RowMapper<ShutterHandleMapping> userRowMapper = new RowMapper<ShutterHandleMapping>() {

        @Override
        public ShutterHandleMapping mapRow(ResultSet rs, int i) throws SQLException {
            ShutterHandleMapping shutterHandleMappingConstraint = new ShutterHandleMapping();
            shutterHandleMappingConstraint.setId(rs.getInt(Columns.ID));
            shutterHandleMappingConstraint.setFinishCode(rs.getString(Columns.FINISH_CODE));
            shutterHandleMappingConstraint.setShutterCode(rs.getString(Columns.SHUTTER_CODE));
            
            String handlesList = rs.getString(Columns.HANDLES);
            try {
                ObjectMapper mapper = new ObjectMapper();
                List<Integer> handles = mapper.readValue(handlesList, new TypeReference<List<Integer>>() {
                });
                shutterHandleMappingConstraint.setHandles(handles);
            } catch (IOException ex) {
                throw new RuntimeException("Error parsing handlesList: '" + handlesList + "' ", ex);
            }            
            return shutterHandleMappingConstraint;
        }

    };

}
