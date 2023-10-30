<?php
class SoalAPI extends Controller
{
    public function getSoalByIDMaterial()
    {
        if ($_SERVER['REQUEST_METHOD'] != 'POST') {
            return json_response_fail(METHOD_NOT_ALLOWED);
        }
        $res = $this->getModel("Soal")->getSoalByIDMaterial($_POST['ID_Material']);
        if ($res) {
            json_response_success($res);
        } else {
            json_response_fail('EXERCISE_NOT_FOUND');
        }
    }

    public function addSoal(){
        if ($_SERVER['REQUEST_METHOD'] != 'POST') {
            return json_response_fail(METHOD_NOT_ALLOWED);
        }
    
        //if no_modul is not null, delete it
        if(isset($_POST['id_soal']) && isset($_POST['id_material']) && isset($_POST['nomor']) && isset($_POST['pertanyaan']) && isset($_POST['jawaban_benar'])){
            $result = $this->getModel('Soal')->addModule($_POST['id_soal'], $_POST['id_material'], $_POST['nomor'], $_POST['pertanyaan'], $_POST['jawaban_benar']);
            if ($result) {
                json_response_success($result);
            } else {
                json_response_fail($result);
            }
        }else{
            return json_response_fail(WRONG_API_CALL);
        }
    }

    public function deleteSoal()
    {
        if ($_SERVER['REQUEST_METHOD'] != 'POST') {
            return json_response_fail(METHOD_NOT_ALLOWED);
        }

        //if no_modul is not null, delete it
        if(isset($_POST['id_soal'])){
            $result = $this->getModel('Soal')->deleteModule($_POST['id_soal']);
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