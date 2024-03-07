package io.studerd.api.common.entity;

import lombok.Data;

@Data
public class ApiResponse {
    public boolean result;
    public Object data;
    public String code;

    public ApiResponse(boolean result, Object data, String code) {
        this.result = result;
        this.data = data;
        this.code = code;
    }
}