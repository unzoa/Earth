import { OBJLoader } from '/node_modules/three/examples/jsm/loaders/OBJLoader.js'
import { TGALoader } from '/node_modules/three/examples/jsm/loaders/TGALoader.js'
const TGALoaderer = new TGALoader();
const OBJLoaderer = new OBJLoader();

const texture = TGALoaderer.load(
	'src/view/CiMuTongZi/s3_cimutongzi.tga'
);

export default () => {
  OBJLoaderer.load( 'src/view/CiMuTongZi/s3_cimutongzi_skin.obj', function ( obj ) {
    obj.position.set(12, -8, 3)
    obj.rotateZ(Math.PI)
    obj.rotateX(Math.PI / 2)
    // console.log(obj)
    // obj.setMaterials(texture)
    scene.add( obj )
  }, undefined, function ( error ) {
    console.error( error );
  } )
}
