Admin=(function(){

    let questionData = {
        number: 1,
        category: "Easy",
        type: "State Capitals",
        question: "What is the capital of Maharashtra?",
        options: [
            { text: "Mumbai", correct: true },
            { text: "Pune" },
            { text: "Nagpur" },
            { text: "Nashik" }
        ]
    };
    var sampleUsers = [
        {
          name: "Alice Johnson",
          points: 1200,
          certificates: 5,
          mostPlayed: "Chess",
          hints: 3,
          joined: "2023-01-15"
        },
        {
          name: "Bob Smith",
          points: 850,
          certificates: 2,
          mostPlayed: "Sudoku",
          hints: 7,
          joined: "2022-11-05"
        },
        {
          name: "Charlie Lee",
          points: 1570,
          certificates: 8,
          mostPlayed: "Crossword",
          hints: 1,
          joined: "2023-03-22"
        },
        {
          name: "Diana Wang",
          points: 950,
          certificates: 3,
          mostPlayed: "Scrabble",
          hints: 4,
          joined: "2022-08-12"
        },
        {
          name: "Ethan Patel",
          points: 1300,
          certificates: 6,
          mostPlayed: "Trivia",
          hints: 2,
          joined: "2023-02-10"
        }
      ];

      var Api={
            show:{
                UserDetailUrl:"http://127.0.0.1:5500/Map/js/Users.json",
                dashBoardUrl:"http://127.0.0.1:5500/Map/js/data.json",
                messageUrl:"http://127.0.0.1:5500/Map/js/notification.json"
            },
            delete:{
                messageUrl:"cvfghagfh"
            }
        }
    return{
        init:function(){
            $("#user-statistic").addClass("selected_blue").prop("disabled",true);
            $("#statistic_view").addClass("show");

            console.log($(".edit").length);
            Admin.view.show.userDetail();
            Admin.view.show.dashBoard();
            console.log(Api.show.dashBoardUrl);

            $("#quiz-management").on("click",()=>{
                $("#quiz-management").addClass("selected_green").prop("disabled",true);
                $("#user-statistic").removeClass("selected_blue").prop("disabled",false);
                $("#announcement").removeClass("selected_orange").prop("disabled",false);
                $("#statistic_view").removeClass("show");
                $("#quiz_view").addClass("show");
                $("#announcement_view").removeClass("show");
                Admin.view.show.question();
            })

            $("#user-statistic").on("click",()=>{
                $("#quiz-management").removeClass("selected_green").prop("disabled",false);
                $("#user-statistic").addClass("selected_blue").prop("disabled",true);
                $("#announcement").removeClass("selected_orange").prop("disabled",false);
                $("#statistic_view").addClass("show");
                $("#quiz_view").removeClass("show");
                $("#announcement_view").removeClass("show");
                Admin.view.show.userDetail();
                Admin.view.show.dashBoard();
            })

            $("#announcement").on("click",()=>{
                $("#quiz-management").removeClass("selected_green").prop("disabled",false);
                $("#user-statistic").removeClass("selected_blue").prop("disabled",false);
                $("#announcement").addClass("selected_orange").prop("disabled",true);
                $("#statistic_view").removeClass("show");
                $("#quiz_view").removeClass("show");
                $("#announcement_view").addClass("show");
                Admin.view.show.messages();
            })

            $(document).on("click",".edit",(e)=>{
                let questContainer=$(e.target).closest(".question_details");
                let messageContainer=$(e.target).closest(".message");

                if(questContainer.length != 0){
                    console.log(questContainer.find(".question_number").text());
                }

                if(messageContainer.length != 0){
                    console.log(messageContainer.find("#message_header").attr("value"));
                }
             })
            $(document).on("click",".delete",(e)=>{
                let questContainer=$(e.target).closest(".question_details");
                let messageContainer=$(e.target).closest(".message");

                if(questContainer.length !=0){
                    console.log(questContainer.find(".question_number").text());
                }

                if(messageContainer.length != 0){
                    console.log(messageContainer.find("#message_header").attr("value"));
                }
            })

        },
        view:{
            show:{
                dashBoard:async function(){

                    let data = await Admin.get.dashBoard();
                    console.log(data);

                    $("#total-user-count").text(data.USERNAME);
                    $("#total-points-count").text(data.POINTS);
                    $("#total-certificate-count").text(data.CERTIFICATES);
                    $("#avg-hint").text(data.HINTS);

                },
                userDetail:async function(){

                    let data=await Admin.get.userDetail()

                    console.log(data);
                    let container=$("#user-detail-container").html("");

                    container.append(createUserDetailHead());
                    for (let i = 0; i < sampleUsers.length; i++) {
                        if(i==sampleUsers.length-1){
                            container.append(createUserDetailRow(sampleUsers[i]).addClass("last"));
                        }else{
                            container.append(createUserDetailRow(sampleUsers[i]));
                        }
                    }
        
                },
                messages:async function(){
                    let data=await Admin.get.messages();
                    console.log(data);
                    let container=$("#announcement_view").html("");
                    container.append(announcementButton());
                    for(i=0;i<data.length;i++){
                        container.append(createMessageContainer(data[i]));
                    }
                },
                question:async function(){
                    $("#quiz_container").html($("<h3>").attr("id","quizquestioncount").text(5));
                    $("#quiz_container").append(createQuestionContainer(questionData));
                }
            }
        },
        delete:{
            message:function(value){
                Admin.Delete.message(value);
            }
        },
        get:{
            dashBoard:async function(){
                let url=Api.show.dashBoardUrl
                try{
                    let response=await API.get(url);
                    return response.data;
                }catch(error){
                    console.log("error",error);
                }
            },
            userDetail:async function(){
                let url=Api.show.UserDetailUrl
                try{
                    let response=await API.get(url);
                    return response.data;
                }catch(error){
                    console.log("error",error);
                }
            },
            messages:async function(){
                let url=Api.show.messageUrl
                try{
                    let response=await API.get(url);
                    return response.data;
                }catch(error){
                    console.log("error",error);
                }
            }
        },
        Delete:{
            message:async function(id){
                let url =Api.delete.messageUrl

                try{
                    let response=await API.get(url);
                    Admin.view.show.messages();
                }catch(error){
                    console.log("error",error);
                }

            }
        }
    }
})();
Admin.init();


function createUserDetailRow(value) {
    let maindiv=$("<div>").addClass("user-detail");

    $("<div>").addClass("user-name").text(value.name).appendTo(maindiv);
    $("<div>").addClass("user-point").text(value.points).appendTo(maindiv);
    $("<div>").addClass("user-certificate").text(value.certificates).appendTo(maindiv);
    $("<div>").addClass("most-played").text(value.mostPlayed).appendTo(maindiv);
    $("<div>").addClass("user-hint").text(value.hints).appendTo(maindiv);
    $("<div>").addClass("user-joined").text(value.joined).appendTo(maindiv);
    return maindiv;
  }

  function createUserDetailHead() {
    let headDiv = $("<div>").attr("id", "user-detail-head");
  
    $("<h3>").text("User").appendTo(headDiv);
    $("<h3>").text("Points").appendTo(headDiv);
    $("<h3>").text("Certificates").appendTo(headDiv);
    $("<h3>").text("Most Played").appendTo(headDiv);
    $("<h3>").text("Hint").appendTo(headDiv);
    $("<h3>").text("Joined").appendTo(headDiv);
  
    return headDiv;
  }

  function createMessageContainer(data){
        let container=$("<div>").addClass("message")

        let header=$("<div>").attr("id","message_header").attr("value",data.id)

        $("<h2>").addClass("message-heading").text(data.heading).appendTo(header);

        let messageAction = $("<div>").attr("id", "message-action");

        let edit = $("<div>").addClass("edit");
        let editImg = $("<img>")
                        .attr("src", "../icons/blue-pencil.png")
                        .attr("alt", "");

        edit.append(editImg);

        let deletebuton = $("<div>").addClass("delete");
        let deleteImg = $("<img>").attr("src", "../icons/colorized-bin.png").attr("alt", "");

        deletebuton.append(deleteImg);

        messageAction.append(edit, deletebuton);

        header.append(messageAction).appendTo(container);

        $("<p>").addClass("message-content").text(data.message).appendTo(container);

        $("<p>").addClass("message-time").text(data.time).appendTo(container);

        return container;
    }

function announcementButton(){
    let img=$("<img>").attr("src","../icons/colorized-send.png");
    return $("<button>").attr("id","newAnnouncement").append(img).append("New Announcement");
}

function createQuestionContainer(data) {
    
    let container = $("<div>").addClass("question_container");

    let questionDetails = $("<div>").addClass("question_details");

    let detailLeft = $("<div>").addClass("question_detail_left");
    let questionNumber = $("<div>").addClass("question_number").text(data.number);
    let questionCategory = $("<div>").addClass("question_category").text(data.category);
    let questionType = $("<div>").addClass("question_type").text(data.type);
    detailLeft.append(questionNumber, questionCategory, questionType);

    let detailRight = $("<div>").addClass("question_detail_right");

    let edit = $("<div>").addClass("edit");
    let editImg = $("<img>").attr("src", "../icons/blue-pencil.png").attr("alt", "edit img");
    edit.append(editImg);

    let deleteAction = $("<div>").addClass("delete");
    let deleteImg = $("<img>").attr("src", "../icons/colorized-bin.png").attr("alt", "delete img");
    deleteAction.append(deleteImg);

    detailRight.append(edit, deleteAction);

    questionDetails.append(detailLeft, detailRight);

    let questionText = $("<h3>").addClass("question").text(data.question);

    let optionsContainer = $("<div>").addClass("options");
    data.options.forEach(opt => {
        let optionDiv = $("<div>")
                        .addClass("option")
                        .text(opt.text);
        if(opt.correct) optionDiv.addClass("correct");
        optionsContainer.append(optionDiv);
    });

    container.append(questionDetails, questionText, optionsContainer);

    return container;
}