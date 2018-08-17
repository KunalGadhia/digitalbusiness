/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.util;

import com.spacewood.digitalbusiness.color.Color;
import com.spacewood.digitalbusiness.dealersku.DealerSku;
import com.spacewood.digitalbusiness.kitchencomponent.KitchenComponent;
import com.spacewood.digitalbusiness.util.AttachmentUtils.AttachmentType;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
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
public class PhotoUtils {

    private String PHOTO_FILE_NAME = "";
    @Autowired
    private AttachmentUtils attachmentUtils;

    private final Logger logger = LoggerFactory.getLogger(getClass());

    public File getKitchenComponentPhoto(KitchenComponent kitchenComponent) throws FileNotFoundException, IOException {
        if (kitchenComponent.getImage() != null) {
            PHOTO_FILE_NAME = kitchenComponent.getImage().get(0).toString();
        }
        File photoFile = getKitchenComponentPhotoFile(kitchenComponent);
        return photoFile;
    }

    public File setKitchenComponentPhoto(
            InputStream inputStream,
            KitchenComponent kitchenComponent)
            throws IOException {

        File photoFile = getKitchenComponentPhoto(kitchenComponent);
        FileCopyUtils.copy(inputStream, new FileOutputStream(photoFile));
        return photoFile;
    }

    public File getKitchenComponentPhotoFile(KitchenComponent kitchenComponent) throws IOException {
        File kitchenComponentDir = attachmentUtils.getDirectoryByAttachmentTypeAndEntityId(AttachmentType.KITCHEN_COMPONENT, kitchenComponent.getId(), true);
        return new File(kitchenComponentDir, PHOTO_FILE_NAME);
    }

    ////////////////////////////////////////////////////////
    public File getColorPhoto(Color color) throws FileNotFoundException, IOException {
        if (color.getImage() != null) {
            PHOTO_FILE_NAME = color.getImage().get(0).toString();
        }
        File photoFile = getColorPhotoFile(color);
        return photoFile;
    }

    public File setColorPhoto(
            InputStream inputStream,
            Color color)
            throws IOException {

        File photoFile = getColorPhoto(color);
        FileCopyUtils.copy(inputStream, new FileOutputStream(photoFile));
        return photoFile;
    }

    public File getColorPhotoFile(Color color) throws IOException {
        File kitchenComponentDir = attachmentUtils.getDirectoryByAttachmentTypeAndEntityId(AttachmentType.COLOR, color.getId(), true);
        return new File(kitchenComponentDir, PHOTO_FILE_NAME);
    }
    ////////////////////////////////////////////////////////////
    public File getDealerSkuPhoto(DealerSku dealerSku) throws FileNotFoundException, IOException {
        if (dealerSku.getImage() != null) {
            PHOTO_FILE_NAME = dealerSku.getImage().get(0).toString();
        }
        File photoFile = getDealerSkuPhotoFile(dealerSku);
        return photoFile;
    }

    public File setDealerSkuPhoto(
            InputStream inputStream,
            Color color)
            throws IOException {

        File photoFile = getColorPhoto(color);
        FileCopyUtils.copy(inputStream, new FileOutputStream(photoFile));
        return photoFile;
    }

    public File getDealerSkuPhotoFile(DealerSku dealerSku) throws IOException {
        File dealerSkuDir = attachmentUtils.getDirectoryByAttachmentTypeAndEntityId(AttachmentType.DEALER_SKU, dealerSku.getId(), true);
        return new File(dealerSkuDir, PHOTO_FILE_NAME);
    }
}
