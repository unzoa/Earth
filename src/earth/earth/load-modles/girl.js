/* eslint-disable */
import * as THREE from 'three'
import { GLTFLoader } from '/node_modules/three/examples/jsm/loaders/GLTFLoader.js'
const loader = new GLTFLoader();

export default class Girl {
  constructor (scene) {
    this.scene = scene
  }

  init (id, callback) {
    loader.load( 'models/missile_stinger/scene.gltf', ( gltf ) => {

      gltf.scene.traverse( ( child ) => {

        child.name=id
        child.position.set(0,0,0)

        let scaleVal = 1
        child.scale.set(scaleVal, scaleVal, scaleVal)

        // child.translateY(0)
        child.lookAt(-1,-1,-1)

        if ( child.isMesh ) {
          // TOFIX RoughnessMipmapper seems to be broken with WebGL 2.0
          // roughnessMipmapper.generateMipmaps( child.material );
          // child.material.emissive =  child.material.color;
          // child.material.emissiveMap = child.material.map ;
        }

      } )

      this.scene.add( gltf.scene );
      callback && callback()

    }, undefined, function ( error ) {

      console.error( error );

    } );
  }
}