import prisma from '../prisma';

export default async function getReccent(count = 10) {
	const news = await prisma.news.findMany({
		orderBy: {
			time: 'desc'
		},
		take: count
	});
	return news;
}
