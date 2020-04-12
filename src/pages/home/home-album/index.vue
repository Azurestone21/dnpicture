<template>
	<scroll-view scroll-y @scrolltolower="handleToLower()" class="album_scroll_view">
		<!-- 
		 1.自动轮播
		 2.提示器
		 3.循环轮播
		 4.swiper
			默认高度  150px
		 5.image
			默认高度 320px => 基本样式中，重置了100%
			默认高度 240px
		 6.计算图片的宽度和高度的比例
		 7.把图片的比例写到swiper的样式中
		 8.swiper-item
			100%
		 -->
		<view class="album_swiper">
			<swiper :indicator-dots="true" :autoplay="true" :interval="3000" circular>
				<swiper-item 
					v-for="item in banner"
					:key="item.id"
				>
					<image :src="item.thumb"></image>
				</swiper-item>
			</swiper>
		</view>
		
		<!-- 列表 -->
		<view class="album_list">
			<navigator class="album_item"
				v-for="item in album"
				:key="item.id"
				:url= "`/pages/album/index?id=${item.id}`" 
			>
				<view class="album_img">
					<image mode="aspectFill" :src="item.cover"></image>
				</view>
				<view class="album_info">
					<view class="album_name">
{{item.name}}</view>
					<view class="album_desc">{{item.desc}}</view>
					<view class="album_btn">
						<view class="album_attention">关注</view>
					</view>
				</view>
			</navigator>
		</view>
	</scroll-view>
</template>

<script>
	export default {
		data() {
			return {
				parmas: {
					limit: 5,
					// order: "new",
					skip: 0
				},
				// 轮播图数据
				banner: [],
				// 列表数据
				album: [],
				// 是否有更多信息
				hasMore: true
			}
		},
		mounted() {
			// 修改页面标题
			uni.setNavigationBarTitle({
				title: "专辑"
			})
			this.getData();
			
		},
		methods: {
			// 获取数据
			getData() {
				this.request({
					url: "https://result.eolinker.com/PH6tj4h20f6d1ca01405596638e254cd9e354c4774d7610?uri=/wallpaper/album",
					data: this.parmas
				}).then(result => {
					console.log(result);
					if(this.album.length === 0) {
						this.banner = result.res.banner;	
					}
					if(result.res.album.length === 0) {
						this.hasMore = false;
						return;
					}
					this.album = [...this.album,...result.res.album];
				})
			},
			// 分页
			handleToLower() {
				// console.log("到底了");
				if(this.hasMore) {
					this.parmas.skip += this.parmas.limit;
					this.getData()
				} else {
					uni.showToast({
						title:"没有更多数据了",
						icon:"none"
					})
				}
				
			}
		}
	}
</script>

<style lang="scss" scoped>

	.album_scroll_view {
		height: calc(100vh - 36px);
	}
	
	/* 轮播图 */
	.album_swiper {
		swiper {
			height: calc(750rpx / 2.3);
		}
	}
	swiper image {
		height: 100%;
	}
	
	/* 列表 */
	.album_list {
		padding: 10rpx;
	}
	.album_item {
		padding: 20rpx 0;
		display: flex;
		border: 1rpx solid #ccc;
	}
	.album_img {
		flex: 1;
	}
	.album_img image {
		width: 200rpx;
		height: 200rpx;
	}
	.album_info {
		flex: 2;
		padding: 10rpx;
		overflow: hidden;
	}
	.album_name {
		font-size: 30rpx;
		color: #000;
		padding: 10rpx 0;
	}
	.album_desc {
		padding: 10rpx 0;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}
	.album_btn {
		display: flex;
		justify-content: flex-end;
		padding: 10rpx;
	}
	.album_attention {
		text-align: center;
		width: 90rpx;
		height: 45rpx;
		color: $color;
		border: 1rpx solid $color;
	}
</style>
