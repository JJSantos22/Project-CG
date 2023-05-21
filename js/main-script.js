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
var elements = new Array(robot_elements);

var trailer;

var head_axis;
var main_axis;
var leg_axis;
var foot_axis;
var arm_axis1;
var arm_axis2;


// Set the initial rotation angles
var rotationSpeed = 0.01;
var translationSpeed = 0.2;
var rotationAngleHead = 0;
var rotationAngleLegs = 0;
var rotationAngleFeet = 0;
var positionArms = 0;
var maxRotationAngleHead = Math.PI;
var maxRotationAngleLegs = -Math.PI/2;
var maxRotationAngleFeet = -Math.PI;



/////////////////////
/* CREATE SCENE(S) */
/////////////////////
function createScene() {
    'use strict';

    scene = new THREE.Scene();

    scene.background = new THREE.Color(0x404040);

    main_axis = (new THREE.AxisHelper(10));
    scene.add(main_axis);

    
    createTorso(0, 0, 0);
    createLegs(0, 0, 0);
    createHead(0, 0, 0);
    createArms(0, 0, 0);
    /* createTrailer(0, 0, 0); */

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
   
    head_axis.rotation.x = rotationAngleHead;
    leg_axis.rotation.x = rotationAngleLegs;
    foot_axis.rotation.x = rotationAngleFeet;
    arm_axis1.position.x = positionArms;
    arm_axis2.position.x = - positionArms;

    render();
    // Call the animate function recursively
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
    
            // Q -Feet
        case 81:
            if (rotationAngleFeet <= 0 && rotationAngleFeet >= maxRotationAngleFeet){
            rotationAngleFeet += rotationSpeed; // Increase the rotation angle
            console.log(rotationAngleFeet);
            break;  
            }
            else if(rotationAngleFeet > 0) {
                rotationAngleFeet = 0;
                console.log(rotationAngleFeet);
                break; 
            }
        // A - Feet
        case 65:
            if (rotationAngleFeet <= 0 && rotationAngleFeet >= maxRotationAngleFeet){
            rotationAngleFeet -= rotationSpeed;
            console.log(rotationAngleFeet); // Decrease the rotation angle
            break;    
            }
            else if (rotationAngleFeet < maxRotationAngleFeet){
                rotationAngleFeet = maxRotationAngleFeet;
                console.log(rotationAngleFeet);
                break;
            }
            
        // W - Legs
        case 87:
            if (rotationAngleLegs <= 0 && rotationAngleLegs >= maxRotationAngleLegs){
                rotationAngleLegs += rotationSpeed; // Increase the rotation angle
                console.log(rotationAngleLegs);
                break;
            }
            else if(rotationAngleLegs > 0){
                rotationAngleLegs = 0;
                console.log(rotationAngleLegs);
                break;
            }
        // S - Legs
        case 83:
            if (rotationAngleLegs <= 0 && rotationAngleLegs >= maxRotationAngleLegs) {
                rotationAngleLegs -= rotationSpeed;
                console.log(rotationAngleLegs); // Decrease the rotation angle
                break; 
            }
            else if (rotationAngleLegs < maxRotationAngleLegs){
                rotationAngleLegs = maxRotationAngleLegs;
                console.log(rotationAngleLegs);
                break;
            }
        //  E - Arms
        case 69 :
            positionArms -= translationSpeed;
            console.log(rotationAngleLegs); // Decrease the rotation angle
            break;
        // D - Arms
        case 68:
            positionArms += translationSpeed;
            console.log(rotationAngleLegs); // Increase the rotation angle
            break;
        // R - Head
        case 82:
            if( rotationAngleHead >= 0 && rotationAngleHead <= maxRotationAngleHead) {
                rotationAngleHead += rotationSpeed;
                console.log(rotationAngleHead); // Increase the rotation angle
                break;
            }
            else if(rotationAngleHead > maxRotationAngleHead) {
                rotationAngleHead = maxRotationAngleHead;
                console.log(rotationAngleHead);
                break;
            }
        // F - Head
        case 70:
            if( rotationAngleHead <= maxRotationAngleHead && rotationAngleHead >= 0){
                rotationAngleHead -= rotationSpeed;
                console.log(rotationAngleHead); // Decrease the rotation angle
                break;
            }
            else if (rotationAngleHead < 0){
                rotationAngleHead = 0;
                console.log(rotationAngleHead);
                break;
            }   
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

    leg_axis = new THREE.Object3D();
    leg_axis.position.set(x,y+2.5,z);
    main_axis.add(leg_axis);
    var axis_helper = new THREE.AxisHelper(10); // Adjust the size of the AxisHelper as needed
    leg_axis.add(axis_helper);
    material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });

    foot_axis = new THREE.Object3D();
    foot_axis.position.set(x,y - 30 - 70 -7.5-2.5, z - 10);
    leg_axis.add(foot_axis);
    var axis_helper = new THREE.AxisHelper(10); // Adjust the size of the AxisHelper as needed
    foot_axis.add(axis_helper);


    addThighs(leg_axis, x, y, z);
    addShins(leg_axis, x, y, z);
    addLegWheels(leg_axis, x, y, z);
    addFeet(foot_axis, x, y, z);

    //scene.add(legs);
}

function createHead(x, y, z) {
    'use strict';

    head_axis = new THREE.Object3D();
    head_axis.position.set(x, y + 7.5 + 25 + 40, z + 5); 
    main_axis.add(head_axis);
    var axis_helper = new THREE.AxisHelper(10); // Adjust the size of the AxisHelper as needed
    head_axis.add(axis_helper);

    material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });

    addHead(head_axis, x, y, z);

    //scene.add(head);
}

function createArms(x, y, z) {
    'use strict';

    arm_axis1 = new THREE.Object3D();
    arm_axis2 = new THREE.Object3D();
    arm_axis1.position.set(x, y + 7.5 + 25, z);
    arm_axis2.position.set(x, y + 7.5 + 25, z);
    main_axis.add(arm_axis1);
    main_axis.add(arm_axis2);
    var axis_helper = new THREE.AxisHelper(10); // Adjust the size of the AxisHelper as needed
    arm_axis1.add(axis_helper);
    arm_axis2.add(axis_helper);
    material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });

    addUpperArms(arm_axis1, arm_axis2, x, y, z);
    addExhaustPipe(arm_axis1 ,arm_axis2, x, y, z);
    addForearms(arm_axis1, arm_axis2, x, y, z);

    //scene.add(arms);
}

function addThighs(axis, x, y, z) {
    'use strict';

    geometry = new THREE.BoxGeometry(10, 30, 10);
    var left_thigh = new THREE.Mesh(geometry, grey);
    var right_thigh = new THREE.Mesh(geometry, grey);
    left_thigh.position.set(x - 12.5 - 2.5, y - 15 -7.5 -2.5, z);
    right_thigh.position.set(x + 12.5 + 2.5, y - 15-7.5-2.5, z);
    axis.add(left_thigh);
    axis.add(right_thigh);
    elements[7] = left_thigh;
    elements[8] = right_thigh;
}

function addShins(axis, x, y, z) {
    'use strict';

    geometry = new THREE.BoxGeometry(20, 70, 20);
    var left_shin = new THREE.Mesh(geometry, blue);
    var right_shin = new THREE.Mesh(geometry, blue);
    left_shin.position.set(x - 12.5 - 2.5, y - 30 - 35-7.5-2.5, z);
    right_shin.position.set(x + 12.5 + 2.5, y - 30 - 35-7.5-2.5, z);
    axis.add(left_shin);
    axis.add(right_shin);
    elements[9] = left_shin;
    elements[10] = right_shin;
}

function addLegWheels(axis, x, y, z) {
    geometry = new THREE.CylinderGeometry(10, 10, 15, 32);
    var left_wheel1 = new THREE.Mesh(geometry, black);
    var right_wheel1 = new THREE.Mesh(geometry, black);
    var left_wheel2 = new THREE.Mesh(geometry, black);
    var right_wheel2 = new THREE.Mesh(geometry, black);
    left_wheel1.rotation.z=Math.PI/2;
    right_wheel1.rotation.z=Math.PI/2;
    left_wheel2.rotation.z=Math.PI/2;
    right_wheel2.rotation.z=Math.PI/2;
    left_wheel1.position.set(x - 25 - 7.5, y - 30 - 25 - 5 -7.5-2.5, z - 5);
    right_wheel1.position.set(x + 25 + 7.5, y - 30 - 25 - 5-7.5-2.5, z - 5);
    left_wheel2.position.set(x - 25 - 7.5, y - 30 - 70 + 10 + 5-7.5-2.5, z - 5);
    right_wheel2.position.set(x + 25 + 7.5, y - 30 - 70 + 10 + 5-7.5-2.5, z - 5);
    axis.add(left_wheel1);
    axis.add(right_wheel1);
    axis.add(left_wheel2);
    axis.add(right_wheel2);
    elements[11] = left_wheel1;
    elements[12] = right_wheel1;
    elements[13] = left_wheel2;
    elements[14] = right_wheel2;
}

function addFeet(axis, x, y, z) {
    'use strict';

    geometry = new THREE.BoxGeometry(20, 20, 20);
    var left_foot = new THREE.Mesh(geometry, blue);
    var right_foot = new THREE.Mesh(geometry, blue);
    left_foot.position.set(x - 12.5 - 2.5, y + 10, z - 10);
    right_foot.position.set(x + 12.5 + 2.5, y + 10, z - 10);
    axis.add(left_foot);
    axis.add(right_foot);
    elements[15] = left_foot;
    elements[16] = right_foot;
}

function addHead(axis, x, y, z) {
    'use strict';
  
  
    // Create the head mesh
    var geometry = new THREE.BoxGeometry(20, 20, 20);
    var head_mesh = new THREE.Mesh(geometry, blue);
    head_mesh.position.set(0, 10, 0); // Adjust the position relative to the head axis
    axis.add(head_mesh);
    elements[17] = head_mesh;
  
    // Create the right and left antennas
    geometry = new THREE.BoxGeometry(5, 10, 10);
    var right_antena = new THREE.Mesh(geometry, blue);
    var left_antena = new THREE.Mesh(geometry, blue);
    right_antena.position.set(7.5, 20 + 5, 5); // Adjust the position relative to the head axis
    left_antena.position.set(-7.5, 20 + 5, 5); // Adjust the position relative to the head axis
    axis.add(right_antena);
    axis.add(left_antena);
  
    // Create the left and right eyes
    elements[18] = right_antena;
    elements[19] = left_antena;
    geometry = new THREE.PlaneGeometry(5, 5);
    var left_eye = new THREE.Mesh(geometry, grey);
    var right_eye = new THREE.Mesh(geometry, grey);
    left_eye.position.set(-2.5, 10 + 2.5, -10); // Adjust the position relative to the head axis
    right_eye.position.set(2.5, 10 + 2.5, -10); // Adjust the position relative to the head axis
    axis.add(left_eye);
    axis.add(right_eye);
  
   
      elements[20] = left_eye;
    elements[21] = right_eye;
}

function addUpperArms(axis1,axis2, x, y, z) {
    'use strict';

    geometry = new THREE.BoxGeometry(40, 40, 20);
    var left_upper_arm = new THREE.Mesh(geometry, red);
    var right_upper_arm = new THREE.Mesh(geometry, red);
    left_upper_arm.position.set(x - 15 - 20, y + 20, z + 15 + 10);
    right_upper_arm.position.set(x + 15 + 20, y + 20, z + 15 + 10);
    axis1.add(left_upper_arm);
    axis2.add(right_upper_arm);
    elements[22] = left_upper_arm;
    elements[23] = right_upper_arm;
    
}

function addExhaustPipe(axis1,axis2, x, y, z){
    'use strict';

    geometry = new THREE.CylinderGeometry(2.5, 2.5, 50, 32);
    var left_exhaust_pipe = new THREE.Mesh(geometry, grey);
    var right_exhaust_pipe = new THREE.Mesh(geometry, grey);
    left_exhaust_pipe.position.set(x - 40 - 15 - 2.5, y  + 20 + 5, z + 15 + 10 + 2.5);
    right_exhaust_pipe.position.set(x + 40 + 15 + 2.5, y + 20 + 5, z + 15 + 10 + 2.5);
    axis1.add(left_exhaust_pipe);
    axis2.add(right_exhaust_pipe);
    elements[24] = left_exhaust_pipe;
    elements[25] = right_exhaust_pipe;
}

function addForearms(axis1,axis2, x, y, z) {
    'use strict';

    geometry = new THREE.BoxGeometry(15, 15, 50);
    var left_forearm = new THREE.Mesh(geometry, red);
    var right_forearm = new THREE.Mesh(geometry, red);
    left_forearm.position.set(x - 40 - 7.5, y - 7.5, z + 10);
    right_forearm.position.set(x + 40 + 7.5, y - 7.5, z + 10);
    axis1.add(left_forearm);
    axis2.add(right_forearm);
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