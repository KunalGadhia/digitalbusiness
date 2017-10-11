/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.config;

import com.spacewood.digitalbusiness.user.Role;
import java.io.IOException;
import org.springframework.beans.factory.config.PropertyPlaceholderConfigurer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ResourceLoader;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.security.access.hierarchicalroles.RoleHierarchy;
import org.springframework.security.access.hierarchicalroles.RoleHierarchyImpl;

/**
 *
 * @author hp-pc
 */
@Configuration
@ComponentScan(basePackages = "com.spacewood.digitalbusiness")
public class DigitalbusinessConfiguration {

    @Bean
    public static PropertyPlaceholderConfigurer getPropertyPlaceholderConfigurer() throws IOException {
        PropertyPlaceholderConfigurer ppc = new PropertyPlaceholderConfigurer();
        ResourceLoader resourceLoader = new PathMatchingResourcePatternResolver();
        ppc.setLocations(
                resourceLoader.getResource(System.getProperty("DIGITALBUSINESS_CONFIGURATION_FILE")));
        return ppc;
    }

    @Bean
    public static RoleHierarchy roleHierarchy() {

        String roleHierarchyStringRepresentation
                = Role.ROLE_ADMIN + " > " + Role.ROLE_DEALER;

        //logger.info("Registered Role Hierarchy: \n{}", roleHierarchyStringRepresentation);
        RoleHierarchyImpl roleHierarchy = new RoleHierarchyImpl();
        roleHierarchy.setHierarchy(roleHierarchyStringRepresentation);
        return roleHierarchy;
    }

}
