<?php
    header("Content-Type: application/json");
    class Action {

        private static $error_regex = [
            'user_' => "/^Duplicate entry '(.)*' for key 'username'$/",
            'profileName_' => "/^Duplicate entry '(.)*' for key 'profileName'$/",
            'email_' => "/^Duplicate entry '(.)*' for key 'email'$/", 
        ];

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

        private function doubleSlashReplace($str){
            $pattern = '/^(\\\\)$/';
            return preg_replace($pattern, '\\', $str);
        }


        // ADD NEW USER
        public function addUser($user) {
            $data = array('message' => "You've hit the addUser!", 'user' => $user);
            $name= $user['name'];
            $username= $user['username'];
            $password= $user['password'];
            $accName= $user['accName'];
            $email= $user['email'];
            $teacher= $user['teacher'];

            $sql = "INSERT INTO users (name, username, password, profileName, email, teacher)
            VALUES ('". $name ."', '". $username ."', SHA2('". $password ."',224), '".$accName."', '".$email."', '".$teacher."')";
            
            if ($this->conn->query($sql) === TRUE) {
              $lastId = $this->conn->insert_id;
              $data = array('message' => "New user created successfully.", 'id' => $lastId);
              http_response_code(201);
              echo json_encode($data);
            } else {
                //Duplicate entry 'Devdev' for key 'username'
                

                $error = $this->conn->error;

                if(preg_match(self::$error_regex['user_'], $error)){
                    $msg = "Username already taken by other person";
                }
                elseif(preg_match(self::$error_regex['profileName_'], $error)){
                    $msg = "Account name already taken by other person";
                }
                elseif(preg_match(self::$error_regex['email_'], $error)){
                    $msg = "Email already taken by other person";
                }
                else{
                    $msg = $error;
                }

              $data = array('message' => $error, 'error' => $msg);
              http_response_code(220);
              echo json_encode($data);
              //error_log($sql);
              //error_log($this->conn->error);
              //error_log(json_encode($user));
            }
        }

        // UPDATE USER
        public function updateUser($userId,$user) {
            $data = array('message' => "You've hit the addUser!", 'user' => $user);
            $name= $user['name'];
            $username= $user['username'];
            $password= $user['password'];
            $accName= $user['accName'];
            $email= $user['email'];

            if(!empty($password)){
            $sql = "UPDATE users SET name='". $name ."', username='". $username ."', password=SHA2('". $password ."',224), profileName='".$accName."', email='".$email."' WHERE id='".$userId."'";
            }else{
               $sql = "UPDATE users SET name='". $name ."', username='". $username ."', profileName='".$accName."', email='".$email."' WHERE id='".$userId."'"; 
            }
            
            if ($this->conn->query($sql) === TRUE) {
              $lastId = $this->conn->insert_id;
              $data = array('message' => "User updated successfully.", 'id' => $lastId);
              http_response_code(201);
              echo json_encode($data);
            } else {

                $error = $this->conn->error;

                if(preg_match(self::$error_regex['user_'], $error)){
                    $msg = "Username already taken by other person";
                }
                elseif(preg_match(self::$error_regex['profileName_'], $error)){
                    $msg = "Account name already taken by other person";
                }
                elseif(preg_match(self::$error_regex['email_'], $error)){
                    $msg = "Email already taken by other person";
                }
                else{
                    $msg = $error;
                }

              $data = array('message' => $error, 'error' => $msg);
              http_response_code(220);
              echo json_encode($data);
              //error_log($sql);
              //error_log($this->conn->error);
              //error_log(json_encode($user));
            }
        }
        
        // LOGIN THE USER
        public function loginUser($user) {
            $name= $user['name'];
            $username= $user['username'];
            $password= $user['password'];

            $sql = "SELECT name, username,profileName  as accName, email ,id, teacher, created, updated FROM users WHERE username='". $username ."' AND password=SHA2('". $password ."',224)";
            
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
                    $question = $this->doubleSlashReplace($row['question']);
                	if(json_decode($question))
                		$row['question']=json_decode($question);
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
            $bonuspoints= $quiz['bonuspoints'];

            if(is_array($quiz['question']))
            	$question= $this->conn->real_escape_string(json_encode($quiz['question'],JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES));

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
                $sql_summery = "INSERT INTO score_summery (bonus,userId,category,subCategory,level,score) 
                VALUES ('".$bonuspoints."','".$userId."','".$collection."','".$type."','". $level ."',1)
                            ON DUPLICATE KEY UPDATE score=score+1, bonus=bonus+$bonuspoints";
    
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
        	// $sql = "select u.name,q.userId,sum(q.`score`)as mark from score_summery q join users u on q.userId=u.id ".$where." group by q.userId order by mark desc limit 50";
            $sql = "select name,userId, sum(mark) as mark from
                    (select u.name,q.userId,sum(q.`score`+q.`bonus`)as mark from score_summery q join users u on q.userId=u.id ".$where." group by q.userId
                    UNION ALL
                    select u.name,q.user_Id as userId ,sum(q.`total_score`+q.`rewards`)as mark from battle_summary q join users u on q.user_id=u.id ".$where."  group by q.user_id) t group by userId order by mark desc limit 50";
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

        public function getSstudentInfo($userId){
        $info = [];
        $wrong = "SELECT COUNT(correct) FROM `quizes` WHERE `userId`='".$userId."' AND correct=0";
        $correct= "SELECT COUNT(correct) FROM `quizes` WHERE `userId`='".$userId."' AND correct=1";
        $sql = "SELECT `question`, `answer`, `category1`, `category2`, `category3`, `useranswer`, `correct`, FROM `score_summery` WHERE `userId`='".$userId."'";
        $result = $this->conn->query($sql);
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()){
            array_push($info[$row['category1']], $row);
            }
        }
        $data = array('message' => 'Info fetched successfully!', 'info' => ['info'=>$info, 'wrong'=>$wrong, 'correct'=>$correct]);
        http_response_code(200);
        echo json_encode($data);
        }

        
               public function getStudentInfo($userId){
               $info = [];
               $wrong = "SELECT COUNT(correct) FROM `quizes` WHERE userid='".$userId."' AND correct=0";
               $correct= "SELECT COUNT(correct) FROM `quizes` WHERE userid='".$userId."' AND correct=1";
               $sql = "SELECT `question`, `answer`, `category1`, `category2`, `category3`, `useranswer`, `correct`, FROM `quizes` WHERE userid='".$userId."'";
               $result = $this->conn->query($sql);
               if ($result->num_rows > 0) {
                    while($row = $result->fetch_assoc()){
                    array_push($info[$row['category1']], $row);
               }
               }
               $data = array('message' => 'Quize fetched successfully!', 'information' => ['info'=>$info, 'wrong'=>$wrong, 'correct'=>$correct]);
               http_response_code(200);
               echo json_encode($data);
               }




        public function getMyScore($userId){

            $score = [];
            $sql = "SELECT `category`,`subCategory`,`level`,`score`,`bonus` FROM `score_summery` WHERE `userId`='".$userId."' ORDER BY `score` DESC";
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
                //error_log(json_encode($data));
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
                //error_log(json_encode($data));
                exit();
            }

            

            
            $subject = "Maths Legends Reset Code";
            $txt = "Reset code: ".$code;
            $headers = "From: admin@mathslegends.co.uk";

            @mail($to,$subject,$txt,$headers);

            $data = array('message' => 'Code generated successfully!', 'code' => $code);
            http_response_code(200);
            echo json_encode($data);
            //error_log(json_encode($data));
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

         public function getUsersByName($profileName,$userId){
                   $list = [];
                   $sql = "SELECT `id`,`name`,`profileName`,`email`,`pushid`,`username`,`created`,`updated` FROM users WHERE teacher=0 AND id != ".$userId." AND `profileName` like '%". $profileName."%'";
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

          public function getTeachersByName($profileName,$userId){
                   $teacherList = [];
                   $sql = "SELECT `id`,`name`,`profileName`,`email`,`pushid`,`username`,`created`,`updated` FROM users WHERE teacher=1 AND id != ".$userId." AND `profileName` like '%". $profileName."%'";
                   $result = $this->conn->query($sql);
                   if ($result->num_rows > 0) {
                       while ($row = $result->fetch_assoc()) {
                           array_push($teacherList, $row);
                       }
                   }

                   $data = array('message' => 'Users fetched successfully!', 'teacherList' => $teacherList);
                   http_response_code(200);
                   echo json_encode($data);
               }

                   private function _checkIsFriend($userId, $friendId){
                       $list = [];
                       $sql = "SELECT `user_id` FROM friends WHERE    user_id = " . $userId . " and friend_id=" . $friendId . " UNION ALL SELECT    `user_id`FROM    friends WHERE user_id = " . $friendId . " and friend_id=" . $userId;
                       $result = $this->conn->query($sql);
                       if ($result->num_rows > 0) {
                           while ($row = $result->fetch_assoc()) {
                               array_push($list, $row);
                           }
                       }
                       return count($list)>0;
                   }

                   public function checkIsFriend($userId, $friendId){
                       $result = $this->_checkIsFriend($userId,$friendId);
                       $data = array('message' => 'Check is friend successfully!', 'result' => $result);
                       http_response_code(200);
                       echo json_encode($data);
                   }


                      private function _checkIsTeacher($userId, $friendId){
                       $list = [];
                       $sql = "SELECT `user_id` FROM teacher WHERE    user_id = " . $userId . " and friend_id=" . $friendId . " UNION ALL SELECT    `user_id`FROM    friends WHERE user_id = " . $friendId . " and friend_id=" . $userId;
                       $result = $this->conn->query($sql);
                       if ($result->num_rows > 0) {
                           while ($row = $result->fetch_assoc()) {
                               array_push($list, $row);
                           }
                       }
                       return count($list)>0;
                   }

                   public function checkIsTeacher($userId, $friendId){
                       $result = $this->_checkIsTeacher($userId,$friendId);
                       $data = array('message' => 'Check is friend successfully!', 'result' => $result);
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

                               $row['friend_id'] = $obj[0]['id'];
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



                    public function getMyTeachersList($userId){
                       $list = [];
                       $users = [];

                       $sql = "SELECT `id`,`name`,`profileName`,`email`,`pushid` FROM users";
                       $result = $this->conn->query($sql);
                       if ($result->num_rows > 0) {
                           while ($row = $result->fetch_assoc()) {
                               array_push($users, $row);
                           }
                       }

                       $sql = "SELECT *,'' as `friendName`,'' as `email`,'' as `pushid`  FROM teacher where user_id = " . $userId . " UNION ALL SELECT *,'' as `friendName`,'' as `email`,'' as `pushid` FROM friends where friend_id = " . $userId;
                       $result = $this->conn->query($sql);
                       if ($result->num_rows > 0) {
                           while ($row = $result->fetch_assoc()) {
                               $row_userid = $row['user_id'];
                               $row_friendid = $row['friend_id'];

                               $filter = array_filter($users, function ($value) use ($userId, $row_userid, $row_friendid) {
                                   return $value['id'] == ($row_userid == $userId ? $row_friendid : $row_userid);
                               });
                               $obj = array_values($filter);

                               $row['friend_id'] = $obj[0]['id'];
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
                       $question = $battleQns['qns'];
                       $updated = $battleQns['updated'];
                       $isopen= $battleQns['isopen'];
                       $position= $battleQns['position'];
                       $digitsType = $battleQns['digitsType'];

                       $filter = $battleQns['filter'];
                       $qns_type = $filter['questionType'];
                       $topic = $filter['topic'];
                       $level = $filter['level'];
                       $number = $filter['number'];
                       $singleQuestionType = $filter['singleQuestionType'];

                       $invitedFriendList = $battleQns['invitedFriendList'];

                       $this->conn->autocommit(false);

                       if (is_array($question)){
                           $question = json_encode($question['question'], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
                           //error_log($question);
                       }

                       $question = $this->conn->real_escape_string($question);

                       $sql_battle = "INSERT INTO battle ( `qns_type`, `topic`, `stars`, `number`, `single_qnstype`, `question`, `user_id`,`created`,`updated`,`isopen`,`digits_type`) VALUES ( ". $qns_type .", '".$topic."', ".$level.", ".$number.", '".$singleQuestionType."', '".$question."',". $userId. ",'". $updated ."','". $updated."',$isopen,'".$digitsType."')";
                       $battle_result = $this->conn->query($sql_battle);
                       $battleId = $this->conn->insert_id;

                       $sql_battl_users = "INSERT INTO battle_users ( `user_id`, `battle_id`,`created`,`updated`,`position` ) VALUES ( ".$userId.", ". $battleId . ",'" . $updated . "','" . $updated . "',$position)";
                       $battle_users_result = $this->conn->query($sql_battl_users);

                       foreach ($invitedFriendList as $key => $value) {
                           $sql_battl_users = "INSERT INTO battle_users ( `user_id`, `battle_id`,`created`,`updated`,`position` ) VALUES ( ".$value['friend_id'].", ". $battleId . ",'" . $updated . "','" . $updated . "',$position)";
                           $battle_users_result = $this->conn->query($sql_battl_users);
                           
                           if($battle_users_result===FALSE){
                               break;
                           }else{
                               $subject = "Maths Legends Battle Request";
                               $txt = "Hi ". $value['friend_name'] .":

                   Maths Legend ".$value['user_name']." wants you to join battle '".$value['battle_name']."'.

                   Please accept or reject the invite

                   Regards
                   Maths Legends ";
                               $headers = "From: admin@gator3176.hostgator.com";
                               @mail($value['email'], $subject, $txt, $headers);
                               
                               $this->pushNotification($value['pushid'],"Maths Legend ".$value['user_name']." wants you to join battle ".$value['battle_name'],"Maths Legends Battle Request");
                           }
                       }

                       if($battle_result === TRUE && $battle_users_result === TRUE){
                           $this->conn->commit();
                           http_response_code(200);
                           $data = array('message' => "Success to create battle", 'id' => $battleId);
                           echo json_encode($data);
                       } else {
                           $this->conn->rollback();
                           $data = array('message' => "Failed to post battle", 'error' => $sql_battl_users);
                           http_response_code(500);
                           echo json_encode($data);
                       }
                   }

                   public function prepareOpenBattle($updated,$battleId, $userId)
                   {

                       $sql_battl_users = "INSERT INTO battle_users ( `user_id`, `battle_id`,`created`,`updated`,`position` ) VALUES ( ".$userId.", ". $battleId . ",'" . $updated . "','" . $updated . "',0)
                           ON DUPLICATE KEY UPDATE updated='".$updated."'";
                       $battle_users_result = $this->conn->query($sql_battl_users);

                       $list = [];
                       $sql = "SELECT result,position,duration,answers FROM battle_users WHERE battle_id='".$battleId."' AND user_id=".$userId;
                       $result = $this->conn->query($sql);
                       if ($result->num_rows > 0) {
                           while($row = $result->fetch_assoc()) {
                               array_push($list, $row);
                           }
                       }

                       if($battle_users_result === TRUE){
                           http_response_code(200);
                           $data = array('message' => "Success to create battle", 'result' => $list);
                           echo json_encode($data);
                       } else {
                           $data = array('message' => "Failed to post battle", 'error' => $this->conn->error());
                           http_response_code(500);
                           echo json_encode($data);
                       }
                   }

                   public function getBattleQuestionByUserId($userId, $battleId,$isopen){
                       $list = [];
                       $listScore = [];
                       $sql = "SELECT bt.id as battleId,btuser.id as userId,bt.*,btuser.*  FROM battle bt INNER JOIN battle_users btuser ON bt.id = btuser.battle_id  WHERE 1=1 ";
                       
                       if(empty($battleId)||is_null($battleId)){
                           $sql_where = " AND btuser.user_id=" . $userId;
                       }else{
                           $sql_where = " AND bt.id=".$battleId." AND btuser.user_id=" . $userId;
                       }

                       $sql_orderby = " ORDER BY bt.created DESC ";

                       if($isopen=='0'){
                           $sql_isOpen = " AND bt.isopen=0";
                       }else if($isopen=='1'){
                           $sql_isOpen = " AND bt.isopen=1";
                       }else{
                           $sql_isOpen=" ";
                       }

                       $finalsql = $sql . $sql_where . $sql_isOpen . $sql_orderby;

                       $result = $this->conn->query($finalsql);

                       if ($result->num_rows > 0) {
                           while ($row = $result->fetch_assoc()) {
                            $question = $this->doubleSlashReplace($row['question']);
                               if (json_decode($question)){
                                   $row['question'] = json_decode($question);
                               }
                               array_push($list, $row);
                           }
                       }


                       $p = array_map(function ($value) {
                           return $value['battleId'];
                       }, $list);

                       $ids = join(',', $p);

                       if (is_array($p) &&  count($p) > 0) {
                           $sql_scorelist = "SELECT btuser.*,users.profileName FROM battle_users btuser INNER JOIN users ON btuser.user_id=users.id WHERE battle_id in (" . $ids . ")";
                           $result = $this->conn->query($sql_scorelist);
                           if ($result->num_rows > 0) {
                               while ($row = $result->fetch_assoc()) {
                                   array_push($listScore, $row);
                               }
                           }
                       }

                       $finallist =[];
                       foreach ($list as $key => $value) {
                           $battleid = $value['battle_id'];

                           $row = array_filter($listScore, function ($v) use ($battleid) {
                               return $v['battle_id'] === $battleid;
                           });

                           $value['scorelist'] = array_values($row);
                           array_push($finallist,$value);
                       }

                       $data = array('message' => 'Battle questions fetch successfully!', 'list' => $finallist);
                       http_response_code(200);
                       echo json_encode($data);
                   }

                   public function getOpenBattleQuestion(){
                       $list = [];
                       $listScore = [];
                       $sql = "SELECT * FROM battle WHERE isopen=1 ORDER BY created DESC";
               
                       $result = $this->conn->query($sql);

                       if ($result->num_rows > 0) {
                           while ($row = $result->fetch_assoc()) {
                            $question = $this->doubleSlashReplace($row['question']);
                               if (json_decode($question)){
                                   $row['question'] = json_decode($question);
                               }
                               array_push($list, $row);
                           }
                       }


                       $p = array_map(function ($value) {
                           return $value['id'];
                       }, $list);

                       $ids = join(',', $p);

                       if (is_array($p) &&  count($p) > 0) {
                           $sql_scorelist = "SELECT btuser.*,users.profileName FROM battle_users btuser INNER JOIN users ON btuser.user_id=users.id WHERE battle_id in (" . $ids . ")";
                           $result = $this->conn->query($sql_scorelist);
                           if ($result->num_rows > 0) {
                               while ($row = $result->fetch_assoc()) {
                                   array_push($listScore, $row);
                               }
                           }
                       }

                       $finallist =[];
                       foreach ($list as $key => $value) {
                           $battleid = $value['id'];

                           $row = array_filter($listScore, function ($v) use ($battleid) {
                               return $v['battle_id'] === $battleid;
                           });

                           $value['scorelist'] = array_values($row);
                           array_push($finallist,$value);
                       }

                       $data = array('message' => 'Battle questions fetch successfully!', 'list' => $finallist);
                       http_response_code(200);
                       echo json_encode($data);
                   }

                   public function getFriendsRequestList($userid){
                       $list = [];
                       $sql = "SELECT frh.*,users.email FROM friends_request_his frh INNER JOIN users on frh.invite_userid=users.id WHERE frh.invite_userid=" . $userid . " OR frh.invited_userid=". $userid." ORDER BY frh.created DESC";
                       $result = $this->conn->query($sql);
                       if ($result->num_rows > 0) {
                           while ($row = $result->fetch_assoc()) {
                               // // if (json_decode($row['question'])) {
                               //     $row['question'] = json_decode($row['question']);
                               // // }
                               array_push($list, $row);
                           }
                       }

                       $data = array('message' => 'Friends RequestList fetch successfully!', 'list' => $list);
                       http_response_code(200);
                       echo json_encode($data);
                   }

                   public function updateFriendRequest($request)
                   {
                       $headers = "From: admin@gator3176.hostgator.com";
                       $id = $request['id'];
                       $isaccept = $request['isaccept'];
                       $userId = $request['userId'];
                       $friendId = $request['friendId'];
                       $battleId = $request['battleId'];
                       $updated = $request['updated'];
                       $emailOfUser = $request['emailOfUser'];
                       $inviteUserName = $request['inviteUserName'];
                       $invitedUserName = $request['invitedUserName'];

                       $isFriend = $this->_checkIsFriend($userId,$friendId);
                       if($isFriend){
                           $data = array('message' => 'You have been friends already!', 'result' => FALSE);
                           http_response_code(400);
                           echo json_encode($data);
                           exit();
                       }

                       $this->conn->autocommit(false);

                       $sql = "UPDATE friends_request_his SET `updated`='". $updated ."',isaccept=" . $isaccept . " WHERE id=" . $id;
                       $result_request_his = $this->conn->query($sql);

                       $result_friends = TRUE;
                       $result_battle = TRUE;
                       if ($isaccept === 1) {
                           $sql = "INSERT friends (`user_id`,`friend_id`,`created`,`updated`) VALUES (" . $userId . "," . $friendId . ",'".$updated."','".$updated."')";
                           $result_friends = $this->conn->query($sql);

                           //   $finalBattleId='';
                           //   if(empty($battleId)){
                           //       $finalBattleId = 'NULL';
                           //   } else{
                           //       $finalBattleId= $battleId;
                           //   }

                           //   $sql = "INSERT INTO battle_users (`user_id`,`battle_id`,`created`,`updated`) VALUES (". $friendId .",". $finalBattleId .",'".$updated."','".$updated."')";
                           //   $result_battle = $this->conn->query($sql);
                       }

                       if($result_request_his === TRUE && $result_friends === TRUE && $result_battle === TRUE){
                           $this->conn->commit();
                           if ($isaccept === 1) {
                           // send email to invited user send request
                           $subject = "Maths Legends Friends Request";
                           $txt = "Hi " . $inviteUserName . ":\r
               Maths Legend " . $invitedUserName . " has accepted your request.
               Join battle with him now!\r
               Regards
               Maths Legends ";
                           @mail($emailOfUser, $subject, $txt, $headers);

                           $userObj = $this->getUserById($userId);

                           $this->pushNotification($userObj['pushid'],"Maths Legend " . $invitedUserName . " has accepted your request","Maths Legends Battle Request");

                           }

                           $data = array('message' => 'Accepted the request successfully!', 'result' => 'ok');
                           http_response_code(200);
                           echo json_encode($data);
                       }else{
                           $this->conn->rollback();
                           $data = array('message' => 'Accepted the request failed!', $this->conn->error);
                           http_response_code(500);
                           echo json_encode($data);
                       }
                   }


                    public function updateTeacherRequest($request)
                   {
                       $headers = "From: admin@gator3176.hostgator.com";
                       $id = $request['id'];
                       $isaccept = $request['isaccept'];
                       $userId = $request['userId'];
                       $friendId = $request['friendId'];
                       $battleId = $request['battleId'];
                       $updated = $request['updated'];
                       $emailOfUser = $request['emailOfUser'];
                       $inviteUserName = $request['inviteUserName'];
                       $invitedUserName = $request['invitedUserName'];

                       $isFriend = $this->_checkIsFriend($userId,$friendId);
                       if($isFriend){
                           $data = array('message' => 'You have been friends already!', 'result' => FALSE);
                           http_response_code(400);
                           echo json_encode($data);
                           exit();
                       }

                       $this->conn->autocommit(false);

                       $sql = "UPDATE teacher_request_his SET `updated`='". $updated ."',isaccept=" . $isaccept . " WHERE id=" . $id;
                       $result_request_his = $this->conn->query($sql);

                       $result_friends = TRUE;
                       $result_battle = TRUE;
                       if ($isaccept === 1) {
                           $sql = "INSERT friends (`user_id`,`friend_id`,`created`,`updated`) VALUES (" . $userId . "," . $friendId . ",'".$updated."','".$updated."')";
                           $result_friends = $this->conn->query($sql);

                           //   $finalBattleId='';
                           //   if(empty($battleId)){
                           //       $finalBattleId = 'NULL';
                           //   } else{
                           //       $finalBattleId= $battleId;
                           //   }

                           //   $sql = "INSERT INTO battle_users (`user_id`,`battle_id`,`created`,`updated`) VALUES (". $friendId .",". $finalBattleId .",'".$updated."','".$updated."')";
                           //   $result_battle = $this->conn->query($sql);
                       }

                       if($result_request_his === TRUE && $result_friends === TRUE && $result_battle === TRUE){
                           $this->conn->commit();
                           if ($isaccept === 1) {
                           // send email to invited user send request
                           $subject = "Maths Legends Friends Request";
                           $txt = "Hi " . $inviteUserName . ":\r
               Maths Legend " . $invitedUserName . " has accepted your request.
               Join battle with him now!\r
               Regards
               Maths Legends ";
                           @mail($emailOfUser, $subject, $txt, $headers);

                           $userObj = $this->getUserById($userId);

                           $this->pushNotification($userObj['pushid'],"Maths Legend " . $invitedUserName . " has accepted your request","Maths Legends Battle Request");

                           }

                           $data = array('message' => 'Accepted the request successfully!', 'result' => 'ok');
                           http_response_code(200);
                           echo json_encode($data);
                       }else{
                           $this->conn->rollback();
                           $data = array('message' => 'Accepted the request failed!', $this->conn->error);
                           http_response_code(500);
                           echo json_encode($data);
                       }
                   }

                   public function _checkHasRequestFriend($userId, $friendId){
                       $list = [];
                       $sql = "SELECT `invite_userid` FROM friends_request_his WHERE    invite_userid = " . $userId . " and invited_userid=" . $friendId . " UNION ALL SELECT    `invite_userid` FROM    friends_request_his WHERE invite_userid = " . $friendId . " and invited_userid=" . $userId;
                       $result = $this->conn->query($sql);
                       if ($result->num_rows > 0) {
                           while ($row = $result->fetch_assoc()) {
                               array_push($list, $row);
                           }
                       }
                       return count($list) > 0;
                   }

                    public function _checkHasRequestTeacher($userId, $friendId){
                       $list = [];
                       $sql = "SELECT `invite_userid` FROM teacher_request_his WHERE    invite_userid = " . $userId . " and invited_userid=" . $friendId . " UNION ALL SELECT    `invite_userid` FROM    friends_request_his WHERE invite_userid = " . $friendId . " and invited_userid=" . $userId;
                       $result = $this->conn->query($sql);
                       if ($result->num_rows > 0) {
                           while ($row = $result->fetch_assoc()) {
                               array_push($list, $row);
                           }
                       }
                       return count($list) > 0;
                   }

                   public function addFriendRequest($request)
                   {
                       $userId = $request['userId'];
                       $user_name = $request['user_name'];
                       $friendId = $request['friendId'];
                       $friend_name = $request['friend_name'];
                       $updated = $request['updated'];

                       if($request['battleId']){
                           $battleId = $request['battleId'];
                       }else{
                           $battleId = 'null';
                       }
                       
                       $to = $request['email'];


                       $isRquest = $this->_checkHasRequestFriend($userId, $friendId);
                       if ($isRquest) {
                           $data = array('message' => 'Friend requested pending!', 'result' => FALSE);
                           http_response_code(400);
                           echo json_encode($data);
                           exit();
                       }

                       $isFriend = $this->_checkIsFriend($userId, $friendId);
                       if ($isFriend) {
                           $data = array('message' => 'You have been friends already!', 'result' => FALSE);
                           http_response_code(400);
                           echo json_encode($data);
                           exit();
                       }

                       $sql = "INSERT INTO friends_request_his (`invite_userid`,`invite_username`,`invited_userid`,`invited_username`,`battleid`,`created`,`updated`) VALUES (". $userId.",'". $user_name."',". $friendId.",'".$friend_name."',".$battleId.",'".$updated."','".$updated."')";
                       $result_request_his = $this->conn->query($sql);

                       if ($result_request_his === TRUE) {

                           $subject = "Maths Legends Battle Request";
                           $txt = "Hi " . $friend_name . ":

               Maths Legend " . $user_name . " wants to be friends

               Please accept or reject the invite

               Regards
               Maths Legends ";
                           $headers = "From: admin@gator3176.hostgator.com";
                           @mail($to, $subject, $txt, $headers);

                           $userObj = $this->getUserById($friendId);
                           
                           $this->pushNotification($userObj['pushid'],"Maths Legend " . $user_name . " wants to be friends","Maths Legends Battle Request");


                           $data = array('message' => 'Add the request successfully!', 'result' => TRUE);
                           http_response_code(200);
                           echo json_encode($data);
                       } else {
                           $data = array('message' => 'Add the request failed!', 'red'=> $this->conn->error);
                           http_response_code(500);
                           echo json_encode($data);
                       }
                   }

                   public function updateBattleResult($battle){
                       $score = $battle['score'];
                       $battle_id = $battle['battleId'];
                       $user_id = $battle['userId'];
                       $updated = $battle['updated'];
                       //   $duration = $battle['duration'];

                       $sql = "SELECT * FROM battle_users WHERE battle_id=" .$battle_id;
                       $result = $this->conn->query($sql);

                       $sql = "UPDATE battle_users SET `score`=" . $score . ",`updated`='" . $updated . "' WHERE battle_id=" . $battle_id . " AND user_id=" . $user_id;
                       $battleUsersResult = $this->conn->query($sql);

                       $this->conn->autocommit(false);

                       $battleResult = TRUE;
                       $result_update_result_winner=TRUE;
                       $result_update_result_lose=TRUE;
                       $result_update_rewards_winner=TRUE;

                       $winnnn = '';

                       if ($result->num_rows > 1) {

                           $sql = "SELECT * FROM battle_users WHERE battle_id=" . $battle_id . " AND score IS NULL";
                           $result_scores = $this->conn->query($sql);
                           $winnnn = $result_scores->num_rows;
                           // is all completed the battle
                           if ($result_scores->num_rows == 0) {
                               // find the winner
                               $sql_winner = "SELECT * FROM battle_users WHERE battle_id=" . $battle_id . " ORDER BY score DESC,duration ASC LIMIT 1";
                               $result_winner = $this->conn->query($sql_winner);

                               $win_list = [];
                               if ($result_winner->num_rows > 0) {
                                   while ($row = $result_winner->fetch_assoc()) {
                                       array_push($win_list,$row);
                                   }
                               }

                               $winner = $win_list[0];
                               // // $data = array('message' => 'Submit battle result failed!', 'error' => $this->conn->error);
                               // echo json_encode($win_list[0]['user_id']);
                               $winner_userid= $winner['user_id'];

                               
                               $sql_update_result_winner ="UPDATE battle_users SET `iswin`=1,`updated`='" . $updated . "' WHERE battle_id=" . $battle_id . " AND user_id=" . $winner_userid;
                               $result_update_result_winner = $this->conn->query($sql_update_result_winner);

                               $sql_battle_result = "SELECT `topic`, `single_qnstype`, `stars` FROM battle WHERE id=".$battle_id;
                               $result_battle = $this->conn->query($sql_battle_result);

                               $battle_list = [];
                               if ($result_battle->num_rows > 0) {
                                   while ($row = $result_battle->fetch_assoc()) {
                                       array_push($battle_list,$row);
                                   }
                               }
                               $battle = $battle_list[0];

                               // give rewards to winner  // `user_id`, `category`, `sub_category`, `level`
                               $sql_update_rewards_winner ="UPDATE battle_summary SET `rewards`=rewards+200 WHERE category='" . $battle['topic'] . "' AND sub_category='".$battle['single_qnstype']."' AND level='LEVEL_".$battle['stars']."' AND user_id=" . $winner_userid;
                               $result_update_rewards_winner = $this->conn->query($sql_update_rewards_winner);
                               
                               $sql_update_result_lose = "UPDATE battle_users SET `iswin`=0,`updated`='" . $updated . "' WHERE battle_id=" . $battle_id . " AND user_id !=" . $winner_userid;
                               $result_update_result_lose = $this->conn->query($sql_update_result_lose);

                               // set battle disabled
                               $sql = "UPDATE battle SET `enabled`=0,`updated`='" . $updated . "' WHERE id=" . $battle_id;
                               $battleResult = $this->conn->query($sql);
                           }
                       }
                       // else{
                       //     $sql = "UPDATE battle_users SET `score`=" . $score . ",`updated`='" . $updated . "',duration=" . $duration . " WHERE battle_id=" . $battle_id . " AND user_id=" . $user_id;
                       //     $battleUsersResult = $this->conn->query($sql);
                       // }
                       
                       if($battleResult === TRUE
                           && $battleUsersResult === TRUE
                           && $result_update_result_winner === TRUE
                           && $result_update_result_lose === TRUE
                           && $result_update_rewards_winner === TRUE)
                       {
                           $this->conn->commit();
                           $data = array('message' => 'Submit battle result successfully!', 'result' => $winnnn);
                           http_response_code(200);
                           echo json_encode($data);
                       }else{
                           $this->conn->rollback();
                           $data = array('message' => 'Submit battle result failed!', 'error' => $this->conn->error());
                           http_response_code(500);
                           echo json_encode($data);
                       }
                   }

                   public function inviteFriend($body){
                       $friend_id=$body['friend_id'];
                       $friend_name = $body['friend_name'];
                       $user_name = $body['user_name'];
                       $battle_id = $body['battle_id'];
                       $battle_name = $body['battle_name'];
                       $to = $body['email'];
                       $updated = $body['updated'];

                       $sql = "INSERT INTO battle_users (`user_id`,`battle_id`,`created`,`updated`) VALUES (".$friend_id.",". $battle_id.",'".$updated."','". $updated."')";
                       $result = $this->conn->query($sql);
                       if ($result === TRUE) {
                           $subject = "Maths Legends Battle Request";
                           $txt = "Hi ". $friend_name .":

               Maths Legend ".$user_name." wants you to join battle '".$battle_name."'.

               Please accept or reject the invite

               Regards
               Maths Legends ";
                           $headers = "From: admin@gator3176.hostgator.com";
                           @mail($to, $subject, $txt, $headers);

                           $userObj = $this->getUserById($friend_id);

                           $this->pushNotification($userObj['pushid'],"Maths Legend ".$user_name." wants you to join battle ".$battle_name,"Maths Legends Battle Request");

                           $data = array('message' => 'Invite friend successfully!', 'result' => $result);
                           http_response_code(200);
                           echo json_encode($data);
                       } else {
                           $data = array('message' => 'Invite friend failed!', 'error' => $this->conn->error);
                           http_response_code(500);
                           echo json_encode($data);
                       }
                   }

                   public function removeFriend($body){
                       $userId= $body['userId'];
                       $friendId=$body['friendId'];

                       $this->conn->autocommit(false);

                       $sql = "DELETE FROM friends WHERE (user_id =".$userId." AND friend_id=". $friendId. " ) OR (user_id =" . $friendId . " AND friend_id=" . $userId . " )";

                       $result = $this->conn->query($sql);

                       $sql = "DELETE FROM friends_request_his WHERE (invite_userid =" . $userId . " AND invited_userid=" . $friendId . " ) OR (invite_userid =" . $friendId . " AND invited_userid=" . $userId . " )";

                       $result1 = $this->conn->query($sql);

                       if ($result === TRUE && $result1 === TRUE) {
                           $this->conn->commit();
                           http_response_code(200);
                           $data = array('message' => "Success to create battle", 'result' => true);
                           echo json_encode($data);
                       } else {
                           $this->conn->rollback();
                           $data = array('message' => "Failed to create battle", 'error' => $this->conn->error);
                           http_response_code(500);
                           echo json_encode($data);
                       }
                   }


                   public function removeTeacher($body){
                       $userId= $body['userId'];
                       $friendId=$body['friendId'];

                       $this->conn->autocommit(false);

                       $sql = "DELETE FROM teacher WHERE (user_id =".$userId." AND friend_id=". $friendId. " ) OR (user_id =" . $friendId . " AND friend_id=" . $userId . " )";

                       $result = $this->conn->query($sql);

                       $sql = "DELETE FROM teacher_request_his WHERE (invite_userid =" . $userId . " AND invited_userid=" . $friendId . " ) OR (invite_userid =" . $friendId . " AND invited_userid=" . $userId . " )";

                       $result1 = $this->conn->query($sql);

                       if ($result === TRUE && $result1 === TRUE) {
                           $this->conn->commit();
                           http_response_code(200);
                           $data = array('message' => "Success to create battle", 'result' => true);
                           echo json_encode($data);
                       } else {
                           $this->conn->rollback();
                           $data = array('message' => "Failed to create battle", 'error' => $this->conn->error);
                           http_response_code(500);
                           echo json_encode($data);
                       }
                   }
               
               public function saveBattleSummary($body,$userId){
                   $category  = $body['category'];
                   $subCategory = $body['subCategory'];
                   $level = $body['level'];
                   $totalScore=$body['totalScore'];
                   $duration = $body['duration'];
                   $battleCount=$body['battleCount'];
                   $battleId=$body['battleId'];
                   $position=$body['position'];
                   $resultList =  $body['resultList'];
                   $answerList = $body['answerList'];

                   $this->conn->autocommit(false);

                   $sql = "INSERT INTO battle_summary (`user_id`,`total_score`,`total_duration`,`average_duration`,`total_battle_count`,`category`,`sub_category`,`level`)
                       VALUES (".$userId.",".$totalScore.",".$duration.",".$duration.",".$battleCount.",'".$category."','".$subCategory."','". $level."')
                       ON DUPLICATE KEY UPDATE total_duration=total_duration+".$duration.",total_battle_count=total_battle_count+1,total_score=total_score+".$totalScore.",average_duration=total_duration/total_battle_count";

                   $result = $this->conn->query($sql);

                   $sql_battleUsers = "UPDATE battle_users set `duration`=duration+".$duration.",`result`='".$resultList."',`answers`='".$answerList."',`position`=".$position." WHERE `battle_id`=".$battleId." AND `user_id`=".$userId;

                   $result_battleusers = $this->conn->query($sql_battleUsers);

                   if($result === TRUE && $result_battleusers === TRUE){
                       $this->conn->commit();
                       http_response_code(200);
                       $data = array('message' => "Success to update battle summary", 'result' => true);
                       echo json_encode($data);
                   }else{
                       $this->conn->rollback();
                       $data = array('message' => "Failed to create battle", 'error' => $this->conn->error);
                       http_response_code(500);
                       echo json_encode($data);
                   }
               }

               public function getBattleSummary($userId){
                   $score = [];
                   $sql = "SELECT `category`,`sub_category`,`level`,`total_score`,`average_duration`,`rewards` FROM `battle_summary` WHERE `user_id`='".$userId."' ORDER BY `total_score` DESC";
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
                           $sum+=$score['total_score']+$score['rewards'];
                       }
                       array_push($scoreGroup, ["topic"=>$key,"data"=>$value, "total"=>$sum]);
                   }

                   $data = array('message' => 'Quizes fetched successfully!', 'score' => $scoreGroup);
                   http_response_code(200);
                   echo json_encode($data);
               }

               public function getBattlePosition($battleId,$userId){
                   $list = [];
                   $sql = "SELECT result,position,answers FROM battle_users WHERE battle_id=".$battleId." AND user_id=".$userId;
                   $result = $this->conn->query($sql);
                   if ($result->num_rows > 0) {
                       while($row = $result->fetch_assoc()) {
                           array_push($list, $row);
                       }
                   }
                   $data = array('message' => 'Quizes fetched successfully!', 'process' => $list);
                   http_response_code(200);
                   echo json_encode($data);
               }

               public function savePushTokens($body,$userId){
                   $tokens = $body['tokens'];

                   $sql = "UPDATE users SET `pushid`='".$tokens."' WHERE `id`=".$userId;
                   $result = $this->conn->query($sql);
                   $data = array('message' => 'Quizes fetched successfully!', 'result' => $result);
                   http_response_code(200);
                   echo json_encode($data);
               }

               public function getUserById($userId){
                   $list = [];
                   $sql = "SELECT * FROM users WHERE id=" . $userId;
                   $result = $this->conn->query($sql);
                   if ($result->num_rows > 0) {
                       while ($row = $result->fetch_assoc()) {
                           array_push($list, $row);
                       }
                   }
                   return $list[0];
               }

                public function request($token,$body,$title)
                {
                    $url = "https://fcm.googleapis.com/fcm/send";
                    $serverKey = 'AAAAe8OKBOA:APA91bEuENykvbNT8nfJ2yyPMTRLJq4wFpishcLB0gKBPDqCpOdx9EayZBKYzkuiIeW32pnqeg4baxLVMVoN8p2vguRvZtbJR187F6ofkXJ8iHqyciCNT6MMW3DsD-CQ4EsnGIUTeS9p';
                    $notification = array('title' =>$title , 'text' => $body, 'sound' => 'default');
                    $arrayToSend = array('to' => $token, 'notification' => $notification,'priority'=>'high');
                    $json = json_encode($arrayToSend);
                    $headers = array();
                    $headers[] = 'Content-Type: application/json';
                    $headers[] = 'Authorization: key='. $serverKey;
                    $ch = curl_init();
                    curl_setopt($ch, CURLOPT_URL, $url);
                    curl_setopt($ch, CURLOPT_CUSTOMREQUEST,"POST");
                    curl_setopt($ch, CURLOPT_POSTFIELDS, $json);
                    curl_setopt($ch, CURLOPT_HTTPHEADER,$headers);
                    //Send the request
                    $response = curl_exec($ch);
                    //Close request
                    if ($response === FALSE) {
                       die('FCM Send Error: ' . curl_error($ch));
                    }
                    curl_close($ch);
                    return $response;
                }

               public function pushNotification($token,$body,$title){
                    $result = $this->request($token,$body,$title);
                    echo json_encode($result);
                }

               public function addTeacherRequest($request)
                   {
                       $userId = $request['userId'];
                       $user_name = $request['user_name'];
                       $friendId = $request['friendId'];
                       $friend_name = $request['friend_name'];
                       $updated = $request['updated'];

                       if($request['battleId']){
                           $battleId = $request['battleId'];
                       }else{
                           $battleId = 'null';
                       }
                       
                       $to = $request['email'];


                       $isRquest = $this->_checkHasRequestFriend($userId, $friendId);
                       if ($isRquest) {
                           $data = array('message' => 'Friend requested pending!', 'result' => FALSE);
                           http_response_code(400);
                           echo json_encode($data);
                           exit();
                       }

                       $isFriend = $this->_checkIsFriend($userId, $friendId);
                       if ($isFriend) {
                           $data = array('message' => 'You have been friends already!', 'result' => FALSE);
                           http_response_code(400);
                           echo json_encode($data);
                           exit();
                       }

                       $sql = "INSERT INTO teacher_request_his (`invite_userid`,`invite_username`,`invited_userid`,`invited_username`,`battleid`,`created`,`updated`) VALUES (". $userId.",'". $user_name."',". $friendId.",'".$friend_name."',".$battleId.",'".$updated."','".$updated."')";
                       $result_request_his = $this->conn->query($sql);

                       if ($result_request_his === TRUE) {

                           $subject = "Maths Legends Battle Request";
                           $txt = "Hi " . $friend_name . ":

               Maths Legend " . $user_name . " wants to be friends

               Please accept or reject the invite

               Regards
               Maths Legends ";
                           $headers = "From: admin@gator3176.hostgator.com";
                           @mail($to, $subject, $txt, $headers);

                           $userObj = $this->getUserById($friendId);
                           
                           $this->pushNotification($userObj['pushid'],"Maths Legend " . $user_name . " wants to be friends","Maths Legends Battle Request");


                           $data = array('message' => 'Add the request successfully!', 'result' => TRUE);
                           http_response_code(200);
                           echo json_encode($data);
                       } else {
                           $data = array('message' => 'Add the request failed!', 'red'=> $this->conn->error);
                           http_response_code(500);
                           echo json_encode($data);
                       }
                   }

               public function getTeachersRequestList($userid){
                       $teacherList = [];
                       $sql = "SELECT frh.*,users.email FROM teacher_request_his frh INNER JOIN users on frh.invite_userid=users.id WHERE frh.invite_userid=" . $userid . " OR frh.invited_userid=". $userid." ORDER BY frh.created DESC";
                       $result = $this->conn->query($sql);
                       if ($result->num_rows > 0) {
                           while ($row = $result->fetch_assoc()) {
                               // // if (json_decode($row['question'])) {
                               //     $row['question'] = json_decode($row['question']);
                               // // }
                               array_push($teacherList, $row);
                           }
                       }

                       $data = array('message' => 'Friends RequestList fetch successfully!', 'teacherList' => $teacherList);
                       http_response_code(200);
                       echo json_encode($data);
                   }

               public function mailBugReport(){
                   $to = 'admin@mathslegends.co.uk';
  	           $subject = "Bug report";
                   $message = file_get_contents('php://input');  
                   $headers = array('MIME-Version' => "1.0",
                   'Content-type' => "text/html; charset=iso-8859-1\r\n\r\n",
                   'From' => $from,
                   'To' => $to,
                   'Subject' => $subject
                    );
                   
                   
                      
                   mail($to, $subject, $message);
                   
               }
    }
?>
