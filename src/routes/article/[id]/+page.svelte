<script lang="ts">
	import Card from '@/routes/card.svelte';

	export let data;
</script>

<svelte:head>
	{#if data.notFound == false && data.article}
		<title>{data.article.title}</title>
	{:else}
		<title>기사를 찾을 수 없습니다.</title>
	{/if}
</svelte:head>

<div class="container">
	{#if data.notFound || !data.article || !data.reco}
		<div class="container">
			<Card>
				<h1 style="text-align: center;">기사를 찾을 수 없습니다.</h1>
				<div style="text-align: center;">혹은 삭제된 기사 입니다.</div>
				<div style="text-align: center;">
					<a href="/">홈으로</a>
				</div>
			</Card>
		</div>
	{:else}
		<div class="row">
			<div class="article">
				<Card>
					<h2>{data.article.title}</h2>
					<div class="spliter" />
					<img src={data.article.image} alt="news" class="img" />
					<article>{@html data.article.content}</article>
				</Card>
			</div>
			<div class="grow">
				<Card style="box-sizing: border-box;">
					<h3 class="recomendations">추천 뉴스</h3>
					<div class="spliter" />
					{#each data.reco as reco}
						<a
							class="row reco"
							href={'/article/' + reco.id}
							on:click={() => {
								document.getElementById('header')?.scrollIntoView({
									behavior: 'smooth',
									block: 'start'
								});
							}}
						>
							<img src={reco.image} alt="news" />
							<div class="growR">
								{reco.title}
							</div>
						</a>
					{/each}
				</Card>
			</div>
		</div>
	{/if}
</div>

<style lang="scss">
	@import '../../../styles/eclipse.scss';

	.container {
		padding: var(--gap) 0px;
	}

	h2,
	.recomendations {
		margin: 0px;
	}

	.spliter {
		width: 100%;
		height: 2px;
		margin: 0.5em 0px;
		background: #e4e4e4;
	}

	.img {
		border-radius: 0.5em;
		width: 100%;
		display: inline-block;
	}

	.article {
		width: 768px;
		min-width: 768px;
	}

	.grow,
	.growR {
		overflow: hidden;
		flex-grow: 1;
		box-sizing: border-box;
	}

	@media (max-width: 1200px) {
		.row {
			flex-direction: column !important;

			.article {
				width: 100%;
				min-width: 100%;
			}
		}

		.grow {
			flex-grow: unset;
			width: 100%;
		}
	}

	.row {
		display: flex;
		flex-direction: row;
		gap: var(--gap);
	}

	.reco {
		height: calc(1em * 1.1 * 4);
		flex-direction: row !important;
		margin-top: calc(var(--gap) / 2);
		gap: calc(var(--gap) / 2);

		color: black;

		img {
			border-radius: 7px;
			aspect-ratio: 16/ 9;
			object-fit: cover;
		}

		div {
			line-height: 1.1;
			display: -webkit-box;
			display: -ms-flexbox;
			display: box;
			margin-top: 1px;
			max-height: calc(1em * 1.1 * 4);
			overflow: hidden;
			vertical-align: top;
			text-overflow: ellipsis;
			word-break: break-all;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 4;
		}
	}
</style>
