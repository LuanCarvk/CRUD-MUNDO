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

-- administradores
create table if not exists administradores (
    id int auto_increment primary key,
    usuario varchar(255) not null unique,
    senha varchar(255) not null
);

insert into administradores (usuario, senha) values ('admin', '$2y$10$V02AVAXl9Wa2QE3XY2jW3.aNvG8gKC8RBKY6ZDuH82m2naBgBa4lq');

-- Inserindo países
INSERT INTO paises (nome, continente, populacao, idioma) VALUES 
('Brasil', 'América do Sul', 215000000, 'Português'),
('Estados Unidos', 'América do Norte', 331000000, 'Inglês'),
('Japão', 'Ásia', 125800000, 'Japonês'),
('Alemanha', 'Europa', 83200000, 'Alemão'),
('Nigéria', 'África', 206000000, 'Inglês');

-- Inserindo cidades
INSERT INTO cidades (nome, populacao, pais_id) VALUES 
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