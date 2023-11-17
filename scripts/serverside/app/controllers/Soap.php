<?php
class Soap extends Controller
{
    private $soapHandler;

    public function __construct()
    {
        require_once __DIR__ . '/../applications/response.php';
        require_once __DIR__ . '/../constants/response.php';
        require_once __DIR__ . '/../core/SoapHandler.php';
        $this->soapHandler = new SoapHandler();
    }

    public function testConnection()
    {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            if (!(isset($_POST['arg0']))) {
                json_response_fail(WRONG_API_CALL);
                return;
            }
            $response = $this->soapHandler->call("TestConnection", array(
                '0' => $_POST['arg0'],
            ));
            json_response_success($response);
        } else {
            json_response_fail(METHOD_NOT_ALLOWED);
        }
    }

    public function getApiKey()
    {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $response = $this->soapHandler->call("getApiKey", []);
            json_response_success($response);
        } else {
            json_response_fail(METHOD_NOT_ALLOWED);
        }
    }

    public function getLogs()
    {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $response = $this->soapHandler->call("getAllLog", []);
            json_response_success($response);
        } else {
            json_response_fail(METHOD_NOT_ALLOWED);
        }
    }
    public function addRequest()
    {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            if (!isset($_POST['ID_Pengguna'])) {
                json_response_fail(WRONG_API_CALL);
            } else {
                $userData = $this->getModel("User")->getProfile($_POST['ID_Pengguna']);
                if ($userData) {
                    $response = $this->soapHandler->call(
                        "addUserRequest",
                        [
                            $userData["ID_Pengguna"],
                            $userData["nama_depan"] . " " . $userData["nama_belakang"],
                            $userData["email"]
                        ]
                    );
                    json_response_success($response);
                } else {
                    json_response_fail(ACCOUNT_NOT_FOUND);
                }
            }
        } else {
            json_response_fail(METHOD_NOT_ALLOWED);
        }
    }

    public function checkstatus()
    {
        if ($_SERVER['REQUEST_METHOD'] == 'GET') {
            if (!isset($_GET['ID_Pengguna'])) {
                json_response_fail(WRONG_API_CALL);
            } else {
                $userData = $this->getModel("User")->getProfile($_GET['ID_Pengguna']);
                if ($userData) {
                    $response = $this->soapHandler->call(
                        "getUserStatus",
                        [
                            $userData["ID_Pengguna"],
                        ]
                    );
                    json_response_success($response["verificationStatus"]);
                } else {
                    json_response_fail(ACCOUNT_NOT_FOUND);
                }
            }
        } else {
            json_response_fail(METHOD_NOT_ALLOWED);
        }
    }

    public function findBookmarkByID(){
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $inputJSON = file_get_contents('php://input');
            $input = json_decode($inputJSON, true);
            if (!isset($input['ID_Pengguna'])){
                json_response_fail(WRONG_API_CALL);
            } else{
                $response = $this->soapHandler->call(
                    "findBookmarkByID", 
                    [
                        $input['ID_Pengguna'],
                    ]
                );
                json_response_success($response);
                return;
                }
        }
         else {
            json_response_fail(METHOD_NOT_ALLOWED);
        }
    }
}