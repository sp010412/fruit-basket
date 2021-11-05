---- CREATE DATABASE fruit_basket;

create table Fruits (
    id serial not null primary key,
    fruit_type VARCHAR(10) NOT NULL,
    qty int,
    price int
    );
