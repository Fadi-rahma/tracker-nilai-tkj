// ===== TKJ Subject Database =====
const TKJ_SUBJECTS = {
    X: [
        { mapel: 'Dasar-Dasar Teknik Komputer dan Informatika', kategori: 'Produktif' },
        { mapel: 'Pemrograman Dasar', kategori: 'Produktif' },
        { mapel: 'Komputer dan Jaringan Dasar', kategori: 'Produktif' },
        { mapel: 'Sistem Komputer', kategori: 'Produktif' },
        { mapel: 'Pendidikan Agama dan Budi Pekerti', kategori: 'Normatif' },
        { mapel: 'PPKn', kategori: 'Normatif' },
        { mapel: 'Bahasa Indonesia', kategori: 'Normatif' },
        { mapel: 'PJOK', kategori: 'Normatif' },
        { mapel: 'Matematika', kategori: 'Adaptif' },
        { mapel: 'Bahasa Inggris', kategori: 'Adaptif' },
        { mapel: 'Seni Budaya', kategori: 'Normatif' }
    ],
    XI: [
        { mapel: 'Teknologi Jaringan Berbasis Luas (WAN)', kategori: 'Produktif' },
        { mapel: 'Administrasi Infrastruktur Jaringan', kategori: 'Produktif' },
        { mapel: 'Administrasi Sistem Jaringan', kategori: 'Produktif' },
        { mapel: 'Produk Kreatif dan Kewirausahaan', kategori: 'Muatan Lokal' },
        { mapel: 'Pendidikan Agama dan Budi Pekerti', kategori: 'Normatif' },
        { mapel: 'PPKn', kategori: 'Normatif' },
        { mapel: 'Bahasa Indonesia', kategori: 'Normatif' },
        { mapel: 'PJOK', kategori: 'Normatif' },
        { mapel: 'Matematika', kategori: 'Adaptif' },
        { mapel: 'Bahasa Inggris', kategori: 'Adaptif' }
    ],
    XII: [
        { mapel: 'Teknologi Layanan Jaringan', kategori: 'Produktif' },
        { mapel: 'Keamanan Jaringan', kategori: 'Produktif' },
        { mapel: 'Troubleshooting Jaringan', kategori: 'Produktif' },
        { mapel: 'Produk Kreatif dan Kewirausahaan', kategori: 'Muatan Lokal' },
        { mapel: 'Pendidikan Agama dan Budi Pekerti', kategori: 'Normatif' },
        { mapel: 'PPKn', kategori: 'Normatif' },
        { mapel: 'Bahasa Indonesia', kategori: 'Normatif' },
        { mapel: 'Matematika', kategori: 'Adaptif' },
        { mapel: 'Bahasa Inggris', kategori: 'Adaptif' }
    ]
};

// ===== State =====
let dataNilai = []; // Array of { tahun, semester, mapel, kategori, nilai }
let currentTahun = 'X';
let currentSemester = 1;
let currentSection = 'profile';
let chartInstance = null;

// ===== Inisialisasi =====
document.addEventListener('DOMContentLoaded', () => {
    loadData();
    initDefaultData();
    initNavigation();
    initTahunTabs();
    initSemesterTabs();
    initChartButtons();
    renderTable();
    renderSemuaStatistik();
    renderChart('progress');
});

// ===== Data Persistence =====
function loadData() {
    const saved = localStorage.getItem('nilaiTKJ_data');
    if (saved) {
        try {
            dataNilai = JSON.parse(saved);
        } catch (e) {
            dataNilai = [];
        }
    }
    
    const savedProfil = localStorage.getItem('nilaiTKJ_profil');
    if (savedProfil) {
        try {
            const profil = JSON.parse(savedProfil);
            document.getElementById('nama').value = profil.nama || '';
            document.getElementById('nis').value = profil.nis || '';
            document.getElementById('kelas').value = profil.kelas || '';
            document.getElementById('tahun').value = profil.tahun || '';
        } catch (e) {
            // corrupted profile data, ignore
        }
    }
}

function simpanData() {
    localStorage.setItem('nilaiTKJ_data', JSON.stringify(dataNilai));
}

function simpanProfil() {
    const profil = {
        nama: document.getElementById('nama').value,
        nis: document.getElementById('nis').value,
        kelas: document.getElementById('kelas').value,
        tahun: document.getElementById('tahun').value
    };
    localStorage.setItem('nilaiTKJ_profil', JSON.stringify(profil));
    showToast('Profil berhasil disimpan!');
}

// ===== Default Data (first time) =====
function initDefaultData() {
    if (dataNilai.length > 0) return;
    
    const sampleData = [
        // Kelas X - Semester 1
        { tahun: 'X', semester: 1, mapel: 'Dasar-Dasar Teknik Komputer dan Informatika', kategori: 'Produktif', nilai: 85 },
        { tahun: 'X', semester: 1, mapel: 'Pemrograman Dasar', kategori: 'Produktif', nilai: 78 },
        { tahun: 'X', semester: 1, mapel: 'Komputer dan Jaringan Dasar', kategori: 'Produktif', nilai: 82 },
        { tahun: 'X', semester: 1, mapel: 'Sistem Komputer', kategori: 'Produktif', nilai: 80 },
        { tahun: 'X', semester: 1, mapel: 'Pendidikan Agama dan Budi Pekerti', kategori: 'Normatif', nilai: 90 },
        { tahun: 'X', semester: 1, mapel: 'PPKn', kategori: 'Normatif', nilai: 88 },
        { tahun: 'X', semester: 1, mapel: 'Bahasa Indonesia', kategori: 'Normatif', nilai: 85 },
        { tahun: 'X', semester: 1, mapel: 'PJOK', kategori: 'Normatif', nilai: 92 },
        { tahun: 'X', semester: 1, mapel: 'Matematika', kategori: 'Adaptif', nilai: 75 },
        { tahun: 'X', semester: 1, mapel: 'Bahasa Inggris', kategori: 'Adaptif', nilai: 80 },
        { tahun: 'X', semester: 1, mapel: 'Seni Budaya', kategori: 'Normatif', nilai: 88 },
        
        // Kelas X - Semester 2
        { tahun: 'X', semester: 2, mapel: 'Dasar-Dasar Teknik Komputer dan Informatika', kategori: 'Produktif', nilai: 87 },
        { tahun: 'X', semester: 2, mapel: 'Pemrograman Dasar', kategori: 'Produktif', nilai: 82 },
        { tahun: 'X', semester: 2, mapel: 'Komputer dan Jaringan Dasar', kategori: 'Produktif', nilai: 85 },
        { tahun: 'X', semester: 2, mapel: 'Sistem Komputer', kategori: 'Produktif', nilai: 83 },
        { tahun: 'X', semester: 2, mapel: 'Pendidikan Agama dan Budi Pekerti', kategori: 'Normatif', nilai: 90 },
        { tahun: 'X', semester: 2, mapel: 'PPKn', kategori: 'Normatif', nilai: 86 },
        { tahun: 'X', semester: 2, mapel: 'Bahasa Indonesia', kategori: 'Normatif', nilai: 87 },
        { tahun: 'X', semester: 2, mapel: 'PJOK', kategori: 'Normatif', nilai: 93 },
        { tahun: 'X', semester: 2, mapel: 'Matematika', kategori: 'Adaptif', nilai: 78 },
        { tahun: 'X', semester: 2, mapel: 'Bahasa Inggris', kategori: 'Adaptif', nilai: 82 },
        { tahun: 'X', semester: 2, mapel: 'Seni Budaya', kategori: 'Normatif', nilai: 90 },
        
        // Kelas XI - Semester 1
        { tahun: 'XI', semester: 1, mapel: 'Teknologi Jaringan Berbasis Luas (WAN)', kategori: 'Produktif', nilai: 84 },
        { tahun: 'XI', semester: 1, mapel: 'Administrasi Infrastruktur Jaringan', kategori: 'Produktif', nilai: 80 },
        { tahun: 'XI', semester: 1, mapel: 'Administrasi Sistem Jaringan', kategori: 'Produktif', nilai: 86 },
        { tahun: 'XI', semester: 1, mapel: 'Produk Kreatif dan Kewirausahaan', kategori: 'Muatan Lokal', nilai: 88 },
        { tahun: 'XI', semester: 1, mapel: 'Pendidikan Agama dan Budi Pekerti', kategori: 'Normatif', nilai: 91 },
        { tahun: 'XI', semester: 1, mapel: 'PPKn', kategori: 'Normatif', nilai: 87 },
        { tahun: 'XI', semester: 1, mapel: 'Bahasa Indonesia', kategori: 'Normatif', nilai: 86 },
        { tahun: 'XI', semester: 1, mapel: 'PJOK', kategori: 'Normatif', nilai: 90 },
        { tahun: 'XI', semester: 1, mapel: 'Matematika', kategori: 'Adaptif', nilai: 79 },
        { tahun: 'XI', semester: 1, mapel: 'Bahasa Inggris', kategori: 'Adaptif', nilai: 83 },
        
        // Kelas XI - Semester 2
        { tahun: 'XI', semester: 2, mapel: 'Teknologi Jaringan Berbasis Luas (WAN)', kategori: 'Produktif', nilai: 86 },
        { tahun: 'XI', semester: 2, mapel: 'Administrasi Infrastruktur Jaringan', kategori: 'Produktif', nilai: 83 },
        { tahun: 'XI', semester: 2, mapel: 'Administrasi Sistem Jaringan', kategori: 'Produktif', nilai: 88 },
        { tahun: 'XI', semester: 2, mapel: 'Produk Kreatif dan Kewirausahaan', kategori: 'Muatan Lokal', nilai: 90 },
        { tahun: 'XI', semester: 2, mapel: 'Pendidikan Agama dan Budi Pekerti', kategori: 'Normatif', nilai: 92 },
        { tahun: 'XI', semester: 2, mapel: 'PPKn', kategori: 'Normatif', nilai: 89 },
        { tahun: 'XI', semester: 2, mapel: 'Bahasa Indonesia', kategori: 'Normatif', nilai: 88 },
        { tahun: 'XI', semester: 2, mapel: 'PJOK', kategori: 'Normatif', nilai: 92 },
        { tahun: 'XI', semester: 2, mapel: 'Matematika', kategori: 'Adaptif', nilai: 81 },
        { tahun: 'XI', semester: 2, mapel: 'Bahasa Inggris', kategori: 'Adaptif', nilai: 85 },
        
        // Kelas XII - Semester 1
        { tahun: 'XII', semester: 1, mapel: 'Teknologi Layanan Jaringan', kategori: 'Produktif', nilai: 87 },
        { tahun: 'XII', semester: 1, mapel: 'Keamanan Jaringan', kategori: 'Produktif', nilai: 85 },
        { tahun: 'XII', semester: 1, mapel: 'Troubleshooting Jaringan', kategori: 'Produktif', nilai: 90 },
        { tahun: 'XII', semester: 1, mapel: 'Produk Kreatif dan Kewirausahaan', kategori: 'Muatan Lokal', nilai: 92 },
        { tahun: 'XII', semester: 1, mapel: 'Pendidikan Agama dan Budi Pekerti', kategori: 'Normatif', nilai: 93 },
        { tahun: 'XII', semester: 1, mapel: 'PPKn', kategori: 'Normatif', nilai: 90 },
        { tahun: 'XII', semester: 1, mapel: 'Bahasa Indonesia', kategori: 'Normatif', nilai: 89 },
        { tahun: 'XII', semester: 1, mapel: 'Matematika', kategori: 'Adaptif', nilai: 83 },
        { tahun: 'XII', semester: 1, mapel: 'Bahasa Inggris', kategori: 'Adaptif', nilai: 86 },
        
        // Kelas XII - Semester 2
        { tahun: 'XII', semester: 2, mapel: 'Teknologi Layanan Jaringan', kategori: 'Produktif', nilai: 89 },
        { tahun: 'XII', semester: 2, mapel: 'Keamanan Jaringan', kategori: 'Produktif', nilai: 87 },
        { tahun: 'XII', semester: 2, mapel: 'Troubleshooting Jaringan', kategori: 'Produktif', nilai: 92 },
        { tahun: 'XII', semester: 2, mapel: 'Produk Kreatif dan Kewirausahaan', kategori: 'Muatan Lokal', nilai: 93 },
        { tahun: 'XII', semester: 2, mapel: 'Pendidikan Agama dan Budi Pekerti', kategori: 'Normatif', nilai: 94 },
        { tahun: 'XII', semester: 2, mapel: 'PPKn', kategori: 'Normatif', nilai: 91 },
        { tahun: 'XII', semester: 2, mapel: 'Bahasa Indonesia', kategori: 'Normatif', nilai: 90 },
        { tahun: 'XII', semester: 2, mapel: 'Matematika', kategori: 'Adaptif', nilai: 85 },
        { tahun: 'XII', semester: 2, mapel: 'Bahasa Inggris', kategori: 'Adaptif', nilai: 87 },
    ];
    
    dataNilai = sampleData;
    simpanData();
}

// ===== Navigation =====
function initNavigation() {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', () => {
            const section = item.dataset.section;
            if (!section) return;
            
            // Update active nav
            document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
            item.classList.add('active');
            
            // Update active section
            document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
            document.getElementById(`${section}-section`).classList.add('active');
            currentSection = section;
            
            // Render stats/stats if switching to that section
            if (section === 'stats') {
                renderSemuaStatistik();
                renderChart('progress');
            }
        });
    });
}

// ===== Tahun Tabs =====
function initTahunTabs() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentTahun = btn.dataset.tahun;
            
            // Update semester tabs based on year
            updateSemesterTabs();
            renderTable();
        });
    });
}

function updateSemesterTabs() {
    const maxSemester = currentTahun === 'X' ? 2 : (currentTahun === 'XI' ? 2 : 2);
    
    document.querySelectorAll('.sem-btn').forEach((btn, i) => {
        const sem = i + 1;
        if (sem <= maxSemester) {
            btn.style.display = 'block';
        } else {
            btn.style.display = 'none';
        }
    });
    
    // Reset to semester 1 if current is beyond max
    if (currentSemester > maxSemester) {
        currentSemester = 1;
        document.querySelectorAll('.sem-btn').forEach(b => b.classList.remove('active'));
        document.querySelector('.sem-btn[data-semester="1"]')?.classList.add('active');
    }
}

// ===== Semester Tabs =====
function initSemesterTabs() {
    document.querySelectorAll('.sem-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.sem-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentSemester = parseInt(btn.dataset.semester);
            renderTable();
        });
    });
}

// ===== Grade Functions =====
function getGradeColor(nilai) {
    if (nilai >= 90) return 'A';
    if (nilai >= 80) return 'B';
    if (nilai >= 70) return 'C';
    if (nilai >= 60) return 'D';
    return 'E';
}

function getPredikat(nilai) {
    if (nilai >= 90) return 'Sangat Baik';
    if (nilai >= 80) return 'Baik';
    if (nilai >= 70) return 'Cukup';
    if (nilai >= 60) return 'Kurang';
    return 'Sangat Kurang';
}

function getKategoriClass(kategori) {
    const map = {
        'Produktif': 'kategori-produktif',
        'Normatif': 'kategori-normatif',
        'Adaptif': 'kategori-adaptif',
        'Muatan Lokal': 'kategori-muatan'
    };
    return map[kategori] || 'kategori-normatif';
}

function renderTable() {
    const tbody = document.getElementById('grades-body');
    const filtered = dataNilai.filter(d => d.tahun === currentTahun && d.semester === currentSemester);
    
    if (filtered.length === 0) {
        tbody.innerHTML = `
            <tr class="empty-row">
                <td colspan="7">
                    <div class="empty-icon">📋</div>
                    Belum ada data nilai untuk ${currentTahun} Semester ${currentSemester}.<br>
                    Klik "Tambah Nilai" untuk menambahkan atau pilih tahun/semester lain.
                </td>
            </tr>
        `;
        updateSummary([]);
        return;
    }
    
    // Sort by kategori then mapel
    filtered.sort((a, b) => {
        const kategoriOrder = { 'Produktif': 0, 'Normatif': 1, 'Adaptif': 2, 'Muatan Lokal': 3 };
        const ka = kategoriOrder[a.kategori] || 99;
        const kb = kategoriOrder[b.kategori] || 99;
        if (ka !== kb) return ka - kb;
        return a.mapel.localeCompare(b.mapel);
    });
    
    let html = '';
    filtered.forEach((d, i) => {
        const grade = getGradeColor(d.nilai);
        const predikat = getPredikat(d.nilai);
        const findex = dataNilai.indexOf(d);
        html += `
            <tr>
                <td style="text-align:center;font-weight:600;color:var(--text-muted)">${i + 1}</td>
                <td><strong>${d.mapel}</strong></td>
                <td><span class="kategori-badge ${getKategoriClass(d.kategori)}">${d.kategori}</span></td>
                <td style="font-weight:700;font-size:16px">${d.nilai}</td>
                <td><span class="grade-badge grade-${grade}">${grade}</span></td>
                <td><span class="predikat">${predikat}</span></td>
                <td>
                    <div class="aksi-cell">
                        <button class="btn-icon edit" onclick="editNilai(${findex})" title="Edit">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                            </svg>
                        </button>
                        <button class="btn-icon delete" onclick="hapusNilai(${findex})" title="Hapus">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
                            </svg>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    });
    
    tbody.innerHTML = html;
    updateSummary(filtered);
}

function updateSummary(filtered) {
    const values = filtered.map(d => d.nilai);
    const avg = values.length > 0 ? (values.reduce((a, b) => a + b, 0) / values.length) : 0;
    const max = values.length > 0 ? Math.max(...values) : 0;
    const min = values.length > 0 ? Math.min(...values) : 0;
    
    document.getElementById('avg-value').textContent = avg.toFixed(1).replace('.', ',');
    document.getElementById('max-value').textContent = max;
    document.getElementById('min-value').textContent = min;
    document.getElementById('count-value').textContent = filtered.length;
}

// ===== Modal Functions =====
function tambahNilai() {
    document.getElementById('modal-title').textContent = 'Tambah Nilai';
    document.getElementById('edit-index').value = '';
    document.getElementById('edit-tahun').value = currentTahun;
    document.getElementById('edit-semester').value = currentSemester;
    document.getElementById('mapel-name').value = '';
    document.getElementById('mapel-nilai').value = '';
    document.getElementById('mapel-kategori').value = 'Produktif';
    
    // Update datalist with subjects for current tahun
    updateMapelDatalist(currentTahun);
    
    document.getElementById('modal-overlay').classList.add('open');
}

function editNilai(index) {
    const d = dataNilai[index];
    if (!d) return;
    
    document.getElementById('modal-title').textContent = 'Edit Nilai';
    document.getElementById('edit-index').value = index;
    document.getElementById('edit-tahun').value = d.tahun;
    document.getElementById('edit-semester').value = d.semester;
    document.getElementById('mapel-name').value = d.mapel;
    document.getElementById('mapel-kategori').value = d.kategori;
    document.getElementById('mapel-nilai').value = d.nilai;
    
    updateMapelDatalist(d.tahun);
    
    document.getElementById('modal-overlay').classList.add('open');
}

function updateMapelDatalist(tahun) {
    const datalist = document.getElementById('mapel-list');
    const t = tahun || document.getElementById('edit-tahun').value || currentTahun;
    const subjects = TKJ_SUBJECTS[t] || [];
    datalist.innerHTML = subjects.map(s => `<option value="${s.mapel}">`).join('');
}

function tutupModal() {
    document.getElementById('modal-overlay').classList.remove('open');
}

function simpanNilai() {
    const mapel = document.getElementById('mapel-name').value.trim();
    const kategori = document.getElementById('mapel-kategori').value;
    const nilai = parseInt(document.getElementById('mapel-nilai').value);
    const editIndex = document.getElementById('edit-index').value;
    const tahun = document.getElementById('edit-tahun').value;
    const semester = parseInt(document.getElementById('edit-semester').value);
    
    // Validation
    if (!mapel) {
        showToast('⚠️ Mohon isi nama mata pelajaran!');
        return;
    }
    
    if (isNaN(nilai) || nilai < 0 || nilai > 100) {
        showToast('⚠️ Nilai harus antara 0 - 100!');
        return;
    }
    
    if (editIndex !== '' && editIndex !== null) {
        // Edit existing
        const idx = parseInt(editIndex);
        if (dataNilai[idx]) {
            dataNilai[idx].mapel = mapel;
            dataNilai[idx].kategori = kategori;
            dataNilai[idx].nilai = nilai;
            dataNilai[idx].tahun = tahun;
            dataNilai[idx].semester = semester;
        }
        showToast('✅ Nilai berhasil diperbarui!');
    } else {
        // Add new
        dataNilai.push({ tahun, semester, mapel, kategori, nilai });
        showToast('✅ Nilai berhasil ditambahkan!');
    }
    
    simpanData();
    tutupModal();
    renderTable();
}

function hapusNilai(index) {
    if (!confirm('Yakin ingin menghapus nilai ini?')) return;
    
    dataNilai.splice(index, 1);
    simpanData();
    renderTable();
    showToast('🗑️ Nilai berhasil dihapus!');
}

// ===== Statistics =====
function renderSemuaStatistik() {
    // Average per year
    ['X', 'XI', 'XII'].forEach(tahun => {
        const filtered = dataNilai.filter(d => d.tahun === tahun);
        const values = filtered.map(d => d.nilai);
        const avg = values.length > 0 ? (values.reduce((a, b) => a + b, 0) / values.length) : 0;
        
        document.getElementById(`avg-${tahun.toLowerCase()}`).textContent = avg > 0 ? avg.toFixed(1).replace('.', ',') : '-';
        
        // Trend
        const sem1 = filtered.filter(d => d.semester === 1).map(d => d.nilai);
        const sem2 = filtered.filter(d => d.semester === 2).map(d => d.nilai);
        const avg1 = sem1.length > 0 ? sem1.reduce((a, b) => a + b, 0) / sem1.length : 0;
        const avg2 = sem2.length > 0 ? sem2.reduce((a, b) => a + b, 0) / sem2.length : 0;
        
        const trendEl = document.getElementById(`trend-${tahun.toLowerCase()}`);
        if (avg1 > 0 && avg2 > 0) {
            const diff = avg2 - avg1;
            const arrow = diff >= 0 ? '📈' : '📉';
            const sign = diff >= 0 ? '+' : '';
            trendEl.textContent = `${arrow} ${sign}${diff.toFixed(1).replace('.', ',')} poin (Sem ${1}→${2})`;
        } else if (avg > 0) {
            trendEl.textContent = '📊 Data tersedia';
        } else {
            trendEl.textContent = 'Belum ada data';
        }
    });
    
    // Overall average
    const allValues = dataNilai.map(d => d.nilai);
    const allAvg = allValues.length > 0 ? (allValues.reduce((a, b) => a + b, 0) / allValues.length) : 0;
    document.getElementById('avg-total').textContent = allAvg > 0 ? allAvg.toFixed(1).replace('.', ',') : '-';
    document.getElementById('trend-total').textContent = allValues.length > 0 ? `${dataNilai.length} data nilai tercatat` : '-';
    
    // Best & Worst subjects (by average across all semesters)
    renderBestWorst();
}

function renderBestWorst() {
    // Group by mapel
    const mapelMap = {};
    dataNilai.forEach(d => {
        if (!mapelMap[d.mapel]) {
            mapelMap[d.mapel] = [];
        }
        mapelMap[d.mapel].push(d.nilai);
    });
    
    const averages = Object.entries(mapelMap).map(([mapel, values]) => ({
        mapel,
        avg: values.reduce((a, b) => a + b, 0) / values.length,
        count: values.length
    })).filter(a => a.count >= 2); // Only subjects with at least 2 entries
    
    if (averages.length === 0) {
        document.getElementById('best-subject').textContent = 'Belum ada data';
        document.getElementById('worst-subject').textContent = 'Belum ada data';
        return;
    }
    
    averages.sort((a, b) => b.avg - a.avg);
    
    const best = averages[0];
    const worst = averages[averages.length - 1];
    
    document.getElementById('best-subject').textContent = `${best.mapel} (${best.avg.toFixed(1).replace('.', ',')})`;
    document.getElementById('worst-subject').textContent = `${worst.mapel} (${worst.avg.toFixed(1).replace('.', ',')})`;
}

// ===== Charts =====
function initChartButtons() {
    document.querySelectorAll('.chart-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.chart-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderChart(btn.dataset.chart);
        });
    });
}

function renderChart(type) {
    if (chartInstance) {
        chartInstance.destroy();
        chartInstance = null;
    }
    
    // Show canvas, hide empty state
    const canvas = document.getElementById('mainChart');
    const emptyState = document.getElementById('chart-empty');
    canvas.style.display = 'block';
    emptyState.style.display = 'none';
    
    const ctx = canvas.getContext('2d');
    
    if (type === 'progress') {
        renderProgressChart(ctx);
    } else if (type === 'all') {
        renderAllValuesChart(ctx);
    } else if (type === 'radar') {
        renderRadarChart(ctx);
    }
}

function showChartEmptyState() {
    if (chartInstance) {
        chartInstance.destroy();
        chartInstance = null;
    }
    document.getElementById('mainChart').style.display = 'none';
    document.getElementById('chart-empty').style.display = 'flex';
}

function renderProgressChart(ctx) {
    const labels = [];
    const data = [];
    
    const semesters = [
        { tahun: 'X', semester: 1, label: 'X - Sem 1' },
        { tahun: 'X', semester: 2, label: 'X - Sem 2' },
        { tahun: 'XI', semester: 1, label: 'XI - Sem 1' },
        { tahun: 'XI', semester: 2, label: 'XI - Sem 2' },
        { tahun: 'XII', semester: 1, label: 'XII - Sem 1' },
        { tahun: 'XII', semester: 2, label: 'XII - Sem 2' },
    ];
    
    let hasData = false;
    semesters.forEach(sem => {
        const filtered = dataNilai.filter(d => d.tahun === sem.tahun && d.semester === sem.semester);
        const values = filtered.map(d => d.nilai);
        if (values.length > 0) {
            const avg = values.reduce((a, b) => a + b, 0) / values.length;
            labels.push(sem.label);
            data.push(parseFloat(avg.toFixed(1)));
            hasData = true;
        }
    });
    
    if (!hasData) {
        showChartEmptyState();
        return;
    }
    
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, 'rgba(37, 99, 235, 0.25)');
    gradient.addColorStop(1, 'rgba(37, 99, 235, 0.01)');
    
    chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Rata-rata Nilai',
                data: data,
                borderColor: '#2563eb',
                backgroundColor: gradient,
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#2563eb',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 5,
                pointHoverRadius: 7,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        font: { family: 'Inter', size: 12, weight: '600' },
                        color: '#475569',
                        padding: 16,
                        usePointStyle: true,
                        pointStyle: 'circle',
                    }
                },
                tooltip: {
                    backgroundColor: '#0f172a',
                    titleFont: { family: 'Inter', size: 13, weight: '600' },
                    bodyFont: { family: 'Inter', size: 12 },
                    padding: 12,
                    cornerRadius: 8,
                    callbacks: {
                        label: function(context) {
                            return `Rata-rata: ${context.parsed.y}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    min: 0,
                    max: 100,
                    ticks: {
                        stepSize: 20,
                        font: { family: 'Inter', size: 11 },
                        color: '#94a3b8',
                        callback: function(value) {
                            return value;
                        }
                    },
                    grid: {
                        color: 'rgba(226, 232, 240, 0.5)',
                        drawBorder: false,
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: { family: 'Inter', size: 11, weight: '600' },
                        color: '#64748b',
                    }
                }
            }
        }
    });
}

function renderAllValuesChart(ctx) {
    const labels = [];
    const produktifData = [];
    const normatifData = [];
    const adaptifData = [];
    const lokalData = [];
    // Group by subject
    const subjectMap = {};
    dataNilai.forEach(d => {
        const key = `${d.tahun} - Sem ${d.semester}`;
        if (!subjectMap[key]) {
            subjectMap[key] = { produktif: [], normatif: [], adaptif: [], lokal: [] };
        }
        if (d.kategori === 'Produktif') subjectMap[key].produktif.push(d.nilai);
        else if (d.kategori === 'Normatif') subjectMap[key].normatif.push(d.nilai);
        else if (d.kategori === 'Adaptif') subjectMap[key].adaptif.push(d.nilai);
        else if (d.kategori === 'Muatan Lokal') subjectMap[key].lokal.push(d.nilai);
    });
    
    // Sort semesters
    const semOrder = ['X', 'XI', 'XII'];
    const sortedKeys = Object.keys(subjectMap).sort((a, b) => {
        const [tA] = a.split(' - ');
        const [tB] = b.split(' - ');
        const orderA = semOrder.indexOf(tA);
        const orderB = semOrder.indexOf(tB);
        if (orderA !== orderB) return orderA - orderB;
        return a.localeCompare(b);
    });
    
    sortedKeys.forEach(key => {
        const d = subjectMap[key];
        const avg = arr => arr.length > 0 ? arr.reduce((a, b) => a + b, 0) / arr.length : null;
        
        labels.push(key);
        produktifData.push(avg(d.produktif));
        normatifData.push(avg(d.normatif));
        adaptifData.push(avg(d.adaptif));
        lokalData.push(avg(d.lokal));
    });
    
    if (labels.length === 0) {
        showChartEmptyState();
        return;
    }
    
    chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Produktif',
                    data: produktifData,
                    backgroundColor: 'rgba(37, 99, 235, 0.75)',
                    borderColor: '#2563eb',
                    borderWidth: 1,
                    borderRadius: 4,
                },
                {
                    label: 'Normatif',
                    data: normatifData,
                    backgroundColor: 'rgba(16, 185, 129, 0.75)',
                    borderColor: '#10b981',
                    borderWidth: 1,
                    borderRadius: 4,
                },
                {
                    label: 'Adaptif',
                    data: adaptifData,
                    backgroundColor: 'rgba(245, 158, 11, 0.75)',
                    borderColor: '#f59e0b',
                    borderWidth: 1,
                    borderRadius: 4,
                },
                {
                    label: 'Muatan Lokal',
                    data: lokalData,
                    backgroundColor: 'rgba(139, 92, 246, 0.75)',
                    borderColor: '#8b5cf6',
                    borderWidth: 1,
                    borderRadius: 4,
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        font: { family: 'Inter', size: 11, weight: '600' },
                        color: '#475569',
                        usePointStyle: true,
                        pointStyle: 'circle',
                        padding: 14,
                    }
                },
                tooltip: {
                    backgroundColor: '#0f172a',
                    titleFont: { family: 'Inter', size: 13, weight: '600' },
                    bodyFont: { family: 'Inter', size: 12 },
                    padding: 12,
                    cornerRadius: 8,
                    callbacks: {
                        label: function(context) {
                            if (context.parsed.y === null) return `${context.dataset.label}: -`;
                            return `${context.dataset.label}: ${context.parsed.y}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        font: { family: 'Inter', size: 11 },
                        color: '#94a3b8',
                    },
                    grid: {
                        color: 'rgba(226, 232, 240, 0.5)',
                        drawBorder: false,
                    }
                },
                x: {
                    grid: { display: false },
                    ticks: {
                        font: { family: 'Inter', size: 10, weight: '600' },
                        color: '#64748b',
                    }
                }
            }
        }
    });
}

function renderRadarChart(ctx) {
    // Get averages by kategori for each year
    const kategoris = ['Produktif', 'Normatif', 'Adaptif'];
    const tahuns = ['X', 'XI', 'XII'];
    
    const datasets = tahuns.map(tahun => {
        const filtered = dataNilai.filter(d => d.tahun === tahun);
        const data = kategoris.map(kat => {
            const katData = filtered.filter(d => d.kategori === kat).map(d => d.nilai);
            if (katData.length === 0) return null;
            return parseFloat((katData.reduce((a, b) => a + b, 0) / katData.length).toFixed(1));
        });
        
        const colorMap = {
            'X': { bg: 'rgba(37, 99, 235, 0.15)', border: '#2563eb' },
            'XI': { bg: 'rgba(16, 185, 129, 0.15)', border: '#10b981' },
            'XII': { bg: 'rgba(245, 158, 11, 0.15)', border: '#f59e0b' },
        };
        
        return {
            label: `Kelas ${tahun}`,
            data: data,
            backgroundColor: colorMap[tahun].bg,
            borderColor: colorMap[tahun].border,
            borderWidth: 2,
            pointBackgroundColor: colorMap[tahun].border,
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 4,
        };
    });
    
    // If no data at all, show empty state
    const hasAnyData = datasets.some(ds => ds.data.some(v => v !== null));
    if (!hasAnyData) {
        showChartEmptyState();
        return;
    }
    
    chartInstance = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: kategoris,
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        font: { family: 'Inter', size: 11, weight: '600' },
                        color: '#475569',
                        usePointStyle: true,
                        pointStyle: 'circle',
                        padding: 14,
                    }
                },
                tooltip: {
                    backgroundColor: '#0f172a',
                    titleFont: { family: 'Inter', size: 13, weight: '600' },
                    bodyFont: { family: 'Inter', size: 12 },
                    padding: 12,
                    cornerRadius: 8,
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        stepSize: 20,
                        font: { family: 'Inter', size: 10 },
                        color: '#94a3b8',
                        backdropColor: 'transparent',
                    },
                    grid: {
                        color: 'rgba(226, 232, 240, 0.6)',
                    },
                    angleLines: {
                        color: 'rgba(226, 232, 240, 0.6)',
                    },
                    pointLabels: {
                        font: { family: 'Inter', size: 12, weight: '600' },
                        color: '#334155',
                    }
                }
            }
        }
    });
}

// ===== Toast Notification =====
function showToast(message) {
    const toast = document.getElementById('toast');
    const msgEl = document.getElementById('toast-message');
    msgEl.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ===== Keyboard Support =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        tutupModal();
    }
    
    if (e.key === 'Enter' && document.getElementById('modal-overlay').classList.contains('open')) {
        simpanNilai();
    }
});

// Expose functions globally
window.simpanProfil = simpanProfil;
window.tambahNilai = tambahNilai;
window.editNilai = editNilai;
window.hapusNilai = hapusNilai;
window.simpanNilai = simpanNilai;
window.tutupModal = tutupModal;
