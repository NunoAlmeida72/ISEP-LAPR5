import * as THREE from "three";
import * as BufferGeometryUtils from "three/addons/utils/BufferGeometryUtils.js";
import { OBB } from "three/addons/math/OBB.js";
import { merge } from "./merge.js";
import Ground from "./ground.js";
import Wall from "./wall.js";
import Door from "./door.js";
import Elevator from "./elevator.js";
import Map from "./UI/src/app/Interfaces/map.ts";

/*
 * parameters = {
 *  url: String
 *  map: Map,
 *  designCredits: String,
 *  texturesCredits: String,
 *  scale: Vector3,
 *  helpersColor: Color
 * }
 */

export default class Maze extends THREE.Group {
    constructor(parameters) {
        super();
        merge(this, parameters);
        this.loaded = false;

        this.onLoad = function (description) {
            const normalMapTypes = [THREE.TangentSpaceNormalMap, THREE.ObjectSpaceNormalMap];
            const wrappingModes = [THREE.ClampToEdgeWrapping, THREE.RepeatWrapping, THREE.MirroredRepeatWrapping];
            const magnificationFilters = [THREE.NearestFilter, THREE.LinearFilter];
            const minificationFilters = [THREE.NearestFilter, THREE.NearestMipmapNearestFilter, THREE.NearestMipmapLinearFilter, THREE.LinearFilter, THREE.LinearMipmapNearestFilter, THREE.LinearMipmapLinearFilter];

            // Store the maze's size, map and exit location
            this.size = this.map.size;
            this.halfSize = { width: this.size.width / 2.0, depth: this.size.depth / 2.0 };
            this.mapArray = this.map.map;
            //this.exitLocation = this.cellToCartesian(description.maze.exitLocation);

            // Create the helpers
            this.helper = new THREE.Group();

            // Create the ground
            const ground = new Ground({
                size: new THREE.Vector3(10.0, 0.0625, 10),
                segments: new THREE.Vector3(64,1,64),
                materialParameters: {
                    color: new THREE.Color(parseInt("0xffffff", 16)),
                    mapUrl: this.map.groundTextureUrl,

                    aoMapUrl: "",
                    aoMapIntensity: "",
                    displacementMapUrl: "",
                    displacementScale: "",
                    displacementBias: "",
                    normalMapUrl: "",
                    normalMapType: normalMapTypes[""],
                    normalScale: new THREE.Vector2(""),
                    bumpMapUrl: "",
                    bumpScale: "",
                    roughnessMapUrl: "",
                    roughness: "",
            
                    wrapS: wrappingModes[1],
                    wrapT: wrappingModes[1],
                    repeat: new THREE.Vector2(4, 4),
                    magFilter: magnificationFilters[1],
                    minFilter: minificationFilters[5]
                },
                secondaryColor: new THREE.Color(parseInt("0x6b554b", 16))
            });
            this.add(ground);

            // Create a wall
            const wall = new Wall({
                
                groundHeight: 0.0625,
                segments: new THREE.Vector2(16, 16),
                materialParameters: {
                    color: new THREE.Color(parseInt("0xffffff", 16)),
                    mapUrl: this.map.wallTextureUrl,

                    aoMapUrl: "",
                    aoMapIntensity: "",
                    displacementMapUrl: "",
                    displacementScale: "",
                    displacementBias: "",
                    normalMapUrl: "",
                    normalMapType: normalMapTypes[""],
                    normalScale: new THREE.Vector2(""),
                    bumpMapUrl: "",
                    bumpScale: "",
                    roughnessMapUrl: "",
                    roughness: "",

                    wrapS: wrappingModes[1],
                    wrapT: wrappingModes[0],
                    repeat: new THREE.Vector2(2,1),
                    magFilter: magnificationFilters[1],
                    minFilter: minificationFilters[5]
                },
                secondaryColor: new THREE.Color(parseInt("0x6b554b", 16))
            });

            // Create a door
            const door= new Door({
                groundHeight: 0.0625,
                segments: new THREE.Vector2(16, 16),
                materialParameters: {
                    color: new THREE.Color(parseInt("0xffffff", 16)),
                    mapUrl: this.map.doorsModel,

                    aoMapUrl: "",
                    aoMapIntensity: "",
                    displacementMapUrl: "",
                    displacementScale: "",
                    displacementBias: "",
                    normalMapUrl: "",
                    normalMapType: normalMapTypes[""],
                    normalScale: new THREE.Vector2(""),
                    bumpMapUrl: "",
                    bumpScale: "",
                    roughnessMapUrl: "",
                    roughness: "",

                    wrapS: wrappingModes[1],
                    wrapT: wrappingModes[0],
                    repeat: new THREE.Vector2(2,1),
                    magFilter: magnificationFilters[1],
                    minFilter: minificationFilters[5]
                },
                secondaryColor: new THREE.Color(parseInt("0x808080", 16))
            });


            // Create an elevator
            const elevator = new Elevator({
                groundHeight: 0.0625,
                segments: new THREE.Vector2(16, 16),
                materialParameters: {
                    color: new THREE.Color(parseInt("0xffffff", 16)),
                    mapUrl: this.map.elevatorsModel,

                    aoMapUrl: "",
                    aoMapIntensity: "",
                    displacementMapUrl: "",
                    displacementScale: "",
                    displacementBias: "",
                    normalMapUrl: "",
                    normalMapType: normalMapTypes[""],
                    normalScale: new THREE.Vector2(""),
                    bumpMapUrl: "",
                    bumpScale: "",
                    roughnessMapUrl: "",
                    roughness: "",

                    wrapS: wrappingModes[1],
                    wrapT: wrappingModes[0],
                    repeat: new THREE.Vector2(2,1),
                    magFilter: magnificationFilters[1],
                    minFilter: minificationFilters[5]
                },
                secondaryColor: new THREE.Color(parseInt("0x808080", 16))
            });


            // Build the maze
            let geometry;
            let geometries = [];
            geometries[0] = [];
            geometries[1] = [];
            this.aabb = [];
            for (let i = 0; i <= this.size.depth; i++) { // In order to represent the southmost walls, the map depth is one row greater than the actual maze depth
                this.aabb[i] = [];
                for (let j = 0; j <= this.size.width; j++) { // In order to represent the eastmost walls, the map width is one column greater than the actual maze width
                    this.aabb[i][j] = [];
                    /*
                     *  this.map[][] | North wall | West wall
                     * --------------+------------+-----------
                     *       0       |     No     |     No
                     *       1       |     No     |    Yes
                     *       2       |    Yes     |     No
                     *       3       |    Yes     |    Yes
                     */
                    if (this.mapArray[i][j] == 2 || this.mapArray[i][j] == 3) {
                        this.aabb[i][j][0] = new THREE.Box3();
                        for (let k = 0; k < 2; k++) {
                            geometry = wall.geometries[k].clone();
                            geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(j - this.halfSize.width + 0.5, 0.25, i - this.halfSize.depth));
                            geometry.computeBoundingBox();
                            geometry.boundingBox.applyMatrix4(new THREE.Matrix4().makeScale(this.scale.x, this.scale.y, this.scale.z));
                            geometries[k].push(geometry);
                            this.aabb[i][j][0].union(geometry.boundingBox);
                        }
                        this.helper.add(new THREE.Box3Helper(this.aabb[i][j][0], this.helpersColor));
                    }
                    if (this.mapArray[i][j] == 1 || this.mapArray[i][j] == 3) {
                        this.aabb[i][j][1] = new THREE.Box3();
                        for (let k = 0; k < 2; k++) {
                            geometry = wall.geometries[k].clone();
                            geometry.applyMatrix4(new THREE.Matrix4().makeRotationY(Math.PI / 2.0));
                            geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(j - this.halfSize.width, 0.25, i - this.halfSize.depth + 0.5));
                            geometry.computeBoundingBox();
                            geometry.boundingBox.applyMatrix4(new THREE.Matrix4().makeScale(this.scale.x, this.scale.y, this.scale.z));
                            geometries[k].push(geometry);
                            this.aabb[i][j][1].union(geometry.boundingBox);
                        }
                        this.helper.add(new THREE.Box3Helper(this.aabb[i][j][1], this.helpersColor));
                    }
                    if (this.mapArray[i][j] == 7){
                        //north elevator
                        this.aabb[posX][posY][0] = new THREE.Box3();
                        for (let k = 0; k < 2; k++) {
                            geometry = elevator.geometries[k].clone();
                            geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(j- this.halfSize.width + 0.5, 0.25, i - this.halfSize.depth));
                            geometry.computeBoundingBox();
                            geometry.boundingBox.applyMatrix4(new THREE.Matrix4().makeScale(this.scale.x, this.scale.y, this.scale.z));
                            geometries[k].push(geometry);
                            this.aabb[i][j][0].union(geometry.boundingBox);
                        }
                        this.helper.add(new THREE.Box3Helper(this.aabb[i][j][0], this.helpersColor));
                    }
                    if (this.mapArray[i][j] == 6){
                        //west elevator
                        this.aabb[i][j][1] = new THREE.Box3();
                        for (let k = 0; k < 2; k++) {
                            geometry = elevator.geometries[k].clone();
                            geometry.applyMatrix4(new THREE.Matrix4().makeRotationY(Math.PI / 2.0));
                            geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(j - this.halfSize.width, 0.25, i - this.halfSize.depth + 0.5));
                            geometry.computeBoundingBox();
                            geometry.boundingBox.applyMatrix4(new THREE.Matrix4().makeScale(this.scale.x, this.scale.y, this.scale.z));
                            geometries[k].push(geometry);
                            this.aabb[i][j][1].union(geometry.boundingBox);
                        }
                        this.helper.add(new THREE.Box3Helper(this.aabb[i][j][1], this.helpersColor));
                    }
                    if(this.mapArray[i][j] == 5) {
                        //north door
                        this.aabb[i][j][0] = new THREE.Box3();
                        for (let k = 0; k < 2; k++) {
                            geometry = door.geometries[k].clone();
                            geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(j - this.halfSize.width + 0.5, 0.25, i - this.halfSize.depth));
                            geometry.computeBoundingBox();
                            geometry.boundingBox.applyMatrix4(new THREE.Matrix4().makeScale(this.scale.x, this.scale.y, this.scale.z));
                            geometries[k].push(geometry);
                            this.aabb[i][j][0].union(geometry.boundingBox);
                        }
                        this.helper.add(new THREE.Box3Helper(this.aabb[i][j][0], this.helpersColor));
                    }
                    if(this.mapArray[i][j] == 4){
                        //west door
                        this.aabb[i][j][1] = new THREE.Box3();
                        for (let k = 0; k < 2; k++) {
                            geometry = door.geometries[k].clone();
                            geometry.applyMatrix4(new THREE.Matrix4().makeRotationY(Math.PI / 2.0));
                            geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(j - this.halfSize.width, 0.25, i - this.halfSize.depth + 0.5));
                            geometry.computeBoundingBox();
                            geometry.boundingBox.applyMatrix4(new THREE.Matrix4().makeScale(this.scale.x, this.scale.y, this.scale.z));
                            geometries[k].push(geometry);
                            this.aabb[i][j][1].union(geometry.boundingBox);
                        }
                        this.helper.add(new THREE.Box3Helper(this.aabb[i][j][1], this.helpersColor));
                    }
                }
            }
            
        

            let mergedGeometry, mesh;
            for (let i = 0; i < 2; i++) {
                mergedGeometry = BufferGeometryUtils.mergeGeometries(geometries[i], false);
                mesh = new THREE.Mesh(mergedGeometry, wall.materials[i]);
                mesh.castShadow = true;
                mesh.receiveShadow = true;
                this.add(mesh);
            }

            // Store the player's initial position and direction
            this.initialPosition = this.cellToCartesian(description.player.initialPosition);
            this.initialDirection = description.player.initialDirection;

            this.loaded = true;
        }

        const onProgress = function (url, xhr) {
            console.log("Resource '" + url + "' " + (100.0 * xhr.loaded / xhr.total).toFixed(0) + "% loaded.");
        }

        const onError = function (url, error) {
            console.error("Error loading resource '" + url + "' (" + error + ").");
        }

        // The cache must be enabled; additional information available at https://threejs.org/docs/api/en/loaders/FileLoader.html
        THREE.Cache.enabled = true;

        // Create a resource file loader
        const loader = new THREE.FileLoader();

        // Set the response type: the resource file will be parsed with JSON.parse()
        loader.setResponseType("json");

        // Load a maze description resource file
        loader.load(
            //Resource URL
            this.url,

            // onLoad callback
            description => this.onLoad(description),

            // onProgress callback
            xhr => onProgress(this.url, xhr),

            // onError callback
            error => onError(this.url, error)
        );
    }

    // Convert cell [row, column] coordinates to cartesian (x, y, z) coordinates
    cellToCartesian(position) {
        return new THREE.Vector3((position[1] - this.halfSize.width + 0.5) * this.scale.x, 0.0, (position[0] - this.halfSize.depth + 0.5) * this.scale.z)
    }

    // Convert cartesian (x, y, z) coordinates to cell [row, column] coordinates
    cartesianToCell(position) {
        return [Math.floor(position.z / this.scale.z + this.halfSize.depth), Math.floor(position.x / this.scale.x + this.halfSize.width)];
    }

    // Detect collision with corners (method: BC/AABB)
    cornerCollision(indices, offsets, orientation, position, delta, radius, name) {
        const row = indices[0] + offsets[0];
        const column = indices[1] + offsets[1];
        if (this.map[row][column] == 2 - orientation || this.map[row][column] == 3) {
            const x = position.x - (this.cellToCartesian([row, column]).x + delta.x * this.scale.x);
            const z = position.z - (this.cellToCartesian([row, column]).z + delta.z * this.scale.z);
            if (x * x + z * z < radius * radius) {
                console.log("Collision with " + name + ".");
                return true;
            }
        }
        return false;
    }

    // Detect collision with walls (method: BC/AABB)
    wallCollision(indices, offsets, orientation, position, delta, radius, name) {
        const row = indices[0] + offsets[0];
        const column = indices[1] + offsets[1];
        if (this.map[row][column] == 2 - orientation || this.map[row][column] == 3) {
            if (orientation != 0) {
                if (Math.abs(position.x - (this.cellToCartesian([row, column]).x + delta.x * this.scale.x)) < radius) {
                    console.log("Collision with " + name + ".");
                    return true;
                }
            }
            else {
                if (Math.abs(position.z - (this.cellToCartesian([row, column]).z + delta.z * this.scale.z)) < radius) {
                    console.log("Collision with " + name + ".");
                    return true;
                }
            }
        }
        return false;
    }

    // Detect collision with walls and corners (method: OBB/AABB)
    wallAndCornerCollision(indices, offsets, orientation, obb, name) {
        const row = indices[0] + offsets[0];
        const column = indices[1] + offsets[1];
        if (this.map[row][column] == 2 - orientation || this.map[row][column] == 3) {
            if (obb.intersectsBox3(this.aabb[row][column][orientation])) {
                console.log("Collision with " + name + ".");
                return true;
            }
        }
        return false;
    }

    // Detect collisions
    collision(method, position, halfSize, direction) {
        const indices = this.cartesianToCell(position);
        if (method != "obb-aabb") {
            if (
                this.wallCollision(indices, [0, 0], 0, position, { x: 0.0, z: -0.475 }, halfSize, "north wall") || // Collision with north wall
                this.wallCollision(indices, [0, 0], 1, position, { x: -0.475, z: 0.0 }, halfSize, "west wall") || // Collision with west wall
                this.wallCollision(indices, [1, 0], 0, position, { x: 0.0, z: -0.525 }, halfSize, "south wall") || // Collision with south wall
                this.wallCollision(indices, [0, 1], 1, position, { x: -0.525, z: 0.0 }, halfSize, "east wall") || // Collision with east wall
                this.cornerCollision(indices, [1, 0], 1, position, { x: -0.475, z: -0.5 }, halfSize, "southwest corner (NS-oriented wall)") || // Collision with southwest corner (NS-oriented wall)
                this.cornerCollision(indices, [1, 1], 0, position, { x: -0.5, z: -0.525 }, halfSize, "southeast corner (WE-oriented wall)") || // Collision with southeast corner (WE-oriented wall)
                this.cornerCollision(indices, [1, 1], 1, position, { x: -0.525, z: -0.5 }, halfSize, "southeast corner (NS-oriented wall)") || // Collision with southeast corner (NS-oriented wall)
                this.cornerCollision(indices, [0, 1], 0, position, { x: -0.5, z: -0.475 }, halfSize, "northeast corner (WE-oriented wall)") || // Collision with northeast corner (WE-oriented wall)

                indices[0] > 0 && (
                    this.cornerCollision(indices, [-1, 1], 1, position, { x: -0.525, z: 0.5 }, halfSize, "northeast corner (NS-oriented wall)") || // Collision with northeast corner (NS-oriented wall)
                    this.cornerCollision(indices, [-1, 0], 1, position, { x: -0.475, z: 0.5 }, halfSize, "northwest corner (NS-oriented wall)") // Collision with northwest corner (NS-oriented wall)
                ) ||
                indices[1] > 0 && (
                    this.cornerCollision(indices, [0, -1], 0, position, { x: 0.5, z: -0.475 }, halfSize, "northwest corner (WE-oriented wall)") || // Collision with northwest corner (WE-oriented wall)
                    this.cornerCollision(indices, [1, -1], 0, position, { x: 0.5, z: -0.525 }, halfSize, "southwest corner (WE-oriented wall)") // Collision with southwest corner (WE-oriented wall)
                )
            ) {
                return true;
            }
            // No collision
            return false;
        }
        else {
            // Create the object's oriented bounding box (OBB) in 3D space and set its orientation
            const obb = new OBB(position, halfSize);
            obb.applyMatrix4(new THREE.Matrix4().makeRotationY(direction));
            if (
                this.wallAndCornerCollision(indices, [0, 0], 0, obb, "north wall") || // Collision with north wall
                this.wallAndCornerCollision(indices, [0, 0], 1, obb, "west wall") || // Collision with west wall
                this.wallAndCornerCollision(indices, [1, 0], 0, obb, "south wall") || // Collision with south wall
                this.wallAndCornerCollision(indices, [0, 1], 1, obb, "east wall") || // Collision with east wall

                this.wallAndCornerCollision(indices, [1, 0], 1, obb, "southwest corner (NS-oriented wall)") || // Collision with southwest corner (NS-oriented wall)
                this.wallAndCornerCollision(indices, [1, 1], 0, obb, "southeast corner (WE-oriented wall)") || // Collision with southeast corner (WE-oriented wall)
                this.wallAndCornerCollision(indices, [1, 1], 1, obb, "southeast corner (NS-oriented wall)") || // Collision with southeast corner (NS-oriented wall)
                this.wallAndCornerCollision(indices, [0, 1], 0, obb, "northeast corner (WE-oriented wall)") || // Collision with northeast corner (WE-oriented wall)

                indices[0] > 0 && (
                    this.wallAndCornerCollision(indices, [-1, 1], 1, obb, "northeast corner (NS-oriented wall)") || // Collision with northeast corner (NS-oriented wall)
                    this.wallAndCornerCollision(indices, [-1, 0], 1, obb, "northwest corner (NS-oriented wall)") // Collision with northwest corner (NS-oriented wall)
                ) ||
                indices[1] > 0 && (
                    this.wallAndCornerCollision(indices, [0, -1], 0, obb, "northwest corner (WE-oriented wall)") || // Collision with northwest corner (WE-oriented wall)
                    this.wallAndCornerCollision(indices, [1, -1], 0, obb, "southwest corner (WE-oriented wall)") // Collision with southwest corner (WE-oriented wall)
                )
            ) {
                return true;
            }
            // No collision
            return false;
        }
    }
    /*
    foundExit(position) {
        return Math.abs(position.x - this.exitLocation.x) < 0.5 * this.scale.x && Math.abs(position.z - this.exitLocation.z) < 0.5 * this.scale.z
    };
    */
}