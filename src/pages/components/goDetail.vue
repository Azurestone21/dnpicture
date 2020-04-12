<template>
	<view @click="handleClick">
		<slot></slot>
	</view>
</template>

<script>
	export default {
		props: {
			list: Array,
			index: Number
		},
		mounted() {
			// console.log(this.list);
			// console.log(this.index);
			
		},
		methods: {
			handleClick() {
				// 数据缓存
				getApp().globalData.list = this.list;
				getApp().globalData.index = this.index;
				// 跳转页面
				uni.navigateTo({
					url: "/pages/imgDetail/index"
				})
			}
		}
	}
</script>

<style>
</style>
