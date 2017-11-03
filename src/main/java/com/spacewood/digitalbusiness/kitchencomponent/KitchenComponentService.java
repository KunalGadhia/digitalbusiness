/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.kitchencomponent;

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
public class KitchenComponentService {
    public final Logger logger = LoggerFactory.getLogger(getClass());
    @Autowired
    AttachmentUtils attachmentUtils;    

    @Autowired
    PhotoUtils photoUtils;
    
    @Autowired
    KitchenComponentDAL kitchenComponentDAL;

    public KitchenComponent insertAttachments(Integer kitchenComponentId, MultipartFile attachmentMultipartFile) throws JsonProcessingException, IOException {
        KitchenComponent kitchenComponent = kitchenComponentDAL.findById(kitchenComponentId);
        Boolean isView = false;
        File outputFile = attachmentUtils.storeAttachmentByAttachmentTypeAndEntityId(
                attachmentMultipartFile.getOriginalFilename(),
                attachmentMultipartFile.getInputStream(),
                AttachmentUtils.AttachmentType.KITCHEN_COMPONENT,
                kitchenComponent.getId(),
                isView
        );
        System.out.println("THIS IS OUTPUTFILE==================" + outputFile.toString());
        List<String> attachments = new ArrayList<>();
        attachments.add(outputFile.getName().toString());
        kitchenComponent.setImage(attachments);
//
        kitchenComponentDAL.update(kitchenComponent);
        return kitchenComponent;
    }

    public File getPhoto(Integer kitchenComponentId) throws FileNotFoundException, IOException {
        KitchenComponent kitchenComponent = kitchenComponentDAL.findById(kitchenComponentId);
        return photoUtils.getKitchenComponentPhoto(kitchenComponent);
    }

    public File getImage(KitchenComponent kitchenComponent) throws IOException {
        if (kitchenComponent.getImage().size() != 0) {
            String PHOTO_FILE_NAME = kitchenComponent.getImage().get(0).toString();
            File photoFile = photoUtils.getKitchenComponentPhotoFile(kitchenComponent);
            return photoFile;
        } else {
            File photoFiles = new File(getClass().getResource("images/default.png").getFile());
            return photoFiles;
        }
    }
}
