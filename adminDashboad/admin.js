Admin=(function(){

    let questionData = [
        {
          "question_text": "What is the capital of France?",
          "options": [
            {
              "correct": 0,
              "choice": "Madrid"
            },
            {
              "correct": 0,
              "choice": "Rome"
            },
            {
              "correct": 0,
              "choice": "Berlin"
            },
            {
              "correct": 1,
              "choice": "Paris"
            }
          ],
          "id": 1,
          "title": "European Capitals Quiz"
        },
        {
          "question_text": "What is the capital of Germany?",
          "options": [
            {
              "correct": 1,
              "choice": "Berlin"
            },
            {
              "correct": 0,
              "choice": "Vienna"
            },
            {
              "correct": 0,
              "choice": "Zurich"
            },
            {
              "correct": 0,
              "choice": "Brussels"
            }
          ],
          "id": 2,
          "title": "European Capitals Quiz"
        },
        {
          "question_text": "Who discovered America in 1492?",
          "options": [
            {
              "correct": 0,
              "choice": "James Cook"
            },
            {
              "correct": 0,
              "choice": "Ferdinand Magellan"
            },
            {
              "correct": 0,
              "choice": "Marco Polo"
            },
            {
              "correct": 1,
              "choice": "Christopher Columbus"
            }
          ],
          "id": 3,
          "title": "World History Basics"
        },
        {
          "question_text": "In which year did World War II end?",
          "options": [
            {
              "correct": 0,
              "choice": "1965"
            },
            {
              "correct": 0,
              "choice": "1918"
            },
            {
              "correct": 0,
              "choice": "1939"
            },
            {
              "correct": 1,
              "choice": "1945"
            }
          ],
          "id": 4,
          "title": "World History Basics"
        },
        {
          "question_text": "How many senators are there in the US Senate?",
          "options": [
            {
              "correct": 0,
              "choice": "200"
            },
            {
              "correct": 0,
              "choice": "435"
            },
            {
              "correct": 0,
              "choice": "50"
            },
            {
              "correct": 1,
              "choice": "100"
            }
          ],
          "id": 5,
          "title": "US Politics 101"
        },
        {
          "question_text": "What is the highest court in the United States?",
          "options": [
            {
              "correct": 0,
              "choice": "Pentagon"
            },
            {
              "correct": 0,
              "choice": "White House"
            },
            {
              "correct": 0,
              "choice": "Congress"
            },
            {
              "correct": 1,
              "choice": "Supreme Court"
            }
          ],
          "id": 6,
          "title": "US Politics 101"
        }
      ];


    var sampleUsers = [
        {
            "CREATED_AT": "2026-02-25T10:56:12",
            "HINTS": 1,
            "USERNAME": "Alice",
            "certificateCount": 2,
            "total_score": 160,
            "id": 1
          },
          {
            "CREATED_AT": "2026-02-25T10:56:12",
            "HINTS": 1,
            "USERNAME": "Alice",
            "certificateCount": 2,
            "total_score": 1500,
            "id": 1
          },
          {
            "CREATED_AT": "2026-02-25T10:56:12",
            "HINTS": 1,
            "USERNAME": "Bob",
            "certificateCount": 2,
            "total_score": 60,
            "id": 2
          },
          {
            "CREATED_AT": "2026-02-25T10:56:12",
            "HINTS": 1,
            "USERNAME": "Bob",
            "certificateCount": 2,
            "total_score": 1200,
            "id": 2
          },
          {
            "CREATED_AT": "2026-02-25T10:56:12",
            "HINTS": 1,
            "USERNAME": "Charlie",
            "certificateCount": 1,
            "total_score": 90,
            "id": 3
          },
          {
            "CREATED_AT": "2026-02-25T10:56:12",
            "HINTS": 1,
            "USERNAME": "Charlie",
            "certificateCount": 1,
            "total_score": 900,
            "id": 3
          },
          {
            "CREATED_AT": "2026-02-25T10:56:12",
            "HINTS": 1,
            "USERNAME": "Alice",
            "certificateCount": 1,
            "total_score": 0,
            "id": 4
          },
          {
            "CREATED_AT": "2026-02-25T10:56:12",
            "HINTS": 2,
            "USERNAME": "Bob",
            "certificateCount": 1,
            "total_score": 0,
            "id": 5
          },
          {
            "CREATED_AT": "2026-02-25T10:56:12",
            "HINTS": 3,
            "USERNAME": "Charlie",
            "certificateCount": 0,
            "total_score": 0,
            "id": 6
          },
          {
            "CREATED_AT": "2026-02-25T10:56:12",
            "HINTS": 1,
            "USERNAME": "Alice",
            "certificateCount": 0,
            "total_score": 0,
            "id": 7
          },
          {
            "CREATED_AT": "2026-02-25T10:56:12",
            "HINTS": 2,
            "USERNAME": "Bob",
            "certificateCount": 0,
            "total_score": 0,
            "id": 8
          },
          {
            "CREATED_AT": "2026-02-25T10:56:12",
            "HINTS": 3,
            "USERNAME": "Charlie",
            "certificateCount": 0,
            "total_score": 0,
            "id": 9
          },
          {
            "CREATED_AT": "2026-02-25T11:00",
            "HINTS": 1,
            "USERNAME": "Diana",
            "certificateCount": 0,
            "total_score": 0,
            "id": 10
          },
          {
            "CREATED_AT": "2026-02-25T11:05",
            "HINTS": 2,
            "USERNAME": "Eve",
            "certificateCount": 0,
            "total_score": 0,
            "id": 11
          },
          {
            "CREATED_AT": "2026-02-26T09:36:53",
            "HINTS": 1,
            "USERNAME": "Alice",
            "certificateCount": 0,
            "total_score": 0,
            "id": 12
          },
          {
            "CREATED_AT": "2026-02-26T09:36:53",
            "HINTS": 2,
            "USERNAME": "Bob",
            "certificateCount": 0,
            "total_score": 0,
            "id": 13
          },
          {
            "CREATED_AT": "2026-02-26T09:36:53",
            "HINTS": 3,
            "USERNAME": "Charlie",
            "certificateCount": 0,
            "total_score": 0,
            "id": 14
          },
          {
            "CREATED_AT": "2026-02-26T09:36:53",
            "HINTS": 1,
            "USERNAME": "Diana",
            "certificateCount": 0,
            "total_score": 0,
            "id": 15
          },
          {
            "CREATED_AT": "2026-02-26T09:36:53",
            "HINTS": 2,
            "USERNAME": "Eve",
            "certificateCount": 0,
            "total_score": 0,
            "id": 16
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
                    console.log(questContainer.find(".question_number").attr("value"));
                }

                if(messageContainer.length != 0){
                    console.log(messageContainer.find("#message_header").attr("value"));
                }
             })
            $(document).on("click",".delete",(e)=>{
                let questContainer=$(e.target).closest(".question_details");
                let messageContainer=$(e.target).closest(".message");

                if(questContainer.length !=0){
                    console.log(questContainer.find(".question_number").attr("value"));
                }

                if(messageContainer.length != 0){
                    console.log(messageContainer.find("#message_header").attr("value"));
                }
            })

            $(document).on("click","#import",()=>{
                Import();
            })
            $(document).on("click","#export",()=>{
                Export();
            })

        },
        view:{
            show:{
                dashBoard:async function(){

                    let data = await Admin.get.dashBoard();

                    $("#total-user-count").text(data.USERCOUNT);
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
                    for(i=0;i<questionData.length;i++){
                        $("#quiz_container").append(createQuestionContainer(i+1,questionData[i]));
                    }
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

    $("<div>").addClass("user-name").text(value.USERNAME).appendTo(maindiv);
    $("<div>").addClass("user-point").text(value.total_score).appendTo(maindiv);
    $("<div>").addClass("user-certificate").text(value.certificateCount).appendTo(maindiv);
    $("<div>").addClass("user-hint").text(value.HINTS).appendTo(maindiv);
    $("<div>").addClass("user-joined").text(value.CREATED_AT.split("T")[0]).appendTo(maindiv);
    return maindiv;
  }

  function createUserDetailHead() {
    let headDiv = $("<div>").attr("id", "user-detail-head");
  
    $("<h3>").text("User").appendTo(headDiv);
    $("<h3>").text("Points").appendTo(headDiv);
    $("<h3>").text("Certificates").appendTo(headDiv);
    $("<h3>").text("Hint").appendTo(headDiv);
    $("<h3>").text("Joined").appendTo(headDiv);
  
    return headDiv;
  }

  function createMessageContainer(data){
        let container=$("<div>").addClass("message")

        let header=$("<div>").attr("id","message_header").attr("value",data.announcementId)

        $("<h2>").addClass("message-heading").text(data.title).appendTo(header);

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

        $("<p>").addClass("message-time").text(" "+data.createdAt.split(" ")[0]).appendTo(container);

        return container;
    }

function announcementButton(){
    let img=$("<img>").attr("src","../icons/colorized-send.png");
    return $("<button>").attr("id","newAnnouncement").append(img).append("New Announcement");
}

function createQuestionContainer(count,data) {
    
    let container = $("<div>").addClass("question_container");

    let questionDetails = $("<div>").addClass("question_details");

    let detailLeft = $("<div>").addClass("question_detail_left");
    let questionNumber = $("<div>").addClass("question_number").text(count).attr("value",data.id);
    let questionCategory = $("<div>").addClass("question_category").text(data.title);
    detailLeft.append(questionNumber, questionCategory);

    let detailRight = $("<div>").addClass("question_detail_right");

    let edit = $("<div>").addClass("edit");
    let editImg = $("<img>").attr("src", "../icons/blue-pencil.png").attr("alt", "edit img");
    edit.append(editImg);

    let deleteAction = $("<div>").addClass("delete");
    let deleteImg = $("<img>").attr("src", "../icons/colorized-bin.png").attr("alt", "delete img");
    deleteAction.append(deleteImg);

    detailRight.append(edit, deleteAction);

    questionDetails.append(detailLeft, detailRight);

    let questionText = $("<h3>").addClass("question").text(data.question_text);

    let optionsContainer = $("<div>").addClass("options");
    data.options.forEach(opt => {
        let optionDiv = $("<div>").addClass("option").text(opt.choice);
        if(opt.correct) optionDiv.addClass("correct");
        optionsContainer.append(optionDiv);
    });

    container.append(questionDetails, questionText, optionsContainer);

    return container;
}






// --------->ai

function Export() {
    let value = "User,Points,Certificates,Most Played,Hint,Joined";

    let length = $(".user-detail").length;

    for (let i = 0; i < length; i++) {
        value += "\n";
        value += $(".user-name").eq(i).text() + ",";
        value += $(".user-point").eq(i).text() + ",";
        value += $(".user-certificate").eq(i).text() + ",";
        value += $(".most-played").eq(i).text() + ",";
        value += $(".user-hint").eq(i).text() + ",";
        value += $(".user-joined").eq(i).text();
    }

    let content = "data:text/csv;charset=utf-8," + encodeURIComponent(value);

    let link = document.createElement("a");
    link.setAttribute("href", content);
    link.setAttribute("download", "my_data.csv");

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// function Export(){
//     let value="User,Points,Certificates,Most Played,Hint,Joined";

//     let length=$(".user-detail").length;

//     for (let i = 0; i < length; i++) {
//         value+="\n";
//         value+=$(".user-name")[i].text()
//         value+=$(".user-point")[i].text()
//         value+=$("user-certificate")[i].text()
//         value+=$("most-played")[i].text()
//         value+=$("user-hint")[i].text()
//         value+=$("user-joined")[i].text()
//     }
//         let content = "data:text/csv;charset=utf-8," + value;

//         var encodedUri = encodeURI(content);

//         let link = document.createElement("a");
//         link.setAttribute("href", encodedUri);
//         link.setAttribute("download", "my_data.csv");

//         document.body.appendChild(link);

//         link.click();

//         document.body.removeChild(link);
// }

// function Import(){
//     $("#importFile").trigger("click");

//     const file=$("#importFile")[0].files[0];
//      const fileReader=new FileReader();
//      fileReader.readAsText(file);
//      let result="";
//      fileReader.onload=()=>{
//           result=fileReader.result.split("\n");  
         
//      }
//      console.log(result);
// }


$("#importFile").on("change", function () {

    const file = this.files[0];
    if (!file) return;

    const fileReader = new FileReader();

    fileReader.onload = function () {
        const result = fileReader.result.split("\n");
        let insertedQuiz = []
        for (let i = 1; i < result.length; i++) {
    
            if (!result[i].trim()) continue;
            let array = result[i].split(",").map(value => value.replace(/"/g, "").trim());
    
            questionData = {
                number: i + 1,
                category: "Imported",
                type: "Imported",
                question: array[0],
                options: [
                    { text: array[1],correct: array[1] == array[5] },
                    { text: array[2],correct: array[2] == array[5] },
                    { text: array[3],correct: array[3] == array[5] },
                    { text: array[4],correct: array[4] == array[5] }
                ]
            };
            insertedQuiz.push(questionData)
            $("#quiz_container").append(createQuestionContainer(questionData));
        }

        localStorage.setItem("quizData", JSON.stringify(insertedQuiz));
    };
    fileReader.readAsText(file);
});

function Import() {
    $("#importFile").trigger("click");
}
