<script lang="ts">
	export let to: string;
	export let image: string;
	export let num: number;
	export let title: string;
</script>

<a class="newsImageItem" href={to}>
	<img src={image} alt="news" />
	<div class="row">
		<div class="num">{num}</div>
		<div class="text">
			<span>{title}</span>
		</div>
	</div>
</a>

<style lang="scss">
	@import './../styles/eclipse.scss';
	.newsImageItem {
		display: flex;
		flex-direction: column;
		box-shadow: var(--shadow);
		border-radius: 7px;
		width: calc(8rem / 9 * 16);

		img {
			height: 8rem;
			border-radius: 7px 7px 0px 0px;
			aspect-ratio: 16/ 9;
		}

		div {
			width: 100%;
			color: black;

			.num {
				background: #0e87ff;
				border-radius: 0px 0px 0px 7px;
				color: white;
				padding: 0.5rem 1.5rem;
				width: fit-content;
			}
			.text {
				flex-grow: 1;
				display: flex;
				align-items: center;
				padding: 0px 0.5em;
				overflow: hidden;

				span {
					@extend %eclipse;
				}
			}
		}
	}

	.row {
		display: flex;
		flex-direction: row;
	}
</style>
