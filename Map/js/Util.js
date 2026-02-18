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

