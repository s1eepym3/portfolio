import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { checkAdminSession } from '@/lib/adminAuth';
import prisma from '@/lib/prisma';

export async function GET() {
  const isAuth = await checkAdminSession();
  if (!isAuth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const projects = await prisma.project.findMany({
      orderBy: { order: 'asc' },
      include: {
        images: { orderBy: { sortOrder: 'asc' } },
        caseStudy: true
      }
    });
    return NextResponse.json(projects);
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
    let { 
      slug, number, title, framing, summary, stack, image, 
      year, repoUrl, demoUrl, order, published,
      caseStudy, images
    } = body;

    if (!slug || number === undefined || !title || !framing || !summary || !image || order === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!Array.isArray(stack)) stack = [];
    if (!Array.isArray(images)) images = [];

    const project = await prisma.project.create({
      data: {
        slug,
        number: Number(number),
        title,
        framing,
        summary,
        stack,
        image,
        year: year || null,
        repoUrl: repoUrl || null,
        demoUrl: demoUrl || null,
        order: Number(order),
        published: published ?? true,
        caseStudy: caseStudy ? {
          create: {
            overview: caseStudy.overview || null,
            problem: caseStudy.problem || null,
            approach: caseStudy.approach || null,
            challenge: caseStudy.challenge || null,
            result: caseStudy.result || null,
            draftOverview: caseStudy.draftOverview || null,
            draftProblem: caseStudy.draftProblem || null,
            draftApproach: caseStudy.draftApproach || null,
            draftChallenge: caseStudy.draftChallenge || null,
            draftResult: caseStudy.draftResult || null
          }
        } : undefined,
        images: images.length > 0 ? {
          create: images.map((img, i) => ({
            url: img.src,
            alt: img.alt || '',
            sortOrder: i
          }))
        } : undefined
      },
      include: {
        images: true,
        caseStudy: true
      }
    });

    revalidatePath('/');
    revalidatePath(`/projects/${project.slug}`);

    return NextResponse.json(project);
  } catch (error) {
    console.error(error);
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Slug must be unique' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
