import { GLTFLoader } from '/node_modules/three/examples/jsm/loaders/GLTFLoader.js'
const loader = new GLTFLoader();

export default callback => {
  loader.load( 'src/view/sketchfab/need_some_space/scene.gltf', function ( gltf ) {

    gltf.scene.traverse( function ( child ) {

      child.name="galaxy";

      // 第一个值：控制左右
      // 第二个：控制上下
      // 第三个控制远近
      // child.position.set(-22, 0, 0)
      child.position.set(-11, -13, -5)

      let scaleVal = 0.8
      child.scale.set(scaleVal, scaleVal, scaleVal)
      child.rotateX(Math.PI / 2)


      if ( child.isMesh ) {
        // TOFIX RoughnessMipmapper seems to be broken with WebGL 2.0
        // roughnessMipmapper.generateMipmaps( child.material );
      }

    } )

    scene.add( gltf.scene );
    galaxyObj = gltf.scene
    callback && callback()

  }, undefined, function ( error ) {

    console.error( error );

  } );
}
