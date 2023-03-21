//FUNCTION TO UPDATE UI IF LOGGED IN OR LOGGED OUT
function updateLoginUI(){
    let loggedinUI = Array.from(getElems("isLoggedin"));
    let notLoggedinUI = Array.from(getElems("isNotLoggedin"));

    notLoggedinUI.forEach(elem => {
        if(!isLoggedin) {
            let flexClass = false;
            elem.classList.forEach(className => {
                if (className == "flex") flexClass = true;
            });
            if(flexClass) elem.style = "display: flex;";
            else elem.style = "display: block;";
        } else notLoggedinUI.forEach(elem => elem.style = "display: none;");
    });

    loggedinUI.forEach(elem => {
        if (isLoggedin) {
            let flexClass = false;
            elem.classList.forEach(className => {
                if (className == "flex") flexClass = true;
            });
            if (flexClass) elem.style = "display: flex;";
            else elem.style = "display: block;";
        } else loggedinUI.forEach(elem => elem.style = "display: none;");
    });
}

function printQuestions(parsedJson){
    getElem('listOfQuestions').innerHTML = "";
    let questions = parsedJson;

    questions.forEach(question => {
        // CREATE QUESTION HEADLINE
        let createQuestionHeadline = document.createElement("h1");
        createQuestionHeadline.innerText = "Question:";
        getElem('listOfQuestions').appendChild(createQuestionHeadline);

        // TITLE
        let title = document.createElement("h3");
        title.innerText = question.title;
        getElem('listOfQuestions').appendChild(title);

        // MESSAGE
        let message = document.createElement("p");
        message.innerText = question.message;
        getElem('listOfQuestions').appendChild(message);

        // USERNAME
        let username = document.createElement("span");
        username.innerText = "User: - "+question.username+" -";
        getElem('listOfQuestions').appendChild(username);

        // DATE
        let date = document.createElement("span");
        date.innerText = "Date: "+question.date;
        getElem('listOfQuestions').appendChild(date);

        // CREATE ANSWER UI
        let createAnswerContainer = document.createElement("div");
        let className = document.createAttribute("class");
        className.value = "isLoggedin";
        createAnswerContainer.setAttributeNode(className);

        // CREATE ANSWER HEADLINE
        let createAnswerHeadline = document.createElement("h3");
        createAnswerHeadline.innerText = "Answers:";
        getElem('listOfQuestions').appendChild(createAnswerHeadline);

        // CREATE REPLY TEXTFIELD HEADLINE
        let headline = document.createElement("label");
        headline.innerText = "Reply";
        headline.style = "display: block;"+"text-align: center;"+"font-size: 1.25em;";
        createAnswerContainer.appendChild(headline);

        // CREATE ANSWER TEXT FIELD
        let textarea = document.createElement("textarea");
        textarea.style = "display: block;"+"min-width: 230px;"+"margin: auto;"+"font-size: 1em;";
        textarea.id = "answerMessageQId"+question.id;
        createAnswerContainer.appendChild(textarea);

        // CREATE ANSWER BUTTON
        let button = document.createElement("button");
        button.innerText = "Send";
        button.style = "display: block;"+"min-width: 236px;"+"margin: auto;";
        let onclick = document.createAttribute("onclick");
        onclick.value = "sendReply("+question.id+",getElem('"+textarea.id+"').value)";
        button.setAttributeNode(onclick);
        createAnswerContainer.appendChild(button);
        getElem('listOfQuestions').appendChild(createAnswerContainer);

        // REPLIES TO THREADS
        question.replies.forEach(reply => {
            // MESSAGE
            if(data.user.username != reply.username){
                let message = document.createElement("p");
                message.innerText = reply.message;
                getElem('listOfQuestions').appendChild(message);
            } else {
                let input = document.createElement("textarea");
                input.value = reply.message;
                input.id = "answerMessageEditQId"+question.id+"RId"+reply.id;
                input.style = "background: lightgreen;"+"font-size: 1em;";

                let onchange = document.createAttribute("onchange");
                onchange.value = "editReply("+question.id+","+reply.id+",getElem('"+input.id+"').value)";
                input.setAttributeNode(onchange);
                getElem('listOfQuestions').appendChild(input);
            }

            // USERNAME
            let username = document.createElement("span");
            username.innerText = "User: - "+reply.username+" -";
            getElem('listOfQuestions').appendChild(username);

            // DATE
            let date = document.createElement("span");
            date.innerText = "Date: "+reply.date;
            getElem('listOfQuestions').appendChild(date);
        });

    });
    updateLoginUI();
}

function createAndAppendElem(child,parent){

}
