import getRandom from '@/lib/db/getRandomRecomment.js';
import prisma from '@/lib/prisma.js';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	const article = await prisma.news.findFirst({
		where: {
			id: params.id
		}
	});
	const reco = await getRandom(10);
	if (article == null)
		return {
			notFound: true
		};
	return {
		article,
		reco,
		notFound: false
	};
}
