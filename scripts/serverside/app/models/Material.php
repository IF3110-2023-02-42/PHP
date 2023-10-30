<?php

class Material
{
    private $table = 'material';
    private $db;

    public function __construct()
    {
        require_once __DIR__ . '/../core/Database.php';
        $this->db = new Database();
    }

    public function getAllMaterial()
    {
        $this->db->query("SELECT * FROM " . $this->table);
        try {
            $this->db->execute();
            return $this->db->getAllResult();
        } catch (PDOException $e) {
            return  false;
        }
    }
    public function getPage($pageNumber, $rows_per_page)
    {
        $res = $this->getAllMaterial();
        if ($res) {
            // Get slice of data
            $pageData = array_slice($res, ($pageNumber - 1) * $rows_per_page, $rows_per_page);
            return $pageData;
        } else {
            return $res;
        }
    }

    public function getNumberOfMaterial()
    {
        $this->db->query("SELECT COUNT(ID_Material) AS numberOfMaterial FROM " . $this->table);
        try {
            $this->db->execute();
            return $this->db->getResult();
        } catch (PDOException $e) {
            return  false;
        }
    }

    public function getMaterialByModuleNumberandKodeMapel($kode_mapel, $no_modul)
    {
        $this->db->query("SELECT * FROM " . $this->table . " WHERE kode_mapel = :kodeMapel AND no_modul = :noModul");
        $this->db->bindParam(':kodeMapel', $kode_mapel);
        $this->db->bindParam(':noModul', $no_modul);
        try {
            $this->db->execute();
            return $this->db->getAllResult();
        } catch (PDOException $e) {
            return  false;
        }
    }
    public function getMaterialById($ID_Material)
    {
        $this->db->query("SELECT * FROM " . $this->table . " WHERE ID_Material = :ID_Material");
        $this->db->bindParam(':ID_Material', $ID_Material);
        try {
            $this->db->execute();
            return $this->db->getResult();
        } catch (PDOException $e) {
            return  false;
        }
    }

    public function addMaterial($kode_mapel, $no_modul, $judul, $video, $teks)
    {
        $this->db->startTransaction();
        $this->db->query("INSERT INTO " . $this->table . " (kode_mapel, no_modul, judul, video, teks) VALUES (:kode_mapel, :no_modul, :judul, :video, :teks)");

        $this->db->bindParam(':kode_mapel', $kode_mapel);
        $this->db->bindParam(':no_modul', $no_modul);
        $this->db->bindParam(':judul', $judul);
        $this->db->bindParam(':video', $video);
        $this->db->bindParam(':teks', $teks);

        try {

            $this->db->execute();
            $this->db->commit();
            return true;
        } catch (PDOException $e) {
            return  false;
        }
    }

    public function editMaterial($ID_Material, $kode_mapel, $no_modul, $judul, $video, $teks)
    {
        $this->db->startTransaction();
        $this->db->query("UPDATE " . $this->table . " SET kode_mapel= :kode_mapel, no_modul= :no_modul, judul= :judul, video= :video, teks= :teks WHERE ID_Material= :ID_Material");

        $this->db->bindParam(':ID_Material', $ID_Material);
        $this->db->bindParam(':kode_mapel', $kode_mapel);
        $this->db->bindParam(':no_modul', $no_modul);
        $this->db->bindParam(':judul', $judul);
        $this->db->bindParam(':video', $video);
        $this->db->bindParam(':teks', $teks);

        try {

            $this->db->execute();
            $this->db->commit();
            return true;
        } catch (PDOException $e) {
            return  false;
        }
    }

    public function deleteMaterial($ID_Material)
    {
        $this->db->startTransaction();
        $this->db->query("DELETE FROM " . $this->table . " WHERE ID_Material = :ID_Material");

        $this->db->bindParam(':ID_Material', $ID_Material);
        try {

            $this->db->execute();
            $this->db->commit();
            return true;
        } catch (PDOException $e) {
            return  false;
        }
    }

    public function getMaterialWithAlotOfParam(
        $keyword,
        $courseName,
        $moduleName,
        $materialName,
        $c10,
        $c11,
        $c12,
        $orderbyclass,
        $orderbyname
    ) {
        if (!$courseName && !$materialName && !$moduleName) {
            $materialName = 1;
        }

        if (!$c10 && !$c11 && !$c12) {
            $c10 = 1;
            $c11 = 1;
            $c12 = 1;
        }

        $this->db->query("
        SELECT
            MP.*,
            M.no_modul,
            M.judul AS judul_modul,
            Mat.ID_Material,
            Mat.judul AS judul_material,
            Mat.teks
        FROM
            Mata_Pelajaran MP
        JOIN
            Modul M ON MP.kode_mapel = M.kode_mapel
        JOIN
            Material Mat ON M.kode_mapel = Mat.kode_mapel AND M.no_modul = Mat.no_modul
        ORDER BY
            MP.kelas " . $orderbyclass . " , Mat.judul " . $orderbyname . ";
        ");
        try {
            $this->db->execute();
            $res = $this->db->getAllResult();
            $courseFiltered = [];
            $moduleFiltered = [];
            $materialFiltered = [];
            if ($courseName) {
                $courseFiltered = $this->filterKeepBy('nama', $keyword, $res);
            }
            if ($moduleName) {
                $moduleFiltered = $this->filterKeepBy('judul_modul', $keyword, $res);
            }
            if ($materialName) {
                $materialFiltered = $this->filterKeepBy('judul_material', $keyword, $res);
            }
            $combinedFiltered = array_merge($courseFiltered, $moduleFiltered, $materialFiltered);
            $combinedFiltered = array_unique($combinedFiltered, SORT_REGULAR);

            $class10 = [];
            $class11 = [];
            $class12 = [];
            if ($c10) {
                $class10 = $this->filterKeepBy('kelas', '10', $combinedFiltered);
            }
            if ($c11) {
                $class11 = $this->filterKeepBy('kelas', '11', $combinedFiltered);
            }
            if ($c12) {
                $class12 = $this->filterKeepBy('kelas', '12', $combinedFiltered);
            }

            $combinedFilteredAgain = array_merge($class10, $class11, $class12);
            $combinedFilteredAgain = array_unique($combinedFilteredAgain, SORT_REGULAR);

            return $combinedFilteredAgain;
        } catch (PDOException $e) {
            return  false;
        }
    }

    public function filterKeepBy($type, $keyword, $data)
    {
        $filteredData = [];

        foreach ($data as $record) {
            if (isset($record[$type]) && strpos(strtolower($record[$type]), strtolower($keyword)) !== false) {
                $filteredData[] = $record;
            }
        }

        return $filteredData;
    }

    public function getMaxPage(
        $keyword,
        $courseName,
        $moduleName,
        $materialName,
        $c10,
        $c11,
        $c12,
        $orderbyclass,
        $orderbyname,
        $size,
    ) {
        $res = $this->getMaterialWithAlotOfParam(
            $keyword,
            $courseName,
            $moduleName,
            $materialName,
            $c10,
            $c11,
            $c12,
            $orderbyclass,
            $orderbyname
        );
        return ceil(count($res) / $size);
    }

    public function getMaterialPerPage(
        $keyword,
        $courseName,
        $moduleName,
        $materialName,
        $c10,
        $c11,
        $c12,
        $orderbyclass,
        $orderbyname,
        $size,
        $page
    ) {
        $res = $this->getMaterialWithAlotOfParam(
            $keyword,
            $courseName,
            $moduleName,
            $materialName,
            $c10,
            $c11,
            $c12,
            $orderbyclass,
            $orderbyname
        );
        return array_slice($res, $size * ($page - 1), $size);
    }
}
