import getReccent from '@/lib/db/getReccent';
import getMostViewed from '@/lib/db/getMostViewed';
import getRandom from '@/lib/db/getRandomRecomment';

/** @type {import('./$types').PageLoad} */
export async function load() {
	return {
		HOT: await getMostViewed(5),
		MOST_VIEWS: await getRandom(10),
		MAIN: (await getReccent(1))[0]
	};
}
