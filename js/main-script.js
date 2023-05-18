//////////////////////
/* GLOBAL VARIABLES */
//////////////////////
var scene, renderer;
var camera = new Array(5);
var active_camera = 3;
var geometry, material, mesh;

/////////////////////
/* CREATE SCENE(S) */
/////////////////////
function createScene() {
    'use strict';

    scene = new THREE.Scene();


    scene.add(new THREE.AxisHelper(10));
    
    createTorso(0, 0, 0);

}

//////////////////////
/* CREATE CAMERA(S) */
//////////////////////
function createFrontCamera(){
    const width = window.innerWidth;
    const height = window.innerHeight;
    camera[0] = new THREE.OrthographicCamera(
    width / -10, // Left
    width / 10,  // Right
    height / 10, // Top
    height / -10, // Bottom
    1, 1000 // Near and far planes
    );
    camera[0].position.set(0, 0, -100); // Adjust the position to fit your desired view
    camera[0].lookAt(scene.position);
}

function createLateralCamera(){
    const width = window.innerWidth;
    const height = window.innerHeight;
    camera[1] = new THREE.OrthographicCamera(
    width / -10, // Left
    width / 10,  // Right
    height / 10, // Top
    height / -10, // Bottom
    1, 1000 // Near and far planes
    );
    camera[1].position.set(100, 0, 0); // Adjust the position to fit your desired view
    camera[1].lookAt(scene.position);
}

function createTopCamera(){
    const width = window.innerWidth;
    const height = window.innerHeight;
    camera[2] = new THREE.OrthographicCamera(
    width / -10, // Left
    width / 10,  // Right
    height / 10, // Top
    height / -10, // Bottom
    1, 1000 // Near and far planes
    );
    camera[2].position.set(0, 100, 0); // Adjust the position to fit your desired view
    camera[2].lookAt(scene.position);
}

function createPerspectiveCamera() {
    'use strict';
    camera[3] = new THREE.PerspectiveCamera(70,
                                         window.innerWidth / window.innerHeight,
                                         1,
                                         1000);
    camera[3].position.x = 50;
    camera[3].position.y = 50;
    camera[3].position.z = 50;
    camera[3].lookAt(scene.position);
}

function createOrtographicCamera(){
    const width = window.innerWidth;
    const height = window.innerHeight;
    camera[4] = new THREE.OrthographicCamera(
    width / -10, // Left
    width / 10,  // Right
    height / 10, // Top
    height / -10, // Bottom
    1, 1000 // Near and far planes
    );
    camera[4].position.set(50, 60, 50); // Adjust the position to fit your desired view
    camera[4].lookAt(scene.position);

}



/////////////////////
/* CREATE LIGHT(S) */
/////////////////////

////////////////////////
/* CREATE OBJECT3D(S) */
////////////////////////
function addWaist(obj, x, y, z) {
    'use strict';

    geometry = new THREE.BoxGeometry(50, 15, 30);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addAbdomen(obj, x, y, z) {
    'use strict';

    geometry = new THREE.BoxGeometry(50, 25, 30);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y + 7.5 + 12.5, z);
    obj.add(mesh);
}

function addPectorals(obj, x, y, z) {
    'use strict';

    geometry = new THREE.BoxGeometry(80, 40, 30);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y + 7.5 + 25 + 20, z);
    obj.add(mesh);
    geometry = new THREE.PlaneGeometry(30, 15);
    var left_pectoral = new THREE.Mesh(geometry, material);
    var right_pectoral = new THREE.Mesh(geometry, material);
    left_pectoral.position.set(x - 20, y + 7.5 + 25 + 20 + 7.5, z - 15);
    right_pectoral.position.set(x + 20, y + 7.5 + 25 + 20 + 7.5, z - 15);
    obj.add(left_pectoral);
    obj.add(right_pectoral);
}

function addWheels(obj, x, y, z) {
    'use strict';

    geometry = new THREE.CylinderGeometry(10, 10, 15, 32);
    var left_wheel = new THREE.Mesh(geometry, material);
    var right_wheel = new THREE.Mesh(geometry, material);
    left_wheel.rotation.z=Math.PI/2;
    right_wheel.rotation.z=Math.PI/2;
    left_wheel.position.set(x - 25 - 7.5, y - 2.5, z);
    right_wheel.position.set(x + 25 + 7.5, y - 2.5, z);
    obj.add(left_wheel);
    obj.add(right_wheel);
}

//////////////////////
/* CHECK COLLISIONS */
//////////////////////
function checkCollisions(){
    'use strict';

}

///////////////////////
/* HANDLE COLLISIONS */
///////////////////////
function handleCollisions(){
    'use strict';
    for(var i = 0; i < objectsgroup.children.length-1; i++){
		//j = i + 1 -> important to avoid unecessary checks
		for(var j = i+1; j < objectsgroup.children.length; j++){
			objectsgroup.children[i].checkCollisions(objectsgroup.children[j]);
		}
	}
}

////////////
/* UPDATE */
////////////
function update(){
    'use strict';

}

/////////////
/* DISPLAY */
/////////////
function render() {
    'use strict';
    renderer.render(scene, camera[active_camera]);
}

////////////////////////////////
/* INITIALIZE ANIMATION CYCLE */
////////////////////////////////
function init() {
    'use strict';
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    createScene();
    createFrontCamera();
    createLateralCamera();
    createTopCamera();
    createPerspectiveCamera();
    createOrtographicCamera();

    render();

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
}

/////////////////////
/* ANIMATION CYCLE */
/////////////////////
function animate() {
    'use strict';
    render();

    requestAnimationFrame(animate);
}

////////////////////////////
/* RESIZE WINDOW CALLBACK */
////////////////////////////
function onResize() { 
    'use strict';

}

///////////////////////
/* KEY DOWN CALLBACK */
///////////////////////
function onKeyDown(e) {
    'use strict';
    switch (e.keyCode) {
        case 49: //1
            switch_camera(0);
            break;
        case 50:  //2
            switch_camera(1);
            break;
        case 51:  //3
            switch_camera(2);
            break;
        case 52:  //4
            switch_camera(3);
            break;
        case 53:  //5
            switch_camera(4);
            break;
        }
}

///////////////////////
/* KEY UP CALLBACK */
///////////////////////
function onKeyUp(e){
    'use strict';

}

function switch_camera(number) {
	active_camera = number;
}

function createTorso(x, y, z) {
    'use strict';

    var torso = new THREE.Object3D();

    material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });

    addWaist(torso, x, y, z);
    addAbdomen(torso, x, y, z);
    addPectorals(torso, x, y, z);
    addWheels(torso, x, y, z);

    scene.add(torso);
}