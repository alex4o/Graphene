//modify за размер и брой на точките
let {Scene, PerspectiveCamera, WebGLRenderer, SphereGeometry, MeshBasicMaterial, DirectionalLight, Mesh} = require("three")

var star_size = 0.06
var star_count = 200

var scene = new Scene()
var camera = new PerspectiveCamera(80, window.innerWidth/window.innerHeight, 0.1, 1000)
	
camera.position.z = 10


var renderer = new WebGLRenderer()
	
renderer.setSize(window.innerWidth, window.innerHeight)

// document.body.appendChild(renderer.domElement)

var object = new SphereGeometry(star_size,20,100)
var material = new MeshBasicMaterial({ color: 0xF0F0F0 })

// var spriteMaterial = new THREE.SpriteMaterial( 
// { 
// 	map: new THREE.ImageUtils.loadTexture( 'glow.png' ), 
// 	useScreenCoordinates: false,
// 	color: 0x003070, transparent: false, blending: THREE.AdditiveBlending
// });

// var sprite = new THREE.Sprite( spriteMaterial );
// sprite.scale.set(50, 50, 2.0);

var finalgeometry = new Array(star_count)
var animtoggle = new Array(star_count)

//функция за рандъм числа в интервал

var rng = function(min, max){
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random()*  (max - min)) + min
};
	//анимацийка
var floatanimation = function (anim, speed_rot, speed) {


	if(animtoggle[anim.id])
	{
		anim.position.y += speed					
		if(anim.position.y > 10)
		{
			animtoggle[anim.id] = false
		}
	} 
	else if (!animtoggle[anim.id])
	{
		anim.position.y -= speed
		if (anim.position.y < -10)
		{
			animtoggle[anim.id] = true
		}						
	}
};

var light = new DirectionalLight( 0xffffff, 1 )
	light.position.x = 5
	light.position.y = 0
	light.position.z = 10
	scene.add(light)


let jeze = 30

// създаване на всяка "звезда" и и давам рандъм кординати.
for (var i = 0; i <= star_count; i++) {		
	finalgeometry[i] = new Mesh(object, material)
	animtoggle[i] = true;

	finalgeometry[i].position.y = rng(-jeze,jeze)
	finalgeometry[i].position.x = rng(-jeze,jeze)
	finalgeometry[i].position.z = rng(-10,5)

	// finalgeometry[i].add(sprite)
	scene.add(finalgeometry[i])

	//тоз шит не работеше
	// console.log(i + "th object created.");
}

function animation(){
	for (var i = 0; i < star_count; i++) {
		floatanimation(finalgeometry[i], 0, 0.005);
	}
}

function tellPos(p){
	let {pageX, pageY} = p
	let perX = 1 - pageX / (window.innerWidth/2)
	let perY = 1 - pageY / (window.innerHeight/2)

	camera.rotation.y = Math.PI * perX/20
	camera.rotation.x = Math.PI * perY/20

	light.position.x = perX * 5
	light.position.y = perY * 5
}

window.addEventListener('mousemove', tellPos, false);

export default {scene, animation, renderer, camera}



// //loop за рендиране на всеки кадър.
// var render = function () {




// 	renderer.render(scene,camera);

// 	requestAnimationFrame(render);
// };

// render();