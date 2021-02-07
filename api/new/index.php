<?php
    require_once __DIR__ . '/actions.php';

    $servername = "localhost";
    $username = "localst3_umst";
    $password = "Mst123!!";
    $dbname = "localst3_mst";
    
    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
        
    // Check connection
    if ($conn->connect_error) {
        http_response_code(500);
        die(json_encode(['message' => "Database connection failed: " . $conn->connect_error]));
    }

    $action = new Action($conn);

    $body = json_decode(file_get_contents('php://input'), true);
    $type = $_SERVER['HTTP_ACTION'];
    $userId = $_GET['userId'];
    
    // HANDLE INCOMING HTTP REQUESTS
    switch ($type) {
        case 'SIGNUP':
            $action->addUser($body);
            break;
        case 'LOGIN':
            $action->loginUser($body);
            break;
        case 'ADD_QUIZ':
            $action->addQuiz($body, $userId);
            break;
        case 'GET_QUIZES':
        	$type = $_GET['type'];
        	$level = $_GET['level'];
            $action->getQuizes($userId,$type,$level);
            break;
        case 'GET_SUMMERY':
            $action->getSummery($userId);
            break;
        case 'GET_TOP':
            $filter = isset($_GET['filter'])?$_GET['filter']:"ALL";
            $action->getTop($userId,$filter);
            break;
        case 'MY_SCORE':
            //$filter = isset($_GET['filter'])?$_GET['filter']:"ALL";
            $action->getMyScore($userId);
            break;
        case 'REQ_CODE':
            $action->requestCode($body);
            break;
        case 'RESET':
            $action->resetDetails($body);
            break;
        case 'GET_USERS_BY_NAME':
            $name = $_GET['name'];
            $action->getUsersByName($name);
            break;
        case 'CHECK_ISFRIEND':
            $action->checkIsFriend($userId);
            break;
        case 'GET_MYFRIENDS_LIST':
            $action->getMyFriendsList($userId);
            break;
        case 'POST_BATTLE':
            $action->postBattle($body, $userId);
            break;
        default:
            http_response_code(404);
            echo 'Welcome to the application API';
            break;
    }
?>
