var autoprefixer = require("autoprefixer")
var precss = require("precss")
var lost = require("lost")
var cssnext = require("postcss-cssnext")
var webpack = require("webpack")

var LiveReloadPlugin = require('webpack-livereload-plugin');


module.exports = {
	entry: {
		main: "./js/main.js",
		game: "./js/game.js",
		test: "./js/test.js"
	},
	devtool: "eval-source-map",
	output: {
		path: "./out",
		filename: "[name].bundle.js"
	},
	module: {
		loaders: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: "babel",
			query: {
				cacheDirectory: true,
				plugins: ["transform-runtime", "transform-regenerator"],
				presets: ["es2015", "stage-0", "react"]
			}

		}, {
			test: /\.css$/,
			loader: "style-loader!raw-loader!postcss-loader"
		}, {
			test: /\.(eot|woff|woff2|ttf|otf|svg|png|jpg)$/,
			loader: "file-loader"
		}]
	},
	plugins: [
		//new webpack.optimize.CommonsChunkPlugin("commons.chunk.js"),
		//new LiveReloadPlugin(),
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
			"window.jQuery": "jquery"
		})
		//new webpack.optimize.DedupePlugin(),
		/*new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			},
			beautify: true,
		//	mangle: false
		}),*/
		//new webpack.optimize.OccurrenceOrderPlugin()
	],
	postcss: function() {
		return {
			defaults: [precss, lost, cssnext],
			cleaner: [autoprefixer({
				browsers: ["last 3 version"]
			})]
		}
	},
	resolve: {
		modulesDirectories: ["./node_modules"]
	},
	devServer: {
		host: "0.0.0.0",
		posrt: 8080,
		contentBase: "./out",
		publicPath: "./out",
		inline: true,
		progress: true
	//	hot: true
	}
	//,plugins: [/*new EncodingPlugin("utf-8"),*/ new BomPlugin(true)]
}
