// Quick test script to verify Supabase auth
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hsuxtavxvkrzqajgszyr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhzdXh0YXZ4dmtyenFhamdzenlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAxNzM1OTUsImV4cCI6MjEwNTc0OTU5NX0.vo8_55av1owEHt1FHhDOb6LFihkX2grChtaXJj4HAjA';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testAuth() {
  console.log('Testing Supabase connection...');
  
  // Test 1: Can we reach Supabase?
  const { data: categories, error: catError } = await supabase.from('categories').select('*').limit(1);
  if (catError) {
    console.error('❌ Cannot reach Supabase:', catError.message);
  } else {
    console.log('✅ Supabase connection works. Found', categories.length, 'categories.');
  }

  // Test 2: Try signing in
  const email = 'somnathmarshall56@gmail.com';
  const password = 'JudeAdmin@2026';
  
  console.log(`\nAttempting login with: ${email}`);
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  
  if (error) {
    console.error('❌ Login failed:', error.message);
    console.error('   Error status:', error.status);
  } else {
    console.log('✅ Login successful!');
    console.log('   User ID:', data.user?.id);
    console.log('   Email:', data.user?.email);
  }
}

testAuth();
