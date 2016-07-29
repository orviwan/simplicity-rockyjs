var rocky = _rocky;

var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
  'July', 'August', 'September', 'October', 'November', 'December'];

rocky.on('draw', function(drawEvent) {
  var ctx = drawEvent.context;
  var w = ctx.canvas.unobstructedWidth;
  var h = ctx.canvas.unobstructedHeight;
  var obstruction_h = ctx.canvas.clientHeight - ctx.canvas.unobstructedHeight;
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
  var clockTime = leftpad(d.getHours(), 2, 0) + ':' + leftpad(d.getMinutes(), 2, 0); // TODO: Detect 24h
  ctx.font = '49px Roboto-subset';
  ctx.fillText(clockTime, ((is_round) ? w / 2 : 7), 92 - obstruction_h);

  // HORIZONTAL LINE
  if(is_round) {
    ctx.fillRect(0, 97 - obstruction_h, w, 2); // full width
  } else {
    ctx.fillRect(8, 97 - obstruction_h, w - 16, 2); // indented
  }

  // DATE
  var clockDate = monthNames[d.getMonth()] + ' ' + d.getDate()
  ctx.font = '21px Roboto';
  ctx.fillText(clockDate, ((is_round) ? w / 2 : 8), 68 - obstruction_h);

});

rocky.on('minutechange', function(e) {
  rocky.requestDraw();
});

function leftpad(str, len, ch) {
  str = String(str);
  var i = -1;
  if (!ch && ch !== 0) ch = ' ';
  len = len - str.length;
  while (++i < len) {
    str = ch + str;
  }
  return str;
}
