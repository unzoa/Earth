import { GLTFLoader } from '/node_modules/three/examples/jsm/loaders/GLTFLoader.js'
const loader = new GLTFLoader();

export default () => {
  loader.load( 'src/view/sketchfab/need_some_space/scene.gltf', function ( gltf ) {

    gltf.scene.traverse( function ( child ) {

      child.name="galaxy";

      // 第一个值：控制左右
      // 第二个：控制上下
      // 第三个控制远近
      child.position.set(-22, 15, 0)

      if ( child.isMesh ) {
        // TOFIX RoughnessMipmapper seems to be broken with WebGL 2.0
        // roughnessMipmapper.generateMipmaps( child.material );
      }

    } )

    scene.add( gltf.scene );

  }, undefined, function ( error ) {

    console.error( error );

  } );
}
