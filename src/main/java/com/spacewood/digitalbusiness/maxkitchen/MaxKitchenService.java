/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.maxkitchen;

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
 * @author swapnika
 */
@Service
@Transactional
public class MaxKitchenService {
    public final Logger logger = LoggerFactory.getLogger(getClass());
    
    @Autowired
    AttachmentUtils attachmentUtils;

    @Autowired
    PhotoUtils photoUtils;

    @Autowired
    MaxKitchenDAL maxKitchenDAL;

    public MaxKitchen insertAttachments(Integer maxKitchenId, MultipartFile attachmentMultipartFile) throws JsonProcessingException, IOException {
        MaxKitchen maxKitchen = maxKitchenDAL.findById(maxKitchenId);
        Boolean isView = false;
        File outputFile = attachmentUtils.storeAttachmentByAttachmentTypeAndEntityId(
                attachmentMultipartFile.getOriginalFilename(),
                attachmentMultipartFile.getInputStream(),
                AttachmentUtils.AttachmentType.MAX_KITCHEN,
                maxKitchen.getId(),
                isView
        );
        System.out.println("THIS IS OUTPUTFILE==================" + outputFile.toString());
        List<String> attachments = new ArrayList<>();
        attachments.add(outputFile.getName().toString());
        maxKitchen.setImage(attachments);
//
        maxKitchenDAL.update(maxKitchen);
        return maxKitchen;
    }

    public File getPhoto(Integer maxKitchenId) throws FileNotFoundException, IOException {
        MaxKitchen maxKitchen = maxKitchenDAL.findById(maxKitchenId);
        return photoUtils.getMaxKitchenPhoto(maxKitchen);
    }

    public File getImage(MaxKitchen maxKitchen) throws IOException {
        if (maxKitchen.getImage().size() != 0) {
            String PHOTO_FILE_NAME = maxKitchen.getImage().get(0).toString();
            File photoFile = photoUtils.getMaxKitchenPhotoFile(maxKitchen);
            return photoFile;
        } else {
            File photoFiles = new File(getClass().getResource("images/default.png").getFile());
            return photoFiles;
        }
    }
}
