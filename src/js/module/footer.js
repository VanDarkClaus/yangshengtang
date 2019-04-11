define(["jquery"], $=> {
    class Footer{
        constructor(){
            this.init().then(()=>{
            });
        }
        init(){
            return new Promise((resolve,reject)=>{
            	$("#footer").load("/html/module/footer.html",()=>{
            		return resolve();
            	})
            })
        }
    }
    return Footer;
});