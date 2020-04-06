export default (params) => {
	return new Promise((resolve, reject) => {
		
		// 加载中
		uni.hideLoading({
			title: '加载中'
		})
		
		wx.request({
			...params,
			success(res) {
				resolve(res)
			},
			fail(err) {
				reject(err)
			},
			complete() {
				// uni.hideLoading()
			}
		})
	})
}