<?php


class App {
    protected $params = [];
    protected $controller = null;
    protected $method ='';

    public function __construct() {
        if(isset($_SERVER['HTTP_ORIGIN'])){
            header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        }else{
            header('Access-Control-Allow-Origin: *');
        }
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');
        session_start();
        $url = $this->parseUrl();
        if(isset($url[0]) && file_exists(__DIR__ . '/../controllers/' . $url[0] . '.php')) {
            $this->controller = $url[0];
        }
        else{
            echo json_encode(Array('status' => false, 'message' => 'API_NOT_FOUND'));
            return;
        }
        
        require_once __DIR__ . '/../controllers/' . $this->controller . '.php';
        $this->controller = new ($this->controller)();
        
        // echo $url[1];
        if(isset($url[1])) {
            if(method_exists($this->controller, $url[1])) {
                $this->method = $url[1];
                unset($url[1]);
            }
        }
        else {
            $this->method = $url[0];
        }
        unset($url[0]);
        if (!empty($url)) {
            $this->params = array_values($url);
        }
        
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            if ($_POST == null){
                $_POST = json_decode(file_get_contents('php://input'), true);
            }            
        }
        call_user_func_array([$this->controller, $this->method], $this->params);
    }

    public function parseURL() {
        if (isset($_GET['url'])) {
            $url = rtrim($_GET['url'], '/');
            $url = filter_var($url, FILTER_SANITIZE_URL);
            $url = explode('/', $url);
            return $url;
        }
    }
}