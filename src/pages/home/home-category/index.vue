<template>
	<scroll-view enable-flex scroll-y class="home_category">
		<navigator class="category_item"
			v-for="item in category"
			:key="item.id"
			:url="`/pages/imgCategory/index?id=${item.id}`"
		>
			<image :src="item.cover" mode="aspectFill"></image>
			<view class="category_name">{{item.name}}</view>
		</navigator>
	</scroll-view>
</template>

<script>
	export default {
		data() {
			return {
				category: []
			}
		},
		mounted() {
			// 修改页面标题
			uni.setNavigationBarTitle({title: "分类"});
			this.getData();
		},
		methods: {
			// 获取数据
			getData() {
				this.request({
					url: 'http://157.122.54.189:9088/image/v1/vertical/category'
				}).then(result => {
					// console.log(result);
					this.category = result.res.category;
				})
			}
		},
		
		
	}
</script>

<style>
	.home_category {
		display: flex;
		flex-wrap: wrap;
		height: calc( 100vh - 36px )
	}
	.category_item {
		width: 33.33%;
		position: relative;
		border: 5rpx solid #fff;
	}
	.category_item image {
		height: 240rpx;
	}
	.category_name {
		width: 100%;
		height: 50rpx;
		position: absolute;
		bottom: 0;
		left: 0;
		color: #fff;
		font-size: 40rpx;
		padding-left: 20rpx;
		display: flex;
		align-items: center;
		// css3 渐变
		background-image: linear-gradient(to right top, rgba(0,0,0,.2),rgba(0,0,0,0));
	}
</style>
