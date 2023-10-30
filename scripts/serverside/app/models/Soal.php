<?php

class Soal
{
    private $table = 'Soal';
    private $db;

    public function __construct()
    {
        require_once __DIR__ . '/../core/Database.php';
        $this->db = new Database();
    }

    public function getSoalByIDMaterial($ID_Material){
        $this->db->query("SELECT * FROM " . $this->table . " WHERE ID_Material = :ID_Material");
        $this->db->bindParam(':ID_Material', $ID_Material);
        try {
            $this->db->execute();
            return $this->db->getAllResult();
        } catch (PDOException $e) {
            return  false;
        }
    }

    public function addSoal($id_material, $id_soal, $nomor, $pertanyaan, $jawaban_benar){
        $this->db->startTransaction();
        $this->db->query("INSERT INTO " . $this->table . " VALUES (:ID_Soal, :ID_Material, :nomor, :pertanyaan, :jawaban_benar)" );
        
        $this->db->bindParam(':ID_Soal', $id_Soal);
        $this->db->bindParam(':ID_Material', $id_Material);
        $this->db->bindParam(':nomor', $nomor);
        $this->db->bindParam(':pertanyaan', $pertanyaan);
        $this->db->bindParam(':jawaban_benar', $jawaban_benar);
        try {
            
            $this->db->execute();
            $this->db->commit();
            return true;
        } catch (PDOException $e) {
            return  false;
        }
    }

    public function deleteSoal($id_Soal){
        $this->db->startTransaction();
        $this->db->query("DELETE FROM " . $this->table . " WHERE ID_Soal = :ID_Soal" );

        $this->db->bindParam(':ID_Soal', $id_soal);
        try {
            
            $this->db->execute();
            $this->db->commit();
            return true;
        } catch (PDOException $e) {
            return  false;
        }
    }
}
