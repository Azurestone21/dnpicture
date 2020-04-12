<template>
	<view class="">
		<!-- 专辑背景 -->
		<view class="album_bg">
			<image :src="album.cover" mode="widthFix"></image>
			<view class="album_info">
				<view class="album_name">{{album.name}}</view>
				<view class="album_btn">关注专辑</view>
			</view>
		</view>
		
		<!-- 专辑作者 -->
		<!-- text 可以识别换行符 -->
		<view class="album_author">
			<view class="album_author_info">
				<image :src="album.user.avatar" mode="widthFix"></image>
				<view class="album_author_name">{{album.user.name}}</view>
			</view>
			<view class="album_author_desc">
				<text>{{album.desc}}</text>
			</view>
		</view>
	
		<!-- 图片列表 -->
		<view class="album_list">
			<view class="album_list_item"
				v-for="(item,index) in wallpaper"
				:key="item.id">
				<go-detail :list="wallpaper" :index="index">
					<image :src="item.thumb+item.rule.replace('$<Height>', 360)" mode="scaleToFill"></image>
				</go-detail>
			</view>
		</view>
	</view>
</template>

<script>
	import goDetail from "@/pages/components/goDetail.vue"
	export default {
		components: {
			goDetail
		},
		data() {
			return {
				params: {
					limit: 15,
					order: "new",
					skip: 0,
					// 1 返回值中 有album对象 表示第一次请求数据
					// 0 返回值中 只有wallpaper数组 不是第一次请求数据
					first: 1
				},
				id: -1,
				album: {},
				wallpaper: [],
				hasMore: true
			}
		},
		onLoad(options) {
			// console.log(options)
			this.id = options.id;
			// this.id = "5d5f8e45e7bce75ae7fb8278";
			this.getData();
		},
		// 触底 分页 这个用于没有头部导航栏
		onReachBottom() {
			if(this.hasMore) {
				this.params.first = 0;
				this.params.skip += this.params.limit;
				this.getData();
			} else {
				uni.showToast({
					title: "没有数据了",
					icon: "none"
				})
			}
		},
		methods: {
			getData() {
				this.request({
					url:`http://157.122.54.189:9088/image/v1/wallpaper/album/${this.id}/wallpaper`,
					data: this.params
				}).then(result => {
					// console.log(result);
					
					// 对象不能直接.length获取长度
					if (Object.keys(this.album).length === 0) {
					    this.album = result.res.album;
					}
					
					if(result.res.wallpaper.length === 0) {
						this.hasMore = false;
						uni.showToast({
							title: "没有数据了",
							icon: "none"
						})
						return;
					}
					
					this.wallpaper = [...this.wallpaper,...result.res.wallpaper];
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.album_bg {
		position: relative;
	}
	.album_bg image {}
	.album_info {
		position: absolute;
		width: 100%;
		left: 0;
		bottom: 0;
		padding: 5rpx 20rpx 30rpx;
		display: flex;
		justify-content: space-between;
		color: #fff;
		align-items: center;
	}
	.album_name {
		font-size: 40rpx;
	}
	.album_btn {
		background-color: $color;
		padding: 5rpx 10rpx;
		width: 150rpx;
		height: 50rpx;
		border-radius: 10rpx;
		text-align: center;
	}
	
	// 专辑作者
	.album_author {
		padding: 10rpx;
	}
	.album_author_info {
		display: flex;
		padding: 10rpx 0;
	}
	.album_author_info image {
		width: 50rpx;
		height: 50rpx;
	}
	.album_author_name {
		color: #000;
		margin-left: 15rpx;
	}
	.album_author_desc {}
	
	.album_list {
		display: flex;
		flex-wrap: wrap;
	}
	.album_list_item {
		width: 33.33%;
		border: 3rpx solid #fff;
	}
	.album_list_item image {
		height: 180rpx;
	}
</style>
