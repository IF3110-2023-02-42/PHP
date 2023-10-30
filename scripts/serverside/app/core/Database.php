<?php
require_once __DIR__ . '/../constants/base.php';
require_once __DIR__ . '/./Tables.php';  

class Database
{

    private $conn;
    private $stmt;

    public function __construct()
    {
        $dsn = 'mysql:host=' . DB_SERVER . ';port=' . DB_PORT . ';dbname=' . DB_DATABASE;
        $option = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_TIMEOUT => 600,
            PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => true,
        ];


        // Establish connection
        try {
            $this->conn = new PDO($dsn, DB_USERNAME, DB_PASSWORD, $option);
            // Set the PDO error mode to exception
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            echo "Connection failed: " . $e->getMessage();
        }

        // Create initialization table (if not exist)
        try{
            $this->conn->exec(Tables::PENGGUNA_TABLE);
            $this->conn->exec(Tables::MATAPELAJARAN_TABLE);
            $this->conn->exec(Tables::MODUL_TABLE);
            $this->conn->exec(Tables::MATERIAL_TABLE);
            $this->conn->exec(Tables::LATIHANSOAL_TABLE);
            $this->conn->exec(Tables::SOAL_TABLE);
            $this->conn->exec(Tables::JAWABANSALAH_TABLE);
            $this->conn->exec(Tables::MENGAKSES_TABLE);
            $this->conn->exec(Tables::EARLY_USER);
            $this->conn->exec(Tables::EXIST_CONTENT);
        } catch (Exception $e){
            // Do Nothing because table has been initialized
        }
    }

    public function startTransaction()
    {
        try {
            $this->conn->beginTransaction();
        } catch (PDOException $e) {
            return false;
        }
    }

    public function commit()
    {
        try {
            // $this->conn->beginTransaction();
            $this->conn->commit();
        } catch (PDOException $e) {
            return $this->conn->commit();
        }
    }

    public function rollback()
    {
        try {
            $this->conn->beginTransaction();
        } catch (PDOException $e) {
            return $this->conn->rollBack();
        }
    }

    public function query($query)
    {
        $this->stmt = $this->conn->prepare($query);
    }

    public function bindParam($param, $value)
    {
        $this->stmt->bindParam($param, $value);
    }

    public function execute()
    {
        try {
            return $this->stmt->execute();
        } catch (\Throwable $th) {
            return false;
        }
    }

    public function getAllResult()
    {
        $this->execute();
        return $this->stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getResult()
    {
        try {
            $this->execute();
            return $this->stmt->fetch(PDO::FETCH_ASSOC);
        } catch (\Throwable $th) {
            return false;
        }
    }
}
