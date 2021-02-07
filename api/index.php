<?php
    require_once __DIR__ . '/actions.php';

    $servername = "localhost";
    $username = "mathsnds_umst";
    $password = "Mst123!!";
    $dbname = "mathsnds_mst";
    
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
        case 'UPDATE':
            $action->updateUser($userId,$body);
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
            $action->getUsersByName($name, $userId);
            break;
        case 'CHECK_ISFRIEND':
            $friendId = $_GET['friendId'];
            $action->checkIsFriend($userId,$friendId);
            break;
        case 'GET_MYFRIENDS_LIST':
            $action->getMyFriendsList($userId);
            break;
        case 'POST_BATTLE':
            $action->postBattle($body, $userId);
            break;
        case 'GET_BATTLE_QUESTION':
            $battleId = $_GET['battleId'];
            $isOpen = $_GET['isopen'];
            $action->getBattleQuestionByUserId($userId, $battleId,$isOpen);
            break;
        case 'GET_OPEN_BATTLE_QUESTION':
            $action->getOpenBattleQuestion($userId);
            break;
        case 'PREPARE_OPEN_BATTLE':
            $updated = $_GET['updated'];
            $battleId = $_GET['battleId'];
            $action->prepareOpenBattle($updated,$battleId,$userId);
            break;
        case 'GET_FRIENDS_REQUEST_LIST':
            $action->getFriendsRequestList($userId);
            break;
        case 'UPDATE_BATTLE_RESULT':
            $action->updateBattleResult($body);
            break;
        case 'INVITE_FRIEND':
            $action->inviteFriend($body);
            break;
        case 'UPDATE_FRIEND_REQUEST':
            $action->updateFriendRequest($body);
            break;
        case 'ADD_FRIEND_REQUEST':
            $action->addFriendRequest($body);
            break;
        case 'REMOVE_FRIEND':
            $action->removeFriend($body);
            break;
        case 'SAVE_BATTLE_SUMMARY':
            $action->saveBattleSummary($body,$userId);
            break;
        case 'GET_BATTLE_SUMMARY':
            $action->getBattleSummary($userId);
            break;
        case 'GET_BATTLE_POSITION':
            $battleId = $_GET['battleId'];
            $action->getBattlePosition($battleId,$userId);
            break;
        case 'SAVE_PUSH_TOKENS':
            $action->savePushTokens($body,$userId);
            break;
        case 'PUSH':
            $action->pushNotification($body['token'],$body['body'],$body['title']);
            break;
        case 'BUG_REPORT':
            $action->mailBugReport();
            break;
        default:
            echo 'Welcome to the application API';
            break;
    }
    $conn -> close();
?>
