require(["require.config"],function(){
	require(["jquery","header","footer","url","shopItem","addCart"],function($,header,footer,url,shopItem,addCart){
		new header();
		new footer();


		class Shop{
			constructor(){
				this.init();
			}
			init(){
				this.search();
				this.ulHide();
				this.entrustLi();
				this.inputBlur();
				this.addItem().then(()=>{
					setTimeout(()=>{
                        this.addToCart();//添加购物车
					},500)
				}
				)
			}
			addItem(){
				return new Promise((resolve)=>{
					new shopItem($("#shopItem"),url.baseUrl);//插入商品模块,共三个模块
					new shopItem($("#shopItem1"),url.baseUrl);
					new shopItem($("#shopItem2"),url.baseUrl);
					resolve();
				})
			}
			search(){//搜索功能
				$("#search_input").on("keyup",()=>{
					var keyword=$("#search_input").val();
					if(keyword==""){//搜索框内容为空
						$("#search_ul").hide();
					}else{//不为空
						$("#search_ul").show();
						$.ajax({//跨域访问，百度接口
							type:"Get",
							url:"https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?cb=?&wd="+keyword,
							dataType:"jsonp",
							success:res=>{//返回值渲染到页面中
								let ul=$("<ul>");
								res.s.forEach((item)=>{
									$("<li>").html(item).addClass("liClass").appendTo(ul);
								
								})
								$("#search_ul").html(ul);
							}
						})
					}
				})
			}
			entrustLi(){//绑定搜索框后的li,点击改变输入框内容
				$("#mod_search_cont").on("click",".liClass",(e)=>{
					$("#search_input").val(e.target.innerHTML);
				})
			}
			ulHide(){//ul消失
                document.onclick=function(){
					$("#search_ul").hide();
				}
			}
			inputBlur(){//输入框内点击
				$("#search_input").on("click",()=>{
					$("#search_ul").show();
					return false;
				})
			}
			addToCart(){//加入购物车功能 
				new addCart($(".divImg"),$(".imgBtn"),"",true)
			  }
			
		}
		new Shop();
	})
})