import * as THREE from './three.module.js';
import { Canvg } from 'https://cdn.skypack.dev/canvg';

//for move image between mesh
let click = false;
let oldMesh = null;
let oldMat = null;
let coof = 1;
//

const anchorSize = 20;//size anchor
const removeIcon = new Image();
removeIcon.src = "data:image/png;base64,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";
const transformIcon = new Image();
transformIcon.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAb1BMVEX///8AAADm5ube3t7d3d3h4eHDw8NAQEA7Ozv4+Pjt7e2lpaW2trYzMzMMDAwQEBB+fn5ra2uamppFRUVUVFSMjIwcHBy/v783NzdOTk7Jycl0dHT09PRkZGSVlZUsLCwXFxfT09MmJiavr696enqoCvqvAAAFDUlEQVR4nN3dCVLjMBAFUDtASMKSEMISlgnL3P+MM0wV1AAKUrda3f+rD+Do1W9bNjbSMPyr+en92fnYqpaz1XSIrXUz3Eednwb6HmbtgX/rMQ64dAGO43GU8MwJOI4XMcBfbsBxDLnezB2B4y5CeOopHA8DhPeuwnWA8MVVGDFjuALHy+6FEVOir3DTvfCqe+Fd78LrAKCvMOQJyhMYcZ1xFYbclXoKt/POhRG3pI7CzWtQgMXC6WJSUYswXblwPAodZFWV9hkvsVTISywW0hLLhaxEgZCUKBFyEkVCSqJMyEgUCseD6AGLSyrkS1EspEtRLmRLUSEkI2qEXI2aJtx0lGJasDjsJ8U0YDL0Q9wnzBIjXueqaq+wmxT3C3sh/iDMEjmuqD8J+0jxR2EXxJ+FPTRqRthBijkhPzErpJ/688LhgDvFAiF5iiVC7nOxSJhtVOQUy4TMjVooJG7UUiFvisVC2nOxXMhKFAiHI0qiRMiZokhIeQMnE2YbFZAoFBKmKBXyEcVCursbuTCbItjfbhRCskbVCLNXVKgUVUKqSUMnZEpRKSQiaoU8V1S1kCZFvZBl6q8QkjRqjZAjxSohRYp1QoYbuEohwSvUWiF+o1YL4VOsF6ITDYTgk4aFEDtFEyF0ijZC5BSNhMApWglxUzQTwk79dkLURjUUgqZoKcRM0VQI+TBlK0T8YsNYCJiitRDvXDQXwk399kK0Rk2vHly3GglWox4nx1B5UKipf5UaQfXyhkgp3qUGcFJ9WKRz8Snx+wZLHgFN/YlFaE0WrQJK8fHrbxstMgp0Ll5+/uWd1bJcQFP/xf+/a7j0H1CjTnfvP3ptungjUKMOh+vN7Hbz69n4sFBTf5tCSrFRAZ2LrYry23BZeX8DN11tb8+2V55LFrumePJx2BfHnRj8zsX5p4dBx/00vP4VZfHluI5LwDs16rdtEBx3KnBp1MTTvOP62g7Pi1979K0810hvn2Jy16quJo3kpkeuexU0nvrTewJtbcZeWG1TnCSP+WQy8uJqei6mhbV/+pVWy6kfQ9iyUUGEDRsVRdhu6ocRNmtUHGErIpCw0dSPJGyTIpSwSYpYwhZEMGGDeRFNaJ8inNA8RTyh9b9oAgqNU0QU2qYIKTS93GAKLV+hggoNGxVVaJcirNCMiCu0etcPLDRKEVlokyK00CRFbKHFDRy40OAzP3RhfYrwwurLDb6wtlEJhJUpMgjriBTCqtc2HMKaKyqJsKJRWYT6KyqNUN2oPEJtoxIJlU8aTEJdilRC1bnIJdRM/WRCRYpsQnmKdELx5YZPKP1ig1AoJDIKZZcbSqHocsMplKRIKhSci6zC8hfhtMLiFHmFpURiYeEX/szCshSphUVEbmHJ1E8uLDgX2YX5Rk39gyWVMJviDb0wmyK/MJsiv1BFjB6zsBSNGj1kaclTjB6xuMQpRg9YXtIUo8erKGGK0cPVlCzF6NGqSkSMHqyuJMTosSpLQIweqrbKidEjVVcxMXqg+iolhg5yMamoxRRcuFjflvZZXUUBr3x4YcLFLj8yauFDeiH4joQzR2CI8CQ/LHKhKzBCWDiPEQuTexV0JbzMj4pc6HQvEyhM7xnSqs4DhBtX4W2A0O+W9K1WAcJnV+FNgPD7ar8tKwI47HmV2aTqd8xR1bddUZqV43LXnyu5Hm6DurbabkVePikeP4QBh+HVARh0Dn7U3Wq2bIZb7n6/r1X+BwUBR6dnbZRxAAAAAElFTkSuQmCC";
transformIcon.crossOrigin = "anonymous";

class initTransformMaterial {

    #svg = new SvgTexture();
    //size image
    imageWidth = 60;
    imageHeight = 60;

    //canvas texture size
    canvasWidth = 1000;
    canvasHeight = 1000;

    //start position image on canvas
    imageX = 300;
    imageY = 300;

    constructor(renderer, objects, camera, mesh, pathSvgImage) {
        this.#svg.setDom(pathSvgImage);
        const scope = this;
        const onClickPosition = new THREE.Vector2();
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();
        var draggingResizer = {
            x: 0,
            y: 0
        };
        var startX, startY;

        var resizerRadius = 8;
        var rr = resizerRadius * resizerRadius;

        var imageRight, imageBottom;

        var draggingImage = false;
        // const canvas = document.getElementById('drawing-canvas');
        const canvas = document.createElement('canvas');
        // document.body.appendChild(canvas); //for draw on html for debuging texture

        //size canvas
        canvas.width = this.canvasWidth;
        canvas.height = this.canvasHeight;

        const ctx = canvas.getContext('2d');

        setupCanvasDrawing();

        renderer.domElement.addEventListener('mousemove', onMouseMove);
        renderer.domElement.addEventListener('mousedown', onMouseDown);
        renderer.domElement.addEventListener('mouseup', onMouseUp);
        renderer.domElement.addEventListener('mouseout', onMouseOut);

        function onMouseUp(e) {
            draggingResizer = -1;
            draggingImage = false;
            scope.draw(true, false);
            click = false;
            oldMesh = null;
        }

        function onMouseOut(e) {
            onMouseUp(e);
        }

        function onMouseDown(e) {
            e.preventDefault();

            const array = getMousePosition(renderer.domElement, e.clientX, e.clientY);
            onClickPosition.fromArray(array);

            const intersects = getIntersects(onClickPosition, objects);

            //check mouse top the uv mesh
            if (intersects.length > 0 && intersects[0].uv && mesh === intersects[0].object) {

                oldMesh = intersects[0].object;
                const uv = intersects[0].uv;
                intersects[0].object.material.map.transformUv(uv);

                //get uv mesh position to canvas position
                startX = uv.x * canvas.width;
                startY = uv.y * canvas.height;

                draggingResizer = anchorHitTest(startX, startY);
                draggingImage = draggingResizer < 0 && hitImage(startX, startY);
            }
        }

        function onMouseMove(e) {

            e.preventDefault();

            const array = getMousePosition(renderer.domElement, e.clientX, e.clientY);
            onClickPosition.fromArray(array);

            const intersects = getIntersects(onClickPosition, objects);

            //check mouse top the uv mesh
            if (intersects.length > 0 && intersects[0].uv && mesh === intersects[0].object) {
                if (oldMesh) {
                    intersects[0].object.material.map = oldMesh.material.map;
                }
                const uv = intersects[0].uv;
                intersects[0].object.material.map.transformUv(uv);

                if (draggingResizer > -1) {

                    //get uv mesh position to canvas position
                    let mouseX = uv.x * canvas.width;
                    let mouseY = uv.y * canvas.height;

                    // resize the image
                    switch (draggingResizer) {
                        case 0:
                            //top-left
                            scope.imageX = mouseX;
                            scope.imageWidth = imageRight - mouseX;
                            scope.imageY = mouseY;
                            scope.imageHeight = imageBottom - mouseY;
                            break;
                        case 1:
                            //top-right
                            scope.imageY = mouseY;
                            scope.imageWidth = mouseX - scope.imageX;
                            scope.imageHeight = imageBottom - mouseY;
                            break;
                        case 2:
                            //bottom-right
                            scope.imageWidth = mouseX - scope.imageX;
                            scope.imageHeight = mouseY - scope.imageY;
                            break;
                        case 3:
                            //bottom-left
                            scope.imageX = mouseX;
                            scope.imageWidth = imageRight - mouseX;
                            scope.imageHeight = mouseY - scope.imageY;
                            break;
                    }

                    if (scope.imageWidth < 25) { scope.imageWidth = 25; }
                    if (scope.imageHeight < 25) { scope.imageHeight = 25; }

                    // set the image right and bottom
                    imageRight = scope.imageX + scope.imageWidth;
                    imageBottom = scope.imageY + scope.imageHeight;

                    // redraw the image with resizing anchors
                    scope.draw(true, true);

                } else if (draggingImage) {

                    //get uv mesh position to canvas position
                    let mouseX = uv.x * canvas.width;
                    let mouseY = uv.y * canvas.height;

                    // move the image by the amount of the latest drag
                    var dx = mouseX - startX;
                    var dy = mouseY - startY;
                    scope.imageX += dx;
                    scope.imageY += dy;
                    imageRight += dx;
                    imageBottom += dy;
                    // reset the startXY for next time
                    startX = mouseX;
                    startY = mouseY;

                    // redraw the image with border
                    scope.draw(false, true);

                }

            }
            //for move image between material to another mesh in objects
            else if (intersects.length > 0 && intersects[0].uv && oldMesh && oldMesh !== intersects[0].object) {
                mesh = intersects[0].object;
                // changeImageSizeFromMesh(mesh)
                mesh.material = oldMesh.material;
                oldMesh.material = new THREE.MeshStandardMaterial();
                oldMesh = mesh;
                // oldMesh.material = new THREE.MeshStandardMaterial();
                // mesh.material.map.needsUpdate = true;
                // oldMesh.material.map = null;
            }

        }

        //get window mouse position
        function getMousePosition(dom, x, y) {

            const rect = dom.getBoundingClientRect();
            return [(x - rect.left) / rect.width, (y - rect.top) / rect.height];

        }

        // Sets up the drawing canvas and adds it as the material map

        function setupCanvasDrawing() {

            scope.#svg.image.onload = function () {
                imageRight = scope.imageX + scope.imageWidth;
                imageBottom = scope.imageY + scope.imageHeight;
                // changeImageSizeFromMesh(mesh);
                scope.draw(true, false);
            }

            mesh.material.map = new THREE.CanvasTexture(canvas);
        }

        //function for resize image when move image between mesh 
        function changeImageSizeFromMesh(mesh) {
            let bbox = new THREE.Box3().setFromObject(mesh);
            let size = new THREE.Vector3();
            bbox.getSize(size);
            coof = size.x * size.y * size.z * 4 / 250;
            imageRight = scope.imageX + scope.imageWidth / coof;
            imageBottom = scope.imageY + scope.imageHeight / coof;
            scope.imageWidth = scope.imageWidth / coof;
            scope.imageHeight = scope.imageHeight / coof;
            // scope.imageX = scope.imageX / coof;
            // scope.imageY = scope.imageX / coof;

            // imageRight = (scope.imageX + 200);
            // imageBottom = (scope.imageY + 200);
        }

        // draw canvas
        this.draw = function (withAnchors, withBorders) {
            // clear the canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // fill white canvas for transparent background canvas texture
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            if (scope.#svg.image.src) {

                // draw the image
                ctx.drawImage(scope.#svg.image, 0, 0, scope.#svg.image.width, scope.#svg.image.height, scope.imageX, scope.imageY, scope.imageWidth, scope.imageHeight);
                // optionally draw the draggable anchors
                if (withAnchors) {
                    drawDragAnchor(scope.imageX, scope.imageY);
                    drawDragAnchor(imageRight, scope.imageY);
                    drawDragAnchor(scope.imageX, imageBottom);
                    // drawDragAnchor(imageRight, imageBottom);

                    // drawRemoveObjectAcnhor()
                    // drawRotateAcnhor(imageRight, scope.imageY);
                    // drawRotateAcnhor(scope.imageX, imageBottom);
                    drawRemoveObjectAcnhor(imageRight, imageBottom);
                }

                // optionally draw the connecting anchor lines
                if (withBorders) {
                    ctx.beginPath();
                    ctx.moveTo(scope.imageX, scope.imageY);
                    ctx.lineTo(imageRight, scope.imageY);
                    ctx.lineTo(imageRight, imageBottom);
                    ctx.lineTo(scope.imageX, imageBottom);
                    ctx.closePath();
                    ctx.stroke();
                }
            }
            //we need update texture before draw canvas
            if (mesh.material.map) {
                mesh.material.map.needsUpdate = true;
            }
        }

        //
        // draw anchor to canvas
        //

        function drawDragAnchor(x, y) {
            ctx.drawImage(transformIcon, x - resizerRadius, y - resizerRadius, anchorSize, anchorSize);
        }

        // function drawRotateAcnhor(x, y) {
        //     var img = new Image();
        //     img.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAb1BMVEX///8AAADm5ube3t7d3d3h4eHDw8NAQEA7Ozv4+Pjt7e2lpaW2trYzMzMMDAwQEBB+fn5ra2uamppFRUVUVFSMjIwcHBy/v783NzdOTk7Jycl0dHT09PRkZGSVlZUsLCwXFxfT09MmJiavr696enqoCvqvAAAFDUlEQVR4nN3dCVLjMBAFUDtASMKSEMISlgnL3P+MM0wV1AAKUrda3f+rD+Do1W9bNjbSMPyr+en92fnYqpaz1XSIrXUz3Eednwb6HmbtgX/rMQ64dAGO43GU8MwJOI4XMcBfbsBxDLnezB2B4y5CeOopHA8DhPeuwnWA8MVVGDFjuALHy+6FEVOir3DTvfCqe+Fd78LrAKCvMOQJyhMYcZ1xFYbclXoKt/POhRG3pI7CzWtQgMXC6WJSUYswXblwPAodZFWV9hkvsVTISywW0hLLhaxEgZCUKBFyEkVCSqJMyEgUCseD6AGLSyrkS1EspEtRLmRLUSEkI2qEXI2aJtx0lGJasDjsJ8U0YDL0Q9wnzBIjXueqaq+wmxT3C3sh/iDMEjmuqD8J+0jxR2EXxJ+FPTRqRthBijkhPzErpJ/688LhgDvFAiF5iiVC7nOxSJhtVOQUy4TMjVooJG7UUiFvisVC2nOxXMhKFAiHI0qiRMiZokhIeQMnE2YbFZAoFBKmKBXyEcVCursbuTCbItjfbhRCskbVCLNXVKgUVUKqSUMnZEpRKSQiaoU8V1S1kCZFvZBl6q8QkjRqjZAjxSohRYp1QoYbuEohwSvUWiF+o1YL4VOsF6ITDYTgk4aFEDtFEyF0ijZC5BSNhMApWglxUzQTwk79dkLURjUUgqZoKcRM0VQI+TBlK0T8YsNYCJiitRDvXDQXwk399kK0Rk2vHly3GglWox4nx1B5UKipf5UaQfXyhkgp3qUGcFJ9WKRz8Snx+wZLHgFN/YlFaE0WrQJK8fHrbxstMgp0Ll5+/uWd1bJcQFP/xf+/a7j0H1CjTnfvP3ptungjUKMOh+vN7Hbz69n4sFBTf5tCSrFRAZ2LrYry23BZeX8DN11tb8+2V55LFrumePJx2BfHnRj8zsX5p4dBx/00vP4VZfHluI5LwDs16rdtEBx3KnBp1MTTvOP62g7Pi1979K0810hvn2Jy16quJo3kpkeuexU0nvrTewJtbcZeWG1TnCSP+WQy8uJqei6mhbV/+pVWy6kfQ9iyUUGEDRsVRdhu6ocRNmtUHGErIpCw0dSPJGyTIpSwSYpYwhZEMGGDeRFNaJ8inNA8RTyh9b9oAgqNU0QU2qYIKTS93GAKLV+hggoNGxVVaJcirNCMiCu0etcPLDRKEVlokyK00CRFbKHFDRy40OAzP3RhfYrwwurLDb6wtlEJhJUpMgjriBTCqtc2HMKaKyqJsKJRWYT6KyqNUN2oPEJtoxIJlU8aTEJdilRC1bnIJdRM/WRCRYpsQnmKdELx5YZPKP1ig1AoJDIKZZcbSqHocsMplKRIKhSci6zC8hfhtMLiFHmFpURiYeEX/szCshSphUVEbmHJ1E8uLDgX2YX5Rk39gyWVMJviDb0wmyK/MJsiv1BFjB6zsBSNGj1kaclTjB6xuMQpRg9YXtIUo8erKGGK0cPVlCzF6NGqSkSMHqyuJMTosSpLQIweqrbKidEjVVcxMXqg+iolhg5yMamoxRRcuFjflvZZXUUBr3x4YcLFLj8yauFDeiH4joQzR2CI8CQ/LHKhKzBCWDiPEQuTexV0JbzMj4pc6HQvEyhM7xnSqs4DhBtX4W2A0O+W9K1WAcJnV+FNgPD7ar8tKwI47HmV2aTqd8xR1bddUZqV43LXnyu5Hm6DurbabkVePikeP4QBh+HVARh0Dn7U3Wq2bIZb7n6/r1X+BwUBR6dnbZRxAAAAAElFTkSuQmCC";
        //     img.onload = function () {
        //         ctx.drawImage(img, x - resizerRadius, y - resizerRadius, anchorSize, anchorSize);
        //     }
        // }

        function drawRemoveObjectAcnhor(x, y) {
            ctx.drawImage(removeIcon, x - resizerRadius, y - resizerRadius, anchorSize, anchorSize);
        }

        //

        //check click on anchor
        function anchorHitTest(x, y) {
            var dx, dy;
            // top-left
            dx = x - scope.imageX;
            dy = y - scope.imageY;
            let test = dx * dx + dy * dy;
            if (dx * dx + dy * dy <= rr) {
                return (0);
            }
            // top-right
            dx = x - imageRight;
            dy = y - scope.imageY;
            if (dx * dx + dy * dy <= rr) {
                return (1);
            }
            // bottom-right
            dx = x - imageRight;
            dy = y - imageBottom;
            if (dx * dx + dy * dy <= rr) {
                removeTexture();
                return (-1);
            }
            // bottom-left
            dx = x - scope.imageX;
            dy = y - imageBottom;
            if (dx * dx + dy * dy <= rr) {
                return (3);
            }
            return (-1);

        }

        function removeTexture() {
            scope.#svg.remove();
            // clear the canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // fill white canvas for transparent background canvas texture
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, canvas.height, canvas.width);
        }


        function hitImage(x, y) {
            return (x > scope.imageX && x < scope.imageX + scope.imageWidth && y > scope.imageY && y < scope.imageY + scope.imageHeight);
        }

        function getIntersects(point, objects) {

            mouse.set((point.x * 2) - 1, - (point.y * 2) + 1);

            raycaster.setFromCamera(mouse, camera);

            return raycaster.intersectObjects(objects, true);

        }
    }

    ImportSvg(value) {
        this.#svg.setDom(value);
        this.draw(true, false);
    }

    //export texture as svg
    ExportSvg() {

        let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

        svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

        // let pathSvgImage = null; //all path from svg as string
        svg.insertAdjacentHTML(
            'beforeend',
            this.#svg.paths
        );

        document.body.appendChild(svg);
        const imageSize = svg.getBBox();
        svg.remove();

        let diffCanvasImage = {
            x: this.canvasWidth / this.imageWidth,
            y: this.canvasHeight / this.imageHeight

        };

        let svgSize = {
            width: imageSize.width * diffCanvasImage.x,
            height: imageSize.height * diffCanvasImage.y
        };

        let diff = {
            x: this.canvasWidth / imageSize.width,
            y: this.canvasHeight / imageSize.height
        };

        //diff between canvas/image
        let diffX = diff.x / diffCanvasImage.x;
        let diffY = diff.y / diffCanvasImage.y;

        svg.setAttribute('width', this.canvasWidth);
        svg.setAttribute('height', this.canvasHeight);
        // svg.setAttribute("transform", "translate(100,100) rotate(45)");

        svg.childNodes.forEach((child) => {
            child.setAttribute('transform', 'translate(' + this.imageX + ',' + this.imageY + ') scale(' + diffX + ',' + diffY + ')');
        });
        svg.insertAdjacentHTML(
            'afterbegin',
            '<rect xmlns="http://www.w3.org/2000/svg" width="' + this.canvasWidth + '" height="' + this.canvasHeight + '"  style="fill:rgb(255,255,255);stroke-width:3;stroke:rgb(0,0,0)"/>'
        );

        return svg;

    }
}

class SvgTexture {

    #dom = null;
    paths = null;
    image = new Image();

    remove() {

        this.#dom = null;
        this.path = null;
        this.image = new Image();

    }

    setDom(value) {

        this.#dom = new DOMParser().parseFromString(value, "text/html").getElementsByTagName('svg')[0];
        this.src = this.#svgToImage(value);
        this.image.src = this.src;
        this.paths = this.#dom.innerHTML;

    }

    get image() {

        return this._image;

    }

    get paths() {

        return this._paths;

    }

    #svgToImage(value) {

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Read the SVG string using the fromString method
        // of Canvg
        let v = Canvg.fromString(ctx, value);

        // Start drawing the SVG on the canvas
        v.start();

        // Convert the Canvas to an image
        return canvas.toDataURL("img/png");

    }

}

export { initTransformMaterial };