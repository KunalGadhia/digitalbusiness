/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.party;

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
public class PartyDAL {
   
    public static final class Columns {

        public static final String ID = "id";
        public static final String DEALER_CODE = "dealer_code";
        public static final String DEALER_NAME = "dealer_name";
        public static final String GL_CODE = "gl_code";
        public static final String CONTACT_PERSON = "contact_person";
        public static final String BILLING_ADD1 = "billing_add1";
        public static final String BILLING_ADD2 = "billing_add2";
        public static final String BILLING_ADD3 = "billing_add3";
        public static final String BILLING_ADD4 = "billing_add4";
        public static final String BILLING_EMAIL = "billing_email";
        public static final String CITY = "city";
        public static final String BILLING_FAX = "billing_fax";
        public static final String BILL_BOARD_TEL = "bill_board_tel";
        public static final String DIRECT_TEL_NO = "direct_tel_no";
        public static final String PAN_NUMBER = "pan_number";
//        public static final String CST_NUMBER = "cst_number";
        public static final String GST_NUMBER = "gst_number";
        public static final String STATE = "state";
        
    }

    public static final String TABLE_NAME = "party_master";

    private final SimpleJdbcInsert insertParty;
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public PartyDAL(DataSource dataSource) {
        jdbcTemplate = new JdbcTemplate(dataSource);
        insertParty = new SimpleJdbcInsert(jdbcTemplate)
                .withTableName(TABLE_NAME)
                .usingColumns(
                        Columns.DEALER_CODE,
                        Columns.DEALER_NAME,
                        Columns.GL_CODE,
                        Columns.CONTACT_PERSON,
                        Columns.BILLING_ADD1,
                        Columns.BILLING_ADD2,
                        Columns.BILLING_ADD3,
                        Columns.BILLING_ADD4,
                        Columns.BILLING_EMAIL,
                        Columns.CITY,
                        Columns.BILLING_FAX,
                        Columns.BILL_BOARD_TEL,
                        Columns.DIRECT_TEL_NO,
                        Columns.PAN_NUMBER,                        
                        Columns.GST_NUMBER,
                        Columns.STATE
                )
                .usingGeneratedKeyColumns(Columns.ID);
    }

    public List<Party> findAll(Integer offset) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE ORDER BY " + Columns.ID + " DESC LIMIT 10 OFFSET ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{offset}, new BeanPropertyRowMapper<>(Party.class));
    }

    public Party findById(Integer id) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.ID + " = ?";
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{id}, new BeanPropertyRowMapper<>(Party.class));
    }   
    
    public Party findByName(String name) {       
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.DEALER_NAME + " = ?";        
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{name}, new BeanPropertyRowMapper<>(Party.class));
    }

    public List<Party> findByNameLike(String name) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND lower(dealer_name) LIKE?";
        String nameLike = "%" + name.toLowerCase() + "%";
        return jdbcTemplate.query(sqlQuery, new Object[]{nameLike}, new BeanPropertyRowMapper<>(Party.class));
    }

    public Party insert(Party party) {
        Map<String, Object> parameters = new HashMap<>();
        parameters.put(Columns.DEALER_CODE, party.getDealerCode());
        parameters.put(Columns.DEALER_NAME, party.getDealerName());
        parameters.put(Columns.GL_CODE, party.getGlCode());
        parameters.put(Columns.CONTACT_PERSON, party.getContactPerson());
        parameters.put(Columns.BILLING_ADD1, party.getBillingAdd1());
        parameters.put(Columns.BILLING_ADD2, party.getBillingAdd2());
        parameters.put(Columns.BILLING_ADD3, party.getBillingAdd3());
        parameters.put(Columns.BILLING_ADD4, party.getBillingAdd4());
        parameters.put(Columns.BILLING_EMAIL, party.getBillingEmail());
        parameters.put(Columns.CITY, party.getCity());
        parameters.put(Columns.BILLING_FAX, party.getBillingFax());
        parameters.put(Columns.BILL_BOARD_TEL, party.getBillBoardTel());
        parameters.put(Columns.DIRECT_TEL_NO, party.getDirectTelNo());
        parameters.put(Columns.PAN_NUMBER, party.getPanNumber());
//        parameters.put(Columns.CST_NUMBER, party.getCstNumber());
        parameters.put(Columns.GST_NUMBER, party.getGstNumber());
        parameters.put(Columns.STATE, party.getState());
        
        Number newId = insertParty.executeAndReturnKey(parameters);
        party = findById(newId.intValue());
        return party;
    }

    public void delete(Integer id) {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET deleted=? WHERE " + Columns.ID + "=?";
        jdbcTemplate.update(sqlQuery, new Object[]{true, id});
    }

    public Party update(Party party) {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET "
                + Columns.DEALER_CODE + " = ?,"
                + Columns.DEALER_NAME + " = ?, "
                + Columns.GL_CODE + " = ?,"
                + Columns.CONTACT_PERSON + " = ?,"
                + Columns.BILLING_ADD1 + " = ?,"
                + Columns.BILLING_ADD2 + " = ?,"
                + Columns.BILLING_ADD3 + " = ?,"
                + Columns.BILLING_ADD4 + " = ?,"
                + Columns.BILLING_EMAIL + " = ?,"
                + Columns.CITY + " = ?,"
                + Columns.BILLING_FAX + " = ?,"
                + Columns.BILL_BOARD_TEL + " = ?,"
                + Columns.DIRECT_TEL_NO + " = ?,"
                + Columns.PAN_NUMBER + " = ?,"
                + Columns.GST_NUMBER + " = ?,"
//                + Columns.CST_NUMBER + " = ?,"
                + Columns.STATE + " = ? WHERE " + Columns.ID + " = ?";
        Number updatedCount = jdbcTemplate.update(sqlQuery,
                new Object[]{
                    party.getDealerCode(),
                    party.getDealerName(),
                    party.getGlCode(),
                    party.getContactPerson(),
                    party.getBillingAdd1(),
                    party.getBillingAdd2(),
                    party.getBillingAdd3(),
                    party.getBillingAdd4(),
                    party.getBillingEmail(),
                    party.getCity(),
                    party.getBillingFax(),
                    party.getBillBoardTel(),
                    party.getDirectTelNo(),
                    party.getPanNumber(),
//                    party.getCstNumber(),
                    party.getGstNumber(),
                    party.getState(),
                    party.getId()
                });
        party = findById(party.getId());
        return party;
    }
    
}
