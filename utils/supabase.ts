import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { MediaResult } from './tmdb';

export async function submitRequest(mediaItem: MediaResult) {
  const cookieStore = cookies()
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          cookieStore.set(name, value, options)
        },
        remove(name: string, options: any) {
          cookieStore.set(name, '', options)
        },
      },
    }
  )
  
  console.log('Submitting request:', mediaItem);
  const { data, error } = await supabase
    .from('media_requests')
    .insert({
      media_type: mediaItem.media_type,
      title: mediaItem.title || mediaItem.name,
      tmdb_id: mediaItem.id,
      poster_path: mediaItem.poster_path,
      release_date: mediaItem.release_date || mediaItem.first_air_date,
      status: 'pending'
    })
    .select()

  if (error) {
    console.error('Error submitting request:', error);
    throw error;
  }
  console.log('Request submitted successfully:', data);
  return data;
}