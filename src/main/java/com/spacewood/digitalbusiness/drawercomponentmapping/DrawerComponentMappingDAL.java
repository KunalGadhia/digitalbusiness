/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.drawercomponentmapping;

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
public class DrawerComponentMappingDAL {
    public static final class Columns {

        public static final String ID = "id";
        public static final String FINISH_CODE = "finish_code";        
        public static final String DRAWERS = "drawers";
    }
    public static final String TABLE_NAME = "drawer_component_mapping_master";
    private final SimpleJdbcInsert insertDrawerComponentMapping;
    private final JdbcTemplate jdbcTemplate;
    private static final ObjectMapper mapper = new ObjectMapper();

    @Autowired
    public DrawerComponentMappingDAL(DataSource dataSource) {
        jdbcTemplate = new JdbcTemplate(dataSource);
        insertDrawerComponentMapping = new SimpleJdbcInsert(jdbcTemplate)
                .withTableName(TABLE_NAME)
                .usingColumns(
                        Columns.FINISH_CODE,                        
                        Columns.DRAWERS
                )
                .usingGeneratedKeyColumns(Columns.ID);
    }

    public List<DrawerComponentMapping> findAll(Integer offset) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE ORDER BY " + Columns.ID + " DESC LIMIT 10 OFFSET ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{offset}, drawerComponentRowMapper);
    }

    public DrawerComponentMapping findById(Integer id) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.ID + " = ?";
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{id}, drawerComponentRowMapper);
    }

    public DrawerComponentMapping findByFinishCode(String finishCode) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.FINISH_CODE + " = ?";
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{finishCode}, drawerComponentRowMapper);
    }

    public DrawerComponentMapping insert(DrawerComponentMapping drawerComponentMapping) throws JsonProcessingException {
        Map<String, Object> parameters = new HashMap<>();
        parameters.put(Columns.FINISH_CODE, drawerComponentMapping.getFinishCode());        
        parameters.put(Columns.DRAWERS, drawerComponentMapping.getDrawers() == null ? "[]" : mapper.writeValueAsString(drawerComponentMapping.getDrawers()));
        Number newId = insertDrawerComponentMapping.executeAndReturnKey(parameters);
        drawerComponentMapping = findById(newId.intValue());
        return drawerComponentMapping;
    }

    public void delete(Integer id) {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET deleted=? WHERE " + Columns.ID + "=?";
        jdbcTemplate.update(sqlQuery, new Object[]{true, id});
    }

    public DrawerComponentMapping update(DrawerComponentMapping drawerComponentMapping) throws JsonProcessingException {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET "
                + Columns.FINISH_CODE + " = ?,"                
                + Columns.DRAWERS + " = ? WHERE " + Columns.ID + " = ?";
        Number updatedCount = jdbcTemplate.update(sqlQuery,
                new Object[]{
                    drawerComponentMapping.getFinishCode(),                    
                    drawerComponentMapping.getDrawers() == null ? "[]" : mapper.writeValueAsString(drawerComponentMapping.getDrawers()),
                    drawerComponentMapping.getId()
                });
        drawerComponentMapping = findById(drawerComponentMapping.getId());
        return drawerComponentMapping;
    }

    private final RowMapper<DrawerComponentMapping> drawerComponentRowMapper = new RowMapper<DrawerComponentMapping>() {

        @Override
        public DrawerComponentMapping mapRow(ResultSet rs, int i) throws SQLException {
            DrawerComponentMapping drawerComponentMappingConstraint = new DrawerComponentMapping();
            drawerComponentMappingConstraint.setId(rs.getInt(Columns.ID));
            drawerComponentMappingConstraint.setFinishCode(rs.getString(Columns.FINISH_CODE));            

            String componentList = rs.getString(Columns.DRAWERS);
            try {
                ObjectMapper mapper = new ObjectMapper();
                List<Integer> drawers = mapper.readValue(componentList, new TypeReference<List<Integer>>() {
                });
                drawerComponentMappingConstraint.setDrawers(drawers);
            } catch (IOException ex) {
                throw new RuntimeException("Error parsing drawer List: '" + componentList + "' ", ex);
            }
            return drawerComponentMappingConstraint;
        }

    };
}
