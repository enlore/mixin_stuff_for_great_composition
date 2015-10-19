function Campaign (opts) {
    this._users = {} // required API for withUserManagement Mixin
    this._history = []
}

module.exports = Campaign
