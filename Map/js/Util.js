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
            },
            post:async function(param){
                if(!!param){
                    if(!!param.url){
                        let response=await fetch(param.url,{
                            method:"POST",
                            headers:{
                                "Content-Type":"application/json"
                            },
                            body:JSON.stringify(param.data)
                        });

                        if(!response.ok){
                            throw new Error("Posting the data failed.");
                        }

                        return{
                            "data": await response.json()
                        }
                    }else{
                        throw new Error("No url found for post request.")
                    }
                }else{
                    throw new Error("No parameter found for the post request.")
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