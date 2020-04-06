<template>
	<!-- 处理月份显示undefine和图片后，再显示真正月份的问题 -->
	<scroll-view scroll-y @scrolltolower="handleToLower" class="recommend_view" v-if="recommends.length>0">
		<!-- 推荐 -->
		<view class="recommend_wrap">
			<view class="recommend_item"
				v-for="item in recommends"
				:key="item.id"
			>
				<image :src="item.thumb" mode="widthFix"></image>
			</view>
		</view>
		
		<!-- 月份 -->
		<view class="month_wrap">
			<view class="month_title">
				<view class="month_info">
					<text>{{monthes.DD}} / </text>
					{{monthes.MM}} 月
				</view>
				<view class="month_text">{{monthes.title}}</view>
			</view>
			<view class="month_more">更多 > </view>
		</view>
		<view class="month_content">
			<view class="month_content_item"
				v-for="item in monthes.items"
				:key="item.id"
			>
				<image :src="item.thumb + item.rule.replace('$<Height>', 360)" mode="aspectFill"></image>
			</view>
		</view>
		
		<!-- 热门 -->
		<view class="hot_wrap">
			<view class="hot_title">
				<text>热门</text>
			</view>
			<view class="hot_content">
				<view class="hot_item"
					v-for="item in hots"
					:key="item.id">
					<image :src="item.thumb" mode="widthFix"></image>
				</view>
			</view>
		</view>
	</scroll-view>
</template>

<script>
	import moment from "moment"
	export default {
		data() {
			return {
				// 推荐列表
				recommends: [],
				monthes: {},
				hots: [],
				// 请求的数据
				params: {
					// 获取几条数据
					limit: 30,
					// 关键字
					order: "hot",
					// 跳过几条数据
					skip: 0
				},
				// 是否还有下一页
				hasMore: true
			}
		},
		mounted() {
			this.getData();
		},
		methods: {
			// 获取数据事件
			getData() {
				this.request({
					url: "https://result.eolinker.com/PH6tj4h20f6d1ca01405596638e254cd9e354c4774d7610?uri=/homepage/vertical",
					data: this.params,
				}).then(result=>{
					console.log(result);
					
					if(result.data.res.vertical === 0) {
						this.hasMore = false;
						return;
					}
					
					if(this.recommends.length === 0) {
						// 第一次请求数据
						// 推荐模块
						this.recommends = result.data.res.homepage[1].items;
						// 月份模块
						this.monthes = result.data.res.homepage[2];
						// 改变月份格式  24 / 1月
						this.monthes.MM = moment(this.monthes.stime).format("MM");
						this.monthes.DD = moment(this.monthes.stime).format("DD");
						// console.log(this.monthes);
					}

					// 热门模块
					// this.hots = result.data.res.vertical;
					// 数据拼接
					this.hots = [...this.hots,...result.data.res.vertical];
				})
			},
			
			// 滚动触底事件
			handleToLower() {
				// console.log("到底了")
				/*
					1. 修改参数
					2. 重新请求数据
					3. 数据叠加
				*/
			   if(this.hasMore) {
				   // 如果还有数据
				   this.params.skip += this.params.limit;
				   this.getData();
			   } else {
				   // 弹窗提示没有数据了
				   uni.showToast({
						title: "没有数据了",
						icon: "none"
				   })
			   }
			   
			},
		}
	}
</script>

<style lang="scss">
	.recommend_view {
		// height = 屏幕高度 - 头部标题
		height: calc( 100vh - 36px )
	}
	// 推荐
	.recommend_wrap {
		display: flex;
		flex-wrap: wrap;
	}
	.recommend_item {
		width: 50%;
		border: 5rpx solid #ffffff;
	}
	
	// 月份
	.month_wrap {
		display: flex;
		justify-content: space-between;
		padding: 30rpx;
	}
	.month_title {
		font-weight: 600;
		display: flex;
	}
	.month_info {
		font-size: 30rpx;
		color: $color;
	}
	.month_info text {
		font-size: 36rpx;
	}
	.month_text {
		font-size: 33rpx;
		margin-left: 30rpx;
	}
	.month_more {
		color: $color;
		padding-top: 10rpx;
	}
	
	.month_content {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}
	.month_content_item {
		width: 33.33%;
		border: 5rpx solid #ffffff;
	}

	// 热门
	.hot_title {
		padding: 20rpx;
	}
	.hot_title text {
		font-size: 33rpx;
		font-weight: 600;
		border-left: 10rpx solid $color;
		padding-left: 20rpx;
	}
	.hot_content {
		display: flex;
		flex-wrap: wrap;
	}
	.hot_item {
		width: 33.33%;
		border: 5rpx solid #ffffff;
	}
</style>
