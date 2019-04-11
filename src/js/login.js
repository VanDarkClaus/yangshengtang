require(["require.config"],function(){
	require(["jquery","header","url","yzmmode"],function($,header,url,yzmmode){
		new header();
		class Login{
			constructor(){
				$("#reg").hide();
				this.footer();
				this.telChange();//账号改变
				this.pswChange();//密码改变
				this.log();
				this.localRegi();//注册缓存存在
			}
			footer(){
				$("#footer").load("/html/module/footer.html .footer3",function(){
				})
			}
			regTel(){//验证电话号码
				let reg=/^1[34578]\d{9}$/;//电话号码正则
					if(reg.test($("#tel").val())){//号码正确，隐藏
						$("#reg")[0].innerHTML="";
						$("#reg").hide();
					}else if(!reg.test($("#tel").val())){//号码错误，显示
						$("#reg").show();
						$("#reg")[0].innerHTML="电话号码错误";
					}
			}
			rePsw(psw){//验证密码
				let reg=/^[0-9a-zA-Z]{6,}$/
				if(reg.test(psw.val())){//号码正确，隐藏
					$("#reg")[0].innerHTML="";
					$("#reg").hide();
				}else if(!reg.test(psw.val())){//号码错误，显示
					$("#reg").show();
					$("#reg")[0].innerHTML="密码错误不符合规范";
				}
			}
			telChange(){//点击账号
				$("#tel").on("keyup",()=>{
					this.regTel();
				})
			}
			pswChange(){//点击密码
				$("#psw").on("keyup",()=>{
					this.rePsw($("#psw"));
				})
			}
			log(){//登录
				$("#loginBtn").on("click",()=>{
					if($("#reg")[0].style.display=="none" && $("#yzm").val()!=""){//不在弹出错误框和验证码不为空
					$.ajax({
						type:"POST",
						url:url.phpUrl+"login.php",
						data:{user:$("#tel").val(),psw:$("#psw").val()},
						dataType:'json',
						success:res=>{
							alert(res.res_message);
							if(res.res_code==1){//登录成功
								if(localStorage.getItem("register")){//本地注册缓存存在
									localStorage.removeItem("register");//删除注册时的缓存
								}
								if($("#agree")[0].checked){//如果记住账号存在
									localStorage.setItem("login",JSON.stringify({user:$("#tel").val(),psw:$("#psw").val()}))//存登录缓存
								}
								location.href="/index.html";
							}
						}
					})
				 }
				})
				}
			localRegi(){
				let register=localStorage.getItem("register"),
				login=localStorage.getItem("login");
				if(register){//如果本地注册缓存存在
					register=JSON.parse(register);
					$("#tel").val(register.user);
					$("#psw").val(register.psw);
				}else if(login){//如果登录缓存存在
					login=JSON.parse(login);
					$("#agree")[0].checked=true;//勾选记住密码按钮
					$("#tel").val(login.user);
					$("#psw").val(login.psw);
				}
			}
		}
		new Login();
	})
})
