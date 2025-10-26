import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import type { TablesInsert } from '@/types/database'

export async function GET() {
  try {
    const supabase = await createClient()

    const { count, error } = await supabase
      .from('site_visits')
      .select('*', { count: 'exact', head: true })

    if (error) {
      console.error('Error fetching site visits:', error)
      return NextResponse.json(
        { error: 'Failed to fetch site visits' },
        { status: 500 }
      )
    }

    return NextResponse.json({ count: count || 0 })
  } catch (error) {
    console.error('Error in site visits API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST() {
  try {
    const supabase = await createClient()

    const visitData: TablesInsert<'site_visits'> = {}

    const { error } = await supabase
      .from('site_visits')
      .insert(visitData)

    if (error) {
      console.error('Error recording site visit:', error)
      return NextResponse.json(
        { error: 'Failed to record site visit' },
        { status: 500 }
      )
    }

    // Get updated count
    const { count } = await supabase
      .from('site_visits')
      .select('*', { count: 'exact', head: true })

    return NextResponse.json({ count: count || 0 })
  } catch (error) {
    console.error('Error in site visits API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
