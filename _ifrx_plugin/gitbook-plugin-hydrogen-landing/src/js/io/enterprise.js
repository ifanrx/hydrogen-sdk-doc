const config = require('./config')

module.exports = {
  getEnterpriseList: offset => {
    return $.ajax({
      url: `${config.apiHost}/dserve/v1/enterprise/?limit=20&offset=${offset}&for_nav=true`,
      // url: `https://cloud.minapp.com/dserve/v1/enterprise/?limit=20&offset=${offset}&for_nav=true`,
      xhrFields: {
        withCredentials: true
      },
    })
  }
}
