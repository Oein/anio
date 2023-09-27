const us = [
	`https://image.imnews.imbc.com/news/2023/society/article/__icsFiles/afieldfile/2023/09/26/k230926-31.jpg`,
	`https://image.imnews.imbc.com/news/2023/society/article/__icsFiles/afieldfile/2023/09/26/k230926-32.jpg`,
	`https://image.imnews.imbc.com/news/2023/society/article/__icsFiles/afieldfile/2023/09/26/jsh230926_16.jpg`,
	`https://image.imnews.imbc.com/news/2023/politics/article/__icsFiles/afieldfile/2023/09/26/joo230926_25.jpg`
];
const titleTemplate = [
	'이제명이',
	'이제명이 또',
	'제명이가 또',
	'제명이가',
	'문제인이',
	'김정은이',
	'애플이',
	'팀 쿡이'
];
const titleBackTemplate = [
	'이상한 짓 해',
	'바나나를 먹어',
	'인사를 해',
	'눈을 깜빡여',
	'뽀로로를 감상해',
	'아이폰을 구매해',
	'맥북을 구매해',
	'잠을 자'
];

export type News = {
	title: string;
	content: string;
	image: string;
	id: string;
};

export const randItem = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];
export const genTitle = () => `${randItem(titleTemplate)} ${randItem(titleBackTemplate)} 논란`;
export const genDesc = () =>
	`${genTitle()}, 그리고 ${genTitle()}, 그리고 ${genTitle()}, 그리고 ${genTitle()}, 그리고 ${genTitle()}, 그리고 ${genTitle()}, 그리고 ${genTitle()}, 그리고 ${genTitle()}, 그리고 ${genTitle()}, 그리고 ${genTitle()}`;
export const genImage = () => randItem(us);

export const genNews: () => News = () => {
	return {
		title: genTitle(),
		content: genDesc(),
		image: genImage(),
		id: 'test'
	};
};
export const genNewses = (len: number) => {
	const res: News[] = [];
	while (res.length < len) res.push(genNews());
	return res;
};
export const removeHTMLTags = (html: string) => {
	return html.replace(/<br \/>/g, '').replace(/<br>/g, '');
};
