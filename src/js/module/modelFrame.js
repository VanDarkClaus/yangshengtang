
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
       return this;
    }
})