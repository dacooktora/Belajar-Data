import { VideoResource, ArticleResource, DocumentationResource, InteractiveResource } from '@/lib/types/roadmap.types';

export const RESOURCES = {
  videos: {
    excel: [
      {
        id: "v1",
        title: "Apa Itu Excel? - Pemahaman Dasar",
        url: "https://youtu.be/dQw4w9WgXcQ",
        platform: "YouTube",
        duration: "12:30",
        channel: "Belajar Excel Indonesia",
        description: "Penjelasan singkat tentang apa itu Excel dan fungsinya",
        difficulty: "pemula",
        language: "Indonesia",
        uploadedAt: "2024-01-15",
        views: 150000,
        rating: 4.8
      },
      {
        id: "v2",
        title: "Sejarah Excel 1985-2024",
        url: "https://youtu.be/dQw4w9WgXcQ",
        platform: "YouTube",
        duration: "18:45",
        channel: "Excel History Channel",
        description: "Perjalanan Excel dari pertama kali sampai sekarang",
        difficulty: "pemula",
        language: "Indonesia",
        uploadedAt: "2024-01-20",
        views: 85000,
        rating: 4.6
      },
      {
        id: "v3",
        title: "Excel vs Google Sheets vs LibreOffice",
        url: "https://youtu.be/dQw4w9WgXcQ",
        platform: "YouTube",
        duration: "15:20",
        channel: "Tech Comparison",
        description: "Perbandingan lengkap 3 spreadsheet tools",
        difficulty: "pemula",
        language: "Indonesia",
        uploadedAt: "2024-01-25",
        views: 120000,
        rating: 4.7
      },
      {
        id: "v4",
        title: "Tour Lengkap Antarmuka Excel 2024",
        url: "https://youtu.be/dQw4w9WgXcQ",
        platform: "YouTube",
        duration: "28:15",
        channel: "Excel Tutorial Center",
        description: "Penjelasan semua bagian Excel dengan visual",
        difficulty: "pemula",
        language: "Indonesia",
        uploadedAt: "2024-02-01",
        views: 200000,
        rating: 4.9
      },
      {
        id: "v5",
        title: "Shortcut Keyboard Excel yang Wajib Diketahui",
        url: "https://youtu.be/dQw4w9WgXcQ",
        platform: "YouTube",
        duration: "22:30",
        channel: "Excel Shortcut Pro",
        description: "Kumpulan shortcut untuk navigasi cepat",
        difficulty: "pemula",
        language: "Indonesia",
        uploadedAt: "2024-02-05",
        views: 180000,
        rating: 4.8
      },
      {
        id: "v6",
        title: "Cara Membuat dan Menyimpan Workbook",
        url: "https://youtu.be/dQw4w9WgXcQ",
        platform: "YouTube",
        duration: "15:40",
        channel: "Excel Dasar Indonesia",
        description: "Tutorial membuat, menyimpan, mengelola workbook",
        difficulty: "pemula",
        language: "Indonesia",
        uploadedAt: "2024-02-10",
        views: 95000,
        rating: 4.5
      },
      {
        id: "v7",
        title: "Tips Mengelola Banyak Worksheet",
        url: "https://youtu.be/dQw4w9WgXcQ",
        platform: "YouTube",
        duration: "12:20",
        channel: "Excel Management",
        description: "Cara efisien mengelola banyak sheet",
        difficulty: "pemula",
        language: "Indonesia",
        uploadedAt: "2024-02-15",
        views: 75000,
        rating: 4.4
      },
      {
        id: "v8",
        title: "Cara Format Cell di Excel (Lengkap)",
        url: "https://youtu.be/dQw4w9WgXcQ",
        platform: "YouTube",
        duration: "32:10",
        channel: "Excel Formatting Master",
        description: "Semua jenis format cell dengan contoh",
        difficulty: "pemula",
        language: "Indonesia",
        uploadedAt: "2024-02-20",
        views: 220000,
        rating: 4.9
      },
      {
        id: "v9",
        title: "Data Entry Tips & Trik di Excel",
        url: "https://youtu.be/dQw4w9WgXcQ",
        platform: "YouTube",
        duration: "18:45",
        channel: "Excel Data Entry Pro",
        description: "Cara input data cepat dan akurat",
        difficulty: "pemula",
        language: "Indonesia",
        uploadedAt: "2024-02-25",
        views: 110000,
        rating: 4.6
      },
      {
        id: "v10",
        title: "Review Cepat: 10 Skill Excel Hari Pertama",
        url: "https://youtu.be/dQw4w9WgXcQ",
        platform: "YouTube",
        duration: "15:00",
        channel: "Excel Review",
        description: "Ringkasan cepat semua materi hari ini",
        difficulty: "pemula",
        language: "Indonesia",
        uploadedAt: "2024-03-01",
        views: 65000,
        rating: 4.3
      }
    ],
    sql: [
      {
        id: "v11",
        title: "Apa Itu SQL? - Pemahaman Dasar",
        url: "https://youtu.be/dQw4w9WgXcQ",
        platform: "YouTube",
        duration: "14:20",
        channel: "Belajar SQL Indonesia",
        description: "Penjelasan dasar tentang SQL dan database",
        difficulty: "pemula",
        language: "Indonesia",
        uploadedAt: "2024-03-05",
        views: 180000,
        rating: 4.7
      },
      {
        id: "v12",
        title: "SELECT Statement - Dasar SQL",
        url: "https://youtu.be/dQw4w9WgXcQ",
        platform: "YouTube",
        duration: "25:30",
        channel: "SQL Tutorial Center",
        description: "Belajar SELECT, WHERE, ORDER BY, LIMIT",
        difficulty: "pemula",
        language: "Indonesia",
        uploadedAt: "2024-03-10",
        views: 200000,
        rating: 4.8
      },
      {
        id: "v13",
        title: "JOIN di SQL - INNER, LEFT, RIGHT, FULL",
        url: "https://youtu.be/dQw4w9WgXcQ",
        platform: "YouTube",
        duration: "35:15",
        channel: "SQL Master",
        description: "Memahami semua jenis JOIN di SQL",
        difficulty: "menengah",
        language: "Indonesia",
        uploadedAt: "2024-03-15",
        views: 250000,
        rating: 4.9
      },
      {
        id: "v14",
        title: "Subquery dan CTE di SQL",
        url: "https://youtu.be/dQw4w9WgXcQ",
        platform: "YouTube",
        duration: "28:40",
        channel: "SQL Advanced",
        description: "Belajar subquery dan WITH clause",
        difficulty: "menengah",
        language: "Indonesia",
        uploadedAt: "2024-03-20",
        views: 150000,
        rating: 4.6
      }
    ],
    powerbi: [
      {
        id: "v15",
        title: "Apa Itu Power BI? - Pemahaman Dasar",
        url: "https://youtu.be/dQw4w9WgXcQ",
        platform: "YouTube",
        duration: "16:30",
        channel: "Power BI Indonesia",
        description: "Pengenalan Power BI dan fungsinya",
        difficulty: "pemula",
        language: "Indonesia",
        uploadedAt: "2024-03-25",
        views: 120000,
        rating: 4.5
      },
      {
        id: "v16",
        title: "Power BI - Import Data dan Transformasi",
        url: "https://youtu.be/dQw4w9WgXcQ",
        platform: "YouTube",
        duration: "30:20",
        channel: "Power BI Pro",
        description: "Cara import dan transformasi data di Power BI",
        difficulty: "pemula",
        language: "Indonesia",
        uploadedAt: "2024-04-01",
        views: 95000,
        rating: 4.6
      },
      {
        id: "v17",
        title: "DAX Dasar di Power BI",
        url: "https://youtu.be/dQw4w9WgXcQ",
        platform: "YouTube",
        duration: "42:15",
        channel: "DAX Master",
        description: "Belajar DAX untuk analisis data di Power BI",
        difficulty: "menengah",
        language: "Indonesia",
        uploadedAt: "2024-04-05",
        views: 180000,
        rating: 4.8
      }
    ],
    python: [
      {
        id: "v18",
        title: "Python untuk Pemula - Dasar Python",
        url: "https://youtu.be/dQw4w9WgXcQ",
        platform: "YouTube",
        duration: "45:30",
        channel: "Python Indonesia",
        description: "Belajar Python dari nol untuk data analyst",
        difficulty: "pemula",
        language: "Indonesia",
        uploadedAt: "2024-04-10",
        views: 300000,
        rating: 4.9
      },
      {
        id: "v19",
        title: "Pandas untuk Data Analyst",
        url: "https://youtu.be/dQw4w9WgXcQ",
        platform: "YouTube",
        duration: "50:20",
        channel: "Data Science Indonesia",
        description: "Belajar Pandas untuk manipulasi data",
        difficulty: "menengah",
        language: "Indonesia",
        uploadedAt: "2024-04-15",
        views: 220000,
        rating: 4.8
      },
      {
        id: "v20",
        title: "Data Visualization dengan Matplotlib dan Seaborn",
        url: "https://youtu.be/dQw4w9WgXcQ",
        platform: "YouTube",
        duration: "38:45",
        channel: "Visualisasi Data",
        description: "Membuat chart dengan Python",
        difficulty: "menengah",
        language: "Indonesia",
        uploadedAt: "2024-04-20",
        views: 160000,
        rating: 4.7
      }
    ]
  },
  articles: {
    excel: [
      {
        id: "a1",
        title: "Panduan Memilih Excel Version yang Tepat",
        url: "https://support.microsoft.com/excel-versions",
        platform: "Microsoft Support",
        description: "Artikel resmi Microsoft tentang perbedaan versi Excel",
        difficulty: "pemula",
        language: "Indonesia",
        readTime: 10,
        author: "Microsoft Team",
        publishedAt: "2024-01-10",
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
        difficulty: "pemula",
        language: "Inggris",
        readTime: 15,
        author: "Wikipedia Contributors",
        publishedAt: "2024-01-05",
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
        description: "Analisis mengapa Excel tetap relevan",
        difficulty: "pemula",
        language: "Inggris",
        readTime: 12,
        author: "DataCamp Team",
        publishedAt: "2024-01-12",
        keyTakeaways: [
          "Excel tetap penting karena fleksibilitas dan kemudahan penggunaan",
          "Banyak perusahaan masih menggunakan Excel untuk reporting"
        ],
        hasImages: true,
        hasCodeExamples: false
      },
      {
        id: "a4",
        title: "Panduan Lengkap Antarmuka Excel",
        url: "https://www.excel-easy.com/basics/",
        platform: "Excel Easy",
        description: "Tutorial interaktif tentang bagian-bagian Excel",
        difficulty: "pemula",
        language: "Inggris",
        readTime: 15,
        author: "Excel Easy Team",
        publishedAt: "2024-01-15",
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
        description: "Tips navigasi dari Microsoft",
        difficulty: "pemula",
        language: "Indonesia",
        readTime: 10,
        author: "Microsoft Team",
        publishedAt: "2024-01-18",
        keyTakeaways: [
          "Shortcut keyboard lebih cepat dari mouse",
          "Ctrl+panah untuk lompat ke ujung data"
        ],
        hasImages: true,
        hasCodeExamples: false
      },
      {
        id: "a6",
        title: "Cara Mengelola Workbook dan Worksheet",
        url: "https://www.excelcampus.com/workbook-management",
        platform: "Excel Campus",
        description: "Panduan lengkap pengelolaan file Excel",
        difficulty: "pemula",
        language: "Inggris",
        readTime: 12,
        author: "Excel Campus Team",
        publishedAt: "2024-01-20",
        keyTakeaways: [
          "Beri nama sheet yang deskriptif",
          "Gunakan warna tab untuk kategorisasi"
        ],
        hasImages: true,
        hasCodeExamples: false
      },
      {
        id: "a7",
        title: "Panduan Format Cell Excel",
        url: "https://www.exceljet.net/format-cells",
        platform: "Excel Jet",
        description: "Referensi lengkap format cell",
        difficulty: "pemula",
        language: "Inggris",
        readTime: 15,
        author: "Excel Jet Team",
        publishedAt: "2024-01-22",
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
        difficulty: "pemula",
        language: "Inggris",
        readTime: 12,
        author: "Excel Campus Team",
        publishedAt: "2024-01-25",
        keyTakeaways: [
          "Data Validation mencegah input yang salah",
          "Dropdown list memudahkan pengisian data"
        ],
        hasImages: true,
        hasCodeExamples: false
      }
    ],
    sql: [
      {
        id: "a9",
        title: "SQL untuk Pemula - Panduan Lengkap",
        url: "https://www.w3schools.com/sql/",
        platform: "W3Schools",
        description: "Tutorial SQL dari dasar sampai mahir",
        difficulty: "pemula",
        language: "Inggris",
        readTime: 60,
        author: "W3Schools Team",
        publishedAt: "2024-02-01",
        keyTakeaways: [
          "SQL adalah bahasa untuk mengelola database",
          "SELECT adalah perintah paling dasar"
        ],
        hasImages: true,
        hasCodeExamples: true
      },
      {
        id: "a10",
        title: "Panduan JOIN di SQL",
        url: "https://www.sqlservertutorial.net/sql-server-joins/",
        platform: "SQL Server Tutorial",
        description: "Penjelasan detail semua jenis JOIN",
        difficulty: "menengah",
        language: "Inggris",
        readTime: 30,
        author: "SQL Server Tutorial Team",
        publishedAt: "2024-02-05",
        keyTakeaways: [
          "INNER JOIN mengambil data yang match di kedua tabel",
          "LEFT JOIN mengambil semua data dari tabel kiri"
        ],
        hasImages: true,
        hasCodeExamples: true
      }
    ],
    powerbi: [
      {
        id: "a11",
        title: "Power BI untuk Pemula",
        url: "https://learn.microsoft.com/power-bi/",
        platform: "Microsoft Learn",
        description: "Panduan resmi Power BI dari Microsoft",
        difficulty: "pemula",
        language: "Inggris",
        readTime: 120,
        author: "Microsoft Learn Team",
        publishedAt: "2024-03-01",
        keyTakeaways: [
          "Power BI adalah tool visualisasi data terbaik",
          "DAX adalah formula language di Power BI"
        ],
        hasImages: true,
        hasCodeExamples: true
      }
    ],
    python: [
      {
        id: "a12",
        title: "Python untuk Data Analyst",
        url: "https://www.datacamp.com/courses/python-for-data-science",
        platform: "DataCamp",
        description: "Kursus Python untuk data analyst",
        difficulty: "pemula",
        language: "Inggris",
        readTime: 120,
        author: "DataCamp Team",
        publishedAt: "2024-03-10",
        keyTakeaways: [
          "Python adalah bahasa pemrograman paling populer untuk data",
          "Pandas adalah library utama untuk data analysis"
        ],
        hasImages: true,
        hasCodeExamples: true
      }
    ]
  },
  documentations: {
    excel: [
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
      },
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
      },
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
      },
      {
        id: "d4",
        title: "Conditional Formatting Official",
        url: "https://support.microsoft.com/conditional-formatting",
        platform: "Microsoft",
        description: "Dokumentasi resmi conditional formatting",
        version: "2024",
        language: "Inggris",
        isRequired: true,
        focusSections: ["Highlight Rules", "Top/Bottom Rules", "Data Bars"],
        depthLevel: "basic"
      }
    ],
    sql: [
      {
        id: "d5",
        title: "PostgreSQL Official Documentation",
        url: "https://www.postgresql.org/docs/",
        platform: "PostgreSQL",
        description: "Dokumentasi resmi PostgreSQL",
        version: "16",
        language: "Inggris",
        isRequired: true,
        focusSections: ["SQL Language", "Data Types"],
        depthLevel: "intermediate"
      },
      {
        id: "d6",
        title: "MySQL Official Documentation",
        url: "https://dev.mysql.com/doc/",
        platform: "MySQL",
        description: "Dokumentasi resmi MySQL",
        version: "8.0",
        language: "Inggris",
        isRequired: false,
        focusSections: ["SQL Statements", "Functions"],
        depthLevel: "intermediate"
      }
    ],
    powerbi: [
      {
        id: "d7",
        title: "Power BI Official Documentation",
        url: "https://learn.microsoft.com/power-bi/",
        platform: "Microsoft",
        description: "Dokumentasi resmi Power BI",
        version: "2024",
        language: "Inggris",
        isRequired: true,
        focusSections: ["Getting Started", "DAX", "Visualizations"],
        depthLevel: "basic"
      }
    ],
    python: [
      {
        id: "d8",
        title: "Python Official Documentation",
        url: "https://docs.python.org/3/",
        platform: "Python.org",
        description: "Dokumentasi resmi Python",
        version: "3.12",
        language: "Inggris",
        isRequired: true,
        focusSections: ["Tutorial", "Library Reference"],
        depthLevel: "intermediate"
      },
      {
        id: "d9",
        title: "Pandas Official Documentation",
        url: "https://pandas.pydata.org/docs/",
        platform: "Pandas",
        description: "Dokumentasi resmi Pandas",
        version: "2.2",
        language: "Inggris",
        isRequired: true,
        focusSections: ["Getting Started", "User Guide"],
        depthLevel: "intermediate"
      }
    ]
  },
  interactives: {
    excel: [
      {
        id: "i1",
        title: "Latihan Excel Interaktif",
        url: "https://www.excel-easy.com/exercises/",
        platform: "Excel Easy",
        description: "Latihan interaktif untuk belajar Excel",
        type: "latihan",
        estimatedTime: 30,
        difficulty: "pemula"
      },
      {
        id: "i2",
        title: "Simulasi Pivot Table",
        url: "https://www.contextures.com/pivottable.html",
        platform: "Contextures",
        description: "Simulasi membuat pivot table interaktif",
        type: "simulasi",
        estimatedTime: 45,
        difficulty: "pemula"
      }
    ],
    sql: [
      {
        id: "i3",
        title: "SQL Practice Online",
        url: "https://www.sql-practice.com/",
        platform: "SQL Practice",
        description: "Latihan SQL langsung di browser",
        type: "latihan",
        estimatedTime: 60,
        difficulty: "pemula"
      },
      {
        id: "i4",
        title: "SQLZoo - Tutorial Interaktif",
        url: "https://sqlzoo.net/",
        platform: "SQLZoo",
        description: "Belajar SQL dengan latihan interaktif",
        type: "latihan",
        estimatedTime: 120,
        difficulty: "pemula"
      }
    ],
    powerbi: [
      {
        id: "i5",
        title: "Power BI Demo Interaktif",
        url: "https://powerbi.microsoft.com/demos/",
        platform: "Microsoft",
        description: "Demo interaktif Power BI",
        type: "visualisasi",
        estimatedTime: 30,
        difficulty: "pemula"
      }
    ],
    python: [
      {
        id: "i6",
        title: "Python Interactive Notebook",
        url: "https://colab.research.google.com/",
        platform: "Google Colab",
        description: "Jalankan Python langsung di browser",
        type: "sandbox",
        estimatedTime: 60,
        difficulty: "pemula"
      },
      {
        id: "i7",
        title: "Pandas Playground",
        url: "https://pandas.pydata.org/docs/#pandas-playground",
        platform: "Pandas",
        description: "Coba Pandas langsung di browser",
        type: "sandbox",
        estimatedTime: 30,
        difficulty: "pemula"
      }
    ]
  },
  datasets: [
    {
      id: "ds1",
      title: "Data Penjualan 1000 Transaksi",
      url: "https://www.kaggle.com/datasets/sales-data",
      platform: "Kaggle",
      description: "Dataset penjualan dengan 1000+ transaksi untuk latihan Excel",
      format: "csv",
      size: "2.5 MB",
      rows: 1000,
      columns: 12,
      isRequired: true,
      tags: ["penjualan", "transaksi", "excel"]
    },
    {
      id: "ds2",
      title: "Data Karyawan",
      url: "https://www.kaggle.com/datasets/employee-data",
      platform: "Kaggle",
      description: "Dataset data karyawan untuk latihan SQL dan Excel",
      format: "csv",
      size: "1.8 MB",
      rows: 500,
      columns: 10,
      isRequired: false,
      tags: ["karyawan", "hr", "excel", "sql"]
    },
    {
      id: "ds3",
      title: "Data Penjualan Retail",
      url: "https://www.kaggle.com/datasets/retail-sales",
      platform: "Kaggle",
      description: "Dataset penjualan retail untuk Power BI dan Python",
      format: "csv",
      size: "15 MB",
      rows: 10000,
      columns: 15,
      isRequired: false,
      tags: ["retail", "penjualan", "powerbi", "python"]
    },
    {
      id: "ds4",
      title: "Data COVID-19",
      url: "https://www.kaggle.com/datasets/covid-data",
      platform: "Kaggle",
      description: "Dataset COVID-19 global untuk analisis data",
      format: "csv",
      size: "20 MB",
      rows: 50000,
      columns: 20,
      isRequired: false,
      tags: ["covid", "analisis", "python", "sql"]
    },
    {
      id: "ds5",
      title: "Data E-Commerce",
      url: "https://www.kaggle.com/datasets/ecommerce-data",
      platform: "Kaggle",
      description: "Dataset e-commerce untuk latihan dashboard",
      format: "csv",
      size: "45 MB",
      rows: 50000,
      columns: 18,
      isRequired: false,
      tags: ["ecommerce", "dashboard", "powerbi", "excel"]
    }
  ],
  cheatSheets: [
    {
      id: "c1",
      title: "Cheat Sheet Excel Shortcut",
      url: "https://www.customguide.com/cheat-sheet/excel-shortcuts",
      platform: "CustomGuide",
      description: "Daftar lengkap shortcut keyboard Excel",
      type: "pdf",
      size: "500 KB"
    },
    {
      id: "c2",
      title: "Cheat Sheet Excel Formulas",
      url: "https://www.excel-university.com/excel-formulas-cheat-sheet/",
      platform: "Excel University",
      description: "Daftar lengkap rumus Excel",
      type: "pdf",
      size: "750 KB"
    },
    {
      id: "c3",
      title: "Cheat Sheet SQL",
      url: "https://www.sqltutorial.org/sql-cheat-sheet/",
      platform: "SQL Tutorial",
      description: "Daftar lengkap perintah SQL",
      type: "pdf",
      size: "300 KB"
    },
    {
      id: "c4",
      title: "Cheat Sheet Pandas",
      url: "https://pandas.pydata.org/Pandas_Cheat_Sheet.pdf",
      platform: "Pandas",
      description: "Daftar lengkap fungsi Pandas",
      type: "pdf",
      size: "400 KB"
    },
    {
      id: "c5",
      title: "Cheat Sheet DAX Power BI",
      url: "https://www.sqlbi.com/dax-cheat-sheet/",
      platform: "SQLBI",
      description: "Daftar lengkap fungsi DAX",
      type: "pdf",
      size: "350 KB"
    }
  ],
  courses: [
    {
      id: "co1",
      title: "Excel untuk Pemula - Google",
      url: "https://www.coursera.org/learn/excel-basics",
      platform: "Coursera",
      description: "Kursus Excel dari Google",
      duration: "20 jam",
      level: "pemula",
      provider: "Google",
      isFree: true,
      certificate: true
    },
    {
      id: "co2",
      title: "SQL untuk Data Analyst - DataCamp",
      url: "https://www.datacamp.com/courses/introduction-to-sql",
      platform: "DataCamp",
      description: "Kursus SQL untuk data analyst",
      duration: "15 jam",
      level: "pemula",
      provider: "DataCamp",
      isFree: false,
      certificate: true
    },
    {
      id: "co3",
      title: "Power BI untuk Pemula - Microsoft",
      url: "https://learn.microsoft.com/power-bi-learning",
      platform: "Microsoft Learn",
      description: "Kursus Power BI dari Microsoft",
      duration: "25 jam",
      level: "pemula",
      provider: "Microsoft",
      isFree: true,
      certificate: true
    },
    {
      id: "co4",
      title: "Python untuk Data Science - Harvard",
      url: "https://www.edx.org/course/python-data-science",
      platform: "edX",
      description: "Kursus Python dari Harvard",
      duration: "30 jam",
      level: "pemula",
      provider: "Harvard",
      isFree: true,
      certificate: true
    }
  ],
  communities: [
    {
      id: "com1",
      name: "Excel Indonesia Community",
      url: "https://www.facebook.com/groups/excelindonesia",
      platform: "Facebook",
      description: "Komunitas Excel Indonesia untuk diskusi dan tanya jawab",
      members: 50000,
      language: "Indonesia"
    },
    {
      id: "com2",
      name: "Data Analyst Indonesia",
      url: "https://www.facebook.com/groups/dataanalystindonesia",
      platform: "Facebook",
      description: "Komunitas Data Analyst Indonesia",
      members: 75000,
      language: "Indonesia"
    },
    {
      id: "com3",
      name: "r/SQL - Subreddit SQL",
      url: "https://www.reddit.com/r/SQL/",
      platform: "Reddit",
      description: "Komunitas SQL di Reddit",
      members: 200000,
      language: "Inggris"
    },
    {
      id: "com4",
      name: "r/Excel - Subreddit Excel",
      url: "https://www.reddit.com/r/excel/",
      platform: "Reddit",
      description: "Komunitas Excel di Reddit",
      members: 350000,
      language: "Inggris"
    },
    {
      id: "com5",
      name: "Stack Overflow - Excel",
      url: "https://stackoverflow.com/questions/tagged/excel",
      platform: "Stack Overflow",
      description: "Forum tanya jawab Excel",
      members: 1000000,
      language: "Inggris"
    },
    {
      id: "com6",
      name: "Stack Overflow - SQL",
      url: "https://stackoverflow.com/questions/tagged/sql",
      platform: "Stack Overflow",
      description: "Forum tanya jawab SQL",
      members: 1500000,
      language: "Inggris"
    }
  ]
};
