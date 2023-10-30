<?php

class Tables{
    public const PENGGUNA_TABLE = "
        CREATE TABLE Pengguna (
            ID_Pengguna INT AUTO_INCREMENT PRIMARY KEY,
            nama_depan VARCHAR(50),
            nama_belakang VARCHAR(50),
            username VARCHAR(50) UNIQUE,
            email VARCHAR(100) UNIQUE,
            password VARCHAR(100),
            isVerified BOOLEAN,
            role VARCHAR(50),
            profile_pict VARCHAR(100)
        );
    ";

    public const MATAPELAJARAN_TABLE = "
        CREATE TABLE Mata_Pelajaran (
            kode_mapel INT AUTO_INCREMENT PRIMARY KEY,
            kelas VARCHAR(50) NOT NULL,
            nama VARCHAR(100) NOT NULL,
            deskripsi VARCHAR(255)
        );
    ";

    public const MODUL_TABLE = "
        CREATE TABLE Modul (
            kode_mapel INT,
            no_modul INT,
            judul VARCHAR(100) NOT NULL,
            deskripsi VARCHAR(255),
            PRIMARY KEY (kode_mapel, no_modul),
            FOREIGN KEY (kode_mapel) REFERENCES Mata_Pelajaran(kode_mapel)
        );
    ";

    public const MATERIAL_TABLE = "
        CREATE TABLE Material (
            ID_Material INT AUTO_INCREMENT PRIMARY KEY,
            kode_mapel INT,
            no_modul INT,
            judul VARCHAR(50),
            video VARCHAR(100),
            teks TEXT,
            FOREIGN KEY (kode_mapel, no_modul) REFERENCES Modul(kode_mapel, no_modul)
        );
    ";

    public const LATIHANSOAL_TABLE = "
        CREATE TABLE Latihan_Soal (
            ID_Material INT PRIMARY KEY,
            judul VARCHAR(100) NOT NULL,
            deskripsi VARCHAR(255),
            FOREIGN KEY (ID_Material) REFERENCES Material(ID_Material)
        );
    ";

    public const SOAL_TABLE = "
        CREATE TABLE Soal (
            ID_Soal INT AUTO_INCREMENT PRIMARY KEY,
            ID_Material INT,
            nomor INT NOT NULL,
            pertanyaan VARCHAR(255) NOT NULL,
            jawaban_benar VARCHAR(255) NOT NULL,
            FOREIGN KEY (ID_Material) REFERENCES Latihan_Soal(ID_Material)
        );
    ";

    public const JAWABANSALAH_TABLE = "
        CREATE TABLE Jawaban_Salah (
            ID_Soal INT,
            jawaban VARCHAR(255),
            PRIMARY KEY (ID_soal, jawaban),
            FOREIGN KEY (ID_Soal) REFERENCES Soal(ID_Soal)
        );
    ";

    public const MENGAKSES_TABLE = "
        CREATE TABLE Mengakses (
            ID_Pengguna INT,
            ID_Material INT,
            tanggal_akses TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (ID_Pengguna, ID_Material, tanggal_akses),
            FOREIGN KEY (ID_Pengguna) REFERENCES Pengguna(ID_Pengguna),
            FOREIGN KEY (ID_Material) REFERENCES Material(ID_Material)
        );
    ";

    public const EARLY_USER = "
        INSERT INTO Pengguna (nama_depan, nama_belakang, username, email, password, isVerified, role, profile_pict)
        VALUES ('Alex', 'Kwong', 'alexkwong', 'alexkwong@gmail.com', 'alexkiw', true, 'user', 'alex_profile.jpg');

        INSERT INTO Pengguna (nama_depan, nama_belakang, username, email, password, isVerified, role, profile_pict)
        VALUES ('Fadhil', 'Amri', 'amree', 'amri123@gmail.com', 'fadhil123', true, 'admin', 'fadhil_profile.jpg');

        INSERT INTO Pengguna (nama_depan, nama_belakang, username, email, password, isVerified, role, profile_pict)
        VALUES ('Farhan', 'Fahrezy', 'fahrezee', 'farhan123@gmail.com', 'fahrezy123', true, 'admin', 'farhan_profile.jpg');

        INSERT INTO Pengguna (nama_depan, nama_belakang, username, email, password, isVerified, role, profile_pict)
        VALUES ('Manuella', 'Sianipar', 'manuella', 'manuella123@gmail.com', 'man123', true, 'admin', 'manuella_profile.jpg');
    ";

    public const EXIST_CONTENT = "
    -- Memasukkan data ke dalam tabel Mata_Pelajaran
    INSERT INTO Mata_Pelajaran (kode_mapel, kelas, nama, deskripsi)
    VALUES 
      (1, '10', 'Matematika', 'Pelajaran tentang konsep matematika dasar.'),
      (2, '11', 'Fisika', 'Pelajaran tentang konsep fisika dasar.'),
      (3, '12', 'Kimia', 'Pelajaran tentang konsep kimia dasar.');
    
    -- Memasukkan data ke dalam tabel Modul untuk Matematika
    INSERT INTO Modul (kode_mapel, no_modul, judul, deskripsi)
    VALUES 
      (1, 1, 'Aljabar', 'Pengenalan tentang konsep aljabar dasar.'),
      (1, 2, 'Geometri', 'Pengenalan tentang konsep geometri dasar.'),
      (1, 3, 'Trigonometri', 'Pengenalan tentang konsep trigonometri dasar.');
    
    -- Memasukkan data ke dalam tabel Modul untuk Fisika
    INSERT INTO Modul (kode_mapel, no_modul, judul, deskripsi)
    VALUES 
      (2, 1, 'Mekanika', 'Pengenalan tentang konsep mekanika dasar.'),
      (2, 2, 'Termodinamika', 'Pengenalan tentang konsep termodinamika dasar.'),
      (2, 3, 'Optika', 'Pengenalan tentang konsep optika dasar.');
    
    -- Memasukkan data ke dalam tabel Modul untuk Kimia
    INSERT INTO Modul (kode_mapel, no_modul, judul, deskripsi)
    VALUES 
      (3, 1, 'Struktur Atom', 'Pengenalan tentang struktur atom.'),
      (3, 2, 'Tabel Periodik', 'Pengenalan tentang tabel periodik unsur.'),
      (3, 3, 'Reaksi Kimia', 'Pengenalan tentang reaksi kimia dasar.');
    
    -- Memasukkan data ke dalam tabel Material untuk Matematika - Aljabar
    INSERT INTO Material (kode_mapel, no_modul, judul, video, teks)
    VALUES 
      (1, 1, 'Pengenalan Aljabar', 'video_aljabar_1.mp4', 'Pengenalan Aljabar adalah modul pertama dalam mata pelajaran Matematika yang membekali siswa dengan pemahaman mendasar tentang konsep aljabar. Modul ini membahas pengenalan simbol-simbol dan variabel dalam aljabar serta cara memanipulasi ekspresi matematika. Siswa akan belajar bagaimana menyusun dan menyelesaikan persamaan serta mengevaluasi ekspresi aljabar. Penekanan pada pengenalan konsep-konsep dasar aljabar merupakan fondasi penting bagi pemahaman materi-materi lebih kompleks dalam bidang matematika.'),
      (1, 1, 'Operasi Aljabar', 'video_aljabar_2.mp4', 'Modul Operasi Aljabar memperdalam pemahaman siswa tentang konsep aljabar dengan fokus pada berbagai operasi matematika yang dapat diterapkan pada ekspresi aljabar. Siswa akan mempelajari cara menjumlahkan, mengurangi, mengalikan, dan membagi ekspresi aljabar. Selain itu, modul ini juga membahas sifat-sifat khusus dan aturan-aturan penting yang berlaku dalam melakukan operasi pada ekspresi aljabar. Pemahaman mendalam terhadap operasi aljabar akan mempersiapkan siswa untuk menghadapi materi-materi lebih lanjut dalam kurikulum Matematika.');
    
    -- Memasukkan data ke dalam tabel Material untuk Matematika - Geometri
    INSERT INTO Material (kode_mapel, no_modul, judul, video, teks)
    VALUES 
      (1, 2, 'Sifat-Sifat Bangun Datar', 'video_geometri_1.mp4', 'Modul Sifat-Sifat Bangun Datar membahas karakteristik dan propertis khusus dari berbagai bentuk geometris dalam dua dimensi. Siswa akan belajar mengenali sifat-sifat unik yang membedakan antara berbagai jenis bangun datar, seperti segitiga, persegi, persegi panjang, dan lainnya. Termasuk di dalamnya adalah sifat-sifat seperti jumlah sudut dalam suatu bangun, simetri, dan hubungan antara sisi dan sudut dalam bentuk-bentuk khusus. Pemahaman mendalam terhadap sifat-sifat ini memungkinkan siswa untuk memecahkan masalah geometris yang lebih kompleks dan memberikan dasar yang kuat untuk studi geometri lebih lanjut.'),
      (1, 2, 'Rumus Luas dan Keliling', 'video_geometri_2.mp4', 'Modul Rumus Luas dan Keliling memperkenalkan siswa pada cara mengukur dan menghitung luas serta keliling dari berbagai bangun datar. Siswa akan mempelajari rumus-rumus khusus yang digunakan untuk mengukur area dan keliling persegi, persegi panjang, segitiga, dan lingkaran. Selain itu, modul ini juga memaparkan penerapan rumus-rumus ini dalam situasi dunia nyata, seperti menghitung luas lahan atau material yang diperlukan untuk membangun sesuatu. Pemahaman yang kuat terhadap rumus luas dan keliling memberikan kemampuan praktis dalam menyelesaikan masalah terkait geometri dan memberi dasar penting untuk studi matematika lebih tingkat.');
    
    -- Memasukkan data ke dalam tabel Material untuk Matematika - Trigonometri
    INSERT INTO Material (kode_mapel, no_modul, judul, video, teks)
    VALUES 
      (1, 3, 'Trigonometri Sudut Tertentu', 'video_trigonometri_1.mp4', 'Modul Trigonometri Sudut Tertentu membawa siswa ke dalam dunia trigonometri dengan fokus pada sudut-sudut khusus yang memiliki nilai trigonometri yang dapat dihitung dengan mudah. Siswa akan belajar mengenali sudut-sudut seperti sudut 0 derajat, 30 derajat, 45 derajat, 60 derajat, dan 90 derajat, serta memahami nilai-nilai sine, cosine, dan tangent dari sudut-sudut tersebut. Modul ini juga memberikan wawasan tentang hubungan antara sudut-sudut tersebut dalam siklus sudut 360 derajat. Pemahaman yang kuat terhadap trigonometri sudut tertentu membekali siswa dengan alat yang diperlukan untuk menyelesaikan berbagai masalah geometri dan fisika yang melibatkan sudut-sudut spesifik.'),
      (1, 3, 'Trigonometri Segitiga', 'video_trigonometri_2.mp4', 'Modul Trigonometri Segitiga memperluas pemahaman siswa tentang trigonometri dengan memfokuskan pada hubungan trigonometri dalam segitiga. Siswa akan mempelajari konsep-konsep dasar seperti sine, cosine, dan tangent dalam konteks segitiga siku-siku, dan bagaimana menggunakannya untuk menghitung panjang sisi dan sudut dalam segitiga tersebut. Modul ini juga mencakup hukum-hukum trigonometri, seperti hukum sinus dan hukum kosinus, yang memungkinkan siswa untuk menyelesaikan segitiga non-siku-siku. Pemahaman mendalam terhadap trigonometri segitiga membekali siswa dengan keterampilan yang berguna dalam menyelesaikan berbagai masalah trigonometri dalam konteks geometri dan fisika.');
    
    -- Memasukkan data ke dalam tabel Material untuk Fisika - Mekanika
    INSERT INTO Material (kode_mapel, no_modul, judul, video, teks)
    VALUES 
      (2, 1, 'Gerak Lurus', 'video_mekanika_1.mp4', 'Modul Gerak Lurus membahas konsep dasar tentang pergerakan suatu objek dalam lintasan lurus, yang merupakan salah satu aspek penting dalam fisika. Siswa akan mempelajari definisi jarak, kecepatan, dan percepatan, serta bagaimana mengukur dan menganalisis pergerakan suatu objek dalam ruang dua dimensi. Modul ini juga membahas grafik gerak dan memberikan pemahaman tentang persamaan gerak lurus. Dengan pemahaman tentang gerak lurus, siswa dapat menganalisis berbagai situasi pergerakan dan mengaplikasikan konsep ini dalam konteks kehidupan sehari-hari maupun dalam studi fisika yang lebih lanjut.'),
      (2, 1, 'Hukum Newton', 'video_mekanika_2.mp4', 'Hukum Newton, atau sering juga disebut sebagai Hukum Gerak Newton, adalah salah satu pilar utama dalam fisika mekanika. Modul ini memperkenalkan tiga hukum fundamental yang ditemukan oleh ilmuwan Sir Isaac Newton. Hukum pertama menyatakan bahwa suatu objek akan tetap dalam keadaan diam atau bergerak lurus beraturan kecuali jika ada gaya yang bekerja padanya. Hukum kedua membahas hubungan antara gaya yang bekerja pada suatu objek dengan percepatannya. Hukum ketiga menyatakan bahwa setiap aksi memiliki reaksi yang sama besar dan berlawanan arah. Pemahaman mendalam tentang Hukum Newton memungkinkan siswa untuk menganalisis dan memprediksi pergerakan suatu objek berdasarkan gaya-gaya yang bekerja padanya, membentuk dasar penting dalam studi dinamika dan kinematika dalam fisika.');
    
    -- Memasukkan data ke dalam tabel Material untuk Fisika - Termodinamika
    INSERT INTO Material (kode_mapel, no_modul, judul, video, teks)
    VALUES 
      (2, 2, 'Hukum Termodinamika Pertama', 'video_termodinamika_1.mp4', 'Hukum Termodinamika Pertama, juga dikenal sebagai Hukum Kekekalan Energi, menyatakan bahwa energi dalam suatu sistem terisolasi tidak dapat diciptakan atau dimusnahkan, melainkan hanya dapat berubah bentuk. Ini berarti bahwa jumlah total energi dalam suatu sistem akan selalu tetap konstan, meskipun dapat berubah dari bentuk kinetik ke potensial, panas, atau sebaliknya. Hukum ini memberikan dasar teoritis bagi konsep-konsep penting dalam termodinamika, seperti kerja, panas, dan perubahan energi dalam reaksi fisika atau kimia. Hukum Termodinamika Pertama memiliki implikasi mendalam dalam pemahaman tentang bagaimana energi berinteraksi dan mengalir dalam berbagai proses alam.'),
      (2, 2, 'Hukum Termodinamika Kedua', 'video_termodinamika_2.mp4', 'Hukum Termodinamika Kedua, juga dikenal sebagai Hukum Entropi, menyatakan bahwa entropi alam semesta (atau ketidakteraturan atau keacakan) cenderung meningkat seiring berjalannya waktu dalam sistem terisolasi. Dengan kata lain, dalam proses alami, sistem cenderung menuju keadaan yang lebih acak dan tidak teratur. Meskipun proses individual dapat mengalami perubahan ke arah yang lebih teratur, total entropi dari sistem dan lingkungannya akan selalu meningkat. Hukum Termodinamika Kedua memberikan wawasan penting tentang arah alamiah dari proses fisika dan kimia, dan mengukuhkan gagasan bahwa terdapat batasan dalam kemampuan untuk mengubah energi menjadi bentuk yang sangat terorganisir atau berguna.');
    
    -- Memasukkan data ke dalam tabel Material untuk Fisika - Optika
    INSERT INTO Material (kode_mapel, no_modul, judul, video, teks)
    VALUES 
      (2, 3, 'Cahaya dan Pengertian Optika', 'video_optika_1.mp4', 'Modul Cahaya dan Pengertian Optika membawa siswa ke dalam dunia cahaya dan fenomena optik. Siswa akan memahami sifat-sifat dasar cahaya, seperti propagasi dalam garis lurus, interferensi, dan difraksi. Modul ini juga membahas tentang spektrum cahaya dan bagaimana cahaya dapat dipisahkan menjadi berbagai warna. Selain itu, siswa akan memahami konsep refleksi dan refraksi, yang merupakan dasar dari sebagian besar fenomena optik. Pengertian Optika sendiri merujuk pada cabang ilmu fisika yang mempelajari perilaku cahaya dan interaksi cahaya dengan materi. Pemahaman tentang cahaya dan optika merupakan fondasi penting dalam banyak aplikasi, termasuk dalam teknologi optik, pembuatan lensa,
    ";

    
}