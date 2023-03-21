function createQuestion(title,message){
    let method = "POST";
    let params = [
        {name : "function", value : "sendQuestion"},
        {name : "title", value : title},
        {name : "message", value : message}
    ];

    ajax(method, params, (response)=>{
        if(response == true){
            loadQuestions();
            getElem("createQuestionTitle").value = "";
            getElem("createQuestionMessage").value = "";
        }
    });
}

function loadQuestions(title,message){
    let method = "POST";
    let params = [
        {name : "function", value : "loadQuestions"}
    ];

    ajax(method, params, (response)=>{
        let questions = JSON.parse(response);
        printQuestions(questions);
    });
}

function sendReply(threadId,message){
    let method = "POST";
    let params = [
        {name : "function", value : "sendReply"},
        {name : "threadId", value : threadId},
        {name : "message", value : message}
    ];

    ajax(method, params, (response)=>{
        if(response==true){
            console.log("created a reply");
            loadQuestions();
        } else {
            console.log("didn't create a reply");
        }

    });
}

function editReply(threadId, replyId, message){
    let method = "POST";
    let params = [
        {name : "function", value : "editReply"},
        {name : "threadId", value : threadId},
        {name : "replyId", value : replyId},
        {name : "message", value : message}
    ];

    ajax(method, params, (response)=>{
        if(response==true){
            console.log("edited a reply");
            loadQuestions();
        } else {
            console.log("didn't edit a reply");
        }
    });
}
