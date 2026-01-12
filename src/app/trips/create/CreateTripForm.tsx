'use client'

import { useState } from 'react'
import { createTrip } from './actions'

export default function CreateTripForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const tripName = formData.get('tripName') as string

    try {
      await createTrip(tripName)
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">
          Trip name
        </label>
        <input
          name="tripName"
          required
          disabled={isSubmitting}
          className="w-full border rounded px-3 py-2"
          placeholder="Goa with the gang"
        />
      </div>

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded bg-black text-white px-4 py-2 disabled:opacity-50"
      >
        {isSubmitting ? 'Creating…' : 'Create trip'}
      </button>
    </form>
  )
}
