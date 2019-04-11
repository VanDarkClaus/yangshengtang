//业务逻辑代码
require(["require.config"],function(){
    require(["jquery","header","swiper"],function($,header,Swiper){
        new header();
        class Footer{//引入footer
          constructor(){
            this.init();
          }
          init(){
            $("#footer").load("/html/module/footer.html .footer3",function(){
            });
          }
        }
        new Footer();
        new Swiper ('.swiper-container', {
            direction: 'horizontal', // 垂直切换选项
            loop: true, // 循环模式选项
            
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
            },
            
            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
            
            // 如果需要滚动条
            scrollbar: {
              el: '.swiper-scrollbar',
            },

            //自动播放
           autoplay: {
            delay: 3000,
            stopOnLastSlide: false,
            disableOnInteraction: true,
            },
          })
        class Index{
            constructor(){
                this.init();
            }
            init(){
                this.swiper();
            }
            swiper(){
                console.log(11)           
            }
        }
        new Index();
    })
})