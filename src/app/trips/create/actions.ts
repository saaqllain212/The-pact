'use server'

import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'

export async function createTrip(tripName: string) {
  if (!tripName || tripName.trim().length === 0) {
    throw new Error('Trip name is required')
  }

  // IMPORTANT: cookies() is async in Next.js 16
  const cookieStore = await cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // Supabase needs full read access
        getAll() {
          return cookieStore.getAll()
        },
        // Supabase needs write access to refresh tokens
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options)
          })
        },
      },
    }
  )

  // 1. Get authenticated user
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    throw new Error('Not authenticated')
  }

  // 2. Create trip
  const { data: trip, error: tripError } = await supabase
    .from('trips')
    .insert({
      title: tripName.trim(),
      created_by: user.id,
    })
    .select()
    .single()

  if (tripError) {
    console.error(tripError)
    throw new Error('Failed to create trip')
  }

  // 3. Add creator as trip member
  const { error: memberError } = await supabase
    .from('trip_members')
    .insert({
      trip_id: trip.id,
      user_id: user.id,
      intent_level: 'serious',
      role: 'creator',
    })

  if (memberError) {
    console.error(memberError)
    throw new Error('Failed to add trip member')
  }

  // 4. Log activity
  const { error: activityError } = await supabase
    .from('activity_log')
    .insert({
      trip_id: trip.id,
      actor_id: user.id,
      type: 'trip_created',
      payload: {
        title: trip.title,
      },
    })

  if (activityError) {
    console.error(activityError)
    throw new Error('Failed to log activity')
  }

  return { tripId: trip.id }
}
