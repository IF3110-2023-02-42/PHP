<?php
class ExerciseAPI extends Controller
{
    public function getPage()
    {
        if ($_SERVER['REQUEST_METHOD'] != 'GET') {
            return json_response_fail(METHOD_NOT_ALLOWED);
        }
        $res = $this->getModel("Exercise")->getPage($_GET['page'], $_GET['rows_per_page']);
        if ($res) {
            json_response_success($res);
        } else {
            json_response_fail('EXERCISE_NOT_FOUND');
        }
    }

    public function getAllExercise()
    {
        if ($_SERVER['REQUEST_METHOD'] != 'GET') {
            return json_response_fail(METHOD_NOT_ALLOWED);
        }
        $res = $this->getModel("Exercise")->getAllExercise();
        if ($res) {
            json_response_success($res);
        } else {
            json_response_fail('EXERCISE_NOT_FOUND');
        }
    }

    public function getNumberOfExercise()
    {
        if ($_SERVER['REQUEST_METHOD'] != 'GET') {
            return json_response_fail(METHOD_NOT_ALLOWED);
        }
        $res = $this->getModel("Exercise")->getNumberOfExercise();
        if ($res) {
            json_response_success($res);
        } else {
            json_response_fail('EXERCISE_NOT_FOUND');
        }
    }

    public function getExerciseByMaterialID()
    {
        if ($_SERVER['REQUEST_METHOD'] != 'GET') {
            return json_response_fail(METHOD_NOT_ALLOWED);
        }
        $res = $this->getModel("Exercise")->getExerciseByMaterialID($_GET['id_material']);
        if ($res) {
            json_response_success($res);
        } else {
            json_response_fail('EXERCISE_NOT_FOUND');
        }
    }
}

