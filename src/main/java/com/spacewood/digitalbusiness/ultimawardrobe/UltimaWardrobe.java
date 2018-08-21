/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.ultimawardrobe;

import java.util.List;
import java.util.Objects;

/**
 *
 * @author webdesign
 */
public class UltimaWardrobe {
    private Integer id;
    private Category category;
    private String description;
    private Double width;
    private Double depth;
    private Double height;
    private Double cpPpb;
    private Double cpMdf;
    private Double cpHdf;
    private Double spPvcMem;
    private Double spPc3Melamine;
    private Double spPvcMemrouted;
    private Double spPvcHgmem;
    private Double spAlG55;
    private Double spPvcMatmem;
    private Double spPvcMatglass;
    private Double spPvcGlossGlass;
    private Double hanH100Cd320;
    private Double hanH268Cd336;
    private Double hanF6023Cd320;
    private Double hanF188Cd224;
    private Double hanH17Cd320;
    private List<String> image;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getWidth() {
        return width;
    }

    public void setWidth(Double width) {
        this.width = width;
    }

    public Double getDepth() {
        return depth;
    }

    public void setDepth(Double depth) {
        this.depth = depth;
    }

    public Double getHeight() {
        return height;
    }

    public void setHeight(Double height) {
        this.height = height;
    }

    public Double getCpPpb() {
        return cpPpb;
    }

    public void setCpPpb(Double cpPpb) {
        this.cpPpb = cpPpb;
    }

    public Double getCpMdf() {
        return cpMdf;
    }

    public void setCpMdf(Double cpMdf) {
        this.cpMdf = cpMdf;
    }

    public Double getCpHdf() {
        return cpHdf;
    }

    public void setCpHdf(Double cpHdf) {
        this.cpHdf = cpHdf;
    }

    public Double getSpPvcMem() {
        return spPvcMem;
    }

    public void setSpPvcMem(Double spPvcMem) {
        this.spPvcMem = spPvcMem;
    }

    public Double getSpPc3Melamine() {
        return spPc3Melamine;
    }

    public void setSpPc3Melamine(Double spPc3Melamine) {
        this.spPc3Melamine = spPc3Melamine;
    }

    public Double getSpPvcMemrouted() {
        return spPvcMemrouted;
    }

    public void setSpPvcMemrouted(Double spPvcMemrouted) {
        this.spPvcMemrouted = spPvcMemrouted;
    }

    public Double getSpPvcHgmem() {
        return spPvcHgmem;
    }

    public void setSpPvcHgmem(Double spPvcHgmem) {
        this.spPvcHgmem = spPvcHgmem;
    }

    public Double getSpAlG55() {
        return spAlG55;
    }

    public void setSpAlG55(Double spAlG55) {
        this.spAlG55 = spAlG55;
    }

    public Double getSpPvcMatmem() {
        return spPvcMatmem;
    }

    public void setSpPvcMatmem(Double spPvcMatmem) {
        this.spPvcMatmem = spPvcMatmem;
    }

    public Double getSpPvcMatglass() {
        return spPvcMatglass;
    }

    public void setSpPvcMatglass(Double spPvcMatglass) {
        this.spPvcMatglass = spPvcMatglass;
    }

    public Double getSpPvcGlossGlass() {
        return spPvcGlossGlass;
    }

    public void setSpPvcGlossGlass(Double spPvcGlossGlass) {
        this.spPvcGlossGlass = spPvcGlossGlass;
    }

    public Double getHanH100Cd320() {
        return hanH100Cd320;
    }

    public void setHanH100Cd320(Double hanH100Cd320) {
        this.hanH100Cd320 = hanH100Cd320;
    }

    public Double getHanH268Cd336() {
        return hanH268Cd336;
    }

    public void setHanH268Cd336(Double hanH268Cd336) {
        this.hanH268Cd336 = hanH268Cd336;
    }

    public Double getHanF6023Cd320() {
        return hanF6023Cd320;
    }

    public void setHanF6023Cd320(Double hanF6023Cd320) {
        this.hanF6023Cd320 = hanF6023Cd320;
    }

    public Double getHanF188Cd224() {
        return hanF188Cd224;
    }

    public void setHanF188Cd224(Double hanF188Cd224) {
        this.hanF188Cd224 = hanF188Cd224;
    }

    public Double getHanH17Cd320() {
        return hanH17Cd320;
    }

    public void setHanH17Cd320(Double hanH17Cd320) {
        this.hanH17Cd320 = hanH17Cd320;
    }

    public List<String> getImage() {
        return image;
    }

    public void setImage(List<String> image) {
        this.image = image;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 47 * hash + Objects.hashCode(this.id);
        hash = 47 * hash + Objects.hashCode(this.category);
        hash = 47 * hash + Objects.hashCode(this.description);
        hash = 47 * hash + Objects.hashCode(this.width);
        hash = 47 * hash + Objects.hashCode(this.depth);
        hash = 47 * hash + Objects.hashCode(this.height);
        hash = 47 * hash + Objects.hashCode(this.cpPpb);
        hash = 47 * hash + Objects.hashCode(this.cpMdf);
        hash = 47 * hash + Objects.hashCode(this.cpHdf);
        hash = 47 * hash + Objects.hashCode(this.spPvcMem);
        hash = 47 * hash + Objects.hashCode(this.spPc3Melamine);
        hash = 47 * hash + Objects.hashCode(this.spPvcMemrouted);
        hash = 47 * hash + Objects.hashCode(this.spPvcHgmem);
        hash = 47 * hash + Objects.hashCode(this.spAlG55);
        hash = 47 * hash + Objects.hashCode(this.spPvcMatmem);
        hash = 47 * hash + Objects.hashCode(this.spPvcMatglass);
        hash = 47 * hash + Objects.hashCode(this.spPvcGlossGlass);
        hash = 47 * hash + Objects.hashCode(this.hanH100Cd320);
        hash = 47 * hash + Objects.hashCode(this.hanH268Cd336);
        hash = 47 * hash + Objects.hashCode(this.hanF6023Cd320);
        hash = 47 * hash + Objects.hashCode(this.hanF188Cd224);
        hash = 47 * hash + Objects.hashCode(this.hanH17Cd320);
        hash = 47 * hash + Objects.hashCode(this.image);
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final UltimaWardrobe other = (UltimaWardrobe) obj;
        if (!Objects.equals(this.description, other.description)) {
            return false;
        }
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        if (this.category != other.category) {
            return false;
        }
        if (!Objects.equals(this.width, other.width)) {
            return false;
        }
        if (!Objects.equals(this.depth, other.depth)) {
            return false;
        }
        if (!Objects.equals(this.height, other.height)) {
            return false;
        }
        if (!Objects.equals(this.cpPpb, other.cpPpb)) {
            return false;
        }
        if (!Objects.equals(this.cpMdf, other.cpMdf)) {
            return false;
        }
        if (!Objects.equals(this.cpHdf, other.cpHdf)) {
            return false;
        }
        if (!Objects.equals(this.spPvcMem, other.spPvcMem)) {
            return false;
        }
        if (!Objects.equals(this.spPc3Melamine, other.spPc3Melamine)) {
            return false;
        }
        if (!Objects.equals(this.spPvcMemrouted, other.spPvcMemrouted)) {
            return false;
        }
        if (!Objects.equals(this.spPvcHgmem, other.spPvcHgmem)) {
            return false;
        }
        if (!Objects.equals(this.spAlG55, other.spAlG55)) {
            return false;
        }
        if (!Objects.equals(this.spPvcMatmem, other.spPvcMatmem)) {
            return false;
        }
        if (!Objects.equals(this.spPvcMatglass, other.spPvcMatglass)) {
            return false;
        }
        if (!Objects.equals(this.spPvcGlossGlass, other.spPvcGlossGlass)) {
            return false;
        }
        if (!Objects.equals(this.hanH100Cd320, other.hanH100Cd320)) {
            return false;
        }
        if (!Objects.equals(this.hanH268Cd336, other.hanH268Cd336)) {
            return false;
        }
        if (!Objects.equals(this.hanF6023Cd320, other.hanF6023Cd320)) {
            return false;
        }
        if (!Objects.equals(this.hanF188Cd224, other.hanF188Cd224)) {
            return false;
        }
        if (!Objects.equals(this.hanH17Cd320, other.hanH17Cd320)) {
            return false;
        }
        if (!Objects.equals(this.image, other.image)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "UltimaWardrobe{" + "id=" + id + ", category=" + category + ", description=" + description + ", width=" + width + ", depth=" + depth + ", height=" + height + ", cpPpb=" + cpPpb + ", cpMdf=" + cpMdf + ", cpHdf=" + cpHdf + ", spPvcMem=" + spPvcMem + ", spPc3Melamine=" + spPc3Melamine + ", spPvcMemrouted=" + spPvcMemrouted + ", spPvcHgmem=" + spPvcHgmem + ", spAlG55=" + spAlG55 + ", spPvcMatmem=" + spPvcMatmem + ", spPvcMatglass=" + spPvcMatglass + ", spPvcGlossGlass=" + spPvcGlossGlass + ", hanH100Cd320=" + hanH100Cd320 + ", hanH268Cd336=" + hanH268Cd336 + ", hanF6023Cd320=" + hanF6023Cd320 + ", hanF188Cd224=" + hanF188Cd224 + ", hanH17Cd320=" + hanH17Cd320 + ", image=" + image + '}';
    }
    
}
