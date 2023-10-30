<?php

class Module
{
    private $table = 'Modul';
    private $db;

    public function __construct()
    {
        require_once __DIR__ . '/../core/Database.php';
        $this->db = new Database();
    }
    
    public function getAllModule(){
        $this->db->query("SELECT * FROM " . $this->table);
        try {
            $this->db->execute();
            return $this->db->getAllResult();
        } catch (PDOException $e) {
            return  false;
        }
    }
    public function getPage($pageNumber, $rows_per_page){
        $res = $this->getAllModule();
        if ($res){
            // Get slice of data
            $pageData = array_slice($res, ($pageNumber-1)*$rows_per_page, $rows_per_page);
            return $pageData;

        } else {
            return $res;
        }
    }

    public function getNumberOfModule(){
        $this->db->query("SELECT COUNT(*) AS numberOfModule FROM " . $this->table);
        try {
            $this->db->execute();
            return $this->db->getResult();
        } catch (PDOException $e) {
            return  false;
        }
    }

    public function getModuleByKodeMapel($kode_mapel){
        $this->db->query("SELECT * FROM " . $this->table . " WHERE kode_mapel = :kodeMapel");
        $this->db->bindParam(':kodeMapel', $kode_mapel);
        try {
            $this->db->execute();
            return $this->db->getAllResult();
        } catch (PDOException $e) {
            return  false;
        }
    }

    public function addModule($kode_mapel, $no_modul, $judul, $deskripsi){
        $this->db->startTransaction();
        $this->db->query("INSERT INTO " . $this->table . " VALUES (:kode_mapel, :no_modul, :judul, :deskripsi)" );
    
        $this->db->bindParam(':kode_mapel', $kode_mapel);
        $this->db->bindParam(':no_modul', $no_modul);
        $this->db->bindParam(':judul', $judul);
        $this->db->bindParam(':deskripsi', $deskripsi);
        try {
            
            $this->db->execute();
            $this->db->commit();
            return true;
        } catch (PDOException $e) {
            return  false;
        }
    }


    public function deleteModule($no_modul){
        $this->db->startTransaction();
        $this->db->query("DELETE FROM " . $this->table . " WHERE no_modul = :no_modul" );

        $this->db->bindParam(':no_modul', $no_modul);
        try {
            
            $this->db->execute();
            $this->db->commit();
            return true;
        } catch (PDOException $e) {
            return  false;
        }
    }

}