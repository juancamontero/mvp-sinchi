'use client'

import { useState } from 'react'


import { Multimedia } from '@prisma/client'

interface MultimediaGalleryProps {
  isOpen: boolean
  currentIndex: number
  multimedias: Multimedia[]
}

export const useMultimedia = (state: MultimediaGalleryProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [currentIndex, setCurrentIndex] = useState<number>(1)

  const toggleGallery = () => {
    setIsOpen(!isOpen)
  }

  const previous = () => {
    if (currentIndex > 1) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const forward = () => {
    if (currentIndex < state.multimedias.length) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const setIndex = (index: number) => {
    setCurrentIndex(index)
  }

  const getIndexById = (id: number) => {
    return state.multimedias.findIndex((multimedia) => multimedia.id === id) + 1
  }
  return {
    // * Properties
    isOpen,
    currentIndex,

    // * Methods
    toggleGallery,
    getIndexById,
    setIndex,
    previous,
    forward,
  }
}
