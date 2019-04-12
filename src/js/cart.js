require(["require.config"],function(){
	require(["jquery","footer","template","modelFrame"],function($,footer,template,modelFrame){
		new footer();
		class Cart{
            constructor(){
				this.init();
				this.settle();
				this.model();
			}
			init(){
				this.n=0;
				this.cart=localStorage.getItem("cart");
				if(this.cart && JSON.parse(this.cart).length!=0){//如果本地缓存存在
					$("#static").hide();
					$("#cartList").show();
					this.template().then(()=>{//本地加载完后执行绑定操作
						this.entrust();
						this.totalPrice();
						this.aCheck();
						this.allCheck();
						this.aDel();
						this.allDel();
						})
				}else{
					$("#static").show();
					$("#cartList").hide();
				}
			}
			template(){//渲染本地数据到页面中
				  this.cart=localStorage.getItem("cart");
			    return	new Promise(resolve=>{//异步执行
					let	list=JSON.parse(this.cart);
					var html=template("myCart",{list});
					$("#cartList").append(html);
                    resolve();
					})
			}
			entrust(){//+-事件委托
				$("#cartList").on("click",".plus",e=>{//+按钮
					let cart=localStorage.getItem("cart");
					var target=e.target;
					let tr=target.parentNode.parentNode.parentNode;
					cart=JSON.parse(cart);
					let ul=target.parentNode.parentNode.parentNode;
					cart.some((item,index)=>{
						this.index=index;
					  return item.id==ul.getAttribute("data-id");
				   })
				   cart[this.index].num=++ul.querySelector(".nums").value;;//缓存+1//文本+1
				   tr.querySelector(".sum").innerHTML=tr.querySelector(".nums").value*tr.querySelector(".price").innerHTML;
				   localStorage.setItem("cart",JSON.stringify(cart));
				   this.totalPrice();
				})

				$("#cartList").on("click",".minus",e=>{//-按钮
					this.cart=localStorage.getItem("cart");
					var target=e.target;
					let tr=target.parentNode.parentNode.parentNode;
					this.cart=JSON.parse(this.cart);
					let ul=target.parentNode.parentNode.parentNode;
					this.cart.some((item,index)=>{
						this.index=index;
					  return item.id==ul.getAttribute("data-id");
				   })
				   if(--ul.querySelector(".nums").value < 1){
					ul.querySelector(".nums").value=0;
						$(target.parentNode.parentNode.parentNode).find(".aDel").trigger("click")
				   }
				   this.cart[this.index].num=ul.querySelector(".nums").value;//缓存+1//文本+1
				   tr.querySelector(".sum").innerHTML=tr.querySelector(".nums").value*tr.querySelector(".price").innerHTML;
				localStorage.setItem("cart",JSON.stringify(this.cart));
				    this.totalPrice();
				 })
				 
				 $("cartList").on("click","")
			}
			totalPrice(){//总价
				let sum=0;
				for(let i=0;i<$(".sum").length;i++){
					if($(".aCheck")[i].checked){
						sum+=parseInt($(".sum")[i].innerText);
					}
				}
				$("#totalPrice").html(sum);
				$("#totalNum").html(this.n);
			}
			aCheck(){//绑定单选
				$("#cartList").on("click",".aCheck",e=>{
					 if(e.target.checked){
						 this.n++;
					 }else{
						 this.n--;
					 }
					 if(this.n==$(".aCheck").length){
						 $(".allCheck").each((index,item)=>{
                    item.checked=true;
						 })
					 }else{
						$(".allCheck").each((index,item)=>{
							item.checked=false;
			         })
					 }
					 this.totalPrice();
				 })
			}
			allCheck(){//全选
        $("#cartList").on("click",".allCheck:eq(0)",()=>{//绑定第一个全选
					let judge=$(".allCheck")[0].checked;
					this.n=judge?$(".aCheck").length:0;
					$(".aCheck").each((index,ele)=>{
						ele.checked=judge;
					})
					$(".allCheck")[1].checked=judge;
				this.totalPrice();
				})
				$("#cartList").on("click",".allCheck:eq(1)",()=>{//绑定第二个全选
					let judge=$(".allCheck")[1].checked;
					this.n=judge?$(".aCheck").length:0;
					$(".aCheck").each((index,ele)=>{
						ele.checked=judge;
					})
					$(".allCheck")[0].checked=judge;
				this.totalPrice();
				})
			}
			aDel(){//单行删除
        $("#cartList").on("click",".aDel",e=>{
					let ul=e.target.parentNode.parentNode.parentNode;
					let storage=JSON.parse(localStorage.getItem("cart"));
					if(confirm("你确定删除吗？")){
						ul.remove();
						if(storage.some((item,index) => {
							this.index=index;
							return item.id==ul.getAttribute("data-id");
						})){
							storage.splice(this.index,1);
							localStorage.setItem("cart",JSON.stringify(storage));
							this.cartShow();
						}
					}
					this.n--;
					//同时删除本地缓存
				});
			}
			allDel(){//多行删除
        $("#allDel").on("click",()=>{
					if(confirm("你确定删除吗？")){
						let storage=JSON.parse(localStorage.getItem("cart"));
						for(let i=$(".aCheck").length-1;i>=0;i--){
							if($(".aCheck")[i].checked){
								$(".aCheck")[i].parentNode.parentNode.parentNode.remove();
								storage.splice(i,1);
							}
						}
						localStorage.setItem("cart",JSON.stringify(storage));
						this.cartShow();
					}
				})
			}
			cartShow(){//购物车删完后
				this.cart=localStorage.getItem("cart");
				if(JSON.parse(this.cart).length==0){//如果本地缓存不存在,或者缓存数组为空，删除缓存
					$("#static").show();
					$("#cartList").hide();
					localStorage.removeItem("cart");
				}
			}
			settle(){
				$(".settle").on("click",()=>{
					if(localStorage.getItem("login")){
						location.href="/html/settle.html"
					}else{
						alert("你还未登录")
					}
				})
			}
			model(){//插入登录模态框
				new modelFrame(".welcome");
			}
		}
		new Cart();
	})
})
