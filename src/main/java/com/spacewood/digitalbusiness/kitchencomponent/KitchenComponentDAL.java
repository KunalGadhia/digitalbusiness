/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.kitchencomponent;

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
public class KitchenComponentDAL {

    public static final class Columns {

        public static final String ID = "id";
        public static final String COMPONENT = "component";
        public static final String COMPONENT_CODE = "component_code";
        public static final String CATEGORY = "category";
        public static final String IMAGE = "image";
    }

    public static final String TABLE_NAME = "kitchen_component_master";

    private final SimpleJdbcInsert insertKitchenComponent;
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public KitchenComponentDAL(DataSource dataSource) {
        jdbcTemplate = new JdbcTemplate(dataSource);
        insertKitchenComponent = new SimpleJdbcInsert(jdbcTemplate)
                .withTableName(TABLE_NAME)
                .usingColumns(
                        Columns.COMPONENT,
                        Columns.COMPONENT_CODE,
                        Columns.CATEGORY
                )
                .usingGeneratedKeyColumns(Columns.ID);
    }

    public List<KitchenComponent> findAll(Integer offset) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE ORDER BY " + Columns.ID + " DESC LIMIT 10 OFFSET ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{offset}, new BeanPropertyRowMapper<>(KitchenComponent.class));
    }

    public List<KitchenComponent> findAllList() {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE";
        return jdbcTemplate.query(sqlQuery, new Object[]{}, new BeanPropertyRowMapper<>(KitchenComponent.class));
    }

    public KitchenComponent findById(Integer id) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.ID + " = ?";
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{id}, new BeanPropertyRowMapper<>(KitchenComponent.class));
    }

    public KitchenComponent findByComponent(String component) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.COMPONENT + " = ?";
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{component}, new BeanPropertyRowMapper<>(KitchenComponent.class));
    }
    
    public KitchenComponent findByComponentCode(String componentCode) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.COMPONENT_CODE + " = ?";
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{componentCode}, new BeanPropertyRowMapper<>(KitchenComponent.class));
    }

    public List<KitchenComponent> findByComponentLike(String component) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND lower(component) LIKE?";
        String userNameLike = "%" + component.toLowerCase() + "%";
        return jdbcTemplate.query(sqlQuery, new Object[]{userNameLike}, new BeanPropertyRowMapper<>(KitchenComponent.class));
    }
    
    public List<KitchenComponent> findByHandleComponentLike(String component) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND category = 'HANDLE' AND lower(component) LIKE?";
        String userNameLike = "%" + component.toLowerCase() + "%";
        return jdbcTemplate.query(sqlQuery, new Object[]{userNameLike}, new BeanPropertyRowMapper<>(KitchenComponent.class));
    }

    public List<KitchenComponent> findByCategory(String category) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.CATEGORY + " = ?";        
        return jdbcTemplate.query(sqlQuery, new Object[]{category}, new BeanPropertyRowMapper<>(KitchenComponent.class));
    }

    public KitchenComponent insert(KitchenComponent kitchenComponent) {
        Map<String, Object> parameters = new HashMap<>();
        parameters.put(Columns.COMPONENT, kitchenComponent.getComponent());
        parameters.put(Columns.COMPONENT_CODE, kitchenComponent.getComponentCode());
        parameters.put(Columns.CATEGORY, kitchenComponent.getCategory().name());
        Number newId = insertKitchenComponent.executeAndReturnKey(parameters);
        kitchenComponent = findById(newId.intValue());
        return kitchenComponent;
    }

    public void delete(Integer id) {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET deleted=? WHERE " + Columns.ID + "=?";
        jdbcTemplate.update(sqlQuery, new Object[]{true, id});
    }

    public KitchenComponent update(KitchenComponent kitchenComponent) {
        String path = kitchenComponent.getImage().get(0).toString().replace("\\","\\\\");
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET "
                + Columns.COMPONENT + " = ?, "
                + Columns.COMPONENT_CODE + " = ?, "
                + Columns.CATEGORY +" = ?,"
                + Columns.IMAGE + " = '" + path + "' WHERE " + Columns.ID + " = ?";
        Number updatedCount = jdbcTemplate.update(sqlQuery,
                new Object[]{
                    kitchenComponent.getComponent(),
                    kitchenComponent.getComponentCode(),
                    kitchenComponent.getCategory().name(),
                    kitchenComponent.getId()
                });
        kitchenComponent = findById(kitchenComponent.getId());
        return kitchenComponent;
    }
}
