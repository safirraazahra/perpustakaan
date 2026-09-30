/**
 * Validasi body request untuk peminjaman buku
 */
const validateLoan = (req, res, next) => {
  const { anggota_id, buku_id, tanggal_pinjam, tanggal_kembali_rencana } = req.body;

  const errors = [];

  if (!anggota_id) errors.push('anggota_id wajib diisi');
  if (!buku_id) errors.push('buku_id wajib diisi');
  if (!tanggal_pinjam) {
    errors.push('tanggal_pinjam wajib diisi');
  } else if (isNaN(Date.parse(tanggal_pinjam))) {
    errors.push('tanggal_pinjam harus berformat tanggal yang valid (YYYY-MM-DD)');
  }
  if (!tanggal_kembali_rencana) {
    errors.push('tanggal_kembali_rencana wajib diisi');
  } else if (isNaN(Date.parse(tanggal_kembali_rencana))) {
    errors.push('tanggal_kembali_rencana harus berformat tanggal yang valid (YYYY-MM-DD)');
  }

  if (
    tanggal_pinjam &&
    tanggal_kembali_rencana &&
    !isNaN(Date.parse(tanggal_pinjam)) &&
    !isNaN(Date.parse(tanggal_kembali_rencana))
  ) {
    if (new Date(tanggal_kembali_rencana) <= new Date(tanggal_pinjam)) {
      errors.push('tanggal_kembali_rencana harus setelah tanggal_pinjam');
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validasi gagal',
      errors,
    });
  }

  next();
};

/**
 * Validasi partial update (PATCH) – semua field opsional
 */
const validateLoanUpdate = (req, res, next) => {
  const {
    tanggal_pinjam,
    tanggal_kembali_rencana,
    tanggal_kembali_aktual,
    status,
  } = req.body;

  const errors = [];
  const validStatuses = ['Dipinjam', 'Dikembalikan', 'Terlambat'];

  if (tanggal_pinjam && isNaN(Date.parse(tanggal_pinjam))) {
    errors.push('tanggal_pinjam harus berformat tanggal yang valid (YYYY-MM-DD)');
  }
  if (tanggal_kembali_rencana && isNaN(Date.parse(tanggal_kembali_rencana))) {
    errors.push('tanggal_kembali_rencana harus berformat tanggal yang valid (YYYY-MM-DD)');
  }
  if (tanggal_kembali_aktual && isNaN(Date.parse(tanggal_kembali_aktual))) {
    errors.push('tanggal_kembali_aktual harus berformat tanggal yang valid (YYYY-MM-DD)');
  }
  if (status && !validStatuses.includes(status)) {
    errors.push(`status harus salah satu dari: ${validStatuses.join(', ')}`);
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validasi gagal',
      errors,
    });
  }

  next();
};

module.exports = { validateLoan, validateLoanUpdate };
