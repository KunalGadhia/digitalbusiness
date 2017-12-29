/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.drawerhandlemapping;

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
public class DrawerHandleMappingDAL {
   public static final class Columns {

        public static final String ID = "id";
        public static final String FINISH_CODE = "finish_code";
        public static final String DRAWER_CODE = "drawer_code";
        public static final String HANDLES = "handles";                     
    }
    public static final String TABLE_NAME = "drawer_handle_mapping_master";
    private final SimpleJdbcInsert insertDrawerHandleMapping;
    private final JdbcTemplate jdbcTemplate;
    private static final ObjectMapper mapper = new ObjectMapper();

    @Autowired
    public DrawerHandleMappingDAL(DataSource dataSource) {
        jdbcTemplate = new JdbcTemplate(dataSource);
        insertDrawerHandleMapping = new SimpleJdbcInsert(jdbcTemplate)
                .withTableName(TABLE_NAME)
                .usingColumns(
                        Columns.FINISH_CODE,
                        Columns.DRAWER_CODE,                        
                        Columns.HANDLES                        
                )
                .usingGeneratedKeyColumns(Columns.ID);
    }

    public List<DrawerHandleMapping> findAll(Integer offset) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE ORDER BY " + Columns.ID + " DESC LIMIT 10 OFFSET ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{offset}, userRowMapper);
    }      

    public DrawerHandleMapping findById(Integer id) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.ID + " = ?";
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{id}, userRowMapper);
    }
    
    public DrawerHandleMapping findByDrawerCode(String drawerCode) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.DRAWER_CODE + " = ?";
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{drawerCode}, userRowMapper);
    }
    
    public DrawerHandleMapping findByFinishCode(String finishCode) {
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

    public DrawerHandleMapping insert(DrawerHandleMapping drawerHandleMapping) throws JsonProcessingException {
        Map<String, Object> parameters = new HashMap<>();
        parameters.put(Columns.FINISH_CODE, drawerHandleMapping.getFinishCode());
        parameters.put(Columns.DRAWER_CODE, drawerHandleMapping.getDrawerCode());
        parameters.put(Columns.HANDLES, drawerHandleMapping.getHandles() == null ? "[]" : mapper.writeValueAsString(drawerHandleMapping.getHandles()));
        Number newId = insertDrawerHandleMapping.executeAndReturnKey(parameters);
        drawerHandleMapping = findById(newId.intValue());
        return drawerHandleMapping;
    }

    public void delete(Integer id) {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET deleted=? WHERE " + Columns.ID + "=?";
        jdbcTemplate.update(sqlQuery, new Object[]{true, id});
    }

    public DrawerHandleMapping update(DrawerHandleMapping drawerHandleMapping) throws JsonProcessingException {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET "
                + Columns.FINISH_CODE + " = ?,"
                + Columns.DRAWER_CODE + " = ?, "                
                + Columns.HANDLES + " = ? WHERE " + Columns.ID + " = ?";
        Number updatedCount = jdbcTemplate.update(sqlQuery,
                new Object[]{
                    drawerHandleMapping.getFinishCode(),
                    drawerHandleMapping.getDrawerCode(),
                    drawerHandleMapping.getHandles() == null ? "[]" : mapper.writeValueAsString(drawerHandleMapping.getHandles()),
                    drawerHandleMapping.getId()
                });
        drawerHandleMapping = findById(drawerHandleMapping.getId());
        return drawerHandleMapping;
    }
    
    private final RowMapper<DrawerHandleMapping> userRowMapper = new RowMapper<DrawerHandleMapping>() {

        @Override
        public DrawerHandleMapping mapRow(ResultSet rs, int i) throws SQLException {
            DrawerHandleMapping drawerHandleMappingConstraint = new DrawerHandleMapping();
            drawerHandleMappingConstraint.setId(rs.getInt(Columns.ID));
            drawerHandleMappingConstraint.setFinishCode(rs.getString(Columns.FINISH_CODE));
            drawerHandleMappingConstraint.setDrawerCode(rs.getString(Columns.DRAWER_CODE));
            
            String handlesList = rs.getString(Columns.HANDLES);
            try {
                ObjectMapper mapper = new ObjectMapper();
                List<Integer> handles = mapper.readValue(handlesList, new TypeReference<List<Integer>>() {
                });
                drawerHandleMappingConstraint.setHandles(handles);
            } catch (IOException ex) {
                throw new RuntimeException("Error parsing handlesList: '" + handlesList + "' ", ex);
            }            
            return drawerHandleMappingConstraint;
        }

    }; 
}
