/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.util;

import com.spacewood.digitalbusiness.setting.Setting;
import com.spacewood.digitalbusiness.setting.SettingDAL;
import com.spacewood.digitalbusiness.setting.SettingKey;
import com.spacewood.digitalbusiness.setting.SettingService;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import org.apache.commons.io.FileExistsException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;

/**
 *
 * @author webdesign
 */
@Service
public class AttachmentUtils {

    private final Logger logger = LoggerFactory.getLogger(getClass());

    @Autowired
    private SettingService settingService;

    @Autowired
    private SettingDAL settingDAL;

    private static final String KITCHEN_COMPONENT_ATTACHMENT_DIR_NAME = "kitchern_component";
    private static final String COLOR_ATTACHMENT_DIR_NAME = "color_component";
    private static final String DEALER_SKU_ATTACHMENT_DIR_NAME = "dealer_sku_component";
    private static final String INFINITY_WARDROBE_ATTACHMENT_DIR_NAME = "infinity_wardrobe";
    private static final String INFINITY_WARDROBE_MRP_ATTACHMENT_DIR_NAME = "infinity_wardrobe_mrp";
    private static final String MAX_WARDROBE_ATTACHMENT_DIR_NAME = "max_wardrobe";
    private static final String MAX_WARDROBE_MRP_ATTACHMENT_DIR_NAME = "max_wardrobe_mrp";
    private static final String MAX_KITCHEN_ATTACHMENT_DIR_NAME = "max_kitchen";
    private static final String MAX_KITCHEN_MRP_ATTACHMENT_DIR_NAME = "max_kitchen_mrp";
    private static final String ULTIMA_WARDROBE_ATTACHMENT_DIR_NAME = "ultima_wardrobe";

    public static enum AttachmentType {
        KITCHEN_COMPONENT,
        COLOR,
        DEALER_SKU,
        INFINITY_WARDROBE,
        INFINITY_WARDROBE_MRP,
        MAX_WARDROBE,
        MAX_WARDROBE_MRP,
        MAX_KITCHEN,
        MAX_KITCHEN_MRP,
        ULTIMA_WARDROBE
    }

    public File getAttachmentRootDirectory() {
        Setting setting = settingDAL.findByKey(SettingKey.ATTACHMENT_ROOT_PATH);
        File rootDir = new File(setting.getSettingValue());
        if (!rootDir.exists()) {
            logger.info("attachment root directory {} does not exist, creating...", rootDir);
            rootDir.mkdirs();
        }
        return rootDir;
    }

    public File getDirectoryByAttachmentType(AttachmentType attachmentType) throws IOException {
//        logger.info("are we in getDirectoryByAttachmentType");
//        System.out.println("are we in getDirectoryByAttachmentType");
        File attachmentDir = null;
//        System.out.println("attachmentType" + attachmentType);
//        logger.info("attachmentType", attachmentType);

        switch (attachmentType) {

            case KITCHEN_COMPONENT:
                attachmentDir = new File(getAttachmentRootDirectory(), KITCHEN_COMPONENT_ATTACHMENT_DIR_NAME);
                logger.info("ATTACHMENT_BY_TYPE" + attachmentType);
                break;

            case COLOR:
                attachmentDir = new File(getAttachmentRootDirectory(), COLOR_ATTACHMENT_DIR_NAME);
                logger.info("ATTACHMENT_BY_TYPE" + attachmentType);
                break;

            case DEALER_SKU:
                attachmentDir = new File(getAttachmentRootDirectory(), DEALER_SKU_ATTACHMENT_DIR_NAME);
                logger.info("ATTACHMENT_BY_TYPE" + attachmentType);
                break;

            case INFINITY_WARDROBE:
                attachmentDir = new File(getAttachmentRootDirectory(), INFINITY_WARDROBE_ATTACHMENT_DIR_NAME);
                logger.info("ATTACHMENT_BY_TYPE" + attachmentType);
                break;

            case INFINITY_WARDROBE_MRP:
                attachmentDir = new File(getAttachmentRootDirectory(), INFINITY_WARDROBE_MRP_ATTACHMENT_DIR_NAME);
                logger.info("ATTACHMENT_BY_TYPE" + attachmentType);
                break;

            case MAX_WARDROBE:
                attachmentDir = new File(getAttachmentRootDirectory(), MAX_WARDROBE_ATTACHMENT_DIR_NAME);
                logger.info("ATTACHMENT_BY_TYPE" + attachmentType);
                break;

            case MAX_WARDROBE_MRP:
                attachmentDir = new File(getAttachmentRootDirectory(), MAX_WARDROBE_MRP_ATTACHMENT_DIR_NAME);
                logger.info("ATTACHMENT_BY_TYPE" + attachmentType);
                break;

            case MAX_KITCHEN:
                attachmentDir = new File(getAttachmentRootDirectory(), MAX_KITCHEN_ATTACHMENT_DIR_NAME);
                logger.info("ATTACHMENT_BY_TYPE" + attachmentType);
                break;

            case MAX_KITCHEN_MRP:
                attachmentDir = new File(getAttachmentRootDirectory(), MAX_KITCHEN_MRP_ATTACHMENT_DIR_NAME);
                logger.info("ATTACHMENT_BY_TYPE" + attachmentType);
                break;

            case ULTIMA_WARDROBE:
                attachmentDir = new File(getAttachmentRootDirectory(), ULTIMA_WARDROBE_ATTACHMENT_DIR_NAME);
                logger.info("ATTACHMENT_BY_TYPE" + attachmentType);
                break;

            default:
                throw new IOException("Could not determine location to store attachment of type: " + attachmentType);

        }

        if (!attachmentDir.exists()) {
            logger.info("attachment type {} : directory {} does not exist, creating...", attachmentType, attachmentDir);
            attachmentDir.mkdirs();
        }

        return attachmentDir;
    }

    public File storeAttachmentByAttachmentType(
            String outputFilename,
            InputStream inputStream,
            AttachmentType attachmentType
    )
            throws FileExistsException, IOException {
        logger.info("storeAttachmentByAttachmentType {} ..", attachmentType);
        File parentDir = getDirectoryByAttachmentType(attachmentType);
        File outputFile = new File(parentDir, outputFilename);
        logger.info("outputFile" + outputFile);
        logger.info("parentDir" + parentDir);
        String filePath = outputFile.getPath();
        logger.info("filePath ::::::::::" + filePath);

        FileCopyUtils.copy(inputStream, new FileOutputStream(outputFile));

        return outputFile;
    }

    public File getDirectoryByAttachmentTypeAndEntityId(AttachmentType attachmentType, Integer entityId, Boolean view) throws IOException {
        File entityDir = new File(getDirectoryByAttachmentType(attachmentType), entityId.toString());
        if (view == true) {
            return entityDir;
        } else {
            if (!entityDir.exists()) {
                entityDir.mkdirs();
            } else {
                String[] items = entityDir.list();
                for (String s : items) {
                    File currentFile = new File(entityDir.getPath(), s);
                    currentFile.delete();
                }
                entityDir.mkdirs();
            }
            return entityDir;
        }
    }

    public File storeAttachmentByAttachmentTypeAndEntityId(
            String outputFilename,
            InputStream inputStream,
            AttachmentType attachmentType,
            Integer entityId,
            Boolean isView)
            throws FileExistsException, IOException {

        File parentDir = getDirectoryByAttachmentTypeAndEntityId(attachmentType, entityId, isView);
        //TODO sanitize the filename before using it like this.
        //TODO also make sure the file size is within limits here
        File outputFile = new File(parentDir, outputFilename);
        if (outputFile.exists()) {
            outputFile.delete();
            FileCopyUtils.copy(inputStream, new FileOutputStream(outputFile));
//            File outputFile = new File(parentDir, outputFilename);
        } else {
            FileCopyUtils.copy(inputStream, new FileOutputStream(outputFile));
//            File outputFile = new File(parentDir, outputFilename);
        }
        return outputFile;
    }

    ///////////////////////////////////////////////////////////
    public boolean deleteAttachmentByAttachmentTypeAndEntityId(
            String filename,
            AttachmentType attachmentType,
            Integer entityId,
            Boolean isView)
            throws FileNotFoundException, IOException {

        File parentDir = getDirectoryByAttachmentTypeAndEntityId(attachmentType, entityId, isView);
        //TODO sanitize the filename before using it like this.
        //TODO also make sure the file size is within limits here
        File toBeDeletedFile = new File(parentDir, filename);

        if (!toBeDeletedFile.exists()) {
            throw new FileNotFoundException(toBeDeletedFile.getName());
        }

        return toBeDeletedFile.delete();
    }

}
