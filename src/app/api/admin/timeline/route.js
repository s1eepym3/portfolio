import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { checkAdminSession } from '@/lib/adminAuth';
import prisma from '@/lib/prisma';

export async function POST(request) {
  const isAuth = await checkAdminSession();
  if (!isAuth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const { year, role, company, description, order } = body;

    if (!year || !role || !company || order === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    if (year.length > 100 || role.length > 100 || company.length > 100 || (description && description.length > 1000)) {
      return NextResponse.json({ error: 'Field length exceeded' }, { status: 400 });
    }

    const entry = await prisma.timelineEntry.create({
      data: { year, role, company, description: description || null, order: Number(order) }
    });
    
    revalidatePath('/');
    
    return NextResponse.json(entry);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
