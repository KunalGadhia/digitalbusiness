/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.util;

import com.spacewood.digitalbusiness.color.Color;
import com.spacewood.digitalbusiness.dealersku.DealerSku;
import com.spacewood.digitalbusiness.infinitywardrobe.InfinityWardrobe;
import com.spacewood.digitalbusiness.infinitywardrobemrp.InfinityWardrobeMrp;
import com.spacewood.digitalbusiness.kitchencomponent.KitchenComponent;
import com.spacewood.digitalbusiness.maxkitchen.MaxKitchen;
import com.spacewood.digitalbusiness.maxkitchenmrp.MaxKitchenMrp;
import com.spacewood.digitalbusiness.maxwardrobe.MaxWardrobe;
import com.spacewood.digitalbusiness.maxwardrobemrp.MaxWardrobeMrp;
import com.spacewood.digitalbusiness.ultimawardrobe.UltimaWardrobe;
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
            DealerSku dealerSku)
            throws IOException {

        File photoFile = getDealerSkuPhoto(dealerSku);
        FileCopyUtils.copy(inputStream, new FileOutputStream(photoFile));
        return photoFile;
    }

    public File getDealerSkuPhotoFile(DealerSku dealerSku) throws IOException {
        File dealerSkuDir = attachmentUtils.getDirectoryByAttachmentTypeAndEntityId(AttachmentType.DEALER_SKU, dealerSku.getId(), true);
        return new File(dealerSkuDir, PHOTO_FILE_NAME);
    }
    ////////////////////////////////////////////////////////////
    public File getInfinityWardrobePhoto(InfinityWardrobe infinityWardrobe) throws FileNotFoundException, IOException {
        if (infinityWardrobe.getImage() != null) {
            PHOTO_FILE_NAME = infinityWardrobe.getImage().get(0).toString();
        }
        File photoFile = getInfinityWardrobePhotoFile(infinityWardrobe);
        return photoFile;
    }

    public File setInfinityWardrobePhoto(
            InputStream inputStream,
            InfinityWardrobe infinityWardrobe)
            throws IOException {

        File photoFile = getInfinityWardrobePhoto(infinityWardrobe);
        FileCopyUtils.copy(inputStream, new FileOutputStream(photoFile));
        return photoFile;
    }

    public File getInfinityWardrobePhotoFile(InfinityWardrobe infinityWardrobe) throws IOException {
        File infinityWardrobeDir = attachmentUtils.getDirectoryByAttachmentTypeAndEntityId(AttachmentType.INFINITY_WARDROBE, infinityWardrobe.getId(), true);
        return new File(infinityWardrobeDir, PHOTO_FILE_NAME);
    }
    ////////////////////////////////////////////////////////////
    public File getInfinityWardrobeMrpPhoto(InfinityWardrobeMrp infinityWardrobeMrp) throws FileNotFoundException, IOException {
        if (infinityWardrobeMrp.getImage() != null) {
            PHOTO_FILE_NAME = infinityWardrobeMrp.getImage().get(0).toString();
        }
        File photoFile = getInfinityWardrobeMrpPhotoFile(infinityWardrobeMrp);
        return photoFile;
    }

    public File setInfinityWardrobeMrpPhoto(
            InputStream inputStream,
            InfinityWardrobeMrp infinityWardrobeMrp)
            throws IOException {

        File photoFile = getInfinityWardrobeMrpPhoto(infinityWardrobeMrp);
        FileCopyUtils.copy(inputStream, new FileOutputStream(photoFile));
        return photoFile;
    }

    public File getInfinityWardrobeMrpPhotoFile(InfinityWardrobeMrp infinityWardrobeMrp) throws IOException {
        File infinityWardrobeMrpDir = attachmentUtils.getDirectoryByAttachmentTypeAndEntityId(AttachmentType.INFINITY_WARDROBE_MRP, infinityWardrobeMrp.getId(), true);
        return new File(infinityWardrobeMrpDir, PHOTO_FILE_NAME);
    }
    /////////////////////////////////////////////////////////////
    
    public File getMaxWardrobePhoto(MaxWardrobe maxWardrobe) throws FileNotFoundException, IOException {
        if (maxWardrobe.getImage() != null) {
            PHOTO_FILE_NAME = maxWardrobe.getImage().get(0).toString();
        }
        File photoFile = getMaxWardrobePhotoFile(maxWardrobe);
        return photoFile;
    }

    public File setMaxWardrobePhoto(
            InputStream inputStream,
            MaxWardrobe maxWardrobe)
            throws IOException {

        File photoFile = getMaxWardrobePhoto(maxWardrobe);
        FileCopyUtils.copy(inputStream, new FileOutputStream(photoFile));
        return photoFile;
    }

    public File getMaxWardrobePhotoFile(MaxWardrobe maxWardrobe) throws IOException {
        File maxWardrobeDir = attachmentUtils.getDirectoryByAttachmentTypeAndEntityId(AttachmentType.MAX_WARDROBE, maxWardrobe.getId(), true);
        return new File(maxWardrobeDir, PHOTO_FILE_NAME);
    }
    ////////////////////////////////////////////////////////////
    public File getMaxWardrobeMrpPhoto(MaxWardrobeMrp maxWardrobeMrp) throws FileNotFoundException, IOException {
        if (maxWardrobeMrp.getImage() != null) {
            PHOTO_FILE_NAME = maxWardrobeMrp.getImage().get(0).toString();
        }
        File photoFile = getMaxWardrobeMrpPhotoFile(maxWardrobeMrp);
        return photoFile;
    }

    public File setMaxWardrobeMrpPhoto(
            InputStream inputStream,
            MaxWardrobeMrp maxWardrobeMrp)
            throws IOException {

        File photoFile = getMaxWardrobeMrpPhoto(maxWardrobeMrp);
        FileCopyUtils.copy(inputStream, new FileOutputStream(photoFile));
        return photoFile;
    }

    public File getMaxWardrobeMrpPhotoFile(MaxWardrobeMrp maxWardrobeMrp) throws IOException {
        File maxWardrobeMrpDir = attachmentUtils.getDirectoryByAttachmentTypeAndEntityId(AttachmentType.MAX_WARDROBE_MRP, maxWardrobeMrp.getId(), true);
        return new File(maxWardrobeMrpDir, PHOTO_FILE_NAME);
    }
    /////////////////////////////////////////////////////////////
    
    public File getMaxKitchenPhoto(MaxKitchen maxKitchen) throws FileNotFoundException, IOException {
        if (maxKitchen.getImage() != null) {
            PHOTO_FILE_NAME = maxKitchen.getImage().get(0).toString();
        }
        File photoFile = getMaxKitchenPhotoFile(maxKitchen);
        return photoFile;
    }

    public File setMaxKitchenPhoto(
            InputStream inputStream,
            MaxKitchen maxKitchen)
            throws IOException {

        File photoFile = getMaxKitchenPhoto(maxKitchen);
        FileCopyUtils.copy(inputStream, new FileOutputStream(photoFile));
        return photoFile;
    }

    public File getMaxKitchenPhotoFile(MaxKitchen maxKitchen) throws IOException {
        File maxKitchenDir = attachmentUtils.getDirectoryByAttachmentTypeAndEntityId(AttachmentType.MAX_KITCHEN, maxKitchen.getId(), true);
        return new File(maxKitchenDir, PHOTO_FILE_NAME);
    }
    ////////////////////////////////////////////////////////////
    public File getMaxKitchenMrpPhoto(MaxKitchenMrp maxKitchenMrp) throws FileNotFoundException, IOException {
        if (maxKitchenMrp.getImage() != null) {
            PHOTO_FILE_NAME = maxKitchenMrp.getImage().get(0).toString();
        }
        File photoFile = getMaxKitchenMrpPhotoFile(maxKitchenMrp);
        return photoFile;
    }

    public File setMaxKitchenMrpPhoto(
            InputStream inputStream,
            MaxKitchenMrp maxKitchenMrp)
            throws IOException {

        File photoFile = getMaxKitchenMrpPhoto(maxKitchenMrp);
        FileCopyUtils.copy(inputStream, new FileOutputStream(photoFile));
        return photoFile;
    }

    public File getMaxKitchenMrpPhotoFile(MaxKitchenMrp maxKitchenMrp) throws IOException {
        File maxKitchenDir = attachmentUtils.getDirectoryByAttachmentTypeAndEntityId(AttachmentType.MAX_KITCHEN_MRP, maxKitchenMrp.getId(), true);
        return new File(maxKitchenDir, PHOTO_FILE_NAME);
    }
    
    ////////////////////////////////////////////////////////////
    public File getUltimaWardrobePhoto(UltimaWardrobe ultimaWardrobe) throws FileNotFoundException, IOException {
        if (ultimaWardrobe.getImage() != null) {
            PHOTO_FILE_NAME = ultimaWardrobe.getImage().get(0).toString();
        }
        File photoFile = getUltimaWardrobePhotoFile(ultimaWardrobe);
        return photoFile;
    }

    public File setUltimaWardrobePhoto(
            InputStream inputStream,
            UltimaWardrobe ultimaWardrobe)
            throws IOException {

        File photoFile = getUltimaWardrobePhoto(ultimaWardrobe);
        FileCopyUtils.copy(inputStream, new FileOutputStream(photoFile));
        return photoFile;
    }

    public File getUltimaWardrobePhotoFile(UltimaWardrobe ultimaWardrobe) throws IOException {
        File ultimaWardrobeDir = attachmentUtils.getDirectoryByAttachmentTypeAndEntityId(AttachmentType.ULTIMA_WARDROBE, ultimaWardrobe.getId(), true);
        return new File(ultimaWardrobeDir, PHOTO_FILE_NAME);
    }
}
