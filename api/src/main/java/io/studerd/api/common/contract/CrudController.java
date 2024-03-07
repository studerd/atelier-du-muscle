package io.studerd.api.common.contract;

import io.studerd.api.common.entity.ApiResponse;

public interface CrudController<ID, CREATE, UPDATE> {
    ApiResponse list();

    ApiResponse detail(ID id);

    ApiResponse create(CREATE payload);

    ApiResponse update(UPDATE payload);

    ApiResponse delete(ID id);
}
