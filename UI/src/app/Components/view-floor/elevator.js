import * as THREE from "three";
import * as BufferGeometryUtils from "three/addons/utils/BufferGeometryUtils.js";
import { merge } from "./merge.js";
import MultiTexturedMaterial from "./material.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default class Elevator extends THREE.Group {
    constructor(parameters) {
        super();

        merge(this, parameters);

    
        this.onload = (description) => {
            this.add(description.scene);
            
        };

        const onProgress = (url, xhr) => {
            console.log(
                "Resource '" +
                    url +
                    "' " +
                    (100.0 * xhr.loaded / xhr.total).toFixed(0) +
                    "% loaded."
            );
        }

        const onError = (url, error) => {
            console.error(
                "Error loading resource '" + url + "' (" + error + ")."
            );
        }

        const loader = new GLTFLoader();

        // Load the elevator model
        loader.load(
            this.url,

            description => this.onload(description),

            xhr => onProgress(this.url, xhr),

            error => onError(this.url, error)
        );
        
 
    }

    setShadow(){
        this.traverseVisible(child => { // Modifying the scene graph inside the callback is discouraged: https://threejs.org/docs/index.html?q=object3d#api/en/core/Object3D.traverseVisible
            if (child instanceof THREE.Object3D) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
    }
}