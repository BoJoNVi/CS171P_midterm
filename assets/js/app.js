//------------------Scene & Camera------------------
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 100;
scene.background = new THREE.TextureLoader().load( 'assets/textures/sky.jpg' );

//------------------Drawables------------------
//Model
let booksModel = function(){
  this.mesh = new THREE.Object3D();
  var boxGeo = new THREE.BoxBufferGeometry(10,10,2);
  var boxMesh = new THREE.MeshPhongMaterial({map:new THREE.TextureLoader().load( 'assets/textures/book.jpg') });
  this.books1 = new THREE.Mesh(boxGeo, boxMesh);
  this.books1.position.x = -10,
  this.books2 = new THREE.Mesh(boxGeo, boxMesh);
  this.books2.position.x = 0,
  this.books3 = new THREE.Mesh(boxGeo, boxMesh);
  this.books3.position.x = 10,
  this.mesh.add(this.books1);
  this.mesh.add(this.books2);
  this.mesh.add(this.books3);
}

let statueModel = function(){
  this.mesh = new THREE.Object3D();
  let statueVar = this.mesh;
  let loader = new THREE.GLTFLoader();
  loader.load( 'assets/models/Anime/scene.gltf', function ( gltf ) {
    gltf.scene.position.y = -20;
    statueVar.add(gltf.scene);;
  }, undefined, function ( error ) {
    console.error( error );
  } );
}
let statue = new statueModel();
scene.add(statue.mesh);

let baloonModel = function(){
  this.mesh = new THREE.Object3D();
  let statueVar = this.mesh;
  let loader = new THREE.GLTFLoader();
  loader.load( 'assets/models/balon/scene.gltf', function ( gltf ) {
    gltf.scene.position.y = 10;
    gltf.scene.scale.set(0.08,0.08,0.08);
    gltf.scene.position.x = 130;
    statueVar.add(gltf.scene);;
  }, undefined, function ( error ) {
    console.error( error );
  } );
  this.books = new booksModel();
  this.books.mesh.position.x = 130;
  this.mesh.add(this.books.mesh);
}
let baloon = new baloonModel();
baloon.mesh.position.x = 100;
scene.add(baloon.mesh);

let airplaneModel = function(){
  this.mesh = new THREE.Object3D();
  let statueVar = this.mesh;
  let loader = new THREE.GLTFLoader();
  loader.load( 'assets/models/ariplane/scene.gltf', function ( gltf ) {
    gltf.scene.position.y = 10;
    gltf.scene.scale.set(5,5,5);
    gltf.scene.position.z = -130;
    statueVar.add(gltf.scene);;
  }, undefined, function ( error ) {
    console.error( error );
  } );
  this.books = new booksModel();
  this.books.mesh.position.z = -130;
  this.mesh.add(this.books.mesh);
}
let airplane = new airplaneModel();
airplane.mesh.position.z = -100;
scene.add(airplane.mesh);



//Ground
floor = new THREE.Mesh(new THREE.BoxBufferGeometry(100, 10, 100), 
new THREE.MeshPhongMaterial({map:new THREE.TextureLoader().load( 'assets/textures/bluee.jfif') }));
floor.position.y = -25;
floor.receiveShadow = true;
floor.castShadow = true;
scene.add(floor);


//----------------------sounds------------------
var listener = new THREE.AudioListener();

    // create an Audio source
    var sound = new THREE.Audio(listener);

    // load a sound and set it as the Audio object's buffer
    var audioLoader = new THREE.AudioLoader();
    audioLoader.load('assets/music/meme.mp3', function (buffer) {
      sound.setBuffer(buffer);
      sound.setLoop(true);
      sound.setVolume(0.5);
      sound.play();
    });


//------------------Lightings------------------
let ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
scene.add(ambientLight);


//------------------Renderer------------------
let renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.BasicShadowMap;


//------------------Functions------------------
let counter = 0;
controls = new THREE.OrbitControls (camera, renderer.domElement);
function animate() {
  scene.rotation.y += 0.005;
  if (counter == 0){
    airplane.mesh.position.z += 0.5;
    airplane.mesh.position.x = -(Math.sqrt(10000 - (airplane.mesh.position.z * airplane.mesh.position.z)));
  }
  else{
    airplane.mesh.position.z -= 0.5;
    airplane.mesh.position.x = Math.sqrt(10000 - (airplane.mesh.position.z * airplane.mesh.position.z));
  }
  if (airplane.mesh.position.z == 100){
    counter = 1;
  }
  else if (airplane.mesh.position.z == -100){
    counter = 0;
  }
  if (airplane.mesh.position.z < -80){
    airplane.mesh.position.y = 1000;
    airplane.books.mesh.position.y = 0;
    airplane.books.books1.position.x = -10;
    airplane.books.books2.position.x = 0;
    airplane.books.books3.position.x = 10;
  }
  else if (airplane.mesh.position.z > -80 && airplane.mesh.position.y == 1000){
    airplane.mesh.position.y = 0;
  }
  if (airplane.mesh.position.z > 70){
    airplane.books.mesh.position.y -= 0.5;
    airplane.books.books1.position.x -= 0.2;
    airplane.books.books2.position.x -= 0.1;
    airplane.books.books3.position.x += 0.1;
    if (airplane.books.mesh.position.y < -30){
      airplane.books.mesh.position.y -= 100;
    }
  }

  //baloon
  if (counter == 0){
    baloon.mesh.position.x -= 0.5;
    baloon.mesh.position.z = -(Math.sqrt(10000 - (baloon.mesh.position.x * baloon.mesh.position.x)));
  }
  else{
    baloon.mesh.position.x += 0.5;
    baloon.mesh.position.z = Math.sqrt(10000 - (baloon.mesh.position.x * baloon.mesh.position.x));
  }
  if (baloon.mesh.position.x > 80){
    baloon.mesh.position.y = 1000;
    baloon.books.mesh.position.y = 0;
    baloon.books.books1.position.x = -10;
    baloon.books.books2.position.x = 0;
    baloon.books.books3.position.x = 10;
  }
  else if (baloon.mesh.position.x < 80 && baloon.mesh.position.y == 1000){
    baloon.mesh.position.y = 0;
  }
  if (baloon.mesh.position.x < -70){
    baloon.books.mesh.position.y -= 0.5;
    baloon.books.books1.position.x -= 0.2;
    baloon.books.books2.position.x -= 0.1;
    baloon.books.books3.position.x += 0.1;
    if (baloon.books.mesh.position.y < -30){
      baloon.books.mesh.position.y -= 100;
    }
  }
  if (statue.mesh.position.x > 20){
    statue.books.mesh.position.y += 0.1;
    statue.books.books1.position.x -= 0.2;
    statue.books.books2.position.x -= 0.1;
    statue.books.books3.position.x += 0.1;
  }
  controls.update();

renderer.render(scene, camera);
requestAnimationFrame(animate);
}
animate();  