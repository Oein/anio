import prisma from '@/lib/prisma';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
	const BODY = await request.json();
	if (BODY.password != btoa(process.env.PASSWORD))
		return json({
			success: false,
			error: '잘못된 비밀번호 입니다.'
		});
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
	const id = BODY.id || Math.random().toString(35).slice(2, 9);
	if (BODY.id)
		await prisma.news.update({
			where: {
				id: id
			},
			data: {
				content: BODY.content,
				image: BODY.image,
				time: new Date(BODY.time),
				title: BODY.title
			}
		});
	else
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
