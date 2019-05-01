var request = require('request'),
    _ = require('lodash');

// 100: Audio
// 200: Video
// 300: Applications
// 400: Games
// 500: Porn
// 600: Other
var categories = [101];

// categoryCode: One of the categories specified above.
// page: Page, starts with 0
// order: 7 (Seeders) or 9 (Leechers) (descending)
var createURL = function (categoryCode, page, order) {
  return 'https://mypirate.cc/browse/' + categoryCode + '/' + page + '/' + order;
};

var extractMagnetURIs = function (body) {
  var parsed = body.match(/\"magnet:\?\S+\"/g),
      attr;
  return _.map(parsed, function (magnetURI) {
    attr = magnetURI.split('');
    attr.pop(); // remove first "
    attr.shift(); // remove last "
    return attr.join('');
  });
};

var onResponse = function (err, resp, body) {
  if (err) {
    return console.log('Error scraping ' + resp);
  }
  console.log(extractMagnetURIs(body).join('\n'));
};

// Scrape the first page of each category. Ordered by leechers (descending).
_.each(categories, function (categoryCode) {
	for(let i=0; i<50; i++){
  var url = createURL(categoryCode, i, 9);
  request(url, onResponse);
	}
});
