
<?php

$user=$_GET["user"];
$pass=$_GET["pass"];

if ($user=="merry"&&$pass=="12345"){
	echo '{"err":0,"msg":"登陆成功"}';
}else{
	echo '{"err":1,"msg":"账号或密码错误"}';
}

?>
