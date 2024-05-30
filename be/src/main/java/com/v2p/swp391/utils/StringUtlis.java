package com.v2p.swp391.utils;

public class StringUtlis {
    public static String NameStandardlizing(String name){
        name = name.trim();
        String[] words = name.split("\\s+");
        StringBuilder newName = new StringBuilder();
        for(String word: words){
            if (!word.isEmpty()) {
                word = word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase();
                newName.append(word).append(" ");
            }
        }
        return newName.toString().trim();
    }
}
