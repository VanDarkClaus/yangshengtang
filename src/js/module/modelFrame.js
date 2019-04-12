
$.fn.extend({//划过弹出模态框
    model:function(html,style){//1拼接标签2传入样式
       this.hover(()=>{//划入
         this.css({
             position:"relative"
         })
         let ele=$(html)
         ele.css(style)
         this.append(ele);
       },()=>{//离开
            if(this.judge){
            }else{
              this.judge=true;
              setTimeout(()=>{
                  this.judge=false;
                  this.find("div").remove();
                  },500)
          }
       })
      //  return this;
    }
})
define([
  'jquery'
], ($)=> {
  class addModel{
    constructor(eleId){//传入id
      this.init()
    }
    init(){
      this.model();
    }
    model(){
      let user=localStorage.getItem("login");
      let str;
      if(user){//如果本地缓存存在
        user=JSON.parse(user);
        str=`<div class="user">
        <h3>欢迎你</h3>
        <p>${user.user}</p>
        <a class="loginout">注销</a>
        </div>`
      }else{//如果本地缓存不存在
         str=`<div class="user">
         <h3>你还未登录</h3>
         <a href="/html/login.html">登录</a>
         </div>`
      }
      $(ele).model(str,
      {
        width:"270px",
        height:"170px",
        position:"absolute",
        top:"29px",
        right:"0px",
        background:"white",
        "z-index":"10000",
        "text-align":"center"
      })
     this.loginout();
    }ele
    loginout(){//注销
        $(ele).on("click",".loginout",()=>{
          if(confirm("你确定注销吗？")){
            localStorage.removeItem("login");
            this.model();
          }
        })
    }
  }
  return addModel;
});