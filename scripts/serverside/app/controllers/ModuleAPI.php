<?php
class ModuleAPI extends Controller
{
    public function getPage()
    {
        if ($_SERVER['REQUEST_METHOD'] != 'GET') {
            return json_response_fail(METHOD_NOT_ALLOWED);
        }
        $res = $this->getModel("Module")->getPage($_GET['page'], $_GET['rows_per_page']);
        if ($res) {
            json_response_success($res);
        } else {
            json_response_fail('COURSE_NOT_FOUND');
        }
    }

    public function getNumberOfModule()
    {
        if ($_SERVER['REQUEST_METHOD'] != 'GET') {
            return json_response_fail(METHOD_NOT_ALLOWED);
        }
        $res = $this->getModel("Module")->getNumberOfModule();
        if ($res) {
            json_response_success($res);
        } else {
            json_response_fail('COURSE_NOT_FOUND');
        }
    }
    
    public function getModuleByKodeMapel()
    {
        if ($_SERVER['REQUEST_METHOD'] != 'GET') {
            return json_response_fail(METHOD_NOT_ALLOWED);
        }
        $res = $this->getModel("Module")->getModuleByKodeMapel($_GET['kode_mapel']);
        if ($res) {
            json_response_success($res);
        } else {
            json_response_fail('COURSE_NOT_FOUND');
        }
    }

    public function addModule(){
        if ($_SERVER['REQUEST_METHOD'] != 'POST') {
            return json_response_fail(METHOD_NOT_ALLOWED);
        }
    
        //if no_modul is not null, delete it
        if(isset($_POST['kode_mapel']) && isset($_POST['no_modul']) && isset($_POST['judul']) && isset($_POST['deskripsi'])){
            $result = $this->getModel('Module')->addModule($_POST['kode_mapel'], $_POST['no_modul'], $_POST['judul'], $_POST['deskripsi']);
            if ($result) {
                json_response_success($result);
            } else {
                json_response_fail($result);
            }
        }else{
            return json_response_fail(WRONG_API_CALL);
        }
    }



    public function deleteModule()
    {
        if ($_SERVER['REQUEST_METHOD'] != 'POST') {
            return json_response_fail(METHOD_NOT_ALLOWED);
        }

        //if no_modul is not null, delete it
        if(isset($_POST['no_modul'])){
            $result = $this->getModel('Module')->deleteModule($_POST['no_modul']);
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