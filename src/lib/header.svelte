<div class="header" id="header">
	<div class="container">
		<a class="t" href="/">
			<strong>A</strong><thin class="thin">ll</thin>
			<strong>N</strong><thin class="thin">ews</thin>
			<strong>I</strong><thin class="thin">n</thin>
			<strong>O</strong><thin class="thin">ne</thin>
		</a>
	</div>
</div>

<style lang="scss">
	.header {
		background: #0f87ff;
		color: white;
		.container {
			padding: 0.85em 0px;
		}
	}

	.t {
		font-weight: bold;
		font-size: 1.25rem;
		color: white;

		border-bottom: 1.5px solid rgba(14, 135, 255, 0);
		box-sizing: border-box;
		transition: all 0.2s ease;

		width: fit-content;

		display: flex;
		align-items: center;

		* {
			display: inline-block;
		}

		.thin {
			max-width: 0px;
			overflow: hidden;
			transition: all 0.2s ease;
			margin-right: 0px;
			font-weight: lighter;
		}
	}
	.t:hover {
		border-bottom: 1.5px solid white;
		.thin {
			max-width: 3em;
			margin-right: 0.3em;
		}
	}
</style>
