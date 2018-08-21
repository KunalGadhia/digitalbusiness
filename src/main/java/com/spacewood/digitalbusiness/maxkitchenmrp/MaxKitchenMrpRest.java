/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.maxkitchenmrp;

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
@RequestMapping("/max_kitchen_mrp")
public class MaxKitchenMrpRest {
    
    private final Logger logger = LoggerFactory.getLogger(getClass());
    
    @Autowired
    private MaxKitchenMrpDAL maxKitchenMrpDAL;
    
    @Autowired
    private MaxKitchenMrpService maxKitchenMrpService;
    
    @RequestMapping(method = RequestMethod.GET)
    public List<MaxKitchenMrp> findAll(@RequestParam(value = "offset", required = false, defaultValue = "0") Integer offset) throws SQLException {
        return maxKitchenMrpDAL.findAll(offset);
    }
    
    @RequestMapping(value="/find/category", method = RequestMethod.GET)
    public List<MaxKitchenMrp> findByCategory(@RequestParam("category") String category) throws SQLException {
        return maxKitchenMrpDAL.findByCategory(category);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public MaxKitchenMrp findById(@PathVariable("id") Integer id) throws SQLException {
        return maxKitchenMrpDAL.findById(id);
    }
    
    @RequestMapping(method = RequestMethod.POST)
    public MaxKitchenMrp insert(@RequestBody MaxKitchenMrp maxKitchenMrp) {
        return maxKitchenMrpDAL.insert(maxKitchenMrp);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.POST)
    public MaxKitchenMrp update(@RequestBody MaxKitchenMrp maxKitchenMrp) {
        return maxKitchenMrpDAL.update(maxKitchenMrp);
    }

//    @RolesAllowed("ROLE_SUPER_ADMIN")
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable("id") Integer id) throws Exception {
        maxKitchenMrpDAL.delete(id);
    }

    @RequestMapping(value = "/find/description", method = RequestMethod.GET)
    public MaxKitchenMrp findByDescription(@RequestParam("description") String description) throws Exception {
        return maxKitchenMrpDAL.findByDescription(description);
    }
    
    @RequestMapping(value = "/find/description_like", method = RequestMethod.GET)
    public List<MaxKitchenMrp> findByDescriptionLike(@RequestParam("description") String description) {
        return maxKitchenMrpDAL.findByDescriptionLike(description);
    }
    
    @RequestMapping(value = "/{id}/attachment", method = RequestMethod.POST)
    public MaxKitchenMrp uploadAttachment(
            @PathVariable Integer id,
            @RequestParam MultipartFile attachment
    ) throws IOException {
        System.out.println("MULTIPART ATTACHMENT LOGGER+++++++++++++++++" + attachment.getName());
        return maxKitchenMrpService.insertAttachments(id, attachment);
    }

    @RequestMapping(value = "/{id}/attachment", method = RequestMethod.GET)
    public void getAttachment(@PathVariable Integer id, HttpServletResponse response) throws IOException {
        File photoFile = maxKitchenMrpService.getPhoto(id);
        response.setContentType(Files.probeContentType(Paths.get(photoFile.getAbsolutePath())));
        response.setContentLengthLong(photoFile.length());
        logger.debug("filename: {}, size: {}", photoFile.getAbsoluteFile(), photoFile.length());
        FileCopyUtils.copy(new FileInputStream(photoFile), response.getOutputStream());
    }
}
