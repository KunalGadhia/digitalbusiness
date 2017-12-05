/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.handleprice;

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
public class HandlePriceDAL {
    public static final class Columns {

        public static final String ID = "id";
        public static final String KITCHEN_COMPONENT = "kitchen_component";
        public static final String FINISH = "finish";
        public static final String CD = "cd";
        public static final String PRICE = "price";
        
    }

    public static final String TABLE_NAME = "handle_price";

    private final SimpleJdbcInsert insertHandlePrice;
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public HandlePriceDAL(DataSource dataSource) {
        jdbcTemplate = new JdbcTemplate(dataSource);
        insertHandlePrice = new SimpleJdbcInsert(jdbcTemplate)
                .withTableName(TABLE_NAME)
                .usingColumns(
                        Columns.KITCHEN_COMPONENT,
                        Columns.FINISH,
                        Columns.CD,
                        Columns.PRICE
                )
                .usingGeneratedKeyColumns(Columns.ID);
    }

    public List<HandlePrice> findAll(Integer offset) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE ORDER BY " + Columns.ID + " DESC LIMIT 10 OFFSET ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{offset}, new BeanPropertyRowMapper<>(HandlePrice.class));
    }

    public List<HandlePrice> findAllList() {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE";
        return jdbcTemplate.query(sqlQuery, new Object[]{}, new BeanPropertyRowMapper<>(HandlePrice.class));
    }

    public HandlePrice findById(Integer id) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.ID + " = ?";
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{id}, new BeanPropertyRowMapper<>(HandlePrice.class));
    }
    
    public List<HandlePrice> findByKitchenComponent(String kitchenComponent) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.KITCHEN_COMPONENT + " = ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{kitchenComponent}, new BeanPropertyRowMapper<>(HandlePrice.class));
    }

//    public List<CarcassSubtype> findBySubTypeLike(String subtype) {
//        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND lower(sub_typr) LIKE?";
//        String subTypeLike = "%" + subtype.toLowerCase() + "%";
//        return jdbcTemplate.query(sqlQuery, new Object[]{subTypeLike}, new BeanPropertyRowMapper<>(CarcassSubtype.class));
//    }

    public HandlePrice insert(HandlePrice handlePrice) {
        Map<String, Object> parameters = new HashMap<>();
        parameters.put(Columns.KITCHEN_COMPONENT, handlePrice.getKitchenComponent());
        parameters.put(Columns.FINISH, handlePrice.getFinish());
        parameters.put(Columns.CD, handlePrice.getCd());
        parameters.put(Columns.PRICE, handlePrice.getPrice());
        Number newId = insertHandlePrice.executeAndReturnKey(parameters);
        handlePrice = findById(newId.intValue());
        return handlePrice;
    }

    public void delete(Integer id) {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET deleted=? WHERE " + Columns.ID + "=?";
        jdbcTemplate.update(sqlQuery, new Object[]{true, id});
    }

    public HandlePrice update(HandlePrice handlePrice) {        
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET "
                + Columns.KITCHEN_COMPONENT + " = ?, "
                + Columns.FINISH + " = ?, "
                + Columns.CD + " = ?, "
                + Columns.PRICE + " = ? WHERE " + Columns.ID + " = ?";
        Number updatedCount = jdbcTemplate.update(sqlQuery,
                new Object[]{
                    handlePrice.getKitchenComponent(),
                    handlePrice.getFinish(),                   
                    handlePrice.getCd(),
                    handlePrice.getPrice(),
                    handlePrice.getId()
                });
        handlePrice = findById(handlePrice.getId());
        return handlePrice;
    }
}
