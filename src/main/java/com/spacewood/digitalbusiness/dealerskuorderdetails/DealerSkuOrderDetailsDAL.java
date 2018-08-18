/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.dealerskuorderdetails;

;
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
 * @author swapnika
 */


@Repository
public class DealerSkuOrderDetailsDAL {

    public static final class Columns {

        public static final String ID = "id";
        public static final String ORDER_HEAD_ID = "order_head_id";
        public static final String PRODUCT_CODE = "product_code";
        public static final String MODULE_CODE = "module_code";
        public static final String MANUFACTURER = "manufacturer";
        public static final String MANUFACTURER_CATEGORY = "manufacturer_category";
        public static final String DESCRIPTION = "description";
        public static final String WIDTH = "width";
        public static final String DEPTH = "depth";
        public static final String HEIGHT = "height";
        public static final String COLOR = "color";
        public static final String QUANTITY = "quantity";        
        public static final String PRICE = "price";        
        public static final String REMARK = "remark";
        public static final String ORDER_FOR = "order_for";

    }

    public static final String TABLE_NAME = "dealer_sku_order_details";

    private final SimpleJdbcInsert insertDealerSkuOrderDetails;
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public DealerSkuOrderDetailsDAL(DataSource dataSource) {
        jdbcTemplate = new JdbcTemplate(dataSource);
        insertDealerSkuOrderDetails = new SimpleJdbcInsert(jdbcTemplate)
                .withTableName(TABLE_NAME)
                .usingColumns(                        
                        Columns.ORDER_HEAD_ID,
                        Columns.PRODUCT_CODE,
                        Columns.MODULE_CODE,
                        Columns.MANUFACTURER,
                        Columns.MANUFACTURER_CATEGORY,
                        Columns.DESCRIPTION,
                        Columns.WIDTH,
                        Columns.DEPTH,
                        Columns.HEIGHT,
                        Columns.COLOR,
                        Columns.QUANTITY,                        
                        Columns.PRICE,                        
                        Columns.REMARK,
                        Columns.ORDER_FOR
                )
                .usingGeneratedKeyColumns(Columns.ID);
    }

    public List<DealerSkuOrderDetails> findAll(Integer offset) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE ORDER BY " + Columns.ID + " DESC LIMIT 10 OFFSET ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{offset}, new BeanPropertyRowMapper<>(DealerSkuOrderDetails.class));
    }

    public List<DealerSkuOrderDetails> findAllList() {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE";
        return jdbcTemplate.query(sqlQuery, new Object[]{}, new BeanPropertyRowMapper<>(DealerSkuOrderDetails.class));
    }

    public DealerSkuOrderDetails findById(Integer id) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.ID + " = ?";
        return jdbcTemplate.queryForObject(sqlQuery, new Object[]{id}, new BeanPropertyRowMapper<>(DealerSkuOrderDetails.class));
    }

    public List<DealerSkuOrderDetails> findByProductCode(String productCode) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.PRODUCT_CODE + " = ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{productCode}, new BeanPropertyRowMapper<>(DealerSkuOrderDetails.class));
    }
    
    public List<DealerSkuOrderDetails> findByOrderHeadId(Integer orderHeadId) {
        String sqlQuery = "SELECT * FROM " + TABLE_NAME + " WHERE deleted = FALSE AND " + Columns.ORDER_HEAD_ID + " = ?";
        return jdbcTemplate.query(sqlQuery, new Object[]{orderHeadId}, new BeanPropertyRowMapper<>(DealerSkuOrderDetails.class));
    }

    public DealerSkuOrderDetails insert(DealerSkuOrderDetails dealerSkuOrderDetails) {
        Map<String, Object> parameters = new HashMap<>();
        parameters.put(Columns.ORDER_HEAD_ID, dealerSkuOrderDetails.getOrderHeadId());
        parameters.put(Columns.PRODUCT_CODE, dealerSkuOrderDetails.getProductCode());
        parameters.put(Columns.MODULE_CODE, dealerSkuOrderDetails.getModuleCode());
        parameters.put(Columns.MANUFACTURER, dealerSkuOrderDetails.getManufacturer());
        parameters.put(Columns.MANUFACTURER_CATEGORY, dealerSkuOrderDetails.getManufacturerCategory());
        parameters.put(Columns.DESCRIPTION, dealerSkuOrderDetails.getDescription());
        parameters.put(Columns.WIDTH, dealerSkuOrderDetails.getWidth());
        parameters.put(Columns.DEPTH, dealerSkuOrderDetails.getDepth());
        parameters.put(Columns.HEIGHT, dealerSkuOrderDetails.getHeight());
        parameters.put(Columns.COLOR, dealerSkuOrderDetails.getColor());
        parameters.put(Columns.QUANTITY, dealerSkuOrderDetails.getQuantity());        
        parameters.put(Columns.PRICE, dealerSkuOrderDetails.getPrice());        
        parameters.put(Columns.REMARK, dealerSkuOrderDetails.getRemark());
        parameters.put(Columns.ORDER_FOR, dealerSkuOrderDetails.getOrderFor());

        Number newId = insertDealerSkuOrderDetails.executeAndReturnKey(parameters);
        dealerSkuOrderDetails = findById(newId.intValue());
        return dealerSkuOrderDetails;
    }

    public void delete(Integer id) {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET deleted=? WHERE " + Columns.ID + "=?";
        jdbcTemplate.update(sqlQuery, new Object[]{true, id});
    }

    public DealerSkuOrderDetails update(DealerSkuOrderDetails dealerSkuOrderDetails) {
        String sqlQuery = "UPDATE " + TABLE_NAME + " SET "
                + Columns.PRODUCT_CODE + " = ?, "
                + Columns.MODULE_CODE + " = ?, "
                + Columns.MANUFACTURER + " = ?, "
                + Columns.MANUFACTURER_CATEGORY + " = ?, "
                + Columns.DESCRIPTION + " = ?, "
                + Columns.WIDTH + " = ?, "
                + Columns.DEPTH + " = ?, "
                + Columns.HEIGHT + " = ?, "
                + Columns.PRICE + " = ?, "
                + Columns.QUANTITY + " = ?, "
                + Columns.COLOR + " = ?, "
                + Columns.REMARK + " = ?, "
                + Columns.ORDER_FOR + " WHERE " + Columns.ID + " = ?";
        Number updatedCount = jdbcTemplate.update(sqlQuery,
                new Object[]{
                    dealerSkuOrderDetails.getProductCode(),
                    dealerSkuOrderDetails.getModuleCode(),
                    dealerSkuOrderDetails.getManufacturer(),
                    dealerSkuOrderDetails.getManufacturerCategory(),
                    dealerSkuOrderDetails.getDescription(),
                    dealerSkuOrderDetails.getWidth(),
                    dealerSkuOrderDetails.getDepth(),
                    dealerSkuOrderDetails.getHeight(),
                    dealerSkuOrderDetails.getPrice(),
                    dealerSkuOrderDetails.getQuantity(),
                    dealerSkuOrderDetails.getColor(),
                    dealerSkuOrderDetails.getRemark(),
                    dealerSkuOrderDetails.getOrderFor(),
                    dealerSkuOrderDetails.getId()
                });
        dealerSkuOrderDetails = findById(dealerSkuOrderDetails.getId());
        return dealerSkuOrderDetails;
    }

}
