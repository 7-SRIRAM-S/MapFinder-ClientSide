LeaderBoard = (function() {

    var Api = {
        show: {
            LeaderBoardUrl: "/MapFinder/Leaderboard"
        }
    };

    let topThreePlayer = "";
    let data;

    return {
        init: function() {
            $("#back").on("click", () => {
                window.location.assign("/MapFinder/home.html");
            });

			$("#global, #friend").click(function () {
			    $("#global, #friend").removeClass("active-btn");
				
			    $(this).addClass("active-btn");
			});

            $("#input").on("input", () => {
                LeaderBoard.show.search();
            })
			
			$("#friend").on("click" , ()=>{
				LeaderBoard.show.friend();
			})

			$("#global").on("click" , ()=>{
				LeaderBoard.show.view();
			})
			
			$("#global").addClass("active-btn");
            LeaderBoard.show.view();
        },
        show:{
            view:async function(){
                let data=await LeaderBoard.get.view();
                let html="";

                for (let i = 0;i < 3;i++) {
                    $(`.user-name-${i + 1}`).text(data[i].userName);
                    $(`.user-points-${i + 1}`).text(data[i].totalScore);
                }

				const container = $(".ranking-container");
				container.empty();

				for (let i = 0; i < data.length; i++) {
				    const element = buildHtml(
				        i + 1,
				        data[i].userName,
				        data[i].totalScore,
				        data[i].totalCertificate,
				        data[i].isFriend
				    );

				    container.append(element);
				}

            },
			friend: async function(){

				const container = $(".ranking-container");
				container.empty();
				let found =false
				
				for (let i = 0; i < data.length; i++) {
					if(data[i].isFriend){

						const element = buildHtml(
						    i + 1,
						    data[i].userName,
						    data[i].totalScore,
						    data[i].totalCertificate,
						    data[i].isFriend
						);
						found= true;

						container.append(element);
					}
				}
				
				if(!found){
				container.append("<div id='no-data'>No User Found</div>");
					
				}
			},
            search: async function() {
                let value = $("#input").val().toLowerCase().trim();
                //              let  data = await LeaderBoard.get.view();
                //				data = data.data;
//                let count = 1;
                let html = "";

                LeaderBoard.show.TopOnePlayer("", "");

				const container = $(".ranking-container");
				container.empty();

				let count = 1;
				let found = false;

				for (let i = 0; i < data.length; i++) {

				    if (data[i].userName.toLowerCase().includes(value)) {

				        found = true;

				        if (count === 1) {
				            LeaderBoard.show.TopOnePlayer(
				                data[i].userName,
				                data[i].totalScore
				            );
				        }

				        const element = buildHtml(
				            data[i].rankPosition,
				            data[i].userName,
				            data[i].totalScore,
				            data[i].totalCertificate,
				            data[i].isFriend
				        );

				        container.append(element); 
				    }
				}

				if (!found) {
				    container.append("<div id='no-data'>No User Found</div>");
				}
				
                if (value == "") {
                    LeaderBoard.show.TopThreePlayers();
                }

            },
            TopOnePlayer: function(name, point) {
                if (topThreePlayer == "") {
                    topThreePlayer = $(".leaderboard-toplist").html();
                }
                let i = 1

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
                if (name == "") {
                    $(".leaderboard-toplist").html("<div id='no-data'>No User Found</div>");
                }
            },
            TopThreePlayers: function() {
                $(".leaderboard-toplist").html(topThreePlayer)

            }
        },
        get: {
            view: async function() {
                let url = Api.show.LeaderBoardUrl;

                try {
                    let response = await API.get(url);

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
                <h2>👦 ${name}</h2>
            </div>
        </div>
        <div class="user-achivement">
            <div class="friend-request"> 
                <img src="add-user.png" alt="adduser">
            </div>
            <div>
                <div>
                    <img src="trophy.png" alt="trophy">
                    Score
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