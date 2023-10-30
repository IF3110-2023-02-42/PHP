<?php
class CourseAPI extends Controller
{
    public function getPage()
    {
        if ($_SERVER['REQUEST_METHOD'] != 'GET') {
            return json_response_fail(METHOD_NOT_ALLOWED);
        }
        $res = $this->getModel("Course")->getPage($_GET['page'], $_GET['rows_per_page']);
        if ($res) {
            json_response_success($res);
        } else {
            json_response_fail('COURSE_NOT_FOUND');
        }
    }

    public function getNumberOfCourse()
    {
        if ($_SERVER['REQUEST_METHOD'] != 'GET') {
            return json_response_fail(METHOD_NOT_ALLOWED);
        }
        $res = $this->getModel("Course")->getNumberOfCourse();
        if ($res) {
            json_response_success($res);
        } else {
            json_response_fail('COURSE_NOT_FOUND');
        }
    }

    public function getAllCourse(){
        if ($_SERVER['REQUEST_METHOD'] != 'GET') {
            return json_response_fail(METHOD_NOT_ALLOWED);
        }
        $res = $this->getModel("Course")->getAllCourse();
        if ($res) {
            json_response_success($res);
        } else {
            json_response_fail('COURSE_NOT_FOUND');
        }
    }

    public function addCourse(){
        if ($_SERVER['REQUEST_METHOD'] != 'POST') {
            return json_response_fail(METHOD_NOT_ALLOWED);
        }
    
        //if no_modul is not null, delete it
        if(isset($_POST['kode_mapel']) && isset($_POST['kelas']) && isset($_POST['nama']) && isset($_POST['deskripsi'])){
            $result = $this->getModel('Module')->addCourse($_POST['kode_mapel'], $_POST['kelas'], $_POST['nama'], $_POST['deskripsi']);
            if ($result) {
                json_response_success($result);
            } else {
                json_response_fail($result);
            }
        }else{
            return json_response_fail(WRONG_API_CALL);
        }
    }

    public function deleteCourse()
    {
        if ($_SERVER['REQUEST_METHOD'] != 'POST') {
            return json_response_fail(METHOD_NOT_ALLOWED);
        }

        //if no_modul is not null, delete it
        if(isset($_POST['kode_mapel'])){
            $result = $this->getModel('Course')->deleteCourse($_POST['kode_mapel']);
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

