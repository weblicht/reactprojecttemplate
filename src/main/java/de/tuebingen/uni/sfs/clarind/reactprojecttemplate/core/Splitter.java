package de.tuebingen.uni.sfs.clarind.reactprojecttemplate.core;


import org.slf4j.LoggerFactory;


public class Splitter {
    private static final org.slf4j.Logger log = LoggerFactory.getLogger(Splitter.class);

    public String[] split(String input) {
        return input.split("\\s");
    }
}
