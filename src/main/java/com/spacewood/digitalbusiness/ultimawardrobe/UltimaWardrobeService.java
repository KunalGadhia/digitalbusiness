///*
// * To change this license header, choose License Headers in Project Properties.
// * To change this template file, choose Tools | Templates
// * and open the template in the editor.
// */
//package com.spacewood.digitalbusiness.ultimawardrobe;
//
//import com.fasterxml.jackson.core.JsonProcessingException;
//import com.spacewood.digitalbusiness.util.AttachmentUtils;
//import com.spacewood.digitalbusiness.util.PhotoUtils;
//import java.io.File;
//import java.io.FileNotFoundException;
//import java.io.IOException;
//import java.util.ArrayList;
//import java.util.List;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.multipart.MultipartFile;
//
///**
// *
// * @author webdesign
// */
//public class UltimaWardrobeService {
//    public final Logger logger = LoggerFactory.getLogger(getClass());
//    
//    @Autowired
//    AttachmentUtils attachmentUtils;
//
//    @Autowired
//    PhotoUtils photoUtils;
//
//    @Autowired
//    UltimaWardrobeDAL ultimaWardrobeDAL;
//
//    public UltimaWardrobe insertAttachments(Integer ultimaWardrobeId, MultipartFile attachmentMultipartFile) throws JsonProcessingException, IOException {
//        UltimaWardrobe ultimaWardrobe = ultimaWardrobeDAL.findById(ultimaWardrobeId);
//        Boolean isView = false;
//        File outputFile = attachmentUtils.storeAttachmentByAttachmentTypeAndEntityId(
//                attachmentMultipartFile.getOriginalFilename(),
//                attachmentMultipartFile.getInputStream(),
//                AttachmentUtils.AttachmentType.ULTIMA_WARDROBE,
//                ultimaWardrobe.getId(),
//                isView
//        );
//        System.out.println("THIS IS OUTPUTFILE==================" + outputFile.toString());
//        List<String> attachments = new ArrayList<>();
//        attachments.add(outputFile.getName().toString());
//        ultimaWardrobe.setImage(attachments);
////
//        ultimaWardrobeDAL.update(ultimaWardrobe);
//        return ultimaWardrobe;
//    }
//
//    public File getPhoto(Integer ultimaWardrobeId) throws FileNotFoundException, IOException {
//        UltimaWardrobe ultimaWardrobe = ultimaWardrobeDAL.findById(ultimaWardrobeId);
//        return photoUtils.getUltimaWardrobePhoto(ultimaWardrobe);
//    }
//
//    public File getImage(UltimaWardrobe ultimaWardrobe) throws IOException {
//        if (ultimaWardrobe.getImage().size() != 0) {
//            String PHOTO_FILE_NAME = ultimaWardrobe.getImage().get(0).toString();
//            File photoFile = photoUtils.getUltimaWardrobePhotoFile(ultimaWardrobe);
//            return photoFile;
//        } else {
//            File photoFiles = new File(getClass().getResource("images/default.png").getFile());
//            return photoFiles;
//        }
//    }
//}
