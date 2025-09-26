<?php
session_start();
include_once("connect.php");

$acao = $_POST["acao"] ?? '';
$nome = $_POST["nome"] ?? '';
$continente = $_POST["continente"] ?? '';
$populacao = $_POST["populacao"] ?? '';
$idioma = $_POST["idioma"] ?? '';
$id_pais = $_POST["id_pais"] ?? null;

// CREATE
if ($acao == "c") {
    if (empty($nome) || empty($continente) || empty($populacao) || empty($idioma)) {
        $_SESSION["aviso"] = "Todos os campos devem ser preenchidos!";
    } else {
        $sql = "INSERT INTO paises (nome, continente, populacao, idioma) 
                VALUES ('$nome', '$continente', '$populacao', '$idioma')";
        if ($con->query($sql)) {
            $_SESSION["aviso"] = "País cadastrado com sucesso!";
        } else {
            $_SESSION["aviso"] = "Erro ao cadastrar: " . $con->error;
        }
    }
    header("Location: admin.php");
    exit;
}

// READ
if ($acao == "r") {
    if (!empty($id_pais)) {
        $sql = "SELECT * FROM paises WHERE id_pais='$id_pais'";
        $res = $con->query($sql);
        if ($res && $res->num_rows > 0) {
            $_SESSION["resultado_consulta"] = $res->fetch_assoc();
        } else {
            $_SESSION["aviso"] = "Nenhum país encontrado com esse ID.";
        }
    } else {
        $_SESSION["aviso"] = "Informe o ID do país para consultar.";
    }
    header("Location: admin.php");
    exit;
}

// UPDATE
if ($acao == "u") {
    if (empty($id_pais) || empty($nome) || empty($continente) || empty($populacao) || empty($idioma)) {
        $_SESSION["aviso"] = "Todos os campos devem ser preenchidos!";
    } else {
        $sql = "UPDATE paises 
                SET nome='$nome', continente='$continente', populacao='$populacao', idioma='$idioma' 
                WHERE id_pais='$id_pais'";
        $res = $con->query($sql);
        $_SESSION["aviso"] = "País atualizado com sucesso!";
    }
    header("Location: admin.php");
    exit;
}

// DELETE
if ($acao == "d") {
    if (!empty($id_pais)) {
        $sql = "DELETE FROM paises WHERE id_pais='$id_pais'";
        $con->query($sql);
        $_SESSION["aviso"] = "País excluído com sucesso.";
    } else {
        $_SESSION["aviso"] = "ID do país não informado para exclusão.";
    }
    header("Location: admin.php");
    exit;
}

$con->close();
