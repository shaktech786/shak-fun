/**
 * AccessibilityControls
 * Wrapper component that manages the button and panel
 */

'use client'

import { useState } from 'react'
import { AccessibilityButton } from './AccessibilityButton'
import { AccessibilityPanel } from './AccessibilityPanel'

export function AccessibilityControls() {
  const [isPanelOpen, setIsPanelOpen] = useState(false)

  return (
    <>
      <AccessibilityButton
        onClick={() => setIsPanelOpen(true)}
        aria-expanded={isPanelOpen}
      />
      <AccessibilityPanel
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
      />
    </>
  )
}
