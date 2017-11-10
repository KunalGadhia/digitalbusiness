/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.color;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.spacewood.digitalbusiness.util.AttachmentUtils;
import com.spacewood.digitalbusiness.util.PhotoUtils;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author webdesign
 */
@Service
@Transactional
public class ColorService {
    public final Logger logger = LoggerFactory.getLogger(getClass());
    @Autowired
    AttachmentUtils attachmentUtils;    

    @Autowired
    PhotoUtils photoUtils;
    
    @Autowired
    ColorDAL colorDAL;

    public Color insertAttachments(Integer colorId, MultipartFile attachmentMultipartFile) throws JsonProcessingException, IOException {
        Color color = colorDAL.findById(colorId);
        Boolean isView = false;
        File outputFile = attachmentUtils.storeAttachmentByAttachmentTypeAndEntityId(
                attachmentMultipartFile.getOriginalFilename(),
                attachmentMultipartFile.getInputStream(),
                AttachmentUtils.AttachmentType.COLOR,
                color.getId(),
                isView
        );
        System.out.println("THIS IS OUTPUTFILE==================" + outputFile.toString());
        List<String> attachments = new ArrayList<>();
        attachments.add(outputFile.getName().toString());
        color.setImage(attachments);
//
        colorDAL.update(color);
        return color;
    }

    public File getPhoto(Integer colorId) throws FileNotFoundException, IOException {
        Color color = colorDAL.findById(colorId);
        return photoUtils.getColorPhoto(color);
    }

    public File getImage(Color color) throws IOException {
        if (color.getImage().size() != 0) {
            String PHOTO_FILE_NAME = color.getImage().get(0).toString();
            File photoFile = photoUtils.getColorPhotoFile(color);
            return photoFile;
        } else {
            File photoFiles = new File(getClass().getResource("images/default.png").getFile());
            return photoFiles;
        }
    }
}
