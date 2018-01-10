/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.ratecontract;

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
public class RateContractDAL {
    public static final class Columns {

        public static final String ID = "id";
        public static final String CONTRACT_NAME = "contract_name";
        public static final String CONTRACT_DESCRIPTION = "contract_description";            
    }

    public static final String TABLE_NAME = "rate_contract_master";

    private final SimpleJdbcInsert insertRateContract;
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public RateContractDAL(DataSource dataSource) {
        jdbcTemplate = new JdbcTemplate(dataSource);
        insertRateContract = new SimpleJdbcInsert(jdbcTemplate)
                .withTableName(TABLE_NAME)
                .usingColumns(
                        Columns.CONTRACT_NAME,
                        Columns.CONTRACT_DESCRIPTION
                )
                .usingGeneratedKeyColumns(Columns.ID);
    }

    public List<RateContract> findAll(Integer offset) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE ORDER BY " + Columns.ID + " DESC LIMIT 10 OFFSET ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{offset}, new BeanPropertyRowMapper<>(RateContract.class));
    }

    public RateContract findById(Integer id) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.ID + " = ?";
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{id}, new BeanPropertyRowMapper<>(RateContract.class));
    }   
    
    public RateContract findByContractName(String contractName) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.CONTRACT_NAME + " = ?";
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{contractName}, new BeanPropertyRowMapper<>(RateContract.class));
    }

    public List<RateContract> findByContractNameLike(String contractName) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND lower(contract_name) LIKE?";
        String nameLike = "%" + contractName.toLowerCase() + "%";
        return jdbcTemplate.query(sqlQuery, new Object[]{nameLike}, new BeanPropertyRowMapper<>(RateContract.class));
    }

    public RateContract insert(RateContract rateContract) {
        Map<String, Object> parameters = new HashMap<>();
        parameters.put(Columns.CONTRACT_NAME, rateContract.getContractName());
        parameters.put(Columns.CONTRACT_DESCRIPTION, rateContract.getContractDescription());        
        
        Number newId = insertRateContract.executeAndReturnKey(parameters);
        rateContract = findById(newId.intValue());
        return rateContract;
    }

    public void delete(Integer id) {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET deleted=? WHERE " + Columns.ID + "=?";
        jdbcTemplate.update(sqlQuery, new Object[]{true, id});
    }

    public RateContract update(RateContract rateContract) {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET "
                + Columns.CONTRACT_NAME + " = ?,"                
                + Columns.CONTRACT_DESCRIPTION + " = ? WHERE " + Columns.ID + " = ?";
        Number updatedCount = jdbcTemplate.update(sqlQuery,
                new Object[]{
                    rateContract.getContractName(),
                    rateContract.getContractDescription(),                                     
                    rateContract.getId()
                });
        rateContract = findById(rateContract.getId());
        return rateContract;
    }
}
