import * as THREE from './three.module.js';
import { initTransformMaterial } from './transformedTexture.js';
let camera, scene, renderer, mesh;
let stringSVG = '<svg xmlns="http://www.w3.org/2000/svg" width="640" height="640"><path fill="#f90" d="M0 .007h637.793V637.8H0z"/><path fill="#de8500" d="M318.887 318.908h318.906v317.92H318.887z"/><path fill="#ffb13b" d="M.005.002H318.91v318.906H.005z"/><g fill="#f90" transform="matrix(4.67501 0 0 4.67501 -1474.901 -846.129)"><circle cx="340.757" cy="249.099" r="25.063"/><circle cx="353.365" cy="218.661" r="25.063"/><circle cx="383.803" cy="206.053" r="25.063"/><circle cx="414.241" cy="218.661" r="25.063"/><circle cx="426.849" cy="249.099" r="25.063"/><circle cx="414.241" cy="279.538" r="25.063"/><circle cx="383.803" cy="292.146" r="25.063"/><circle cx="353.365" cy="279.538" r="25.063"/></g><path d="M402.742 117.161c0-46.02-37.335-83.36-83.36-83.36s-83.36 37.335-83.36 83.36c-32.557-32.533-85.338-32.533-117.895 0-32.533 32.557-32.533 85.338 0 117.895-46.02 0-83.36 37.335-83.36 83.36 0 46.02 37.335 83.36 83.36 83.36-32.533 32.557-32.533 85.338 0 117.894 32.557 32.534 85.338 32.534 117.895 0 0 46.021 37.334 83.36 83.36 83.36s83.36-37.334 83.36-83.36c32.557 32.534 85.333 32.534 117.894 0 32.534-32.556 32.534-85.337 0-117.894 46.021 0 83.332-37.335 83.332-83.36 0-46.02-37.31-83.36-83.332-83.36 32.534-32.557 32.534-85.338 0-117.895-32.561-32.533-85.337-32.533-117.894 0z"/><path d="M351.28 149.082v92.304l65.277-65.277c0-11.534 4.403-23.095 13.207-31.898 17.634-17.63 46.212-17.63 63.818 0 17.63 17.606 17.63 46.19 0 63.819-8.803 8.803-20.364 13.207-31.898 13.207l-65.277 65.277h92.304c8.167-8.168 19.443-13.23 31.92-13.23 24.91 0 45.105 20.219 45.105 45.127 0 24.909-20.196 45.128-45.104 45.128-12.478 0-23.754-5.058-31.921-13.23h-92.304l65.277 65.277c11.534 0 23.095 4.404 31.898 13.207 17.63 17.634 17.63 46.212 0 63.819-17.606 17.634-46.184 17.634-63.818 0-8.804-8.804-13.207-20.365-13.207-31.898l-65.278-65.277v92.303c8.168 8.167 13.23 19.444 13.23 31.921 0 24.909-20.223 45.105-45.127 45.105-24.909 0-45.128-20.196-45.128-45.105 0-12.477 5.058-23.754 13.23-31.92v-92.304l-65.277 65.277c0 11.533-4.404 23.094-13.207 31.898-17.634 17.634-46.212 17.634-63.818 0-17.634-17.611-17.634-46.19 0-63.819 8.803-8.803 20.364-13.207 31.897-13.207l65.277-65.277h-92.303c-8.167 8.167-19.443 13.23-31.921 13.23-24.908 0-45.104-20.22-45.104-45.128s20.196-45.128 45.104-45.128c12.478 0 23.754 5.063 31.921 13.23h92.303l-65.277-65.276c-11.533 0-23.094-4.4-31.897-13.207-17.634-17.634-17.634-46.213 0-63.819 17.61-17.63 46.184-17.63 63.818 0 8.803 8.803 13.207 20.364 13.207 31.898l65.277 65.277v-92.304c-8.167-8.167-13.23-19.443-13.23-31.92 0-24.909 20.22-45.105 45.128-45.105 24.904 0 45.128 20.196 45.128 45.104 0 12.478-5.063 23.754-13.23 31.921z" fill="#fff"/><path d="M34.795 318.898H603.94v284.1H34.795z"/><path d="M34.795 478.325H603.94v124.678H34.795z"/><path d="M94.448 345.25H548.93c18.62 0 33.828 15.208 33.828 33.829v114.103c-175.636-21.73-349.77-51.766-522.138-48.99V379.08c0-18.62 15.203-33.828 33.828-33.828z" fill="#3f3f3f"/><path fill="#fff" stroke="#000" stroke-width="2.35153003" d="M393.205 337.574l-52.542 253.774h-43.548l-52.57-253.774h43.552l30.79 148.637 30.77-148.637zM467.547 442.687h74.342v74.319c0 41.056-33.286 74.342-74.319 74.342-41.056 0-74.342-33.286-74.342-74.342V411.897h-.023c0-41.032 33.286-74.318 74.342-74.318s74.342 33.286 74.342 74.318h-43.552c0-16.998-13.796-30.766-30.79-30.766-16.998 0-30.766 13.773-30.766 30.766v105.109c0 16.998 13.772 30.79 30.766 30.79s30.79-13.797 30.79-30.767v-30.79h-30.79v-43.552zM117.66 464.459c-13.44-13.464-21.776-32.038-21.776-52.566 0-41.056 33.286-74.319 74.342-74.319 41.032 0 74.318 33.263 74.318 74.319h-43.529c0-16.994-13.796-30.79-30.79-30.79-16.998 0-30.789 13.796-30.789 30.79 0 8.499 3.436 16.17 8.995 21.753h.023a30.693 30.693 0 0 0 21.776 9.013v.023c20.528 0 39.102 8.313 52.543 21.777 13.464 13.44 21.776 32.037 21.776 52.542 0 41.056-33.286 74.342-74.319 74.342-41.056 0-74.342-33.286-74.342-74.342h43.548c0 17.022 13.796 30.79 30.79 30.79 16.998 0 30.79-13.773 30.79-30.79 0-8.476-3.437-16.17-9.014-21.753-5.577-5.554-13.277-9.018-21.776-9.018-20.528.005-39.102-8.33-52.566-21.771z"/></svg>';

init();
animate();

function init() {
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xffffff, 0);
    document.body.appendChild(renderer.domElement);

    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 15;

    scene = new THREE.Scene();
    const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
    scene.add(light);
    scene.background = new THREE.Color(0.7, 0.7, 0.7);
    let material = new THREE.MeshStandardMaterial();


    mesh = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), material);
    mesh.position.set(10, 0, 0);

    scene.add(mesh);
    var bbox = new THREE.Box3().setFromObject(mesh);
    console.log(bbox);
    const loader = new THREE.ObjectLoader();

    loader.load(
        // "assets/sample_3d_model2.json",
        "assets/model.json",
        // "assets/sample_3d_modeltest.json",


        function (obj) {
            obj.traverse(function (child) {

                if (child instanceof THREE.Mesh) {
                    // child.material = material;
                    // child.material.color = new THREE.Color(1, 1, 1);
                    // console.log(child);
                    // child.material = new THREE.MeshStandardMaterial();
                    // child.material.map = new THREE.TextureLoader().load('https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/UV_checker_Map_byValle.jpg/2048px-UV_checker_Map_byValle.jpg');
                }

            });

            // //for assets/sample_3d_modeltest.json and assets/sample_3d_model2.json
            // obj.material.color = new THREE.Color(1, 1, 1);
            // obj.position.set(0, -10, 0);
            // obj.scale.set(0.01, 0.01, 0.01);

            obj.material = new THREE.MeshStandardMaterial();
            let tm = new initTransformMaterial(renderer, [obj], camera, obj, stringSVG);
            scene.add(obj);

            let addImageBtn = document.createElement('button');
            addImageBtn.innerText = 'add texture';
            addImageBtn.addEventListener('click', function () {
                tm.ImportSvg(stringSVG);
            });

            let exportSvgBtn = document.createElement('button');
            exportSvgBtn.innerText = 'export svg texture';
            exportSvgBtn.addEventListener('click', function () {
                let svg = tm.ExportSvg();
                console.log(scene);
                downloadSvg(svg.outerHTML, 'test.svg', 'image/svg+xml');
            });

            document.body.appendChild(addImageBtn);
            document.body.appendChild(exportSvgBtn);
        }
    );


    //create material with transformed texture and set material on mesh
    let tm = new initTransformMaterial(renderer, [mesh], camera, mesh, stringSVG);

    // //if we use scene.children then you can move image between mesh in scene.children  
    // new initTransformMaterial(renderer, scene.children, camera, mesh, "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/VK.com-logo.svg/1200px-VK.com-logo.svg.png");

    mesh.rotation.y -= 0.5;

    window.addEventListener('resize', onWindowResize);

    function onWindowResize() {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);

    }

}

function animate() {

    requestAnimationFrame(animate);

    renderer.render(scene, camera);

}

function downloadSvg(data, filename, type) {
    var file = new Blob([data], { type: type });
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
            url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function () {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
}