/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.ratecontractdetail;

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
public class RateContractDetailDAL {

    public static final class Columns {

        public static final String ID = "id";
        public static final String RATE_CONTRACT_ID = "rate_contract_id";
        public static final String FINISH = "finish";
        public static final String MATERIAL = "material";
        public static final String THICKNESS = "thickness";
        public static final String COMPONENT = "component";
        public static final String DISCOUNT_PER = "discount_per";

    }

    public static final String TABLE_NAME = "rate_contract_detail_master";

    private final SimpleJdbcInsert insertOrderDetail;
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public RateContractDetailDAL(DataSource dataSource) {
        jdbcTemplate = new JdbcTemplate(dataSource);
        insertOrderDetail = new SimpleJdbcInsert(jdbcTemplate)
                .withTableName(TABLE_NAME)
                .usingColumns(
                        Columns.RATE_CONTRACT_ID,
                        Columns.FINISH,
                        Columns.MATERIAL,
                        Columns.THICKNESS,
                        Columns.COMPONENT,
                        Columns.DISCOUNT_PER
                )
                .usingGeneratedKeyColumns(Columns.ID);
    }

    public List<RateContractDetail> findAll(Integer offset) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE ORDER BY " + Columns.ID + " DESC LIMIT 10 OFFSET ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{offset}, new BeanPropertyRowMapper<>(RateContractDetail.class));
    }

    public RateContractDetail findById(Integer id) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.ID + " = ?";
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{id}, new BeanPropertyRowMapper<>(RateContractDetail.class));
    }

//    public Party findByName(String name) {       
//        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.DEALER_NAME + " = ?";        
//        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{name}, new BeanPropertyRowMapper<>(Party.class));
//    }
//
    public List<RateContractDetail> findByRateContractId(Integer rateContractId) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.RATE_CONTRACT_ID + " = ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{rateContractId}, new BeanPropertyRowMapper<>(RateContractDetail.class));
    }

    public RateContractDetail findByShutterFinishMaterialThickness(String finish, String material, Double thickness, Integer rateContractId) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND component='SHUTTER' AND " + Columns.FINISH + "=? AND " + Columns.MATERIAL + "=? AND " + Columns.THICKNESS + "=? AND " + Columns.RATE_CONTRACT_ID + " = ?";
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{finish, material, thickness, rateContractId}, new BeanPropertyRowMapper<>(RateContractDetail.class));
    }

    public RateContractDetail findByPanelMaterialThickness(String material, Double thickness, Integer rateContractId) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND component='PANEL' AND " + Columns.MATERIAL + "=? AND " + Columns.THICKNESS + "=? AND " + Columns.RATE_CONTRACT_ID + " = ?";
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{material, thickness, rateContractId}, new BeanPropertyRowMapper<>(RateContractDetail.class));
    }

    public RateContractDetail findByCarcassMaterialThickness(String material, Double thickness, Integer rateContractId) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND component='CARCASS' AND " + Columns.MATERIAL + "=? AND " + Columns.THICKNESS + "=? AND " + Columns.RATE_CONTRACT_ID + " = ?";
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{material, thickness, rateContractId}, new BeanPropertyRowMapper<>(RateContractDetail.class));
    }

    public RateContractDetail insert(RateContractDetail rateContractDetail) {
        System.out.println("Insert Order Detail :" + rateContractDetail);
        Map<String, Object> parameters = new HashMap<>();
        parameters.put(Columns.RATE_CONTRACT_ID, rateContractDetail.getRateContractId());
        parameters.put(Columns.FINISH, rateContractDetail.getFinish());
        parameters.put(Columns.MATERIAL, rateContractDetail.getMaterial());
        parameters.put(Columns.THICKNESS, rateContractDetail.getThickness());
        parameters.put(Columns.COMPONENT, rateContractDetail.getComponent());
        parameters.put(Columns.DISCOUNT_PER, rateContractDetail.getDiscountPer());

        Number newId = insertOrderDetail.executeAndReturnKey(parameters);
        rateContractDetail = findById(newId.intValue());
        return rateContractDetail;
    }

    public void delete(Integer id) {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET deleted=? WHERE " + Columns.ID + "=?";
        jdbcTemplate.update(sqlQuery, new Object[]{true, id});
    }

    public RateContractDetail update(RateContractDetail rateContractDetail) {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET "
                + Columns.RATE_CONTRACT_ID + " = ?,"
                + Columns.FINISH + " = ?, "
                + Columns.COMPONENT + " = ?,"
                + Columns.MATERIAL + " = ?,"
                + Columns.THICKNESS + " = ?,"
                + Columns.COMPONENT + " = ?,"
                + Columns.DISCOUNT_PER + " = ? WHERE " + Columns.ID + " = ?";
        Number updatedCount = jdbcTemplate.update(sqlQuery,
                new Object[]{
                    rateContractDetail.getRateContractId(),
                    rateContractDetail.getFinish(),
                    rateContractDetail.getComponent(),
                    rateContractDetail.getMaterial(),
                    rateContractDetail.getThickness(),
                    rateContractDetail.getComponent(),
                    rateContractDetail.getDiscountPer(),
                    rateContractDetail.getId()
                });
        rateContractDetail = findById(rateContractDetail.getId());
        return rateContractDetail;
    }

}
