drop database if exists bd_mundo;
create database bd_mundo;
use bd_mundo;

create table paises (
	id_pais int primary key auto_increment,
	nome varchar(100) unique not null,
	continente varchar(50) not null,
	populacao int(100) not null,
	idioma varchar(50) not null
);

create table cidades (
	id_cidade int primary key auto_increment,
	nome varchar(100) unique not null,
	populacao int(100) not null,
	pais_id int,
	foreign key (pais_id) references paises(id_pais)
);

create table if not exists administradores (
	id int auto_increment primary key,
	usuario varchar(255) not null unique,
	senha varchar(255) not null
);

alter table paises add column latitude decimal(10,6);
alter table paises add column longitude decimal(10,6);

insert into administradores (usuario, senha) values ('admin', '$2y$10$V02AVAXl9Wa2QE3XY2jW3.aNvG8gKC8RBKY6ZDuH82m2naBgBa4lq');

insert into paises (nome, continente, populacao, idioma, latitude, longitude) values
('Brasil', 'América do Sul', 215000000, 'Português', -14.235004, -51.925280),
('Estados Unidos', 'América do Norte', 331000000, 'Inglês', 37.090240, -95.712891),
('Japão', 'Ásia', 125800000, 'Japonês', 36.204824, 138.252924),
('Alemanha', 'Europa', 83200000, 'Alemão', 51.165691, 10.451526),
('Nigéria', 'África', 206000000, 'Inglês', 9.082000, 8.675277);

insert into cidades (nome, populacao, pais_id) values 
('São Paulo', 12300000, 1),
('Rio de Janeiro', 6748000, 1),
('New York', 8419000, 2),
('Los Angeles', 3980000, 2),
('Tóquio', 13960000, 3),
('Osaka', 2715000, 3),
('Berlim', 3769000, 4),
('Hamburgo', 1841000, 4),
('Lagos', 14000000, 5),
('Abuja', 1236000, 5);

select * from cidades;
