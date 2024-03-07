package io.studerd.api.common.contract;

import java.util.List;

public interface CrudService<ENTITY, ID, CREATE, UPDATE> {
    List<ENTITY> list();

    ENTITY detail(ID id);

    ENTITY create(CREATE payload);

    ENTITY update(UPDATE payload);

    boolean delete(ID id);
}
