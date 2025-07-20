import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

// GET: Dohvati sve poslove
export async function GET() {
  const jobs = await prisma.job.findMany({
    orderBy: { id: 'desc' },
  });
  return NextResponse.json(jobs);
}

// POST: Dodaj novi posao
export async function POST(req: Request) {
  const data = await req.json();

  const { title, description, price, date, time, contact, user } = data;

  if (!title || !description || !price || !date || !time || !contact || !user) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  const job = await prisma.job.create({
    data: { title, description, price, date, time, contact, user },
  });

  return NextResponse.json(job);
}
