<?php

function json_response_success($data)
{
    header('Content-type: application/json');
    echo (json_encode(array('status' => true, 'data' => $data)));
}

function json_response_fail($msg)
{
    header('Content-type: application/json');
    echo (json_encode(array('status' => false, 'data' => $msg)));
}
