<?php
  header('Access-Control-Allow-Origin:*');
  header('Access-Control-Allow-Methods: POST');
  header('Access-Control-Max-Age: 1000');
  include("db.php");

  $user=$_POST["user"];
  $psw=$_POST["psw"];//接收参数
  $jSql="select username from users where username='$user'";//判断注册账号是否存在；
  $judge=mysql_query($jSql);
  $count=mysql_num_rows($judge);//得到资源行数
  
  if($count==0){//如果账号不存在，则插入
  	$sql="insert into users (username,password) values ('$user','$psw')";//插入到数据库，返回布尔值。
    $res=mysql_query($sql);
    if($res>0){
      echo json_encode(array("res_code"=>"1","res_message"=>"注册成功"));
    }else{
      echo json_encode(array("res_code"=>"0","res_message"=>"注册失败"));
    }
  }else{//如果账号已存在。
    echo json_encode(array("res_code"=>"2","res_message"=>"账号已存在"));
  }
?>