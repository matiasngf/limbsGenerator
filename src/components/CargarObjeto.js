const STLLoader = require('three-stl-loader')(THREE);
const loader = new STLLoader();
const path = require('path');

const cargarObjeto = (name, scale = 1, callback) => {
  const pathToStl = path.join(__dirname, 'stl', 'prosthesis', name+'.stl');
  console.log('LOADING: ', pathToStl);
  loader.load(pathToStl, function (geometry) { //loadGeometry
    var material = new THREE.MeshNormalMaterial()
    let mano = new THREE.Mesh(geometry, material);
    mano.scale.x = scale;
    mano.scale.y = scale;
    mano.scale.z = scale;
    callback(mano)
    return true;
    // const buffer = exportSTL.fromMesh(mano);
    // const blob = new Blob([buffer], { type: exportSTL.mimeType });
    // saveAs(blob, `${scale * 10}-${type}-${name}.stl`);
  });

}

export {
  cargarObjeto as default
}