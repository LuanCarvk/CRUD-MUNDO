<?php
session_start();
include_once("connect.php");

$sql_paises = "SELECT * FROM paises";
$res_paises = $con->query($sql_paises);

$paises = [];

while ($pais = $res_paises->fetch_assoc()) {
    $id_pais = $pais["id_pais"];
    
    // Obtendo cidades para cada país
    $sql_cidades = "SELECT * FROM cidades WHERE pais_id = $id_pais";
    $res_cidades = $con->query($sql_cidades);
    
    $cidades = [];
    while ($cidade = $res_cidades->fetch_assoc()) {
        $cidades[] = $cidade;
    }
    
    $pais["cidades"] = $cidades;
    $paises[] = $pais;
}

$con->close();
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lista de Países e Cidades</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>

    <!-- Header -->
    <?php include('includes/header.php'); ?>

    <main>
        <h1>Explorar Países e Cidades</h1>

        <?php if (isset($_SESSION["aviso"])): ?>
            <p><?php echo $_SESSION["aviso"]; unset($_SESSION["aviso"]); ?></p>
        <?php endif; ?>

        <?php if (count($paises) > 0): ?>
            <?php foreach ($paises as $pais): ?>
                <div class="country-card">
                    <h2><?php echo $pais["nome"]; ?></h2>
                    <div class="country-info">
                        <p><strong>Continente:</strong> <?php echo $pais["continente"]; ?></p>
                        <p><strong>População:</strong> <?php echo number_format($pais["populacao"]); ?></p>
                        <p><strong>Idioma:</strong> <?php echo $pais["idioma"]; ?></p>
                    </div>

                    <?php if (!empty($pais["cidades"])): ?>
                        <h3>Cidades</h3>
                        <table>
                            <tr><th>Cidade</th><th>População</th></tr>
                            <?php foreach ($pais["cidades"] as $cidade): ?>
                                <tr>
                                    <td><?php echo $cidade["nome"]; ?></td>
                                    <td><?php echo number_format($cidade["populacao"]); ?></td>
                                </tr>
                            <?php endforeach; ?>
                        </table>
                    <?php else: ?>
                        <p><em>Sem cidades cadastradas.</em></p>
                    <?php endif; ?>
                </div>
            <?php endforeach; ?>
        <?php else: ?>
            <p><em>Nenhum país cadastrado.</em></p>
        <?php endif; ?>

    </main>

    <a href="login.php" style="align-self: center; padding-bottom: 50px;">Área do Administrador</a>
    
    <!-- Footer -->
    <?php include('includes/footer.php'); ?>

</body>
</html>
