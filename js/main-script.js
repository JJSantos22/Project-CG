//////////////////////
/* GLOBAL VARIABLES */
//////////////////////
var scene, renderer;
var camera = new Array(5);
var active_camera = 3;
var geometry, material, mesh;
const robot_elements = 28;
const trailer_elements = 7;
var grey = new THREE.MeshBasicMaterial({ color: 0x6C6C6C, wireframe: true });
var black = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true });
var blue = new THREE.MeshBasicMaterial({ color: 0x0000FF, wireframe: true });
var red = new THREE.MeshBasicMaterial({ color: 0xFF0000, wireframe: true });
var elements = new Array(trailer_elements);

var trailer;

/////////////////////
/* CREATE SCENE(S) */
/////////////////////
function createScene() {
    'use strict';

    scene = new THREE.Scene();

    scene.background = new THREE.Color(0x404040);

    scene.add(new THREE.AxisHelper(10));
    
    /* createTorso(0, 0, 0);
    createLegs(0, 0, 0);
    createHead(0, 0, 0);
    createArms(0, 0, 0);*/
    createTrailer(0, 0, 0);

}

//////////////////////
/* CREATE CAMERA(S) */
//////////////////////
function createFrontCamera(){
    const width = window.innerWidth;
    const height = window.innerHeight;
    camera[0] = new THREE.OrthographicCamera(
    width / -7.5, // Left
    width / 7.5,  // Right
    height / 7.5, // Top
    height / -7.5, // Bottom
    1, 1000 // Near and far planes
    );
    camera[0].position.set(0, 0, -100); // Adjust the position to fit your desired view
    camera[0].lookAt(scene.position);
}

function createLateralCamera(){
    const width = window.innerWidth;
    const height = window.innerHeight;
    camera[1] = new THREE.OrthographicCamera(
    width / -7.5, // Left
    width / 7.5,  // Right
    height / 7.5, // Top
    height / -7.5, // Bottom
    1, 1000 // Near and far planes
    );
    camera[1].position.set(-100, 0, 0); // Adjust the position to fit your desired view
    camera[1].lookAt(scene.position);
}

function createTopCamera(){
    const width = window.innerWidth;
    const height = window.innerHeight;
    camera[2] = new THREE.OrthographicCamera(
    width / -7.5, // Left
    width / 7.5,  // Right
    height / 7.5, // Top
    height / -7.5, // Bottom
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
    camera[3].position.x = -100;
    camera[3].position.y = 100;
    camera[3].position.z = -100;
    camera[3].lookAt(scene.position);
}

function createOrtographicCamera(){
    const width = window.innerWidth;
    const height = window.innerHeight;
    camera[4] = new THREE.OrthographicCamera(
    width / -7.5, // Left
    width / 7.5,  // Right
    height / 7.5, // Top
    height / -7.5, // Bottom
    1, 1000 // Near and far planes
    );
    camera[4].position.set(-100, 150, -100); // Adjust the position to fit your desired view
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
    mesh = new THREE.Mesh(geometry, red);
    mesh.position.set(x, y, z);
    obj.add(mesh);
    elements[0] = mesh;
}

function addAbdomen(obj, x, y, z) {
    'use strict';

    geometry = new THREE.BoxGeometry(50, 25, 30);
    mesh = new THREE.Mesh(geometry, red);
    mesh.position.set(x, y + 7.5 + 12.5, z);
    obj.add(mesh);
    elements[1] = mesh;
}

function addPectorals(obj, x, y, z) {
    'use strict';

    geometry = new THREE.BoxGeometry(80, 40, 30);
    mesh = new THREE.Mesh(geometry, red);
    mesh.position.set(x, y + 7.5 + 25 + 20, z);
    obj.add(mesh);
    elements[2] = mesh;
    geometry = new THREE.PlaneGeometry(30, 15);
    var left_pectoral = new THREE.Mesh(geometry, grey);
    var right_pectoral = new THREE.Mesh(geometry, grey);
    left_pectoral.position.set(x - 20, y + 7.5 + 25 + 20 + 7.5, z - 15);
    right_pectoral.position.set(x + 20, y + 7.5 + 25 + 20 + 7.5, z - 15);
    obj.add(left_pectoral);
    obj.add(right_pectoral);
    elements[3] = left_pectoral;
    elements[4] = right_pectoral;
}

function addWheels(obj, x, y, z) {
    'use strict';

    geometry = new THREE.CylinderGeometry(10, 10, 15, 32);
    var left_wheel = new THREE.Mesh(geometry, black);
    var right_wheel = new THREE.Mesh(geometry, black);
    left_wheel.rotation.z=Math.PI/2;
    right_wheel.rotation.z=Math.PI/2;
    left_wheel.position.set(x - 25 - 7.5, y - 2.5, z);
    right_wheel.position.set(x + 25 + 7.5, y - 2.5, z);
    obj.add(left_wheel);
    obj.add(right_wheel);
    elements[5] = left_wheel;
    elements[6] = right_wheel;
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

    //renderer.setSize(window.innerWidth, window.innerHeight);

    /* if (window.innerHeight > 0 && window.innerWidth > 0) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    } */
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
        case 54:  //6
            color_transformation();
            render();
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

    addWaist(torso, x, y, z);
    addAbdomen(torso, x, y, z);
    addPectorals(torso, x, y, z);
    addWheels(torso, x, y, z);

    scene.add(torso);
}

function createLegs(x, y, z) {
    'use strict';

    var legs = new THREE.Object3D();

    addThighs(legs, x, y, z);
    addShins(legs, x, y, z);
    addLegWheels(legs, x, y, z);
    addFeet(legs, x, y, z);

    scene.add(legs);
}

function createHead(x, y, z) {
    'use strict';

    var head = new THREE.Object3D();
    head.add(new THREE.AxisHelper(10));
    addHead(head, x, y, z);

    scene.add(head);
}

function createArms(x, y, z) {
    'use strict';

    var arms = new THREE.Object3D();

    addUpperArms(arms, x, y, z);
    addExhaustPipe(arms, x, y, z);
    addForearms(arms, x, y, z);

    scene.add(arms);
}

function addThighs(obj, x, y, z) {
    'use strict';

    geometry = new THREE.BoxGeometry(10, 30, 10);
    var left_thigh = new THREE.Mesh(geometry, grey);
    var right_thigh = new THREE.Mesh(geometry, grey);
    left_thigh.position.set(x - 12.5 - 2.5, y - 7.5 - 15, z);
    right_thigh.position.set(x + 12.5 + 2.5, y - 7.5 - 15, z);
    obj.add(left_thigh);
    obj.add(right_thigh);
    elements[7] = left_thigh;
    elements[8] = right_thigh;
}

function addShins(obj, x, y, z) {
    'use strict';

    geometry = new THREE.BoxGeometry(20, 70, 20);
    var left_shin = new THREE.Mesh(geometry, blue);
    var right_shin = new THREE.Mesh(geometry, blue);
    left_shin.position.set(x - 12.5 - 2.5, y - 7.5 - 30 - 35, z);
    right_shin.position.set(x + 12.5 + 2.5, y - 7.5 - 30 - 35, z);
    obj.add(left_shin);
    obj.add(right_shin);
    elements[9] = left_shin;
    elements[10] = right_shin;
}

function addLegWheels(obj, x, y, z) {
    geometry = new THREE.CylinderGeometry(10, 10, 15, 32);
    var left_wheel1 = new THREE.Mesh(geometry, black);
    var right_wheel1 = new THREE.Mesh(geometry, black);
    var left_wheel2 = new THREE.Mesh(geometry, black);
    var right_wheel2 = new THREE.Mesh(geometry, black);
    left_wheel1.rotation.z=Math.PI/2;
    right_wheel1.rotation.z=Math.PI/2;
    left_wheel2.rotation.z=Math.PI/2;
    right_wheel2.rotation.z=Math.PI/2;
    left_wheel1.position.set(x - 25 - 7.5, y - 7.5 - 30 - 25 - 5, z - 5);
    right_wheel1.position.set(x + 25 + 7.5, y - 7.5 - 30 - 25 - 5, z - 5);
    left_wheel2.position.set(x - 25 - 7.5, y - 7.5 - 30 - 70 + 10 + 5, z - 5);
    right_wheel2.position.set(x + 25 + 7.5, y - 7.5 - 30 - 70 + 10 + 5, z - 5);
    obj.add(left_wheel1);
    obj.add(right_wheel1);
    obj.add(left_wheel2);
    obj.add(right_wheel2);
    elements[11] = left_wheel1;
    elements[12] = right_wheel1;
    elements[13] = left_wheel2;
    elements[14] = right_wheel2;
}

function addFeet(obj, x, y, z) {
    'use strict';

    geometry = new THREE.BoxGeometry(20, 20, 20);
    var left_foot = new THREE.Mesh(geometry, blue);
    var right_foot = new THREE.Mesh(geometry, blue);
    left_foot.position.set(x - 12.5 - 2.5, y - 7.5 - 30 - 70 + 10, z - 10 - 10);
    right_foot.position.set(x + 12.5 + 2.5, y - 7.5 - 30 - 70 +10, z - 10 - 10);
    obj.add(left_foot);
    obj.add(right_foot);
    elements[15] = left_foot;
    elements[16] = right_foot;
}

function addHead(obj, x, y, z) {
    'use strict';

    geometry = new THREE.BoxGeometry(20, 20, 20);
    var head = new THREE.Mesh(geometry, blue);
    head.position.set(x, y + 7.5 + 25 + 40 + 10, z + 5);
    obj.add(head);
    elements[17] = head;
    geometry = new THREE.BoxGeometry(5, 10, 10);
    var right_antena = new THREE.Mesh(geometry, blue);
    var left_antena = new THREE.Mesh(geometry, blue);
    right_antena.position.set(x + 7.5, y + 7.5 + 25 + 40 + 20 + 5, z + 10);
    left_antena.position.set(x - 7.5, y + 7.5 + 25 + 40 + 20 + 5, z + 10);
    obj.add(right_antena);
    obj.add(left_antena);
    elements[18] = right_antena;
    elements[19] = left_antena;
    geometry = new THREE.PlaneGeometry(5, 5);
    var left_eye = new THREE.Mesh(geometry, grey);
    var right_eye = new THREE.Mesh(geometry, grey);
    left_eye.position.set(x - 2.5, y + 7.5 + 25 + 40 + 10 + 2.5, z - 5);
    right_eye.position.set(x + 2.5, y + 7.5 + 25 + 40 + 10 + 2.5, z - 5);
    obj.add(left_eye);
    obj.add(right_eye);
    elements[20] = left_eye;
    elements[21] = right_eye;
}

function addUpperArms(obj, x, y, z) {
    'use strict';

    geometry = new THREE.BoxGeometry(40, 40, 20);
    var left_upper_arm = new THREE.Mesh(geometry, red);
    var right_upper_arm = new THREE.Mesh(geometry, red);
    left_upper_arm.position.set(x - 15 - 20, y + 7.5 + 25 + 20, z + 15 + 10);
    right_upper_arm.position.set(x + 15 + 20, y + 7.5 + 25 + 20, z + 15 + 10);
    obj.add(left_upper_arm);
    obj.add(right_upper_arm);
    elements[22] = left_upper_arm;
    elements[23] = right_upper_arm;
    
}

function addExhaustPipe(obj, x, y, z){
    'use strict';

    geometry = new THREE.CylinderGeometry(2.5, 2.5, 50, 32);
    var left_exhaust_pipe = new THREE.Mesh(geometry, grey);
    var right_exhaust_pipe = new THREE.Mesh(geometry, grey);
    left_exhaust_pipe.position.set(x - 40 - 15 - 2.5, y + 7.5 + 25 + 20 + 5, z + 15 + 10 + 2.5);
    right_exhaust_pipe.position.set(x + 40 + 15 + 2.5, y + 7.5 + 25 + 20 + 5, z + 15 + 10 + 2.5);
    obj.add(left_exhaust_pipe);
    obj.add(right_exhaust_pipe);
    elements[24] = left_exhaust_pipe;
    elements[25] = right_exhaust_pipe;
}

function addForearms(obj, x, y, z) {
    'use strict';

    geometry = new THREE.BoxGeometry(15, 15, 50);
    var left_forearm = new THREE.Mesh(geometry, red);
    var right_forearm = new THREE.Mesh(geometry, red);
    left_forearm.position.set(x - 40 - 7.5, y + 7.5 + 25 - 7.5, z + 10);
    right_forearm.position.set(x + 40 + 7.5, y + 7.5 + 25 - 7.5, z + 10);
    obj.add(left_forearm);
    obj.add(right_forearm);
    elements[26] = left_forearm;
    elements[27] = right_forearm;
}

function color_transformation(){
    for(var e = 0; e < elements.length; e++){
        elements[e].material.wireframe = !elements[e].material.wireframe;
    }
}

function createTrailer(x, y, z) {
    'use strict';

    trailer = new THREE.Object3D();

    addBox(trailer, x, y, z);
    addUnions(trailer, x, y, z);
    addTrailerWheels(trailer, x, y, z);

    scene.add(trailer);
}

function addBox(obj, x, y, z) {
    'use strict';

    geometry = new THREE.BoxGeometry(80, 100, 160);
    mesh = new THREE.Mesh(geometry, red);
    mesh.position.set(x, y + 25 + 50, z);
    obj.add(mesh);
    elements[0] = mesh;
}

function addUnions(obj, x, y, z) {
    'use strict';

    geometry = new THREE.CylinderGeometry(5, 5, 5, 32);
    var truck_trailer_connection = new THREE.Mesh(geometry, grey);
    truck_trailer_connection.position.set(x, y + 2.5 + 20, z - 65);
    obj.add(truck_trailer_connection);
    elements[1] = truck_trailer_connection;
    geometry = new THREE.BoxGeometry(80, 5, 70);
    var wheels_box_connection = new THREE.Mesh(geometry, blue);
    wheels_box_connection.position.set(x, y + 2.5 + 20, z + 45);
    obj.add(wheels_box_connection);
    elements[2] = wheels_box_connection;
}

function addTrailerWheels(obj, x, y, z) {
    'use strict';

    geometry = new THREE.CylinderGeometry(10, 10, 15, 32);
    var left_wheel1 = new THREE.Mesh(geometry, black);
    var right_wheel1 = new THREE.Mesh(geometry, black);
    var left_wheel2 = new THREE.Mesh(geometry, black);
    var right_wheel2 = new THREE.Mesh(geometry, black);
    left_wheel1.rotation.z=Math.PI/2;
    right_wheel1.rotation.z=Math.PI/2;
    left_wheel2.rotation.z=Math.PI/2;
    right_wheel2.rotation.z=Math.PI/2;
    left_wheel1.position.set(x - 30 - 2.5, y + 10, z + 30);
    right_wheel1.position.set(x + 30 + 2.5, y + 10, z + 30);
    left_wheel2.position.set(x - 30 - 2.5, y + 10, z + 60);
    right_wheel2.position.set(x + 30 + 2.5, y + 10, z + 60);
    obj.add(left_wheel1);
    obj.add(right_wheel1);
    obj.add(left_wheel2);
    obj.add(right_wheel2);
    elements[3] = left_wheel1;
    elements[4] = right_wheel1;
    elements[5] = left_wheel2;
    elements[6] = right_wheel2;
}