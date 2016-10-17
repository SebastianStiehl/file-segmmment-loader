let request = require("request");
let fs = require("fs");


function loadSegment(currentSegmentId, endSegmentId) {
  if (currentSegmentId > endSegmentId) {
    return;
  }

  let url = `http://yourhost.de/segment${currentSegmentId}_1_av.ts`;

  request
    .get({
      headers: {
        "Host": "yourhost.de",
        "Connection": "keep-alive",
        "Pragma": "no-cache",
        "Cache-Control": "no-cache",
        "Origin": "http://www.arte.tv",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.116 Safari/537.36",
        "Accept": "*/*",
        "DNT": 1,
        "Referer": "http://yourhost.de",
        "Accept-Encoding": "deflate",
        "Accept-Language": "de-DE,de;q=0.8,en-US;q=0.6,en;q=0.4,fr;q=0.2,id;q=0.2,ms;q=0.2"
      },
      url: url
    }, (err) => {
      if (err) {
        console.log(err);
        return;
      }

      console.log("done with segment " + currentSegmentId);
      loadSegment(++currentSegmentId, endSegmentId);
    })
    .on('error', function(err) {
      console.log(err);
    })
    .pipe(fs.createWriteStream("/file.mpeg", {
      "flags": "a+",
      "encoding": null,
      "mode": "0666"
    }));
}

loadSegment(1, 788);