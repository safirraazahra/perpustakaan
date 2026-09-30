const express = require('express');
const router = express.Router();

const {
  getAllLoans,
  getLoanById,
  createLoan,
  updateLoan,
  deleteLoan,
} = require('../controllers/loanController');

const { validateLoan, validateLoanUpdate } = require('../middleware/validate');

/**
 * @route   GET /loans
 * @desc    Ambil semua data peminjaman (dengan filter & pagination)
 * @query   status, anggota_id, buku_id, page, limit
 */
router.get('/', getAllLoans);

/**
 * @route   GET /loans/:id
 * @desc    Ambil satu data peminjaman berdasarkan ID
 */
router.get('/:id', getLoanById);

/**
 * @route   POST /loans
 * @desc    Buat data peminjaman baru
 * @body    anggota_id, buku_id, tanggal_pinjam, tanggal_kembali_rencana
 */
router.post('/', validateLoan, createLoan);

/**
 * @route   PATCH /loans/:id  atau  PUT /loans/:id
 * @desc    Perbarui sebagian data peminjaman
 * @body    anggota_id?, nama_anggota?, buku_id?, judul_buku?, tanggal_pinjam?, tanggal_kembali_rencana?, tanggal_kembali_aktual?, status?
 */
router.patch('/:id', validateLoanUpdate, updateLoan);
router.put('/:id', validateLoanUpdate, updateLoan);

/**
 * @route   DELETE /loans/:id
 * @desc    Hapus data peminjaman
 */
router.delete('/:id', deleteLoan);

module.exports = router;
