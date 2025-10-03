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
    header("Location: " . $_SERVER['HTTP_REFERER']);
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
    header("Location: " . $_SERVER['HTTP_REFERER']);
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
    header("Location: " . $_SERVER['HTTP_REFERER']);
    exit;
}

// READ (Consultar)
if ($acao == "r") {
    if (!empty($id_pais)) {
        // Buscar o país no banco
        $sql = "SELECT * FROM paises WHERE id_pais='$id_pais'";
        $res = $con->query($sql);
        
        if ($res && $res->num_rows > 0) {
            $pais = $res->fetch_assoc();
            // Preenche os campos do formulário com as informações do país encontrado
            $nome = $pais["nome"];
            $continente = $pais["continente"];
            $populacao = $pais["populacao"];
            $idioma = $pais["idioma"];
            $_SESSION["aviso"] = "País encontrado!";
        } else {
            $_SESSION["aviso"] = "País não encontrado!";
        }
    } else {
        $_SESSION["aviso"] = "ID do país não fornecido!";
    }
    header("Location: " . $_SERVER['HTTP_REFERER']);
    exit;
}

$con->close();
?>
