const config = {
  styles: {
    fontFamily: 'Seaside',
    fontWeight: 500,
    textScale: '1.0em', // relative font-size of text. 1em ~= 16px
    paddingTop: '0%', // space from the top edge
    paddingLeft: '0%', // space from the left edge
    paddingRight: '0%', // space from the right edge
    paddingBottom: '0%', // space from the bottom edge
  },

  YAHOO_WOEID: '897819',
  SMHI_COORD: {
    longitude: '12.101624',
    latitude: '49.013432',
    apikey: '0a9a82b834a6ed11e67d094cb7bbef77'
  },
  forecastLabelName: 'Forecast here',
  svtNewsUrl:
    'https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Fwww.svt.se%2Fnyheter%2Frss.xml',

  serverBaseURL:
    process.env.NODE_ENV === 'production' ? 'http://localhost:3001' : 'http://localhost:3000',
  wsServerBaseURL: process.env.NODE_ENV === 'production' ? 'localhost:3001/' : 'localhost:3001/',

  language: 'en-US',


  gpioPins: {
    button: 12,
    pirSensor: 18,
  },

  modules: {
    dateTime: true,
    weather: true,
    forecast: true,
    news: true,
    tempPirSensor: false,
    temperatureGraph: true,
    articles: true,
  },
};

module.exports = config;
