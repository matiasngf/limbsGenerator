const path = require('path');

const getStlPath = (name) => {
  return path.join(__dirname, 'stl', 'prosthesis', name+'.stl');
}

const checkPathFile = (url) => {
  return new Promise( function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = function () {
      resolve(this.status == 200);
    };
    xhr.send();
  });
}

const downloadMesh = (mesh, type, scale, name) => {
  const buffer = exportSTL.fromMesh(mesh);
  const blob = new Blob([buffer], { type: exportSTL.mimeType });
  saveAs(blob, `${scale * 100}-${type}-${name}.stl`);
}

const downloadMultiple = () => (true);

export {
  downloadMesh,
  downloadMultiple,
  checkPathFile,
  getStlPath
}