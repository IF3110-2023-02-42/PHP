<?php

class JawabanSalah
{
    private $table = 'Jawaban_Salah';
    private $db;

    public function __construct()
    {
        require_once __DIR__ . '/../core/Database.php';
        $this->db = new Database();
    }
    
    public function getJawabanSalahByIDSoal($ID_Soal){
        $this->db->query("SELECT * FROM " . $this->table . " WHERE ID_Soal = :ID_Soal");
        $this->db->bindParam(':ID_Soal', $ID_Soal);
        try {
            $this->db->execute();
            return $this->db->getAllResult();
        } catch (PDOException $e) {
            return  false;
        }
    }

    public function addJawabanSalah($id_soal, $jawaban_salah1, $jawaban_salah2, $jawaban_salah3){
        $this->db->startTransaction();
        $this->db->query("INSERT INTO " . $this->table . " VALUES (:ID_Soal, :jawaban_salah1), (:ID_Soal, :jawaban_salah2), (:ID_Soal, :jawaban_salah3)" );
        
        $this->db->bindParam(':ID_Soal', $id_soal);
        $this->db->bindParam(':jawaban_salah1', $jawaban_salah1);
        $this->db->bindParam(':jawaban_salah2', $jawaban_salah2);
        $this->db->bindParam(':jawaban_salah3', $jawaban_salah3);
        try {
            
            $this->db->execute();
            $this->db->commit();
            return true;
        } catch (PDOException $e) {
            return  false;
        }
    }
}
