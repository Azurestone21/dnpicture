<template>
	<view class="video_play">
		<!-- 背景 -->
		<image :src="videoObj.img"></image>
		
		<!-- 工具 -->
		<view class="video_tool">
			<button open-type="share"></button>
			<view @click="handleMuted" :class="['iconfont', muted?'iconjingyin':'iconshengyin']"></view>
			<view class="iconfont iconzhuanfa">
				<button open-type="share"></button>
			</view>
		</view>
		
		<!-- 播放器 -->
		<view class="video_wrap">
			<video :muted="muted" :src="videoObj.video" objectFit="fill"></video>
		</view>
		
		<!-- 下载 -->
		<view class="download">
			<view class="download_btn" @click="handleDownload">下载高清</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				videoObj: {},
				// 是否静音
				muted: false
			}
		},
		onLoad() {
			// console.log(getApp().globalData.video);
			this.videoObj = getApp().globalData.video;
		},
		methods: {
			handleMuted() {
				this.muted = !this.muted;
			},
			// 下载视频
			async handleDownload() {
				await uni.showLoading({ title: "下载中" });
				
				// 1.将远程文件下载到小程序内存中
				const {tempFilePath} = (
					await uni.downloadFile({
						url: this.videoObj.video
					})
				)[1];
				
				// 2.将内存中的文件下载到本地
				await uni.saveVideoToPhotosAlbum({
					filePath: tempFilePath
				});
				
				uni.hideLoading();
				
				await uni.showToast({ 
					title: "下载成功" ,
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.video_play {
		position: relative;
	}
	.video_play image {
		position: absolute;
		width: 100vw;
		height: 100vh;
		z-index: -1;
		// css3 滤镜
		filter: blur(20px);
	}
	
	.video_tool {
		height: 100rpx;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}
	.video_tool .iconfont {
		width: 80rpx;
		height: 80rpx;
		color: #fff;
		font-size: 50rpx;
		border-radius: 50%;
		background-color: rgba(0,0,0,.2);
		display: flex;
		justify-content: center;
		align-items: center;
		margin-right: 10rpx;
	}
	.iconzhuanfa {
		position: relative;
	}
	.iconzhuanfa button {
		position: absolute;
		width: 100%;
		height: 100%;
		opacity: 0;
	}
	
	.video_wrap {
		display: flex;
		justify-content: center;
	}
	.video_wrap video {
		width: 360rpx;
		height: 600rpx;
	}
	
	.download {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 30rpx;
	}
	.download_btn {
		width: 360rpx;
		height: 80rpx;
		font-size: 30rpx;
		color: #fff;
		border: 1rpx solid #fff;
		border-radius: 40rpx;
		background-color: rgba(0,0,0,.4);
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
