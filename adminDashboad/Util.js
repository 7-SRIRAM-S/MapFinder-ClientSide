API = (function() {
    return {
        get: async function(url) {
            if (!!url) {
                let response = await fetch(url);

                if (!response.ok) {
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

            const option = {
                body: message,
                icon: "./icons/colorized-trophy.png",
                vibrate: [200, 100, 200]

            }

            if (Notification.permission === "granted") {

                new Notification(head, option);

            } else if (Notification.permission === "default") {

                Notification.requestPermission().then(permission => {

                    if (permission == "granted") {

                        new Notification(head, option);

                    }

                })
            }
        }
    }
})();


// -------------------  this is for alert and conform  -----------------------
MODAL = (function () {

    function injectStyles() {
        if (document.getElementById("custom-modal-styles")) return;

        const style = document.createElement("style");
        style.id = "custom-modal-styles";
        style.innerHTML = `
            .custom-overlay {
                position: fixed;
                inset: 0;
                background: rgba(0,0,0,0.4);
                display: flex;
                justify-content: center;
                align-items: flex-start;
                padding-top: 80px;
                z-index: 9999;
            }

            .custom-modal {
                background: #fff;
                width: 600px;
                max-width: 90%;
                padding: 25px;
                border-radius: 8px;
                box-shadow: 0 8px 25px rgba(0,0,0,0.2);
                font-family: Arial, sans-serif;
                animation: fadeIn 0.2s ease-in-out;
            }

            .custom-modal h3 {
                margin: 0 0 10px;
            }

            .custom-modal p {
                margin: 0;
                font-size: 14px;
                line-height: 1.5;
                overflow-wrap: anywhere;   /* FIXES LONG TEXT */
                word-break: break-word;
            }

            .custom-buttons {
                margin-top: 25px;
                display: flex;
                justify-content: flex-end;
                gap: 10px;
            }

            .custom-btn {
                padding: 6px 15px;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                font-size: 13px;
            }

            .btn-ok {
                background-color: #28a745;
                color: #fff;
            }

            .btn-cancel {
                background-color: #dc3545;
                color: #fff;
            }

            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(-10px); }
                to { opacity: 1; transform: translateY(0); }
            }
        `;
        document.head.appendChild(style);
    }

    function createModal(heading, message, type) {
        injectStyles();

        return new Promise((resolve) => {
            const oldModal = document.getElementById("custom-modal");
            if (oldModal) oldModal.remove();

            const overlay = document.createElement("div");
            overlay.id = "custom-modal";
            overlay.className = "custom-overlay";

            const modalBox = document.createElement("div");
            modalBox.className = "custom-modal";

            const title = document.createElement("h2");
            title.textContent = heading;

            const msg = document.createElement("p");
            msg.textContent = message;

            const btnContainer = document.createElement("div");
            btnContainer.className = "custom-buttons";

            const okBtn = document.createElement("button");
            okBtn.textContent = "OK";
            okBtn.className = "custom-btn btn-ok";

            okBtn.onclick = function () {
                overlay.remove();
                resolve(true);
            };

            btnContainer.appendChild(okBtn);

            if (type === "confirm") {
                const cancelBtn = document.createElement("button");
                cancelBtn.textContent = "Cancel";
                cancelBtn.className = "custom-btn btn-cancel";

                cancelBtn.onclick = function () {
                    overlay.remove();
                    resolve(false);
                };

                btnContainer.appendChild(cancelBtn);
            }

            modalBox.appendChild(title);
            modalBox.appendChild(msg);
            modalBox.appendChild(btnContainer);
            overlay.appendChild(modalBox);
            document.body.appendChild(overlay);
        });
    }

    return {
        show: function (heading, message, type = "alert") {
            return createModal(heading, message, type);
        }
    };

})();


function checkBrowser() {
    if (!("Notification" in window)) {
        alert("This browser does not support notification");
        return;
    }
}