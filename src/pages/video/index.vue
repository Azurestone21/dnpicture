<template>
	<view>
		<view class="video_tab">
			<view class="video_tab_title">
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
		
		<view class="video_tab_content">
			<view v-if="current < 4">
				<video-main :urlObj="{url:items[current].url, parmas:items[current].parmas}"></video-main>
			</view>
			<view v-if="current === 4">
				<video-category></video-category>
			</view>
		</view>
	</view>
</template>

<script>
	import {uniSegmentedControl} from "@dcloudio/uni-ui";
	import videoMain from "./video-main/index.vue";
	import videoCategory from "./video-category/index.vue";
	
	export default {
		components: {
			uniSegmentedControl,
			videoMain,
			videoCategory
		},
		data() {
			return {
				items: [
					{
						title: "推荐",
						url: "http://157.122.54.189:9088/videoimg/v1/videowp/featured",
						parmas: {
							limit: 15,
							skip: 0,
							order: "hot"
						},
					},
					{
						title: "娱乐",
						url: "http://157.122.54.189:9088/videoimg/v1/videowp/category/59b25abbe7bce76bc834198a",
						parmas: {
							limit: 15,
							skip: 0,
							order: "new"
						},
					},
					{
						title: "最新",
						url: "http://157.122.54.189:9088/videoimg/v1/videowp/videowp",
						parmas: {
							limit: 15,
							skip: 0,
							order: "new"
						},
					},
					{
						title: "热门",
						url: "http://157.122.54.189:9088/videoimg/v1/videowp/videowp",
						parmas: {
							limit: 15,
							skip: 0,
							order: "hot"
						},
					},
					{
						title: "分类",
						url: "http://157.122.54.189:9088/videoimg/v1/videowp/category",
						parmas: {},
						
					},
				],
				current: 0
			}
		},
		methods: {
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex;
				}
			}
		},
		onLoad() {
			
		}
	}
</script>

<style lang="scss">
	.video_tab_title {
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
</style>
