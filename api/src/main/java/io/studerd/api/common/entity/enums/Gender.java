package io.studerd.api.common.entity.enums;

public enum Gender {
    MALE("MALE"),
    FEMALE("FEMALE"),
    OTHER("OTHER");
    private final String label;

    Gender(String label) {
        this.label = label;
    }

    public String label(){
        return this.label;
    }
}
