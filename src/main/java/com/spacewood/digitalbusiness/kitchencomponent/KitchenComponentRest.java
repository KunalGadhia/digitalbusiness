/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.kitchencomponent;

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
@RequestMapping("/kitchen_component")
public class KitchenComponentRest {
    
    private final Logger logger = LoggerFactory.getLogger(getClass());
    @Autowired
    private KitchenComponentDAL kitchenComponentDAL;
    
    @Autowired
    private KitchenComponentService kitchenComponentService;
    
    @RequestMapping(method = RequestMethod.GET)
    public List<KitchenComponent> findAll(@RequestParam(value = "offset", required = false, defaultValue = "0") Integer offset) throws SQLException {
        return kitchenComponentDAL.findAll(offset);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public KitchenComponent findById(@PathVariable("id") Integer id) throws SQLException {
        return kitchenComponentDAL.findById(id);
    }
    
    @RequestMapping(method = RequestMethod.POST)
    public KitchenComponent insert(@RequestBody KitchenComponent kitchenComponent) {
        return kitchenComponentDAL.insert(kitchenComponent);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.POST)
    public KitchenComponent update(@RequestBody KitchenComponent kitchenComponent) {
        return kitchenComponentDAL.update(kitchenComponent);
    }

//    @RolesAllowed("ROLE_SUPER_ADMIN")
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable("id") Integer id) throws Exception {
        kitchenComponentDAL.delete(id);
    }
    
    @RequestMapping(value = "/find/component", method = RequestMethod.GET)
    public KitchenComponent findByComponent(@RequestParam("component") String component) throws Exception {
        return kitchenComponentDAL.findByComponent(component);
    }
    
    @RequestMapping(value = "/find/component_code", method = RequestMethod.GET)
    public KitchenComponent findByComponentCode(@RequestParam("componentCode") String componentCode) throws Exception {
        return kitchenComponentDAL.findByComponentCode(componentCode);
    }
    
    @RequestMapping(value = "/find/component_like", method = RequestMethod.GET)
    public List<KitchenComponent> findByComponentLike(@RequestParam("component") String component) {
        return kitchenComponentDAL.findByComponentLike(component);
    }
    
    @RequestMapping(value = "/find/handle/component_like", method = RequestMethod.GET)
    public List<KitchenComponent> findByHandleComponentLike(@RequestParam("component") String component) {
        return kitchenComponentDAL.findByHandleComponentLike(component);
    }
    
    @RequestMapping(value = "/find/shutter/component_like", method = RequestMethod.GET)
    public List<KitchenComponent> findByShutterComponentLike(@RequestParam("component") String component) {
        return kitchenComponentDAL.findByShutterComponentLike(component);
    }
    
    @RequestMapping(value = "/find/drawer/component_like", method = RequestMethod.GET)
    public List<KitchenComponent> findByDrawerComponentLike(@RequestParam("component") String component) {
        return kitchenComponentDAL.findByDrawerComponentLike(component);
    }
    
    @RequestMapping(value = "/find/category", method = RequestMethod.GET)
    public List<KitchenComponent> findByCategory(@RequestParam("category") String category) {
        return kitchenComponentDAL.findByCategory(category);
    }
    
    @RequestMapping(value = "/find_all_list", method = RequestMethod.GET)
    public List<KitchenComponent> findAllList() {
        return kitchenComponentDAL.findAllList();
    }
    
    @RequestMapping(value = "/{id}/attachment", method = RequestMethod.POST)
    public KitchenComponent uploadAttachment(
            @PathVariable Integer id,
            @RequestParam MultipartFile attachment
    ) throws IOException {
        System.out.println("MULTIPART ATTACHMENT LOGGER+++++++++++++++++" + attachment.getName());
        return kitchenComponentService.insertAttachments(id, attachment);
    }

    @RequestMapping(value = "/{id}/attachment", method = RequestMethod.GET)
    public void getAttachment(@PathVariable Integer id, HttpServletResponse response) throws IOException {
        File photoFile = kitchenComponentService.getPhoto(id);
        response.setContentType(Files.probeContentType(Paths.get(photoFile.getAbsolutePath())));
        response.setContentLengthLong(photoFile.length());
        logger.debug("filename: {}, size: {}", photoFile.getAbsoluteFile(), photoFile.length());
        FileCopyUtils.copy(new FileInputStream(photoFile), response.getOutputStream());
    }
}
