<?php
    // This file logic is for open battle over time

    $servername = "127.0.0.1";
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


    $battleList = [];
    // query battle ids from battle table which over 48 hours
    $battle_sql = "SELECT * FROM battle WHERE enabled=1 AND isopen=1 AND DATE_ADD( created, INTERVAL 1 DAY ) < NOW()";
    $battle_result = $conn->query($battle_sql);
    if ($battle_result->num_rows > 0) {
        while ($row = $battle_result->fetch_assoc()) {
            array_push($battleList, $row);
        }
    }

    // query battleIds from battleList
    $p = array_map(function ($value) {
        return $value['id'];
    }, $battleList);
    // join together with all the ids
    $battleIds = join(',', $p);


    $battleUsersList = [];
    // query all users who related specific battles
    $battle_user_sql = "SELECT * FROM battle_users WHERE battle_id IN (" . $battleIds . ") AND score is not null";
    $battle_user_result = $conn->query($battle_user_sql);
    if ($battle_user_result->num_rows > 0) {
        while ($row = $battle_user_result->fetch_assoc()) {
            array_push($battleUsersList, $row);
        }
    }

    $conn->autocommit(false);

    $result_update_result_winner = TRUE;
    $result_update_result_lose = TRUE;
    $battleResult = TRUE;
    $sql_update_bandon_result = TRUE;
    $result_update_rewards_winner = TRUE;

    // loop battleList
    foreach ($battleList as $key => $value) {
        $battleId = $value['id'];

        $usersOfBattle = array_filter($battleUsersList, function ($v) use ($battleId) {
            return $v['battle_id'] === $battleId && (!empty($v['score']) || !is_null($v['score']));
        });


        if (!empty($usersOfBattle) && count($usersOfBattle) >= 1) {
            $score = array_column($usersOfBattle, 'score');
            $duration = array_column($usersOfBattle, 'duration');

            // first order by score desc, then duration asc
            array_multisort($score, SORT_DESC, $duration, SORT_ASC, $usersOfBattle);
            // get top of array
            $winner = $usersOfBattle[0];
            $winner_userid = $winner['user_id'];
            $sql_update_result_winner = "UPDATE battle_users SET `iswin`=1 WHERE battle_id=" . $battleId . " AND user_id=" . $winner_userid;
            $result_update_result_winner = $conn->query($sql_update_result_winner);

            $sql_update_result_lose = "UPDATE battle_users SET `iswin`=0 WHERE battle_id=" . $battleId . " AND user_id !=" . $winner_userid;
            $result_update_result_lose = $conn->query($sql_update_result_lose);

            $sql = "UPDATE battle SET `enabled`=0 WHERE id=" . $battleId;
            $battleResult = $conn->query($sql);

            // give rewards to winner  // `user_id`, `category`, `sub_category`, `level`
            $sql_update_rewards_winner = "UPDATE battle_summary SET `rewards`=rewards+200 WHERE category='" . $value['topic'] . "' AND sub_category='" . $value['single_qnstype'] . "' AND level='LEVEL_" . $value['stars'] . "' AND user_id=" . $winner_userid;
            $result_update_rewards_winner = $conn->query($sql_update_rewards_winner);

            if ($result_update_result_winner === FALSE || $result_update_result_lose === FALSE || $battleResult === FALSE) {
                break;
            }
        } else {
            $sql_update_bandon = "UPDATE battle SET `enabled`=0 WHERE id=" . $battleId;
            $sql_update_bandon_result = $conn->query($sql_update_bandon);
        }
    }

    if ($result_update_result_winner === TRUE && $result_update_result_lose === TRUE && $battleResult === TRUE && $sql_update_bandon_result === TRUE && $result_update_rewards_winner === TRUE) {
        $conn->commit();
        echo "success";
    } else {
        $conn->rollback();
        echo "fail";
    }

    $conn->close();
?>
