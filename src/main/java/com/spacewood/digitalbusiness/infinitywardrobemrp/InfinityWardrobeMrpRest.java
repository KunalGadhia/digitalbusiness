/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.infinitywardrobemrp;

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
@RequestMapping("/infinity_wardrobe_mrp")
public class InfinityWardrobeMrpRest {
    public final Logger logger = LoggerFactory.getLogger(getClass());
    @Autowired
    private InfinityWardrobeMrpDAL infinityWardrobeMrpDAL;
    
    @Autowired
    private InfinityWardrobeMrpService infinityWardrobeMrpService;
    
    @RequestMapping(method = RequestMethod.GET)
    public List<InfinityWardrobeMrp> findAll(@RequestParam(value = "offset", required = false, defaultValue = "0") Integer offset) throws SQLException {
        return infinityWardrobeMrpDAL.findAll(offset);
    }
    
    @RequestMapping(value="/find/category", method = RequestMethod.GET)
    public List<InfinityWardrobeMrp> findByCategory(@RequestParam("category") String category) throws SQLException {
        return infinityWardrobeMrpDAL.findByCategory(category);
    }
    
    @RequestMapping(value="/find/category/dimensions", method = RequestMethod.GET)
    public List<InfinityWardrobeMrp> findByCategoryDimensions(@RequestParam("category") String category, @RequestParam("width") Double width, @RequestParam("depth") Double depth, @RequestParam("height") Double height) throws SQLException {
        return infinityWardrobeMrpDAL.findByCategoryDimensions(category, width, depth, height);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public InfinityWardrobeMrp findById(@PathVariable("id") Integer id) throws SQLException {
        return infinityWardrobeMrpDAL.findById(id);
    }
    
    @RequestMapping(method = RequestMethod.POST)
    public InfinityWardrobeMrp insert(@RequestBody InfinityWardrobeMrp infinityWardrobeMrp) {
        return infinityWardrobeMrpDAL.insert(infinityWardrobeMrp);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.POST)
    public InfinityWardrobeMrp update(@RequestBody InfinityWardrobeMrp infinityWardrobeMrp) {
        return infinityWardrobeMrpDAL.update(infinityWardrobeMrp);
    }

//    @RolesAllowed("ROLE_SUPER_ADMIN")
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable("id") Integer id) throws Exception {
        infinityWardrobeMrpDAL.delete(id);
    }
    
    @RequestMapping(value = "/find/distinct/width", method = RequestMethod.GET)
    public List<Double> findDistinctWidth(String category) throws Exception {
        return infinityWardrobeMrpDAL.findDistinctWidth(category);
    }
    
    @RequestMapping(value = "/find/distinct/depth", method = RequestMethod.GET)
    public List<Double> findDistinctDepth(String category) throws Exception {
        return infinityWardrobeMrpDAL.findDistinctDepth(category);
    }
    
    @RequestMapping(value = "/find/distinct/height", method = RequestMethod.GET)
    public List<Double> findDistinctHeight(String category) throws Exception {
        return infinityWardrobeMrpDAL.findDistinctHeight(category);
    }

    @RequestMapping(value = "/find/description", method = RequestMethod.GET)
    public InfinityWardrobeMrp findByDescription(@RequestParam("description") String description) throws Exception {
        return infinityWardrobeMrpDAL.findByDescription(description);
    }
    
    @RequestMapping(value = "/find/description_like", method = RequestMethod.GET)
    public List<InfinityWardrobeMrp> findByDescriptionLike(@RequestParam("description") String description) {
        return infinityWardrobeMrpDAL.findByDescriptionLike(description);
    }
    
    @RequestMapping(value = "/{id}/attachment", method = RequestMethod.POST)
    public InfinityWardrobeMrp uploadAttachment(
            @PathVariable Integer id,
            @RequestParam MultipartFile attachment
    ) throws IOException {
        System.out.println("MULTIPART ATTACHMENT LOGGER+++++++++++++++++" + attachment.getName());
        return infinityWardrobeMrpService.insertAttachments(id, attachment);
    }

    @RequestMapping(value = "/{id}/attachment", method = RequestMethod.GET)
    public void getAttachment(@PathVariable Integer id, HttpServletResponse response) throws IOException {
        File photoFile = infinityWardrobeMrpService.getPhoto(id);
        response.setContentType(Files.probeContentType(Paths.get(photoFile.getAbsolutePath())));
        response.setContentLengthLong(photoFile.length());
        logger.debug("filename: {}, size: {}", photoFile.getAbsoluteFile(), photoFile.length());
        FileCopyUtils.copy(new FileInputStream(photoFile), response.getOutputStream());
    }
}
