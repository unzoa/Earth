const tempShader = {
  earth: {
    uniforms: {
      tExplosion: { type: 't', value: null }
    },
    vertexShader: `
      varying vec3 vNormal;
      varying vec2 vUv;
      void main() {
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        vNormal = normalize( normalMatrix * normal );
        vUv = uv;
      }
    `,
    fragmentShader: `
      varying vec3 vNormal;
      varying vec2 vUv;
      uniform sampler2D tExplosion;

      void main() {
        vec3 diffuse = texture2D( tExplosion, vUv ).xyz;
        float intensity = 1.05 - dot( vNormal, vec3( 0.0, 0.0, 1.0 ) );
        vec3 atmosphere = vec3( 1.0, 1.0, 1.0 ) * pow( intensity, 3.0 );
        gl_FragColor = vec4( diffuse + atmosphere, 1.0 );
      }
    `
  },

  atmosphere: {
    uniforms: {},
    vertexShader: [
        'varying vec3 vNormal;',
        'void main() {',
        'vNormal = normalize( normalMatrix * normal );',
        'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
        '}'
    ].join('\n'),
    fragmentShader: [
        'varying vec3 vNormal;',
        'void main() {',
        'float intensity = pow( 0.8 - dot( vNormal, vec3( 0, 0, 1.0 ) ), 12.0 );',
        'gl_FragColor = vec4( 1.0, 1.0, 1.0, 1.0 ) * intensity;',
        '}'
    ].join('\n')
  }
};
const {
  uniforms: au,
  vertexShader: av,
  fragmentShader: af
} = tempShader.atmosphere
export const atmosphere = new THREE.ShaderMaterial({
  uniforms: au,
  vertexShader: av,
  fragmentShader: af
});

const shader = tempShader.earth;
const uniforms = THREE.UniformsUtils.clone(shader.uniforms);
uniforms.tExplosion.value = new THREE.TextureLoader().load('/src/assets/img/earth.jpeg');

export default new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: shader.vertexShader,
    fragmentShader: shader.fragmentShader
});