/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.segment;

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
public class SegmentDAL {
    public static final class Columns {

        public static final String ID = "id";
        public static final String SEGMENT = "segment";
        public static final String SEGMENT_CODE = "segment_code";
        public static final String DESCRIPTION = "description";
        
    }

    public static final String TABLE_NAME = "segment_master";

    private final SimpleJdbcInsert insertSegment;
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public SegmentDAL(DataSource dataSource) {
        jdbcTemplate = new JdbcTemplate(dataSource);
        insertSegment = new SimpleJdbcInsert(jdbcTemplate)
                .withTableName(TABLE_NAME)
                .usingColumns(
                        Columns.SEGMENT,
                        Columns.SEGMENT_CODE,
                        Columns.DESCRIPTION
                )
                .usingGeneratedKeyColumns(Columns.ID);
    }

    public List<Segment> findAll(Integer offset) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE ORDER BY " + Columns.ID + " DESC LIMIT 10 OFFSET ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{offset}, new BeanPropertyRowMapper<>(Segment.class));
    }
    
    public List<Segment> findAllList() {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE";
        return jdbcTemplate.query(sqlQuery, new Object[]{}, new BeanPropertyRowMapper<>(Segment.class));
    }

    public Segment findById(Integer id) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.ID + " = ?";
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{id}, new BeanPropertyRowMapper<>(Segment.class));
    }   
    
    public Segment findBySegment(String segment) {       
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.SEGMENT_CODE + " = ?";        
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{segment}, new BeanPropertyRowMapper<>(Segment.class));
    }

    public List<Segment> findBySegmentLike(String segment) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND lower(segment) LIKE?";
        String nameLike = "%" + segment.toLowerCase() + "%";
        return jdbcTemplate.query(sqlQuery, new Object[]{nameLike}, new BeanPropertyRowMapper<>(Segment.class));
    }

    public Segment insert(Segment segment) {
        Map<String, Object> parameters = new HashMap<>();
        parameters.put(Columns.SEGMENT, segment.getSegment());
        parameters.put(Columns.SEGMENT_CODE, segment.getSegmentCode());
        parameters.put(Columns.DESCRIPTION, segment.getDescription());        
        
        Number newId = insertSegment.executeAndReturnKey(parameters);
        segment = findById(newId.intValue());
        return segment;
    }

    public void delete(Integer id) {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET deleted=? WHERE " + Columns.ID + "=?";
        jdbcTemplate.update(sqlQuery, new Object[]{true, id});
    }

    public Segment update(Segment segment) {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET "
                + Columns.SEGMENT + " = ?,"
                + Columns.SEGMENT_CODE + " = ?, "                
                + Columns.DESCRIPTION + " = ? WHERE " + Columns.ID + " = ?";
        Number updatedCount = jdbcTemplate.update(sqlQuery,
                new Object[]{
                    segment.getSegment(),
                    segment.getSegmentCode(),
                    segment.getDescription(),
                    segment.getId()
                });
        segment = findById(segment.getId());
        return segment;
    }
}
