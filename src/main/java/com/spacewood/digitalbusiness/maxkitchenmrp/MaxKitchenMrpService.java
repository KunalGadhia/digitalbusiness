/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.maxkitchenmrp;

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
public class MaxKitchenMrpService {
   public final Logger logger = LoggerFactory.getLogger(getClass());
    
    @Autowired
    AttachmentUtils attachmentUtils;

    @Autowired
    PhotoUtils photoUtils;

    @Autowired
    MaxKitchenMrpDAL maxKitchenMrpDAL;

    public MaxKitchenMrp insertAttachments(Integer maxKitchenMrpId, MultipartFile attachmentMultipartFile) throws JsonProcessingException, IOException {
        MaxKitchenMrp maxKitchenMrp = maxKitchenMrpDAL.findById(maxKitchenMrpId);
        Boolean isView = false;
        File outputFile = attachmentUtils.storeAttachmentByAttachmentTypeAndEntityId(
                attachmentMultipartFile.getOriginalFilename(),
                attachmentMultipartFile.getInputStream(),
                AttachmentUtils.AttachmentType.MAX_KITCHEN_MRP,
                maxKitchenMrp.getId(),
                isView
        );
        System.out.println("THIS IS OUTPUTFILE==================" + outputFile.toString());
        List<String> attachments = new ArrayList<>();
        attachments.add(outputFile.getName().toString());
        maxKitchenMrp.setImage(attachments);
//
        maxKitchenMrpDAL.update(maxKitchenMrp);
        return maxKitchenMrp;
    }

    public File getPhoto(Integer maxKitchenMrpId) throws FileNotFoundException, IOException {
        MaxKitchenMrp maxKitchenMrp = maxKitchenMrpDAL.findById(maxKitchenMrpId);
        return photoUtils.getMaxKitchenMrpPhoto(maxKitchenMrp);
    }

    public File getImage(MaxKitchenMrp maxKitchenMrp) throws IOException {
        if (maxKitchenMrp.getImage().size() != 0) {
            String PHOTO_FILE_NAME = maxKitchenMrp.getImage().get(0).toString();
            File photoFile = photoUtils.getMaxKitchenMrpPhotoFile(maxKitchenMrp);
            return photoFile;
        } else {
            File photoFiles = new File(getClass().getResource("images/default.png").getFile());
            return photoFiles;
        }
    } 
}
