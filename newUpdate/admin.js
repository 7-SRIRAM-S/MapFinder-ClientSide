Admin = (function() {

    var Api = {
        show: {
            UserDetailUrl: "/MapFinder/admin/users",
            dashBoardUrl: "/MapFinder/admin/dashboard",
            messageUrl: "/MapFinder/admin/announcements",
            questionUrl: "/MapFinder/admin/questions",
            messageWthIdUrl: "/MapFinder/admin/announcement?id={1}",
            categoryTypeUrl: "/MapFinder/admin/contentType"
        },
        delete: {
            messageUrl: "/MapFinder/admin/deletemessage?messageId={1}",
            questionUrl: "/MapFinder/admin/deletequestion?questionId={1}"
        },
        save: {
            userUrl: "/MapFinder/admin/saveUsers",
        },
        post: {
            messageUrl: "/MapFinder/admin/message",
            questionUrl: "/MapFinder/admin/questions"
        },
        edit: {
            messageUrl: "/MapFinder/admin/editMessage"
        }
    }
    return {
        init: function() {
            $("#user-statistic").addClass("selected_blue").prop("disabled", true);
            $("#statistic_view").addClass("show");
            $("#admin-dashboard").addClass("show");

            console.log($(".edit").length);
            Admin.view.show.userDetail();
            Admin.view.show.dashBoard();
            console.log(Api.show.dashBoardUrl);

            $("#quiz-management").on("click", () => {
                $("#quiz-management").addClass("selected_green").prop("disabled", true);
                $("#user-statistic").removeClass("selected_blue").prop("disabled", false);
                $("#announcement").removeClass("selected_orange").prop("disabled", false);
                $("#statistic_view").removeClass("show");
                $("#quiz_view").addClass("show");
                $("#announcement_view").removeClass("show");
                Admin.view.show.question();
            })

            $("#user-statistic").on("click", () => {
                $("#quiz-management").removeClass("selected_green").prop("disabled", false);
                $("#user-statistic").addClass("selected_blue").prop("disabled", true);
                $("#announcement").removeClass("selected_orange").prop("disabled", false);
                $("#statistic_view").addClass("show");
                $("#quiz_view").removeClass("show");
                $("#announcement_view").removeClass("show");
                Admin.view.show.userDetail();
                Admin.view.show.dashBoard();
            })

            $("#announcement").on("click", () => {
                $("#quiz-management").removeClass("selected_green").prop("disabled", false);
                $("#user-statistic").removeClass("selected_blue").prop("disabled", false);
                $("#announcement").addClass("selected_orange").prop("disabled", true);
                $("#statistic_view").removeClass("show");
                $("#quiz_view").removeClass("show");
                $("#announcement_view").addClass("show");
                Admin.view.show.messages();
            })

            $(document).on("click", ".edit", (e) => {
                let questContainer = $(e.target).closest(".question_details");
                let messageContainer = $(e.target).closest(".message");

                if (questContainer.length != 0) {
                    let id = questContainer.find(".question_number").attr("value");
                    console.log(id);
                    Admin.view.show.editQuestion(id);
                }

                if (messageContainer.length != 0) {
                    console.log(messageContainer.find("#message_header").attr("value"));
                    Admin.view.show.messageContainer(messageContainer.find("#message_header").attr("value"));
                }
            })
            $(document).on("click", ".delete", (e) => {
                let questContainer = $(e.target).closest(".question_details");
                let messageContainer = $(e.target).closest(".message");

                if (questContainer.length != 0) {
                    console.log(questContainer.find(".question_number").attr("value"));
                    Admin.delete.question(questContainer.find(".question_number").attr("value"));
                }

                if (messageContainer.length != 0) {
                    console.log(messageContainer.find("#message_header").attr("value"));
                    Admin.delete.message(messageContainer.find("#message_header").attr("value"));
                }
            })

            $(document).on("click", "#import", () => {
                Import();
            })
            $(document).on("click", "#export", () => {
                Admin.view.save.user();
            })

            $(document).on("click", "#newAnnouncement", () => {
                $("#announcement_title").val("")
                $("#announcement_message").val("")
                $("#admin-dashboard").removeClass("show");
                $("#announcement_page").addClass("show");
            })
            $(document).on("click", "#close", () => {
                $("#admin-dashboard").addClass("show");
                $("#announcement_page").removeClass("show");
            })
            $(document).on("click", "#announcement_submit", () => {
                if ($("#announcement_submit").data("id")) {
                    Admin.edit.message();
                } else {
                    Admin.add.message();
                }
            })

            $(document).on("click", "#addQuestion", () => {
                $("#admin-dashboard").removeClass("show");
                $("#quesstionform_page").addClass("show");
                Admin.view.show.category();
            })

            $(document).on("click", "#closequesstionform", () => {
                $("#quesstionform_page").removeClass("show");
                $("#admin-dashboard").addClass("show");
            })

            $(document).on("click", "#quesstionform_submit", () => {

                if ($("#quesstionform_submit").data("id")) {
                    Admin.edit.question();
                } else {
                    Admin.add.question();
                }
            });

        },
        view: {
            show: {
                dashBoard: async function() {

                    let value = await Admin.get.dashBoard();
                    let data = value.data;
                    console.log(data);
                    $("#total-user-count").text(data.USERCOUNT);
                    $("#total-points-count").text(data.POINTS);
                    $("#total-certificate-count").text(data.CERTIFICATES);
                    $("#avg-hint").text(data.HINTS);

                },
                userDetail: async function() {

                    let value = await Admin.get.userDetail()
                    let data = value.data;
                    console.log(data);
                    let container = $("#user-detail-container").html("");

                    container.append(createUserDetailHead());
                    for (let i = 0;i < data.length;i++) {
                        if (i == data.length - 1) {
                            container.append(createUserDetailRow(data[i]).addClass("last"));
                        } else {
                            container.append(createUserDetailRow(data[i]));
                        }
                    }

                },
                messages: async function() {
                    let value = await Admin.get.messages();
                    let data = value.data;
                    console.log(data);
                    let container = $("#announcement_view").html("");
                    container.append(announcementButton());
                    for (i = 0;i < data.length;i++) {
                        container.append(createMessageContainer(data[i]));
                    }
                },
                question: async function() {
                    let value = await Admin.get.question();
                    let data = value.data;
                    console.log(data)
                    $("#quiz_container").html($("<h3>").attr("id", "quizquestioncount").text(5));
                    for (let i = 0;i < data.length;i++) {
                        $("#quiz_container").append(createQuestionContainer(i + 1, data[i]));
                    }
                },
                messageContainer: async function(id) {
                    let value = await Admin.get.messageWithId(id);

                    let data = value.data;

                    $("#admin-dashboard").removeClass("show");
                    $("#announcement_page").addClass("show");

                    $("#announcement_title").val(data.title)
                    $("#announcement_message").val(data.message)
                    $("#announcement_submit").data("id", data.id);;
                },
                editQuestion: async function(id) {

                    let value = await Admin.get.questionById(id);
                    let data = value.data;

                    // show form
                    $("#admin-dashboard").removeClass("show");
                    $("#quesstionform_page").addClass("show");

                    // fill question
                    $("#quesstionform_question").val(data.question_text);

                    // fill options
                    $("#choice1").val(data.options[0].choice);
                    $("#choice2").val(data.options[1].choice);
                    $("#choice3").val(data.options[2].choice);
                    $("#choice4").val(data.options[3].choice);

                    // mark correct radio
                    $("#option1").prop("checked", data.options[0].correct);
                    $("#option2").prop("checked", data.options[1].correct);
                    $("#option3").prop("checked", data.options[2].correct);
                    $("#option4").prop("checked", data.options[3].correct);

                    // set category
                    $("#category").val(data.title);

                    // store id for update mode
                    $("#quesstionform_submit").data("id", data.id);
                },
                category: async function() {
                    let value = await Admin.get.category();

                    let data = value.data;

                    let drop = $("#category").html("");
                    drop.append('<option value="">-- select category --</option>');
                    console.log(data[0].contentType, data.length);

                    for (let i = 0;i < data.length;i++) {
                        drop.append($("<option>").attr("id", data[i].id).attr("value", data[i].contentType).text(data[i].contentType).addClass(data[i].contentType));
                    }
                }
            },
            save: {
                user: function() {
                    Admin.get.save();
                }
            }
        },
        add: {
            message: function() {
                if ($("#announcement_title").val().trim() == "") {
                    return;
                }
                if ($("#announcement_message").val().trim() == "") {
                    return;
                }
                let data = {
                    "title": $("#announcement_title").val(),
                    "message": $("#announcement_message").val()
                }
                Admin.Post.message(data);
            },
            question: function() {
                console.log($("#quesstionform_question").val(), $("#choice1").val())
                if ($("#quesstionform_question").val().trim() == "") {
                    return;
                }
                if ($("#choice1").val().trim() == "") {
                    return;
                }
                if ($("#choice2").val().trim() == "") {
                    return;
                }
                if ($("#choice3").val().trim() == "") {
                    return;
                }
                if ($("#choice4").val().trim() == "") {
                    return;
                }
                if ($("#category").val().trim() == "") {
                    return;
                }

                console.log($("#option1").is(":checked"));
                console.log($("#option2").is(":checked"));
                console.log($("#option3").is(":checked"));
                console.log($("#option4").is(":checked"));

                let value = $("#category").val();

                let option = $("#category").find("." + value);

                let data = {
                    "option": [$("#choice1").val(), $("#choice2").val(), $("#choice3").val(), $("#choice4").val()],
                    "choice": [$("#option1").is(":checked"), $("#option2").is(":checked"), $("#option3").is(":checked"), $("#option4").is(":checked")],
                    "question": $("#quesstionform_question").val(),
                    "id": option.attr("id")
                }

                Admin.Post.question(data);
                console.log(data);
            }
        },
        delete: {
            message: function(value) {
                Admin.Delete.message(value);
            },
            question: function(value) {
                Admin.Delete.question(value);
            }
        },
        edit: {
            message: function() {
                let data = {
                    "title": $("#announcement_title").val(),
                    "message": $("#announcement_message").val(),
                    "id": $("#announcement_submit").data("id")
                }

                $("#announcement_submit").removeData("id")
                Admin.Post.editMessage(data);

            },
            question: function() {

                let id = $("#quesstionform_submit").data("id");

                let value = $("#category").val();
                let option = $("#category").find("." + value);

                let data = {
                    id: id,
                    question: $("#quesstionform_question").val(),
                    option: [
                        $("#choice1").val(),
                        $("#choice2").val(),
                        $("#choice3").val(),
                        $("#choice4").val()
                    ],
                    choice: [
                        $("#option1").is(":checked"),
                        $("#option2").is(":checked"),
                        $("#option3").is(":checked"),
                        $("#option4").is(":checked")
                    ],
                    categoryId: option.attr("id")
                };

                $("#quesstionform_submit").removeData("id");

                Admin.Post.editQuestion(data);
            }
        },
        get: {
            dashBoard: async function() {
                let url = Api.show.dashBoardUrl
                try {
                    let response = await API.get(url);
                    return response.data;
                } catch (error) {
                    console.log("error", error);
                }
            },
            userDetail: async function() {
                let url = Api.show.UserDetailUrl
                try {
                    let response = await API.get(url);
                    return response.data;
                } catch (error) {
                    console.log("error", error);
                }
            },
            messages: async function() {
                let url = Api.show.messageUrl
                try {
                    let response = await API.get(url);
                    return response.data;
                } catch (error) {
                    console.log("error", error);
                }
            },
            question: async function() {
                let url = Api.show.questionUrl
                try {
                    let response = await API.get(url);
                    return response.data;
                } catch (error) {
                    console.log("error", error);
                }
            },
            category: async function() {
                let url = Api.show.categoryTypeUrl
                try {
                    let response = await API.get(url);
                    return response.data;
                } catch (error) {
                    console.log("error", error);
                }
            },
            questionById: async function(id) {
                let url = "/MapFinder/admin/question?id=" + id;

                try {
                    let response = await API.get(url);
                    return response.data;
                } catch (error) {
                    console.log("error", error);
                }
            },
            save: function() {
                let url = Api.save.userUrl

                window.location.href = url;
            },
            messageWithId: async function(id) {
                let url = Api.show.messageWthIdUrl.replace("{1}", id);
                try {
                    let response = await API.get(url);
                    return response.data;
                } catch (error) {
                    console.log("error", error);
                }

            }
        },
        Post: {
            message: async function(data) {
                let url = Api.post.messageUrl
                try {
                    let responce = await API.post(url, data);

                    $("#admin-dashboard").addClass("show");
                    $("#announcement_page").removeClass("show");
                    Admin.view.show.messages();
                } catch (error) {
                    console.log("error", error);
                }
            },
            editMessage: async function(data) {
                let url = Api.edit.messageUrl

                try {
                    let response = await API.post(url, data);
                    $("#admin-dashboard").addClass("show");
                    $("#announcement_page").removeClass("show");
                    Admin.view.show.messages();
                } catch (error) {
                    console.log("error", error);
                }
            },
            question: async function(data) {
                let url = Api.post.questionUrl
                try {
                    let responce = await API.post(url, data);
                    $("#quesstionform_page").removeClass("show");
                    $("#admin-dashboard").addClass("show");
                    Admin.view.show.question();
                } catch (error) {
                    console.log("error", error);
                }
            },
            editQuestion: async function(data) {

                let url = "/MapFinder/admin/editQuestion";

                try {
                    await API.post(url, data);

                    $("#quesstionform_page").removeClass("show");
                    $("#admin-dashboard").addClass("show");

                    Admin.view.show.question();

                } catch (error) {
                    console.log("error", error);
                }
            }
        },
        Delete: {
            message: async function(id) {
                let url = Api.delete.messageUrl.replace("{1}", id);
                try {
                    console.log(url);
                    await API.get(url);
                    Admin.view.show.messages();
                } catch (error) {
                    console.log("error", error);
                }

            },
            question: async function(id) {
                let url = Api.delete.questionUrl.replace("{1}", id);
                try {
                    console.log(url);
                    await API.get(url);
                    Admin.view.show.question();
                } catch (error) {
                    console.log("error", error);
                }
            }
        }
    }
})();
Admin.init();


function createUserDetailRow(value) {
    let maindiv = $("<div>").addClass("user-detail");

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

function createMessageContainer(data) {
    let container = $("<div>").addClass("message")

    let header = $("<div>").attr("id", "message_header").attr("value", data.announcementId)

    $("<h2>").addClass("message-heading").text(data.title).appendTo(header);

    let messageAction = $("<div>").attr("id", "message-action");

    let edit = $("<div>").addClass("edit");
    let editImg = $("<img>")
        .attr("src", "./icons/blue-pencil.png")
        .attr("alt", "");

    edit.append(editImg);

    let deletebuton = $("<div>").addClass("delete");
    let deleteImg = $("<img>").attr("src", "./icons/colorized-bin.png").attr("alt", "");

    deletebuton.append(deleteImg);

    messageAction.append(edit, deletebuton);

    header.append(messageAction).appendTo(container);

    $("<p>").addClass("message-content").text(data.message).appendTo(container);

    $("<p>").addClass("message-time").text(" " + data.createdAt.split(" ")[0]).appendTo(container);

    return container;
}

function announcementButton() {
    let img = $("<img>").attr("src", "./icons/colorized-send.png");
    return $("<button>").attr("id", "newAnnouncement").append(img).append("New Announcement");
}

function createQuestionContainer(count, data) {

    let container = $("<div>").addClass("question_container");

    let questionDetails = $("<div>").addClass("question_details");

    let detailLeft = $("<div>").addClass("question_detail_left");
    let questionNumber = $("<div>").addClass("question_number").text(count).attr("value", data.id);
    let questionCategory = $("<div>").addClass("question_category").text(data.title);
    detailLeft.append(questionNumber, questionCategory);

    let detailRight = $("<div>").addClass("question_detail_right");

    let edit = $("<div>").addClass("edit");
    let editImg = $("<img>").attr("src", "./icons/blue-pencil.png").attr("alt", "edit img");
    edit.append(editImg);

    let deleteAction = $("<div>").addClass("delete");
    let deleteImg = $("<img>").attr("src", "./icons/colorized-bin.png").attr("alt", "delete img");
    deleteAction.append(deleteImg);

    detailRight.append(edit, deleteAction);

    questionDetails.append(detailLeft, detailRight);

    let questionText = $("<h3>").addClass("question").text(data.question_text);

    let optionsContainer = $("<div>").addClass("options");
    data.options.forEach(opt => {
        let optionDiv = $("<div>").addClass("option").text(opt.choice);
        if (opt.correct) optionDiv.addClass("correct");
        optionsContainer.append(optionDiv);
    });

    container.append(questionDetails, questionText, optionsContainer);

    return container;
}






// --------->ai

function Export() {
    let value = "User,Points,Certificates,Most Played,Hint,Joined";

    let length = $(".user-detail").length;

    for (let i = 0;i < length;i++) {
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


$("#importFile").on("change", function() {

    const file = this.files[0];
    if (!file) return;

    const fileReader = new FileReader();

    fileReader.onload = function() {
        const result = fileReader.result.split("\n");
        let insertedQuiz = []
        for (let i = 1;i < result.length;i++) {

            if (!result[i].trim()) continue;
            let array = result[i].split(",").map(value => value.replace(/"/g, "").trim());

            questionData = {
                id: i + 1,
                title: "Imported",
                type: "Imported",
                question_text: array[0],
                options: [
                    { choice: array[1], correct: array[1] == array[5] },
                    { choice: array[2], correct: array[2] == array[5] },
                    { choice: array[3], correct: array[3] == array[5] },
                    { choice: array[4], correct: array[4] == array[5] }
                ]
            };
            insertedQuiz.push(questionData)
            $("#quiz_container").append(createQuestionContainer(i, questionData));
        }
        console.log("insertedQuizzz");
        console.log(insertedQuiz);
        localStorage.setItem("quizData", JSON.stringify(insertedQuiz));
        saveImportedQuiz();
    };
    fileReader.readAsText(file);
});

function Import() {
    $("#importFile").trigger("click");
}



async function getQuiz() {
    try {
        let response = await fetch("/MapFinder/quizz");

        if (!response.ok) {
            throw new Error("HTTP error " + response.status);
        }

        let data = await response.json();

    } catch (error) {
        console.error("Error fetching quiz:", error);
    }
}

getQuiz();


async function saveImportedQuiz() {

    const quizData = JSON.parse(localStorage.getItem("quizData"));

    const payload = {
        title: "Imported Quiz",
        description: "Uploaded from CSV",
        issuerName: "Admin",
        contentType: "history",
        questions: quizData
    };

    const response = await fetch("/MapFinder/quizz", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });

    const result = await response.text();
    console.log(result);
}
