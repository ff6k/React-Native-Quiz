<?php
    header("Content-Type: application/json");
    class Action {
        public function __construct($connection) {
            $this->conn = $connection;
        }

        private function generateResetCode(){
            $digits = 4;
            $code = rand(pow(10, $digits-1), pow(10, $digits)-1);

            //check is using
            $check = "SELECT id FROM user_reset_code WHERE code='".$code."' AND status=1 AND request_time< NOW() AND expire_time>NOW()";
            $result = $this->conn->query($check);
            if($result->num_rows>0){
                return $this->generateResetCode();
            }
//error_log($code);
            return $code;

        }


        // ADD NEW USER
        public function addUser($user) {
            $data = array('message' => "You've hit the addUser!", 'user' => $user);
            $name= $user['name'];
            $username= $user['username'];
            $password= $user['password'];
            $accName= $user['accName'];
            $email= $user['email'];

            $sql = "INSERT INTO users (name, username, password, profileName, email)
            VALUES ('". $name ."', '". $username ."', SHA2('". $password ."',224), '".$accName."', '".$email."')";
            
            if ($this->conn->query($sql) === TRUE) {
              $lastId = $this->conn->insert_id;
              $data = array('message' => "New user created successfully.", 'id' => $lastId);
              http_response_code(201);
              echo json_encode($data);
            } else {
              $data = array('message' => "Failed to create user", 'error' => $this->conn->error);
              http_response_code(500);
              echo json_encode($data);
              error_log($sql);
              error_log($this->conn->error);
              error_log(json_encode($user));
            }
        }
        
        // LOGIN THE USER
        public function loginUser($user) {
            $name= $user['name'];
            $username= $user['username'];
            $password= $user['password'];

            $sql = "SELECT name, username, id FROM users WHERE username='". $username ."' AND password=SHA2('". $password ."',224)";
            
            $result = $this->conn->query($sql);
            
            if ($result->num_rows > 0) {
                $row = $result->fetch_array(MYSQLI_ASSOC);
                $data = array('message' => 'Login successful!', 'user' => $row);
                http_response_code(200);
                echo json_encode($data);
            } else {
                $body = ['message' => "Incorrect username or password"];
                http_response_code(401);
                echo json_encode($body);
            }
        }

        // FETCH THE QUIZES BY USER ID
        public function getQuizes($userId,$type,$level) {
            
            $sql = "SELECT q.*,IF(s.score IS null,0,s.score) as score FROM quizes q LEFT JOIN score_summery s ON q.userid=s.userId AND q.category2=s.subCategory AND q.category3=s.level
                    WHERE q.userid='" . $userId  . "' AND q.category2='".$type."' AND q.category3='".$level."'  ORDER BY q.created DESC";
                    //error_log($sql);
            $result = $this->conn->query($sql);
            $quizes = array();

            if ($result->num_rows > 0) {
                while($row = $result->fetch_assoc()) {
                	if(json_decode($row['question']))
                		$row['question']=json_decode($row['question']);
                    array_push($quizes, $row);
                }
                $data = array('message' => 'Quizes fetched successfully!', 'quizes' => $quizes);
                http_response_code(200);
                echo json_encode($data);
            } else {
                $body = ['message' => "You haven't done any quizes yet!"];
                http_response_code(200);
                echo json_encode($data);
            }
        }

        // ADD THE NEW QUIZ RESULTS
        public function addQuiz($quiz, $userId) {
            $question= $quiz['question'];
            $answer= $quiz['answer'];
            $userAnswer= $quiz['useranswer'];
            $correct= $quiz['correct'];
            $collection= $quiz['collection'];
            $type= $quiz['type'];
            $level= $quiz['level'];

            if(is_array($quiz['question']))
            	$question= json_encode($quiz['question'],JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES);

            $sql = "INSERT INTO quizes (question, answer, category1, category2, category3, useranswer, correct, userid)
            VALUES ('". $question ."', '". $answer ."', '". $collection ."', '". $type ."', '". $level ."', '". $userAnswer ."', '". $correct ."', '". $userId ."')";

            //Delete olderst from quiz
            $sql_delete = "DELETE FROM `quizes`
                WHERE id NOT IN (
                  SELECT id
                  FROM (
                    SELECT id
                    FROM `quizes`
                    WHERE category1='".$collection."' AND category2='".$type."' AND category3='".$level."' AND userid='".$userId."'
                    ORDER BY id DESC
                    LIMIT 9 -- keep this many records
                  ) foo
                ) AND category1='".$collection."' AND category2='".$type."' AND category3='".$level."' AND userid='".$userId."'";

            $this->conn->query($sql_delete);

            //Add to score Summery
            if($correct=='1'){
                $sql_summery = "INSERT INTO score_summery (userId,category,subCategory,level,score) 
                VALUES ('".$userId."','".$collection."','".$type."','". $level ."',1)
                            ON DUPLICATE KEY UPDATE score=score+1";

                $this->conn->query($sql_summery);
            }
            
            
            if ($this->conn->query($sql) === TRUE) {
              $lastId = $this->conn->insert_id;
              $data = array('message' => "New quiz saved successfully.", 'quizId' => $lastId);
              $this->getQuizes($userId,$type,$level);
            } else {
              $data = array('message' => "Failed to save the quiz", 'error' => $this->conn->error);
              http_response_code(500);
              echo json_encode($data);
            }
        }

        public function getSummery($userId){

        	$total = 0;
        	$correct = 0;

			// $sql = "SELECT count(id) as total FROM quizes WHERE userid='" . $userId  . "'";
   //          $result = $this->conn->query($sql);
   //          if ($result->num_rows > 0) {
   //              while($row = $result->fetch_assoc()) {
   //                  $total = $row['total'];
   //              }
   //          }

            $sql = "SELECT SUM( `score` ) AS correct
                    FROM score_summery
                    WHERE userid = '" . $userId  . "'";
            $result = $this->conn->query($sql);
            if ($result->num_rows > 0) {
                while($row = $result->fetch_assoc()) {
                    $correct = $row['correct'];
                }
            }

        	$data = array('message' => 'Quizes fetched successfully!', 'summery' => ['total'=>$total,'correct'=>$correct]);
            http_response_code(200);
            echo json_encode($data);
        }

        public function getTop($userId,$filter){

            if($filter!="ALL"){
                $where = " AND q.category='".$filter."'";
            }else{
                $where = "";
            }

        	$top = [];
        	$sql = "select u.name,q.userId,sum(q.`score`)as mark from score_summery q join users u on q.userId=u.id ".$where." group by q.userId order by mark desc limit 10";
            $result = $this->conn->query($sql);
            if ($result->num_rows > 0) {
                while($row = $result->fetch_assoc()) {
                    array_push($top, $row);
                }
            }

        	$data = array('message' => 'Quizes fetched successfully!', 'top' => $top);
            http_response_code(200);
            echo json_encode($data);
        }

        public function getMyScore($userId){

            $score = [];
            $sql = "SELECT `category`,`subCategory`,`level`,`score` FROM `score_summery` WHERE `userId`='".$userId."' ORDER BY `score` DESC";
            $result = $this->conn->query($sql);
            if ($result->num_rows > 0) {
                while($row = $result->fetch_assoc()) {
                    if(!array_key_exists($row['category'], $score)){
                        $score[$row['category']] = [];
                    }
                    array_push($score[$row['category']], $row);
                    
                }
            }

            $scoreGroup = [];
            foreach ($score as $key => $value) {
                $sum = 0;
                foreach ($value as $score) {
                    $sum+=$score['score'];
                }
                array_push($scoreGroup, ["topic"=>$key,"data"=>$value, "total"=>$sum]);
            }

            $data = array('message' => 'Quizes fetched successfully!', 'score' => $scoreGroup);
            http_response_code(200);
            echo json_encode($data);
        }

        public function requestCode($request){
            $to = $request['email'];
            $type = $request['resetType'];

            //Check email exists
            $check = "SELECT id FROM users WHERE email='".$to."'";
            $result = $this->conn->query($check);
            if ($result->num_rows > 0) {
                while($row = $result->fetch_assoc()) {
                    $userid = $row['id'];                   
                }
            }else{
               $data = array('message' => 'Email not found!', 'email' => $to);
                http_response_code(500);
                echo json_encode($data); 
                error_log(json_encode($data));
                exit();
            }

            //disable prevoius requs codes
            $disable = "UPDATE user_reset_code SET status=0 WHERE user_id='".$userid."'";
            $this->conn->query($disable);


            //active new code
            $code = $this->generateResetCode();

            $active = "INSERT INTO user_reset_code (user_id,code,type,status,request_time,reset_time,expire_time) 
            VALUES('".$userid."','".$code."','".$type."',1,NOW(),NULL,DATE_ADD(NOW(), INTERVAL 1 HOUR))";

            if($result = $this->conn->query($active)!==true){
               $data = array('message' => 'Code generation is failed!', 'code' => $code);
                http_response_code(500);
                echo json_encode($data); 
                error_log(json_encode($data));
                exit();
            }

            

            
            $subject = "Maths Legends Reset Code";
            $txt = "Reset code: ".$code;
            $headers = "From: admin@gator3176.hostgator.com";

            @mail($to,$subject,$txt,$headers);

            $data = array('message' => 'Code generated successfully!', 'code' => $code);
            http_response_code(200);
            echo json_encode($data);
            error_log(json_encode($data));
        }


        public function resetDetails($request){
            $code = $request['code'];
            $value = $request['value'];
            //error_log(json_encode($request));
            //check code
            $check = "SELECT user_id,type FROM user_reset_code WHERE code='".$code."' AND status=1 AND request_time< NOW() AND expire_time>NOW()";
            $result = $this->conn->query($check);
            if ($result->num_rows > 0) {
                while($row = $result->fetch_assoc()) {
                    $userid = $row['user_id']; 
                    $type = $row['type'];                  
                }
            }else{
                $data = array('message' => 'Invalid reset code!', 'code' => $code);
                http_response_code(500);
                echo json_encode($data);
                //error_log($data); 
                
                return;
            }

            switch ($type) {
                case 'password':
                    $reset = "UPDATE users SET password=SHA2('". $value ."',224) WHERE id='".$userid."'";
                    break;
                
                default:
                    //check uername exists
                    $checkUsername = "SELECT id FROM users WHERE username='".$value."'";
                    $result = $this->conn->query($checkUsername);
                    if ($result->num_rows > 0) {
                        $data = array('message' => 'Username already taken!', 'code' => $code);
                        http_response_code(500);
                        echo json_encode($data); 
                        //error_log($data);
                        return;
                    }

                    $reset = "UPDATE users SET username='". $value ."' WHERE id='".$userid."'";
                    break;
            }

            if($this->conn->query($reset)!==true){
                $data = array('message' => 'Details update is Failed!', 'code' => $code);
                http_response_code(500);
                echo json_encode($data); 
                //error_log($this->conn->error);
                return;
            }

            $updateCode = "UPDATE user_reset_code SET reset_time=NOW(),status=2 WHERE code='".$code."' AND status=1 ";
            $this->conn->query($updateCode);


            $data = array('message' => 'Details successfully Updated!', 'code' => $code);
            http_response_code(200);
            echo json_encode($data); 
            //error_log(json_encode($data));

        }

        public function getUsersByName($profileName)
        {
            $list = [];
            $sql = "SELECT `id`,`name`,`profileName`,`email`,`pushid`,`username`,`created`,`updated` FROM users WHERE `profileName` like '%". $profileName."%'";
            $result = $this->conn->query($sql);
            if ($result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    array_push($list, $row);
                }
            }

            $data = array('message' => 'Users fetched successfully!', 'list' => $list);
            http_response_code(200);
            echo json_encode($data);
        }

    public function checkIsFriend($userId, $friendId)
    {
        $sql = "SELECT `user_id` FROM friends WHERE	user_id = " . $userId . " and friend_id=" . $friendId . " UNION ALL SELECT	`user_id`FROM	friends WHERE user_id = " . $friendId . " and friend_id=" . $userId;
            $result = $this->conn->query($sql);
        $data = array('message' => 'Check is friend successfully!', 'result' => $result->num_rows > 0);
            http_response_code(200);
            echo json_encode($data);
        }

        public function getMyFriendsList($userId){
            $list = [];
            $users = [];

            $sql = "SELECT `id`,`name`,`profileName`,`email`,`pushid` FROM users";
            $result = $this->conn->query($sql);
            if ($result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    array_push($users, $row);
                }
            }


            $sql = "SELECT *,'' as `friendName`,'' as `email`,'' as `pushid`  FROM friends where user_id = " . $userId . " UNION ALL SELECT *,'' as `friendName`,'' as `email`,'' as `pushid` FROM friends where friend_id = " . $userId;
            $result = $this->conn->query($sql);
            if ($result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    $row_userid = $row['user_id'];
                    $row_friendid = $row['friend_id'];

                    $filter = array_filter($users, function ($value) use ($userId, $row_userid, $row_friendid) {
                        return $value['id'] == ($row_userid == $userId ? $row_friendid : $row_userid);
                    });
                    $obj = array_values($filter);

                    $row['friendName'] = $obj[0]['profileName'];
                    $row['email'] = $obj[0]['email'];
                    $row['pushid'] = $obj[0]['pushid'];
                    
                    array_push($list, $row);
                }
            }

            $data = array('message' => 'Friends fetched successfully!', 'list' => $list);
            http_response_code(200);
            echo json_encode($data);
        }

        public function postBattle($battleQns, $userId)
        {
            $qns = $battleQns['qns'];
            $question = "";

            $filter = $battleQns['filter'];
            $qns_type = $filter['questionType'];
            $topic = $filter['topic'];
            $level = $filter['level'];
            $number = $filter['number'];
            $singleQuestionType = $filter['singleQuestionType'];

            $this->conn->autocommit(false);

            if (is_array($qns)){
                $question = json_encode($qns, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
            }

            $sql_battle = "INSERT INTO battle ( `qns_type`, `topic`, `stars`, `number`, `single_qnstype`, `question`, `user_id` ) VALUES ( ". $qns_type .", '".$topic."', ".$level.", ".$number.", '".$singleQuestionType."', '".$question."',". $userId." )";
            $battle_result = $this->conn->query($sql_battle);
            $battleId = $this->conn->insert_id;

            $sql_battl_users = "INSERT INTO battle_users ( `user_id`, `battle_id` ) VALUES ( ".$userId.", ". $battleId . ")";
            $battle_users_result = $this->conn->query($sql_battl_users);

            if($battle_result === TRUE && $battle_users_result === TRUE){
                $this->conn->commit();
                http_response_code(200);
                echo json_encode($battleId);
            } else {
                $this->conn->rollback();
                $data = array('message' => "Failed to create battle", 'error' => $this->conn->error);
                http_response_code(500);
                echo json_encode($data);
            }
        }
    }
?>
