/**
 * Pip Nation Academy - Database Migration Script
 * 
 * This script helps migrate data from old Supabase project to new one
 * 
 * USAGE:
 * 1. Update OLD and NEW credentials below
 * 2. Run: npx tsx migrate-to-new-supabase.ts
 * 3. Follow prompts
 */

import { createClient } from '@supabase/supabase-js';

// ============================================
// CONFIGURATION - UPDATE THESE VALUES
// ============================================

// OLD PROJECT (SOURCE)
const OLD_SUPABASE_URL = 'https://mkblwhxlrdcoflliwnyr.supabase.co';
const OLD_SERVICE_KEY = 'YOUR_OLD_SERVICE_ROLE_KEY'; // From old project

// NEW PROJECT (DESTINATION)
const NEW_SUPABASE_URL = 'https://YOUR_NEW_PROJECT.supabase.co';
const NEW_SERVICE_KEY = 'YOUR_NEW_SERVICE_ROLE_KEY'; // From new project

// ============================================
// USERS TO MIGRATE
// ============================================

const USERS_TO_MIGRATE = [
  {
    email: 'admin@pipnationacademy.com',
    password: 'NewAdminPassword123!', // SET NEW PASSWORD
    user_metadata: {
      name: 'Admin',
      role: 'admin',
      beginners_access: true,
      strategy_access: true
    }
  },
  // Add more users here
  // {
  //   email: 'student@example.com',
  //   password: 'NewPassword123!',
  //   user_metadata: {
  //     name: 'Student Name',
  //     role: 'student'
  //   }
  // }
];

// ============================================
// CREATE CLIENTS
// ============================================

const oldSupabase = createClient(OLD_SUPABASE_URL, OLD_SERVICE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false }
});

const newSupabase = createClient(NEW_SUPABASE_URL, NEW_SERVICE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false }
});

// ============================================
// MIGRATION FUNCTIONS
// ============================================

async function exportKVData() {
  console.log('\n📦 Exporting KV Store data...');
  
  try {
    const { data, error } = await oldSupabase
      .from('kv_store_0991178c')
      .select('*');
    
    if (error) throw error;
    
    console.log(`✅ Exported ${data.length} records`);
    return data;
  } catch (error) {
    console.error('❌ Export failed:', error);
    throw error;
  }
}

async function importKVData(data: any[]) {
  console.log('\n📥 Importing KV Store data...');
  
  try {
    // Import in batches of 100
    const batchSize = 100;
    for (let i = 0; i < data.length; i += batchSize) {
      const batch = data.slice(i, i + batchSize);
      
      const { error } = await newSupabase
        .from('kv_store_0991178c')
        .upsert(batch, { onConflict: 'key' });
      
      if (error) throw error;
      
      console.log(`✅ Imported batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(data.length / batchSize)}`);
    }
    
    console.log(`✅ Successfully imported ${data.length} records`);
  } catch (error) {
    console.error('❌ Import failed:', error);
    throw error;
  }
}

async function migrateUsers() {
  console.log('\n👥 Migrating users...');
  
  for (const user of USERS_TO_MIGRATE) {
    try {
      const { data, error } = await newSupabase.auth.admin.createUser({
        email: user.email,
        password: user.password,
        email_confirm: true, // Auto-confirm since no email server
        user_metadata: user.user_metadata
      });
      
      if (error) {
        if (error.message.includes('already registered')) {
          console.log(`⚠️  User ${user.email} already exists - skipping`);
        } else {
          throw error;
        }
      } else {
        console.log(`✅ Created user: ${user.email}`);
      }
    } catch (error) {
      console.error(`❌ Failed to create ${user.email}:`, error);
    }
  }
}

async function verifyNewDatabase() {
  console.log('\n🔍 Verifying new database...');
  
  try {
    // Check KV store
    const { data: kvData, error: kvError } = await newSupabase
      .from('kv_store_0991178c')
      .select('count');
    
    if (kvError) throw kvError;
    
    console.log('✅ KV Store accessible');
    
    // Check auth users
    const { data: { users }, error: authError } = await newSupabase.auth.admin.listUsers();
    
    if (authError) throw authError;
    
    console.log(`✅ Found ${users.length} auth users`);
    
    return true;
  } catch (error) {
    console.error('❌ Verification failed:', error);
    return false;
  }
}

async function createStorageBucket() {
  console.log('\n🗄️  Creating storage bucket...');
  
  try {
    const { data, error } = await newSupabase.storage.createBucket('make-0991178c-receipts', {
      public: false,
      fileSizeLimit: 5242880 // 5MB
    });
    
    if (error) {
      if (error.message.includes('already exists')) {
        console.log('⚠️  Bucket already exists - skipping');
      } else {
        throw error;
      }
    } else {
      console.log('✅ Storage bucket created');
    }
  } catch (error) {
    console.error('❌ Bucket creation failed:', error);
  }
}

// ============================================
// MAIN MIGRATION FLOW
// ============================================

async function runMigration() {
  console.log('🚀 Starting Pip Nation Academy Database Migration');
  console.log('================================================\n');
  
  // Validate configuration
  if (OLD_SERVICE_KEY === 'YOUR_OLD_SERVICE_ROLE_KEY' || 
      NEW_SERVICE_KEY === 'YOUR_NEW_SERVICE_ROLE_KEY') {
    console.error('❌ ERROR: Please update the configuration with your actual Supabase keys!');
    console.error('   Edit this file and set OLD_SERVICE_KEY and NEW_SERVICE_KEY');
    return;
  }
  
  try {
    // Step 1: Export data
    const kvData = await exportKVData();
    
    // Step 2: Create storage bucket
    await createStorageBucket();
    
    // Step 3: Import KV data
    await importKVData(kvData);
    
    // Step 4: Migrate users
    await migrateUsers();
    
    // Step 5: Verify
    const verified = await verifyNewDatabase();
    
    if (verified) {
      console.log('\n✅ MIGRATION COMPLETED SUCCESSFULLY!');
      console.log('\n📋 NEXT STEPS:');
      console.log('   1. Update utils/supabase/info.tsx with new credentials');
      console.log('   2. Deploy Edge Functions to new project');
      console.log('   3. Configure authentication URLs in Supabase');
      console.log('   4. Test the platform thoroughly');
      console.log('   5. Manually migrate storage files (payment receipts)');
    } else {
      console.log('\n⚠️  MIGRATION COMPLETED WITH WARNINGS');
      console.log('   Please check the errors above and verify manually');
    }
    
  } catch (error) {
    console.error('\n❌ MIGRATION FAILED:', error);
    console.log('\nPlease fix the errors and try again');
  }
}

// ============================================
// RUN MIGRATION
// ============================================

console.log(`
╔══════════════════════════════════════════════╗
║   Pip Nation Academy - Database Migration    ║
║                                              ║
║   ⚠️  WARNING: This will migrate all data   ║
║   from old project to new project           ║
║                                              ║
║   Make sure you have:                        ║
║   ✅ Backed up current data                 ║
║   ✅ Created new Supabase project           ║
║   ✅ Created kv_store_0991178c table        ║
║   ✅ Updated configuration above            ║
║                                              ║
║   Press Ctrl+C to cancel                     ║
╚═══════════════════════════════════════��══════╝
`);

// Wait 3 seconds before starting
setTimeout(() => {
  runMigration();
}, 3000);
