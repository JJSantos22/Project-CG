//////////////////////
/* GLOBAL VARIABLES */
//////////////////////
var scene, renderer;
var camera = new Array(5);
var active_camera = 3;
var geometry, material, mesh;
var grey = new THREE.MeshBasicMaterial({ color: 0x6C6C6C, wireframe: true });
var black = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true });
var blue = new THREE.MeshBasicMaterial({ color: 0x005AAB, wireframe: true });
var red = new THREE.MeshBasicMaterial({ color: 0xB62E2E, wireframe: true });
var colorr = new THREE.MeshBasicMaterial({ color:  0x808b96 , wireframe: true });
var colorrr = new THREE.MeshBasicMaterial({color: 0xb3b6b7 , wireframe: true});
var wire = true;

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




var truck_mode = false;
var animation = false;

var trailer_axis;

var head_axis;
var main_axis;
var leg_axis;
var foot_axis;
var arm_axis1;
var arm_axis2;


// Set the initial rotation angles
var rotationSpeed = 0.02;
var translationSpeed = 0.2;
var translationTrailerSpeed = 0.4;
var rotationAngleHead = 0;
var rotationAngleLegs = 0;
var rotationAngleFeet = 0;
var positionArms = 0;
var maxRotationAngleHead = Math.PI;
var maxRotationAngleLegs = -Math.PI/2;
var maxRotationAngleFeet = -Math.PI;
var maxTranslationArms = 15;
var positionTrailerX = 0;
var positionTrailerZ = 350;



const truckBoxMin = new THREE.Vector3(-50, 0, -20);

const truckBoxMax = new THREE.Vector3(50, 0, 120);




var trailerBoxMin = new THREE.Vector3(-45, 0, 265);
var trailerBoxMax = new THREE.Vector3(45, 0, 435);

var immovableWireframe = new THREE.Box3Helper(new THREE.Box3(truckBoxMin, truckBoxMax), 0x00ff00);


var movableWireframe = new THREE.Box3Helper(new THREE.Box3(trailerBoxMin, trailerBoxMax), 0xff0000);




/////////////////////
/* CREATE SCENE(S) */
/////////////////////
function createScene() {
    'use strict';

    scene = new THREE.Scene();

    scene.background = new THREE.Color(0xf7e1aa);

    main_axis = (new THREE.AxisHelper(10));
    scene.add(main_axis);

    scene.add(immovableWireframe);
    scene.add(movableWireframe);
    createTorso(0, 12.5, 0);
    createLegs(0, 12.5, 0);
    createHead(0, 12.5, 0);
    createArms(0, 12.5, 0);
    createTrailer(0, 0, 350); 

}

//////////////////////
/* CREATE CAMERA(S) */
//////////////////////
function createFrontCamera(){
    const width = window.innerWidth;
    const height = window.innerHeight;
    camera[0] = new THREE.OrthographicCamera(
    width / -4, // Left
    width / 4,  // Right
    height / 4, // Top
    height / -4, // Bottom
    1, 1000 // Near and far planes
    );
    camera[0].position.set(0, 0, -200); // Adjust the position to fit your desired view
    camera[0].lookAt(scene.position);
}

function createLateralCamera(){
    const width = window.innerWidth;
    const height = window.innerHeight;
    camera[1] = new THREE.OrthographicCamera(
    width / -4, // Left
    width / 4,  // Right
    height / 4, // Top
    height / -4, // Bottom
    1, 1000 // Near and far planes
    );
    camera[1].position.set(-200, 0, 0); // Adjust the position to fit your desired view
    camera[1].lookAt(scene.position);
}

function createTopCamera(){
    const width = window.innerWidth;
    const height = window.innerHeight;
    camera[2] = new THREE.OrthographicCamera(
    width / -4, // Left
    width / 4,  // Right
    height / 4, // Top
    height / -4, // Bottom
    1, 1000 // Near and far planes
    );
    camera[2].position.set(0, 200, 90); // Adjust the position to fit your desired view
    camera[2].lookAt(scene.position.x, scene.position.y, scene.position.z + 90);
}

function createPerspectiveCamera() {
    'use strict';
    camera[3] = new THREE.PerspectiveCamera(100,
                                         window.innerWidth / window.innerHeight,
                                         1,
                                         1000);
    camera[3].position.x = -150;
    camera[3].position.y = 150;
    camera[3].position.z = -150;
    camera[3].lookAt(scene.position);
}

function createOrtographicCamera(){
    const width = window.innerWidth;
    const height = window.innerHeight;
    camera[4] = new THREE.OrthographicCamera(
    width / -3, // Left
    width / 3,  // Right
    height / 3, // Top
    height / -3, // Bottom
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
}

function addAbdomen(obj, x, y, z) {
    'use strict';

    geometry = new THREE.BoxGeometry(50, 25, 30);
    mesh = new THREE.Mesh(geometry, red);
    mesh.position.set(x, y + 7.5 + 12.5, z);
    obj.add(mesh);
}

function addPectorals(obj, x, y, z) {
    'use strict';

    geometry = new THREE.BoxGeometry(80, 40, 30);
    mesh = new THREE.Mesh(geometry, red);
    mesh.position.set(x, y + 7.5 + 25 + 20, z);
    obj.add(mesh);
    geometry = new THREE.BoxGeometry(30, 15, 0.1);
    var left_pectoral = new THREE.Mesh(geometry, grey);
    var right_pectoral = new THREE.Mesh(geometry, grey);
    left_pectoral.position.set(x - 20, y + 7.5 + 25 + 20 + 7.5, z - 15);
    right_pectoral.position.set(x + 20, y + 7.5 + 25 + 20 + 7.5, z - 15);
    obj.add(left_pectoral);
    obj.add(right_pectoral);
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
}

//////////////////////
/* CHECK COLLISIONS */
//////////////////////
function checkCollisions(){
    'use strict';
    if (truckBoxMax.x > trailerBoxMin.x && truckBoxMin.x < trailerBoxMax.x && truckBoxMax.z > trailerBoxMin.z && truckBoxMin.z < trailerBoxMax.z) {

        //console.log('Collision detected!');
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
    if(!animation){
        if(rotationAngleFeet == maxRotationAngleFeet && rotationAngleLegs == maxRotationAngleLegs && rotationAngleHead == maxRotationAngleHead && positionArms == maxTranslationArms){
            truck_mode = true;
            //console.log("Truck Mode ON");
        }
        else{
            truck_mode = false;
        }

        if(moveUp){
            positionTrailerZ -= translationTrailerSpeed;
            trailerBoxMin.z -= translationTrailerSpeed;
            trailerBoxMax.z -= translationTrailerSpeed;
            
        }
        if(moveDown){
            positionTrailerZ += translationTrailerSpeed;
            trailerBoxMin.z += translationTrailerSpeed;
            trailerBoxMax.z += translationTrailerSpeed;
        }
        if(moveLeft){
            positionTrailerX -= translationTrailerSpeed;
            trailerBoxMin.x -= translationTrailerSpeed;
            trailerBoxMax.x -= translationTrailerSpeed;
        }
        if(moveRight){
            positionTrailerX += translationTrailerSpeed;
            trailerBoxMin.x += translationTrailerSpeed;
            trailerBoxMax.x += translationTrailerSpeed;
        }
        
        if(feetUp){
            if (rotationAngleFeet < 0 && rotationAngleFeet >= maxRotationAngleFeet){
                rotationAngleFeet += rotationSpeed; // Increase the rotation angle
                
            
                }
                else if(rotationAngleFeet >= 0) {
                    rotationAngleFeet = 0;
                    
                    
                }
            
        }
        if(feetDown){
            if (rotationAngleFeet <= 0 && rotationAngleFeet > maxRotationAngleFeet){
                rotationAngleFeet -= rotationSpeed;
                // Decrease the rotation angle
                    
                }
                else if (rotationAngleFeet <= maxRotationAngleFeet){
                    rotationAngleFeet = maxRotationAngleFeet;
                    
                    
                }
            
        }
        if(legsUp){
            if (rotationAngleLegs < 0 && rotationAngleLegs >= maxRotationAngleLegs){
                rotationAngleLegs += rotationSpeed; // Increase the rotation angle
                
            }
            else if(rotationAngleLegs >= 0){
                rotationAngleLegs = 0;
                
                
            }
        
        }
        if(legsDown){
            if (rotationAngleLegs <= 0 && rotationAngleLegs > maxRotationAngleLegs) {
                rotationAngleLegs -= rotationSpeed;
            
            }
            else if (rotationAngleLegs <= maxRotationAngleLegs){
                rotationAngleLegs = maxRotationAngleLegs;
                
            }
            
        }
        if(armsOut){
            if (positionArms > 0 && positionArms <= maxTranslationArms) {
                positionArms -= translationSpeed;
                
            }
            else if (positionArms <= 0){
                positionArms = 0;
                
            }
        }
        if(armsIn){
            if (positionArms >= 0 && positionArms < maxTranslationArms) {
                positionArms += translationSpeed;
            }
            else if (positionArms >= maxTranslationArms){
                positionArms = maxTranslationArms;
            }

        }
        if(headUp){
            if( rotationAngleHead <= maxRotationAngleHead && rotationAngleHead > 0){
                rotationAngleHead -= rotationSpeed;

            }
            else if (rotationAngleHead < 0){
                rotationAngleHead = 0;
            }   
        }
        if(headDown){
            if( rotationAngleHead >= 0 && rotationAngleHead < maxRotationAngleHead) {
                rotationAngleHead += rotationSpeed;
                
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
            console.log("trailerBoxMinx: " + trailerBoxMin.x);
            console.log("trailerBoxMinz: " + trailerBoxMin.z);
            console.log("trailerBoxMaxx: " + trailerBoxMax.x);
            console.log("trailerBoxMaxz: " + trailerBoxMax.z);
           
        }
        if(positionTrailerX < -1 ){
            positionTrailerX += translationTrailerSpeed;
            trailerBoxMin.x += translationTrailerSpeed;
            trailerBoxMax.x += translationTrailerSpeed;
     
        }
        if(positionTrailerX > 1 ){
            positionTrailerX -= translationTrailerSpeed;
            trailerBoxMin.x -= translationTrailerSpeed;
            trailerBoxMax.x -= translationTrailerSpeed;
        }
        
        if(positionTrailerZ < 135 ){
            positionTrailerZ += translationTrailerSpeed;
            trailerBoxMin.z += translationTrailerSpeed;
            trailerBoxMax.z += translationTrailerSpeed;
        }
        if(positionTrailerZ > 133 ){
            positionTrailerZ -= translationTrailerSpeed;
            trailerBoxMin.z -= translationTrailerSpeed;
            trailerBoxMax.z -= translationTrailerSpeed;
        }
          

        
    }
    console.log(animation);


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
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("resize", onResize);
}

/////////////////////
/* ANIMATION CYCLE */
/////////////////////
function animate() {
    'use strict';
    update();
    checkCollisions()
    head_axis.rotation.x = rotationAngleHead;
    leg_axis.rotation.x = rotationAngleLegs;
    foot_axis.rotation.x = rotationAngleFeet;
    arm_axis1.position.x = positionArms;
    arm_axis2.position.x = - positionArms;
    
    trailer_axis.position.x = positionTrailerX;
    trailer_axis.position.z = positionTrailerZ;
    //checkCollisions(collisionBox1,collisionBox2);
    immovableWireframe.box.set(truckBoxMin, truckBoxMax);
    //immovableWireframe.update();

    movableWireframe.box.set(trailerBoxMin, trailerBoxMax);
    //movableWireframe.update();
    render();
    // Call the animate function recursively
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
        case 37: // Left arrow key
        moveLeft = true;
        break;
        case 38: // Up arrow key
            moveUp = true;
            break;
        case 39: // Right arrow key
            moveRight = true;
            break;
        case 40: // Down arrow key
            moveDown = true;
            break;
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
            break;
    
            // Q -Feet
        case 81:
           feetUp = true;
           break;
        // A - Feet
        case 65:
            feetDown = true;
            break;
        // W - Legs
        case 87:
           legsUp = true;
           break;
        // S - Legs
        case 83:
            legsDown = true;
            break;
        //  E - Arms
        case 69 :
            armsOut = true;
            break;
        // D - Arms
        case 68:
            armsIn = true;
            break;
        // R - Head
        case 82:
            headUp = true;
            break;
        // F - Head
        case 70:
            headDown = true;
            break
            
    }

}

///////////////////////
/* KEY UP CALLBACK */
///////////////////////
function onKeyUp(e){
    switch (e.keyCode) {
        case 37: // Left arrow key
            moveLeft = false;
            break;
        case 38: // Up arrow key
            moveUp = false;
            break;
        case 39: // Right arrow key
            moveRight = false;
            break;
        case 40: // Down arrow key
            moveDown = false;
            break;
        case 81:
           feetUp = false;
           break;
        // A - Feet
        case 65:
            feetDown = false;
            break;
        case 87:
            legsUp = false;
            break;
            // S - Legs
        case 83:
            legsDown = false;
            break;
        case 69 :
            armsOut = false;
            break;
        // D - Arms
        case 68:
            armsIn = false;
            break;
        case 82:
            headUp = false;
            break;
        // F - Head
        case 70:
            headDown = false;
            break
    }

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

    foot_axis = new THREE.Object3D();
    foot_axis.position.set(x,y - 30 - 70 - 7.5 - 2.5, z - 10);
    leg_axis.add(foot_axis);
    var axis_helper = new THREE.AxisHelper(10); // Adjust the size of the AxisHelper as needed
    foot_axis.add(axis_helper);


    addThighs(leg_axis, x, y, z);
    addShins(leg_axis, x, y, z);
    addLegWheels(leg_axis, x, y, z);
    addFeet(foot_axis, x, y, z);
}


function createHead(x, y, z) {
    'use strict';

    head_axis = new THREE.Object3D();
    head_axis.position.set(x, y + 7.5 + 25 + 40, z + 5); 
    main_axis.add(head_axis);
    var axis_helper = new THREE.AxisHelper(10); // Adjust the size of the AxisHelper as needed
    head_axis.add(axis_helper);


    addHead(head_axis, x, y, z);
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

    addUpperArms(arm_axis1, arm_axis2, x, y, z);
    addExhaustPipe(arm_axis1 ,arm_axis2, x, y, z);
    addForearms(arm_axis1, arm_axis2, x, y, z);
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
}

function addFeet(axis, x, y, z) {
    'use strict';

    geometry = new THREE.BoxGeometry(20, 20, 20);
    var left_foot = new THREE.Mesh(geometry, blue);
    var right_foot = new THREE.Mesh(geometry, blue);
    left_foot.position.set(x - 12.5 - 2.5, y -2.5, z - 10);
    right_foot.position.set(x + 12.5 + 2.5, y -2.5, z - 10);
    axis.add(left_foot);
    axis.add(right_foot);
}

function addHead(axis, x, y, z) {
    'use strict';
  
  
    // Create the head mesh
    var geometry = new THREE.BoxGeometry(20, 20, 20);
    var head_mesh = new THREE.Mesh(geometry, blue);
    head_mesh.position.set(0, 10, 0); // Adjust the position relative to the head axis
    axis.add(head_mesh);
  
    // Create the right and left antennas
    geometry = new THREE.BoxGeometry(5, 10, 10);
    var right_antena = new THREE.Mesh(geometry, blue);
    var left_antena = new THREE.Mesh(geometry, blue);
    right_antena.position.set(7.5, 20 + 5, 5); // Adjust the position relative to the head axis
    left_antena.position.set(-7.5, 20 + 5, 5); // Adjust the position relative to the head axis
    axis.add(right_antena);
    axis.add(left_antena);
  
    // Create the left and right eyes
    geometry = new THREE.BoxGeometry(5, 5, 0.1);
    var left_eye = new THREE.Mesh(geometry, grey);
    var right_eye = new THREE.Mesh(geometry, grey);
    left_eye.position.set(-2.5, 10 + 2.5, -10); // Adjust the position relative to the head axis
    right_eye.position.set(2.5, 10 + 2.5, -10); // Adjust the position relative to the head axis
    axis.add(left_eye);
    axis.add(right_eye);
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
}

function color_transformation(){
    grey.wireframe = !wire;
    red.wireframe = !wire;
    black.wireframe = !wire;
    blue.wireframe = !wire;
    colorr.wireframe = !wire;
    colorrr.wireframe = !wire;
    wire = !wire;
}

function createTrailer(x, y, z) {
    'use strict';

    trailer_axis = new THREE.Object3D();
    trailer_axis.position.set(x,y,z);
    main_axis.add(trailer_axis);
    var axis_helper = new THREE.AxisHelper(20); // Adjust the size of the AxisHelper as needed
    trailer_axis.add(axis_helper);

    addBox(trailer_axis, x, y, z);
    addUnions(trailer_axis, x, y, z);
    addTrailerWheels(trailer_axis, x, y, z);
    //addCollisionBox(trailer_axis, x, y, z);
    //scene.add(trailer_axis);
}

function addBox(axis, x, y, z) {
    'use strict';

    geometry = new THREE.BoxGeometry(80, 100, 160);
    mesh = new THREE.Mesh(geometry, colorr);
    mesh.position.set(0, 25 + 50, 0);
    axis.add(mesh);
}



function addUnions(axis, x, y, z) {
    'use strict';

    geometry = new THREE.CylinderGeometry(5, 5, 5, 32);
    var truck_trailer_connection = new THREE.Mesh(geometry, grey);
    truck_trailer_connection.position.set(0, 2.5 + 20, - 65);
    axis.add(truck_trailer_connection);
    geometry = new THREE.BoxGeometry(80, 5, 70);
    var wheels_box_connection = new THREE.Mesh(geometry, colorrr);
    wheels_box_connection.position.set(0, 2.5 + 20, 45);
    axis.add(wheels_box_connection);
}

function addTrailerWheels(axis, x, y, z) {
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