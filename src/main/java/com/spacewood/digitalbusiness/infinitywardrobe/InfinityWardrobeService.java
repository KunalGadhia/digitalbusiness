/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.infinitywardrobe;

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
public class InfinityWardrobeService {

    public final Logger logger = LoggerFactory.getLogger(getClass());
    @Autowired
    AttachmentUtils attachmentUtils;

    @Autowired
    PhotoUtils photoUtils;

    @Autowired
    InfinityWardrobeDAL infinityWardrobeDAL;

    public InfinityWardrobe insertAttachments(Integer infinityWardrobeId, MultipartFile attachmentMultipartFile) throws JsonProcessingException, IOException {
        InfinityWardrobe infinityWardrobe = infinityWardrobeDAL.findById(infinityWardrobeId);
        Boolean isView = false;
        File outputFile = attachmentUtils.storeAttachmentByAttachmentTypeAndEntityId(
                attachmentMultipartFile.getOriginalFilename(),
                attachmentMultipartFile.getInputStream(),
                AttachmentUtils.AttachmentType.INFINITY_WARDROBE,
                infinityWardrobe.getId(),
                isView
        );
        System.out.println("THIS IS OUTPUTFILE==================" + outputFile.toString());
        List<String> attachments = new ArrayList<>();
        attachments.add(outputFile.getName().toString());
        infinityWardrobe.setImage(attachments);
//
        infinityWardrobeDAL.update(infinityWardrobe);
        return infinityWardrobe;
    }

    public File getPhoto(Integer infinityWardrobeId) throws FileNotFoundException, IOException {
        InfinityWardrobe infinityWardrobe = infinityWardrobeDAL.findById(infinityWardrobeId);
        return photoUtils.getInfinityWardrobePhoto(infinityWardrobe);
    }

    public File getImage(InfinityWardrobe infinityWardrobe) throws IOException {
        if (infinityWardrobe.getImage().size() != 0) {
            String PHOTO_FILE_NAME = infinityWardrobe.getImage().get(0).toString();
            File photoFile = photoUtils.getInfinityWardrobePhotoFile(infinityWardrobe);
            return photoFile;
        } else {
            File photoFiles = new File(getClass().getResource("images/default.png").getFile());
            return photoFiles;
        }
    }
}
