create database admshop;
create user admuser with password 'P@ssword' login connection limit -1 superuser ;
grant all privileges  on database admshop to admuser;