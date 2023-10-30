<?php

class Exercise
{
    private $table = 'Latihan_Soal';
    private $db;

    public function __construct()
    {
        require_once __DIR__ . '/../core/Database.php';
        $this->db = new Database();
    }
    
    public function getAllExercise(){
        $this->db->query("SELECT * FROM " . $this->table);
        try {
            $this->db->execute();
            return $this->db->getAllResult();
        } catch (PDOException $e) {
            return  false;
        }
    }
    public function getPage($pageNumber, $rows_per_page){
        $res = $this->getAllExercise();
        if ($res){
            // Get slice of data
            $pageData = array_slice($res, ($pageNumber-1)*$rows_per_page, $rows_per_page);
            return $pageData;

        } else {
            return $res;
        }
    }

    public function getNumberOfExercise(){
        $this->db->query("SELECT COUNT(ID_Material) AS numberOfExercise FROM " . $this->table);
        try {
            $this->db->execute();
            return $this->db->getResult();
        } catch (PDOException $e) {
            return  false;
        }
    }

    public function getExerciseByMaterialID($id_material){
        $this->db->query("SELECT * FROM " . $this->table . " WHERE ID_Material = :id_material");
        $this->db->bindParam(':id_material', $id_material);
        try {
            $this->db->execute();
            return $this->db->getAllResult();
        } catch (PDOException $e) {
            return  false;
        }
    }
}
