import prisma from '../prisma';

export default async function getMostViewedToday(count = 5) {
	const today = new Date();
	const news = await prisma.news.findMany({
		orderBy: {
			viewCount: 'desc'
		},
		where: {
			time: {
				in: [
					new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0),
					new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59)
				]
			}
		},
		take: count
	});
	return news;
}
