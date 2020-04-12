<template>
	<scroll-view @scrolltolower="handleScrolltolower" enable-flex scroll-y class="video-main">
		<view class="video-main_item"
			v-for="item in videowp"
			:key="item.id"
			@click="handleGoVideo(item)"
		>
			<image :src="item.img" mode="widthFix"></image>
		</view>
	</scroll-view>
</template>

<script>
	export default {
		data() {
			return {
				videowp: [],
				hasMore: true
			}
		},
		props:{
			urlObj: Object
		},
		// 发生变化时
		watch: {
			urlObj() {
				// console.log(this.urlObj);
				this.videowp = [];
				this.getData();
			}
			
		},
		// 页面加载完成时
		mounted() {
			// console.log(this.urlObj);
			this.getData();
		},
		methods: {
			getData() {
				this.request({
					url: this.urlObj.url,
					data: this.urlObj.params
				}).then(result => {
					// console.log(result);
					
					if(result.res.videowp.length === 0) {
						this.hasMore = false;
						uni.showToast({
							title: "没有数据了",
							icon: "none"
						});
						return;
					}
					
					this.videowp = [...this.videowp,...result.res.videowp];
				})
			},
			// 触底分页
			handleScrolltolower() {
				if(this.hasMore) {
					this.urlObj.parmas.skip += this.urlObj.parmas.limit;
					this.getData();
				} else {
					uni.showToast({
						title: "没有数据了",
						icon: "none"
					});
				}
			},
			// 点击图片跳转
			handleGoVideo(item) {
				// 将数据保存为全局数据
				getApp().globalData.video = item;
				// 跳转
				uni.navigateTo({
					url: "/pages/videoPlay/index"
				})
			}
		}
	}
</script>

<style lang="scss">
	.video-main {
		display: flex;
		flex-wrap: wrap;
		height: calc(100vh - 36px);
	}
	.video-main_item {
		width: 33.33%;
		border: 3rpx solid #fff;
	}
</style>
