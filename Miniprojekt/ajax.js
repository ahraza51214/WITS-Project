let ajaxpath = "api.php";
let asynchronousState = false; // false (sync) means executes in order, true (async) means multiple things can run at the same time

function ajax(method, paramsArray, callback){
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if(xhr.readyState == 4 && xhr.status == 200) {
            callback(xhr.responseText);
        }
    }

    let params = "";
    for (let i = 0; i < paramsArray.length; i++){
        if(i==0){
            params += paramsArray[i].name+"="+paramsArray[i].value;
        } else {
            params += "&"+paramsArray[i].name+"="+paramsArray[i].value;
        }
    }

    // METHOD (POST OR GET), URL (with params)
    if(method.toUpperCase()=="GET"){
        xhr.open(method, ajaxpath+"?"+params, asynchronousState);
        xhr.send();
    } else if(method.toUpperCase()=="POST") {
        xhr.open(method, ajaxpath, asynchronousState);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(params);
    }
    return xhr;
}
