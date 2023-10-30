<?php
class UserAPI extends Controller
{
    protected $model = null;
    public function getProfile()
    {
        if ($_SERVER['REQUEST_METHOD'] != 'GET') {
            return json_response_fail(METHOD_NOT_ALLOWED);
        }
        $res = $this->getModel("User")->getProfile($_GET['ID_Pengguna']);
        if ($res) {
            json_response_success($res);
        } else {
            json_response_fail('PROFILE_NOT_FOUND');
        }
    }

    public function editProfile()
    {
        if ($_SERVER['REQUEST_METHOD'] != 'POST') {
            return json_response_fail(METHOD_NOT_ALLOWED);
        }

        // form check
        if (
            isset($_POST['ID_Pengguna']) &&
            isset($_POST['nama_depan']) &&
            isset($_POST['nama_belakang']) &&
            isset($_POST['username']) &&
            isset($_POST['email']) &&
            isset($_POST['password']) &&
            isset($_POST['profile_pict'])
        ) {
            if (!$this->getModel('User')->checkEmailAvailability($_POST['ID_Pengguna'], $_POST['email'])) {
                json_response_fail(EMAIL_REGISTERED);
                return;
            }
            if (!$this->getModel('User')->checkUsernameAvailability($_POST['ID_Pengguna'], $_POST['username'])) {
                json_response_fail(USERNAME_REGISTERED);
                return;
            }
            $result = $this->getModel('User')->editProfile(
                $_POST['ID_Pengguna'],
                $_POST['nama_depan'],
                $_POST['nama_belakang'],
                $_POST['username'],
                $_POST['email'],
                $_POST['password'],
                $_POST['profile_pict']
            );
            if ($result) {
                json_response_success($result);
                $newSession = $this->getModel("User")->getProfile($_POST['ID_Pengguna']);
                unset($newSession['password']);
                $_SESSION["user"] = $newSession;
            } else {
                json_response_fail($result);
            }
        } else {
            return json_response_fail(WRONG_API_CALL);
        }
    }
}
