import prisma from '@/lib/prisma';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
	const BODY = await request.json();
	if (BODY.password != btoa(process.env.PASSWORD))
		return json({
			success: false,
			error: '잘못된 비밀번호 입니다.'
		});
	if (typeof BODY.id == 'undefined')
		return json({
			success: false,
			error: 'Invalid request'
		});
	try {
		await prisma.news.delete({
			where: {
				id: BODY.id
			}
		});
	} catch (e) {
		return json({
			success: false,
			error: e
		});
	}
	return json({
		success: true
	});
}
