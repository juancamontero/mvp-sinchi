import { NextResponse, NextRequest } from 'next/server'

import prisma from '@/lib/prisma'

export async function GET(request: Request) {
  const proyectos = await prisma.proyecto.findMany()

  return NextResponse.json({ message: 'ok', proyectos })
}