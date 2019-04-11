define([
	'jquery',
], $=> {
	class Header{
		constructor(){
			this.init().then(()=>{
				this.headClick();
				this.cartNum();
				this.haslogin();//是否已经登录
			});
		}
        init(){
        	return new Promise((resolve,reject)=>{//使用promise执行同步操作
			   $("#header").load("/html/module/header.html",function(){// 回调函数，指的是load加载结束以后执行的代码
				 resolve(); 
			  })
        		
        	})
		  }
        headClick(){//委托点击事件
        	$("header").on("click",".login",()=>{//登录
        		 location.href="/html/login.html";
        		return false;
        	})
        	$("header").on("click",".register",()=>{//注册
        			location.href="/html/register.html";
        		return false;
        	})
        	$("header").on("click",".header-right1",()=>{//头像
        			location.href="/html/login.html";
        		return false;
        	})
        	$("header").on("click",".header-right2",()=>{//购物车
        			location.href="/html/cart.html";
        		return false;
        	})
        	$("header").on("click",".cart",()=>{//购物车
        			location.href="/html/cart.html";
        		return false;
        	})
        	$("header").on("click",".header-img",()=>{//左图片
        			location.href="/index.html";
        		return false;
        	})
        	$("header").on("click",".index",()=>{//主页
        			location.href="/index.html";
        		return false;
        	})
        	$("header").on("click",".shop",()=>{//商城
        			location.href="/html/shop.html";
        		return false;
        	})
		}
		cartNum(){//购物车数量
			let cart=localStorage.getItem("cart");
			if(cart){
			   cart=JSON.parse(cart);
			   $("#cartNum").html(cart.length)//添加购物车数量
			}
		}
		haslogin(){
			let login=localStorage.getItem("login")
			if(login){
				login=JSON.parse(login);
				$("#login22").hide();
				$("#register22").hide();
				$("#hasLogin").show().html(login.user);
			}else{
				$("#login22").show();
				$("#register22").show();
				$("#hasLogin").hide();
			}
		}
	}
return Header;
});