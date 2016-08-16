var rocky = require('rocky');

var monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];

rocky.on('draw', function(drawEvent) {
  var ctx = drawEvent.context;
  var w = ctx.canvas.unobstructedWidth;
  var h = ctx.canvas.unobstructedHeight;
  var obstruction_h = ctx.canvas.clientHeight - ctx.canvas.unobstructedHeight - 3;
  var is_round = false;

  // Sorry Heiko
  if (ctx.canvas.clientWidth == 180) { // TODO: WatchInfo.model.name == ??
    // CHALK
    is_round = true;
  }

  ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);

  var d = new Date();

  ctx.fillStyle = '#FFF';
  if (is_round) {
    ctx.textAlign = 'center';
  } else {
    ctx.textAlign = 'left';
  }

  // TIME
  var localeTime = d.toLocaleTimeString().split(' '); // ['12:31:21', 'AM'] or ['00:31:21']
  var clockTime = localeTime[0].split(':').slice(0, 2).join(':'); // '12:31' or '00:31'

  ctx.font = '49px Roboto-subset';
  ctx.fillText(clockTime, ((is_round) ? w / 2 : 7), 89 - obstruction_h);

  // HORIZONTAL LINE
  if(is_round) {
    ctx.fillRect(0, 94 - obstruction_h, w, 2); // full width
  } else {
    ctx.fillRect(8, 94 - obstruction_h, w - 16, 2); // indented
  }

  // DATE
  var clockDate = monthNames[d.getMonth()] + ' ' + d.getDate();
  ctx.font = '21px Roboto';
  ctx.fillText(clockDate, ((is_round) ? w / 2 : 8), 65 - obstruction_h);

});

rocky.on('minutechange', function(e) {
  rocky.requestDraw();
});
