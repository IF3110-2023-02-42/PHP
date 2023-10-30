<?php

class Controller
{
    public function __construct()
    {
        require_once __DIR__ . '/../applications/response.php';
        require_once __DIR__ . '/../constants/response.php';
    }
    public function getModel($model)
    {
        require_once __DIR__ . '/../models/' . $model . '.php';
        return new $model();
    }
}
