/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.ultimawardrobe;

import java.sql.SQLException;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author webdesign
 */
@RestController
@RequestMapping("/ultima_wardrobe")
public class UltimaWardrobeRest {
    
    private final Logger logger = LoggerFactory.getLogger(getClass());
    
    @Autowired
    private UltimaWardrobeDAL ultimaWardrobeDAL;
    
//    @Autowired
//    private UltimaWardrobeService ultimaWardrobeService;
        
    
    @RequestMapping(method = RequestMethod.GET)
    public List<UltimaWardrobe> findAll(@RequestParam(value = "offset", required = false, defaultValue = "0") Integer offset) throws SQLException {
        return ultimaWardrobeDAL.findAll(offset);
    }
    
    @RequestMapping(value="/find/category", method = RequestMethod.GET)
    public List<UltimaWardrobe> findByCategory(@RequestParam("category") String category) throws SQLException {
        return ultimaWardrobeDAL.findByCategory(category);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public UltimaWardrobe findById(@PathVariable("id") Integer id) throws SQLException {
        return ultimaWardrobeDAL.findById(id);
    }
    
    @RequestMapping(method = RequestMethod.POST)
    public UltimaWardrobe insert(@RequestBody UltimaWardrobe ultimaWardrobe) {
        return ultimaWardrobeDAL.insert(ultimaWardrobe);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.POST)
    public UltimaWardrobe update(@RequestBody UltimaWardrobe ultimaWardrobe) {
        return ultimaWardrobeDAL.update(ultimaWardrobe);
    }

//    @RolesAllowed("ROLE_SUPER_ADMIN")
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable("id") Integer id) throws Exception {
        ultimaWardrobeDAL.delete(id);
    }

    @RequestMapping(value = "/find/description", method = RequestMethod.GET)
    public UltimaWardrobe findByDescription(@RequestParam("description") String description) throws Exception {
        return ultimaWardrobeDAL.findByDescription(description);
    }
    
    @RequestMapping(value = "/find/description_like", method = RequestMethod.GET)
    public List<UltimaWardrobe> findByDescriptionLike(@RequestParam("description") String description) {
        return ultimaWardrobeDAL.findByDescriptionLike(description);
    }
    
//    @RequestMapping(value = "/{id}/attachment", method = RequestMethod.POST)
//    public UltimaWardrobe uploadAttachment(
//            @PathVariable Integer id,
//            @RequestParam MultipartFile attachment
//    ) throws IOException {
//        System.out.println("MULTIPART ATTACHMENT LOGGER+++++++++++++++++" + attachment.getName());
//        return ultimaWardrobeService.insertAttachments(id, attachment);
//    }
//
//    @RequestMapping(value = "/{id}/attachment", method = RequestMethod.GET)
//    public void getAttachment(@PathVariable Integer id, HttpServletResponse response) throws IOException {
//        File photoFile = ultimaWardrobeService.getPhoto(id);
//        response.setContentType(Files.probeContentType(Paths.get(photoFile.getAbsolutePath())));
//        response.setContentLengthLong(photoFile.length());
//        logger.debug("filename: {}, size: {}", photoFile.getAbsoluteFile(), photoFile.length());
//        FileCopyUtils.copy(new FileInputStream(photoFile), response.getOutputStream());
//    }
    
}
