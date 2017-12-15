/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.user;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.spacewood.digitalbusiness.colorconstraint.ConstraintItem;
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
 * @author hp-pc
 */
@Repository
public class UserDAL {

    public static final class Columns {

        public static final String ID = "id";
        public static final String USERNAME = "username";
        public static final String PASSWORD = "password";
        public static final String ROLE = "role";
        public static final String NAME = "name";
        public static final String NAME_OF_COMPANY = "name_of_company";
        public static final String ADDRESS = "address";
        public static final String MOBILE_NO = "mobile_no";        
        public static final String PARTIES = "parties";
        public static final String APPROVED = "approved";
    }

    public static final String TABLE_NAME = "user";

    private final SimpleJdbcInsert insertUser;
    private final JdbcTemplate jdbcTemplate;
    private static final ObjectMapper mapper = new ObjectMapper();

    @Autowired
    public UserDAL(DataSource dataSource) {
        jdbcTemplate = new JdbcTemplate(dataSource);
        insertUser = new SimpleJdbcInsert(jdbcTemplate)
                .withTableName(TABLE_NAME)
                .usingColumns(
                        Columns.USERNAME,
                        Columns.PASSWORD,
                        Columns.ROLE,
                        Columns.NAME,
                        Columns.NAME_OF_COMPANY,
                        Columns.ADDRESS,
                        Columns.MOBILE_NO,                        
                        Columns.PARTIES,
                        Columns.APPROVED
                )
                .usingGeneratedKeyColumns(Columns.ID);
    }

    public List<User> findAll(Integer offset) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE ORDER BY " + Columns.ID + " DESC LIMIT 10 OFFSET ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{offset}, userRowMapper);
    }

    public List<User> findUnapprovedUser() {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND approved = FALSE ";
        return jdbcTemplate.query(sqlQuery, new Object[]{}, userRowMapper);
    }

    public Integer countUnapprovedUser() {
        String sqlQuery = "SELECT count(*) FROM " + TABLE_NAME + " WHERE deleted = FALSE AND approved = FALSE ";
        return jdbcTemplate.queryForInt(sqlQuery);
    }

    public User findById(Integer id) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.ID + " = ?";
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{id}, userRowMapper);
    }

    public User findByUsername(String username) {
        System.out.println("Inside DAL with String :" + username);
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.USERNAME + " = ?";
        System.out.println("SQL String :" + sqlQuery);
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{username}, userRowMapper);
    }

    public List<User> findByNameLike(String username) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND lower(username) LIKE?";
        String userNameLike = "%" + username.toLowerCase() + "%";
        return jdbcTemplate.query(sqlQuery, new Object[]{userNameLike}, userRowMapper);
    }

    public User insert(User user) throws JsonProcessingException {
        Map<String, Object> parameters = new HashMap<>();
        parameters.put(Columns.USERNAME, user.getUsername());
        parameters.put(Columns.PASSWORD, user.getPassword());
        parameters.put(Columns.ROLE, user.getRole().name());
        parameters.put(Columns.NAME, user.getName());
        parameters.put(Columns.NAME_OF_COMPANY, user.getNameOfCompany());
        parameters.put(Columns.ADDRESS, user.getAddress());
        parameters.put(Columns.MOBILE_NO, user.getMobileNo());
        parameters.put(Columns.PARTIES, user.getParties() == null ? "[]" : mapper.writeValueAsString(user.getParties()));
        parameters.put(Columns.APPROVED, 1);
        Number newId = insertUser.executeAndReturnKey(parameters);
        user = findById(newId.intValue());
        return user;
    }

    public void delete(Integer id) {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET deleted=? WHERE " + Columns.ID + "=?";
        jdbcTemplate.update(sqlQuery, new Object[]{true, id});
    }

    public User update(User user) throws JsonProcessingException {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET "
                + Columns.USERNAME + " = ?,"
                + Columns.PASSWORD + " = ?, "
                + Columns.ROLE + " = ?,"
                + Columns.NAME + " = ?, "
                + Columns.NAME_OF_COMPANY + " = ?,"
                + Columns.ADDRESS + " = ?, "
                + Columns.MOBILE_NO + " = ?,"
                + Columns.PARTIES + " = ?,"
                + Columns.APPROVED + " = ? WHERE " + Columns.ID + " = ?";
        Number updatedCount = jdbcTemplate.update(sqlQuery,
                new Object[]{
                    user.getUsername(),
                    user.getPassword(),
                    user.getRole().name(),
                    user.getName(),
                    user.getNameOfCompany(),
                    user.getAddress(),
                    user.getMobileNo(),
                    user.getParties() == null ? "[]" : mapper.writeValueAsString(user.getParties()),
                    user.getApproved(),
                    user.getId()
                });
        user = findById(user.getId());
        return user;
    }
    
    private final RowMapper<User> userRowMapper = new RowMapper<User>() {

        @Override
        public User mapRow(ResultSet rs, int i) throws SQLException {
            User userConstraint = new User();
            userConstraint.setId(rs.getInt(Columns.ID));
            userConstraint.setUsername(rs.getString(Columns.USERNAME));
            userConstraint.setPassword(rs.getString(Columns.PASSWORD));
            if (rs.getString(Columns.ROLE) != null) {
                userConstraint.setRole(Role.valueOf(rs.getString(Columns.ROLE)));
            }
            userConstraint.setName(rs.getString(Columns.NAME));
            userConstraint.setNameOfCompany(rs.getString(Columns.NAME_OF_COMPANY));
            userConstraint.setAddress(rs.getString(Columns.ADDRESS));
            userConstraint.setMobileNo(rs.getString(Columns.MOBILE_NO));            

            String partiesList = rs.getString(Columns.PARTIES);
            try {
                ObjectMapper mapper = new ObjectMapper();
                List<Integer> parties = mapper.readValue(partiesList, new TypeReference<List<Integer>>() {
                });
                userConstraint.setParties(parties);
            } catch (IOException ex) {
                throw new RuntimeException("Error parsing colorsList: '" + partiesList + "' ", ex);
            }
            userConstraint.setApproved(rs.getBoolean(Columns.APPROVED));
            return userConstraint;
        }

    };

}
