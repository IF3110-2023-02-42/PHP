<?php

class MaterialAPI extends Controller
{
    public function getPage()
    {
        if ($_SERVER['REQUEST_METHOD'] != 'GET') {
            return json_response_fail(METHOD_NOT_ALLOWED);
        }
        $res = $this->getModel("Material")->getPage($_GET['page'], $_GET['rows_per_page']);
        if ($res) {
            json_response_success($res);
        } else {
            json_response_fail('COURSE_NOT_FOUND');
        }
    }

    public function getNumberOfMaterial()
    {
        if ($_SERVER['REQUEST_METHOD'] != 'GET') {
            return json_response_fail(METHOD_NOT_ALLOWED);
        }
        $res = $this->getModel("Material")->getNumberOfMaterial();
        if ($res) {
            json_response_success($res);
        } else {
            json_response_fail('COURSE_NOT_FOUND');
        }
    }

    public function getMaterialByModuleNumberandKodeMapel()
    {
        if ($_SERVER['REQUEST_METHOD'] != 'GET') {
            return json_response_fail(METHOD_NOT_ALLOWED);
        }
        $res = $this->getModel("Material")->getMaterialByModuleNumberandKodeMapel($_GET['kode_mapel'], $_GET['modulenumber']);
        if ($res) {
            json_response_success($res);
        } else {
            json_response_fail('MATERIAL_NOT_FOUND');
        }
    }

    public function getMaterialById()
    {
        if ($_SERVER['REQUEST_METHOD'] != 'GET') {
            return json_response_fail(METHOD_NOT_ALLOWED);
        }
        $res = $this->getModel("Material")->getMaterialById($_GET['ID_Material']);
        if ($res) {
            json_response_success($res);
        } else {
            json_response_fail('MATERIAL_NOT_FOUND');
        }
    }
    public function addMaterial()
    {
        if ($_SERVER['REQUEST_METHOD'] != 'POST') {
            return json_response_fail(METHOD_NOT_ALLOWED);
        }

        if (isset($_POST['kode_mapel']) && isset($_POST['no_modul']) && isset($_POST['judul']) && isset($_POST['video']) && isset($_POST['teks'])) {
            $result = $this->getModel('Material')->addMaterial($_POST['kode_mapel'], $_POST['no_modul'], $_POST['judul'], $_POST['video'], $_POST['teks']);
            if ($result) {
                json_response_success($result);
            } else {
                json_response_fail($result);
            }
        } else {
            return json_response_fail(WRONG_API_CALL);
        }
    }
    public function editMaterial()
    {
        if ($_SERVER['REQUEST_METHOD'] != 'POST') {
            return json_response_fail(METHOD_NOT_ALLOWED);
        }

        if (isset($_POST['ID_Material']) && isset($_POST['kode_mapel']) && isset($_POST['no_modul']) && isset($_POST['judul']) && isset($_POST['video']) && isset($_POST['teks'])) {
            $result = $this->getModel('Material')->editMaterial($_POST['ID_Material'],  $_POST['kode_mapel'], $_POST['no_modul'], $_POST['judul'], $_POST['video'], $_POST['teks']);
            if ($result) {
                json_response_success($result);
            } else {
                json_response_fail($result);
            }
        } else {
            return json_response_fail(WRONG_API_CALL);
        }
    }

    public function deleteMaterial()
    {
        if ($_SERVER['REQUEST_METHOD'] != 'POST') {
            return json_response_fail(METHOD_NOT_ALLOWED);
        }

        //if no_modul is not null, delete it
        if (isset($_POST['ID_Material'])) {
            $result = $this->getModel('Material')->deleteMaterial($_POST['ID_Material']);
            if ($result) {
                json_response_success($result);
            } else {
                json_response_fail($result);
            }
        } else {
            return json_response_fail(WRONG_API_CALL);
        }
    }

    public function getMaterialBySearchbar()
    {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            if (
                isset($_POST['keyword']) &&
                isset($_POST['courseName']) &&
                isset($_POST['materialName']) &&
                isset($_POST['moduleName']) &&
                isset($_POST['c10']) &&
                isset($_POST['c11']) &&
                isset($_POST['c12']) &&
                isset($_POST['orderbyclass']) &&
                isset($_POST['orderbyname'])
            ) {
                $result = $this->getModel('Material')
                    ->getMaterialWithAlotOfParam(
                        $_POST['keyword'],
                        $_POST['courseName'],
                        $_POST['moduleName'],
                        $_POST['materialName'],
                        $_POST['c10'],
                        $_POST['c11'],
                        $_POST['c12'],
                        $_POST['orderbyclass'],
                        $_POST['orderbyname']
                    );
                if ($result) {
                    json_response_success($result);
                } else {
                    json_response_fail(NO_RECORDS_FOUND);
                }
            } else {
                return json_response_fail(WRONG_API_CALL);
            }
        } else {
            return json_response_fail(METHOD_NOT_ALLOWED);
        }
    }

    public function getMaxPage()
    {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            if (
                isset($_POST['keyword']) &&
                isset($_POST['courseName']) &&
                isset($_POST['materialName']) &&
                isset($_POST['moduleName']) &&
                isset($_POST['c10']) &&
                isset($_POST['c11']) &&
                isset($_POST['c12']) &&
                isset($_POST['orderbyclass']) &&
                isset($_POST['orderbyname']) &&
                isset($_POST['size'])
            ) {
                $result = $this->getModel('Material')
                    ->getMaxPage(
                        $_POST['keyword'],
                        $_POST['courseName'],
                        $_POST['moduleName'],
                        $_POST['materialName'],
                        $_POST['c10'],
                        $_POST['c11'],
                        $_POST['c12'],
                        $_POST['orderbyclass'],
                        $_POST['orderbyname'],
                        $_POST['size']
                    );
                if ($result) {
                    json_response_success($result);
                } else {
                    json_response_fail(NO_RECORDS_FOUND);
                }
            } else {
                return json_response_fail(WRONG_API_CALL);
            }
        } else {
            return json_response_fail(METHOD_NOT_ALLOWED);
        }
    }

    public function getMaterialPerPage()
    {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            if (
                isset($_POST['keyword']) &&
                isset($_POST['courseName']) &&
                isset($_POST['materialName']) &&
                isset($_POST['moduleName']) &&
                isset($_POST['c10']) &&
                isset($_POST['c11']) &&
                isset($_POST['c12']) &&
                isset($_POST['orderbyclass']) &&
                isset($_POST['orderbyname']) &&
                isset($_POST['size']) &&
                isset($_POST['page'])
            ) {
                $result = $this->getModel('Material')
                    ->getMaterialPerPage(
                        $_POST['keyword'],
                        $_POST['courseName'],
                        $_POST['moduleName'],
                        $_POST['materialName'],
                        $_POST['c10'],
                        $_POST['c11'],
                        $_POST['c12'],
                        $_POST['orderbyclass'],
                        $_POST['orderbyname'],
                        $_POST['size'],
                        $_POST['page']
                    );
                if ($result) {
                    json_response_success($result);
                } else {
                    json_response_fail(NO_RECORDS_FOUND);
                }
            } else {
                return json_response_fail(WRONG_API_CALL);
            }
        } else {
            return json_response_fail(METHOD_NOT_ALLOWED);
        }
    }
}
