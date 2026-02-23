API = (function() {
    return {
        get: async function(url) {
            if (!!url) {
                let response = await fetch(url);

                if (!response.ok) {
                    throw new Error("fetching data is failed");
                }

                return {

                    "data": await response.json()
                }

            } else {
                throw new Error("Url not found");
            }
        }
    }
})();

SESSION = (function() {
    return {
        checkSession: async function() {
            try {
                let res = await fetch("/MapFinder/checksession");
                let data = await res.json();

                if (data.status === "failed") {
                    localStorage.clear();
                    console.log("session not exist");
                    return false;
                }

                console.log("session exist");
                localStorage.setItem("username", data.message);
                return true;

            } catch (err) {
                console.log(err);
                return false;
            }
        }
    }
})();


WINDOW = (function() {
    return {
        changeUrl: function(uri) {
            window.location.replace(uri);
        },

        blockGoBack: function() {
            history.pushState(null, null, location.href);
            window.onpopstate = function() {
                history.go(1);
            };
        }

    }
})();


NOTIFICATION = (function() {
    return {
        send: function(head, message) {
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





// ------------------- Notification Dropdown System -----------------------
NOTIFY_PANEL = (function () {

    let panel = null;

    (function injectStyle(){
        if(document.getElementById("notify-panel-style")) return;

        const style = document.createElement("style");
        style.id = "notify-panel-style";

        style.innerHTML = `
            .notify-panel {
                position: absolute;
                width: 420px;
				height: 100%;
                background: #fff;
                box-shadow: 0 8px 20px rgba(0,0,0,0.15);
                border-radius: 6px;
                overflow: hidden;
                z-index: 1000;
                animation: slideDown 0.2s ease;
                font-family: Arial, sans-serif;
            }

            .notify-panel::before {
                content: "";
                position: absolute;
                top: -8px;
                right: 20px;
                border-width: 8px;
                border-style: solid;
                border-color: transparent transparent #fff transparent;
            }

            .notify-item {
                padding: 12px;
                border-bottom: 1px solid #eee;
                font-size: 14px;
                background-color: #F7F7FD;
            }

            .notify-item:last-child {
                border-bottom: none;
            }

            .notify-actions {
                margin-top: 8px;
                display: flex;
                gap: 8px;
            }

            .notify-btn {
                padding: 4px 10px;
                font-size: 12px;
                border: none;
                border-radius: 4px;
                cursor: pointer;
            }

            .accept-btn {
                background: #28a745;
                color: white;
            }

            .reject-btn {
                background: #dc3545;
                color: white;
            }
        `;

        document.head.appendChild(style);
    })();

    function closePanel() {
        if (panel) {
            panel.remove();
            panel = null;
            document.removeEventListener("click", outsideClickHandler);
        }
    }

    function outsideClickHandler(e) {
        if (panel && !panel.contains(e.target) && !e.target.closest("#notification")) {
            closePanel();
        }
    }

    function buildPanel(notifications) {

        closePanel();

        panel = document.createElement("div");
        panel.className = "notify-panel";
		document.body.style.background = "rgba(0,0,0,0.4)";

        if (!notifications || notifications.length === 0) {
            panel.innerHTML = `<div class="notify-item">No Notifications</div>`;
        } else {
            notifications.forEach(item => {

                const div = document.createElement("div");
                div.className = "notify-item";

                div.innerHTML = `<div>${item.message}</div>`;

                if (item.type === "friend_request") {

                    const actionDiv = document.createElement("div");
                    actionDiv.className = "notify-actions";

                    const acceptBtn = document.createElement("button");
                    acceptBtn.className = "notify-btn accept-btn";
                    acceptBtn.innerText = "Accept";
                    acceptBtn.onclick = function () {
                        NOTIFY_PANEL.accept(item.id);
                        div.remove();
                    };

                    const rejectBtn = document.createElement("button");
                    rejectBtn.className = "notify-btn reject-btn";
                    rejectBtn.innerText = "Reject";
                    rejectBtn.onclick = function () {
                        NOTIFY_PANEL.reject(item.id);
                        div.remove();
                    };

                    actionDiv.appendChild(acceptBtn);
                    actionDiv.appendChild(rejectBtn);
                    div.appendChild(actionDiv);
                }

                panel.appendChild(div);
            });
        }

        // Position panel under notification button
        const button = document.getElementById("notification");
        const rect = button.getBoundingClientRect();

        panel.style.top = rect.bottom + window.scrollY + "px";
        panel.style.left = rect.right - 420 + window.scrollX + "px";

        document.body.appendChild(panel);

        setTimeout(() => {
            document.addEventListener("click", outsideClickHandler);
        }, 0);
    }

    return {

        toggle: function (notifications) {
            if (panel) {
                closePanel();
            } else {
                buildPanel(notifications);
            }
        },

        accept: function (id) {
            console.log("Accepted friend request:", id);
        },

        reject: function (id) {
            console.log("Rejected friend request:", id);
        },

        close: function () {
            closePanel();
        }
    };

})();