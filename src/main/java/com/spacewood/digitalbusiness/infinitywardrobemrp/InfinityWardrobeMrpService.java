/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.infinitywardrobemrp;

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
public class InfinityWardrobeMrpService {
    public final Logger logger = LoggerFactory.getLogger(getClass());
    @Autowired
    AttachmentUtils attachmentUtils;

    @Autowired
    PhotoUtils photoUtils;

    @Autowired
    InfinityWardrobeMrpDAL infinityWardrobeMrpDAL;

    public InfinityWardrobeMrp insertAttachments(Integer infinityWardrobeMrpId, MultipartFile attachmentMultipartFile) throws JsonProcessingException, IOException {
        InfinityWardrobeMrp infinityWardrobeMrp = infinityWardrobeMrpDAL.findById(infinityWardrobeMrpId);
        Boolean isView = false;
        File outputFile = attachmentUtils.storeAttachmentByAttachmentTypeAndEntityId(
                attachmentMultipartFile.getOriginalFilename(),
                attachmentMultipartFile.getInputStream(),
                AttachmentUtils.AttachmentType.INFINITY_WARDROBE_MRP,
                infinityWardrobeMrp.getId(),
                isView
        );
        System.out.println("THIS IS OUTPUTFILE==================" + outputFile.toString());
        List<String> attachments = new ArrayList<>();
        attachments.add(outputFile.getName().toString());
        infinityWardrobeMrp.setImage(attachments);
//
        infinityWardrobeMrpDAL.update(infinityWardrobeMrp);
        return infinityWardrobeMrp;
    }

    public File getPhoto(Integer infinityWardrobeMrpId) throws FileNotFoundException, IOException {
        InfinityWardrobeMrp infinityWardrobeMrp = infinityWardrobeMrpDAL.findById(infinityWardrobeMrpId);
        return photoUtils.getInfinityWardrobeMrpPhoto(infinityWardrobeMrp);
    }

    public File getImage(InfinityWardrobeMrp infinityWardrobeMrp) throws IOException {
        if (infinityWardrobeMrp.getImage().size() != 0) {
            String PHOTO_FILE_NAME = infinityWardrobeMrp.getImage().get(0).toString();
            File photoFile = photoUtils.getInfinityWardrobeMrpPhotoFile(infinityWardrobeMrp);
            return photoFile;
        } else {
            File photoFiles = new File(getClass().getResource("images/default.png").getFile());
            return photoFiles;
        }
    }
}
