import { FinalProject } from '@/lib/types/roadmap.types';

export const PROJECTS_DATA: FinalProject[] = [
  {
    id: 1,
    title: "Dashboard Penjualan Sederhana dengan Excel",
    description: "Buat dashboard penjualan interaktif menggunakan Excel dengan data sample yang diberikan. Dashboard harus menampilkan total penjualan, trend penjualan per bulan, top produk, dan analisis per kategori. Project ini akan menguji kemampuan kamu dalam menggunakan Pivot Table, Pivot Chart, Conditional Formatting, dan Data Validation yang sudah dipelajari di Bulan 1.",
    month: 1,
    skillsTested: [
      "Excel Data Entry",
      "Pivot Table",
      "Pivot Chart",
      "Conditional Formatting",
      "Data Validation",
      "Dashboard Design",
      "Data Visualization",
      "Excel Formulas (SUMIFS, COUNTIFS, VLOOKUP)"
    ],
    deliverables: [
      "File Excel dengan 4 worksheet: Data, Pivot, Dashboard, Documentation",
      "Dashboard interaktif dengan slicer untuk filter data",
      "3 chart berbeda (bar, line, pie) untuk visualisasi",
      "Conditional formatting untuk data penting (top 10, bottom 10)",
      "Data validation untuk filter interaktif",
      "Dokumentasi lengkap langkah-langkah pembuatan"
    ],
    dataset: "Dataset penjualan dengan 1000+ transaksi (akan diberikan dalam file Excel terpisah)",
    toolsUsed: ["Microsoft Excel"],
    evaluationCriteria: [
      {
        category: "Data Processing",
        weight: 25,
        description: "Data bersih dan terstruktur dengan format yang benar"
      },
      {
        category: "Pivot Analysis",
        weight: 25,
        description: "Pivot table dan chart yang benar dan informatif"
      },
      {
        category: "Dashboard Design",
        weight: 25,
        description: "Dashboard interaktif, estetis, dan informatif"
      },
      {
        category: "Documentation",
        weight: 25,
        description: "Dokumentasi lengkap dan jelas menjelaskan setiap langkah"
      }
    ],
    estimatedTime: "4-6 jam",
    difficulty: "medium",
    tips: [
      "Gunakan pivot table untuk summarisasi data dengan cepat",
      "Buat dashboard dengan layout yang jelas dan mudah dibaca",
      "Tambahkan slicer untuk interaktivitas",
      "Dokumentasikan setiap langkah dengan screenshot"
    ]
  },
  {
    id: 2,
    title: "Analisis Database Karyawan dengan SQL",
    description: "Gunakan SQL untuk menganalisis database karyawan perusahaan. Database terdiri dari 4 tabel: karyawan, departemen, gaji, dan absensi. Tugas: menjawab 10 pertanyaan bisnis dengan query SQL yang efisien. Project ini akan menguji kemampuan SQL kamu dalam SELECT, JOIN, Subquery, CTE, Window Functions, dan Aggregate Functions.",
    month: 2,
    skillsTested: [
      "SELECT Statement",
      "WHERE Filtering",
      "JOIN (INNER, LEFT, RIGHT, FULL)",
      "Subquery",
      "CTE (WITH Clause)",
      "Window Functions (ROW_NUMBER, RANK, DENSE_RANK)",
      "Aggregate Functions (SUM, AVG, COUNT, MAX, MIN)",
      "GROUP BY dan HAVING",
      "Date Functions",
      "String Functions"
    ],
    deliverables: [
      "File SQL dengan 10 query yang menjawab pertanyaan bisnis",
      "Output dari setiap query (bisa screenshot atau export CSV)",
      "Analisis singkat untuk setiap hasil query (apa insight yang didapat)",
      "Dokumentasi query (penjelasan logika query)",
      "Optimasi query (performance analysis)"
    ],
    dataset: "Database karyawan dengan 4 tabel (akan diberikan sebagai file SQL dump atau CSV)",
    toolsUsed: ["PostgreSQL", "MySQL", "SQLite"],
    evaluationCriteria: [
      {
        category: "Query Correctness",
        weight: 30,
        description: "Semua query menghasilkan output yang benar"
      },
      {
        category: "Query Efficiency",
        weight: 20,
        description: "Query menggunakan indeks dan optimasi yang tepat"
      },
      {
        category: "Data Understanding",
        weight: 20,
        description: "Pemahaman yang baik tentang data dan hubungan antar tabel"
      },
      {
        category: "Analysis Quality",
        weight: 15,
        description: "Insight yang dihasilkan dari data akurat dan bermanfaat"
      },
      {
        category: "Documentation",
        weight: 15,
        description: "Dokumentasi query dan insight jelas dan terstruktur"
      }
    ],
    estimatedTime: "6-8 jam",
    difficulty: "medium",
    tips: [
      "Baca skema database dengan teliti sebelum menulis query",
      "Gunakan EXPLAIN untuk cek performance query",
      "Latih diri dengan soal SQL dari LeetCode dan StrataScratch",
      "Dokumentasikan setiap query dengan komentar"
    ]
  },
  {
    id: 3,
    title: "Dashboard Marketing dengan Power BI",
    description: "Buat dashboard marketing interaktif menggunakan Power BI. Data yang diberikan adalah data campaign marketing, customer demographics, dan sales conversion. Dashboard harus menampilkan ROI campaign, customer segmentation, conversion funnel, dan performance per channel. Project ini akan menguji kemampuan Power BI dan DAX kamu.",
    month: 3,
    skillsTested: [
      "Power BI Data Import",
      "Data Transformation (Power Query)",
      "Data Modeling (Relationships)",
      "DAX (CALCULATE, FILTER, ALL, Time Intelligence)",
      "Visualizations (Cards, Charts, Maps, Matrix)",
      "Dashboard Design",
      "Interactivity (Slicers, Drill-through)",
      "Storytelling dengan Data"
    ],
    deliverables: [
      "File Power BI (.pbix) dengan dashboard interaktif",
      "Dashboard dengan 5+ visualisasi",
      "DAX measures untuk perhitungan custom",
      "Slicer untuk filter interaktif",
      "Dokumentasi dashboard (apa insight yang bisa didapat)",
      "Export dashboard ke PDF (untuk sharing)"
    ],
    dataset: "Data marketing dengan 3 tabel: Campaign, Customer, Conversion (akan diberikan dalam CSV/Excel)",
    toolsUsed: ["Power BI Desktop"],
    evaluationCriteria: [
      {
        category: "Data Transformation",
        weight: 20,
        description: "Data berhasil dimodelkan dengan benar"
      },
      {
        category: "DAX Measures",
        weight: 20,
        description: "DAX measures akurat dan efisien"
      },
      {
        category: "Visualizations",
        weight: 20,
        description: "Visualisasi informatif dan estetis"
      },
      {
        category: "Dashboard Design",
        weight: 20,
        description: "Dashboard interaktif dan user-friendly"
      },
      {
        category: "Insight Quality",
        weight: 20,
        description: "Insight yang dihasilkan bermanfaat untuk bisnis"
      }
    ],
    estimatedTime: "6-8 jam",
    difficulty: "hard",
    tips: [
      "Pelajari dataset dengan teliti sebelum mulai visualisasi",
      "Gunakan Power Query untuk membersihkan data",
      "Buat DAX measures yang reusable",
      "Desain dashboard dengan user persona di pikiran"
    ]
  },
  {
    id: 4,
    title: "Analisis Data COVID-19 dengan Python",
    description: "Gunakan Python untuk menganalisis data COVID-19 global. Data yang diberikan adalah data harian kasus COVID-19 per negara. Tugas: melakukan Exploratory Data Analysis (EDA), visualisasi data, dan membuat prediksi sederhana menggunakan Python. Project ini akan menguji kemampuan Python, Pandas, Matplotlib, Seaborn, dan Scikit-learn kamu.",
    month: 4,
    skillsTested: [
      "Python Dasar",
      "Pandas (DataFrame, Series, GroupBy, Merge)",
      "Data Cleaning (Missing Values, Outliers, Duplicates)",
      "Matplotlib & Seaborn (Visualisasi)",
      "Exploratory Data Analysis (EDA)",
      "Statistical Analysis",
      "Time Series Analysis",
      "Basic Machine Learning (Linear Regression)"
    ],
    deliverables: [
      "Jupyter Notebook (.ipynb) dengan code lengkap",
      "Exploratory Data Analysis (EDA) dengan visualisasi",
      "Analisis tren COVID-19 per negara",
      "Prediksi sederhana menggunakan Linear Regression",
      "Dashboard visualisasi interaktif (opsional dengan Plotly)",
      "Laporan analisis (Markdown di notebook)"
    ],
    dataset: "Data COVID-19 global dari Our World in Data (akan diberikan link download)",
    toolsUsed: ["Python", "Jupyter Notebook", "Pandas", "Matplotlib", "Seaborn", "Scikit-learn"],
    evaluationCriteria: [
      {
        category: "Data Cleaning",
        weight: 20,
        description: "Data berhasil dibersihkan dari missing values dan outliers"
      },
      {
        category: "EDA Quality",
        weight: 20,
        description: "Exploratory data analysis menyeluruh dan informatif"
      },
      {
        category: "Visualizations",
        weight: 20,
        description: "Visualisasi menarik dan komunikatif"
      },
      {
        category: "Analysis Quality",
        weight: 20,
        description: "Analisis data akurat dan memberikan insight yang bermanfaat"
      },
      {
        category: "Code Quality",
        weight: 20,
        description: "Code terstruktur, ada komentar, dan mudah dipahami"
      }
    ],
    estimatedTime: "8-10 jam",
    difficulty: "hard",
    tips: [
      "Gunakan Jupyter Notebook untuk dokumentasi dan code sekaligus",
      "Visualisasikan data dari berbagai sudut pandang",
      "Gunakan statistical tests untuk memvalidasi temuan",
      "Jangan lupa untuk menulis markdown menjelaskan analisis"
    ]
  },
  {
    id: 5,
    title: "Portfolio Data Analyst - 3 Projects",
    description: "Buat portofolio data analyst dengan 3 project berbeda yang menunjukkan semua skill yang sudah dipelajari. Pilih 3 project dari daftar yang disediakan atau buat project sendiri. Setiap project harus menggunakan tools yang berbeda (Excel, SQL, Power BI, Python) dan menyelesaikan masalah bisnis nyata. Project ini adalah hasil dari semua pembelajaran di bulan 1-4.",
    month: 5,
    skillsTested: [
      "Semua skill Excel (Bulan 1)",
      "Semua skill SQL (Bulan 2)",
      "Semua skill Power BI (Bulan 3)",
      "Semua skill Python (Bulan 4)",
      "Data Storytelling",
      "Problem Solving",
      "Project Management",
      "Documentation",
      "Portfolio Presentation"
    ],
    deliverables: [
      "3 Project dengan tools berbeda (minimal 3 tools dari: Excel, SQL, Power BI, Python)",
      "Setiap project harus punya: Problem Statement, Data Analysis Process, Insight, Recommendation",
      "GitHub Repository untuk semua project code",
      "README.md untuk setiap project",
      "LinkedIn post membagikan project",
      "Portfolio website (opsional)"
    ],
    dataset: "Bebas memilih dataset (disarankan dari Kaggle atau data publik)",
    toolsUsed: ["Microsoft Excel", "SQL", "Power BI", "Python", "GitHub"],
    evaluationCriteria: [
      {
        category: "Project Relevance",
        weight: 20,
        description: "Project menyelesaikan masalah bisnis nyata"
      },
      {
        category: "Technical Skills",
        weight: 20,
        description: "Penggunaan tools yang tepat dan advanced"
      },
      {
        category: "Data Storytelling",
        weight: 20,
        description: "Penyajian insight yang jelas dan menarik"
      },
      {
        category: "Code Quality",
        weight: 15,
        description: "Code terstruktur dan ada dokumentasi"
      },
      {
        category: "Presentation",
        weight: 15,
        description: "Portfolio ditampilkan dengan profesional"
      },
      {
        category: "Creativity",
        weight: 10,
        description: "Ide project kreatif dan tidak mainstream"
      }
    ],
    estimatedTime: "20-25 jam",
    difficulty: "hard",
    tips: [
      "Pilih project yang sesuai dengan minat dan passion kamu",
      "Gunakan dataset yang clean dan menarik",
      "Fokus pada storytelling, bukan hanya technical",
      "Share portfolio di LinkedIn untuk feedback"
    ]
  },
  {
    id: 6,
    title: "Final Project - End to End Data Analysis",
    description: "Ini adalah final project yang menggabungkan semua skill yang sudah dipelajari selama 6 bulan. Kamu akan melakukan end-to-end data analysis dari awal sampai akhir: menentukan masalah bisnis, mengumpulkan data, membersihkan data, menganalisis data, membuat dashboard, dan mempresentasikan hasil ke stakeholder (dalam hal ini, kita yang akan menjadi stakeholder). Project ini adalah bukti bahwa kamu sudah siap menjadi Data Analyst.",
    month: 6,
    skillsTested: [
      "Problem Formulation",
      "Data Collection (SQL, API, Web Scraping)",
      "Data Cleaning (Excel, Python)",
      "Exploratory Data Analysis",
      "Statistical Analysis",
      "Data Visualization (Power BI, Python, Excel)",
      "Dashboard Creation",
      "Presentation & Storytelling",
      "Business Acumen",
      "Project Management"
    ],
    deliverables: [
      "Problem Statement Document",
      "Data Collection Script (SQL atau Python)",
      "Data Cleaning Report",
      "EDA Notebook (Python)",
      "Interactive Dashboard (Power BI atau Excel)",
      "Executive Summary (1 halaman)",
      "Presentation (PowerPoint atau Google Slides)",
      "GitHub Repository dengan semua file"
    ],
    dataset: "Dataset pilihan sendiri (bisa dari Kaggle, data publik, atau data perusahaan/UMKM)",
    toolsUsed: ["Excel", "SQL", "Power BI", "Python", "GitHub", "PowerPoint/Google Slides"],
    evaluationCriteria: [
      {
        category: "Problem Formulation",
        weight: 15,
        description: "Masalah bisnis didefinisikan dengan jelas dan relevan"
      },
      {
        category: "Data Collection & Cleaning",
        weight: 15,
        description: "Data berhasil dikumpulkan dan dibersihkan dengan benar"
      },
      {
        category: "Analysis Quality",
        weight: 20,
        description: "Analisis mendalam dan memberikan insight yang actionable"
      },
      {
        category: "Dashboard Design",
        weight: 15,
        description: "Dashboard interaktif, estetis, dan informatif"
      },
      {
        category: "Presentation",
        weight: 20,
        description: "Presentasi jelas, meyakinkan, dan profesional"
      },
      {
        category: "Documentation",
        weight: 10,
        description: "Dokumentasi lengkap dan terstruktur"
      },
      {
        category: "Creativity & Initiative",
        weight: 5,
        description: "Ide project kreatif dan inisiatif dalam menyelesaikan masalah"
      }
    ],
    estimatedTime: "20-30 jam",
    difficulty: "expert",
    tips: [
      "Pilih topik yang benar-benar kamu minati dan pahami",
      "Pastikan data yang digunakan cukup clean untuk dianalisis",
      "Fokus pada 'so what' dari setiap insight",
      "Latihan presentasi dengan teman atau keluarga",
      "Jadikan project ini sebagai portfolio utama untuk lamaran kerja"
    ]
  }
];

export const PROJECT_TEMPLATES = [
  {
    id: "t1",
    title: "Analisis Penjualan Retail",
    description: "Analisis data penjualan retail dengan 1000+ transaksi, 10+ produk, 5+ kategori, dan 12 bulan data.",
    datasetUrl: "https://www.kaggle.com/datasets/retail-sales",
    tools: ["Excel", "Power BI"],
    difficulty: "medium"
  },
  {
    id: "t2",
    title: "Analisis Churn Pelanggan",
    description: "Analisis churn pelanggan dengan data demografi, transaksi, dan interaksi customer service.",
    datasetUrl: "https://www.kaggle.com/datasets/customer-churn",
    tools: ["SQL", "Python"],
    difficulty: "hard"
  },
  {
    id: "t3",
    title: "Analisis Sentimen Media Sosial",
    description: "Analisis sentimen data Twitter/Instagram menggunakan NLP dan visualisasi.",
    datasetUrl: "https://www.kaggle.com/datasets/social-media-sentiment",
    tools: ["Python", "Power BI"],
    difficulty: "expert"
  },
  {
    id: "t4",
    title: "Dashboard Keuangan Perusahaan",
    description: "Dashboard keuangan dengan data profit/loss, cash flow, dan balance sheet.",
    datasetUrl: "https://www.kaggle.com/datasets/financial-data",
    tools: ["Excel", "Power BI"],
    difficulty: "medium"
  },
  {
    id: "t5",
    title: "Analisis Data Kesehatan",
    description: "Analisis data pasien, penyakit, pengobatan, dan efektivitas treatment.",
    datasetUrl: "https://www.kaggle.com/datasets/healthcare-data",
    tools: ["Python", "SQL"],
    difficulty: "hard"
  },
  {
    id: "t6",
    title: "Analisis Pemasaran Digital",
    description: "Analisis data Google Ads, Facebook Ads, dan email marketing campaign.",
    datasetUrl: "https://www.kaggle.com/datasets/marketing-data",
    tools: ["Excel", "Power BI", "Python"],
    difficulty: "medium"
  }
];

export const DATASET_RECOMMENDATIONS = [
  {
    id: "dr1",
    title: "Kaggle - 100+ Dataset untuk Data Analyst",
    url: "https://www.kaggle.com/datasets",
    description: "Kumpulan dataset gratis untuk latihan data analyst",
    category: "general"
  },
  {
    id: "dr2",
    title: "Data.gov - Data Pemerintah Indonesia",
    url: "https://data.go.id",
    description: "Dataset dari berbagai instansi pemerintah Indonesia",
    category: "indonesia"
  },
  {
    id: "dr3",
    title: "Google Dataset Search",
    url: "https://datasetsearch.research.google.com",
    description: "Mesin pencari dataset dari Google",
    category: "general"
  },
  {
    id: "dr4",
    title: "UCI Machine Learning Repository",
    url: "https://archive.ics.uci.edu",
    description: "Kumpulan dataset klasik untuk machine learning",
    category: "ml"
  },
  {
    id: "dr5",
    title: "WHO - Data Kesehatan Dunia",
    url: "https://www.who.int/data",
    description: "Dataset kesehatan dari World Health Organization",
    category: "health"
  },
  {
    id: "dr6",
    title: "World Bank Open Data",
    url: "https://data.worldbank.org",
    description: "Dataset ekonomi dan sosial dari World Bank",
    category: "economic"
  }
];
