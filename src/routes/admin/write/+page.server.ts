import prisma from '@/lib/prisma.js';

export async function load({ url }) {
	const articleID = url.searchParams.get('id');
	if (!articleID) return { value: '', title: '', image: '', id: '' };
	const post = await prisma.news.findFirst({
		where: {
			id: articleID
		},
		select: {
			title: true,
			content: true,
			image: true
		}
	});
	if (!post) return { value: '', title: '', image: '', id: '' };
	return {
		title: post.title,
		value: post.content,
		image: post.image,
		id: articleID
	};
}
