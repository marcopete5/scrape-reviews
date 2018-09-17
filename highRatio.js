// request-promise ---- accepts an object as input, and returns a promise
const rp = require('request-promise');
const cheerio = require('cheerio');

const reviews = [];

const urls = ["/page1/", "/page2/", "/page3/", "/page4/", "/page5/"]

const positive = ['good', 'helpful', 'awesome', 'amazing', 'great', 'understanding', 'positive', 'attitude', 'recommend', 'highly', 'friendly', 'fast', 'happy', 'welcome', 'courteous' ]

for (i = 0; i < urls.length; i++){
    const options = {
        uri: `https://www.dealerrater.com/dealer/McKaig-Chevrolet-Buick-A-Dealer-For-The-People-dealer-reviews-23685${urls[i]}`,
        transform: function (body) {
          return cheerio.load(body);
        }
      };
    
    rp(options)
      .then(($) => {
          $('div[id=reviews]').find('.review-content').each(function(i, elem) {
            reviews.push($(this).text());
          });
          if (reviews.length === 50){
              const top3 = [0,0,0]
              const saved = ['','','']
              reviews.map(review => {
                  const words = review.split(' ')
                  let posWords = words.filter(word => {
                        return positive.includes(word)
                  }).length
                  const posTotal = posWords / words.length
                  if(posTotal > top3[0]){
                      top3[0] = posTotal
                      saved[0] = review
                  }else if(posTotal > top3[1]){
                      top3[1] = posTotal
                      saved[1] = review
                  }else if(posTotal > top3[2]){
                      top3[2] = posTotal
                      saved[2] = review
                  }
              })
              console.log(`Most severely positive review:\n\n${saved[0]}\n\n\n2nd most positive review:\n\n${saved[1]}\n\n\n3rd most positive review:\n\n${saved[2]}`)
          }
      })
      .catch((err) =>{
          console.log(err)
      });
}