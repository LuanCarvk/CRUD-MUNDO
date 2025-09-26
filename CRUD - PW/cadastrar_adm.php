<?php
	session_start();
    
	include_once("connect.php");

	if(!isset($_SESSION["adm"])){
		header("location: login.php");
		exit();
	}

	if(isset($_POST["usuario"]) && isset($_POST["senha"])){
		$usuario = $_POST["usuario"];
		$senha = $_POST["senha"];
		
		$sql = "INSERT INTO administradores (usuario, senha) VALUES ('$usuario', '$senha')";
		$res = $con->query($sql);
		
		$_SESSION["aviso"] = "Administrador cadastrado com sucesso!";
	}

	header("location: admin.php");
?>
