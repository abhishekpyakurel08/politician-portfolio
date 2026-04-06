'use client'

import React from 'react'
import * as LucideIcons from 'lucide-react'
import { LucideProps } from 'lucide-react'

interface LucideIconProps extends LucideProps {
  name: string
}

const LucideIcon: React.FC<LucideIconProps> = ({ name, ...props }) => {
  // @ts-ignore - name is a string that should match a Lucide icon name
  const Icon = LucideIcons[name]

  if (!Icon) {
    // Fallback if icon name is invalid
    return <LucideIcons.HelpCircle {...props} />
  }

  return <Icon {...props} />
}

export default LucideIcon
