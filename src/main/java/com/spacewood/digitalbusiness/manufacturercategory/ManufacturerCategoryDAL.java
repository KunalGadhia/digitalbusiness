/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.manufacturercategory;

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
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.stereotype.Repository;

/**
 *
 * @author webdesign
 */
@Repository
public class ManufacturerCategoryDAL {

    public static final class Columns {

        public static final String ID = "id";
        public static final String CATEGORY_NAME = "category_name";
        public static final String CATEGORY_CODE = "category_code";
        public static final String MANUFACTURERS = "manufacturers";
        public static final String CREATED_BY = "created_by";

    }

    public static final String TABLE_NAME = "manufacturer_category_master";

    private final SimpleJdbcInsert insertManufacturerCategory;
    private final JdbcTemplate jdbcTemplate;
    private static final ObjectMapper mapper = new ObjectMapper();

    @Autowired
    public ManufacturerCategoryDAL(DataSource dataSource) {
        jdbcTemplate = new JdbcTemplate(dataSource);
        insertManufacturerCategory = new SimpleJdbcInsert(jdbcTemplate)
                .withTableName(TABLE_NAME)
                .usingColumns(
                        Columns.CATEGORY_NAME,
                        Columns.CATEGORY_CODE,
                        Columns.MANUFACTURERS,
                        Columns.CREATED_BY
                )
                .usingGeneratedKeyColumns(Columns.ID);
    }

    public List<ManufacturerCategory> findAll(Integer offset) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE ORDER BY " + Columns.ID + " DESC LIMIT 10 OFFSET ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{offset}, manufacturerCategoryRowMapper);
    }

    public List<ManufacturerCategory> findByCreator(Integer userId, Integer offset) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.CREATED_BY + " = ? ORDER BY " + Columns.ID + " DESC LIMIT 10 OFFSET ?";
        System.out.println(" Mf Cat Query " + sqlQuery);
        System.out.println("User Id " + userId);
        System.out.println("Offset " + offset);
        return jdbcTemplate.query(sqlQuery, new Object[]{userId, offset}, manufacturerCategoryRowMapper);
    }

    public List<ManufacturerCategory> findAllList() {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE";
        return jdbcTemplate.query(sqlQuery, new Object[]{}, manufacturerCategoryRowMapper);
    }

    public ManufacturerCategory findById(Integer id) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.ID + " = ?";
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{id}, manufacturerCategoryRowMapper);
    }

    public ManufacturerCategory findByCategoryCode(String categoryCode) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.CATEGORY_CODE + " = ?";
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{categoryCode}, manufacturerCategoryRowMapper);
    }

//    public List<ManufacturerCategory> findByManufacturerCode(String manufacturerCode) {
//        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.MANUFACTURER_CODE + " = ?";
//        return jdbcTemplate.query(sqlQuery, new Object[]{manufacturerCode}, new BeanPropertyRowMapper<>(ManufacturerCategory.class));
//    }
    public List<ManufacturerCategory> findByManufacturerCategoryLike(String manufacturerCategory) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND lower(category_name) LIKE?";
        String subTypeLike = "%" + manufacturerCategory.toLowerCase() + "%";
        return jdbcTemplate.query(sqlQuery, new Object[]{subTypeLike}, manufacturerCategoryRowMapper);
    }

    public ManufacturerCategory insert(ManufacturerCategory manufacturerCategory) throws JsonProcessingException {
        Map<String, Object> parameters = new HashMap<>();
        parameters.put(Columns.CATEGORY_NAME, manufacturerCategory.getCategoryName());
        parameters.put(Columns.CATEGORY_CODE, manufacturerCategory.getCategoryCode());
        parameters.put(Columns.MANUFACTURERS, manufacturerCategory.getManufacturers() == null ? "[]" : mapper.writeValueAsString(manufacturerCategory.getManufacturers()));
        parameters.put(Columns.CREATED_BY, manufacturerCategory.getCreatedBy());
        Number newId = insertManufacturerCategory.executeAndReturnKey(parameters);
        manufacturerCategory = findById(newId.intValue());
        return manufacturerCategory;
    }

    public void delete(Integer id) {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET deleted=? WHERE " + Columns.ID + "=?";
        jdbcTemplate.update(sqlQuery, new Object[]{true, id});
    }

    public ManufacturerCategory update(ManufacturerCategory manufacturerCategory) throws JsonProcessingException {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET "
                + Columns.CATEGORY_NAME + " = ?, "
                + Columns.CATEGORY_CODE + " = ?, "
                + Columns.MANUFACTURERS + " = ?, "
                + Columns.CREATED_BY + " = ? WHERE " + Columns.ID + " = ?";
        Number updatedCount = jdbcTemplate.update(sqlQuery,
                new Object[]{
                    manufacturerCategory.getCategoryName(),
                    manufacturerCategory.getCategoryCode(),
                    manufacturerCategory.getManufacturers() == null ? "[]" : mapper.writeValueAsString(manufacturerCategory.getManufacturers()),
                    manufacturerCategory.getCreatedBy(),
                    manufacturerCategory.getId()
                });
        manufacturerCategory = findById(manufacturerCategory.getId());
        return manufacturerCategory;
    }

    private final RowMapper<ManufacturerCategory> manufacturerCategoryRowMapper = new RowMapper<ManufacturerCategory>() {

        @Override
        public ManufacturerCategory mapRow(ResultSet rs, int i) throws SQLException {
            ManufacturerCategory manufacturerCategoryMappingConstraint = new ManufacturerCategory();
            manufacturerCategoryMappingConstraint.setId(rs.getInt(Columns.ID));
            manufacturerCategoryMappingConstraint.setCategoryName(rs.getString(Columns.CATEGORY_NAME));
            manufacturerCategoryMappingConstraint.setCategoryCode(rs.getString(Columns.CATEGORY_CODE));

            String manufacturersList = rs.getString(Columns.MANUFACTURERS);
            try {
                ObjectMapper mapper = new ObjectMapper();
                List<Integer> manufacturers = mapper.readValue(manufacturersList, new TypeReference<List<Integer>>() {
                });
                manufacturerCategoryMappingConstraint.setManufacturers(manufacturers);
            } catch (IOException ex) {
                throw new RuntimeException("Error parsing handlesList: '" + manufacturersList + "' ", ex);
            }
            manufacturerCategoryMappingConstraint.setCreatedBy(rs.getInt(Columns.CREATED_BY));
            return manufacturerCategoryMappingConstraint;
        }

    };
}
