/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.segment;

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
@RequestMapping("/segment")
public class SegmentRest {
    @Autowired
    private SegmentDAL segmentDAL;
    
    @RequestMapping(method = RequestMethod.GET)
    public List<Segment> findAll(@RequestParam(value = "offset", required = false, defaultValue = "0") Integer offset) throws SQLException {
        return segmentDAL.findAll(offset);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Segment findById(@PathVariable("id") Integer id) throws SQLException {
        return segmentDAL.findById(id);
    }
    
    @RequestMapping(method = RequestMethod.POST)
    public Segment insert(@RequestBody Segment segment) {
        return segmentDAL.insert(segment);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.POST)
    public Segment update(@RequestBody Segment segment) {
        return segmentDAL.update(segment);
    }

//    @RolesAllowed("ROLE_SUPER_ADMIN")
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable("id") Integer id) throws Exception {
        segmentDAL.delete(id);
    }

    @RequestMapping(value = "/find/segment", method = RequestMethod.GET)
    public Segment findBySegment(@RequestParam("segment") String segment) throws Exception {
        return segmentDAL.findBySegment(segment);
    }
    
    @RequestMapping(value = "/find/segment_like", method = RequestMethod.GET)
    public List<Segment> findBySegmentLike(@RequestParam("segment") String segment) {
        return segmentDAL.findBySegmentLike(segment);
    }
    
    @RequestMapping(value = "/find_all_list", method = RequestMethod.GET)
    public List<Segment> findAllList() {
        return segmentDAL.findAllList();
    }
}
