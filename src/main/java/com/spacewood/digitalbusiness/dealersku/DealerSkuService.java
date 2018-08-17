/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.dealersku;

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
public class DealerSkuService {
    public final Logger logger = LoggerFactory.getLogger(getClass());
    @Autowired
    AttachmentUtils attachmentUtils;    

    @Autowired
    PhotoUtils photoUtils;
    
    @Autowired
    DealerSkuDAL dealerSkuDAL;

    public DealerSku insertAttachments(Integer dealerSkuId, MultipartFile attachmentMultipartFile) throws JsonProcessingException, IOException {
        DealerSku dealerSku = dealerSkuDAL.findById(dealerSkuId);
        Boolean isView = false;
        File outputFile = attachmentUtils.storeAttachmentByAttachmentTypeAndEntityId(
                attachmentMultipartFile.getOriginalFilename(),
                attachmentMultipartFile.getInputStream(),
                AttachmentUtils.AttachmentType.KITCHEN_COMPONENT,
                dealerSku.getId(),
                isView
        );
        System.out.println("THIS IS OUTPUTFILE==================" + outputFile.toString());
        List<String> attachments = new ArrayList<>();
        attachments.add(outputFile.getName().toString());
        dealerSku.setImage(attachments);
//
        dealerSkuDAL.update(dealerSku);
        return dealerSku;
    }

    public File getPhoto(Integer dealerSkuId) throws FileNotFoundException, IOException {
        DealerSku dealerSku = dealerSkuDAL.findById(dealerSkuId);
        return photoUtils.getDealerSkuPhoto(dealerSku);
    }

    public File getImage(DealerSku dealerSku) throws IOException {
        if (dealerSku.getImage().size() != 0) {
            String PHOTO_FILE_NAME = dealerSku.getImage().get(0).toString();
            File photoFile = photoUtils.getDealerSkuPhotoFile(dealerSku);
            return photoFile;
        } else {
            File photoFiles = new File(getClass().getResource("images/default.png").getFile());
            return photoFiles;
        }
    }
}
