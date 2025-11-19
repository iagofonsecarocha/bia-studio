import { createClient } from '@supabase/supabase-js'

// Credentials provided by the user
const supabaseUrl = 'https://ccdaajeydprpjwrrpjdf.supabase.co'
const supabaseKey = 'sb_publishable_uXlUs3Pkxee_Pbz1XZC8nA_FuQeEZ1N' // Using Publishable Key from screenshot

export const supabase = createClient(supabaseUrl, supabaseKey)
