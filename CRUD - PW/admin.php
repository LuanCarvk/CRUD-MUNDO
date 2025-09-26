<?php
session_start();
include_once("connect.php");

if (!isset($_SESSION["adm"])) {
    header("location: login.php");
    exit();
}
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Área do Administrador</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <?php include('includes/header.php'); ?>

    <main>
        <h1>Painel do Administrador</h1>

        <?php
        if (isset($_SESSION["aviso"])) {
            echo "<p>" . $_SESSION["aviso"] . "</p>";
            unset($_SESSION["aviso"]);
        }
        ?>

        <!-- Formulário -->
        <form name="f" id="f" method="post" action="crud.php" class="form">
            <input type="hidden" name="acao" id="acao">

            <input type="number" name="id_pais" placeholder="ID do País"><br>
            <input type="text" name="nome" placeholder="Nome do País"><br>
            <input type="text" name="continente" placeholder="Continente"><br>
            <input type="number" name="populacao" placeholder="População"><br>
            <input type="text" name="idioma" placeholder="Idioma"><br>

            <input type="button" value="Criar" onclick="submeterForm('c')">
            <input type="button" value="Consultar" onclick="submeterForm('r')">
            <input type="button" value="Atualizar" onclick="submeterForm('u')">
            <input type="button" value="Deletar" onclick="submeterForm('d')">
        </form>
        <br>

        <!-- Resultado da consulta -->
        <?php
        if (isset($_SESSION["resultado_consulta"])) {
            $pais = $_SESSION["resultado_consulta"];
            echo "<h2>Resultado da Consulta</h2>";
            echo "<table>";
            echo "<tr><th>ID</th><th>Nome</th><th>Continente</th><th>População</th><th>Idioma</th></tr>";
            echo "<tr>";
            echo "<td>{$pais['id_pais']}</td>";
            echo "<td>{$pais['nome']}</td>";
            echo "<td>{$pais['continente']}</td>";
            echo "<td>" . number_format($pais['populacao'], 0, ',', '.') . "</td>";
            echo "<td>{$pais['idioma']}</td>";
            echo "</tr>";
            echo "</table>";
            unset($_SESSION["resultado_consulta"]);
        }
        ?>

        <!-- Lista de todos os países -->
        <h2>Países Cadastrados</h2>
        <?php
        $sql = "SELECT * FROM paises ORDER BY nome";
        $res = $con->query($sql);

        if ($res && $res->num_rows > 0) {
            echo "<table>";
            echo "<tr><th>ID</th><th>Nome</th><th>Continente</th><th>População</th><th>Idioma</th></tr>";
            while ($pais = $res->fetch_assoc()) {
                echo "<tr>";
                echo "<td>{$pais['id_pais']}</td>";
                echo "<td>{$pais['nome']}</td>";
                echo "<td>{$pais['continente']}</td>";
                echo "<td>" . number_format($pais['populacao'], 0, ',', '.') . "</td>";
                echo "<td>{$pais['idioma']}</td>";
                echo "</tr>";
            }
            echo "</table>";
        } else {
            echo "<p>Nenhum país cadastrado.</p>";
        }
        ?>
        <br>

        <a href="logout.php">Sair do Sistema</a> | 
        <a href="index.php">Voltar para Página Inicial</a>
    </main>

    <?php include('includes/footer.php'); ?>

    <script>
        function submeterForm(acao) {
            document.getElementById('acao').value = acao;
            document.getElementById('f').submit();
        }
    </script>
</body>
</html>
