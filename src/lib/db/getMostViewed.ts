import prisma from '../prisma';

export default async function getMostViewed(count = 5) {
	const news = await prisma.news.findMany({
		orderBy: {
			viewCount: 'desc'
		},
		take: count
	});
	return news;
}
