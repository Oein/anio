<script lang="ts">
	export let style = '';
</script>

<div class="card" {style}>
	<slot />
</div>

<style lang="scss">
	.card {
		background: white;
		border-radius: 7px;
		padding: 1.5rem;
		box-shadow: var(--shadow);
	}
</style>
