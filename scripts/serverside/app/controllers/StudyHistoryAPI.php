<?php

class StudyHistoryAPI extends Controller
{
    public function getUserHistory()
    {
        if ($_SERVER['REQUEST_METHOD'] == 'GET') {
            if (
                isset($_GET['ID_Pengguna']) &&
                isset($_GET['page']) &&
                isset($_GET['size'])
            ) {
                $res = $this
                    ->getModel('StudyHistory')
                    ->getUserHistoryById(
                        $_GET['ID_Pengguna'],
                        $_GET['page'],
                        $_GET['size']
                    );
                if ($res) {
                    json_response_success($res);
                } else {
                    json_response_fail(NO_HISTORY_FOUND);
                }
            } else {
                json_response_fail(WRONG_API_CALL);
            }
        } else {
            json_response_fail(METHOD_NOT_ALLOWED);
        }
    }

    public function getMaxPage()
    {
        if ($_SERVER['REQUEST_METHOD'] == 'GET') {
            if (
                isset($_GET['ID_Pengguna']) && isset($_GET['size'])
            ) {
                $res = $this
                    ->getModel('StudyHistory')
                    ->getNumberOfPage($_GET['ID_Pengguna'], intval($_GET['size']));
                if ($res) {
                    json_response_success($res);
                } else {
                    json_response_fail(NO_HISTORY_FOUND);
                }
            } else {
                json_response_fail(WRONG_API_CALL);
            }
        } else {
            json_response_fail(METHOD_NOT_ALLOWED);
        }
    }
}
