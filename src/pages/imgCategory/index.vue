<template>
	<view>
		<view class="category_tab">
			<view class="category_tab_title">
				<view class="title_inner">
					<uni-segmented-control
						:current="current" 
						:values="items.map(v=>v.title)" 
						@clickItem="onClickItem" 
						style-type="text" 
						active-color="#d4237a">
					</uni-segmented-control>
				</view>
				<view class="iconfont iconsearch"></view>
			</view>
		</view>
		
		<scroll-view @scrolltolower="handleScrolltolower" enable-flex scroll-y class="category_tab_content">
			<view class="category_item" v-for="item in vertical"
				:key="item.id">
				<image :src="item.thumb" mode="widthFix"></image>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import {uniSegmentedControl} from "@dcloudio/uni-ui";
	export default {
		components: {
			uniSegmentedControl
		},
		data() {
			return {
				items: [
					{title: "最新", order: "new"},
					{title: "热门", order: "hot"},
				],
				current: 0,
				parmas: {
					limit: 15,
					skip: 0,
					order: "new"
				},
				id: 0,
				// 数据
				vertical:[],
				// 是否有下一页数据
				hasMore: true
			}
		},
		onLoad(options) {
			this.id = options.id;
			this.getData();
			// console.log(this.id);
		},
		methods: {
			// 切换
			onClickItem(e) {
				/*
					1.切换标题
					2.切换order
					3.重新发送请求
				*/
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex;
				} else {
					return;
				}
				this.parmas.order = this.items[e.currentIndex].order;
				this.parmas.skip = 0;
				this.vertical = [];
				this.getData();
				
			},
			// 获取数据
			getData() {
				this.request({
					url: `http://157.122.54.189:9088/image/v1/vertical/category/${this.id}/vertical`,
					data: this.parmas
				}).then(result => {
					// console.log(result)
					
					if(result.res.vertical.length === 0) {
						this.hasMore = false;
						uni.showToast({
							title: "没有数据了",
							icon: "none"
						});
						return;
					}
					
					this.vertical = [...this.vertical,...result.res.vertical];
				})
			},
			// 触底
			handleScrolltolower() {
				if(this.hasMore) {
					this.parmas.skip += this.parmas.limit;
					this.getData();
				} else {
					uni.showToast({
						title: "没有数据了",
						icon: "none"
					})
				}
			}
		},
	}
</script>

<style lang="scss">
	.category_tab_title {
		position: relative;
	}	
	.title_inner {
		width: 60%;
		margin: 0 auto;
	}
	.iconsearch {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		right: 5%;
	}
	
	.category_tab_content {
		display: flex;
		flex-wrap: wrap;
		height: calc(100vh - 36px);
	}
	.category_item {
		width: 33.33%;
		border: 5rpx solid #fff;
	}
</style>
	