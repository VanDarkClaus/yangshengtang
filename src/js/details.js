require(["require.config"],function(){
	require(["jquery","header","footer","template","url","addCart","zoom",],function($,header,footer,template,url,addCart){
		new header();
		new footer();
		class Details{
      constructor(){
			  this.init();
		  }
		  init(){
				this.getData();
				
			}
			getData(){//请求数据
				this.id=location.search;
            $.ajax({
					"type":"GET",
					"url":url.detailsUrl+this.id,
					success:res=>{
						this.res=res;
						if(res.res_code ==1){
							this.mode();
						}
					}
				})
			}
			mode(){//渲染页面
				var html=template("tempDetails",this.res);
				var detaImg=template("temp2",this.res);
				$("#append").append(html);
				$("#detailsImg").append(detaImg);
				$("#num").html(this.res.res_body.data.number);//数量
				$("#product_name_path").append(this.res.res_body.data.title)
				this.zoom();//在加载后再执行绑定事件
				this.buy();
				this.add();
				this.reAddCart();//添加到购物车
				this.reduce();
			}
		  zoom () {
			// 放大镜插件
			$(".zoom-img").elevateZoom({
				gallery:'gal1',
				cursor: 'pointer',
				galleryActiveClass: 'active',
				borderSize:'1',    
				borderColor:'#888'
			});
			}
			add(){//商品+1
                    $("#addShop").on("click",()=>{
						$("#num_shop").val(parseInt($("#num_shop").val())+1);
						return false;
					})
			}
			reduce(){//商品-1
				$("#reduce").on("click",()=>{
					let num=parseInt($("#num_shop").val());
					num=--num>0?num:0;
					$("#num_shop").val(num);
					return false;
				})
			}
			buy(){//立即购买
				$("#buy").on("click",()=>{
					location.href="/html/cart.html";
				})
			} 
			reAddCart(){
				new addCart($(".btn"),"#addCart",this.res)
			}
		}
		new Details();
	})
})
