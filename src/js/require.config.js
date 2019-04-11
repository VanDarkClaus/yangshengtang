require.config({
    baseUrl:"/",
    paths:{
        "jquery":"libs/jquery/jquery-3.2.1",
        "header" : "js/module/header",
        "footer" :"js/module/footer",
        "template":"libs/art-template/template-web",
        "swiper":"libs/swiper/js/swiper",
        "zoom":"libs/jquery-plugins/jquery.elevateZoom-3.0.8.min",//放大镜
        "tools":"libs/tools",
        "url":"js/module/url",
        "shopItem":"js/module/shopItem",
        "yzmmode":"js/module/yzmmode",
        "addCart":"js/module/addCart",
        "fly":"libs/jquery-plugins/jquery.fly.min"
    },
    //垫片，不满足amd规范，但是又依赖于另外的模块
    shim:{
      "zoom":{
          deps:["jquery"]
      },
      "fly":{
          deps:["jquery"]
      }
    }

})