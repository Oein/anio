<script lang="ts">
	import Card from '@/routes/card.svelte';
	import { onMount } from 'svelte';
	import InfiniteScroll from 'svelte-infinite-scroll';
	import { fade, draw, fly } from 'svelte/transition';

	type N = {
		title: string;
		id: string;
		image: string;
		time: string;
	};

	let news: N[] = [];
	let newBatch: N[] = [];
	let page = 1;

	let hasMore = true;
	let fetching = false;

	const fetchData = async () => {
		console.log('Fetch', page);
		if (fetching) return;
		fetching = true;
		if (!hasMore) return;
		const response = await fetch(`/api/article/list?page=${page}`);
		const data = await response.json();
		newBatch = data.data;
		hasMore = data.hasMore;
		page++;
		fetching = false;
	};

	$: news = [...news, ...newBatch];

	let inf: HTMLDivElement;
	let inf2: HTMLDivElement;

	function onVisible(element: HTMLElement, callback: (element: HTMLElement) => any) {
		new IntersectionObserver((entries, observer) => {
			entries.forEach((entry) => {
				if (entry.intersectionRatio > 0) {
					callback(element);
				}
			});
		}).observe(element);
		if (!callback) return new Promise((r) => (callback = r));
	}

	const visiabler = () => {
		onVisible(inf, () => {
			fetchData();
		});
		onVisible(inf2, () => {
			fetchData();
		});
	};

	onMount(() => {
		fetchData();
		visiabler();
	});

	const tryDelete = async (id: string) => {
		const pw = prompt('비밀번호를 입력하세요.');
		const res = await fetch('/api/article/remove', {
			method: 'POST',
			body: JSON.stringify({
				id: id,
				password: btoa(pw || '')
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const dataSTR = await res.text();
		const data = JSON.parse(dataSTR);
		if (data.success) {
			news = news.filter((n) => n.id !== id);
		} else {
			alert(data.error);
		}
	};
</script>

<div class="container">
	<h1>글 관리</h1>
	<Card>
		<div class="cnt">
			{#each news as news}
				{#key news.id}
					<a class="li" href={'/admin/write?id=' + news.id}>
						<img src={news.image} alt="news" />
						<div>
							{news.title}
							<!-- svelte-ignore a11y-click-events-have-key-events -->
							<!-- svelte-ignore a11y-no-static-element-interactions -->
							<!-- svelte-ignore a11y-missing-attribute -->
							<a
								on:click={(e) => {
									e.preventDefault();
									e.stopPropagation();
									e.stopImmediatePropagation();

									tryDelete(news.id);
								}}>삭제</a
							>
						</div>
					</a>
				{/key}
			{/each}
			<div bind:this={inf} class="inf" />
			<div bind:this={inf2} />
		</div>
	</Card>
</div>

<style lang="scss">
	.container {
		padding: var(--gap) 0px;

		h1 {
			margin-top: 0px;
			margin-bottom: var(--gap);
		}
	}

	.cnt {
		position: relative;
		.inf {
			position: absolute;
			top: calc(100% - 30rem);
		}
	}

	.li {
		color: #000;
		animation: fadein 0.3s ease-in-out;
		overflow: hidden;
		display: flex;
		flex-direction: row;
		column-gap: var(--hgap);
		margin-bottom: var(--hgap);

		img {
			height: 4rem;
			border-radius: 7px;
		}
	}

	@keyframes fadein {
		0% {
			max-height: 0px;
			opacity: 0;
			transform: translateY(-10px);
		}
		100% {
			max-height: 1.2em;
			opacity: 1;
			transform: none;
		}
	}
</style>
