<script>
	import Card from '@/routes/card.svelte';
	import Editor from '@tinymce/tinymce-svelte';
	import toast from 'svelte-french-toast';

	export let data;

	let value = data.value;
	let title = data.title;
	let img = data.image;
	let password = '';

	let iamgePreview = false;

	let isUploading = false;
	const onButtonClick = () => {
		if (isUploading) return;
		if (title.length == 0) return toast.error('제목을 입력해 주세요');
		if (img.length == 0) return toast.error('이미지 주소를 입력해 주세요');
		if (value.length == 0) return toast.error('본문을 입력해 주세요');
		if (password.length == 0) return toast.error('비밀번호를 입력해 주세요');

		const toast_ = toast.loading('업로드중...');
		isUploading = true;

		fetch('/api/article/post', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				title: title,
				image: img,
				content: value,
				time: Date.now(),
				password: btoa(password),
				id: data.id
			})
		})
			.then((data) => data.json())
			.then((data) => {
				if (data.success == false)
					return toast.error(data.error, {
						id: toast_
					});
				toast.success('업로드에 성공했습니다.', {
					id: toast_
				});
			})
			.catch(() => {
				toast.error('업로드중 오류가 발생했습니다', {
					id: toast_
				});
			})
			.finally(() => {
				isUploading = false;
			});
	};
</script>

<div class="container">
	{#if !iamgePreview}
		{#if data.id == ''}
			<h1 class="hd">글 생성모드</h1>
		{:else}
			<h1 class="hd">글 수정모드</h1>
		{/if}
		<div class="gap" />
		<input placeholder="제목" bind:value={title} />
		<div class="gap" />
	{/if}
	<div class="btnWrapper">
		<input placeholder="이미지 링크" bind:value={img} />
		<button class="upload" on:click={() => (iamgePreview = !iamgePreview)}>이미지 미리 보기</button>
	</div>
	{#if !iamgePreview}
		<div class="gap" />
		<Editor apiKey="nwirrmxcz5rrhrxfhv3cuggqvgifvi4766p4uipj31sgvipi" bind:value />
		<div class="gap" />
		<div class="btnWrapper">
			<input placeholder="비밀번호" type="password" bind:value={password} />
			<button class="upload" on:click={onButtonClick}>업로드</button>
		</div>
	{:else}
		<div class="gap" />
		<Card>
			<img src={img} alt="news" class="img" />
		</Card>
	{/if}
</div>

<style lang="scss">
	.hd {
		margin: 0px;
		padding: 0px;
	}
	.img {
		box-sizing: border-box;
		border-radius: 7px;
		width: 100%;
	}
	input {
		width: 100%;
		font-size: 1.2rem;
		box-sizing: border-box;
		border-radius: 7px;
		outline: none;
		border: none;
		box-shadow: var(--shadow);
		padding: 0.4em 0.6em;
	}
	.gap {
		height: var(--hgap);
	}
	.container {
		padding: var(--hgap) 0px;
	}
	.btnWrapper {
		display: flex;
		justify-content: flex-end;
		align-items: stretch;
		gap: var(--hgap);

		input {
			flex-grow: 1;
			box-sizing: border-box;
		}

		button {
			outline: none;
			border: none;
			background: #0e87ff;
			color: white;
			box-shadow: var(--shadow);
			padding: 0.4rem 0.8rem;
			font-size: 1.05em;
			border-radius: 7px;
			cursor: pointer;
			white-space: nowrap;
		}
	}
</style>
