require(["require.config"],()=>{
    require(["jquery","footer","modelFrame","template"],($,footer,modelFrame,template)=>{
        new footer();
        new modelFrame(".welcome");
        class settle{
            constructor(){
                this.init()
            }
            init(){
                this.temp();
                this.hongbao();
            }
            temp(){
                let cart=JSON.parse(localStorage.getItem("cart"));
                var html=template("shopJs",{cart})
                $("#shopHtml").append(html);
            }
            hongbao(){//领红包
                $("#hongbao").on("click",()=>{
                   let img=$(`<div id="insertImg"><img src="/images/hongbao.png"></div>`);
                   img.css({
                       position:"fixed",
                       "z-index":100,
                       top:"50%",
                       left:"50%",
                       transform:"translate(-50%,-50%)",
                       background:"grey",
                       width:$('body').width(),
                       display:"flex",
                       "justify-content":"center"
                   })
                   $("body").append(img);
                })
                $("body").on("click","#insertImg",()=>{
                    console.log(222)
                    $("#insertImg").remove();
                 })
        }
    }
        new settle();
    })
})