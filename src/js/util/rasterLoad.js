export default function(raster){
	return new Promise((f,r) => {
		raster.onLoad = function(event){
			f({raster,event})
		}
	})
}