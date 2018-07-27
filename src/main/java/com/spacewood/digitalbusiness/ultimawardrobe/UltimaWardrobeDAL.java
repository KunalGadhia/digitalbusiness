/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.ultimawardrobe;

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
public class UltimaWardrobeDAL {
    public static final class Columns {

        public static final String ID = "id";
        public static final String CATEGORY = "category";        
        public static final String DESCRIPTION = "description";
        public static final String WIDTH = "width";
        public static final String DEPTH = "depth";
        public static final String HEIGHT = "height";
        public static final String CP_PPB = "cp_ppb";
        public static final String CP_MDF = "cp_mdf";
        public static final String CP_HDF = "cp_hdf";
        public static final String SP_PVC_MEM = "sp_pvc_mem";
        public static final String SP_PC3_MELAMINE = "sp_pc3_melamine";
        public static final String SP_PVC_MEMROUTED = "sp_pvc_memrouted";
        public static final String SP_PVC_HGMEM = "sp_pvc_hgmem";
        public static final String SP_AL_G55 = "sp_al_g55";
        public static final String SP_PVC_MATMEM = "sp_pvc_matmem";
        public static final String SP_PVC_MATGLASS = "sp_pvc_matglass";
        public static final String SP_PVC_GLOSS_GLASS = "sp_pvc_gloss_glass";
        public static final String HAN_H100_CD320 = "han_h100_cd320";
        public static final String HAN_H268_CD336 = "han_h268_cd336";
        public static final String HAN_F6023_CD320 = "han_f6023_cd320";
        public static final String HAN_F188_CD224 = "han_f188_cd224";
        public static final String HAN_H17_CD320 = "han_h17_cd320";
        
    }

    public static final String TABLE_NAME = "ultima_wardrobe";

    private final SimpleJdbcInsert insertUltimaWardrobe;
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public UltimaWardrobeDAL(DataSource dataSource) {
        jdbcTemplate = new JdbcTemplate(dataSource);
        insertUltimaWardrobe = new SimpleJdbcInsert(jdbcTemplate)
                .withTableName(TABLE_NAME)
                .usingColumns(
                        Columns.CATEGORY,                        
                        Columns.DESCRIPTION,
                        Columns.WIDTH,
                        Columns.DEPTH,
                        Columns.HEIGHT,                        
                        Columns.CP_PPB,
                        Columns.CP_MDF,
                        Columns.CP_HDF,
                        Columns.SP_PVC_MEM,
                        Columns.SP_PC3_MELAMINE,
                        Columns.SP_PVC_MEMROUTED,
                        Columns.SP_PVC_HGMEM,
                        Columns.SP_AL_G55,
                        Columns.SP_PVC_MATMEM,
                        Columns.SP_PVC_MATGLASS,
                        Columns.SP_PVC_GLOSS_GLASS,
                        Columns.HAN_H100_CD320,
                        Columns.HAN_H268_CD336,
                        Columns.HAN_F6023_CD320,
                        Columns.HAN_F188_CD224,
                        Columns.HAN_H17_CD320
                )
                .usingGeneratedKeyColumns(Columns.ID);
    }

    public List<UltimaWardrobe> findAll(Integer offset) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE ORDER BY " + Columns.ID + " DESC LIMIT 10 OFFSET ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{offset}, new BeanPropertyRowMapper<>(UltimaWardrobe.class));
    }
    
    public List<UltimaWardrobe> findByCategory(String category) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.CATEGORY + " = ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{category}, new BeanPropertyRowMapper<>(UltimaWardrobe.class));
    }

    public UltimaWardrobe findById(Integer id) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.ID + " = ?";
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{id}, new BeanPropertyRowMapper<>(UltimaWardrobe.class));
    }

    public UltimaWardrobe findByDescription(String description) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.DESCRIPTION + " = ?";
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{description}, new BeanPropertyRowMapper<>(UltimaWardrobe.class));
    }

    public List<UltimaWardrobe> findByDescriptionLike(String description) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND lower(description) LIKE?";
        String nameLike = "%" + description.toLowerCase() + "%";
        return jdbcTemplate.query(sqlQuery, new Object[]{nameLike}, new BeanPropertyRowMapper<>(UltimaWardrobe.class));
    }

    public UltimaWardrobe insert(UltimaWardrobe ultimaWardrobe) {
        Map<String, Object> parameters = new HashMap<>();
        parameters.put(Columns.CATEGORY, ultimaWardrobe.getCategory().name());        
        parameters.put(Columns.DESCRIPTION, ultimaWardrobe.getDescription());
        parameters.put(Columns.WIDTH, ultimaWardrobe.getWidth());
        parameters.put(Columns.DEPTH, ultimaWardrobe.getDepth());
        parameters.put(Columns.HEIGHT, ultimaWardrobe.getHeight());
        parameters.put(Columns.CP_PPB, ultimaWardrobe.getCpPpb());
        parameters.put(Columns.CP_MDF, ultimaWardrobe.getCpMdf());
        parameters.put(Columns.CP_HDF, ultimaWardrobe.getCpHdf());
        parameters.put(Columns.SP_PVC_MEM, ultimaWardrobe.getSpPvcMem());
        parameters.put(Columns.SP_PC3_MELAMINE, ultimaWardrobe.getSpPc3Melamine());
        parameters.put(Columns.SP_PVC_MEMROUTED, ultimaWardrobe.getSpPvcMemrouted());
        parameters.put(Columns.SP_PVC_HGMEM, ultimaWardrobe.getSpPvcHgmem());
        parameters.put(Columns.SP_AL_G55, ultimaWardrobe.getSpAlG55());
        parameters.put(Columns.SP_PVC_MATMEM, ultimaWardrobe.getSpPvcMatmem());
        parameters.put(Columns.SP_PVC_MATGLASS, ultimaWardrobe.getSpPvcMatglass());
        parameters.put(Columns.SP_PVC_GLOSS_GLASS, ultimaWardrobe.getSpPvcGlossGlass());
        parameters.put(Columns.HAN_H100_CD320, ultimaWardrobe.getHanH100Cd320());
        parameters.put(Columns.HAN_H268_CD336, ultimaWardrobe.getHanH268Cd336());
        parameters.put(Columns.HAN_F6023_CD320, ultimaWardrobe.getHanF6023Cd320());
        parameters.put(Columns.HAN_F188_CD224, ultimaWardrobe.getHanF188Cd224());
        parameters.put(Columns.HAN_H17_CD320, ultimaWardrobe.getHanH17Cd320());                

        Number newId = insertUltimaWardrobe.executeAndReturnKey(parameters);
        ultimaWardrobe = findById(newId.intValue());
        return ultimaWardrobe;
    }

    public void delete(Integer id) {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET deleted=? WHERE " + Columns.ID + "=?";
        jdbcTemplate.update(sqlQuery, new Object[]{true, id});
    }

    public UltimaWardrobe update(UltimaWardrobe ultimaWardrobe) {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET "
                + Columns.CATEGORY + " = ?,"                
                + Columns.DESCRIPTION + " = ?, "
                + Columns.WIDTH + " = ?,"
                + Columns.DEPTH + " = ?,"
                + Columns.HEIGHT + " = ?,"                
                + Columns.CP_PPB + " = ?,"
                + Columns.CP_MDF + " = ?,"
                + Columns.CP_HDF + " = ?,"
                + Columns.SP_PVC_MEM + " = ?,"
                + Columns.SP_PC3_MELAMINE + " = ?,"
                + Columns.SP_PVC_MEMROUTED + " = ?,"
                + Columns.SP_PVC_HGMEM + " = ?,"
                + Columns.SP_AL_G55 + " = ?,"
                + Columns.SP_PVC_MATMEM + " = ?,"
                + Columns.SP_PVC_MATGLASS + " = ?,"
                + Columns.SP_PVC_GLOSS_GLASS + " = ?,"
                + Columns.HAN_H100_CD320 + " = ?,"
                + Columns.HAN_H268_CD336 + " = ?,"
                + Columns.HAN_F6023_CD320 + " = ?,"
                + Columns.HAN_F188_CD224 + " = ?,"
                + Columns.HAN_H17_CD320 + " = ? WHERE " + Columns.ID + " = ?";
        Number updatedCount = jdbcTemplate.update(sqlQuery,
                new Object[]{
                    ultimaWardrobe.getCategory().name(),                    
                    ultimaWardrobe.getDescription(),
                    ultimaWardrobe.getWidth(),
                    ultimaWardrobe.getDepth(),
                    ultimaWardrobe.getHeight(),                    
                    ultimaWardrobe.getCpPpb(),
                    ultimaWardrobe.getCpMdf(),
                    ultimaWardrobe.getCpHdf(),
                    ultimaWardrobe.getSpPvcMem(),
                    ultimaWardrobe.getSpPc3Melamine(),
                    ultimaWardrobe.getSpPvcMemrouted(),
                    ultimaWardrobe.getSpPvcHgmem(),
                    ultimaWardrobe.getSpAlG55(),
                    ultimaWardrobe.getSpPvcMatmem(),
                    ultimaWardrobe.getSpPvcMatglass(),
                    ultimaWardrobe.getSpPvcGlossGlass(),
                    ultimaWardrobe.getHanH100Cd320(),
                    ultimaWardrobe.getHanH268Cd336(),
                    ultimaWardrobe.getHanF6023Cd320(),
                    ultimaWardrobe.getHanF188Cd224(),
                    ultimaWardrobe.getHanH17Cd320(),
                    ultimaWardrobe.getId()
                });
        ultimaWardrobe = findById(ultimaWardrobe.getId());
        return ultimaWardrobe;
    }
}
