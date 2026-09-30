const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'placeholder-key';

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
  console.warn('⚠️ WARNING: SUPABASE_URL atau SUPABASE_ANON_KEY belum diset di Environment Variables!');
}

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;

