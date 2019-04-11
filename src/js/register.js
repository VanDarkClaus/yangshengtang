//业务逻辑代码
require(["require.config"],function(){
    require(["jquery","header","footer","url","yzmmode"],function($,header,footer,url,yzmmode){
      new header();
      new footer();

      class Register{
			constructor(){
				$("#reg").hide();
				this.footer();
				this.telChange();
				this.pswChange();
				this.samePsw();
				this.regBtn();
			}
			footer(){//插入尾部
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
			telChange(){//电话框改变
				$("#tel").on("keyup",()=>{
					this.regTel();
				})
			}
			pswChange(){//密码框改变
				$("#psw11").on("keyup",()=>{
					this.rePsw($("#psw11"));
				})
				$("#psw12").on("keyup",()=>{
					this.rePsw($("#psw12"));
				})
			}
			samePsw(){//验证相同密码
				$("#psw12").on("keyup",()=>{
					if($("#psw11").val()==$("#psw12").val()){
						$("#reg")[0].innerHTML="";
						$("#reg").hide();
					}else{
						$("#reg").show();
						$("#reg")[0].innerHTML="两次密码不同";
					}
				})
			}
			regBtn(){//注册提交
				$("#regBtn").on("click",()=>{
						if($("#agree")[0].checked && $("#reg")[0].style.display=="none" && $("#yzm").val()!=""){//不在弹出错误框和选中协议
								 $.ajax({
									 type:"POST",
									 url:url.phpUrl+"register.php",
									 data:{user:$("#tel").val(),psw:$("#psw11").val()},
								   dataType:'json',
									 success:res=>{
										 alert(res.res_message);
                      if(res.res_code==1){
												location.href="/html/login.html";
												//存本地缓存
												localStorage.setItem("register",JSON.stringify({user:$("#tel").val(),psw:$("#psw11").val()}))
											}
									 }
								 })

						}
					})
			}
		}
		new Register();
	})
})