/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.panelmaterialthickness;

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
public class PanelMaterialThicknessDAL {

    public static final class Columns {

        public static final String ID = "id";
        public static final String MATERIAL = "material";
        public static final String THICKNESS = "thickness";
        public static final String PRICE = "price";
    }

    public static final String TABLE_NAME = "panel_material_thickness_master";

    private final SimpleJdbcInsert insertPanelMaterialThickness;
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public PanelMaterialThicknessDAL(DataSource dataSource) {
        jdbcTemplate = new JdbcTemplate(dataSource);
        insertPanelMaterialThickness = new SimpleJdbcInsert(jdbcTemplate)
                .withTableName(TABLE_NAME)
                .usingColumns(
                        Columns.MATERIAL,
                        Columns.THICKNESS,
                        Columns.PRICE
                )
                .usingGeneratedKeyColumns(Columns.ID);
    }

    public List<PanelMaterialThickness> findAll(Integer offset) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE ORDER BY " + Columns.ID + " DESC LIMIT 10 OFFSET ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{offset}, new BeanPropertyRowMapper<>(PanelMaterialThickness.class));
    }

    public List<PanelMaterialThickness> findAllList() {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE";
        return jdbcTemplate.query(sqlQuery, new Object[]{}, new BeanPropertyRowMapper<>(PanelMaterialThickness.class));
    }

    public PanelMaterialThickness findById(Integer id) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.ID + " = ?";
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{id}, new BeanPropertyRowMapper<>(PanelMaterialThickness.class));
    }

    public List<PanelMaterialThickness> findByMaterial(String material) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.MATERIAL + " = ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{material}, new BeanPropertyRowMapper<>(PanelMaterialThickness.class));
    }

//    public List<Reason> findByReasonLike(String reason) {
//        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND lower(reason) LIKE?";
//        String userNameLike = "%" + reason.toLowerCase() + "%";
//        return jdbcTemplate.query(sqlQuery, new Object[]{userNameLike}, new BeanPropertyRowMapper<>(Reason.class));
//    }

    public PanelMaterialThickness insert(PanelMaterialThickness panelMaterialThickness) {
        Map<String, Object> parameters = new HashMap<>();
        parameters.put(Columns.MATERIAL, panelMaterialThickness.getMaterial());
        parameters.put(Columns.THICKNESS, panelMaterialThickness.getThickness());
        parameters.put(Columns.PRICE, panelMaterialThickness.getPrice());
        Number newId = insertPanelMaterialThickness.executeAndReturnKey(parameters);
        panelMaterialThickness = findById(newId.intValue());
        return panelMaterialThickness;
    }

    public void delete(Integer id) {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET deleted=? WHERE " + Columns.ID + "=?";
        jdbcTemplate.update(sqlQuery, new Object[]{true, id});
    }

    public PanelMaterialThickness update(PanelMaterialThickness panelMaterialThickness) {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET "
                + Columns.MATERIAL + " = ?, "
                + Columns.THICKNESS + " = ?, "
                + Columns.PRICE + " = ? WHERE " + Columns.ID + " = ?";
        Number updatedCount = jdbcTemplate.update(sqlQuery,
                new Object[]{
                    panelMaterialThickness.getMaterial(),
                    panelMaterialThickness.getThickness(),
                    panelMaterialThickness.getPrice(),
                    panelMaterialThickness.getId()
                });
        panelMaterialThickness = findById(panelMaterialThickness.getId());
        return panelMaterialThickness;
    }
}
