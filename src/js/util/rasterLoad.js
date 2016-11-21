export default function(raster){
	return new Promise((f,r) => {
			//f({raster,event})
		
		raster.onLoad = function(event){
			f({raster,event})
		}
	})
}