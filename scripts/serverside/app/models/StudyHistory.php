<?php

class StudyHistory
{
    private $table = 'mengakses';

    private $db;

    public function __construct()
    {
        require_once __DIR__ . '/../core/Database.php';
        $this->db = new Database();
    }

    public function getAllUserHistoryById($idPengguna)
    {
        $this->db->query("SELECT * FROM " . $this->table . "WHERE ID_Pengguna = :data");
        $this->db->bindParam(":data", $idPengguna);
        try {
            $this->db->execute();
            return $this->db->getAllResult();
        } catch (PDOException $e) {
            return  false;
        }
    }

    public function addHistory($idPengguna, $idMaterial)
    {
        $this->db->startTransaction();
        $this->db->query('INSERT INTO ' . $this->table . ' (ID_Pengguna, ID_Material) VALUES (:data1 , :data2)');
        $this->db->bindParam(':data1', $idPengguna);
        $this->db->bindParam(':data2', $idMaterial);
        try {
            $this->db->execute();
            $this->db->commit();
            return true;
        } catch (PDOException $e) {
            return  false;
        }
    }

    public function getUserHistoryById($idPengguna, $page, $size)
    {
        // $this->db->query("SELECT * FROM " . $this->table . " WHERE ID_Pengguna = :id ORDER BY tanggal_akses DESC LIMIT :size OFFSET :offset");
        $this->db->query("SELECT * FROM " . $this->table . " WHERE ID_Pengguna = :id ORDER BY tanggal_akses DESC LIMIT " . $size . " OFFSET " . $size * ($page - 1));
        $this->db->bindParam(":id", $idPengguna);
        try {
            $this->db->execute();
            return $this->db->getAllResult();
        } catch (PDOException $e) {
            return  false;
        }
    }

    public function getNumberOfPage($idPengguna, $size)
    {
        $this->db->query("SELECT COUNT(*) as SUM FROM " . $this->table . " WHERE ID_Pengguna = :data");
        $this->db->bindParam(":data", $idPengguna);
        try {
            $this->db->execute();
            $records = $this->db->getResult();
            return ceil($records["SUM"] / $size);
        } catch (PDOException $e) {
            return  false;
        }
    }
}
