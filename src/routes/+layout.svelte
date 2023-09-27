<script>
	import '@/styles/global.css';

	import Header from '@/lib/header.svelte';
	import Footer from '@/lib/footer.svelte';
</script>

<div class="App">
	<Header />
	<slot />
	<Footer />
</div>
