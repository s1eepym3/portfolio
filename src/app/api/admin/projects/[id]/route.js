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

    const existingProject = await prisma.project.findUnique({
      where: { id },
      include: { caseStudy: true }
    });

    if (!existingProject) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    const project = await prisma.project.update({
      where: { id },
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
          upsert: {
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
            },
            update: {
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
          }
        } : (existingProject.caseStudy ? { delete: true } : undefined),
        images: {
          deleteMany: {},
          create: images.map((img, i) => ({
            url: img.src,
            alt: img.alt || '',
            sortOrder: i
          }))
        }
      },
      include: {
        images: { orderBy: { sortOrder: 'asc' } },
        caseStudy: true
      }
    });

    revalidatePath('/');
    revalidatePath(`/projects/${project.slug}`);
    if (existingProject.slug !== project.slug) {
      revalidatePath(`/projects/${existingProject.slug}`);
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error(error);
    if (error.code === 'P2025') {
       // if we tried to delete a caseStudy that didn't exist, it might throw P2025 in some prisma versions,
       // but typically `delete: true` on a nullable relation handles it if the relation is optional. 
       // If it throws, we can handle it safely.
    }
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Slug must be unique' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const isAuth = await checkAdminSession();
  if (!isAuth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  try {
    const deletedProject = await prisma.project.delete({ where: { id } });
    
    revalidatePath('/');
    revalidatePath(`/projects/${deletedProject.slug}`);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
