<?php
session_start();
include_once("connect.php");

if (isset($_POST["usuario"]) && isset($_POST["senha"])) {
	$usuario = $_POST["usuario"];
	$senha = $_POST["senha"];

	$stmt = $con->prepare("SELECT * FROM administradores WHERE usuario=?");
	$stmt->bind_param("s", $usuario);
	$stmt->execute();
	$res = $stmt->get_result();

	if ($res->num_rows > 0) {
		$row = $res->fetch_assoc();
		if (password_verify($senha, $row['senha'])) {
			$_SESSION["adm"] = $usuario;
			header("location: admin.php");
			exit();
		} else {
			$erro = "Usuário ou senha inválidos.";
		}
	} else {
		$erro = "Usuário ou senha inválidos.";
	}
}
?>

<?php include('includes/header.php'); ?>
<main>
	<h2>Login - Administrador</h2>
	<form method="POST" action="">
		<input type="text" name="usuario" placeholder="Usuário" required><br>
		<input type="password" name="senha" placeholder="Senha" required><br>
		<input type="submit" value="Entrar">
	</form>
	<?php if (isset($erro))
		echo "<p style='color:red;'>" . htmlspecialchars($erro) . "</p>"; ?>
	<br>
</main>
<?php include('includes/footer.php'); ?>