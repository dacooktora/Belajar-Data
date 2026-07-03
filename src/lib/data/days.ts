import { DayData } from '@/lib/types/daily.types';

export const DAY_1: DayData = {
  id: 1,
  month: 1,
  week: 1,
  day: 1,
  title: "Pengenalan Excel & Antarmuka",
  subtitle: "Mengenal Excel dari Nol Sampai Bisa Navigasi",
  schedule: {
    totalHours: 10,
    sessions: [
      {
        sessionNumber: 1,
        startTime: "08:00",
        endTime: "10:00",
        durationMinutes: 120,
        type: "learning",
        title: "Apa Itu Excel & Sejarahnya",
        description: "Mengenal Excel dari definisi, sejarah, hingga instalasi",
        status: "pending",
        objectives: [
          "Memahami definisi dan fungsi Excel",
          "Mengetahui sejarah perkembangan Excel",
          "Bisa menginstall Excel",
          "Membuat file Excel pertama"
        ],
        subtopics: [
          {
            id: "s1-1",
            name: "1.1 Apa Itu Excel?",
            content: `📌 DEFINISI EXCEL:
        Excel adalah program spreadsheet (lembar kerja elektronik) yang dikembangkan oleh Microsoft.
        Fungsinya: mengorganisir, menghitung, menganalisis, dan memvisualisasikan data dalam bentuk tabel.

        📌 KEGUNAAN EXCEL DI DUNIA NYATA:
        1. Mengelola data keuangan (laporan laba rugi, arus kas)
        2. Analisis penjualan (trend produk terlaris)
        3. HR (data karyawan, payroll, absensi)
        4. Marketing (campaign analysis, ROI)
        5. Project Management (timeline, budget tracking)
        6. Inventory management (stok barang)
        7. Data cleaning sebelum analisis lanjutan

        📌 PERBANDINGAN DENGAN TOOLS LAIN:
        ┌─────────────────┬─────────────────┬─────────────────┐
        │     Excel       │  Google Sheets  │  LibreOffice    │
        ├─────────────────┼─────────────────┼─────────────────┤
        │ Berbayar        │ Gratis          │ Gratis          │
        │ Desktop + Cloud │ Cloud only      │ Desktop only    │
        │ Fitur lengkap   │ Fitur terbatas  │ Fitur standar   │
        │ 1M+ baris data  │ 500k baris      │ 100k baris      │
        │ VBA Macro       │ Google Apps     │ Basic Macro     │
        └─────────────────┴─────────────────┴─────────────────┘

        💡 ANALOGI SEDERHANA:
        Bayangkan Excel seperti buku catatan digital dengan ribuan kotak kecil (cell).
        Setiap kotak bisa diisi angka, teks, atau rumus matematika.
        Kotak-kotak ini bisa diatur, dihitung, dan diubah warnanya.
        Kalau kamu pernah main puzzle atau game strategi, Excel seperti papan permainan yang bisa diatur sesukamu.

        ❓ PERTANYAAN UNTUK DIREFLEKSIKAN:
        • Menurutmu, apa perbedaan utama Excel dan Google Sheets?
        • Kenapa banyak perusahaan lebih pilih Excel daripada tools gratis?`,
            summary: "Excel adalah program spreadsheet terpopuler yang digunakan untuk analisis data",
            estimatedTime: 60,
            difficulty: "beginner",
            learningObjectives: [
              "Memahami definisi Excel",
              "Mengetahui kegunaan Excel",
              "Memahami perbedaan Excel dengan tools lain"
            ],
            keywords: ["Excel", "spreadsheet", "data analysis", "Microsoft"],
            prerequisites: [],
            examples: [
              {
                title: "Contoh Penggunaan Excel di Perusahaan",
                description: "Laporan penjualan bulanan, analisis profit, tracking inventory"
              },
              {
                title: "Contoh Penggunaan Excel untuk Data Analyst",
                description: "Data cleaning, pivot table untuk summary, dashboard visual"
              }
            ],
            miniPractice: {
              title: "Cari Tahu 5 Perusahaan yang Pakai Excel",
              instructions: "Cari di internet 5 perusahaan besar yang menggunakan Excel dan jelaskan kegunaannya masing-masing",
              estimatedTime: 15,
              solution: "Apple, Google, Amazon, Microsoft, Facebook semuanya menggunakan Excel untuk berbagai keperluan"
            },
            additionalResources: [
              {
                title: "Apa Itu Spreadsheet?",
                url: "https://en.wikipedia.org/wiki/Spreadsheet",
                type: "article"
              }
            ],
            understandingStatus: "not_started",
            personalNotes: ""
          },
          {
            id: "s1-2",
            name: "1.2 Sejarah & Evolusi Excel",
            content: `📌 TIMELINE PERKEMBANGAN EXCEL:

        1985 → Excel 1.0 (Mac)
          • Excel pertama kali dirilis untuk Macintosh
          • Lebih canggih daripada Lotus 1-2-3 (pesaing saat itu)

        1987 → Excel 2.0 (Windows)
          • Versi pertama untuk Windows
          • Mulai populer karena GUI (Graphical User Interface)

        1993 → Excel 5.0
          • Fitur VBA (Visual Basic for Applications) muncul
          • Bisa membuat macro untuk otomatisasi

        1997 → Excel 97
          • Conditional Formatting pertama kali
          • Data Validation hadir

        2007 → Excel 2007
          • Ribbon menggantikan menu bar (revolusi UI!)
          • Format file .xlsx (lebih ringan, lebih aman)

        2013 → Excel 2013
          • Power Query & Power Pivot hadir
          • Analisis data jadi lebih powerful

        2019 → Excel 365
          • Versi cloud-based (subscription)
          • Update fitur terus menerus
          • AI & Co-pilot mulai masuk

        📌 MENGAPA EXCEL MASIH RELEVAN?
        • 750+ juta pengguna aktif (2024)
        • 80% perusahaan Fortune 500 pakai Excel
        • Skill Excel masuk top 3 most demanded skills
        • Fleksibel untuk berbagai industri

        📌 FAKTA MENARIK:
        • Excel pertama hanya support 16.384 baris (sekarang 1.048.576)
        • File Excel pertama hanya 64kb
        • 1 dari 10 pekerja menggunakan Excel setiap hari

        💡 KESIMPULAN:
        Excel bukan cuma "software jadul". Ini adalah tool yang terus berevolusi dan tetap menjadi standar industri untuk data analysis.`,
            summary: "Excel terus berevolusi dari 1985 sampai sekarang dengan fitur yang semakin canggih",
            estimatedTime: 45,
            difficulty: "beginner",
            learningObjectives: [
              "Memahami sejarah Excel",
              "Mengetahui evolusi fitur-fitur penting Excel"
            ],
            keywords: ["sejarah Excel", "evolusi Excel", "VBA", "Ribbon", "Power Query"],
            prerequisites: [],
            examples: [
              {
                title: "Perubahan Format File",
                description: "Dari .xls (97-2003) menjadi .xlsx (2007-sekarang) yang lebih ringan"
              }
            ],
            miniPractice: {
              title: "Timeline Excel",
              instructions: "Buat timeline singkat evolusi Excel di kertas atau catatan digital",
              estimatedTime: 10,
              solution: "1985 Mac, 1987 Windows, 1993 VBA, 1997 Conditional Formatting, 2007 Ribbon & .xlsx, 2013 Power Query, 2019 Cloud & AI"
            },
            additionalResources: [
              {
                title: "Sejarah Lengkap Microsoft Excel",
                url: "https://en.wikipedia.org/wiki/Microsoft_Excel",
                type: "article"
              }
            ],
            understandingStatus: "not_started",
            personalNotes: ""
          },
          {
            id: "s1-3",
            name: "1.3 Instalasi & Persiapan",
            content: `📌 CARA INSTAL EXCEL:

        OPTION 1: Microsoft 365 (Berbayar)
        • Harga: ~Rp 100.000/bulan
        • Dapat: Excel, Word, PowerPoint, Outlook, 1TB OneDrive
        • Link: https://www.microsoft.com/microsoft-365

        OPTION 2: Excel Web (Gratis)
        • URL: https://office.com
        • Cukup pakai browser (Chrome, Edge, Firefox)
        • Fitur: terbatas dibanding desktop, tapi cukup untuk belajar dasar

        OPTION 3: Trial 1 Bulan (Gratis)
        • Microsoft 365 trial 30 hari
        • Fitur lengkap seperti versi berbayar

        OPTION 4: Alternatif Gratis
        • Google Sheets (https://sheets.google.com)
        • LibreOffice Calc (download gratis)

        📌 MINIMAL SPESIFIKASI (untuk belajar):
        • RAM: 4GB (8GB lebih baik)
        • Storage: 5GB free space
        • OS: Windows 10/11 atau MacOS 10.15+
        • Browser: Chrome, Edge, Firefox terbaru (untuk web version)

        📌 LANGKAH INSTALASI:
        1. Kunjungi https://office.com
        2. Login pake Microsoft account (atau buat dulu)
        3. Klik "Install Office" → pilih "Microsoft 365"
        4. Download installer → jalankan
        5. Tunggu proses install (5-10 menit)
        6. Buka Excel dari Start Menu (Windows) atau Applications (Mac)

        ✅ TUGAS PERTAMA:
        • Install Excel (pilih salah satu option di atas)
        • Screenshot tampilan desktop Excel pertama kamu
        • Simpan screenshotnya untuk portofolio`,
            summary: "Excel bisa didapatkan melalui berbagai cara, termasuk versi web gratis",
            estimatedTime: 60,
            difficulty: "beginner",
            learningObjectives: [
              "Bisa menginstall Excel",
              "Memahami berbagai cara mendapatkan Excel"
            ],
            keywords: ["install Excel", "setup Excel", "Microsoft 365", "Excel Web"],
            prerequisites: [],
            examples: [
              {
                title: "Cara Install Excel di Windows",
                description: "Download installer dari office.com, jalankan, ikuti instruksi"
              }
            ],
            miniPractice: {
              title: "Install Excel",
              instructions: "Install Excel pilih salah satu option di atas (Microsoft 365 trial, Excel Web, atau alternatif). Screenshot tampilan Excel pertama kamu.",
              estimatedTime: 30,
              solution: "Screenshot akan menunjukkan blank workbook terbuka"
            },
            additionalResources: [
              {
                title: "Cara Install Excel di Mac",
                url: "https://support.microsoft.com/install-excel-mac",
                type: "article"
              }
            ],
            understandingStatus: "not_started",
            personalNotes: ""
          }
        ],
        resources: {
          videos: [
            {
              id: "v1",
              title: "Apa Itu Excel? - Pemahaman Dasar",
              url: "https://youtu.be/dQw4w9WgXcQ",
              platform: "youtube",
              duration: "12:30",
              channel: "Belajar Excel Indonesia",
              description: "Penjelasan singkat tentang apa itu Excel dan fungsinya",
              difficulty: "beginner",
              language: "Indonesia",
              isRequired: true,
              watchOrder: 1,
              hasSubtitles: true,
              hasCaptions: true,
              keyMoments: [
                { timestamp: "02:30", description: "Pengertian Excel" },
                { timestamp: "05:45", description: "Kegunaan Excel" },
                { timestamp: "09:15", description: "Perbandingan dengan tools lain" }
              ]
            },
            {
              id: "v2",
              title: "Sejarah Excel 1985-2024",
              url: "https://youtu.be/dQw4w9WgXcQ",
              platform: "youtube",
              duration: "18:45",
              channel: "Excel History Channel",
              description: "Perjalanan Excel dari pertama kali sampai sekarang",
              difficulty: "beginner",
              language: "Indonesia",
              isRequired: true,
              watchOrder: 2,
              hasSubtitles: true,
              hasCaptions: false
            },
            {
              id: "v3",
              title: "Excel vs Google Sheets vs LibreOffice",
              url: "https://youtu.be/dQw4w9WgXcQ",
              platform: "youtube",
              duration: "15:20",
              channel: "Tech Comparison",
              description: "Perbandingan lengkap 3 spreadsheet tools",
              difficulty: "beginner",
              language: "Indonesia",
              isRequired: false,
              watchOrder: 3
            }
          ],
          articles: [
            {
              id: "a1",
              title: "Panduan Memilih Excel Version yang Tepat",
              url: "https://support.microsoft.com/excel-versions",
              platform: "Microsoft Support",
              description: "Artikel resmi Microsoft tentang perbedaan versi Excel",
              difficulty: "beginner",
              language: "Indonesia",
              readTime: 10,
              isRequired: true,
              keyTakeaways: [
                "Microsoft 365 adalah versi terbaru dengan update terus menerus",
                "Excel 2021 adalah versi standalone tanpa subscription"
              ],
              hasImages: true,
              hasCodeExamples: false
            },
            {
              id: "a2",
              title: "Apa Itu Spreadsheet? Definisi dan Manfaat",
              url: "https://en.wikipedia.org/wiki/Spreadsheet",
              platform: "Wikipedia",
              description: "Penjelasan komprehensif tentang spreadsheet",
              difficulty: "beginner",
              language: "Inggris",
              readTime: 15,
              isRequired: false,
              keyTakeaways: [
                "Spreadsheet pertama kali dibuat untuk akuntansi",
                "Visicalc adalah spreadsheet pertama"
              ],
              hasImages: true,
              hasCodeExamples: false
            },
            {
              id: "a3",
              title: "Kenapa Excel Masih Jadi Raja Data Analyst",
              url: "https://www.datacamp.com/blog/why-excel-still-matters",
              platform: "DataCamp",
              description: "Analisis mengapa Excel tetap relevan di era big data",
              difficulty: "beginner",
              language: "Inggris",
              readTime: 12,
              isRequired: false,
              keyTakeaways: [
                "Excel tetap penting karena fleksibilitas dan kemudahan penggunaan",
                "Banyak perusahaan masih menggunakan Excel untuk reporting"
              ],
              hasImages: true,
              hasCodeExamples: false
            }
          ],
          documentations: [
            {
              id: "d1",
              title: "Microsoft Excel Official Documentation",
              url: "https://support.microsoft.com/excel",
              platform: "Microsoft",
              description: "Dokumentasi resmi dari Microsoft untuk Excel",
              version: "2024",
              language: "Inggris",
              isRequired: true,
              focusSections: ["Getting Started", "Basic Tasks"],
              depthLevel: "basic"
            }
          ],
          interactives: [],
          datasets: [],
          templates: []
        },
        practice: {
          id: "p1",
          title: "Instalasi Excel & Buat File Pertama",
          instructions: [
            "Pilih salah satu cara instalasi di atas (Microsoft 365 trial, Excel Web, atau alternatif)",
            "Install Excel sampai selesai",
            "Buka Excel → Pilih Blank Workbook",
            "Lihat tampilan Excel (kenali ribbon, formula bar, dll)",
            "Simpan file dengan nama 'Latihan 1 - Nama Kamu.xlsx'",
            "Ambil screenshot tampilan Excel kamu"
          ],
          objectives: [
            "Bisa menginstall Excel",
            "Bisa membuat file Excel pertama"
          ],
          estimatedTime: 30,
          difficulty: "beginner",
          category: "individual",
          skillsPracticed: ["Instalasi", "Navigasi Dasar"],
          toolsUsed: ["Microsoft Excel"],
          evaluationCriteria: [
            { criterion: "Excel berhasil terinstall", weight: 30, description: "Excel terbuka tanpa error" },
            { criterion: "Blank workbook terbuka", weight: 20, description: "Workbook baru muncul" },
            { criterion: "File berhasil disimpan", weight: 30, description: "File tersimpan di folder dengan nama yang benar" },
            { criterion: "Screenshot diambil", weight: 20, description: "Screenshot jelas menunjukkan tampilan Excel" }
          ],
          tips: [
            "Kalau error saat install, coba restart komputer dulu",
            "Pastikan koneksi internet stabil saat download"
          ],
          commonMistakes: [
            "Lupa menyimpan file",
            "Salah pilih folder penyimpanan",
            "Lupa screenshot"
          ],
          solution: {
            description: "Setelah instalasi berhasil, Excel akan terbuka dengan blank workbook. Simpan file di folder Documents atau Desktop.",
            steps: [
              "Buka Excel",
              "Klik Blank Workbook",
              "Klik File → Save As",
              "Pilih folder Documents",
              "Ketik nama file 'Latihan 1 - Nama Kamu.xlsx'",
              "Klik Save"
            ]
          },
          timeLimit: 60,
          status: "not_started",
          userNotes: "",
          selfAssessment: 0
        },
        notes: "Fokus pada pemahaman dasar Excel, jangan terburu-buru",
        tips: [
          "Baca artikel dokumentasi resmi dari Microsoft untuk referensi tambahan",
          "Jangan khawatir jika belum hafal semua, akan dipraktekkan terus"
        ],
        keywords: ["Excel", "instalasi", "pengenalan", "spreadsheet"],
        estimatedPracticeTime: 30,
        additionalResources: [
          {
            title: "Cara Install Excel di Windows 10",
            url: "https://support.microsoft.com/install-excel-windows",
            type: "article"
          }
        ]
      },
      {
        sessionNumber: 2,
        startTime: "10:00",
        endTime: "10:30",
        durationMinutes: 30,
        type: "break",
        title: "ISTIRAHAT",
        description: "Istirahat sejenak untuk recharge energi",
        status: "pending",
        objectives: [],
        subtopics: [],
        resources: {
          videos: [],
          articles: [],
          documentations: [],
          interactives: [],
          datasets: [],
          templates: []
        },
        practice: null,
        notes: "Minum air, stretching, istirahat mata dari layar",
        tips: ["Minum air putih", "Regangkan tubuh", "Jangan lihat layar dulu"],
        keywords: [],
        estimatedPracticeTime: 0,
        additionalResources: [],
        breakDuration: 30,
        breakActivity: "Minum air putih dan regangkan tubuh selama 5-10 menit"
      },
      {
        sessionNumber: 3,
        startTime: "10:30",
        endTime: "12:30",
        durationMinutes: 120,
        type: "learning",
        title: "Mengenal Antarmuka Excel",
        description: "Tour lengkap antarmuka Excel dan navigasi dasar",
        status: "pending",
        objectives: [
          "Mengenal semua bagian antarmuka Excel",
          "Memahami fungsi setiap bagian",
          "Menguasai navigasi Excel tanpa mouse",
          "Memahami shortcut keyboard untuk navigasi"
        ],
        subtopics: [
          {
            id: "s3-1",
            name: "2.1 Antarmuka Excel (Tour Lengkap)",
            content: `📌 BAGIAN-BAGIAN UTAMA EXCEL:

        ┌─────────────────────────────────────────────────────────────────┐
        │   [Quick Access Toolbar]    [Title Bar]        [Min/Max/Close] │
        ├─────────────────────────────────────────────────────────────────┤
        │   File │ Home │ Insert │ Page Layout │ Formulas │ Data │ View  │ ← Ribbon
        ├─────────────────────────────────────────────────────────────────┤
        │                    [Formula Bar]                               │
        │   [Name Box]  |  [Function Bar]                               │
        ├─────────────────────────────────────────────────────────────────┤
        │                                                                 │
        │   A1   │  B    │  C    │  D    │  E    │  F    │  G    │ H   │ ← Column
        │   ──── ┼───────┼───────┼───────┼───────┼───────┼───────┼──────│
        │   1    │ Cell  │       │       │       │       │       │     │ ← Row
        │   2    │       │       │       │       │       │       │     │
        │   3    │       │       │       │       │       │       │     │
        │   4    │       │       │       │       │       │       │     │
        │                                                                 │
        ├─────────────────────────────────────────────────────────────────┤
        │   [Sheet1]  [Sheet2]  [Sheet3]          [Zoom]  [View]       │ ← Status Bar
        └─────────────────────────────────────────────────────────────────┘

        📌 PENJELASAN SETIAP BAGIAN:

        1. QUICK ACCESS TOOLBAR (QAT)
           • Letak: pojok kiri atas
           • Fungsi: shortcut untuk perintah yang sering dipakai
           • Default: Save, Undo, Redo
           • Bisa dikustomisasi (klik ikon dropdown panah kecil)

        2. TITLE BAR
           • Menampilkan nama file yang sedang dibuka
           • Format: "Book1 - Excel" (book1 = nama default)
           • 3 tombol: Minimize, Maximize/Restore, Close

        3. RIBBON
           • Letak: di atas area kerja
           • Fungsi: tempat semua perintah Excel
           • 9 Tab utama: File, Home, Insert, Draw, Page Layout, Formulas, Data, Review, View
           • Bisa di-collapse (double click tab)

        4. NAME BOX
           • Letak: kiri formula bar
           • Fungsi: menunjukkan alamat cell aktif (contoh: A1)
           • Bisa untuk navigasi cepat (ketik A100 lalu Enter)

        5. FORMULA BAR
           • Letak: kanan name box
           • Fungsi: menampilkan dan mengedit isi cell
           • Bisa menampilkan rumus (tidak hanya hasil)

        6. WORKSHEET AREA
           • Area utama untuk mengisi data
           • Terdiri dari: Row (baris) = angka (1-1.048.576)
           • Column (kolom) = huruf (A-XFD)

        7. STATUS BAR
           • Letak: paling bawah
           • Fungsi: info status Excel (Ready, Edit, Enter)
           • Ada zoom slider, view shortcuts (Normal, Page Layout, Page Break)

        💡 TIPS PRO:
        • Tekan Alt → muncul huruf di ribbon (bisa akses pake keyboard)
        • Klik kanan di ribbon → "Collapse the Ribbon" untuk lebih luas
        • Double click di antara ribbon tabs untuk hide/show
        • Hover di icon → muncul tooltip (penjelasan singkat)

        ✅ LATIHAN MANDIRI:
        • Cari semua 9 tab di ribbon
        • Klik setiap tab, amati apa yang berubah
        • Coba klik kanan di area kosong ribbon
        • Tekan Alt, lihat apa yang terjadi`,
            summary: "Excel memiliki antarmuka yang terdiri dari QAT, Ribbon, Formula Bar, Name Box, Worksheet Area, dan Status Bar",
            estimatedTime: 60,
            difficulty: "beginner",
            learningObjectives: [
              "Mengenal semua bagian antarmuka Excel",
              "Memahami fungsi setiap bagian antarmuka"
            ],
            keywords: ["antarmuka Excel", "ribbon", "formula bar", "name box", "status bar"],
            prerequisites: [],
            examples: [
              {
                title: "Tour Antarmuka Excel",
                description: "Buka Excel dan identifikasi semua bagian yang disebutkan di atas"
              }
            ],
            miniPractice: {
              title: "Identifikasi Antarmuka",
              instructions: "Buka Excel, tunjukkan semua bagian antarmuka ke teman/keluarga atau tulis di catatan",
              estimatedTime: 10,
              solution: "QAT (kiri atas), Ribbon (atas), Formula Bar & Name Box (bawah Ribbon), Worksheet Area (tengah), Status Bar (bawah)"
            },
            additionalResources: [
              {
                title: "Tour Antarmuka Excel Interaktif",
                url: "https://support.microsoft.com/excel-interface-tour",
                type: "interactive"
              }
            ],
            understandingStatus: "not_started",
            personalNotes: ""
          },
          {
            id: "s3-2",
            name: "2.2 Navigasi Dasar",
            content: `📌 CARA NAVIGASI DI EXCEL:

        🔹 MENGGUNAKAN MOUSE:
        • Klik cell → pilih cell tersebut
        • Scroll → naik/turun lembar kerja
        • Klik + drag → pilih range (area) cell
        • Double click → masuk ke mode edit cell
        • Klik kanan → muncul context menu (copy, paste, format)

        🔹 MENGGUNAKAN KEYBOARD (SHORTCUT WAJIB!):
        ┌─────────────────────┬──────────────────────────────┐
        │ SHORTCUT            │ FUNGSI                       │
        ├─────────────────────┼──────────────────────────────┤
        │ → (Panah Kanan)     │ Pindah 1 cell ke kanan      │
        │ ← (Panah Kiri)      │ Pindah 1 cell ke kiri       │
        │ ↑ (Panah Atas)      │ Pindah 1 cell ke atas       │
        │ ↓ (Panah Bawah)     │ Pindah 1 cell ke bawah      │
        │ Ctrl + →            │ Pindah ke akhir data kanan   │
        │ Ctrl + ←            │ Pindah ke akhir data kiri    │
        │ Ctrl + ↑            │ Pindah ke akhir data atas    │
        │ Ctrl + ↓            │ Pindah ke akhir data bawah   │
        │ Home                │ Pindah ke kolom A            │
        │ Ctrl + Home         │ Pindah ke cell A1            │
        │ Ctrl + End          │ Pindah ke cell terakhir      │
        │ Page Up             │ Naik 1 layar                 │
        │ Page Down           │ Turun 1 layar                │
        │ Alt + Page Up       │ Geser 1 layar ke kiri        │
        │ Alt + Page Down     │ Geser 1 layar ke kanan       │
        │ Tab                 │ Pindah 1 cell ke kanan       │
        │ Shift + Tab         │ Pindah 1 cell ke kiri        │
        │ Enter               │ Pindah 1 cell ke bawah       │
        │ Shift + Enter       │ Pindah 1 cell ke atas        │
        └─────────────────────┴──────────────────────────────┘

        🔹 MENGGUNAKAN SCROLL BAR:
        • Scroll bar vertikal → naik/turun
        • Scroll bar horizontal → kiri/kanan
        • Drag scroll bar → cepat pindah posisi
        • Klik di atas/bawah scroll bar → pindah 1 layar

        🔹 MENGGUNAKAN GO TO (F5):
        1. Tekan F5 atau Ctrl + G
        2. Muncul dialog "Go To"
        3. Ketik cell yang dituju (contoh: Z100)
        4. Klik OK → langsung ke cell tersebut

        🔹 MENGGUNAKAN NAME BOX (Navigasi Cepat):
        1. Klik Name Box (kiri formula bar)
        2. Ketik alamat cell (contoh: AA500)
        3. Enter → langsung ke cell itu

        💡 TIPS PRO:
        • Untuk data besar, pakai Ctrl + panah untuk lompat cepat
        • Gunakan Name Box untuk "bookmark" cell penting
        • Latihan navigasi pake keyboard bisa speed up 5x lipat!

        ✅ LATIHAN NAVIGASI:
        1. Buka blank workbook
        2. Pindah ke cell Z100 (pake name box)
        3. Kembali ke A1 (Ctrl + Home)
        4. Pindah ke cell terakhir (Ctrl + End)
        5. Navigasi ke B50 → G200 → A100 → X50
        6. Latihan pake panah keyboard tanpa mouse!`,
            summary: "Navigasi Excel bisa dilakukan dengan mouse atau keyboard shortcut untuk efisiensi",
            estimatedTime: 45,
            difficulty: "beginner",
            learningObjectives: [
              "Menguasai navigasi Excel tanpa mouse",
              "Memahami shortcut keyboard navigasi"
            ],
            keywords: ["navigasi Excel", "shortcut keyboard", "go to", "name box"],
            prerequisites: [],
            examples: [
              {
                title: "Latihan Navigasi Cepat",
                description: "Pindah ke Z100 pake Name Box, kembali ke A1 pake Ctrl+Home"
              }
            ],
            miniPractice: {
              title: "Navigasi 10 Cell Tanpa Mouse",
              instructions: "Buka blank workbook, pindah ke 10 cell berbeda tanpa menggunakan mouse sama sekali. Catat semua shortcut yang kamu pake.",
              estimatedTime: 15,
              solution: "Gunakan kombinasi panah, Ctrl+panah, Home, Ctrl+Home, dan Ctrl+End"
            },
            additionalResources: [
              {
                title: "Daftar Shortcut Keyboard Excel",
                url: "https://support.microsoft.com/keyboard-shortcuts-excel",
                type: "documentation"
              }
            ],
            understandingStatus: "not_started",
            personalNotes: ""
          },
          {
            id: "s3-3",
            name: "2.3 Cell, Row, Column (Pengertian Dasar)",
            content: `📌 KOMPONEN DASAR EXCEL:

        1. CELL
           • Cell = kotak terkecil di Excel
           • Alamat cell = kombinasi Column + Row (contoh: A1, B5, Z100)
           • Cell aktif = cell yang sedang dipilih (border tebal)
           • Cell bisa diisi: angka, teks, tanggal, rumus, atau kosong

        2. ROW (Baris)
           • Row = baris horizontal (kiri ke kanan)
           • Ditandai dengan angka (1, 2, 3, ..., 1.048.576)
           • Total: 1.048.576 row

        3. COLUMN (Kolom)
           • Column = kolom vertikal (atas ke bawah)
           • Ditandai dengan huruf (A, B, C, ..., XFD)
           • Total: 16.384 column

        📌 RANGE (Kumpulan Cell)
           • Range = grup cell yang terdiri dari minimal 2 cell
           • Format: CellAwal:CellAkhir (contoh: A1:C10)
           • Range bisa digunakan untuk: format, rumus, chart

        📌 STRUKTUR ALAMAT CELL:
           ┌─────┬─────┬─────┐
           │     │  A  │  B  │  ← Column
           ├─────┼─────┼─────┤
           │  1  │ A1  │ B1  │
           ├─────┼─────┼─────┤
           │  2  │ A2  │ B2  │
           └─────┴─────┴─────┘
              ↑
             Row

        📌 CONTOH ALAMAT CELL:
        • A1 = Kolom A, Baris 1
        • B5 = Kolom B, Baris 5
        • Z100 = Kolom Z, Baris 100
        • AA50 = Kolom AA, Baris 50
        • XFD1048576 = Kolom XFD, Baris 1.048.576 (cell terakhir)

        📌 ISTILAH PENTING:
        • Cell Aktif = cell yang sedang dipilih (ada border hijau/tebal)
        • Cell Range = kumpulan cell (contoh: A1:A10)
        • Adjacent Cells = cell yang bersebelahan
        • Non-Adjacent Cells = cell yang tidak bersebelahan (pilih pake Ctrl)

        💡 TIPS PRO:
        • Cell aktif selalu terlihat di Name Box
        • Row/Column header berubah jadi warna gelap di row/column aktif
        • Double click border cell = lompat ke ujung data (alternatif shortcut)
        • Shift + Space = pilih seluruh row aktif
        • Ctrl + Space = pilih seluruh column aktif

        ✅ LATIHAN MANDIRI:
        1. Buka workbook baru
        2. Klik cell C5 (perhatikan perubahan di name box)
        3. Pilih range A1:D10 (drag dari A1 ke D10)
        4. Pilih 2 range non-adjacent: A1:A5 dan C1:C5 (pake Ctrl)
        5. Cari alamat cell paling akhir di Excel (pakai Ctrl + End)`,
            summary: "Cell adalah unit terkecil Excel dengan alamat unik dari kombinasi Column dan Row",
            estimatedTime: 45,
            difficulty: "beginner",
            learningObjectives: [
              "Memahami pengertian cell, row, column",
              "Memahami alamat cell dan range"
            ],
            keywords: ["cell", "row", "column", "range", "alamat cell"],
            prerequisites: [],
            examples: [
              {
                title: "Alamat Cell dan Range",
                description: "A1 = Kolom A Baris 1, B5 = Kolom B Baris 5, A1:C10 = range dari A1 sampai C10"
              }
            ],
            miniPractice: {
              title: "Cari Alamat Cell",
              instructions: "Cari alamat cell A1, B5, Z100, AA50, dan XFD1048576. Tulis hasilnya di catatan.",
              estimatedTime: 10,
              solution: "A1, B5, Z100, AA50, XFD1048576"
            },
            additionalResources: [],
            understandingStatus: "not_started",
            personalNotes: ""
          }
        ],
        resources: {
          videos: [
            {
              id: "v4",
              title: "Tour Lengkap Antarmuka Excel 2024",
              url: "https://youtu.be/dQw4w9WgXcQ",
              platform: "youtube",
              duration: "28:15",
              channel: "Excel Tutorial Center",
              description: "Penjelasan semua bagian Excel dengan visual yang jelas",
              difficulty: "beginner",
              language: "Indonesia",
              isRequired: true,
              watchOrder: 1,
              hasSubtitles: true,
              hasCaptions: true
            },
            {
              id: "v5",
              title: "Shortcut Keyboard Excel yang Wajib Diketahui",
              url: "https://youtu.be/dQw4w9WgXcQ",
              platform: "youtube",
              duration: "22:30",
              channel: "Excel Shortcut Pro",
              description: "Kumpulan shortcut untuk navigasi cepat di Excel",
              difficulty: "beginner",
              language: "Indonesia",
              isRequired: true,
              watchOrder: 2,
              hasSubtitles: true,
              hasCaptions: false
            }
          ],
          articles: [
            {
              id: "a4",
              title: "Panduan Lengkap Antarmuka Excel",
              url: "https://www.excel-easy.com/basics/",
              platform: "Excel Easy",
              description: "Tutorial interaktif tentang bagian-bagian Excel",
              difficulty: "beginner",
              language: "Inggris",
              readTime: 15,
              isRequired: true,
              keyTakeaways: [
                "Setiap bagian antarmuka memiliki fungsi spesifik",
                "Ribbon adalah pusat semua perintah"
              ],
              hasImages: true,
              hasCodeExamples: false
            },
            {
              id: "a5",
              title: "Cara Navigasi di Excel yang Efektif",
              url: "https://support.microsoft.com/navigation-tips",
              platform: "Microsoft Support",
              description: "Tips navigasi dari Microsoft untuk pemula",
              difficulty: "beginner",
              language: "Indonesia",
              readTime: 10,
              isRequired: true,
              keyTakeaways: [
                "Shortcut keyboard lebih cepat dari mouse",
                "Ctrl+panah untuk lompat ke ujung data"
              ],
              hasImages: true,
              hasCodeExamples: false
            }
          ],
          documentations: [
            {
              id: "d2",
              title: "Excel Keyboard Shortcuts",
              url: "https://support.microsoft.com/keyboard-shortcuts",
              platform: "Microsoft",
              description: "Daftar lengkap shortcut keyboard Excel",
              version: "2024",
              language: "Inggris",
              isRequired: true,
              focusSections: ["Navigation", "Selection"],
              depthLevel: "basic"
            }
          ],
          interactives: [],
          datasets: [],
          templates: []
        },
        practice: {
          id: "p2",
          title: "Latihan Navigasi & Mengenal Antarmuka",
          instructions: [
            "Buka Excel → Blank Workbook",
            "Identifikasi semua bagian antarmuka (QAT, Ribbon, Formula Bar, Name Box, Status Bar)",
            "Praktekkan navigasi ke 20 cell berbeda tanpa menggunakan mouse sama sekali",
            "Praktekkan selection: pilih range A1:E10, pilih seluruh row 5 (Shift+Space), pilih seluruh column C (Ctrl+Space), pilih non-adjacent cells (Ctrl+click)",
            "Catat semua shortcut yang kamu gunakan di catatan"
          ],
          objectives: [
            "Bisa navigasi Excel tanpa mouse",
            "Mengenal semua bagian antarmuka"
          ],
          estimatedTime: 45,
          difficulty: "beginner",
          category: "individual",
          skillsPracticed: ["Navigasi", "Selection"],
          toolsUsed: ["Microsoft Excel"],
          evaluationCriteria: [
            { criterion: "Bisa pindah ke 20 cell tanpa mouse", weight: 25, description: "Menggunakan shortcut keyboard" },
            { criterion: "Tahu nama semua bagian antarmuka", weight: 25, description: "Bisa menyebutkan semua bagian" },
            { criterion: "Bisa pilih range dengan cepat", weight: 25, description: "Menggunakan drag atau shortcut" },
            { criterion: "Bisa pilih non-adjacent cells", weight: 25, description: "Menggunakan Ctrl+click" }
          ],
          tips: [
            "Tulis daftar shortcut di sticky note di samping layar",
            "Praktek berulang sampai hafal",
            "Jangan menyerah jika pertama kali sulit"
          ],
          commonMistakes: [
            "Terlalu banyak menggunakan mouse",
            "Lupa shortcut yang baru dipelajari",
            "Tidak menggunakan Ctrl+panah untuk lompat cepat"
          ],
          solution: {
            description: "Gunakan kombinasi shortcut keyboard untuk navigasi cepat",
            steps: [
              "Gunakan panah untuk pindah satu cell",
              "Gunakan Ctrl+panah untuk lompat ke ujung data",
              "Gunakan Ctrl+Home untuk ke A1",
              "Gunakan Ctrl+End untuk ke cell terakhir",
              "Gunakan Home untuk ke kolom A"
            ]
          },
          timeLimit: 60,
          status: "not_started",
          userNotes: "",
          selfAssessment: 0
        },
        notes: "",
        tips: [
          "Hafalkan shortcut navigasi dan praktekkan terus",
          "Coba navigasi tanpa mouse selama 30 menit"
        ],
        keywords: ["antarmuka", "navigasi", "shortcut", "ribbon"],
        estimatedPracticeTime: 45,
        additionalResources: []
      },
      {
        sessionNumber: 4,
        startTime: "12:30",
        endTime: "13:30",
        durationMinutes: 60,
        type: "break",
        title: "ISTIRAHAT (Makan Siang)",
        description: "Waktu makan siang untuk recharge energi",
        status: "pending",
        objectives: [],
        subtopics: [],
        resources: {
          videos: [],
          articles: [],
          documentations: [],
          interactives: [],
          datasets: [],
          templates: []
        },
        practice: null,
        notes: "Makan siang, istirahat, recharge energi untuk sesi sore",
        tips: ["Makan makanan bergizi", "Jangan langsung kembali ke laptop setelah makan", "Beri jeda untuk pencernaan"],
        keywords: [],
        estimatedPracticeTime: 0,
        additionalResources: [],
        breakDuration: 60,
        breakActivity: "Makan siang dan istirahat dari layar"
      },
      {
        sessionNumber: 5,
        startTime: "13:30",
        endTime: "15:30",
        durationMinutes: 120,
        type: "learning",
        title: "Worksheet & Workbook",
        description: "Memahami perbedaan workbook dan worksheet serta operasi-operasinya",
        status: "pending",
        objectives: [
          "Memahami perbedaan workbook dan worksheet",
          "Bisa membuat dan menyimpan workbook",
          "Bisa mengelola worksheet (tambah, rename, hapus, pindah, warna)"
        ],
        subtopics: [
          {
            id: "s5-1",
            name: "3.1 Memahami Workbook vs Worksheet",
            content: `📌 PERBEDAAN WORKBOOK DAN WORKSHEET:

        WORKBOOK
        • = File Excel (contoh: "Laporan.xlsx")
        • Bisa berisi banyak worksheet
        • Ikon: 📒 (buku tebal)
        • Ekstensi: .xlsx, .xls, .xlsm

        WORKSHEET
        • = Lembar kerja di dalam workbook
        • = Tab di bagian bawah Excel
        • Ikon: 📄 (lembar kertas)
        • Default: 3 sheet (Sheet1, Sheet2, Sheet3)

        📌 VISUALISASI:
        ┌─────────────────────────────────────────────┐
        │                WORKBOOK                     │
        │  ┌──────────────────────────────────────┐   │
        │  │           WORKSHEET 1                │   │
        │  │  (Sheet1) - Data Penjualan          │   │
        │  ├──────────────────────────────────────┤   │
        │  │           WORKSHEET 2                │   │
        │  │  (Sheet2) - Analisis Marketing       │   │
        │  ├──────────────────────────────────────┤   │
        │  │           WORKSHEET 3                │   │
        │  │  (Sheet3) - Dashboard                │   │
        │  └──────────────────────────────────────┘   │
        │  [Sheet1] [Sheet2] [Sheet3] [+]           │ ← Tab
        └─────────────────────────────────────────────┘

        📌 FUNGSI MULTI-WORKSHEET:
        • Pisahkan data sesuai kategori (produk, pelanggan, transaksi)
        • Buat summary dari banyak sheet (pakai formula)
        • Dashboard di sheet terpisah dari data
        • Satu workbook bisa jadi "database mini"

        📌 CONTOH PENGGUNAAN:
        • Workbook: "Laporan_Keuangan_2024.xlsx"
          - Sheet1: Data Penjualan (raw data)
          - Sheet2: Rekap per Bulan (summary)
          - Sheet3: Dashboard Visual (chart)
          - Sheet4: Proyeksi 2025 (forecast)

        📌 KAPASITAS:
        • 1 workbook = 1.048.576 row × 16.384 column
        • 1 workbook = unlimited worksheets (tergantung memory)
        • File size max = 2GB (sangat besar!)
        • Jangan pakai lebih dari 100 sheet untuk performa optimal

        💡 TIPS PRO:
        • Beri nama sheet yang deskriptif (bukan Sheet1, Sheet2)
        • Gunakan warna tab untuk kategori (merah = urgent, hijau = selesai)
        • Hidden sheet untuk data rahasia
        • Protect sheet untuk mencegah edit`,
            summary: "Workbook adalah file Excel, Worksheet adalah lembar di dalamnya",
            estimatedTime: 60,
            difficulty: "beginner",
            learningObjectives: [
              "Memahami perbedaan workbook dan worksheet",
              "Memahami fungsi multi-worksheet"
            ],
            keywords: ["workbook", "worksheet", "sheet", "file Excel"],
            prerequisites: [],
            examples: [
              {
                title: "Workbook Laporan Keuangan 2024",
                description: "Sheet1: Data Penjualan (raw data), Sheet2: Rekap per Bulan (summary), Sheet3: Dashboard Visual (chart), Sheet4: Proyeksi 2025 (forecast)"
              }
            ],
            miniPractice: {
              title: "Buat Workbook Multi-Sheet",
              instructions: "Buat workbook dengan 3 sheet: Data, Analisis, Dashboard",
              estimatedTime: 15,
              solution: "Buat workbook baru, rename sheet menjadi Data, Analisis, Dashboard"
            },
            additionalResources: [],
            understandingStatus: "not_started",
            personalNotes: ""
          },
          {
            id: "s5-2",
            name: "3.2 Operasi Workbook & Worksheet",
            content: `📌 CARA MEMBUAT WORKBOOK BARU:

        1. Buka Excel
        2. Pilih "Blank Workbook"
           ATAU
        3. Klik File → New → Blank Workbook
           ATAU
        4. Shortcut: Ctrl + N

        📌 CARA MENYIMPAN WORKBOOK:

        SHORTCUT: Ctrl + S (Sering-sering! Gak mau hilang data!)

        LANGKAH-LANGKAH:
        1. Klik File → Save (atau Ctrl+S)
        2. Pilih lokasi folder (Desktop / Documents / Folder Belajar)
        3. Beri nama file (contoh: "Belajar_Excel_Hari1")
        4. Format: .xlsx (default)
        5. Klik Save

        📌 FORMAT FILE EXCEL:
        ┌────────────┬──────────────────────────────────┐
        │ FORMAT     │ KEGUNAAN                        │
        ├────────────┼──────────────────────────────────┤
        │ .xlsx      │ Standar (tanpa macro)           │
        │ .xlsm      │ Punya macro/VBA                 │
        │ .xls       │ Excel 97-2003 (jadul)           │
        │ .csv       │ Text-only (buka di notepad)     │
        │ .pdf       │ Export untuk dibaca orang lain  │
        └────────────┴──────────────────────────────────┘

        📌 CARA MENAMBAH WORKSHEET:

        5 CARA (pilih yang paling cepat):
        1. Klik ikon "+" di sebelah tab sheet terakhir
        2. Klik kanan tab → Insert → Worksheet
        3. Shortcut: Shift + F11
        4. Home → Insert → Insert Sheet
        5. Klik kanan di tab → Duplicate (copy sheet yang ada)

        📌 OPERASI WORKSHEET LAINNYA:

        RENAME SHEET:
        • Double click nama tab
        • Klik kanan → Rename
        • Ketik nama baru → Enter

        MOVE/COPY SHEET:
        • Drag tab ke posisi baru
        • Klik kanan → Move or Copy

        DELETE SHEET:
        • Klik kanan tab → Delete
        • Hati-hati! Data hilang permanen (kecuali undo)

        HIDE SHEET:
        • Klik kanan → Hide
        • Untuk menyembunyikan data sementara

        COLOR SHEET TAB:
        • Klik kanan → Tab Color
        • Pilih warna

        💡 TIPS PRO:
        • Buat habit: Ctrl+S setiap 5 menit!
        • Simpan file di cloud (OneDrive, Google Drive) untuk backup
        • Gunakan "Save As" kalau mau bikin versi baru

        ✅ LATIHAN MANDIRI:
        1. Buat workbook baru "Latihan_Worksheet.xlsx"
        2. Buat 5 sheet dengan nama:
           - Data_Produk
           - Data_Pelanggan
           - Data_Transaksi
           - Rekap_Penjualan
           - Dashboard
        3. Ubah warna tab:
           - Data_Produk → Biru
           - Data_Pelanggan → Hijau
           - Data_Transaksi → Kuning
           - Rekap_Penjualan → Oranye
           - Dashboard → Merah
        4. Simpan file di folder belajar kamu`,
            summary: "Workbook dan worksheet bisa dikelola dengan berbagai operasi",
            estimatedTime: 45,
            difficulty: "beginner",
            learningObjectives: [
              "Bisa membuat dan menyimpan workbook",
              "Bisa mengelola worksheet"
            ],
            keywords: ["workbook", "worksheet", "save", "rename", "delete", "color"],
            prerequisites: [],
            examples: [
              {
                title: "Buat Workbook dengan 10 Sheet",
                description: "Buat sheet Jan-Des, Summary, Dashboard dengan warna berbeda"
              }
            ],
            miniPractice: {
              title: "Kelola 10 Sheet",
              instructions: "Buat 10 sheet, rename sesuai bulan, beri warna, pindah posisi, hapus 2 sheet",
              estimatedTime: 20,
              solution: "Gunakan Ctrl+Page Up/Down untuk navigasi cepat antar sheet"
            },
            additionalResources: [],
            understandingStatus: "not_started",
            personalNotes: ""
          },
          {
            id: "s5-3",
            name: "3.3 AutoSave & Version History",
            content: `📌 AUTOSAVE (Fitur Penyelamat):

        APA ITU AUTOSAVE?
        • Fitur yang menyimpan file secara otomatis
        • Default: aktif untuk file yang disimpan di OneDrive/SharePoint
        • Simpan setiap detik (gak perlu Ctrl+S terus!)
        • Ikon: toggle di Quick Access Toolbar

        CARA AKTIFKAN AUTOSAVE:
        1. Simpan file ke OneDrive (harus!)
        2. Di QAT, klik toggle AutoSave → ON
        3. File otomatis tersimpan setiap perubahan

        📌 VERSION HISTORY (Lihat Riwayat):

        APA ITU?
        • Melihat versi file sebelumnya
        • Bisa restore ke versi lama
        • Seperti "time machine" di Excel

        CARAK AKSES:
        1. File → Info
        2. Klik "Version History"
        3. Pilih versi yang mau dilihat
        4. Klik "Restore" untuk kembali ke versi itu

        📌 RECOVER UNSAVED WORKBOOKS:

        Kalau Excel crash / mati mendadak:
        1. Buka Excel lagi
        2. File → Open → Recent
        3. Klik "Recover Unsaved Workbooks" (paling bawah)
        4. Pilih file yang mau direcover

        💡 TIPS PRO:
        • Simpan file di OneDrive/Google Drive = auto backup
        • Jangan matikan AutoSave!
        • Version History bisa lihat siapa yang edit kapan
        • Gunakan "Restore" dengan hati-hati (akan replace versi terbaru)`,
            summary: "AutoSave menyimpan otomatis, Version History untuk mengembalikan versi sebelumnya",
            estimatedTime: 30,
            difficulty: "beginner",
            learningObjectives: [
              "Memahami AutoSave dan cara mengaktifkannya",
              "Bisa mengembalikan versi file sebelumnya dengan Version History"
            ],
            keywords: ["autosave", "version history", "recover", "OneDrive"],
            prerequisites: [],
            examples: [],
            miniPractice: {
              title: "Coba AutoSave & Version History",
              instructions: "Simpan file ke OneDrive, aktifkan AutoSave, buat 3 versi berbeda, lihat Version History",
              estimatedTime: 15,
              solution: "File → Info → Version History → lihat semua versi"
            },
            additionalResources: [],
            understandingStatus: "not_started",
            personalNotes: ""
          }
        ],
        resources: {
          videos: [
            {
              id: "v6",
              title: "Cara Membuat dan Menyimpan Workbook",
              url: "https://youtu.be/dQw4w9WgXcQ",
              platform: "youtube",
              duration: "15:40",
              channel: "Excel Dasar Indonesia",
              description: "Tutorial membuat, menyimpan, dan mengelola workbook",
              difficulty: "beginner",
              language: "Indonesia",
              isRequired: true,
              watchOrder: 1,
              hasSubtitles: true,
              hasCaptions: true
            },
            {
              id: "v7",
              title: "Tips Mengelola Banyak Worksheet",
              url: "https://youtu.be/dQw4w9WgXcQ",
              platform: "youtube",
              duration: "12:20",
              channel: "Excel Management",
              description: "Cara efisien mengelola banyak worksheet",
              difficulty: "beginner",
              language: "Indonesia",
              isRequired: true,
              watchOrder: 2,
              hasSubtitles: true,
              hasCaptions: false
            }
          ],
          articles: [
            {
              id: "a6",
              title: "Cara Mengelola Workbook dan Worksheet",
              url: "https://www.excelcampus.com/workbook-management",
              platform: "Excel Campus",
              description: "Panduan lengkap pengelolaan file Excel",
              difficulty: "beginner",
              language: "Inggris",
              readTime: 12,
              isRequired: true,
              keyTakeaways: [
                "Beri nama sheet yang deskriptif",
                "Gunakan warna tab untuk kategorisasi",
                "Hidden sheet untuk data rahasia"
              ],
              hasImages: true,
              hasCodeExamples: false
            }
          ],
          documentations: [
            {
              id: "d3",
              title: "Workbook vs Worksheet - Official Docs",
              url: "https://support.microsoft.com/workbook-worksheet",
              platform: "Microsoft",
              description: "Penjelasan resmi dari Microsoft tentang workbook dan worksheet",
              version: "2024",
              language: "Inggris",
              isRequired: true,
              focusSections: ["Workbook Basics", "Worksheet Basics"],
              depthLevel: "basic"
            }
          ],
          interactives: [],
          datasets: [],
          templates: []
        },
        practice: {
          id: "p3",
          title: "Buat Workbook dengan 10 Sheet",
          instructions: [
            "Buat workbook baru dengan nama 'Manajemen_Data.xlsx'",
            "Buat 10 worksheet: Januari, Februari, Maret, April, Mei, Summary, Dashboard, Data, Analisis, Report",
            "Ubah warna tab: Q1 (Jan-Mar) biru, Q2 (Apr-Jun) hijau, Q3 (Jul-Sep) kuning, Q4 (Okt) oranye",
            "Tambahkan 2 sheet baru: Testing dan Backup",
            "Hapus 1 sheet yang tidak diperlukan",
            "Simpan file di folder 'Excel_Belajar'"
          ],
          objectives: [
            "Bisa membuat banyak sheet",
            "Bisa mengelola sheet (rename, warna, pindah, hapus)"
          ],
          estimatedTime: 40,
          difficulty: "beginner",
          category: "individual",
          skillsPracticed: ["Workbook Management", "Worksheet Management"],
          toolsUsed: ["Microsoft Excel"],
          evaluationCriteria: [
            { criterion: "10 sheet dengan nama yang benar", weight: 30, description: "Semua sheet ter-rename sesuai ketentuan" },
            { criterion: "Warna tab sesuai kategori", weight: 30, description: "Warna sesuai ketentuan Q1, Q2, Q3, Q4" },
            { criterion: "File tersimpan dengan benar", weight: 20, description: "File di folder yang benar" },
            { criterion: "Bisa navigasi antar sheet cepat", weight: 20, description: "Menggunakan Ctrl+Page Up/Down" }
          ],
          tips: [
            "Gunakan Ctrl+Page Up untuk pindah ke sheet kiri",
            "Gunakan Ctrl+Page Down untuk pindah ke sheet kanan",
            "Klik kanan tab untuk operasi cepat"
          ],
          commonMistakes: [
            "Lupa rename sheet",
            "Lupa simpan file setelah selesai",
            "Salah warna tab"
          ],
          solution: {
            description: "Setelah selesai, workbook siap digunakan untuk berbagai keperluan",
            steps: [
              "Buat workbook baru",
              "Rename semua sheet",
              "Berikan warna tab sesuai kategori",
              "Simpan file"
            ]
          },
          timeLimit: 60,
          status: "not_started",
          userNotes: "",
          selfAssessment: 0
        },
        notes: "",
        tips: [
          "Biasakan Ctrl+S setiap 5 menit",
          "Simpan di OneDrive untuk backup otomatis",
          "Beri nama sheet yang mudah diingat"
        ],
        keywords: ["workbook", "worksheet", "management", "save"],
        estimatedPracticeTime: 40,
        additionalResources: []
      },
      {
        sessionNumber: 6,
        startTime: "15:30",
        endTime: "16:00",
        durationMinutes: 30,
        type: "break",
        title: "ISTIRAHAT",
        description: "Istirahat sore untuk recharge",
        status: "pending",
        objectives: [],
        subtopics: [],
        resources: {
          videos: [],
          articles: [],
          documentations: [],
          interactives: [],
          datasets: [],
          templates: []
        },
        practice: null,
        notes: "Minum air, stretching, istirahat mata",
        tips: ["Minum air putih", "Regangkan tubuh", "Jalan sebentar"],
        keywords: [],
        estimatedPracticeTime: 0,
        additionalResources: [],
        breakDuration: 30,
        breakActivity: "Minum air putih dan regangkan tubuh"
      },
      {
        sessionNumber: 7,
        startTime: "16:00",
        endTime: "18:00",
        durationMinutes: 120,
        type: "learning",
        title: "Format Cell & Data Entry",
        description: "Format cell, data entry, data validation, dan conditional formatting",
        status: "pending",
        objectives: [
          "Memahami jenis format cell dan cara mengubahnya",
          "Bisa input data dengan cepat dan benar",
          "Bisa membuat dropdown dengan Data Validation",
          "Bisa menerapkan Conditional Formatting"
        ],
        subtopics: [
          {
            id: "s7-1",
            name: "4.1 Format Cell (Dasar)",
            content: `📌 APA ITU FORMAT CELL?

        Format cell = cara Excel menampilkan data di dalam cell.
        • Angka bisa tampil sebagai: 1000, Rp1.000, 1.000,00
        • Tanggal bisa tampil sebagai: 01/01/2024, 1 Jan 2024
        • Penting untuk: laporan keuangan, data time series, presentasi

        📌 JENIS FORMAT CELL:

        1. GENERAL (Default)
           • Excel memilih format otomatis
           • Angka: 1000
           • Text: "Halo"

        2. NUMBER
           • Untuk angka dengan desimal
           • Bisa atur: jumlah desimal, ribuan separator
           • Contoh: 1.000,00 atau 1000.00

        3. CURRENCY
           • Untuk mata uang
           • Ada simbol: Rp, $, €, £
           • Contoh: Rp1.000.000,00

        4. ACCOUNTING
           • Mirip currency tapi rata kiri
           • Biasanya untuk laporan keuangan

        5. DATE
           • Untuk tanggal
           • Banyak format: 01/01/2024, 1 Jan 2024, Monday, January 1
           • Bisa dioperasikan (selisih tanggal)

        6. TIME
           • Untuk jam
           • Format: 08:00, 08:00 AM, 20:00

        7. PERCENTAGE
           • Untuk persentase
           • Contoh: 50% (Excel otomatis kalikan 100)

        8. TEXT
           • Semua dianggap teks (termasuk angka)
           • Tidak bisa dihitung
           • Contoh: "001" tetap "001" (tidak jadi 1)

        9. SCIENTIFIC
           • Untuk angka sangat besar/kecil
           • Contoh: 1.23E+10

        📌 CARA UBAH FORMAT CELL:

        5 CARA:
        1. Home → Number group → Pilih dari dropdown
        2. Klik kanan → Format Cells → Pilih kategori
        3. Shortcut: Ctrl + 1 (buka dialog Format Cells)
        4. Klik panah kecil di Number group
        5. Pake format shortcut: 
           - Ctrl+Shift+1 = Number
           - Ctrl+Shift+2 = Time
           - Ctrl+Shift+3 = Date
           - Ctrl+Shift+4 = Currency
           - Ctrl+Shift+5 = Percentage

        📌 CUSTOM NUMBER FORMAT (Keren ini!):
        • Bisa bikin format sendiri
        • Contoh: "Rp"#,##0.00 → Rp1,000.00
        • Kode: # = digit opsional, 0 = digit wajib
        • Gunakan untuk membuat format khusus perusahaan

        💡 TIPS PRO:
        • Format Currency vs Accounting = beda perataan
        • Custom format bisa menyembunyikan nilai nol (pakai ;;;)
        • Tanggal di Excel sebenarnya adalah angka (1 = 1 Jan 1900)
        • Jangan gunakan Text format untuk data angka yang mau dihitung!`,
            summary: "Excel memiliki berbagai format cell untuk menampilkan data sesuai kebutuhan",
            estimatedTime: 60,
            difficulty: "beginner",
            learningObjectives: [
              "Memahami jenis format cell",
              "Bisa mengubah format cell"
            ],
            keywords: ["format cell", "number format", "currency", "date", "custom format"],
            prerequisites: [],
            examples: [
              {
                title: "Format Gaji Karyawan",
                description: "Rp1.000.000,00 menggunakan Currency format dengan simbol Rp"
              },
              {
                title: "Format Tanggal Lahir",
                description: "01-Jan-2024 menggunakan Date format"
              }
            ],
            miniPractice: {
              title: "Coba Semua Format",
              instructions: "Input angka 1000 di cell, coba semua format yang tersedia (General, Number, Currency, Date, Time, Percentage, Text, Scientific)",
              estimatedTime: 15,
              solution: "Lihat perubahan tampilan di setiap format"
            },
            additionalResources: [],
            understandingStatus: "not_started",
            personalNotes: ""
          },
          {
            id: "s7-2",
            name: "4.2 Data Entry (Cara Input Data)",
            content: `📌 CARA INPUT DATA DI EXCEL:

        1. Klik cell → Ketik data → Enter
        2. Klik cell → Ketik data → Tab (pindah ke kanan)
        3. Klik cell → Ketik data → Shift+Tab (pindah ke kiri)
        4. Klik cell → Ketik data → Panah (sesuai arah)

        📌 JENIS DATA YANG BISA DIINPUT:

        1. TEXT (String)
           • Huruf, kata, kalimat
           • Contoh: "Nama Produk", "Jakarta"
           • Otomatis rata kiri

        2. NUMBER (Angka)
           • Angka bisa dihitung
           • Contoh: 1000, 3.14, -50
           • Otomatis rata kanan

        3. DATE (Tanggal)
           • Format tanggal
           • Contoh: 01/01/2024, 1-Jan-2024
           • Bisa dioperasikan

        4. TIME (Jam)
           • Format waktu
           • Contoh: 08:00, 14:30
           • Bisa dioperasikan

        5. FORMULA (Rumus)
           • Dimulai dengan =
           • Contoh: =A1+B1
           • Hasilnya otomatis update

        6. BOOLEAN (True/False)
           • TRUE atau FALSE
           • Hasil dari formula logika

        📌 CARA CEPAT INPUT DATA (AUTO-FILL):

        Drag Handle (Kotak kecil di pojok kanan bawah cell):
        1. Ketik "Jan" → drag → Feb, Mar, Apr, ...
        2. Ketik 1 → drag → 2, 3, 4, 5, ...
        3. Ketik 1, 3 → drag → 5, 7, 9, ...
        4. Ketik formula → drag → formula otomatis menyesuaikan

        📌 DATA VALIDATION (Cegah Input Salah):

        Fungsi: membatasi apa yang bisa diinput di cell.

        Contoh: Buat dropdown list
        1. Pilih cell → Data → Data Validation
        2. Allow: List
        3. Source: ketik "Produk A,Produk B,Produk C"
        4. OK → cell jadi dropdown

        📌 TIPS INPUT DATA:
        • Gunakan Tab, bukan Enter, untuk input data berurutan
        • Double click handle = auto fill sampai akhir data
        • Ctrl + D = copy data dari cell di atas
        • Ctrl + R = copy data dari cell di kiri`,
            summary: "Data entry di Excel bisa dilakukan dengan cepat menggunakan auto-fill dan validasi",
            estimatedTime: 45,
            difficulty: "beginner",
            learningObjectives: [
              "Bisa input data dengan cepat",
              "Bisa membuat dropdown validation"
            ],
            keywords: ["data entry", "auto-fill", "data validation", "dropdown"],
            prerequisites: [],
            examples: [
              {
                title: "Dropdown Departemen",
                description: "Buat dropdown di cell dengan pilihan HRD, IT, Marketing, Finance"
              }
            ],
            miniPractice: {
              title: "Buat Data Entry Form",
              instructions: "Buat form dengan dropdown departemen, auto-fill untuk nomor urut, dan validasi tanggal",
              estimatedTime: 20,
              solution: "Gunakan Data Validation untuk dropdown, drag handle untuk auto-fill"
            },
            additionalResources: [],
            understandingStatus: "not_started",
            personalNotes: ""
          },
          {
            id: "s7-3",
            name: "4.3 Conditional Formatting (Dasar)",
            content: `📌 APA ITU CONDITIONAL FORMATTING?

        Fitur yang mengubah format cell berdasarkan kondisi/aturan.

        CONTOH:
        • Cell dengan nilai > 100 → Warna Hijau
        • Cell dengan nilai < 50 → Warna Merah
        • Cell yang berisi kata "Urgent" → Bold + Merah

        📌 JENIS CONDITIONAL FORMATTING:

        1. HIGHLIGHT CELL RULES
           • Greater Than / Less Than
           • Between / Equal To
           • Text That Contains
           • Duplicate Values

        2. TOP/BOTTOM RULES
           • Top 10 Items
           • Top 10%
           • Bottom 10 Items
           • Above Average / Below Average

        3. DATA BARS
           • Bar grafis di dalam cell
           • Semakin besar nilai, semakin panjang bar

        4. COLOR SCALES
           • Gradasi warna
           • Merah (rendah) → Kuning (sedang) → Hijau (tinggi)

        5. ICON SETS
           • Ikon di dalam cell
           • ✅ ❌ ⚠️
           • Tanda panah, traffic light, rating

        📌 CARA PAKAI CONDITIONAL FORMATTING:

        1. Pilih range cell
        2. Home → Conditional Formatting
        3. Pilih aturan yang diinginkan
        4. Atur parameter (nilai, warna, dll)
        5. OK

        📌 CONTOH PRAKTIS:

        DATA PENJUALAN (A1:A10):
        1. Pilih A1:A10
        2. Conditional Formatting → Highlight Cell Rules
        3. Greater Than → 100 → Format: Green Fill
        4. Less Than → 50 → Format: Red Fill
        5. Between → 50-100 → Format: Yellow Fill

        💡 TIPS PRO:
        • Conditional Formatting bisa dikombinasikan dengan formula!
        • Gunakan untuk data quality check (tandai data yang aneh)
        • Jangan terlalu banyak aturan (bikin lambat)
        • Bisa di-copy dengan Format Painter`,
            summary: "Conditional Formatting mengubah format cell otomatis berdasarkan aturan",
            estimatedTime: 45,
            difficulty: "beginner",
            learningObjectives: [
              "Memahami conditional formatting",
              "Bisa menerapkan conditional formatting"
            ],
            keywords: ["conditional formatting", "highlight", "data bars", "color scales", "icon sets"],
            prerequisites: [],
            examples: [
              {
                title: "Tandai Gaji > 10 Juta",
                description: "Gunakan Highlight Cell Rules > Greater Than > 10000000 → format hijau"
              },
              {
                title: "Data Bars untuk Penjualan",
                description: "Pilih data penjualan → Conditional Formatting → Data Bars → gradient fill"
              }
            ],
            miniPractice: {
              title: "Conditional Formatting Latihan",
              instructions: "Buat data 20 angka acak, tandai angka >100 hijau, angka <50 merah, angka 50-100 kuning",
              estimatedTime: 15,
              solution: "Gunakan Highlight Cell Rules > Greater Than dan Less Than"
            },
            additionalResources: [],
            understandingStatus: "not_started",
            personalNotes: ""
          }
        ],
        resources: {
          videos: [
            {
              id: "v8",
              title: "Cara Format Cell di Excel (Lengkap)",
              url: "https://youtu.be/dQw4w9WgXcQ",
              platform: "youtube",
              duration: "32:10",
              channel: "Excel Formatting Master",
              description: "Semua jenis format cell dengan contoh praktis",
              difficulty: "beginner",
              language: "Indonesia",
              isRequired: true,
              watchOrder: 1,
              hasSubtitles: true,
              hasCaptions: true
            },
            {
              id: "v9",
              title: "Data Entry Tips & Trik di Excel",
              url: "https://youtu.be/dQw4w9WgXcQ",
              platform: "youtube",
              duration: "18:45",
              channel: "Excel Data Entry Pro",
              description: "Cara input data cepat dan akurat",
              difficulty: "beginner",
              language: "Indonesia",
              isRequired: true,
              watchOrder: 2,
              hasSubtitles: true,
              hasCaptions: false
            }
          ],
          articles: [
            {
              id: "a7",
              title: "Panduan Format Cell Excel",
              url: "https://www.exceljet.net/format-cells",
              platform: "Excel Jet",
              description: "Referensi lengkap format cell dengan contoh",
              difficulty: "beginner",
              language: "Inggris",
              readTime: 15,
              isRequired: true,
              keyTakeaways: [
                "Format Text membuat angka tidak bisa dihitung",
                "Custom format bisa menyembunyikan nilai nol dengan ;;;"
              ],
              hasImages: true,
              hasCodeExamples: false
            },
            {
              id: "a8",
              title: "Data Validation untuk Pemula",
              url: "https://www.excelcampus.com/data-validation",
              platform: "Excel Campus",
              description: "Cara membuat dropdown dan validasi data",
              difficulty: "beginner",
              language: "Inggris",
              readTime: 12,
              isRequired: true,
              keyTakeaways: [
                "Data Validation mencegah input yang salah",
                "Dropdown list memudahkan pengisian data"
              ],
              hasImages: true,
              hasCodeExamples: false
            }
          ],
          documentations: [
            {
              id: "d4",
              title: "Conditional Formatting Official",
              url: "https://support.microsoft.com/conditional-formatting",
              platform: "Microsoft",
              description: "Dokumentasi resmi conditional formatting",
              version: "2024",
              language: "Inggris",
              isRequired: true,
              focusSections: ["Highlight Rules", "Top/Bottom Rules", "Data Bars", "Color Scales"],
              depthLevel: "basic"
            }
          ],
          interactives: [],
          datasets: [],
          templates: []
        },
        practice: {
          id: "p4",
          title: "Buat Form Input dengan Format & Validasi",
          instructions: [
            "Buat form data karyawan dengan 8 kolom:",
            "1. NIK (Text format, contoh: '001')",
            "2. Nama Lengkap (Text)",
            "3. Tanggal Lahir (Date format: 01-Jan-2024)",
            "4. Jenis Kelamin (Dropdown: Laki-laki, Perempuan)",
            "5. Departemen (Dropdown: HRD, IT, Marketing, Finance)",
            "6. Gaji (Currency Rp dengan format Rp#,##0.00)",
            "7. Tanggal Masuk (Date format: 01-Jan-2024)",
            "8. Status (Dropdown: Tetap, Kontrak, Magang)",
            "Header: Bold, Background biru, Text putih",
            "Data Validation untuk semua dropdown",
            "Conditional Formatting:",
            "- Gaji > 10.000.000 → Background Hijau",
            "- Gaji < 5.000.000 → Background Merah",
            "- Status 'Tetap' → Bold",
            "Isi 10 data karyawan sample"
          ],
          objectives: [
            "Bisa membuat form dengan format dan validasi",
            "Bisa menerapkan conditional formatting"
          ],
          estimatedTime: 90,
          difficulty: "beginner",
          category: "individual",
          skillsPracticed: ["Format Cell", "Data Validation", "Conditional Formatting"],
          toolsUsed: ["Microsoft Excel"],
          evaluationCriteria: [
            { criterion: "8 kolom dengan format yang benar", weight: 15, description: "Semua format sesuai ketentuan" },
            { criterion: "3 dropdown validation berfungsi", weight: 15, description: "Dropdown bisa dipilih" },
            { criterion: "Conditional formatting berjalan", weight: 15, description: "Warna berubah otomatis" },
            { criterion: "Form rapi dan mudah dibaca", weight: 15, description: "Design profesional" },
            { criterion: "Header sesuai ketentuan", weight: 15, description: "Bold, biru, putih" },
            { criterion: "10 data karyawan terisi", weight: 15, description: "Data lengkap dan bervariasi" },
            { criterion: "File tersimpan dengan nama yang benar", weight: 10, description: "Nama file sesuai" }
          ],
          tips: [
            "Kerjakan step by step, jangan terburu-buru",
            "Kalau error, coba ulangi dari awal",
            "Periksa semua format sebelum lanjut"
          ],
          commonMistakes: [
            "Lupa format cell",
            "Salah syntax conditional formatting",
            "Validation tidak berfungsi karena range salah",
            "Lupa save file"
          ],
          solution: {
            description: "Form yang rapi dengan semua format dan validasi berfungsi",
            steps: [
              "Buat header dan 8 kolom",
              "Format setiap kolom sesuai ketentuan",
              "Buat dropdown dengan Data Validation",
              "Terapkan Conditional Formatting",
              "Isi 10 data sample",
              "Simpan file"
            ]
          },
          timeLimit: 120,
          status: "not_started",
          userNotes: "",
          selfAssessment: 0
        },
        notes: "",
        tips: [
          "Simpan template form untuk dipakai besok",
          "Periksa semua format sebelum submit"
        ],
        keywords: ["format cell", "data entry", "data validation", "conditional formatting"],
        estimatedPracticeTime: 90,
        additionalResources: []
      },
      {
        sessionNumber: 8,
        startTime: "18:00",
        endTime: "19:00",
        durationMinutes: 60,
        type: "review",
        title: "REVIEW, QUIZ, & REFLEKSI",
        description: "Review materi, mengerjakan quiz, dan refleksi harian",
        status: "pending",
        objectives: [
          "Mereview semua materi hari ini",
          "Mengerjakan quiz pemahaman",
          "Melakukan refleksi harian"
        ],
        subtopics: [
          {
            id: "s8-1",
            name: "5.1 Review Materi Hari Ini",
            content: `📌 YANG SUDAH DIPELAJARI HARI INI:

        ✅ APA ITU EXCEL:
        • Definisi dan fungsi Excel
        • Sejarah perkembangannya
        • Perbedaan dengan tools lain
        • Kenapa penting untuk Data Analyst

        ✅ ANTARMUKA EXCEL:
        • Quick Access Toolbar
        • Ribbon (9 tab utama)
        • Formula Bar & Name Box
        • Status Bar
        • Worksheet Area

        ✅ NAVIGASI:
        • Shortcut keyboard (wajib dihafal!)
        • Mouse navigation
        • Go To (F5)
        • Name Box navigation

        ✅ CELL, ROW, COLUMN:
        • Definisi cell, row, column
        • Alamat cell
        • Range
        • Total row/column

        ✅ WORKBOOK & WORKSHEET:
        • Perbedaan workbook dan worksheet
        • Cara membuat, menyimpan
        • Operasi sheet (add, rename, delete, move, color)
        • AutoSave & Version History

        ✅ FORMAT CELL:
        • Jenis format (Number, Currency, Date, dll)
        • Cara mengubah format
        • Custom format

        ✅ DATA ENTRY:
        • Cara input data
        • Jenis data
        • Auto-fill
        • Data Validation

        ✅ CONDITIONAL FORMATTING:
        • Pengertian
        • Jenis-jenis
        • Cara pakai
        • Contoh praktis

        📌 SKILLS YANG SUDAH DIMILIKI:
        1. Bisa navigasi di Excel tanpa mouse
        2. Bisa membuat dan mengelola workbook
        3. Bisa mengubah format cell
        4. Bisa input data dengan cepat
        5. Bisa membuat dropdown validation
        6. Bisa memberi warna otomatis dengan conditional formatting`,
            summary: "Hari pertama mempelajari fondasi Excel dari pengenalan sampai conditional formatting",
            estimatedTime: 30,
            difficulty: "beginner",
            learningObjectives: [
              "Mereview semua materi hari ini",
              "Mengidentifikasi yang sudah dan belum paham"
            ],
            keywords: ["review", "recap", "summary"],
            prerequisites: [],
            examples: [],
            miniPractice: undefined,
            additionalResources: [],
            understandingStatus: "not_started",
            personalNotes: ""
          },
          {
            id: "s8-2",
            name: "5.2 Topik yang Perlu Diulang",
            content: `📌 MATERI YANG BIASANYA SULIT:

        1. Custom Number Format
           • Kode-kode format (#, 0, @, dll)
           • Tips: Simpan cheat sheet

        2. Data Validation dengan Formula
           • Validation dinamis
           • Tips: Pelajari di minggu ke-2

        3. Conditional Formatting dengan Formula
           • Menggunakan = untuk aturan custom
           • Tips: Pelajari setelah paham rumus

        📌 REKOMENDASI UNTUK BESOK:
        • Ulangi shortcut navigasi (5 menit di pagi hari)
        • Buat ringkasan 1 halaman tentang antarmuka
        • Praktik buka-tutup Excel 5 kali (biasakan)

        💡 JANGAN KHAWATIR KALAU LUPA!
        Excel itu dipelajari sambil dipraktekkan.
        Semakin sering buka Excel, semakin terbiasa.`,
            summary: "Beberapa topik perlu diulang dan direkomendasikan untuk latihan tambahan",
            estimatedTime: 15,
            difficulty: "beginner",
            learningObjectives: [
              "Mengidentifikasi topik yang perlu diulang",
              "Membuat rencana belajar besok"
            ],
            keywords: ["needs review", "plan", "recommendation"],
            prerequisites: [],
            examples: [],
            miniPractice: undefined,
            additionalResources: [],
            understandingStatus: "not_started",
            personalNotes: ""
          }
        ],
        resources: {
          videos: [
            {
              id: "v10",
              title: "Review Cepat: 10 Skill Excel Hari Pertama",
              url: "https://youtu.be/dQw4w9WgXcQ",
              platform: "youtube",
              duration: "15:00",
              channel: "Excel Review",
              description: "Ringkasan cepat semua materi hari ini dalam 15 menit",
              difficulty: "beginner",
              language: "Indonesia",
              isRequired: true,
              watchOrder: 1,
              hasSubtitles: true,
              hasCaptions: true
            }
          ],
          articles: [],
          documentations: [],
          interactives: [],
          datasets: [],
          templates: []
        },
        practice: null,
        notes: "Jangan khawatir kalau lupa! Excel dipelajari sambil dipraktekkan.",
        tips: [
          "Buat ringkasan catatan hari ini",
          "Tandai topik yang perlu diulang",
          "Tentukan target untuk besok"
        ],
        keywords: ["review", "quiz", "reflection"],
        estimatedPracticeTime: 0,
        additionalResources: []
      }
    ]
  },
  quiz: {
    id: "q1",
    title: "Quiz Hari ke-1: Pengenalan Excel",
    description: "Test pemahaman tentang Excel, antarmuka, navigasi, worksheet, dan format cell",
    questions: [
      {
        id: "q1",
        type: "multiple_choice",
        question: "Apa fungsi dari Quick Access Toolbar?",
        options: ["A. Menampilkan formula di cell", "B. Akses cepat ke perintah yang sering digunakan", "C. Menampilkan chart", "D. Mengatur print layout"],
        correctAnswer: "B",
        explanation: "Quick Access Toolbar (QAT) adalah toolbar kecil di pojok kiri atas yang bisa dikustomisasi dengan perintah yang sering digunakan seperti Save, Undo, Redo.",
        difficulty: "easy",
        points: 10,
        category: "Antarmuka",
        relatedSubtopic: "2.1 Antarmuka Excel",
        hint: "Lihat bagian Quick Access Toolbar di materi antarmuka"
      },
      {
        id: "q2",
        type: "multiple_choice",
        question: "Berapa total row di Excel versi terbaru?",
        options: ["A. 65.536", "B. 1.048.576", "C. 16.384", "D. 10.000"],
        correctAnswer: "B",
        explanation: "Excel versi 2007 ke atas memiliki 1.048.576 row (baris) dan 16.384 column (kolom).",
        difficulty: "easy",
        points: 10,
        category: "Cell Row Column",
        relatedSubtopic: "2.3 Cell, Row, Column",
        hint: "Ingat materi tentang kapasitas Excel"
      },
      {
        id: "q3",
        type: "multiple_choice",
        question: "Shortcut untuk pindah ke cell A1 adalah...",
        options: ["A. Ctrl + A", "B. Ctrl + Home", "C. Alt + A1", "D. Shift + A1"],
        correctAnswer: "B",
        explanation: "Ctrl + Home selalu membawa kamu ke cell A1 di worksheet apapun.",
        difficulty: "easy",
        points: 10,
        category: "Navigasi",
        relatedSubtopic: "2.2 Navigasi Dasar",
        hint: "Ingat shortcut navigasi dasar"
      },
      {
        id: "q4",
        type: "multiple_choice",
        question: "Apa perbedaan workbook dan worksheet?",
        options: ["A. Workbook adalah file, worksheet adalah lembar di dalamnya", "B. Worksheet adalah file, workbook adalah lembar di dalamnya", "C. Workbook dan worksheet sama saja", "D. Workbook untuk angka, worksheet untuk teks"],
        correctAnswer: "A",
        explanation: "Workbook adalah file Excel (.xlsx) yang bisa berisi banyak worksheet (sheet).",
        difficulty: "medium",
        points: 10,
        category: "Workbook Worksheet",
        relatedSubtopic: "3.1 Memahami Workbook vs Worksheet",
        hint: "Ingat perbedaan workbook dan worksheet"
      },
      {
        id: "q5",
        type: "multiple_choice",
        question: "Apa yang terjadi kalau cell diformat sebagai Text?",
        options: ["A. Angka tetap bisa dihitung", "B. Angka dianggap sebagai teks dan tidak bisa dihitung", "C. Semua data otomatis menjadi huruf kapital", "D. Cell tidak bisa diisi apa-apa"],
        correctAnswer: "B",
        explanation: "Format Text membuat Excel menganggap semua input sebagai teks, termasuk angka. Angka tidak bisa dihitung sampai diformat ulang.",
        difficulty: "medium",
        points: 10,
        category: "Format Cell",
        relatedSubtopic: "4.1 Format Cell (Dasar)",
        hint: "Ingat jenis-jenis format cell"
      },
      {
        id: "q6",
        type: "multiple_choice",
        question: "Fungsi Data Validation adalah...",
        options: ["A. Menghapus data yang salah", "B. Membatasi apa yang bisa diinput di cell", "C. Menyimpan data ke database", "D. Membuat grafik otomatis"],
        correctAnswer: "B",
        explanation: "Data Validation digunakan untuk membatasi tipe data atau nilai yang bisa dimasukkan ke cell, misalnya membuat dropdown list.",
        difficulty: "medium",
        points: 10,
        category: "Data Entry",
        relatedSubtopic: "4.2 Data Entry",
        hint: "Ingat fungsi Data Validation"
      },
      {
        id: "q7",
        type: "multiple_choice",
        question: "Apa nama fitur yang mengubah format cell berdasarkan kondisi?",
        options: ["A. AutoFormat", "B. Conditional Formatting", "C. Format Painter", "D. Cell Styles"],
        correctAnswer: "B",
        explanation: "Conditional Formatting mengubah tampilan cell (warna, font, dll) berdasarkan aturan atau kondisi yang kita tentukan.",
        difficulty: "medium",
        points: 10,
        category: "Conditional Formatting",
        relatedSubtopic: "4.3 Conditional Formatting",
        hint: "Ingat fitur untuk format otomatis berdasarkan aturan"
      },
      {
        id: "q8",
        type: "multiple_choice",
        question: "Shortcut untuk menyimpan file Excel adalah...",
        options: ["A. Ctrl + C", "B. Ctrl + V", "C. Ctrl + S", "D. Ctrl + X"],
        correctAnswer: "C",
        explanation: "Ctrl + S adalah shortcut universal untuk menyimpan file di semua aplikasi, termasuk Excel.",
        difficulty: "easy",
        points: 10,
        category: "Workbook",
        relatedSubtopic: "3.2 Operasi Workbook",
        hint: "Shortcut save di semua aplikasi"
      },
      {
        id: "q9",
        type: "multiple_choice",
        question: "Bagian mana yang menunjukkan alamat cell aktif?",
        options: ["A. Formula Bar", "B. Status Bar", "C. Name Box", "D. Quick Access Toolbar"],
        correctAnswer: "C",
        explanation: "Name Box (di kiri Formula Bar) menunjukkan alamat cell yang sedang aktif, contoh: A1, B5, Z100.",
        difficulty: "easy",
        points: 10,
        category: "Antarmuka",
        relatedSubtopic: "2.1 Antarmuka Excel",
        hint: "Lihat bagian Name Box di materi antarmuka"
      },
      {
        id: "q10",
        type: "multiple_choice",
        question: "Excel pertama kali dirilis untuk sistem operasi apa?",
        options: ["A. Windows", "B. Macintosh", "C. Linux", "D. DOS"],
        correctAnswer: "B",
        explanation: "Excel 1.0 pertama kali dirilis untuk Macintosh pada tahun 1985, kemudian versi Windows keluar pada 1987.",
        difficulty: "hard",
        points: 10,
        category: "Sejarah",
        relatedSubtopic: "1.2 Sejarah & Evolusi Excel",
        hint: "Ingat sejarah Excel"
      },
      {
        id: "q11",
        type: "multiple_choice",
        question: "Apa fungsi dari Conditional Formatting 'Data Bars'?",
        options: ["A. Menampilkan bar grafis di dalam cell", "B. Membuat chart baru", "C. Mengubah data menjadi grafik batang", "D. Menghitung rata-rata data"],
        correctAnswer: "A",
        explanation: "Data Bars menampilkan bar grafis di dalam cell yang panjangnya sesuai dengan nilai cell. Semakin besar nilai, semakin panjang bar.",
        difficulty: "medium",
        points: 10,
        category: "Conditional Formatting",
        relatedSubtopic: "4.3 Conditional Formatting",
        hint: "Ingat jenis-jenis conditional formatting"
      },
      {
        id: "q12",
        type: "multiple_choice",
        question: "File Excel dengan macro memiliki ekstensi...",
        options: ["A. .xlsx", "B. .xlsm", "C. .xlsb", "D. .csv"],
        correctAnswer: "B",
        explanation: ".xlsm adalah format Excel yang mendukung macro (kode VBA). .xlsx adalah format standar tanpa macro.",
        difficulty: "medium",
        points: 10,
        category: "Workbook",
        relatedSubtopic: "3.2 Operasi Workbook",
        hint: "Ingat format file Excel"
      },
      {
        id: "q13",
        type: "multiple_choice",
        question: "Cara cepat pindah antar worksheet adalah...",
        options: ["A. Ctrl + Page Up/Down", "B. Ctrl + Tab", "C. Alt + Tab", "D. Shift + Tab"],
        correctAnswer: "A",
        explanation: "Ctrl + Page Up untuk pindah ke sheet kiri, Ctrl + Page Down untuk pindah ke sheet kanan.",
        difficulty: "medium",
        points: 10,
        category: "Navigasi",
        relatedSubtopic: "3.2 Operasi Worksheet",
        hint: "Ingat shortcut pindah antar sheet"
      },
      {
        id: "q14",
        type: "multiple_choice",
        question: "Apa yang dimaksud dengan range di Excel?",
        options: ["A. Satu cell saja", "B. Kumpulan cell yang dipilih", "C. Seluruh worksheet", "D. Seluruh workbook"],
        correctAnswer: "B",
        explanation: "Range adalah kumpulan cell yang terdiri dari minimal 2 cell, contoh: A1:A10 atau B2:D5.",
        difficulty: "easy",
        points: 10,
        category: "Cell Row Column",
        relatedSubtopic: "2.3 Cell, Row, Column",
        hint: "Ingat definisi range"
      },
      {
        id: "q15",
        type: "multiple_choice",
        question: "Di mana letak tombol untuk menambah sheet baru?",
        options: ["A. Di menu File", "B. Di sebelah kanan tab sheet terakhir (ikon '+')", "C. Di Quick Access Toolbar", "D. Di Formula Bar"],
        correctAnswer: "B",
        explanation: "Ikon '+' di sebelah kanan tab sheet terakhir adalah cara termudah untuk menambah sheet baru. Bisa juga dengan Shift+F11.",
        difficulty: "easy",
        points: 10,
        category: "Worksheet",
        relatedSubtopic: "3.2 Operasi Worksheet",
        hint: "Lihat bagian bawah Excel"
      }
    ],
    passingScore: 70,
    totalPoints: 150,
    timeLimit: 30,
    maxAttempts: 3,
    difficulty: "beginner",
    topicsTested: ["Antarmuka Excel", "Navigasi", "Cell Row Column", "Workbook Worksheet", "Format Cell", "Data Entry", "Conditional Formatting"],
    tips: ["Baca soal dengan teliti", "Kerjakan yang mudah dulu", "Jangan terburu-buru"],
    isRequired: true
  },
  assignment: {
    id: "a1",
    title: "Buat Workbook dengan Data Sample & Format Lengkap",
    description: "Buat sebuah workbook yang berisi data sample dan menerapkan semua yang sudah dipelajari hari ini.",
    objectives: [
      "Menerapkan semua materi hari 1",
      "Membuat workbook terstruktur",
      "Menggunakan format dan validasi yang benar",
      "Menerapkan conditional formatting"
    ],
    instructions: [
      "Buat workbook baru dengan nama 'Tugas_Hari1_NamaKamu.xlsx'",
      "Buat minimal 3 worksheet: Data_Karyawan, Analisis, Dashboard",
      "Data_Karyawan: 10 data dengan kolom NIK, Nama, Tanggal Lahir, Departemen, Gaji, Status",
      "Analisis: summary data (total per departemen, rata-rata gaji, gaji tertinggi, gaji terendah)",
      "Dashboard: chart dan conditional formatting",
      "Terapkan semua format yang sudah dipelajari hari ini"
    ],
    deliverables: [
      { name: "File Excel", description: "File .xlsx dengan 3 worksheet", format: ".xlsx", isRequired: true },
      { name: "Screenshot", description: "Screenshot workbook jika diperlukan", format: ".png", isRequired: false }
    ],
    estimatedTime: "90 menit",
    difficulty: "beginner",
    skillsTested: ["Format Cell", "Data Validation", "Conditional Formatting", "Workbook Management", "Data Entry"],
    toolsUsed: ["Microsoft Excel"],
    evaluationCriteria: [
      { criterion: "Semua kolom ada dan terisi", weight: 15, description: "Data lengkap 10 karyawan" },
      { criterion: "Format cell sesuai ketentuan", weight: 15, description: "NIK Text, Tanggal Date, Gaji Currency" },
      { criterion: "Data Validation berfungsi", weight: 15, description: "Dropdown Departemen dan Status" },
      { criterion: "Conditional Formatting berjalan", weight: 15, description: "Warna sesuai aturan" },
      { criterion: "Workbook terstruktur dengan rapi", weight: 15, description: "3 worksheet dengan fungsi berbeda" },
      { criterion: "Ada chart di worksheet Dashboard", weight: 15, description: "Chart dari data" },
      { criterion: "File tersimpan dengan nama yang benar", weight: 10, description: "Nama file sesuai" }
    ],
    tips: [
      "Kerjakan step by step",
      "Periksa semua format",
      "Pastikan semua validation berfungsi",
      "Jangan lupa save"
    ],
    commonMistakes: [
      "Lupa format cell",
      "Validation error",
      "Conditional formatting salah",
      "Lupa save file"
    ],
    rubric: [
      { level: "excellent", criteria: "Semua format dan validasi berfungsi sempurna", description: "Tidak ada error", scoreRange: "90-100" },
      { level: "good", criteria: "Sebagian besar format dan validasi berfungsi", description: "1-2 error kecil", scoreRange: "70-89" },
      { level: "satisfactory", criteria: "Format dan validasi ada tapi banyak error", description: "3-5 error", scoreRange: "50-69" },
      { level: "needs_improvement", criteria: "Format dan validasi belum benar", description: "Lebih dari 5 error", scoreRange: "0-49" }
    ],
    deadlineDays: 1,
    isRequired: true
  },
  reflection: {
    id: "r1",
    dayId: 1,
    questions: [
      { id: "rq1", question: "Apa yang paling mudah dipahami hari ini?", type: "text", isRequired: true },
      { id: "rq2", question: "Apa yang paling sulit? Mengapa?", type: "text", isRequired: true },
      { id: "rq3", question: "Apa yang ingin dipelajari lebih dalam?", type: "text", isRequired: false },
      { id: "rq4", question: "Seberapa fokus kamu belajar hari ini? (1-10)", type: "rating", isRequired: true },
      { id: "rq5", question: "Apa gangguan terbesar hari ini?", type: "text", isRequired: false },
      { id: "rq6", question: "Skill apa yang sudah kamu kuasai hari ini?", type: "text", isRequired: true },
      { id: "rq7", question: "Apa yang akan kamu lakukan berbeda besok?", type: "text", isRequired: false }
    ],
    selfRating: {
      understanding: 0,
      focus: 0,
      energy: 0,
      satisfaction: 0,
      difficulty: 0
    },
    easiestTopics: [],
    hardestTopics: [],
    needsReview: [],
    keyLearnings: [],
    wantToLearnMore: [],
    improvementSuggestions: [],
    personalNotes: "",
    mood: undefined,
    timeSpent: 0,
    targetAchieved: false,
    isCompleted: false
  },
  evaluation: {
    understandingLevel: 0,
    focusLevel: 0,
    energyLevel: 0,
    topicsNeedsReview: [],
    notes: "",
    difficultyRating: 0,
    improvementSuggestions: ""
  },
  learningObjectives: [
    "Memahami apa itu Excel dan kegunaannya",
    "Mengenal semua bagian antarmuka Excel",
    "Bisa navigasi di Excel tanpa mouse",
    "Memahami cell, row, column, dan range",
    "Bisa membuat dan mengelola workbook & worksheet",
    "Bisa mengubah format cell",
    "Bisa input data dengan cepat dan benar",
    "Bisa membuat dropdown validation",
    "Bisa menerapkan conditional formatting"
  ],
  keywords: ["Excel", "pengenalan", "antarmuka", "navigasi", "workbook", "worksheet", "format cell", "data entry", "conditional formatting"],
  prerequisites: ["Tidak ada prasyarat"],
  notes: "Hari pertama adalah fondasi. Kuasai ini sebelum lanjut ke hari berikutnya.",
  totalStudyHours: 10
};
