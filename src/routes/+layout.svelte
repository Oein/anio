<script>
	import '@/styles/global.css';

	import Header from '@/lib/header.svelte';
	import Footer from '@/lib/footer.svelte';
	import { Toaster } from 'svelte-french-toast';
</script>

<div class="App">
	<Toaster />
	<Header />
	<slot />
	<Footer />
</div>
