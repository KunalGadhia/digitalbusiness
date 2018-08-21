/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.maxwardrobe;

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
public class MaxWardrobeService {
    public final Logger logger = LoggerFactory.getLogger(getClass());
    
    @Autowired
    AttachmentUtils attachmentUtils;

    @Autowired
    PhotoUtils photoUtils;

    @Autowired
    MaxWardrobeDAL maxWardrobeDAL;

    public MaxWardrobe insertAttachments(Integer maxWardrobeId, MultipartFile attachmentMultipartFile) throws JsonProcessingException, IOException {
        MaxWardrobe maxWardrobe = maxWardrobeDAL.findById(maxWardrobeId);
        Boolean isView = false;
        File outputFile = attachmentUtils.storeAttachmentByAttachmentTypeAndEntityId(
                attachmentMultipartFile.getOriginalFilename(),
                attachmentMultipartFile.getInputStream(),
                AttachmentUtils.AttachmentType.MAX_WARDROBE,
                maxWardrobe.getId(),
                isView
        );
        System.out.println("THIS IS OUTPUTFILE==================" + outputFile.toString());
        List<String> attachments = new ArrayList<>();
        attachments.add(outputFile.getName().toString());
        maxWardrobe.setImage(attachments);
//
        maxWardrobeDAL.update(maxWardrobe);
        return maxWardrobe;
    }

    public File getPhoto(Integer maxWardrobeId) throws FileNotFoundException, IOException {
        MaxWardrobe maxWardrobe = maxWardrobeDAL.findById(maxWardrobeId);
        return photoUtils.getMaxWardrobePhoto(maxWardrobe);
    }

    public File getImage(MaxWardrobe maxWardrobe) throws IOException {
        if (maxWardrobe.getImage().size() != 0) {
            String PHOTO_FILE_NAME = maxWardrobe.getImage().get(0).toString();
            File photoFile = photoUtils.getMaxWardrobePhotoFile(maxWardrobe);
            return photoFile;
        } else {
            File photoFiles = new File(getClass().getResource("images/default.png").getFile());
            return photoFiles;
        }
    }
}
