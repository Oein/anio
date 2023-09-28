import prisma from '@/lib/prisma';
import { json } from '@sveltejs/kit';

export async function GET({ url }) {
	const pageStr = url.searchParams.get('page') || '1';
	const page = parseInt(pageStr, 10) - 1;
	const lPp = 30;
	const fetched = await prisma.news.findMany({
		skip: page * lPp,
		take: lPp,
		orderBy: {
			time: 'desc'
		},
		select: {
			title: true,
			content: false,
			id: true,
			image: true,
			time: true,
			viewCount: false
		}
	});
	return json({
		data: fetched,
		hasMore: fetched.length == lPp
	});
}
