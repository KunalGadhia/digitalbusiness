/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.maxwardrobemrp;

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
 * @author User
 */
@RestController
@RequestMapping("/max_wardrobe_mrp")
public class MaxWardrobeMrpRest {
    
    private final Logger logger = LoggerFactory.getLogger(getClass());
    
    @Autowired
    private MaxWardrobeMrpDAL maxWardrobeMrpDAL;
    
    @Autowired
    private MaxWardrobeMrpService maxWardrobeMrpService;
    
    @RequestMapping(method = RequestMethod.GET)
    public List<MaxWardrobeMrp> findAll(@RequestParam(value = "offset", required = false, defaultValue = "0") Integer offset) throws SQLException {
        return maxWardrobeMrpDAL.findAll(offset);
    }
    
    @RequestMapping(value="/find/category", method = RequestMethod.GET)
    public List<MaxWardrobeMrp> findByCategory(@RequestParam("category") String category) throws SQLException {
        return maxWardrobeMrpDAL.findByCategory(category);
    }
    
    @RequestMapping(value="/find/category/dimensions", method = RequestMethod.GET)
    public List<MaxWardrobeMrp> findByCategoryDimensions(@RequestParam("category") String category, @RequestParam("width") Double width, @RequestParam("depth") Double depth, @RequestParam("height") Double height) throws SQLException {
        return maxWardrobeMrpDAL.findByCategoryDimensions(category, width, depth, height);
    }
    
    @RequestMapping(value = "/find/distinct/width", method = RequestMethod.GET)
    public List<Double> findDistinctWidth(String category) throws Exception {
        return maxWardrobeMrpDAL.findDistinctWidth(category);
    }
    
    @RequestMapping(value = "/find/distinct/depth", method = RequestMethod.GET)
    public List<Double> findDistinctDepth(String category) throws Exception {
        return maxWardrobeMrpDAL.findDistinctDepth(category);
    }
    
    @RequestMapping(value = "/find/distinct/height", method = RequestMethod.GET)
    public List<Double> findDistinctHeight(String category) throws Exception {
        return maxWardrobeMrpDAL.findDistinctHeight(category);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public MaxWardrobeMrp findById(@PathVariable("id") Integer id) throws SQLException {
        return maxWardrobeMrpDAL.findById(id);
    }
    
    @RequestMapping(method = RequestMethod.POST)
    public MaxWardrobeMrp insert(@RequestBody MaxWardrobeMrp maxWardrobeMrp) {
        return maxWardrobeMrpDAL.insert(maxWardrobeMrp);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.POST)
    public MaxWardrobeMrp update(@RequestBody MaxWardrobeMrp maxWardrobeMrp) {
        return maxWardrobeMrpDAL.update(maxWardrobeMrp);
    }

//    @RolesAllowed("ROLE_SUPER_ADMIN")
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable("id") Integer id) throws Exception {
        maxWardrobeMrpDAL.delete(id);
    }

    @RequestMapping(value = "/find/description", method = RequestMethod.GET)
    public MaxWardrobeMrp findByDescription(@RequestParam("description") String description) throws Exception {
        return maxWardrobeMrpDAL.findByDescription(description);
    }
    
    @RequestMapping(value = "/find/description_like", method = RequestMethod.GET)
    public List<MaxWardrobeMrp> findByDescriptionLike(@RequestParam("description") String description) {
        return maxWardrobeMrpDAL.findByDescriptionLike(description);
    }
    
    @RequestMapping(value = "/{id}/attachment", method = RequestMethod.POST)
    public MaxWardrobeMrp uploadAttachment(
            @PathVariable Integer id,
            @RequestParam MultipartFile attachment
    ) throws IOException {
        System.out.println("MULTIPART ATTACHMENT LOGGER+++++++++++++++++" + attachment.getName());
        return maxWardrobeMrpService.insertAttachments(id, attachment);
    }

    @RequestMapping(value = "/{id}/attachment", method = RequestMethod.GET)
    public void getAttachment(@PathVariable Integer id, HttpServletResponse response) throws IOException {
        File photoFile = maxWardrobeMrpService.getPhoto(id);
        response.setContentType(Files.probeContentType(Paths.get(photoFile.getAbsolutePath())));
        response.setContentLengthLong(photoFile.length());
        logger.debug("filename: {}, size: {}", photoFile.getAbsoluteFile(), photoFile.length());
        FileCopyUtils.copy(new FileInputStream(photoFile), response.getOutputStream());
    }
}
