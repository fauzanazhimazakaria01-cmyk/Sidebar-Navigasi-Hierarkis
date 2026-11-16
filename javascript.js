/**
 * Data awal repositori dokumen proyek PT M2 & PT M4
 */
let documents = [
  {
    id: 1,
    title: "Spesifikasi Kebutuhan Fungsional PT M2",
    category: "Fungsional M2",
    pic: "Budi Santoso",
    status: "Approved"
  },
  {
    id: 2,
    title: "Arsitektur Log & Monitoring PT M4",
    category: "Operasional M4",
    pic: "Siti Aminah",
    status: "Review"
  },
  {
    id: 3,
    title: "Laporan Kepatuhan SLA Q4",
    category: "Audit",
    pic: "Andi Pratama",
    status: "Review"
  }
];

// Seleksi Elemen DOM
const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");
const docForm = document.getElementById("docForm");
const docTableBody = document.getElementById("docTableBody");
const searchInput = document.getElementById("searchInput");
const statusFilter = document.getElementById("statusFilter");

// Elemen Penghitung (Counters)
const docCounter = document.getElementById("docCounter");
const approvedCount = document.getElementById("approvedCount");
const reviewCount = document.getElementById("reviewCount");

/**
 * 1. Interaksi Toggle Sidebar Navigasi
 */
menuToggle.addEventListener("click", () => {
  sidebar.classList.toggle("collapsed");
});

/**
 * 2. Memperbarui Statistik Metrik KPI
 */
function updateCounters() {
  docCounter.textContent = documents.length;
  approvedCount.textContent = documents.filter(doc => doc.status === "Approved").length;
  reviewCount.textContent = documents.filter(doc => doc.status === "Review").length;
}

/**
 * 3. Merender Tabel Dokumen Berdasarkan Pencarian & Filter
 */
function renderDocuments() {
  const keyword = searchInput.value.toLowerCase().trim();
  const selectedStatus = statusFilter.value;

  const filteredDocs = documents.filter(doc => {
    const matchesKeyword =
      doc.title.toLowerCase().includes(keyword) ||
      doc.pic.toLowerCase().includes(keyword);
    const matchesStatus =
      selectedStatus === "ALL" || doc.status === selectedStatus;
    return matchesKeyword && matchesStatus;
  });

  docTableBody.innerHTML = "";

  if (filteredDocs.length === 0) {
    docTableBody.innerHTML = `
      <tr>
        <td colspan="5" style="text-align:center; color: var(--color-text-muted);">
          Tidak ada dokumen yang sesuai dengan kriteria pencarian.
        </td>
      </tr>
    `;
    return;
  }

  filteredDocs.forEach(doc => {
    const badgeClass = doc.status === "Approved" ? "badge-approved" : "badge-review";
    const toggleText = doc.status === "Approved" ? "Set Review" : "Approve";

    const row = document.createElement("tr");
    row.innerHTML = `
      <td><strong>${escapeHTML(doc.title)}</strong></td>
      <td>${escapeHTML(doc.category)}</td>
      <td>${escapeHTML(doc.pic)}</td>
      <td><span class="badge ${badgeClass}">${doc.status}</span></td>
      <td>
        <button type="button" class="btn-action" data-id="${doc.id}">
          ${toggleText}
        </button>
      </td>
    `;
    docTableBody.appendChild(row);
  });

  updateCounters();
}

/**
 * 4. Validasi Form & Penambahan Dokumen Baru
 */
docForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const titleInput = document.getElementById("docTitle");
  const picInput = document.getElementById("docPic");
  const categoryInput = document.getElementById("docCategory");

  const titleError = document.getElementById("titleError");
  const picError = document.getElementById("picError");
  const categoryError = document.getElementById("categoryError");

  // Reset pesan error
  titleError.textContent = "";
  picError.textContent = "";
  categoryError.textContent = "";

  let isValid = true;

  if (titleInput.value.trim().length < 4) {
    titleError.textContent = "Nama dokumen wajib diisi (minimal 4 karakter).";
    isValid = false;
  }

  if (picInput.value.trim() === "") {
    picError.textContent = "Nama PIC PT M2 wajib diisi.";
    isValid = false;
  }

  if (categoryInput.value === "") {
    categoryError.textContent = "Silakan pilih salah satu kategori modul.";
    isValid = false;
  }

  if (!isValid) return;

  // Tambahkan item baru ke state
  const newDoc = {
    id: Date.now(),
    title: titleInput.value.trim(),
    category: categoryInput.value,
    pic: picInput.value.trim(),
    status: "Review"
  };

  documents.unshift(newDoc);
  docForm.reset();
  renderDocuments();
});

/**
 * 5. Mengubah Status Dokumen (Approve / Review) secara Interaktif
 */
docTableBody.addEventListener("click", (event) => {
  if (event.target.classList.contains("btn-action")) {
    const docId = Number(event.target.getAttribute("data-id"));
    documents = documents.map(doc => {
      if (doc.id === docId) {
        return {
          ...doc,
          status: doc.status === "Approved" ? "Review" : "Approved"
        };
      }
      return doc;
    });
    renderDocuments();
  }
});

// Event Listener untuk Pencarian Real-time & Filter Status
searchInput.addEventListener("input", renderDocuments);
statusFilter.addEventListener("change", renderDocuments);

/**
 * Utilitas keamanan mencegah XSS sederhana saat merender input pengguna
 */
function escapeHTML(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

// Inisialisasi tampilan awal
renderDocuments();
