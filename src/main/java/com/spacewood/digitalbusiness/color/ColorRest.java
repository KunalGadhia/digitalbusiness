/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.color;

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
@RequestMapping("/color")
public class ColorRest {
  
    private final Logger logger = LoggerFactory.getLogger(getClass());
    @Autowired
    private ColorDAL colorDAL;
    
    @Autowired
    private ColorService colorService;
    
    @RequestMapping(method = RequestMethod.GET)
    public List<Color> findAll(@RequestParam(value = "offset", required = false, defaultValue = "0") Integer offset) throws SQLException {
        return colorDAL.findAll(offset);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Color findById(@PathVariable("id") Integer id) throws SQLException {
        return colorDAL.findById(id);
    }
    
    @RequestMapping(method = RequestMethod.POST)
    public Color insert(@RequestBody Color color) {
        return colorDAL.insert(color);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.POST)
    public Color update(@RequestBody Color color) {
        return colorDAL.update(color);
    }

//    @RolesAllowed("ROLE_SUPER_ADMIN")
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable("id") Integer id) throws Exception {
        colorDAL.delete(id);
    }
    
    @RequestMapping(value = "/find/color", method = RequestMethod.GET)
    public Color findByColor(@RequestParam("color") String color) throws Exception {
        return colorDAL.findByColor(color);
    }
    
    @RequestMapping(value = "/find/color_code", method = RequestMethod.GET)
    public Color findByColorCode(@RequestParam("colorCode") String colorCode) throws Exception {
        return colorDAL.findByColorCode(colorCode);
    }
    
//    @RequestMapping(value = "/find/component_like", method = RequestMethod.GET)
//    public List<KitchenComponent> findByComponentLike(@RequestParam("component") String component) {
//        return colorDAL.findByComponentLike(component);
//    }
    
    @RequestMapping(value = "/find/color_category", method = RequestMethod.GET)
    public List<Color> findByColorCategory(@RequestParam("colorCategory") String colorCategory) {
        return colorDAL.findByColorCategory(colorCategory);
    }
    
    @RequestMapping(value = "/find_all_list", method = RequestMethod.GET)
    public List<Color> findAllList() {
        return colorDAL.findAllList();
    }
    
    @RequestMapping(value = "/{id}/attachment", method = RequestMethod.POST)
    public Color uploadAttachment(
            @PathVariable Integer id,
            @RequestParam MultipartFile attachment
    ) throws IOException {
        System.out.println("MULTIPART ATTACHMENT LOGGER+++++++++++++++++" + attachment.getName());
        return colorService.insertAttachments(id, attachment);
    }

    @RequestMapping(value = "/{id}/attachment", method = RequestMethod.GET)
    public void getAttachment(@PathVariable Integer id, HttpServletResponse response) throws IOException {
        File photoFile = colorService.getPhoto(id);
        response.setContentType(Files.probeContentType(Paths.get(photoFile.getAbsolutePath())));
        response.setContentLengthLong(photoFile.length());
        logger.debug("filename: {}, size: {}", photoFile.getAbsoluteFile(), photoFile.length());
        FileCopyUtils.copy(new FileInputStream(photoFile), response.getOutputStream());
    }  
}
