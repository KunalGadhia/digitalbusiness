/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.employee;

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
public class EmployeeDAL {
    public static final class Columns {

        public static final String ID = "id";
        public static final String EMP_CODE = "emp_code";
        public static final String EMP_NAME = "emp_name";
        public static final String EMP_MAILID = "emp_mailid";
        public static final String EMP_MOBILE_NUMBER = "emp_mobile_number";        
    }

    public static final String TABLE_NAME = "employee_master";

    private final SimpleJdbcInsert insertEmployee;
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public EmployeeDAL(DataSource dataSource) {
        jdbcTemplate = new JdbcTemplate(dataSource);
        insertEmployee = new SimpleJdbcInsert(jdbcTemplate)
                .withTableName(TABLE_NAME)
                .usingColumns(
                        Columns.EMP_CODE,
                        Columns.EMP_NAME,
                        Columns.EMP_MAILID,
                        Columns.EMP_MOBILE_NUMBER
                )
                .usingGeneratedKeyColumns(Columns.ID);
    }

    public List<Employee> findAll(Integer offset) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE ORDER BY " + Columns.ID + " DESC LIMIT 5 OFFSET ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{offset}, new BeanPropertyRowMapper<>(Employee.class));
    }

    public Employee findById(Integer id) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.ID + " = ?";
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{id}, new BeanPropertyRowMapper<>(Employee.class));
    }   
    
    public Employee findByName(String name) {       
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.EMP_NAME + " = ?";        
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{name}, new BeanPropertyRowMapper<>(Employee.class));
    }

    public List<Employee> findByNameLike(String name) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND lower(emp_name) LIKE?";
        String nameLike = "%" + name.toLowerCase() + "%";
        return jdbcTemplate.query(sqlQuery, new Object[]{nameLike}, new BeanPropertyRowMapper<>(Employee.class));
    }

    public Employee insert(Employee employee) {
        Map<String, Object> parameters = new HashMap<>();
        parameters.put(Columns.EMP_CODE, employee.getEmpCode());
        parameters.put(Columns.EMP_NAME, employee.getEmpName());
        parameters.put(Columns.EMP_MAILID, employee.getEmpMailid());
        parameters.put(Columns.EMP_MOBILE_NUMBER, employee.getEmpMobileNumber());
        
        Number newId = insertEmployee.executeAndReturnKey(parameters);
        employee = findById(newId.intValue());
        return employee;
    }

    public void delete(Integer id) {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET deleted=? WHERE " + Columns.ID + "=?";
        jdbcTemplate.update(sqlQuery, new Object[]{true, id});
    }

    public Employee update(Employee employee) {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET "
                + Columns.EMP_CODE + " = ?,"
                + Columns.EMP_NAME + " = ?, "
                + Columns.EMP_MAILID + " = ?,"
                + Columns.EMP_MOBILE_NUMBER + " = ? WHERE " + Columns.ID + " = ?";
        Number updatedCount = jdbcTemplate.update(sqlQuery,
                new Object[]{
                    employee.getEmpCode(),
                    employee.getEmpName(),
                    employee.getEmpMailid(),
                    employee.getEmpMobileNumber(),                    
                    employee.getId()
                });
        employee = findById(employee.getId());
        return employee;
    }
}
