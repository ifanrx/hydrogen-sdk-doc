const config = require('./config')

module.exports = {
  getVote: function (id) {
    return $.ajax({
      url: `${config.apiHost}/api/v2/hydrogen/doc/vote/${id}/`,
      xhrFields: {
        withCredentials: true
      },
    })
  },

  vote: function (id, type) {
    return $.ajax({
      url: `${config.apiHost}/api/v2/hydrogen/doc/vote/`,
      data: JSON.stringify({
        documentation_path: id,
        operation: type === 'down' ? 'downvote' : 'upvote'
      }),
      method: 'POST',
      dataType: 'json',
      contentType: 'application/json; charset=utf-8',
      xhrFields: {
        withCredentials: true
      },
    })
  }
}
