const config = require('./config')

module.exports = {
  getVote: function (id) {
    return $.ajax({
      url: `${config.apiHost}/api/v2/hydrogen/doc/vote/`,
      xhrFields: {
        withCredentials: true
      },
      data: {
        documentation_path: id,
      },
    })
  },

  addVoteRecord: function (id, type) {
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
  },

  deleteVoteRecord: function (id) {
    return $.ajax({
      url: `${config.apiHost}/api/v2/hydrogen/doc/vote/?documentation_path=${id}`,
      method: 'DELETE',
      dataType: 'json',
      contentType: 'application/json; charset=utf-8',
      xhrFields: {
        withCredentials: true
      },
    })
  }
}
