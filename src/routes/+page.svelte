<script lang="ts">
	import Card from './card.svelte';
	import { removeHTMLTags, type News } from './genTool';
	import HotNews from './hotNews.svelte';

	/** @type {import('./$types').PageData} */
	export let data;
	const HOT = data.HOT as News[];
	const MOST_VIEWS = data.MOST_VIEWS as News[];
	const MAIN = data.MAIN as News;
</script>

<main class="container">
	<div class="row1 row">
		<a class="mainItem" href={'/article/' + MAIN.id}>
			<img src={MAIN.image} alt="news" />
			<div class="desc">
				<div class="title">
					{MAIN.title}
				</div>
				<div class="content">
					{removeHTMLTags(MAIN.content)}
				</div>
			</div>
		</a>
		<div class="it1">
			<Card style="height: 100%; box-sizing: border-box;">
				<div class="title">AI 추천 뉴스</div>
				<div class="spliter" />
				{#each MOST_VIEWS || [] as mostView}
					<a class="newsItem" href={'/article/' + mostView.id}>{mostView.title}</a>
				{/each}
			</Card>
		</div>
	</div>
	<div class="it2">
		<Card>
			<div class="title">추천 주요뉴스</div>
			<div class="spliter" />
			<div class="row allflex1 hot">
				{#each HOT as item, idx}
					<HotNews image={item.image} num={idx + 1} title={item.title} to={'/article/' + item.id} />
				{/each}
			</div>
		</Card>
	</div>
</main>

<style lang="scss">
	@import './../styles/eclipse.scss';
	main {
		display: flex;
		flex-direction: column;
		gap: var(--gap);
		padding: 1.75rem 0px;
	}

	.row {
		display: flex;
		flex-direction: row;
		gap: var(--gap);
	}

	.hot {
		overflow: auto;
		width: 100%;

		-ms-overflow-style: none;
		scrollbar-width: none;

		::-webkit-scrollbar {
			display: none;
		}
	}

	.allflex1 {
		flex: 1;
	}

	.row1 {
		align-items: stretch;
		.mainItem {
			display: block;
			grid-row: 1;
			grid-column: 1;
			background-image: var(--img);
			background-position: center;
			background-size: cover;

			box-sizing: border-box;

			width: 780px;
			aspect-ratio: 16/ 9;

			border-radius: 7px;
			box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.06);

			position: relative;

			img {
				width: 100%;
				height: 100%;
				position: absolute;
				top: 0px;
				left: 0px;
				aspect-ratio: 16/ 9;
				border-radius: 7px;
				object-fit: cover;
			}

			.desc {
				position: absolute;
				left: 0px;
				bottom: 0px;
				right: 0px;
				height: fit-content;

				background: rgb(0, 0, 0);
				background: linear-gradient(
					180deg,
					rgba(0, 0, 0, 0) 0%,
					rgba(0, 0, 0, 0.4) 30%,
					rgba(0, 0, 0, 0.7) 100%
				);

				color: white;
				padding: 1.5rem;

				border-radius: 0px 0px 7px 7px;

				.title {
					@extend %eclipse;
					font-size: 2.3rem;
					padding-bottom: 5px;
					border-bottom: 1px solid #eee;
					margin-bottom: 5px;
					width: 100%;
				}
				.content {
					display: -webkit-box;
					display: -ms-flexbox;
					display: box;
					margin-top: 1px;
					line-height: 1.2;
					max-height: 2.4em;
					overflow: hidden;
					vertical-align: top;
					text-overflow: ellipsis;
					word-break: break-all;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
				}
			}
		}
		.it1 {
			flex-grow: 1;
			overflow: hidden;
		}
	}

	@media (max-width: 992px) {
		.row1 {
			flex-direction: column !important;

			.mainItem {
				width: 100%;
			}
		}
	}

	.it2 {
		grid-row: 2;
		grid-column: 1/ 3;
	}

	.title {
		font-size: 1.4rem;
		font-weight: bolder;
	}

	.newsItem {
		@extend %eclipse;

		font-size: 1.05rem;
		font-weight: bold;
		padding-left: 0.75em;
		color: black;
		display: block;
		margin: 0.6em 0px;
	}

	.spliter {
		width: 100%;
		height: 1px;
		background: #eee;
		margin: 0.5rem 0px;
	}
</style>
