/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.department;

import java.sql.SQLException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author webdesign
 */
@RestController
@RequestMapping("/department")
public class DepartmentRest {
    @Autowired
    private DepartmentDAL departmentDAL;
    
    @RequestMapping(method = RequestMethod.GET)
    public List<Department> findAll(@RequestParam(value = "offset", required = false, defaultValue = "0") Integer offset) throws SQLException {
        return departmentDAL.findAll(offset);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Department findById(@PathVariable("id") Integer id) throws SQLException {
        return departmentDAL.findById(id);
    }
    
    @RequestMapping(method = RequestMethod.POST)
    public Department insert(@RequestBody Department department) {
        return departmentDAL.insert(department);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.POST)
    public Department update(@RequestBody Department department) {
        return departmentDAL.update(department);
    }

//    @RolesAllowed("ROLE_SUPER_ADMIN")
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable("id") Integer id) throws Exception {
        departmentDAL.delete(id);
    }
    
    @RequestMapping(value = "/find/name", method = RequestMethod.GET)
    public Department findByName(@RequestParam("name") String name) throws Exception {
        return departmentDAL.findByName(name);
    }
    
    @RequestMapping(value = "/find/name_like", method = RequestMethod.GET)
    public List<Department> findByNameLike(@RequestParam("name") String name) {
        return departmentDAL.findByNameLike(name);
    }
    
    @RequestMapping(value = "/find_all_list", method = RequestMethod.GET)
    public List<Department> findAllList() {
        return departmentDAL.findAllList();
    }
        
}
