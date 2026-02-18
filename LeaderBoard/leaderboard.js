LeaderBoard=(function(){
    
    var Api={
        show:{
            LeaderBoardUrl:"../Map/js/Users.json"
        }
    };

    let topThreePlayer="";

    return{
        init:function(){
            $("#back").on("click", () => {
                window.location.assign("/Map/view/home.html");
            });

            $("#global").css({
                        "background":"linear-gradient(to right bottom ,#FFBF00,#FF7B00)",
                        "color":"white"
                                });

            $("#input").on("input",()=>{
                LeaderBoard.show.search();
            })

            LeaderBoard.show.view();
        },
        show:{
            view:async function(){
                let data=await LeaderBoard.get.view();
                let html="";

                for (let i = 0; i < 3; i++) {
                    $(`.user-name-${i+1}`).text(data[i].name);
                    $(`.user-points-${i+1}`).text(data[i].points);
                }

                for (let i = 0; i < data.length; i++) {               
                    html+=(buildHtml(i+1,data[i].name,data[i].points,data[i].certificate));
                }
            $(".ranking-container").html(html);

            },
            search:async function(){
                let value= $("#input").val().toLowerCase().trim();
                let data=await LeaderBoard.get.view();
                let count=1;
                let html="";
                
                    LeaderBoard.show.TopOnePlayer("","");
                
                    
                    for (let i = 0; i < data.length; i++) {  
                        if((data[i].name).toLowerCase().includes(value)){   
                            if(count==1){
                                LeaderBoard.show.TopOnePlayer(data[i].name,data[i].points);  
                            }        
                        html+=(buildHtml(count++,data[i].name,data[i].points,data[i].certificate));
                    }
   
                }
                $(".ranking-container").html(html);

                if($(".ranking-container").html()==""){
                    $(".ranking-container").html("<div id='no-data'>No User Found</div>");
                }
                if(value==""){
                    LeaderBoard.show.TopThreePlayers();
                }
            
            },
            TopOnePlayer:function(name,point){
                if(topThreePlayer==""){
                    topThreePlayer=$(".leaderboard-toplist").html();
                }
                let i=1

                $(".leaderboard-toplist").html(
                `<div id="topList">
                    <div class="user-icon">
                        <p>👦</p>
                    </div>
                    <div class="users-details">
                        <h1>👑</h1>
                        <p class="user-name-1">${name}</p>
                        <h2 class="user-points-1">${point}</h2>
                    
                    </div>
                </div>`)
                if(name==""){
                    $(".leaderboard-toplist").html("<div id='no-data'>No User Found</div>");
                }
            },
            TopThreePlayers:function(){
                $(".leaderboard-toplist").html(topThreePlayer)

            }
        },
        get:{
            view:async function(){
                let url=Api.show.LeaderBoardUrl;

                try {
                    let response=await API.get(url);

                    return response.data;
                } catch {
                    
                }
            }
        }
    }
})();

LeaderBoard.init();


function buildHtml(count,name,points,certificate){
    return(`<div class="ranking">
        <div class="ranked-user-name">
            <div class="pointing-position">${count}</div>
            <div>
                <h2>👦${name}</h2>
            </div>
        </div>
        <div class="user-achivement">
            <div>
                <div>
                    <img src="trophy.png" alt="trophy">
                    score
                </div>
                <p class="scoreText">${points}</p>
            </div>
            <div>
                <div>
                    <img src="medal.png" alt="medal">
                    Certs
                </div>
                <p class="scoreText">${certificate}</p>
            </div>
        </div>
    </div>`);
}