import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { MediaResult } from '@/utils/tmdb';

export async function POST(request: Request) {
  const cookieStore = cookies()
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )
  
  try {
    console.log('Attempting to get user');
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError) {
      console.error('Error getting user:', userError);
      return NextResponse.json({ success: false, error: 'Error authenticating user' }, { status: 500 });
    }
    if (!user) {
      console.log('No user found');
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }
    console.log('User authenticated:', user.id);

    const mediaItem: MediaResult = await request.json();
    console.log('Received media item:', mediaItem);
    
    console.log('Attempting to insert media request');
    const { data, error } = await supabase
      .from('media_requests')
      .insert({
        user_id: user.id,
        media_type: mediaItem.media_type,
        title: mediaItem.title || mediaItem.name,
        tmdb_id: mediaItem.id,
        poster_path: mediaItem.poster_path,
        release_date: mediaItem.release_date || mediaItem.first_air_date,
        status: 'pending'
      })
      .select()

    if (error) {
      console.error('Error inserting media request:', error);
      throw error;
    }

    console.log('Media request inserted successfully:', data);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error submitting request:', error);
    return NextResponse.json({ success: false, error: 'Failed to submit request' }, { status: 500 });
  }
}