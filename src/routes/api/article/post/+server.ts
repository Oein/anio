import prisma from '@/lib/prisma';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
	const BODY = await request.json();
	if (
		typeof BODY.content == 'undefined' ||
		typeof BODY.title == 'undefined' ||
		typeof BODY.image == 'undefined' ||
		typeof BODY.time == 'undefined'
	)
		return json({
			success: false,
			error: 'Invalid request'
		});
	const id = Math.random().toString(35).slice(2, 9);
	await prisma.news.create({
		data: {
			content: BODY.content,
			title: BODY.title,
			image: BODY.image,
			time: new Date(BODY.time),
			id: id
		}
	});
	return json({
		success: true,
		id: id
	});
}
