// var API = require('indian-stock-exchange');
var express = require("express");
var API = require('./index');
const axios=require("axios");
var BSEAPI = API.BSE;
var NSEAPI = API.NSE;
const PORT = process.env.PORT || 3000;

var app = express();

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});

// National Stock Exchange (NSE) APIS
app.get("/", async (req, res, next) => {
  const config = {
    method: 'get',
    url: 'https://www.nseindia.com/api/allIndices',
    headers: { 
      'Cookie': 'ak_bmsc=A74EA2188F0B3AFAE0C7BDFA86DF34A2~000000000000000000000000000000~YAAQ7+/IF3BYYh5+AQAATjfNPQ6EvXQb1XDeePZavrR/Qm0/yAKBt/DfI1nSwgVKyCP/rTP2rkqOAkvdYpBB2VKkKoEH+IjbionBkv1fUFP8KFfOIwaRrN8/MxfkNUIge879u3LK2S29ABpT7a0GzOFONMs1lqp1paDrYWMbzrvVJ/dOX8CKisK0pl6bjHaCQ5Lrd+MrI426Q27ihXgpHN8R4WKj7Pm/p+X/Uf6j87PLNEJJX++QyLCcMVkQUvRcSyuXyyTinPm3Ezs6gn+lywlZ+BilOc71lfx1UVLyX+5OpCrlEQ0hDAZb6cFAiWVNQGnqBzlYynbhkHO+c7WG4X9P40KVuGnWE3w2Na83Foh0rfMeOolCkQcDrKcZl7Y=; bm_sv=6E3B4A469E4CA033078CB52A28DC5241~Unlp8wm/mFU6md4sWRqZp8ZyQE1Nzhk8D2XLJRHftx/2uiXv4+q1dWcA5wUnlk0iZAnWaJEYLwYS5gzGI3rFyvCfHhBAPUQfxHPl8LZaSom6GTJBCLPQZGb06AQO3yrMOcsSYWsckFy8lPfnVTBRHuUNXTpkon+rCh8glLM3vag='
    }
  };
  const response=await axios(config);
  console.log("Here",response);
  return res.json(response.data);

});
// Get the stock market status (open/closed) - JSON
// Example: http://localhost:3000/get_market_status
app.get("/get_market_status", (req, res, next) => {
  NSEAPI.getMarketStatus()
    .then(function (response) {
      console.log("Response: ", response);
      res.json(response.data);
    }).catch(err=>{
      console.error("Error is",err);
    });
});

// Get the NSE indexes information (last updated, name, previous close, open, low, high, last, percent change, year high and low, index order) - JSON
// Example: http://localhost:3000/nse/get_indices
app.get("/nse/get_indices", (req, res, next) => {
  NSEAPI.getIndices()
    .then(function (response) {
      res.json(response.data);
    });
});

// Get the quotes of all indexes in NSE - HTML
// Example: http://localhost:3000/nse/get_quotes
app.get("/nse/get_quotes", (req, res, next) => {
  NSEAPI.getQuotes()
    .then(function (response) {
      res.json(response.data);
    });
});

// Get the quotation data of the symbol (companyName) from NSE - JSON
// Example: http://localhost:3000/nse/get_quote_info?companyName=TCS
app.get("/nse/get_quote_info", (req, res, next) => {
  NSEAPI.getQuoteInfo(req.query.companyName)
    .then(function (response) {
      res.json(response.data);
    });
});

// Get the quotation data of the symbols (companyNames) from NSE - JSON
// Example: http://localhost:3000/nse/get_multiple_quote_info?companyNames=TCS,WIPRO
app.get("/nse/get_multiple_quote_info", (req, res, next) => {
  const companyNames = req.query.companyNames.split(",");
  NSEAPI.getMultipleQuoteInfo(companyNames).then(r =>  res.json(r));
});

// Get the top 10 gainers of NSE - JSON
// Example: http://localhost:3000/nse/get_gainers
app.get("/nse/get_gainers", (req, res, next) => {
  NSEAPI.getGainers()
    .then(function (response) {
      res.json(response.data);
    });
});

// Get the top 10 losers of NSE - JSON
// Example: http://localhost:3000/nse/get_losers
app.get("/nse/get_losers", (req, res, next) => {
  NSEAPI.getLosers()
    .then(function (response) {
      res.json(response.data);
    });
});

// Get advances/declines of individual index, and the value if its changed or not - JSON
// Example: http://localhost:3000/nse/get_incline_decline
app.get("/nse/get_incline_decline", (req, res, next) => {
  NSEAPI.getInclineDecline()
    .then(function (response) {
      res.json(response.data);
    });
});

// Get the information of all the companies in a single NSE index (slug) JSON
// Example: http://localhost:3000/nse/get_index_stocks?symbol=nifty
app.get("/nse/get_index_stocks", (req, res, next) => {
  NSEAPI.getIndexStocks(req.query.symbol)
    .then(function (response) {
      res.json(response.data);
    });
});

// Get the list of companies in provided NSE index with matching keyword data - JSON
// Example: http://localhost:3000/nse/search_stocks?keyword=AXIS
app.get("/nse/search_stocks", (req, res, next) => {
  NSEAPI.searchStocks(req.query.keyword)
    .then(function (response) {
      res.json(response.data);
    });
});

// Get the intra day data of company in NSE - XML
// Example: http://localhost:3000/nse/get_intra_day_data?companyName=TCS&time=1
// Example: http://localhost:3000/nse/get_intra_day_data?companyName=TCS&time=month
app.get("/nse/get_intra_day_data", (req, res, next) => {
  NSEAPI.getIntraDayData(req.query.companyName, req.query.time)
    .then(function (response) {
      res.json(response.data);
    });
});

// Get 52 weeks all high stocks in NSE - JSON
// Example: http://localhost:3000/nse/get_52_week_high
app.get("/nse/get_52_week_high", (req, res, next) => {
  NSEAPI.get52WeekHigh()
    .then(function (response) {
      res.json(response.data);
    });
});

// Get 52 weeks all low stocks in NSE - JSON
// Example: http://localhost:3000/nse/get_52_week_low
app.get("/nse/get_52_week_low", (req, res, next) => {
  NSEAPI.get52WeekLow()
    .then(function (response) {
      res.json(response.data);
    });
});

// Get the NSE stocks whose values are highest - JSON
// Example: http://localhost:3000/nse/get_top_value_stocks
app.get("/nse/get_top_value_stocks", (req, res, next) => {
  NSEAPI.getTopValueStocks()
    .then(function (response) {
      res.json(response.data);
    });
});

// Get the NSE stocks whose volumes sold are highest - JSON
// Example: http://localhost:3000/nse/get_top_volume_stocks
app.get("/nse/get_top_volume_stocks", (req, res, next) => {
  NSEAPI.getTopVolumeStocks()
    .then(function (response) {
      res.json(response.data);
    });
});

// Get the futures data for a company stock (symbol) and time - JSON
// Example: http://localhost:3000/nse/get_stock_futures_data?companyName=TCS&time=15
// Example: http://localhost:3000/nse/get_stock_futures_data?companyName=VEDL&time=month
app.get("/nse/get_stock_futures_data", (req, res, next) => {
  NSEAPI.getStockFuturesData(req.query.companyName, req.query.time)
    .then(function (response) {
      res.json(response.data);
    });
});

// Get chart data of a companyName(symbol) depending on time in NSE - CSV Format (delimiter - |)
// Example: http://localhost:3000/nse/get_chart_data_new?companyName=VEDL&time=5
// Example: http://localhost:3000/nse/get_chart_data_new?companyName=VEDL&time=year
app.get("/nse/get_chart_data_new", (req, res, next) => {
  NSEAPI.getChartDataNew(req.query.companyName, req.query.time)
    .then(function (response) {
      res.json(response.data);
    });
});

// Bombay Stock Exchange (NSE) APIS

// Get details of all index in BSE Stock exchange - JSON
// Example: http://localhost:3000/bse/get_indices
app.get("/bse/get_indices", (req, res, next) => {
  BSEAPI.getIndices()
    .then(function (response) {
      res.json(response.data);
    });
});

// Get the information of only a single index eg. SENSEX (16) - JSON
// Example: http://localhost:3000/bse/getIndexInfo?indexId=16
app.get("/bse/getIndexInfo", (req, res, next) => {
  BSEAPI.getIndexInfo(req.query.indexId)
    .then(function (response) {
      res.json(response.data);
    });
});

// Get todays closing data and daily data of past time using IndexId and time from BSE  - JSON
// Example: http://localhost:3000/bse/get_index_chart_data?indexId=16
app.get("/bse/get_index_chart_data", (req, res, next) => {
  BSEAPI.getIndexChartData(req.query.indexId, req.query.time)
    .then(function (response) {
      res.json(response.data);
    });
});

// Get details of all the stocks in an index - JSON
// Example: http://localhost:3000/bse/get_index_stocks?indexId=16
app.get("/bse/get_index_stocks", (req, res, next) => {
  BSEAPI.getIndexStocks(req.query.indexId)
    .then(function (response) {
      res.json(response.data);
    });
});

// Get details of company (stock) using securityCode - JSON
// 500112 - symbol (securityCode) of SBIN stock BSE
// Example: http://localhost:3000/bse/get_company_info?companyKey=500325
app.get("/bse/get_company_info", (req, res, next) => {
  BSEAPI.getCompanyInfo(req.query.companyKey)
    .then(function (response) {
      res.json(response.data);
    });
});

// Get chart type details of stocks in BSE using companyKey and time - JSON
// returns(StockValue, Volume) for company in specified past time
// Example: http://localhost:3000/bse/get_stocks_chart_data?companyKey=500325&time=5
// Example: http://localhost:3000/bse/get_stocks_chart_data?companyKey=500325&time=month
app.get("/bse/get_stocks_chart_data", (req, res, next) => {
  BSEAPI.getStocksChartData(req.query.companyKey, req.query.time)
    .then(function (response) {
      res.json(response.data);
    });
});

// Get BSE stock data of stock info and day chart - HTML
// Example: http://localhost:3000/bse/get_stock_info_and_day_chart_data?companyKey=500325
app.get("/bse/get_stock_info_and_day_chart_data", (req, res, next) => {
  BSEAPI.getStockInfoAndDayChartData(req.query.companyKey)
    .then(function (response) {
      res.json(response.data);
    });
});

// Get the top gainers of BSE stock exchange - JSON
// Example: http://localhost:3000/bse/get_gainers
app.get("/bse/get_gainers", (req, res, next) => {
  BSEAPI.getGainers()
    .then(function (response) {
      res.json(response.data);
    });
});

// Get the top losers of BSE stock exchange - JSON
// Example: http://localhost:3000/bse/get_losers
app.get("/bse/get_losers", (req, res, next) => {
  BSEAPI.getLosers()
    .then(function (response) {
      res.json(response.data);
    });
});

// Get the top turnovers of BSE stock exchange - JSON
// Example: http://localhost:3000/bse/getTopTurnOvers
app.get("/bse/getTopTurnOvers", (req, res, next) => {
  BSEAPI.getTopTurnOvers()
    .then(function (response) {
      res.json(response.data);
    });
});

module.exports = app;
