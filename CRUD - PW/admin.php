<?php
session_start();
include_once("connect.php");

if (!isset($_SESSION["adm"])) {
    header("location: login.php");
    exit();
}

$destacarPais = null;

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['acao']) && $_POST['acao'] == 'r') {
    $id_pais = $_POST['id_pais'] ?? null;

    // Consulta por ID do país
    if ($id_pais) {
        $sql = "SELECT * FROM paises WHERE id_pais = '$id_pais'";
        $res = $con->query($sql);

        if ($res && $res->num_rows > 0) {
            // Encontrou o país, armazenamos o país para destacar
            $destacarPais = $res->fetch_assoc();
        } else {
            $_SESSION["aviso"] = "País não encontrado!";
        }
    }
}

?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Painel do Administrador</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>

    <!-- Cabeçalho -->
    <?php include('includes/header.php'); ?>

    <main>
        <h1>Painel do Administrador</h1>

        <?php
        if (isset($_SESSION["aviso"])) {
            echo "<p>" . $_SESSION["aviso"] . "</p>";
            unset($_SESSION["aviso"]);
        }
        ?>

        <div class="admin-container">
            <div class="form-container">
                <h2>Gerenciar Países</h2>
                <form name="f" id="f" method="post" action="admin.php">

                    <input type="number" name="id_pais" placeholder="ID do País" required><br>

                    <input type="text" name="nome" placeholder="Nome do País" required><br>
                    <input type="text" name="continente" placeholder="Continente" required><br>
                    <input type="number" name="populacao" placeholder="População" required><br>
                    <input type="text" name="idioma" placeholder="Idioma" required><br>

                    <input type="hidden" name="acao" id="acao"><br>

                    <input type="button" value="Criar" onclick="submeterForm('c')">
                    <input type="button" value="Consultar" onclick="submeterForm('r')">
                    <input type="button" value="Atualizar" onclick="submeterForm('u')">
                    <input type="button" value="Deletar" onclick="submeterForm('d')">
                </form>
            </div>

            <!-- Exibição dos países cadastrados -->
            <div class="table-container">
                <h2>Países Cadastrados</h2>
                <?php
                // Consulta para exibir todos os países cadastrados
                $sql = "SELECT * FROM paises";
                $res = $con->query($sql);

                if ($res && $res->num_rows > 0) {
                    echo "<table>";
                    echo "<tr><th>ID</th><th>Nome</th><th>Continente</th><th>População</th><th>Idioma</th></tr>";
                    while ($campo = $res->fetch_assoc()) {
                        // Verificar se o país é o que foi encontrado
                        $isHighlighted = ($destacarPais && $campo['id_pais'] == $destacarPais['id_pais']) ? 'class="highlight"' : '';
                        
                        echo "<tr $isHighlighted>";
                        echo "<td>{$campo['id_pais']}</td>";
                        echo "<td>{$campo['nome']}</td>";
                        echo "<td>{$campo['continente']}</td>";
                        echo "<td>" . number_format($campo['populacao']) . "</td>";
                        echo "<td>{$campo['idioma']}</td>";
                        echo "</tr>";
                    }
                    echo "</table>";
                } else {
                    echo "<p>Nenhum país encontrado.</p>";
                }
                ?>
            </div>
        </div>

        <br>
        <a href="index.php">Voltar</a>
    </main>

    <footer>
        Loja Virtual - Desenvolvido por Luan Carvalho
    </footer>

    <script>
        function submeterForm(acao) {
            document.getElementById('acao').value = acao;
            document.getElementById('f').submit();
        }
    </script>

</body>
</html>
