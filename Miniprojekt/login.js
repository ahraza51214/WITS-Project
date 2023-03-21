let isLoggedin = false;

let data = {
    user : {
        name : null,
        username : null
    }
}

function setLoggedin(state){
    isLoggedin = state;

    if(isLoggedin){
        getUserData();
    } else {
        data.user.name = null;
        data.user.username = null;
    }
    updateLoginUI();
}

function checkLogin (){
    let method = "GET";
    let params = [
        {name : "function", value : "checkLogin"}
    ];

    ajax(method, params, (response)=>{
        if(response==true){
            setLoggedin(true);
        } else {
            loadQuestions(); // I SET THIS HERE BECAUSE OF BUGS
            setLoggedin(false);
        }
    });
}

function login(username, password){
    let method = "POST";
    let params = [
        {name : "function", value : "login"},
        {name : "username", value : username},
        {name : "password", value : password}
    ];

    ajax(method, params, (response)=>{
        if(response == true){
            setLoggedin(true);
            alert("Du er nu logget ind")
        } else {
            setLoggedin(false);
            alert("Log ind fejlede! Prøv igen")
        }
    });
}

function logout(){
    let method = "POST";
    let params = [
        {name : "function", value : "logout"},
    ];

    ajax(method, params, (response)=>{
        if(response==true){
            setLoggedin(false);
        }
    });
    loadQuestions(); // I SET THIS HERE BECAUSE OF BUGS
}

function register(name, username, password){
    let method = "POST";
    let params = [
        {name : "function", value : "register"},
        {name : "name", value : name},
        {name : "username", value : username},
        {name : "password", value : password}
    ];

    ajax(method, params, (response)=>{
        if(response==true){
            alert("du er registeret");
        } else {
            alert("du er ikke registreret");
        }
    });
}

function getUserData(){
    let method = "GET";
    let params = [
        {name : "function", value : "getUserData"}
    ];

    ajax(method, params, (response)=>{
        try{
            let json = JSON.parse(response);
            data.user.name = json.name;
            data.user.username = json.username;
        } catch {
        } finally {
            loadQuestions(); // I SET THIS HERE BECAUSE OF BUGS
        }
    });
}

checkLogin();
