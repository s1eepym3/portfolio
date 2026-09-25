import { NextResponse } from 'next/server';
import { checkAdminSession } from '@/lib/adminAuth';
import prisma from '@/lib/prisma';

export async function PUT(request, { params }) {
  const isAuth = await checkAdminSession();
  if (!isAuth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  try {
    const body = await request.json();
    const { year, role, company, description, order } = body;

    if (!year || !role || !company || order === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    if (year.length > 100 || role.length > 100 || company.length > 100 || (description && description.length > 1000)) {
      return NextResponse.json({ error: 'Field length exceeded' }, { status: 400 });
    }

    const entry = await prisma.timelineEntry.update({
      where: { id },
      data: { year, role, company, description: description || null, order: Number(order) }
    });
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
    await prisma.timelineEntry.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
