var https = require('https')

var rootobj = {}
rootobj.uid = 'urn:uuid:6efe5726-f11c-4c61-a820-d4aa9886a987'
rootobj.updateDate = (new Date()).toISOString()
rootobj.titleText = 'Coinbase Spot Price'
rootobj.redirectionUrl = 'https://www.coinbase.com/'

var getAlexaResponse = (callback) => {
    var req = https.get('https://api.coinbase.com/v2/prices/spot?currency=USD', (res) => {
        var chunks = []
        res.on('data', (chunk) => {
            chunks.push(chunk)
            // console.log(chunk)
        })
        res.on('end', () => {
            var body = chunks.join('')
            var data = JSON.parse(body)
            var price = data.data.amount
            rootobj.mainText = [
                'The current value of',
                'Bitcoin is',
                price.split('.')[0],
                'US Dollars and',
                price.split('.')[1],
                'cents'
            ].join(' ')
            //console.log(price)
            callback(null, rootobj)
        })
    })

    req.on('error', (e) => {
        callback(e)
    })
}

exports.handler = (event, context, callback) => {
    getAlexaResponse(callback)
}
