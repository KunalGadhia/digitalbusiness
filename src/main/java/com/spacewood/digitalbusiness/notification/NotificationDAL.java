/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.notification;

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
public class NotificationDAL {
    public static final class Columns {

        public static final String ID = "id";
        public static final String NOTIFICATION = "notification";        
    }

    public static final String TABLE_NAME = "notification_master";

    private final SimpleJdbcInsert insertNotification;
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public NotificationDAL(DataSource dataSource) {
        jdbcTemplate = new JdbcTemplate(dataSource);
        insertNotification = new SimpleJdbcInsert(jdbcTemplate)
                .withTableName(TABLE_NAME)
                .usingColumns(
                        Columns.NOTIFICATION                        
                )
                .usingGeneratedKeyColumns(Columns.ID);
    }

    public List<Notification> findAll(Integer offset) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE ORDER BY " + Columns.ID + " DESC LIMIT 10 OFFSET ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{offset}, new BeanPropertyRowMapper<>(Notification.class));
    }
    
    public List<Notification> findAllList() {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE";
        return jdbcTemplate.query(sqlQuery, new Object[]{}, new BeanPropertyRowMapper<>(Notification.class));
    }

    public Notification findById(Integer id) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.ID + " = ?";
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{id}, new BeanPropertyRowMapper<>(Notification.class));
    }   
    
//    public Notification findByName(String name) {       
//        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.EMP_NAME + " = ?";        
//        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{name}, new BeanPropertyRowMapper<>(Employee.class));
//    }
//
//    public List<Employee> findByNameLike(String name) {
//        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND lower(emp_name) LIKE?";
//        String nameLike = "%" + name.toLowerCase() + "%";
//        return jdbcTemplate.query(sqlQuery, new Object[]{nameLike}, new BeanPropertyRowMapper<>(Employee.class));
//    }

    public Notification insert(Notification notification) {
        Map<String, Object> parameters = new HashMap<>();
        parameters.put(Columns.NOTIFICATION, notification.getNotification());
        Number newId = insertNotification.executeAndReturnKey(parameters);
        notification = findById(newId.intValue());
        return notification;
    }

    public void delete(Integer id) {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET deleted=? WHERE " + Columns.ID + "=?";
        jdbcTemplate.update(sqlQuery, new Object[]{true, id});
    }

    public Notification update(Notification notification) {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET "                
                + Columns.NOTIFICATION + " = ? WHERE " + Columns.ID + " = ?";
        Number updatedCount = jdbcTemplate.update(sqlQuery,
                new Object[]{                    
                    notification.getNotification(),
                    notification.getId()
                });
        notification = findById(notification.getId());
        return notification;
    }
}
