'use client'

import { useState } from 'react'

import { Multimedia } from '@prisma/client'

interface MultimediaGalleryProps {
  isOpen: boolean
  currentIndex: number
  multimedias: Multimedia[]
  isPlaying: boolean
}

export const useMultimedia = (state: MultimediaGalleryProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [currentIndex, setCurrentIndex] = useState<number>(1)

  const toggleGallery = () => {
    setIsOpen(!isOpen)
    setIsPlaying(false)
  }

  const previous = () => {
    if (currentIndex > 1) {
      setCurrentIndex(currentIndex - 1)
      setIsPlaying(false)
    }
  }

  const forward = () => {
    if (currentIndex < state.multimedias.length) {
      setCurrentIndex(currentIndex + 1)
      setIsPlaying(false)
    }
  }

  const setIndex = (index: number) => {
    setCurrentIndex(index)
  }

  const getIndexById = (id: number) => {
    return state.multimedias.findIndex((multimedia) => multimedia.id === id) + 1
  }

  const handlePlay = () => {
    setIsPlaying(true)
  }
  return {
    // * Properties
    isOpen,
    currentIndex,
    isPlaying,

    // * Methods
    toggleGallery,
    getIndexById,
    setIndex,
    previous,
    forward,
    handlePlay,
  }
}
