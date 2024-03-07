create table if not exists address
(
    address_id uuid not null
        primary key,
    complement varchar(255),
    country    varchar(255),
    cp         varchar(255),
    road       varchar(255),
    town       varchar(255)
);

create table if not exists profile
(
    profile_id           uuid    not null
        primary key,
    creator_code         varchar(255),
    creator_code_is_used boolean not null,
    firstname            varchar(255),
    gender               smallint,
    lastname             varchar(255),
    phone                varchar(255),
    address_id_fk        uuid
        constraint fk6rsl8aoxgrll8b28edivxiw5
            references address
);
create table if not exists credential
(
    credential_id uuid not null
        primary key,
    actif         boolean,
    password      varchar(255),
    username      varchar(255)
        constraint uk_cy9bwr22tkmr9hl2iecjqcwvg
            unique,
    profile_id_fk uuid
        constraint fkgx3a6oy5r452rfr4cn7tsuq7y
            references profile
);

create table if not exists role
(
    role_id uuid not null
        primary key,
    code    varchar(255),
    name    varchar(255)
);
create table if not exists role_credential
(
    credential_id uuid not null
        constraint fkgdo9owy9akomb0c4dxtrgukwt
            references credential,
    role_id       uuid not null
        constraint fkqewiy26ptmqn2mdnfyutmkbw6
            references role
);

