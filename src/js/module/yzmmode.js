define([
    'jquery','url'
], ($,url)=>{
    class Yzm{
        constructor(){
            this.init();
        }
        init(){
            this.yzm();//验证码
            this.yzmClick();//点击验证码
            this.yzmContent();//验证码框
        }
        yzm(){//验证码
            $.ajax({
                type:"GET",
                data:{
                    "showapi_appid":"89896",
                    "showapi_sign":"b378105819ec42c783cfa00cd00c9b38"
                },
                url:url.yzmUrl,
                success:(res)=>{
                    this.yzmRes=res;
                    // console.log(this.yzmRes)
                    $("#yzmImg").attr("src",res.showapi_res_body.img_path)
                  
                }
            })
        }
        yzmClick(){//点击验证码
            $("#yzmImg").on("click",()=>{
                this.yzm();
            })
        }
        yzmContent(){//验证码框
            $("#yzm").on("keyup",()=>{
                if($("#yzm").val()==this.yzmRes.showapi_res_body.text){
                    $("#reg")[0].innerHTML="";
                    $("#reg").hide();
                }else{
                    $("#reg").show();
                    $("#reg")[0].innerHTML="验证码错误";
                }
            })
        }
    }
    return new Yzm();
});