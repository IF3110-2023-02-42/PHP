<?php

class User
{
    private $table = 'pengguna';
    private $db;

    public function __construct()
    {
        require_once __DIR__ . '/../core/Database.php';
        $this->db = new Database();
    }

    public function getProfile($profileId)
    {
        $this->db->query("SELECT * FROM " . $this->table . " WHERE ID_Pengguna = :profileId");
        $this->db->bindParam(':profileId', $profileId);
        try {
            $this->db->execute();
            return $this->db->getResult();
        } catch (PDOException $e) {
            return  false;
        }
    }

    public function editProfile($ID_Pengguna, $nama_depan, $nama_belakang, $username, $email, $password, $profile_pict)
    {
        $this->db->startTransaction();
        $this->db->query("UPDATE " . $this->table . " SET nama_depan = :nama_depan, nama_belakang = :nama_belakang, username = :username,
            email = :email, password = :password, profile_pict = :profile_pict WHERE ID_Pengguna = :ID_Pengguna");

        $this->db->bindParam(':ID_Pengguna', $ID_Pengguna);
        $this->db->bindParam(':nama_depan', $nama_depan);
        $this->db->bindParam(':nama_belakang', $nama_belakang);
        $this->db->bindParam(':username', $username);
        $this->db->bindParam(':email', $email);
        $this->db->bindParam(':password', $password);
        $this->db->bindParam(':profile_pict', $profile_pict);
        // echo $ID_Pengguna, $nama_depan, $nama_belakang, $username, $email, $password, $profile_pict ;
        try {

            $this->db->execute();
            $this->db->commit();
            return true;
        } catch (PDOException $e) {
            return  false;
        }
    }

    public function login($username, $password)
    {
        $this->db->query('SELECT * FROM ' . $this->table . ' WHERE username = :username');
        $this->db->bindParam(':username', $username);
        $this->db->execute();
        $row = $this->db->getResult();
        if ($row) {
            if ($password == $row['password']) {
                return array(true, $row);
            } else {
                return array(false, WRONG_PASSWORD);
            }
        } else {
            return array(false, ACCOUNT_NOT_FOUND);
        }
    }

    public function register($nama_depan, $nama_belakang, $username, $email, $password)
    {
        $this->db->query('SELECT * FROM ' . $this->table . ' WHERE username = :username');
        $this->db->bindParam(':username', $username);
        $this->db->execute();
        $row = $this->db->getResult();
        if ($row) {
            return false;
        } else {
            $this->db->startTransaction();
            $this->db->query('INSERT INTO ' . $this->table . ' (nama_depan, nama_belakang, username, email, password, isVerified, role) VALUES (:nama_depan , :nama_belakang , :username , :email , :password ,  :isVerified , :role)');
            $this->db->bindParam(':nama_depan', $nama_depan);
            $this->db->bindParam(':nama_belakang', $nama_belakang);
            $this->db->bindParam(':username', $username);
            $this->db->bindParam(':email', $email);
            $this->db->bindParam(':password', $password);
            $this->db->bindParam(':isVerified', 0);
            $this->db->bindParam(':role', "user");
            try {
                $this->db->execute();
                $this->db->commit();
                return true;
            } catch (PDOException $e) {
                return  false;
            }
        }
    }

    public function checkUniqueEmail($data)
    {
        $this->db->query('SELECT * FROM ' . $this->table . ' WHERE email = :data');
        $this->db->bindParam(':data', $data);
        try {
            $this->db->execute();
            $row = $this->db->getResult();
            if ($row) {
                return false;
            }
            return true;
        } catch (\Throwable $th) {
            return false;
        }
    }

    public function checkUniqueUsername($data)
    {
        $this->db->query('SELECT * FROM ' . $this->table . ' WHERE username = :data');
        $this->db->bindParam(':data', $data);
        try {
            $this->db->execute();
            $row = $this->db->getResult();
            if ($row) {
                return false;
            }
            return true;
        } catch (\Throwable $th) {
            return false;
        }
    }

    public function checkEmailAvailability($id, $email)
    {
        $this->db->query('SELECT * FROM ' . $this->table . ' WHERE email = :data');
        $this->db->bindParam(':data', $email);
        try {
            $this->db->execute();
            $row = $this->db->getResult();
            if ($row) {
                if ($id == $row['ID_Pengguna']) {
                    return true;
                } else {
                    return false;
                }
            }
            return true;
        } catch (\Throwable $th) {
            return false;
        }
    }

    public function checkUsernameAvailability($id, $username)
    {
        $this->db->query('SELECT * FROM ' . $this->table . ' WHERE username = :data');
        $this->db->bindParam(':data', $username);
        try {
            $this->db->execute();
            $row = $this->db->getResult();
            if ($row) {
                if ($id == $row['ID_Pengguna']) {
                    return true;
                } else {
                    return false;
                }
            }
            return true;
        } catch (\Throwable $th) {
            return false;
        }
    }
}
