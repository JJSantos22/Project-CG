//////////////////////
/* GLOBAL VARIABLES */
//////////////////////
var scene, renderer;
var camera = new Array(5);
var active_camera = 3;
var geometry, material, mesh;
var dark_grey = new THREE.MeshBasicMaterial({ color: 0x6C6C6C, wireframe: true });
var black = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true });
var blue = new THREE.MeshBasicMaterial({ color: 0x005AAB, wireframe: true });
var red = new THREE.MeshBasicMaterial({ color: 0xB62E2E, wireframe: true });
var grey = new THREE.MeshBasicMaterial({ color:  0x808b96 , wireframe: true });
var light_grey = new THREE.MeshBasicMaterial({color: 0xb3b6b7 , wireframe: true});

var feetUp = false;
var feetDown = false;
var legsUp = false;
var legsDown = false;
var headUp = false;
var headDown = false;
var armsOut = false;
var armsIn = false

var moveRight = false;
var moveLeft = false;
var moveUp = false;
var moveDown = false;
var change_color_state = false;
var color_already_changed = false;
var wire = true;
var truck_mode = false;
var animation = false;

var trailer_axis;
var head_axis;
var main_axis;
var leg_axis;
var foot_axis;
var arm_axis1;
var arm_axis2;

var clock = new THREE.Clock();
var delta;

// Set the initial rotation angles
var rotationSpeed = 5;
var translationSpeed = 20;
var translationTrailerSpeed = 45;
var rotationAngleHead = 0;
var rotationAngleLegs = 0;
var rotationAngleFeet = 0;
var positionArms = 0;
var maxRotationAngleHead = Math.PI;
var maxRotationAngleLegs = -Math.PI/2;
var maxRotationAngleFeet = -Math.PI;
var maxTranslationArms = 15;
var positionTrailerX = 0;
var positionTrailerZ = 240;

const truckBoxMin = new THREE.Vector3(-50, 0, -15);

const truckBoxMax = new THREE.Vector3(50, 0, 130);

var trailerBoxMin = new THREE.Vector3(-45, 0, 155);
var trailerBoxMax = new THREE.Vector3(45, 0, 325);

/////////////////////
/* CREATE SCENE(S) */
/////////////////////
function createScene() {
    'use strict';

    scene = new THREE.Scene();

    scene.background = new THREE.Color(0xf7e1aa);

    main_axis = (new THREE.AxisHelper(0));
    scene.add(main_axis);

    createTorso();
    createLegs();
    createHead();
    createArms();
    createTrailer();
}

//////////////////////
/* CREATE CAMERA(S) */
//////////////////////
function createFrontCamera(){
    'use strict';

    const width = window.innerWidth;
    const height = window.innerHeight;
    camera[0] = new THREE.OrthographicCamera(
    width / -4, 
    width / 4, 
    height / 4, 
    height / -4, 
    1, 1000 
    );
    camera[0].position.set(0, 0, -200); 
    camera[0].lookAt(scene.position);
}

function createLateralCamera(){
    'use strict';

    const width = window.innerWidth;
    const height = window.innerHeight;
    camera[1] = new THREE.OrthographicCamera(
    width / -4, 
    width / 4, 
    height / 4, 
    height / -4, 
    1, 1000 
    );
    camera[1].position.set(-200, 0, 150); 
    camera[1].lookAt(scene.position.x, scene.position.y, scene.position.z + 150);
}

function createTopCamera(){
    'use strict';

    const width = window.innerWidth;
    const height = window.innerHeight;
    camera[2] = new THREE.OrthographicCamera(
    width / -4, 
    width / 4, 
    height / 4, 
    height / -4, 
    1, 1000 
    );
    camera[2].position.set(0, 200, 150); 
    camera[2].lookAt(scene.position.x, scene.position.y, scene.position.z + 150);
}

function createPerspectiveCamera() {
    'use strict';
    
    camera[3] = new THREE.PerspectiveCamera(100,
                                         window.innerWidth / window.innerHeight,
                                         1,
                                         1000);
    camera[3].position.x = -120;
    camera[3].position.y = 150;
    camera[3].position.z = -120;
    camera[3].lookAt(scene.position.x, scene.position.y, scene.position.z);
}

function createOrtographicCamera(){
    'use strict';

    const width = window.innerWidth;
    const height = window.innerHeight;
    camera[4] = new THREE.OrthographicCamera(
    width / -3,
    width / 3,  
    height / 3, 
    height / -3, 
    1, 1000 
    );
    camera[4].position.set(-120, 170, -120); 
    camera[4].lookAt(scene.position.x + 20, scene.position.y, scene.position.z + 20);
}

////////////////////////
/* CREATE OBJECT3D(S) */
////////////////////////
function createHead() {
    'use strict';

    head_axis = new THREE.Object3D();
    head_axis.position.set(0, 7.5 + 25 + 40 - 0.1 + 12.5, 5); 
    main_axis.add(head_axis);
    var axis_helper = new THREE.AxisHelper(0);
    head_axis.add(axis_helper);

    addHead(head_axis);
}

function addHead(axis) {
    'use strict';
  
    // Create the head mesh
    var geometry = new THREE.BoxGeometry(20, 20, 20);
    var head_mesh = new THREE.Mesh(geometry, blue);
    head_mesh.position.set(0, -2.5 + 12.5, 0); 
    axis.add(head_mesh);
  
    // Create the right and left antennas
    geometry = new THREE.BoxGeometry(5, 10, 10);
    var right_antena = new THREE.Mesh(geometry, blue);
    var left_antena = new THREE.Mesh(geometry, blue);
    right_antena.position.set(7.5, 10 + 2.5 + 12.5, 5); 
    left_antena.position.set(- 7.5, 10 + 2.5 + 12.5, 5);
    axis.add(right_antena);
    axis.add(left_antena);
  
    // Create the left and right eyes
    geometry = new THREE.BoxGeometry(5, 5, 0.1);
    var left_eye = new THREE.Mesh(geometry, dark_grey);
    var right_eye = new THREE.Mesh(geometry, dark_grey);
    left_eye.position.set(- 2.5, 12.5, - 10);
    right_eye.position.set(2.5, 12.5, - 10); 
    axis.add(left_eye);
    axis.add(right_eye);
}

function createTorso() {
    'use strict';

    var torso = new THREE.Object3D();

    addWaist(torso);
    addAbdomen(torso);
    addPectorals(torso);
    addWheels(torso);
    
    scene.add(torso);
}

function addWaist(obj) {
    'use strict';

    geometry = new THREE.BoxGeometry(50, 15, 30);
    mesh = new THREE.Mesh(geometry, red);
    mesh.position.set(0, 12.5, 0);
    obj.add(mesh);
}

function addAbdomen(obj) {
    'use strict';

    geometry = new THREE.BoxGeometry(50, 25, 30);
    mesh = new THREE.Mesh(geometry, red);
    mesh.position.set(0, 7.5 + 12.5 + 12.5, 0);
    obj.add(mesh);
}

function addPectorals(obj) {
    'use strict';

    geometry = new THREE.BoxGeometry(80, 40, 30);
    mesh = new THREE.Mesh(geometry, red);
    mesh.position.set(0, 7.5 + 25 + 20 + 12.5, 0);
    obj.add(mesh);
    geometry = new THREE.BoxGeometry(30, 15, 0.1);
    var left_pectoral = new THREE.Mesh(geometry, dark_grey);
    var right_pectoral = new THREE.Mesh(geometry, dark_grey);
    left_pectoral.position.set(-20, 7.5 + 25 + 20 + 7.5 + 12.5, -15);
    right_pectoral.position.set(20, 7.5 + 25 + 20 + 7.5 + 12.5, -15);
    obj.add(left_pectoral);
    obj.add(right_pectoral);
}

function addWheels(obj) {
    'use strict';

    geometry = new THREE.CylinderGeometry(10, 10, 15, 32);
    var left_wheel = new THREE.Mesh(geometry, black);
    var right_wheel = new THREE.Mesh(geometry, black);
    left_wheel.rotation.z=Math.PI/2;
    right_wheel.rotation.z=Math.PI/2;
    left_wheel.position.set(-25 - 7.5, -2.5 + 12.5, 0);
    right_wheel.position.set(25 + 7.5, -2.5 + 12.5, 0);
    obj.add(left_wheel);
    obj.add(right_wheel);
}

function createArms() {
    'use strict';

    arm_axis1 = new THREE.Object3D();
    arm_axis2 = new THREE.Object3D();
    arm_axis1.position.set(0, 7.5 + 25 + 12.5, 0);
    arm_axis2.position.set(0, 7.5 + 25 + 12.5, 0);
    main_axis.add(arm_axis1);
    main_axis.add(arm_axis2);
    var axis_helper = new THREE.AxisHelper(0);
    arm_axis1.add(axis_helper);
    arm_axis2.add(axis_helper);

    addUpperArms(arm_axis1, arm_axis2);
    addExhaustPipe(arm_axis1 ,arm_axis2);
    addForearms(arm_axis1, arm_axis2);
}

function addUpperArms(axis1,axis2) {
    'use strict';

    geometry = new THREE.BoxGeometry(40, 40, 20);
    var left_upper_arm = new THREE.Mesh(geometry, red);
    var right_upper_arm = new THREE.Mesh(geometry, red);
    left_upper_arm.position.set(-15 - 20, 20, 15 + 10);
    right_upper_arm.position.set(15 + 20, 20, 15 + 10);
    axis1.add(left_upper_arm);
    axis2.add(right_upper_arm);
}

function addExhaustPipe(axis1,axis2){
    'use strict';

    geometry = new THREE.CylinderGeometry(2.5, 2.5, 50, 32);
    var left_exhaust_pipe = new THREE.Mesh(geometry, dark_grey);
    var right_exhaust_pipe = new THREE.Mesh(geometry, dark_grey);
    left_exhaust_pipe.position.set(-40 - 15 - 2.5, 20 + 5, 15 + 10 + 2.5);
    right_exhaust_pipe.position.set(40 + 15 + 2.5, 20 + 5, 15 + 10 + 2.5);
    axis1.add(left_exhaust_pipe);
    axis2.add(right_exhaust_pipe);
}

function addForearms(axis1,axis2) {
    'use strict';

    geometry = new THREE.BoxGeometry(15, 15, 50);
    var left_forearm = new THREE.Mesh(geometry, red);
    var right_forearm = new THREE.Mesh(geometry, red);
    left_forearm.position.set(-40 - 7.5, -7.5, 10);
    right_forearm.position.set(40 + 7.5, -7.5, 10);
    axis1.add(left_forearm);
    axis2.add(right_forearm);
}

function createLegs() {
    'use strict';

    leg_axis = new THREE.Object3D();
    leg_axis.position.set(0, 2.5 + 12.5, 0);
    main_axis.add(leg_axis);
    var axis_helper = new THREE.AxisHelper(0);
    leg_axis.add(axis_helper);

    foot_axis = new THREE.Object3D();
    foot_axis.position.set(0, -30 - 70 - 7.5 - 2.5, - 10);
    leg_axis.add(foot_axis);
    var axis_helper = new THREE.AxisHelper(0);
    foot_axis.add(axis_helper);

    addThighs(leg_axis);
    addShins(leg_axis);
    addLegWheels(leg_axis);
    addFeet(foot_axis);
}

function addThighs(axis) {
    'use strict';

    geometry = new THREE.BoxGeometry(10, 30, 10);
    var left_thigh = new THREE.Mesh(geometry, dark_grey);
    var right_thigh = new THREE.Mesh(geometry, dark_grey);
    left_thigh.position.set(- 12.5 - 2.5, - 15 - 7.5 - 2.5, 0);
    right_thigh.position.set(12.5 + 2.5, - 15 - 7.5 - 2.5, 0);
    axis.add(left_thigh);
    axis.add(right_thigh);
}

function addShins(axis) {
    'use strict';

    geometry = new THREE.BoxGeometry(20, 70, 20);
    var left_shin = new THREE.Mesh(geometry, blue);
    var right_shin = new THREE.Mesh(geometry, blue);
    left_shin.position.set(- 12.5 - 2.5, - 30 - 35 - 7.5 - 2.5, 0);
    right_shin.position.set(12.5 + 2.5, - 30 - 35 -7.5 - 2.5, 0);
    axis.add(left_shin);
    axis.add(right_shin);
}

function addLegWheels(axis) {
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
    left_wheel1.position.set(-25 - 7.5, -30 - 25 - 5 - 7.5 - 2.5, -5);
    right_wheel1.position.set(25 + 7.5, -30 - 25 - 5 - 7.5 - 2.5, -5);
    left_wheel2.position.set(-25 - 7.5, -30 - 70 + 10 + 5 - 7.5 - 2.5, -5);
    right_wheel2.position.set(25 + 7.5, -30 - 70 + 10 + 5 - 7.5 - 2.5, -5);
    axis.add(left_wheel1);
    axis.add(right_wheel1);
    axis.add(left_wheel2);
    axis.add(right_wheel2);
}

function addFeet(axis) {
    'use strict';

    geometry = new THREE.BoxGeometry(20, 20, 20);
    var left_foot = new THREE.Mesh(geometry, blue);
    var right_foot = new THREE.Mesh(geometry, blue);
    left_foot.position.set(-12.5 - 2.5, 10, - 10);
    right_foot.position.set(12.5 + 2.5, 10, - 10);
    axis.add(left_foot);
    axis.add(right_foot);
}

function createTrailer() {
    'use strict';

    trailer_axis = new THREE.Object3D();
    trailer_axis.position.set(0, 0, 240);
    main_axis.add(trailer_axis);
    var axis_helper = new THREE.AxisHelper(0); 
    trailer_axis.add(axis_helper);

    addBox(trailer_axis);
    addUnions(trailer_axis);
    addTrailerWheels(trailer_axis);
}

function addBox(axis) {
    'use strict';

    geometry = new THREE.BoxGeometry(80, 100, 160);
    mesh = new THREE.Mesh(geometry, grey);
    mesh.position.set(0, 25 + 50, 0);
    axis.add(mesh);
}

function addUnions(axis) {
    'use strict';

    geometry = new THREE.CylinderGeometry(5, 5, 5, 32);
    var truck_trailer_connection = new THREE.Mesh(geometry, dark_grey);
    truck_trailer_connection.position.set(0, 2.5 + 20, -65);
    axis.add(truck_trailer_connection);
    geometry = new THREE.BoxGeometry(80, 5, 70);
    var wheels_box_connection = new THREE.Mesh(geometry, light_grey);
    wheels_box_connection.position.set(0, 2.5 + 20, 45);
    axis.add(wheels_box_connection);
}

function addTrailerWheels(axis) {
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
    left_wheel1.position.set(- 30 - 2.5,  10, 30);
    right_wheel1.position.set( 30 + 2.5,  10, 30);
    left_wheel2.position.set(- 30 - 2.5, 10, 60);
    right_wheel2.position.set( 30 + 2.5,  10, 60);
    axis.add(left_wheel1);
    axis.add(right_wheel1);
    axis.add(left_wheel2);
    axis.add(right_wheel2);
}

//////////////////////
/* CHECK COLLISIONS */
//////////////////////
function checkCollisions(){
    'use strict';
    if (truckBoxMax.x > trailerBoxMin.x && truckBoxMin.x < trailerBoxMax.x && truckBoxMax.z > trailerBoxMin.z && truckBoxMin.z < trailerBoxMax.z) {
        if(truck_mode){
            animation = true;
            if(positionTrailerX == 0 && positionTrailerZ == 134 ){
                animation = false;
            }
        }
    }
}

////////////
/* UPDATE */
////////////
function update(){
    'use strict';

    if (change_color_state && !color_already_changed){
        dark_grey.wireframe = !wire;
        red.wireframe = !wire;
        black.wireframe = !wire;
        blue.wireframe = !wire;
        grey.wireframe = !wire;
        light_grey.wireframe = !wire;
        wire = !wire;
        color_already_changed = true;
    }

    if(!animation){
        if(rotationAngleFeet == maxRotationAngleFeet && rotationAngleLegs == maxRotationAngleLegs && rotationAngleHead == maxRotationAngleHead && positionArms == maxTranslationArms){
            truck_mode = true;
        }
        else{
            truck_mode = false;
        }
        if (!truck_mode || positionTrailerX != 0 || positionTrailerZ != 134){
            if(moveUp){
                positionTrailerZ -= translationTrailerSpeed * delta;
                trailerBoxMin.z -= translationTrailerSpeed * delta;
                trailerBoxMax.z -= translationTrailerSpeed * delta;
            }
            if(moveDown){
                positionTrailerZ += translationTrailerSpeed * delta;
                trailerBoxMin.z += translationTrailerSpeed * delta;
                trailerBoxMax.z += translationTrailerSpeed * delta;
            }
            if(moveLeft){
                positionTrailerX -= translationTrailerSpeed * delta;
                trailerBoxMin.x -= translationTrailerSpeed * delta;
                trailerBoxMax.x -= translationTrailerSpeed * delta;
            }
            if(moveRight){
                positionTrailerX += translationTrailerSpeed * delta;
                trailerBoxMin.x += translationTrailerSpeed * delta;
                trailerBoxMax.x += translationTrailerSpeed * delta;
            }
        }
        if(feetUp){
            if (rotationAngleFeet < 0 && rotationAngleFeet >= maxRotationAngleFeet){
                rotationAngleFeet += rotationSpeed * delta;
                }
                else if(rotationAngleFeet >= 0) {
                    rotationAngleFeet = 0;
                }
        }
        if(feetDown){
            if (rotationAngleFeet <= 0 && rotationAngleFeet > maxRotationAngleFeet){
                rotationAngleFeet -= rotationSpeed * delta;
                }
                else if (rotationAngleFeet <= maxRotationAngleFeet){
                    rotationAngleFeet = maxRotationAngleFeet;
                }
        }
        if(legsUp){
            if (rotationAngleLegs < 0 && rotationAngleLegs >= maxRotationAngleLegs){
                rotationAngleLegs += rotationSpeed  * delta; 
            }
            else if(rotationAngleLegs >= 0){
                rotationAngleLegs = 0;
            }
        }
        if(legsDown){
            if (rotationAngleLegs <= 0 && rotationAngleLegs > maxRotationAngleLegs) {
                rotationAngleLegs -= rotationSpeed * delta;
            }
            else if (rotationAngleLegs <= maxRotationAngleLegs){
                rotationAngleLegs = maxRotationAngleLegs;
            }
        }
        if(armsOut){
            if (positionArms > 0 && positionArms <= maxTranslationArms) {
                positionArms -= translationSpeed * delta;
            }
            else if (positionArms <= 0){
                positionArms = 0;
            }
        }
        if(armsIn){
            if (positionArms >= 0 && positionArms < maxTranslationArms) {
                positionArms += translationSpeed * delta;
            }
            else if (positionArms >= maxTranslationArms){
                positionArms = maxTranslationArms;
            }
        }
        if(headUp){
            if( rotationAngleHead <= maxRotationAngleHead && rotationAngleHead > 0){
                rotationAngleHead -= rotationSpeed * delta;
            }
            else if (rotationAngleHead < 0){
                rotationAngleHead = 0;
            }   
        }
        if(headDown){
            if( rotationAngleHead >= 0 && rotationAngleHead < maxRotationAngleHead) {
                rotationAngleHead += rotationSpeed * delta;
            }
            else if(rotationAngleHead >= maxRotationAngleHead) {
                rotationAngleHead = maxRotationAngleHead;
            }
        }
    }
    else{
        if(positionTrailerX > -1 && positionTrailerX < 1 && positionTrailerZ >= 133 && positionTrailerZ <= 135 ){
            positionTrailerX = 0;
            positionTrailerZ = 134;
            trailerBoxMin.x = -45;
            trailerBoxMin.z = 49;
            trailerBoxMax.x = 45;
            trailerBoxMax.z = 220;
        }
        if(positionTrailerX < -1 ){
            positionTrailerX += translationTrailerSpeed * delta;
            trailerBoxMin.x += translationTrailerSpeed * delta;
            trailerBoxMax.x += translationTrailerSpeed * delta;
        }
        if(positionTrailerX > 1 ){
            positionTrailerX -= translationTrailerSpeed * delta;
            trailerBoxMin.x -= translationTrailerSpeed * delta;
            trailerBoxMax.x -= translationTrailerSpeed * delta;
        }
        if(positionTrailerZ < 133 ){
            positionTrailerZ += translationTrailerSpeed * delta;
            trailerBoxMin.z += translationTrailerSpeed * delta;
            trailerBoxMax.z += translationTrailerSpeed * delta;
        }
        if(positionTrailerZ > 135 ){
            positionTrailerZ -= translationTrailerSpeed * delta;
            trailerBoxMin.z -= translationTrailerSpeed * delta;
            trailerBoxMax.z -= translationTrailerSpeed * delta;
        }
    }
    head_axis.rotation.x = rotationAngleHead;
    leg_axis.rotation.x = rotationAngleLegs;
    foot_axis.rotation.x = rotationAngleFeet;
    arm_axis1.position.x = positionArms;
    arm_axis2.position.x = - positionArms;
    
    trailer_axis.position.x = positionTrailerX;
    trailer_axis.position.z = positionTrailerZ;
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

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
}

/////////////////////
/* ANIMATION CYCLE */
/////////////////////
function animate() {
    'use strict';

    delta = clock.getDelta();

    checkCollisions()
    update();

    render();
    requestAnimationFrame(animate);
}

///////////////////////
/* KEY DOWN CALLBACK */
///////////////////////
function onKeyDown(e) {
    'use strict';
    
    switch (e.keyCode) {
        // Left Arrow Key
        case 37:  
            moveLeft = true;
            break;
        // Up Arrow Key
        case 38: 
            moveUp = true;
            break;
        // Right Arrow Key
        case 39: 
            moveRight = true;
            break;
        // Down Arrow Key
        case 40: 
            moveDown = true;
            break;
        // 1 - Change camera to Front View
        case 49: 
            switch_camera(0);
            break;
        // 2 - Change camera to Lateral View
        case 50:  
            switch_camera(1);
            break;
        // 3 - Change camera to Top View
        case 51:  
            switch_camera(2);
            break;
        // 4 - Change camera to Isometric Ortographic Projection
        case 52:  
            switch_camera(3);
            break;
        // 5 - Change camera to Isometric Perspective Projection
        case 53:  
            switch_camera(4);
            break;
        // 6 - Change Wire
        case 54:  
            change_color_state = true;
            break;
        // Q -Feet Up
        case 81:
           feetUp = true;
           break;
        // A - Feet Down
        case 65:
            feetDown = true;
            break;
        // W - Legs Up
        case 87:
           legsUp = true;
           break;
        // S - Legs Down
        case 83:
            legsDown = true;
            break;
        //  E - Arms Out
        case 69 :
            armsOut = true;
            break;
        // D - Arms In
        case 68:
            armsIn = true;
            break;
        // R - Head Up
        case 82:
            headUp = true;
            break;
        // F - Head Down
        case 70:
            headDown = true;
            break  
    }
}

///////////////////////
/* KEY UP CALLBACK */
///////////////////////
function onKeyUp(e){
    'use strict';

    switch (e.keyCode) {
        // Left Arrow Key
        case 37:  
            moveLeft = false;
            break;
        // Up Arrow Key
        case 38: 
            moveUp = false;
            break;
        // Right Arrow Key
        case 39: 
            moveRight = false;
            break;
        // Down Arrow Key
        case 40: 
            moveDown = false;
            break;
        // Q - Feet Up
        case 81:
           feetUp = false;
           break;
        // A - Feet Down
        case 65:
            feetDown = false;
            break;
        // W - Legs Up
        case 87:
            legsUp = false;
            break;
        // S - Legs Down
        case 83:
            legsDown = false;
            break;
        //  E - Arms Out
        case 69 :
            armsOut = false;
            break;
        // D - Arms In
        case 68:
            armsIn = false;
            break;
        // R - Head Up
        case 82:
            headUp = false;
            break;
        // F - Head Down
        case 70:
            headDown = false;
            break
        // 6 - Change Wire
        case 54:
            change_color_state = false;
            color_already_changed = false;
            break;
    }
}

function switch_camera(number) {
    'use strict';

	active_camera = number;
}