(function(){
    'use strict';

    // add your script here
    var map = L.map('map').setView([37.76721411799455, -122.44948259575149], 13);
    
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    var landsEnd = L.marker([37.785833148613506, -122.50336993809375]).addTo(map);
    landsEnd.bindPopup("<b>Land's End</b><br>I used to hike here a lot before I came to Davis!").openPopup();

    var yerbaBuena = L.marker([37.784895100981146, -122.40244796203794]).addTo(map);
    yerbaBuena.bindPopup("<b>Yerba Buena</b><br>Best ice skating in SF (it might also be the only).").openPopup();

    var sfZoo = L.marker([37.73298385024622, -122.50281820664145]).addTo(map);
    sfZoo.bindPopup("<b>San Francisco Zoo</b><br>My first word was zoo.").openPopup();




    var pixelSize = 10

interact('.rainbow-pixel-canvas')
  .draggable({
    max: Infinity,
    maxPerElement: Infinity,
    origin: 'self',
    modifiers: [
      interact.modifiers.snap({
        // snap to the corners of a grid
        targets: [
          interact.snappers.grid({ x: pixelSize, y: pixelSize })
        ]
      })
    ],
    listeners: {
      // draw colored squares on move
      move: function (event) {
        var context = event.target.getContext('2d')
        // calculate the angle of the drag direction
        var dragAngle = 180 * Math.atan2(event.dx, event.dy) / Math.PI

        // set color based on drag angle and speed
        context.fillStyle =
          'hsl(' +
          dragAngle +
          ', 86%, ' +
          (30 + Math.min(event.speed / 1000, 1) * 50) +
          '%)'

        // draw squares
        context.fillRect(
          event.pageX - pixelSize / 2,
          event.pageY - pixelSize / 2,
          pixelSize,
          pixelSize
        )
      }
    }
  })
  // clear the canvas on doubletap
  .on('doubletap', function (event) {
    var context = event.target.getContext('2d')

    context.clearRect(0, 0, context.canvas.width, context.canvas.height)
    resizeCanvases()
  })

function resizeCanvases () {
  [].forEach.call(document.querySelectorAll('.rainbow-pixel-canvas'), function (
    canvas
  ) {
    delete canvas.width
    delete canvas.height

    var rect = canvas.getBoundingClientRect()

    canvas.width = rect.width
    canvas.height = rect.height
  })
}

resizeCanvases()

// interact.js can also add DOM event listeners
interact(window).on('resize', resizeCanvases)
}());