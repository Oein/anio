<script>
	import Card from '../card.svelte';
</script>

<div class="container">
	<Card>
		<h1 class="he">관리자 패널</h1>
		<a href="/admin/write" class="l">새로운 글 작성</a>
		<a href="/admin/manage" class="l">글 관리</a>
	</Card>
</div>

<style lang="scss">
	.container {
		padding: var(--gap) 0px;
	}
	.he {
		margin: 0px;
		margin-bottom: 0.5em;
	}
	.l {
		margin: 0.5em 0px;
		display: block;
	}
</style>
