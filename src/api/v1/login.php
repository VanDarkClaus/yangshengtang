<?php
  header('Access-Control-Allow-Origin:*');
  header('Access-Control-Allow-Methods: POST');
  header('Access-Control-Max-Age: 1000');
  include("db.php");
  $user=$_POST["user"];
  $psw=$_POST["psw"];
  $sql="select * from users where username='$user' and password='$psw'";
  $res=mysql_query($sql);
  $count=mysql_num_rows($res);//获取返回值；
  if($count>0){
    echo json_encode(array("res_code"=>"1","res_message"=>"登录成功"));
  }else{
    echo json_encode(array("res_code"=>"0","res_message"=>"账号或者密码错误"));
  }
?>