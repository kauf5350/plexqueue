import { createClient } from '@supabase/supabase-js'
import { MediaResult } from './tmdb';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function submitRequest(mediaItem: MediaResult) {
  const { data, error } = await supabase
    .from('requests')
    .insert({
      media_type: mediaItem.media_type,
      title: mediaItem.title || mediaItem.name,
      tmdb_id: mediaItem.id,
      status: 'pending'
    })

  if (error) throw error
  return data
}