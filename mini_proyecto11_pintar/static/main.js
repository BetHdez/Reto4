window.onload = function() {
    var canvas = document.getElementById('drawingCanvas');
    var context = canvas.getContext('2d');
    var painting = false;
    var currentColor = 'black';
    var currentThickness = 1;
    var paths = [];
    var currentPath = [];

    function changeColor(color) {
        currentColor = color;
    }

    function changeThickness() {
        currentThickness = document.getElementById('thickness').value;
    }

    function undo() {
        if (paths.length > 0) {
            paths.pop();
            redrawCanvas();
        }
    }

    function clearCanvas() {
        paths = [];
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    function redrawCanvas() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        for (var path of paths) {
            context.beginPath();
            context.strokeStyle = path.color;
            context.lineWidth = path.thickness;
            for (var point of path.points) {
                context.lineTo(point.x, point.y);
                context.stroke();
            }
            context.closePath();
        }
    }

    window.changeColor = changeColor;
    window.changeThickness = changeThickness;
    window.undo = undo;
    window.clearCanvas = clearCanvas;

    canvas.onmousedown = function(e) {
        painting = true;
        currentPath = { color: currentColor, thickness: currentThickness, points: [] };
        paths.push(currentPath);
        context.beginPath();
        context.strokeStyle = currentColor;
        context.lineWidth = currentThickness;
        context.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        currentPath.points.push({ x: e.clientX - canvas.offsetLeft, y: e.clientY - canvas.offsetTop });
    };

    canvas.onmousemove = function(e) {
        if (painting) {
            context.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
            context.stroke();
            currentPath.points.push({ x: e.clientX - canvas.offsetLeft, y: e.clientY - canvas.offsetTop });
        }
    };

    canvas.onmouseup = function(e) {
        if (painting) {
            context.closePath();
            painting = false;
        }
    };

    canvas.onmouseleave = function(e) {
        if (painting) {
            context.closePath();
            painting = false;
        }
    };
};