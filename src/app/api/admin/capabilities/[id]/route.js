import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { checkAdminSession } from '@/lib/adminAuth';
import prisma from '@/lib/prisma';

export async function PUT(request, { params }) {
  const isAuth = await checkAdminSession();
  if (!isAuth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
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

    const entry = await prisma.capability.update({
      where: { id },
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

export async function DELETE(request, { params }) {
  const isAuth = await checkAdminSession();
  if (!isAuth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  try {
    await prisma.capability.delete({ where: { id } });
    
    revalidatePath('/');
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
