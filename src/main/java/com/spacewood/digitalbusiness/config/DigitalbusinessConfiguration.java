/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.config;

import com.mchange.v2.c3p0.ComboPooledDataSource;
import com.spacewood.digitalbusiness.user.Role;
import java.beans.PropertyVetoException;
import java.io.IOException;
import java.util.Properties;
import javax.sql.DataSource;
import org.springframework.beans.factory.annotation.Value;
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

    @Value("${digitalbusiness.db.driver_class}")
    private String driverClassname;

    @Value("${digitalbusiness.db.connection_string}")
    private String connectionString;
    
    @Bean
    public DataSource dataSource() throws PropertyVetoException {
        Properties mysqlProperties = new Properties();
        mysqlProperties.setProperty("characterEncoding", "UTF-8");
        mysqlProperties.setProperty("useUnicode", "true");

        ComboPooledDataSource cpds = new ComboPooledDataSource();
        cpds.setProperties(mysqlProperties);
        cpds.setDriverClass(driverClassname);
        cpds.setJdbcUrl(connectionString);
        cpds.setAcquireIncrement(2);
        return cpds;
    }

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
