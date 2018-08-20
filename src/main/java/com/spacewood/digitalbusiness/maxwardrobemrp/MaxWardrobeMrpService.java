/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.maxwardrobemrp;

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
public class MaxWardrobeMrpService {
    public final Logger logger = LoggerFactory.getLogger(getClass());
    
    @Autowired
    AttachmentUtils attachmentUtils;

    @Autowired
    PhotoUtils photoUtils;

    @Autowired
    MaxWardrobeMrpDAL maxWardrobeMrpDAL;

    public MaxWardrobeMrp insertAttachments(Integer maxWardrobeMrpId, MultipartFile attachmentMultipartFile) throws JsonProcessingException, IOException {
        MaxWardrobeMrp maxWardrobeMrp = maxWardrobeMrpDAL.findById(maxWardrobeMrpId);
        Boolean isView = false;
        File outputFile = attachmentUtils.storeAttachmentByAttachmentTypeAndEntityId(
                attachmentMultipartFile.getOriginalFilename(),
                attachmentMultipartFile.getInputStream(),
                AttachmentUtils.AttachmentType.MAX_WARDROBE_MRP,
                maxWardrobeMrp.getId(),
                isView
        );
        System.out.println("THIS IS OUTPUTFILE==================" + outputFile.toString());
        List<String> attachments = new ArrayList<>();
        attachments.add(outputFile.getName().toString());
        maxWardrobeMrp.setImage(attachments);
//
        maxWardrobeMrpDAL.update(maxWardrobeMrp);
        return maxWardrobeMrp;
    }

    public File getPhoto(Integer maxWardrobeMrpId) throws FileNotFoundException, IOException {
        MaxWardrobeMrp maxWardrobeMrp = maxWardrobeMrpDAL.findById(maxWardrobeMrpId);
        return photoUtils.getMaxWardrobeMrpPhoto(maxWardrobeMrp);
    }

    public File getImage(MaxWardrobeMrp maxWardrobeMrp) throws IOException {
        if (maxWardrobeMrp.getImage().size() != 0) {
            String PHOTO_FILE_NAME = maxWardrobeMrp.getImage().get(0).toString();
            File photoFile = photoUtils.getMaxWardrobeMrpPhotoFile(maxWardrobeMrp);
            return photoFile;
        } else {
            File photoFiles = new File(getClass().getResource("images/default.png").getFile());
            return photoFiles;
        }
    }
}
