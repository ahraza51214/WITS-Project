<?php
session_start();
function api($func){
    /* free for all */
    switch($func){
        case "checkLogin":
            if(isset($_SESSION["loggedin"])){
                echo true;
            } else {
                echo false;
            }
            exit;
            break;

        case "login":
            unset($_SESSION["loggedin"]);

            $users = [];
            $fileName = "data/users.json";
            if (file_exists($fileName)) {
                $json = file_get_contents($fileName);
                $users = json_decode($json, true);
            }

            foreach ($users as $user) {
                if (strtolower($user['username']) == strtolower($_POST['username']) && $user['password'] == $_POST['password']) {
                    $_SESSION["loggedin"] = true; // logged in
                    $_SESSION["username"] = strtolower($user['username']);
                }
            }
            api("checkLogin");
            exit;
            break;

        case "register":
            // PREVENT CREATE A USER WITHOUT A USERNAME OR PASSWORD
            if(!empty($_POST["username"])&&!empty($_POST["password"])){
                $users = [];
                $fileName = "data/users.json";
                if (file_exists($fileName)) {
                    $json = file_get_contents($fileName);
                    $users = json_decode($json, true);
                }

                $newUser = [
                    "name" => $_POST["name"],
                    "username" => $_POST["username"],
                    "password" => $_POST["password"]
                ];

                $createUser = true;
                foreach($users as $user){
                    if(empty($newUser["username"])||empty($newUser["password"])){
                        $createUser = false;
                    }
                    if(strtolower($user["username"])==strtolower($newUser["username"])){
                        $createUser = false;
                    }
                }

                if(isset($createUser)&&$createUser==true){
                    $users[] = $newUser;
                } else {
                    echo false;
                    exit;
                }

                $json = json_encode($users, JSON_PRETTY_PRINT);
                file_put_contents($fileName, $json);

                echo true;
            } else {

            }
            exit;
            break;

        case "logout":
            unset($_SESSION["loggedin"]);
            echo true;
            exit;
            break;

        case "loadQuestions":
            $fileName = "data/questions.json";
            if (file_exists($fileName)) {
                $json = file_get_contents($fileName);
                //$questions = json_decode($json, true);
            } else {
                $json = json_encode([],JSON_PRETTY_PRINT);
                file_put_contents($fileName,$json);
            }
            echo $json;
            exit;
            break;
    }

    /* Requires Login Session */
    if(isset($_SESSION["loggedin"])){
        switch($func){
            case "sendQuestion":
                if(!empty($_POST["title"])&&!empty($_POST["message"])){
                    $fileName = "data/questions.json";
                    if (file_exists($fileName)) {
                        $json = file_get_contents($fileName);
                        $questions = json_decode($json, true);
                    }

                    $newQuestion = [
                        "id" => Count($questions),
                        "title" => $_POST["title"],
                        "message" => $_POST["message"],
                        "date" => date("d-m-Y H:i:s"),
                        "username" => $_SESSION["username"],
                        "replies" => []
                    ];

                    $questions[] = $newQuestion;

                    $json = json_encode($questions, JSON_PRETTY_PRINT);
                    file_put_contents($fileName, $json);
                    echo true;
                } else {
                    echo false;
                }
                exit;
                break;

            case "sendReply":
                if(isset($_POST["threadId"])&&!empty($_POST["message"])){
                    $fileName = "data/questions.json";
                    if (file_exists($fileName)) {
                        $json = file_get_contents($fileName);
                        $questions = json_decode($json, true);
                    }

                    foreach($questions as $i => $question){
                        if($question["id"]==$_POST["threadId"]){
                            $newReply = [
                                "id" => count($question["replies"]),
                                "message" => $_POST["message"],
                                "username" => $_SESSION["username"],
                                "date" => date("d-m-Y H:i:s")
                            ];
                            $questions[$i]["replies"][] = $newReply;
                        }
                    }
                    $json = json_encode($questions, JSON_PRETTY_PRINT);
                    file_put_contents($fileName, $json);
                    echo true;
                } else {
                    echo false;
                }
                exit;
                break;

            case "editQuestion":

                exit;
                break;

            case "editReply":
                if(isset($_POST["threadId"])&&isset($_POST["replyId"])&&!empty($_POST["message"])){
                    $fileName = "data/questions.json";
                    if (file_exists($fileName)) {
                        $json = file_get_contents($fileName);
                        $questions = json_decode($json, true);
                    }

                    foreach($questions as $i => $question){
                        if($question["id"]==$_POST["threadId"]){
                            foreach ($question["replies"] as $j => $reply) {
                                if($reply["id"]==$_POST["replyId"]){
                                    $questions[$i]["replies"][$j]["message"] = $_POST["message"];
                                    $questions[$i]["replies"][$j]["date"] = date("d-m-Y H:i:s");
                                }
                            }
                        }
                    }

                    $json = json_encode($questions, JSON_PRETTY_PRINT);
                    file_put_contents($fileName, $json);
                    echo true;
                } else {
                    echo false;
                }
                exit;
            break;
            case "getUserData":

                $users = [];
                $fileName = "data/users.json";
                if(file_exists($fileName)){
                    $json = file_get_contents($fileName);
                    $users = json_decode($json,true);

                }
                foreach($users as $user){

                    if(strtolower($_SESSION["username"])==strtolower($user["username"])){
                        echo json_encode(["name"=>strtolower($user["name"]), "username"=>strtolower($user["username"])]);
                    }
                }
                exit;

            break;
        }
    }
}
if(isset($_POST["function"])){
    api($_POST["function"]);
} else if(isset($_GET["function"])){
    api($_GET["function"]);
};

session_write_close();
