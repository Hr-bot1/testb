<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $inputData = json_decode(file_get_contents("php://input"), true);
    $phone = $inputData['phone'];
    $response = $inputData['response'];

    $dataFile = 'bomb.json';
    $data = file_exists($dataFile) ? json_decode(file_get_contents($dataFile), true) : [];

    $data[] = [
        'phone' => $phone,
        'response' => $response,
        'timestamp' => date("Y-m-d H:i:s")
    ];

    file_put_contents($dataFile, json_encode($data));

    echo json_encode(["status" => "success", "message" => "Response saved."]);
} else {
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        header('Content-Type: application/json');
        echo json_encode(["status" => "error", "message" => "Method Not Allowed"]);
    }
}
?>
