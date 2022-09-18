function hexdump(hex, where) {
  var buffer = hexToBytes(hex)
  var rows = Math.ceil(buffer.length / 16);
  var last = buffer.length % 16 || 16;
  var offsetLength = buffer.length.toString(16).length;
  if (offsetLength < 6) offsetLength = 6;

  var span = '';
  var i = 0;
  var b = 0;
  var lastBytes;
  var lastSpaces;
  var v;

  for (i = 0; i < rows; i++) {
    span += '<span class="offset">' + zero(b, offsetLength) + '&nbsp;</span>';
    lastBytes = i === rows - 1 ? last : 16;
    lastSpaces = 16 - lastBytes;

    var j;
    for (j = 0; j < lastBytes; j++) {
      if (b%8 == 0) {
        span += '&nbsp;';
      }
      span += '&nbsp;' + zero(buffer[b], 2);
      b++;
    }

    for (j = 0; j < lastSpaces; j++) {
      span += '&nbsp;&nbsp;&nbsp;';
    }
    if (lastBytes <= 8) {
      span += '&nbsp;';
    }

    b -= lastBytes;
    span += '&nbsp;&nbsp;';
    span += '<span class="ascii">';

    for (j = 0; j < lastBytes; j++) {
      v = buffer[b];
      if (v == 60) {
        span += '&#60;';
      } else {
        span += ((v > 31 && v < 127) || v > 159) ? String.fromCharCode(v) : '.';
      }
      b++;
    }

    span += '</span><br>';
  }

  document.getElementById(where).innerHTML = span;
}

function zero(n, max) {
  n = n.toString(16).toUpperCase();
  while (n.length < max) {
    n = '0' + n;
  }
  return n;
}

function hexToBytes(hex) {
  for (var bytes = [], c = 0; c < hex.length; c += 2)
  bytes.push(parseInt(hex.substr(c, 2), 16));
  return bytes;
}
