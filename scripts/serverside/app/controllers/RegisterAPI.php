<?php

class RegisterAPI extends Controller
{
    protected $model = null;
    public function __construct()
    {
        $this->model = $this->getModel("User");
        require_once __DIR__ . '/../applications/response.php';
        require_once __DIR__ . '/../constants/response.php';
    }
    public function register()
    {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $res = $this->model->checkUniqueEmail($_POST['email']);
            if (!$res) {
                json_response_fail(EMAIL_REGISTERED);
                return;
            }
            $res = $this->model->checkUniqueUsername($_POST['username']);
            if (!$res) {
                json_response_fail(USERNAME_REGISTERED);
                return;
            }
            $res = $this->model->register(
                $_POST['nama_depan'],
                $_POST['nama_belakang'],
                $_POST['username'],
                $_POST['email'],
                $_POST['password']
            );
            if ($res) {
                json_response_success("Success");
            } else {
                json_response_fail(EMAIL_REGISTERED);
            }
        } else {
            json_response_fail(METHOD_NOT_ALLOWED);
        }
    }
}
