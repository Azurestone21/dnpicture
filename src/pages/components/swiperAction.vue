/*
	滑动组件
*/
<template>
	<view
		@touchstart="handleTouchStart"
		@touchend="handleTouchEnd"
	>
		<slot></slot>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 按下的时间
				startTime: 0,
				// 按下的坐标
				startX: 0,
				startY: 0
			}
		},
		methods: {
			// 按下屏幕
			handleTouchStart(event) {
				this.startTime = Date.now();
				this.startX = event.changedTouches[0].clientX;
				this.startY = event.changedTouches[0].clientY;
			},
			
			// 离开屏幕
			handleTouchEnd(event) {
				const endTime = Date.now();
				const endX = event.changedTouches[0].clientX;
				const endY = event.changedTouches[0].clientY;
				
				// 判断按下的时长
				if(endTime - this.startTime > 2000) {
					return;
				}
				
				// 滑动方向
				let direction = "";
				
				// 判断滑动距离是否合法 判断滑动方向
				if(Math.abs(endX - this.startX) > 10 && Math.abs(endY - this.startY) < 10) {
					// 滑动方向
					direction = endX - this.startX > 0 ? "right":"left";
				} else {
					return;
				}
				
				// console.log(direction);
				this.$emit("swiperAtion", {direction});
			}
		}
	}
</script>

<style>
</style>
