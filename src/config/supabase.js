const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL || 'https://qmxmlmmpxxxllrpxgraq.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFteG1sbW1weHh4bGxycHhncmFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA3NzA1NzQsImV4cCI6MjEwNjM0NjU3NH0.O-t8vpH-WuPp_fBg2DEajfBXw_Fi6QiNGVCYgGY9ZHg';

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;

