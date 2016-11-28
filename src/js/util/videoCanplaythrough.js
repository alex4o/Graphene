export default function(vid){
//	console.log(vid)

	return new Promise((f,r) => {
		let {video} = vid
		video.oncanplaythrough = function(event){
			f({video ,event})
		}
	})
}