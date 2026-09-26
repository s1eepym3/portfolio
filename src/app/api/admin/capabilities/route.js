import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { checkAdminSession } from '@/lib/adminAuth';
import prisma from '@/lib/prisma';

export async function GET() {
  const isAuth = await checkAdminSession();
  if (!isAuth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const capabilities = await prisma.capability.findMany({
      orderBy: { order: 'asc' },
    });
    return NextResponse.json(capabilities);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(request) {
  const isAuth = await checkAdminSession();
  if (!isAuth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    let { number, name, framing, proofSlugs, order } = body;

    if (number === undefined || !name || !framing || order === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    if (name.length > 100 || framing.length > 500) {
       return NextResponse.json({ error: 'Field length exceeded' }, { status: 400 });
    }

    if (!Array.isArray(proofSlugs)) {
      proofSlugs = [];
    }

    const entry = await prisma.capability.create({
      data: { 
        number: Number(number), 
        name, 
        framing, 
        proofSlugs, 
        order: Number(order) 
      }
    });
    
    revalidatePath('/');
    
    return NextResponse.json(entry);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
