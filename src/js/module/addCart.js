define([
    'jquery','fly'
], ($)=> {
    //1.容器盒子,jquery对象2.委托所需要的选择器，jquery对象3.btn对应的信息
    class AddCart{
        constructor(container,btn,res,isList){
                this.btn=btn;
                this.container=container;
                this.res=res;
                this.isList=isList;
                this.init();
        }
        init(){
            this.addCart();
        }
        addCart(){//加入购物车
            this.id=location.search.substr(4);
            this.container.on("click",this.btn,(e)=>{
                if(this.isList){
                    let li=$(e.target).parent().parent();
                    this.id=li.attr("data-id");
                    this.res={};
                    this.res.res_body={
                        data:{
                            id:li.attr("data-id"),
                            title:li.find(".tempTitle").find("a").html(),
                            imgArr:[{img:li.find("img").attr("src")}],
                            price:li.find(".tempPrice").html().substr(5,)
                            }
                    }
                }
                        let cart=localStorage.getItem("cart");
                        if(cart){//如果本地缓存存在
                            cart=JSON.parse(cart);
                            if(cart.some((item,index)=>{//如果id存在，改变数量
                                this.index=index;
                                return item.id==this.id;
                            })){
                                if($("#num_shop")[0]){//判断input框是否存在
                                    cart[this.index].num=$("#num_shop").val();
                                }else{
                                    cart[this.index].num=Number(cart[this.index].num)+1;
                                }
                            }else{//如果id不存在，插入新数据
                                if($("#num_shop")[0]){
                                    this.res.res_body.data.num=parseInt($("#num_shop").val());
                                }else{
                                    this.res.res_body.data.num=1;
                                }
                                cart.unshift(this.res.res_body.data);
                            }
                            localStorage.setItem("cart",JSON.stringify(cart))
                        }else{//如果本地缓存不存在
                            if($("#num_shop")[0]){
                                this.res.res_body.data.num=$("#num_shop").val();
                            }else{
                                this.res.res_body.data.num=1;
                            }
                            localStorage.setItem("cart",JSON.stringify([this.res.res_body.data]))
                        }
                        this.moveCart(e);
                        e.preventDefault();
                    })
                }
            moveCart(e){//购物车抛物线
             // 抛物线飞入购物车
                $(`<div style="width:40px;height:40px"><img style="width:40px;height:40px;z-index:5000;" src="${this.res.res_body.data.imgArr[0].img}"></div>`).fly({
                    start:{
                    left: e.clientX,  //开始位置（必填）#fly元素会被设置成position: fixed
                    top: e.clientY,  //开始位置（必填）
                    },
                    end:{
                    left: $(".header-right2").position().left, //结束位置（必填）
                    top: $(".header-right2").position().top  //结束位置（必填）
                    
                    },
                    autoPlay: true, //是否直接运动,默认true
                    speed: 1.3, //越大越快，默认1.2
                    vertex_Rtop: 20, //运动轨迹最高点top值，默认20
                    onEnd: function(){
                    this.destroy(); // 把运动的小方块销毁
                    $("#cartNum").html(JSON.parse(localStorage.getItem("cart")).length)//添加购物车数量
                    } //结束回调
                })
            }


    }
    return AddCart;
});