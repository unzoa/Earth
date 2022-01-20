/* eslint-disable */

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import * as THREE from 'three'

const loader = new GLTFLoader()

 export default class Missile {
  constructor (earth) {
    this.earth = earth
    this.missile = THREE.Mesh
  }

  init (id, callback) {
    loader.load( 'models/missile.glb',  ( gltf ) => {

      gltf.scene.traverse( ( child ) => {
        child.name = id

        if ( child.isMesh ) {
          child.material.emissive =  child.material.color;
          child.material.emissiveMap = child.material.map ;
        }

        child.up = new THREE.Vector3(0,0,0)

        const scaleVal = 0.8
        child.scale.set(scaleVal, scaleVal, scaleVal)

        // this.missile.position.set(0,0,0);
        // this.missile.rotateY( -Math.PI / 4)
        // this.missile.rotateX( Math.PI )
        // this.missile.rotateZ( Math.PI / 8 )
        // this.missile.lookAt(new THREE.Vector3(-10,-10,10))

        console.log(child)
        // this.missile.translate( width / 2, height / 2, depth / 2 )

        this.missile = child

        // 目标 1，1，1
        this.missile.lookAt(-1,1,1)

        callback && callback(child)

      } )

      this.earth.add(gltf.scene)

    }, undefined, function ( error ) {

      console.log( error );

    } );
  }

  setPosition (point) {
    this.missile.position.set(point.x, point.y, point.z)
    // this.missile.position.set(6,6,6)

    const scaleVal = 0.3
    this.missile.scale.set(scaleVal, scaleVal, scaleVal)
    // this.missile.rotateX(Math.PI / 2)
  }
}
