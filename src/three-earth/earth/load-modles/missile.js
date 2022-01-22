/* eslint-disable */

import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

const loader = new GLTFLoader()

 export default class Missile {
  constructor () {
    this.missile = THREE.Mesh
  }

  init (id, at, dir, callback) {
    loader.load(
      // 'models/missile_stinger/scene.gltf',
      'models/missile.glb',
      ( gltf ) => {

        gltf.scene.traverse( ( child ) => {
          child.name = id + '-cube-inner'

          if ( child.isMesh ) {
            child.material.emissive =  child.material.color;
            child.material.emissiveMap = child.material.map;
          }

          const scaleVal = 0.08
          child.scale.set(scaleVal, scaleVal, scaleVal)
          child.rotateY( -Math.PI / 2)

          const geometry = new THREE.BoxGeometry( 1, 1, 4 );
          const material = new THREE.MeshBasicMaterial( {
            transparent: true,
            opacity: 0
          } );
          const cube = new THREE.Mesh( geometry, material );

          cube.add(child)

          this.missile = cube
          this.missile.name = id + '-cube-outter'
          this.missile.position.set(at.x, at.y, at.z)

          this.missile.lookAt(dir.x, dir.y, dir.z)

        } )

        callback(this.missile)
      }, undefined, function ( error ) {
        console.log( error );
      }
    );
  }

  setPosition (point) {
    this.missile.position.set(point.x, point.y, point.z)
    // this.missile.position.set(6,6,6)

    const scaleVal = 0.3
    this.missile.scale.set(scaleVal, scaleVal, scaleVal)
    // this.missile.rotateX(Math.PI / 2)
  }
}
