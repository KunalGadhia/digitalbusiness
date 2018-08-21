/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.infinitywardrobe;

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
public class InfinityWardrobeDAL {

    public static final class Columns {

        public static final String ID = "id";
        public static final String PRODUCT_CODE = "product_code";
        public static final String CATEGORY = "category";
        public static final String DESCRIPTION = "description";
        public static final String WIDTH = "width";
        public static final String DEPTH = "depth";
        public static final String HEIGHT = "height";
        public static final String CP_PPB = "cp_ppb";
        public static final String CP_MF = "cp_mf";
        public static final String CP_HMR = "cp_hmr";
        public static final String CP_HF = "cp_hf";
        public static final String SP_MF_ST = "sp_mf_st";
        public static final String SP_MF_DES = "sp_mf_des";
        public static final String SP_MF_GL_REG = "sp_mf_gl_reg";
        public static final String SP_MF_GLOSS_PREM = "sp_mf_gloss_prem";
        public static final String SP_HPL_MATT = "sp_hpl_matt";
        public static final String SP_PLY_HPL_GLOSS = "sp_ply_hpl_gloss";
        public static final String SP_PLY_HPL_MR = "sp_ply_hpl_mr";
        public static final String SP_MF_POLYMER = "sp_mf_polymer";
        public static final String SP_PLY_ACR_STD = "sp_ply_acr_std";
        public static final String SP_PLY_ACR_PREM = "sp_ply_acr_prem";
        public static final String SP_HDF_ACR_STD = "sp_hdf_acr_std";
        public static final String SP_HDF_ACR_PREM = "sp_hdf_acr_prem";
        public static final String SP_MF_PU_SOLID = "sp_mf_pu_solid";
        public static final String SP_MF_PU_METALLIC = "sp_mf_pu_metallic";
        public static final String SP_HMR_SOLID = "sp_hmr_solid";
        public static final String SP_HMR_METALLIC = "sp_hmr_metallic";
        public static final String SP_PLY_PU_SOLID = "sp_ply_pu_solid";
        public static final String SP_PLY_PU_METALLIC = "sp_ply_pu_metallic";
        public static final String SP_PRE_PB_EDGEB = "sp_pre_pb_edgeb";
        public static final String SP_PRE_MF_EDGEB = "sp_pre_mf_edgeb";
        public static final String SP_PRE_HMR_EDGEB = "sp_pre_hmr_edgeb";
        public static final String SP_HMR_STD = "sp_hmr_std";
        public static final String SP_HMR_DESG = "sp_hmr_desg";
        public static final String SP_HMR_GLOSS_REG = "sp_hmr_gloss_reg";
        public static final String SP_HMR_GLOSS_PREMIUM = "sp_hmr_gloss_premium";
        public static final String SP_G55_ACID_FROSTED = "sp_g55_acid_frosted";
        public static final String SP_GLORIA_STD = "sp_gloria_std";
        public static final String SP_GLORIA_DESG = "sp_gloria_desg";
        public static final String SP_GLORIA_GLOSS_REG = "sp_gloria_gloss_reg";
        public static final String SP_GLORIA_GLOSS_PREMIUM = "sp_gloria_gloss_premium";
        public static final String SP_GLORIA_PU_SOLID = "sp_gloria_pu_solid";
        public static final String SP_GLORIA_PU_METALLIC = "sp_gloria_pu_metallic";
        public static final String SP_VENETTA_MF_PU_SOLID = "sp_venetta_mf_pu_solid";
        public static final String SP_VENETTA_MF_PU_METALLIC = "sp_venetta_mf_pu_metallic";
        public static final String SP_HF_ACR_GLASS = "sp_hf_acr_glass";
        public static final String HINGE_SOFT_CLOSE = "hinge_soft_close";
        public static final String HINGE_BLUM_SOFT_CLOSE = "hinge_blum_soft_close";
        public static final String HINGE_DEG155 = "hinge_deg155";
        public static final String IMAGE = "image";

    }

    public static final String TABLE_NAME = "infinity_wardrobe_master";

    private final SimpleJdbcInsert insertInfinityWardrobe;
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public InfinityWardrobeDAL(DataSource dataSource) {
        jdbcTemplate = new JdbcTemplate(dataSource);
        insertInfinityWardrobe = new SimpleJdbcInsert(jdbcTemplate)
                .withTableName(TABLE_NAME)
                .usingColumns(
                        Columns.PRODUCT_CODE,
                        Columns.CATEGORY,
                        Columns.DESCRIPTION,
                        Columns.WIDTH,
                        Columns.DEPTH,
                        Columns.HEIGHT,
                        Columns.CP_PPB,
                        Columns.CP_MF,
                        Columns.CP_HMR,
                        Columns.CP_HF,
                        Columns.SP_MF_ST,
                        Columns.SP_MF_DES,
                        Columns.SP_MF_GL_REG,
                        Columns.SP_MF_GLOSS_PREM,
                        Columns.SP_HPL_MATT,
                        Columns.SP_PLY_HPL_GLOSS,
                        Columns.SP_PLY_HPL_MR,
                        Columns.SP_MF_POLYMER,
                        Columns.SP_PLY_ACR_STD,
                        Columns.SP_PLY_ACR_PREM,
                        Columns.SP_HDF_ACR_STD,
                        Columns.SP_HDF_ACR_PREM,
                        Columns.SP_MF_PU_SOLID,
                        Columns.SP_MF_PU_METALLIC,
                        Columns.SP_HMR_SOLID,
                        Columns.SP_HMR_METALLIC,
                        Columns.SP_PLY_PU_SOLID,
                        Columns.SP_PLY_PU_METALLIC,
                        Columns.SP_PRE_PB_EDGEB,
                        Columns.SP_PRE_MF_EDGEB,
                        Columns.SP_PRE_HMR_EDGEB,
                        Columns.SP_HMR_STD,
                        Columns.SP_HMR_DESG,
                        Columns.SP_HMR_GLOSS_REG,
                        Columns.SP_HMR_GLOSS_PREMIUM,
                        Columns.SP_G55_ACID_FROSTED,
                        Columns.SP_GLORIA_STD,
                        Columns.SP_GLORIA_DESG,
                        Columns.SP_GLORIA_GLOSS_REG,
                        Columns.SP_GLORIA_GLOSS_PREMIUM,
                        Columns.SP_GLORIA_PU_SOLID,
                        Columns.SP_GLORIA_PU_METALLIC,
                        Columns.SP_VENETTA_MF_PU_SOLID,
                        Columns.SP_VENETTA_MF_PU_METALLIC,
                        Columns.SP_HF_ACR_GLASS,
                        Columns.HINGE_SOFT_CLOSE,
                        Columns.HINGE_BLUM_SOFT_CLOSE,
                        Columns.HINGE_DEG155
                )
                .usingGeneratedKeyColumns(Columns.ID);
    }

    public List<InfinityWardrobe> findAll(Integer offset) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE ORDER BY " + Columns.ID + " DESC LIMIT 10 OFFSET ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{offset}, new BeanPropertyRowMapper<>(InfinityWardrobe.class));
    }

    public List<InfinityWardrobe> findByCategory(String category) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.CATEGORY + " = ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{category}, new BeanPropertyRowMapper<>(InfinityWardrobe.class));
    }

    public List<InfinityWardrobe> findByCategoryDimensions(String category, Double width, Double depth, Double height) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.CATEGORY + " = ? AND " + Columns.WIDTH + " = ? AND " + Columns.DEPTH + " = ? AND " + Columns.HEIGHT + " = ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{category, width, depth, height}, new BeanPropertyRowMapper<>(InfinityWardrobe.class));
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

    public InfinityWardrobe findById(Integer id) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.ID + " = ?";
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{id}, new BeanPropertyRowMapper<>(InfinityWardrobe.class));
    }

    public InfinityWardrobe findByDescription(String description) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.DESCRIPTION + " = ?";
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{description}, new BeanPropertyRowMapper<>(InfinityWardrobe.class));
    }

    public List<InfinityWardrobe> findByDescriptionLike(String description) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND lower(description) LIKE?";
        String nameLike = "%" + description.toLowerCase() + "%";
        return jdbcTemplate.query(sqlQuery, new Object[]{nameLike}, new BeanPropertyRowMapper<>(InfinityWardrobe.class));
    }

    public InfinityWardrobe insert(InfinityWardrobe infinityWardrobe) {
        Map<String, Object> parameters = new HashMap<>();
        parameters.put(Columns.PRODUCT_CODE, infinityWardrobe.getProductCode());
        parameters.put(Columns.CATEGORY, infinityWardrobe.getCategory().name());
        parameters.put(Columns.DESCRIPTION, infinityWardrobe.getDescription());
        parameters.put(Columns.WIDTH, infinityWardrobe.getWidth());
        parameters.put(Columns.DEPTH, infinityWardrobe.getDepth());
        parameters.put(Columns.HEIGHT, infinityWardrobe.getHeight());
        parameters.put(Columns.CP_PPB, infinityWardrobe.getCpPpb());
        parameters.put(Columns.CP_MF, infinityWardrobe.getCpMf());
        parameters.put(Columns.CP_HMR, infinityWardrobe.getCpHmr());
        parameters.put(Columns.CP_HF, infinityWardrobe.getCpHf());
        parameters.put(Columns.SP_MF_ST, infinityWardrobe.getSpMfSt());
        parameters.put(Columns.SP_MF_DES, infinityWardrobe.getSpMfDes());
        parameters.put(Columns.SP_MF_GL_REG, infinityWardrobe.getSpMfGlReg());
        parameters.put(Columns.SP_MF_GLOSS_PREM, infinityWardrobe.getSpMfGlossPrem());
        parameters.put(Columns.SP_HPL_MATT, infinityWardrobe.getSpHplMatt());
        parameters.put(Columns.SP_PLY_HPL_GLOSS, infinityWardrobe.getSpPlyHplGloss());
        parameters.put(Columns.SP_PLY_HPL_MR, infinityWardrobe.getSpPlyHplMr());
        parameters.put(Columns.SP_MF_POLYMER, infinityWardrobe.getSpMfPolymer());
        parameters.put(Columns.SP_PLY_ACR_STD, infinityWardrobe.getSpPlyAcrStd());
        parameters.put(Columns.SP_PLY_ACR_PREM, infinityWardrobe.getSpPlyAcrPrem());
        parameters.put(Columns.SP_HDF_ACR_STD, infinityWardrobe.getSpHdfAcrStd());
        parameters.put(Columns.SP_HDF_ACR_PREM, infinityWardrobe.getSpHdfAcrPrem());
        parameters.put(Columns.SP_MF_PU_SOLID, infinityWardrobe.getSpMfPuSolid());
        parameters.put(Columns.SP_MF_PU_METALLIC, infinityWardrobe.getSpMfPuMetallic());
        parameters.put(Columns.SP_HMR_SOLID, infinityWardrobe.getSpHmrSolid());
        parameters.put(Columns.SP_HMR_METALLIC, infinityWardrobe.getSpHmrMetallic());
        parameters.put(Columns.SP_PLY_PU_SOLID, infinityWardrobe.getSpPlyPuSolid());
        parameters.put(Columns.SP_PLY_PU_METALLIC, infinityWardrobe.getSpPlyPuMetallic());
        parameters.put(Columns.SP_PRE_PB_EDGEB, infinityWardrobe.getSpPrePbEdgeb());
        parameters.put(Columns.SP_PRE_MF_EDGEB, infinityWardrobe.getSpPreMfEdgeb());
        parameters.put(Columns.SP_PRE_HMR_EDGEB, infinityWardrobe.getSpPreHmrEdgeb());
        parameters.put(Columns.SP_HMR_STD, infinityWardrobe.getSpHmrStd());
        parameters.put(Columns.SP_HMR_DESG, infinityWardrobe.getSpHmrDesg());
        parameters.put(Columns.SP_HMR_GLOSS_REG, infinityWardrobe.getSpHmrGlossReg());
        parameters.put(Columns.SP_HMR_GLOSS_PREMIUM, infinityWardrobe.getSpHmrGlossPremium());
        parameters.put(Columns.SP_G55_ACID_FROSTED, infinityWardrobe.getSpG55AcidFrosted());
        parameters.put(Columns.SP_GLORIA_STD, infinityWardrobe.getSpGloriaStd());
        parameters.put(Columns.SP_GLORIA_DESG, infinityWardrobe.getSpGloriaDesg());
        parameters.put(Columns.SP_GLORIA_GLOSS_REG, infinityWardrobe.getSpGloriaGlossReg());
        parameters.put(Columns.SP_GLORIA_GLOSS_PREMIUM, infinityWardrobe.getSpGloriaGlossPremium());
        parameters.put(Columns.SP_GLORIA_PU_SOLID, infinityWardrobe.getSpGloriaPuSolid());
        parameters.put(Columns.SP_GLORIA_PU_METALLIC, infinityWardrobe.getSpGloriaPuMetallic());
        parameters.put(Columns.SP_VENETTA_MF_PU_SOLID, infinityWardrobe.getSpVenettaMfPuSolid());
        parameters.put(Columns.SP_VENETTA_MF_PU_METALLIC, infinityWardrobe.getSpVenettaMfPuMetallic());
        parameters.put(Columns.SP_HF_ACR_GLASS, infinityWardrobe.getSpHfAcrGlass());
        parameters.put(Columns.HINGE_SOFT_CLOSE, infinityWardrobe.getHingeSoftClose());
        parameters.put(Columns.HINGE_BLUM_SOFT_CLOSE, infinityWardrobe.getHingeBlumSoftClose());
        parameters.put(Columns.HINGE_DEG155, infinityWardrobe.getHingeDeg155());

        Number newId = insertInfinityWardrobe.executeAndReturnKey(parameters);
        infinityWardrobe = findById(newId.intValue());
        return infinityWardrobe;
    }

    public void delete(Integer id) {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET deleted=? WHERE " + Columns.ID + "=?";
        jdbcTemplate.update(sqlQuery, new Object[]{true, id});
    }

    public InfinityWardrobe update(InfinityWardrobe infinityWardrobe) {
        String path = infinityWardrobe.getImage().get(0).toString().replace("\\", "\\\\");
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET "
                + Columns.PRODUCT_CODE + " = ?,"
                + Columns.CATEGORY + " = ?,"
                + Columns.DESCRIPTION + " = ?, "
                + Columns.WIDTH + " = ?,"
                + Columns.DEPTH + " = ?,"
                + Columns.HEIGHT + " = ?,"
                + Columns.CP_PPB + " = ?,"
                + Columns.CP_MF + " = ?,"
                + Columns.CP_HMR + " = ?,"
                + Columns.CP_HF + " = ?,"
                + Columns.SP_MF_ST + " = ?,"
                + Columns.SP_MF_DES + " = ?,"
                + Columns.SP_MF_GL_REG + " = ?,"
                + Columns.SP_MF_GLOSS_PREM + " = ?,"
                + Columns.SP_HPL_MATT + " = ?,"
                + Columns.SP_PLY_HPL_GLOSS + " = ?,"
                + Columns.SP_PLY_HPL_MR + " = ?,"
                + Columns.SP_MF_POLYMER + " = ?,"
                + Columns.SP_PLY_ACR_STD + " = ?,"
                + Columns.SP_PLY_ACR_PREM + " = ?,"
                + Columns.SP_HDF_ACR_STD + " = ?,"
                + Columns.SP_HDF_ACR_PREM + " = ?,"
                + Columns.SP_MF_PU_SOLID + " = ?,"
                + Columns.SP_MF_PU_METALLIC + " = ?,"
                + Columns.SP_HMR_SOLID + " = ?,"
                + Columns.SP_HMR_METALLIC + " = ?,"
                + Columns.SP_PLY_PU_SOLID + " = ?,"
                + Columns.SP_PLY_PU_METALLIC + " = ?,"
                + Columns.SP_PRE_PB_EDGEB + " = ?,"
                + Columns.SP_PRE_MF_EDGEB + " = ?,"
                + Columns.SP_PRE_HMR_EDGEB + " = ?,"
                + Columns.SP_HMR_STD + " = ?,"
                + Columns.SP_HMR_DESG + " = ?,"
                + Columns.SP_HMR_GLOSS_REG + " = ?,"
                + Columns.SP_HMR_GLOSS_PREMIUM + " = ?,"
                + Columns.SP_G55_ACID_FROSTED + " = ?,"
                + Columns.SP_GLORIA_STD + " = ?,"
                + Columns.SP_GLORIA_DESG + " = ?,"
                + Columns.SP_GLORIA_GLOSS_REG + " = ?,"
                + Columns.SP_GLORIA_GLOSS_PREMIUM + " = ?,"
                + Columns.SP_GLORIA_PU_SOLID + " = ?,"
                + Columns.SP_GLORIA_PU_METALLIC + " = ?,"
                + Columns.SP_VENETTA_MF_PU_SOLID + " = ?,"
                + Columns.SP_VENETTA_MF_PU_METALLIC + " = ?,"
                + Columns.SP_HF_ACR_GLASS + " = ?,"
                + Columns.HINGE_SOFT_CLOSE + " = ?,"
                + Columns.HINGE_BLUM_SOFT_CLOSE + " = ?,"
                + Columns.HINGE_DEG155 + " = ?,"
                + Columns.IMAGE + " = '" + path + "' WHERE " + Columns.ID + " = ?";
        Number updatedCount = jdbcTemplate.update(sqlQuery,
                new Object[]{
                    infinityWardrobe.getProductCode(),
                    infinityWardrobe.getCategory().name(),
                    infinityWardrobe.getDescription(),
                    infinityWardrobe.getWidth(),
                    infinityWardrobe.getDepth(),
                    infinityWardrobe.getHeight(),
                    infinityWardrobe.getCpPpb(),
                    infinityWardrobe.getCpMf(),
                    infinityWardrobe.getCpHmr(),
                    infinityWardrobe.getCpHf(),
                    infinityWardrobe.getSpMfSt(),
                    infinityWardrobe.getSpMfDes(),
                    infinityWardrobe.getSpMfGlReg(),
                    infinityWardrobe.getSpMfGlossPrem(),
                    infinityWardrobe.getSpHplMatt(),
                    infinityWardrobe.getSpPlyHplGloss(),
                    infinityWardrobe.getSpPlyHplMr(),
                    infinityWardrobe.getSpMfPolymer(),
                    infinityWardrobe.getSpPlyAcrStd(),
                    infinityWardrobe.getSpPlyAcrPrem(),
                    infinityWardrobe.getSpHdfAcrStd(),
                    infinityWardrobe.getSpHdfAcrPrem(),
                    infinityWardrobe.getSpMfPuSolid(),
                    infinityWardrobe.getSpMfPuMetallic(),
                    infinityWardrobe.getSpHmrSolid(),
                    infinityWardrobe.getSpHmrMetallic(),
                    infinityWardrobe.getSpPlyPuSolid(),
                    infinityWardrobe.getSpPlyPuMetallic(),
                    infinityWardrobe.getSpPrePbEdgeb(),
                    infinityWardrobe.getSpPreMfEdgeb(),
                    infinityWardrobe.getSpPreHmrEdgeb(),
                    infinityWardrobe.getSpHmrStd(),
                    infinityWardrobe.getSpHmrDesg(),
                    infinityWardrobe.getSpHmrGlossReg(),
                    infinityWardrobe.getSpHmrGlossPremium(),
                    infinityWardrobe.getSpG55AcidFrosted(),
                    infinityWardrobe.getSpGloriaStd(),
                    infinityWardrobe.getSpGloriaDesg(),
                    infinityWardrobe.getSpGloriaGlossReg(),
                    infinityWardrobe.getSpGloriaGlossPremium(),
                    infinityWardrobe.getSpGloriaPuSolid(),
                    infinityWardrobe.getSpGloriaPuMetallic(),
                    infinityWardrobe.getSpVenettaMfPuSolid(),
                    infinityWardrobe.getSpVenettaMfPuMetallic(),
                    infinityWardrobe.getSpHfAcrGlass(),
                    infinityWardrobe.getHingeSoftClose(),
                    infinityWardrobe.getHingeBlumSoftClose(),
                    infinityWardrobe.getHingeDeg155(),
                    infinityWardrobe.getId()
                });
        infinityWardrobe = findById(infinityWardrobe.getId());
        return infinityWardrobe;
    }
}
