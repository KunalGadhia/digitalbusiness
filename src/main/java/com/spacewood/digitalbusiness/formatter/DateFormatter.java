/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spacewood.digitalbusiness.formatter;

import java.text.ParseException;
import java.util.Date;
import java.util.Locale;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.format.Formatter;

/**
 *
 * @author hp-pc
 */
public class DateFormatter implements Formatter<Date> {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Override
    public String print(Date t, Locale locale) {
        logger.info("PRINTING: " + t);
        return Long.toString(t.getTime());
    }

    @Override
    public Date parse(String string, Locale locale) throws ParseException {
        logger.info("PARSING: " + string);
        long millis = Long.valueOf(string);
        Date date = new Date(millis);
        logger.debug("Converting......{} to {}", string, date);
        return date;
    }
}
