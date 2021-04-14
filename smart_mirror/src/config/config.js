const config = {
  styles: {
    fontFamily: 'Sawasdee',
    fontWeight: 500,
    textScale: '0.8em', // relative font-size of text. 1em ~= 16px
    paddingTop: '5%', // space from the top edge
    paddingLeft: '7%', // space from the left edge
    paddingRight: '6%', // space from the right edge
    paddingBottom: '0%', // space from the bottom edge
  },

  YAHOO_WOEID: '897819',
  SMHI_COORD: {
    longitude: '12.101624',
    latitude: '49.013432',
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
    transfer: false,
    weather: true,
    forecast: true,
    news: true,
    tempPirSensor: false,
    temperatureGraph: false,
    articles: false,
  },
};

module.exports = config;
