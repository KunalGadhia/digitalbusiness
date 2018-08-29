/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.dealersku;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.sql.SQLException;
import java.util.List;
import javax.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author webdesign
 */
@RestController
@RequestMapping("/dealer_sku")
public class DealerSkuRest {

    private final Logger logger = LoggerFactory.getLogger(getClass());

    @Autowired
    private DealerSkuDAL dealerSkuDAL;

    @Autowired
    private DealerSkuService dealerSkuService;

    @RequestMapping(method = RequestMethod.GET)
    public List<DealerSku> findAll(@RequestParam(value = "offset", required = false, defaultValue = "0") Integer offset) throws SQLException {
        return dealerSkuDAL.findAll(offset);
    }
    
    @RequestMapping(value = "/find/creator",method = RequestMethod.GET)
    public List<DealerSku> findByCreator(@RequestParam(value = "offset", required = false, defaultValue = "0") Integer offset, @RequestParam(value="userId") Integer userId) throws SQLException {
        return dealerSkuDAL.findByCreator(offset, userId);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public DealerSku findById(@PathVariable("id") Integer id) throws SQLException {
        return dealerSkuDAL.findById(id);
    }

    @RequestMapping(method = RequestMethod.POST)
    public DealerSku insert(@RequestBody DealerSku dealerSku) {
        return dealerSkuDAL.insert(dealerSku);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.POST)
    public DealerSku update(@RequestBody DealerSku dealerSku) {
        return dealerSkuDAL.update(dealerSku);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable("id") Integer id) throws Exception {
        dealerSkuDAL.delete(id);
    }

    @RequestMapping(value = "/find/manufacturer_code", method = RequestMethod.GET)
    public List<DealerSku> findByManufacturerCode(@RequestParam("manufacturerCode") String manufacturerCode) throws Exception {
        return dealerSkuDAL.findByManufacturerCode(manufacturerCode);
    }

    @RequestMapping(value = "/find/manufacturer/manufacturer_category/user", method = RequestMethod.GET)
    public List<DealerSku> findByManufacturerManufacturerCategoryUser(@RequestParam("manufacturer") String manufacturer, @RequestParam("manufacturerCategory") String manufacturerCategory, @RequestParam("createdBy") Integer createdBy) throws Exception {
        return dealerSkuDAL.findByManufacturerManufacturerCategoryUser(manufacturer, manufacturerCategory, createdBy);
    }

    @RequestMapping(value = "/find/category_code", method = RequestMethod.GET)
    public List<DealerSku> findByCategoryCode(@RequestParam("categoryCode") String categoryCode) throws Exception {
        return dealerSkuDAL.findByCategoryCode(categoryCode);
    }

    @RequestMapping(value = "/find/product_code", method = RequestMethod.GET)
    public List<DealerSku> findByProductCode(@RequestParam("productCode") String productCode) throws Exception {
        return dealerSkuDAL.findByProductCode(productCode);
    }

    @RequestMapping(value = "/find/description/like", method = RequestMethod.GET)
    public List<DealerSku> findByDescriptionLike(@RequestParam("description") String description) throws Exception {
        return dealerSkuDAL.findByDescriptionLike(description);
    }

    @RequestMapping(value = "/find/description/filter", method = RequestMethod.GET)
    public List<DealerSku> findByDescriptionFilter(@RequestParam("categoryCode") String categoryCode, @RequestParam("manufacturerCode") String manufacturerCode) throws Exception {
        return dealerSkuDAL.findByDescriptionFilter(categoryCode, manufacturerCode);
    }

    @RequestMapping(value = "/find_all_list", method = RequestMethod.GET)
    public List<DealerSku> findAllList() {
        return dealerSkuDAL.findAllList();
    }

    @RequestMapping(value = "/{id}/attachment", method = RequestMethod.POST)
    public DealerSku uploadAttachment(
            @PathVariable Integer id,
            @RequestParam MultipartFile attachment
    ) throws IOException {
        System.out.println("MULTIPART ATTACHMENT LOGGER+++++++++++++++++" + attachment.getName());
        return dealerSkuService.insertAttachments(id, attachment);
    }

    @RequestMapping(value = "/{id}/attachment", method = RequestMethod.GET)
    public void getAttachment(@PathVariable Integer id, HttpServletResponse response) throws IOException {
        File photoFile = dealerSkuService.getPhoto(id);
        response.setContentType(Files.probeContentType(Paths.get(photoFile.getAbsolutePath())));
        response.setContentLengthLong(photoFile.length());
        logger.debug("filename: {}, size: {}", photoFile.getAbsoluteFile(), photoFile.length());
        FileCopyUtils.copy(new FileInputStream(photoFile), response.getOutputStream());
    }
}
