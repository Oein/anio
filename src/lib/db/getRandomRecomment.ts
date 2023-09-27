import prisma from '../prisma';

export default async function getRandom(count = 10) {
	const articleCnt = (await prisma.news.count()) - count;
	const skip = Math.floor(Math.random() * articleCnt);
	const found = await prisma.news.findMany({
		skip,
		take: count,
		select: { content: false, id: true, image: true, time: false, title: true, viewCount: false }
	});
	return found;
}
