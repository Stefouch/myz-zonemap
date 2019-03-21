<template>
	<div>
		<h1>Hello World</h1>
		<h3>{{ zonemap }}</h3>
	</div>
</template>

<script>
import ZoneMap from '@/zonemap/ZoneMap';

export default {
	name: 'zonemap',
	// props: ['zonemap'],
	data: () => ({
		zonemap: this.$root.zonemap
	})
}
</script>
