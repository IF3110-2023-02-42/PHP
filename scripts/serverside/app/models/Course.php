<?php

class Course
{
    private $table = 'Mata_Pelajaran';
    private $db;

    public function __construct()
    {
        require_once __DIR__ . '/../core/Database.php';
        $this->db = new Database();
    }
    
    public function getAllCourse(){
        $this->db->query("SELECT * FROM " . $this->table);
        try {
            $this->db->execute();
            return $this->db->getAllResult();
        } catch (PDOException $e) {
            return  false;
        }
    }
    public function getPage($pageNumber, $rows_per_page){
        $res = $this->getAllCourse();
        if ($res){
            // Get slice of data
            $pageData = array_slice($res, ($pageNumber-1)*$rows_per_page, $rows_per_page);
            return $pageData;

        } else {
            return $res;
        }
    }

    public function getNumberOfCourse(){
        $this->db->query("SELECT COUNT(kode_mapel) AS numberOfCourse FROM " . $this->table);
        try {
            $this->db->execute();
            return $this->db->getResult();
        } catch (PDOException $e) {
            return  false;
        }
    }

    public function addCourse($kode_mapel, $kelas, $nama, $deskripsi){
        $this->db->startTransaction();
        $this->db->query("INSERT INTO " . $this->table . " VALUES (:kode_mapel, :kelas, :nama, :deskripsi)" );
    
        $this->db->bindParam(':kode_mapel', $kode_mapel);
        $this->db->bindParam(':kelas', $no_modul);
        $this->db->bindParam(':nama', $judul);
        $this->db->bindParam(':deskripsi', $deskripsi);
        try {
            
            $this->db->execute();
            $this->db->commit();
            return true;
        } catch (PDOException $e) {
            return  false;
        }
    }

    public function deleteCourse($kode_mapel){
        $this->db->startTransaction();
        $this->db->query("DELETE FROM " . $this->table . " WHERE kode_mapel = :kode_mapel" );

        $this->db->bindParam(':kode_mapel', $no_modul);
        try {
            
            $this->db->execute();
            $this->db->commit();
            return true;
        } catch (PDOException $e) {
            return  false;
        }
    }

}
