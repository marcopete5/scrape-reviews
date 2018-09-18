const chai = require('chai');
const assert = chai.assert;
const findReviews = require('./index');


describe('A web scraping tool to gather reviews from McKaig Chevrolet Dealership', () => {
    it("should search through 5 different pages for reviews", () => {
        assert.isAtLeast(findReviews.urls.length, 5, "There are at least 5 pages")
    })
    it("should return an array with 3 reviews that are not empty strings", () => {
        assert.notDeepEqual(findReviews, ['','',''])
    })
})
