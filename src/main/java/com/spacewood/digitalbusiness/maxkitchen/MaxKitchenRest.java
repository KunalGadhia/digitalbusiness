/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.maxkitchen;

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
 * @author user
 */
@RestController
@RequestMapping("/max_kitchen")
public class MaxKitchenRest {
    
    private final Logger logger = LoggerFactory.getLogger(getClass());
    
    @Autowired
    private MaxKitchenDAL maxKitchenDAL;
    
    @Autowired
    private MaxKitchenService maxKitchenService;
    
    @RequestMapping(method = RequestMethod.GET)
    public List<MaxKitchen> findAll(@RequestParam(value = "offset", required = false, defaultValue = "0") Integer offset) throws SQLException {
        return maxKitchenDAL.findAll(offset);
    }
    
    @RequestMapping(value="/find/category", method = RequestMethod.GET)
    public List<MaxKitchen> findByCategory(@RequestParam("category") String category) throws SQLException {
        return maxKitchenDAL.findByCategory(category);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public MaxKitchen findById(@PathVariable("id") Integer id) throws SQLException {
        return maxKitchenDAL.findById(id);
    }
    
    @RequestMapping(method = RequestMethod.POST)
    public MaxKitchen insert(@RequestBody MaxKitchen maxKitchen) {
        return maxKitchenDAL.insert(maxKitchen);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.POST)
    public MaxKitchen update(@RequestBody MaxKitchen maxKitchen) {
        return maxKitchenDAL.update(maxKitchen);
    }

//    @RolesAllowed("ROLE_SUPER_ADMIN")
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable("id") Integer id) throws Exception {
        maxKitchenDAL.delete(id);
    }

    @RequestMapping(value = "/find/description", method = RequestMethod.GET)
    public MaxKitchen findByDescription(@RequestParam("description") String description) throws Exception {
        return maxKitchenDAL.findByDescription(description);
    }
    
    @RequestMapping(value = "/find/description_like", method = RequestMethod.GET)
    public List<MaxKitchen> findByDescriptionLike(@RequestParam("description") String description) {
        return maxKitchenDAL.findByDescriptionLike(description);
    }
    
    @RequestMapping(value = "/{id}/attachment", method = RequestMethod.POST)
    public MaxKitchen uploadAttachment(
            @PathVariable Integer id,
            @RequestParam MultipartFile attachment
    ) throws IOException {
        System.out.println("MULTIPART ATTACHMENT LOGGER+++++++++++++++++" + attachment.getName());
        return maxKitchenService.insertAttachments(id, attachment);
    }

    @RequestMapping(value = "/{id}/attachment", method = RequestMethod.GET)
    public void getAttachment(@PathVariable Integer id, HttpServletResponse response) throws IOException {
        File photoFile = maxKitchenService.getPhoto(id);
        response.setContentType(Files.probeContentType(Paths.get(photoFile.getAbsolutePath())));
        response.setContentLengthLong(photoFile.length());
        logger.debug("filename: {}, size: {}", photoFile.getAbsoluteFile(), photoFile.length());
        FileCopyUtils.copy(new FileInputStream(photoFile), response.getOutputStream());
    }
}
