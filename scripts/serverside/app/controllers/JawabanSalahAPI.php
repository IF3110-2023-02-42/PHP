<?php
class JawabanSalahAPI extends Controller
{
    public function getJawabanSalahByIDSoal()
    {
        if ($_SERVER['REQUEST_METHOD'] != 'GET') {
            return json_response_fail(METHOD_NOT_ALLOWED);
        }
        $res = $this->getModel("JawabanSalah")->getJawabanSalahByIDSoal($_GET['ID_Soal']);
        if ($res) {
            json_response_success($res);
        } else {
            json_response_fail('JAWABAN_SALAH_NOT_FOUND');
        }
    }

    public function addJawabanSalah(){
        if ($_SERVER['REQUEST_METHOD'] != 'POST') {
            return json_response_fail(METHOD_NOT_ALLOWED);
        }
    
        //if no_modul is not null, delete it
        if(isset($_POST['id_soal']) && isset($_POST['jawaban'])){
            $result = $this->getModel('JawabanSalah')->addModule($_POST['id_soal'], $_POST['jawaban']);
            if ($result) {
                json_response_success($result);
            } else {
                json_response_fail($result);
            }
        }else{
            return json_response_fail(WRONG_API_CALL);
        }
    }
}

