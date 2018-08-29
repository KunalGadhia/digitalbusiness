/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.maxwardrobe;

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
public class MaxWardrobeDAL {

    public static final class Columns {

        public static final String ID = "id";
        public static final String CATEGORY = "category";
        public static final String PRODUCT_CODE = "product_code";
        public static final String DESCRIPTION = "description";
        public static final String WIDTH = "width";
        public static final String HEIGHT = "height";
        public static final String DEPTH = "depth";
        public static final String CP_PPB_PRICE = "cp_ppb_price";
        public static final String CP_HD_HMR_PRICE = "cp_hd_hmr_price";
        public static final String CP_HDF_PRICE = "cp_hdf_price";
        public static final String SP_FOILED_MATT_PRICE = "sp_foiled_matt_price";
        public static final String SP_FOILED_GLOSSY_PRICE = "sp_foiled_glossy_price";
        public static final String SP_PRELAM_MATT_PRICE = "sp_prelam_matt_price";
        public static final String SP_PCPPB_PRICE = "sp_pcppb_price";
        public static final String SP_GLASS_G50_ALU_PRICE = "sp_glass_g50_alu_price";
        public static final String SP_PVC_MDF_STD_PRICE = "sp_pvc_mdf_std_price";
        public static final String SP_PVC_MDF_DESG_PRICE = "sp_pvc_mdf_desg_price";
        public static final String SP_PVC_MDF_GLOSSY_PRICE = "sp_pvc_mdf_glossy_price";
        public static final String SP_PVC_MDF_PREM_PRICE = "sp_pvc_mdf_prem_price";
        public static final String SOFT_HINGES_PRICE = "soft_hinges_price";
        public static final String IMAGE = "image";
    }

    public static final String TABLE_NAME = "max_wardrobe_master";

    private final SimpleJdbcInsert insertMaxWardrobe;
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public MaxWardrobeDAL(DataSource dataSource) {
        jdbcTemplate = new JdbcTemplate(dataSource);
        insertMaxWardrobe = new SimpleJdbcInsert(jdbcTemplate)
                .withTableName(TABLE_NAME)
                .usingColumns(
                        Columns.CATEGORY,
                        Columns.PRODUCT_CODE,
                        Columns.DESCRIPTION,
                        Columns.WIDTH,
                        Columns.HEIGHT,
                        Columns.DEPTH,
                        Columns.CP_PPB_PRICE,
                        Columns.CP_HD_HMR_PRICE,
                        Columns.CP_HDF_PRICE,
                        Columns.SP_FOILED_MATT_PRICE,
                        Columns.SP_FOILED_GLOSSY_PRICE,
                        Columns.SP_PRELAM_MATT_PRICE,
                        Columns.SP_PCPPB_PRICE,
                        Columns.SP_GLASS_G50_ALU_PRICE,
                        Columns.SP_PVC_MDF_STD_PRICE,
                        Columns.SP_PVC_MDF_DESG_PRICE,
                        Columns.SP_PVC_MDF_GLOSSY_PRICE,
                        Columns.SP_PVC_MDF_PREM_PRICE,
                        Columns.SOFT_HINGES_PRICE
                )
                .usingGeneratedKeyColumns(Columns.ID);
    }

    public List<MaxWardrobe> findAll(Integer offset) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE ORDER BY " + Columns.ID + " ASC LIMIT 10 OFFSET ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{offset}, new BeanPropertyRowMapper<>(MaxWardrobe.class));
    }

    public List<MaxWardrobe> findByCategory(String category) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.CATEGORY + " = ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{category}, new BeanPropertyRowMapper<>(MaxWardrobe.class));
    }

    public List<MaxWardrobe> findByCategoryDimensions(String category, Double width, Double depth, Double height) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.CATEGORY + " = ? AND " + Columns.WIDTH + " = ? AND " + Columns.DEPTH + " = ? AND " + Columns.HEIGHT + " = ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{category, width, depth, height}, new BeanPropertyRowMapper<>(MaxWardrobe.class));
    }

    public List<Double> findDistinctWidth(String category) {
        String sqlQuery = "SELECT distinct(width) FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.CATEGORY + " = ? ORDER BY width DESC";
        return jdbcTemplate.queryForList(sqlQuery, new Object[]{category}, Double.class);
    }

    public List<Double> findDistinctDepth(String category) {
        String sqlQuery = "SELECT distinct(depth) FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.CATEGORY + " = ? ORDER BY depth DESC";
        return jdbcTemplate.queryForList(sqlQuery, new Object[]{category}, Double.class);
    }

    public List<Double> findDistinctHeight(String category) {
        String sqlQuery = "SELECT distinct(height) FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.CATEGORY + " = ? ORDER BY height DESC";
        return jdbcTemplate.queryForList(sqlQuery, new Object[]{category}, Double.class);
    }

    public MaxWardrobe findById(Integer id) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.ID + " = ?";
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{id}, new BeanPropertyRowMapper<>(MaxWardrobe.class));
    }

    public MaxWardrobe findByDescription(String description) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.DESCRIPTION + " = ?";
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{description}, new BeanPropertyRowMapper<>(MaxWardrobe.class));
    }

    public List<MaxWardrobe> findByDescriptionLike(String description) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND lower(description) LIKE?";
        String nameLike = "%" + description.toLowerCase() + "%";
        return jdbcTemplate.query(sqlQuery, new Object[]{nameLike}, new BeanPropertyRowMapper<>(MaxWardrobe.class));
    }

    public MaxWardrobe insert(MaxWardrobe maxWardrobe) {
        Map<String, Object> parameters = new HashMap<>();
        parameters.put(Columns.CATEGORY, maxWardrobe.getCategory().name());
        parameters.put(Columns.PRODUCT_CODE, maxWardrobe.getProductCode());
        parameters.put(Columns.DESCRIPTION, maxWardrobe.getDescription());
        parameters.put(Columns.WIDTH, maxWardrobe.getWidth());
        parameters.put(Columns.HEIGHT, maxWardrobe.getHeight());
        parameters.put(Columns.DEPTH, maxWardrobe.getDepth());
        parameters.put(Columns.CP_PPB_PRICE, maxWardrobe.getCpPpbPrice());
        parameters.put(Columns.CP_HD_HMR_PRICE, maxWardrobe.getCpHdHmrPrice());
        parameters.put(Columns.CP_HDF_PRICE, maxWardrobe.getCpHdfPrice());
        parameters.put(Columns.SP_FOILED_MATT_PRICE, maxWardrobe.getSpFoiledMattPrice());
        parameters.put(Columns.SP_FOILED_GLOSSY_PRICE, maxWardrobe.getSpFoiledGlossyPrice());
        parameters.put(Columns.SP_PRELAM_MATT_PRICE, maxWardrobe.getSpPrelamMattPrice());
        parameters.put(Columns.SP_PCPPB_PRICE, maxWardrobe.getSpPcppbPrice());
        parameters.put(Columns.SP_GLASS_G50_ALU_PRICE, maxWardrobe.getSpGlassG50AluPrice());
        parameters.put(Columns.SP_PVC_MDF_STD_PRICE, maxWardrobe.getSpPvcMdfStdPrice());
        parameters.put(Columns.SP_PVC_MDF_DESG_PRICE, maxWardrobe.getSpPvcMdfDesgPrice());
        parameters.put(Columns.SP_PVC_MDF_GLOSSY_PRICE, maxWardrobe.getSpPvcMdfGlossyPrice());
        parameters.put(Columns.SP_PVC_MDF_PREM_PRICE, maxWardrobe.getSpPvcMdfPremPrice());
        parameters.put(Columns.SOFT_HINGES_PRICE, maxWardrobe.getSoftHingesPrice());

        Number newId = insertMaxWardrobe.executeAndReturnKey(parameters);
        maxWardrobe = findById(newId.intValue());
        return maxWardrobe;
    }

    public void delete(Integer id) {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET deleted=? WHERE " + Columns.ID + "=?";
        jdbcTemplate.update(sqlQuery, new Object[]{true, id});
    }

    public MaxWardrobe update(MaxWardrobe maxWardrobe) {
        String path = maxWardrobe.getImage().get(0).toString().replace("\\", "\\\\");
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET "
                + Columns.CATEGORY + " = ?,"
                + Columns.PRODUCT_CODE + " = ?, "
                + Columns.DESCRIPTION + " = ?, "
                + Columns.WIDTH + " = ?,"
                + Columns.HEIGHT + " = ?,"
                + Columns.DEPTH + " = ?,"
                + Columns.CP_PPB_PRICE + " = ?,"
                + Columns.CP_HD_HMR_PRICE + " = ?,"
                + Columns.CP_HDF_PRICE + " = ?,"
                + Columns.SP_FOILED_MATT_PRICE + " = ?,"
                + Columns.SP_FOILED_GLOSSY_PRICE + " = ?,"
                + Columns.SP_PRELAM_MATT_PRICE + " = ?,"
                + Columns.SP_PCPPB_PRICE + " = ?,"
                + Columns.SP_GLASS_G50_ALU_PRICE + " = ?,"
                + Columns.SP_PVC_MDF_STD_PRICE + " = ?,"
                + Columns.SP_PVC_MDF_DESG_PRICE + " = ?,"
                + Columns.SP_PVC_MDF_GLOSSY_PRICE + " = ?,"
                + Columns.SP_PVC_MDF_PREM_PRICE + " = ?,"
                + Columns.SOFT_HINGES_PRICE + " = ?,"
                + Columns.IMAGE + " = '" + path + "' WHERE " + Columns.ID + " = ?";
        Number updatedCount = jdbcTemplate.update(sqlQuery,
                new Object[]{
                    maxWardrobe.getCategory().name(),
                    maxWardrobe.getProductCode(),
                    maxWardrobe.getDescription(),
                    maxWardrobe.getWidth(),
                    maxWardrobe.getHeight(),
                    maxWardrobe.getDepth(),
                    maxWardrobe.getCpPpbPrice(),
                    maxWardrobe.getCpHdHmrPrice(),
                    maxWardrobe.getCpHdfPrice(),
                    maxWardrobe.getSpFoiledMattPrice(),
                    maxWardrobe.getSpFoiledGlossyPrice(),
                    maxWardrobe.getSpPrelamMattPrice(),
                    maxWardrobe.getSpPcppbPrice(),
                    maxWardrobe.getSpGlassG50AluPrice(),
                    maxWardrobe.getSpPvcMdfStdPrice(),
                    maxWardrobe.getSpPvcMdfDesgPrice(),
                    maxWardrobe.getSpPvcMdfGlossyPrice(),
                    maxWardrobe.getSpPvcMdfPremPrice(),
                    maxWardrobe.getSoftHingesPrice(),
                    maxWardrobe.getId()
                });
        maxWardrobe = findById(maxWardrobe.getId());
        return maxWardrobe;
    }
}
