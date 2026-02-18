Home=(function(){

    var Api={

        Show:{
            UserDetailUrl : "../js/data.json",
            TopPlayerListUrl : "../js/Users.json?limit=5&offset=0",
            NotificationListUrl : "../js/notification.json?limit=3&offset=0" 
        }
    }

    var Img={
        portyPapper:"../icons/party-popper.png",
        tropy:"../icons/trophy(1).png",
        lightning:"../icons/lightning.png",
        clock:"../icons/clock.png"
    }

    return{
        init:function(){
            Home.show.UserDetail();
            Home.show.TopPlayersList();
            Home.show.NotificationList();
        },
        show:{
                UserDetail:async function(){
                    var data=await Home.get.UserDetail();

                        if(emptyCheck(data.USERNAME)){
                            $(".head-name").text(data.USERNAME);
                        }  
                        if(emptyCheck(data.HINTS)){
                            $(".hint-count").text(data.HINTS);
                        }

                        if (emptyCheck(data.POINTS)) {
                            $(".point-count").text(data.POINTS);                            
                        }

                        if (emptyCheck(data.CERTIFICATES)) {
                            $(".certificate-count").text(data.CERTIFICATES);                               
                        }                     
                
                },
                TopPlayersList:async function(){
                    let data=await Home.get.TopPlayersList();

                    if(data.length==0){
                        $("#top-player-list").html("<div class='no-player'>No Player found</div>");
                        return;
                    }

                    if(data.length<5){
                        for(i=data.length+1; i <= 5 ; i++){
                            $(`.top-${i}`).hide();
                        }
                    }
                        
                    for (let i = 0; i < data.length; i++) {
                        $(`#top-${i+1}-name`).text(data[i].name);
                        $(`#top-${i+1}-points`).text(data[i].points);
                    }
                    
                },
                NotificationList:async function(){
                    let data=await Home.get.NotificationList();
                    if(data.length == 0){
                        $("#notification-container").html("<div class='no-player'>No Message For You </div>");
                        return;
                    }

                    if(data.length<3){
                        for(i=data.length+1; i <= 3 ; i++){
                            $(`#notification-${i}`).hide();
                        }
                    }
                    for (let i = 0; i < data.length; i++) {
                        $($(".notifiction-message")[i]).html(buildMessage(data[i].message,Img));

                        $($(".notification-time")[i]).html(`<img src=${Img.clock} id="clock">`+dateDifference(data[i].time));
                    }
                }
        },
        get:{
            UserDetail:async function(){

                let url=Api.Show.UserDetailUrl
                try{
                    let response=await API.get(url);
                    return response.data;
                }catch{
                    window.location.assign("/LeaderBoard/leaderboard.html");
                }
            },
            TopPlayersList:async function(){

                let url=Api.Show.TopPlayerListUrl
                try{
                    let response=await API.get(url);
                    return response.data;
                }catch{
                }
            },
            NotificationList:async function(){
                let url=Api.Show.NotificationListUrl
                try {
                    let response=await API.get(url);
                    return response.data;
                } catch {
                }
            }
        }
    }
})();

Home.init();

function buildMessage(value,Img){
    if (!value) {
        return "message not found";
    }
    let data = value.toLowerCase();
    if(data.includes("hint")||data.includes("good")){
        return `<img  src=${Img.portyPapper} >  `+value;
    }else if(data.includes("certificate")||data.includes("earn")){
        return `<img  src=${Img.tropy} >  `+value;
    }else if(data.includes("challenged")||data.includes("mode")){
        return `<img src=${Img.lightning}>  `+value;
    }else{
        return value;
    }
}

function dateDifference(value){
    let currentTime=new Date();
    let previousTime=new Date(value);
    let diff=currentTime-previousTime;

    let day=Math.floor(diff/(1000*60*60*24));
    let hour=Math.floor(diff/(1000*60*60));
    let minute=Math.floor(diff/(1000*60));

    if(day==1){
        return "1 day ago";
    }
    else if(day > 1){
        return day+" days ago";
    }

    if(hour == 1){
        return "1 hours ago";
    }else if(hour > 1){
        return hour+" hours ago";
    }

    if(minute < 10 && minute > 0){
        return "few minute ago";
    }else {
        return minute+" minutes ago"
    }
}

function emptyCheck(value){
    if((value !== undefined) && (value !== null)){
        return true;
    }else{
        window.location.assign("/LeaderBoard/leaderboard.html");
        return;
    }
}

