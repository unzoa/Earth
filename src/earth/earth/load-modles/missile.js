/* eslint-disable */

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import * as THREE from 'three'

const loader = new GLTFLoader()

 export default class Missile {
  constructor () {
    this.missile = THREE.Mesh
  }

  init (id, xyz, callback) {
    loader.load( 'models/missile.glb',  ( gltf ) => {

      gltf.scene.traverse( ( child ) => {
        child.name = id + '-cube-inner'

        if ( child.isMesh ) {
          child.material.emissive =  child.material.color;
          child.material.emissiveMap = child.material.map;
        }

        const scaleVal = 0.4
        child.scale.set(scaleVal, scaleVal, scaleVal)
        child.rotateY( -Math.PI / 2)

        const geometry = new THREE.BoxGeometry( 1, 1, 4 );
        const material = new THREE.MeshLambertMaterial( {
          emissive: 0xff0000,
          wireframe: true,
          vertexColors: true,
          reflectivity: 1,
          refractionRatio: 0.98
        } );
        const cube = new THREE.Mesh( geometry, material );

        cube.add(child)

        this.missile = cube
        this.missile.name = id + '-cube-outter'
        this.missile.position.set(xyz,xyz,xyz)

      } )

      callback(this.missile)
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
