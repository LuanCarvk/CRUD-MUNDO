<?php
session_start();
include_once("connect.php");

// Buscar países
$sql_paises = "SELECT * FROM paises";
$res_paises = $con->query($sql_paises);

$paises = [];

while ($pais = $res_paises->fetch_assoc()) {
    $id_pais = $pais["id_pais"];
    
    // Buscar cidades do país
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

// Sua chave da API do Google Maps
$google_maps_api_key = "AIzaSyD1ymgJSOFD9yCS4hoC7hNeU8Km40bbQi0";
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Explorar Países e Cidades</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>

    <!-- Header -->
    <?php include('includes/header.php'); ?>

    <h1 style="padding-top: 5%;">Explorar Países e Cidades</h1>
    <h2>📍 Mapa interativo</h2>

    <div id="map"></div>

    <main>
        <?php if (isset($_SESSION["aviso"])): ?>
            <p><?php echo $_SESSION["aviso"]; unset($_SESSION["aviso"]); ?></p>
        <?php endif; ?>

        <?php if (count($paises) > 0): ?>
            <?php foreach ($paises as $pais): ?>
                <div class="country-card"
                     onclick="moverMapa(<?php echo $pais['latitude'] ?? 'null'; ?>, <?php echo $pais['longitude'] ?? 'null'; ?>, '<?php echo addslashes($pais['nome']); ?>')">

                    <h2><?php echo htmlspecialchars($pais["nome"]); ?></h2>
                    <p><strong>Continente:</strong> <?php echo htmlspecialchars($pais["continente"]); ?></p>
                    <p><strong>População:</strong> <?php echo number_format($pais["populacao"]); ?></p>
                    <p><strong>Idioma:</strong> <?php echo htmlspecialchars($pais["idioma"]); ?></p>

                    <?php if (!empty($pais["cidades"])): ?>
                        <h3>Cidades</h3>
                        <div style="overflow-x:auto;">
                            <table>
                                <tr><th>Cidade</th><th>População</th></tr>
                                <?php foreach ($pais["cidades"] as $cidade): ?>
                                    <tr onclick="moverMapa(<?php echo $cidade['latitude'] ?? 'null'; ?>, <?php echo $cidade['longitude'] ?? 'null'; ?>, '<?php echo addslashes($cidade['nome']); ?>')">
                                        <td><?php echo htmlspecialchars($cidade["nome"]); ?></td>
                                        <td><?php echo number_format($cidade["populacao"]); ?></td>
                                    </tr>
                                <?php endforeach; ?>
                            </table>
                        </div>
                    <?php else: ?>
                        <p><em>Sem cidades cadastradas.</em></p>
                    <?php endif; ?>
                </div>
            <?php endforeach; ?>
        <?php else: ?>
            <p><em>Nenhum país cadastrado.</em></p>
        <?php endif; ?>
    </main>
    
    <!-- Footer -->
    <?php include('includes/footer.php'); ?>

    <script>
        let mapa;
        let marcador;

        function initMap() {
            const inicio = { lat: -23.55052, lng: -46.633308 }; // São Paulo padrão

            mapa = new google.maps.Map(document.getElementById("map"), {
                zoom: 3,
                center: inicio,
            });

            marcador = new google.maps.Marker({
                position: inicio,
                map: mapa,
                title: "São Paulo - SP",
            });
        }

        // Função chamada ao clicar em país ou cidade
        function moverMapa(lat, lng, nome) {
            if (!lat || !lng) {
                alert("Coordenadas não disponíveis para " + nome);
                return;
            }

            const pos = { lat: parseFloat(lat), lng: parseFloat(lng) };
            mapa.setCenter(pos);
            mapa.setZoom(5);

            marcador.setPosition(pos);
            marcador.setTitle(nome);
        }
    </script>

    <!-- Script da API do Google Maps -->
    <script async defer
        src="https://maps.googleapis.com/maps/api/js?key=<?php echo $google_maps_api_key; ?>&callback=initMap">
    </script>

</body>
</html>
