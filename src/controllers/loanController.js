const supabase = require('../config/supabase');

const TABLE = 'peminjaman';

/**
 * GET /loans
 * Query params: status, anggota_id, buku_id, page, limit
 */
const getAllLoans = async (req, res, next) => {
  try {
    const { status, anggota_id, buku_id, page = 1, limit = 10 } = req.query;

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const from = (pageNum - 1) * limitNum;
    const to = from + limitNum - 1;

    let query = supabase
      .from(TABLE)
      .select('*', { count: 'exact' })
      .range(from, to)
      .order('created_at', { ascending: false });

    if (status) query = query.eq('status', status);
    if (anggota_id) query = query.eq('anggota_id', anggota_id);
    if (buku_id) query = query.eq('buku_id', buku_id);

    const { data, error, count } = await query;

    if (error) throw error;

    res.json({
      success: true,
      message: 'Data peminjaman berhasil diambil',
      data,
      pagination: {
        total: count,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(count / limitNum),
      },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /loans/:id
 */
const getLoanById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from(TABLE)
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({
          success: false,
          message: `Peminjaman dengan id ${id} tidak ditemukan`,
        });
      }
      throw error;
    }

    res.json({
      success: true,
      message: 'Data peminjaman berhasil diambil',
      data,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /loans
 */
const createLoan = async (req, res, next) => {
  try {
    const {
      anggota_id,
      nama_anggota,
      buku_id,
      judul_buku,
      tanggal_pinjam,
      tanggal_kembali_rencana,
    } = req.body;

    const payload = {
      anggota_id,
      nama_anggota: nama_anggota || null,
      buku_id,
      judul_buku: judul_buku || null,
      tanggal_pinjam,
      tanggal_kembali_rencana,
      status: 'Dipinjam',
    };

    const { data, error } = await supabase
      .from(TABLE)
      .insert([payload])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({
      success: true,
      message: 'Peminjaman berhasil dibuat',
      data,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * PATCH /loans/:id
 */
const updateLoan = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      anggota_id,
      nama_anggota,
      buku_id,
      judul_buku,
      tanggal_pinjam,
      tanggal_kembali_rencana,
      tanggal_kembali_aktual,
      status,
    } = req.body;

    // Cek apakah record ada
    const { data: existing, error: findError } = await supabase
      .from(TABLE)
      .select('id')
      .eq('id', id)
      .single();

    if (findError || !existing) {
      return res.status(404).json({
        success: false,
        message: `Peminjaman dengan id ${id} tidak ditemukan`,
      });
    }

    // Buat payload hanya dari field yang dikirim
    const payload = {};
    if (anggota_id !== undefined) payload.anggota_id = anggota_id;
    if (nama_anggota !== undefined) payload.nama_anggota = nama_anggota;
    if (buku_id !== undefined) payload.buku_id = buku_id;
    if (judul_buku !== undefined) payload.judul_buku = judul_buku;
    if (tanggal_pinjam !== undefined) payload.tanggal_pinjam = tanggal_pinjam;
    if (tanggal_kembali_rencana !== undefined) payload.tanggal_kembali_rencana = tanggal_kembali_rencana;
    if (tanggal_kembali_aktual !== undefined) payload.tanggal_kembali_aktual = tanggal_kembali_aktual;
    if (status !== undefined) payload.status = status;
    payload.updated_at = new Date().toISOString();

    const { data, error } = await supabase
      .from(TABLE)
      .update(payload)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    res.json({
      success: true,
      message: 'Peminjaman berhasil diperbarui',
      data,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * DELETE /loans/:id
 */
const deleteLoan = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Cek apakah record ada
    const { data: existing, error: findError } = await supabase
      .from(TABLE)
      .select('id')
      .eq('id', id)
      .single();

    if (findError || !existing) {
      return res.status(404).json({
        success: false,
        message: `Peminjaman dengan id ${id} tidak ditemukan`,
      });
    }

    const { error } = await supabase.from(TABLE).delete().eq('id', id);

    if (error) throw error;

    res.json({
      success: true,
      message: `Peminjaman dengan id ${id} berhasil dihapus`,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllLoans,
  getLoanById,
  createLoan,
  updateLoan,
  deleteLoan,
};
