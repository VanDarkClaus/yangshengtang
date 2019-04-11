define(['jquery','template'], ($, template)=> {
    class shopItem{
         constructor(container,url){//需要传$对象的container
             this.container=container;
             this.url=url;
             this.init();
         }
         init(){
             this.getData();//请求数据
            }
            getData(){//请求数据
                $.ajax({
                    type:"GET",
                    url:this.url,
                    dataType:"json",
                    success:res=>{
                        this.res=res;
                        this.load();//加载页面
                    }
                })
            }
            load(){//加载页面
                this.container.load("/html/module/shopItem.html",()=>{
                    this.render();//渲染页面
                });
            }
            render(){//渲染页面
                this.container.html(template("template",{...this.res}))//1.id 2.canshu
                this.sort();
               
            }
            sort(){//排序，
                let arr=this.res.res_body.data;
                this.container.on("click",".upSort",e=>{//升序
                   this.res.res_body.data=arr.sort((a,b)=>{
                        return a.price-b.price;
                    })
                    this.render();
                     e.preventDefault();//阻止默认
                })
                this.container.on("click",".downSort",e=>{//降序
                    this.res.res_body.data=arr.sort((a,b)=>{
                        return b.price-a.price;
                    })
                    this.render();
                    e.preventDefault();
               })
            }
    }
    return shopItem;
});