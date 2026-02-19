API =(function(){
    return{
            get:async function(url){
                    if(!!url){
                    let response=await fetch(url);

                        if(!response.ok){
                            throw new Error("fetching data is failed");
                        }

                    return{
                        
                        "data":await response.json()
                    }
                    
                    }else{
                        throw new Error("Url not found");
                    }
            }
        }
}) ();


NOTIFICATION=(function(){
    return{
        send:function(head,message){
            checkBrowser();

            const option={
                body:message,
                icon:"./Map/icons/colorized-trophy.png",
                
            }

            if (Notification.permission === "granted") {

                new Notification(head,option);

            }else if(Notification.permission==="default"){

                Notification.requestPermission().then(permission=>{

                    if (permission=="granted") {

                        new Notification(head,option);

                    }
                    
                })
            }
        }
    }
})


function checkBrowser(){
    if (!("Notification" in window)) {
        alert("This browser does not support notification");
        return;
    } 
}