function User (opts) {
    var opts = opts || {}
    this._id = opts._id
    this.name = opts.name
}

User.withUserManagement = function withUserManagement () {
    // no state api?
    // already registered?
    // already has that namespace?
    if (!Object.hasOwnProperty.call(this, "_users")) { // this may not have Object in its proto chain
        throw new Error("Base does not expose required API: _users")
    }

    this.user = {} // this is basically a namespace

    var self = this

    this.user.add = function (user) {
        if (self._users.hasOwnProperty(user._id))
            throw new Error("That user is already associated with self object")

        else {
            self._users[user._id] = user

            if (self.history) {
                self.history.write({type: "user", action: "add", timestamp: Date.now(), user: "the logged in user's _id"})  // Action
            }// is this how we dynamically use other mixins from this one?
        }
    }

    this.user.remove = function (user) {
        if (self._users.hasOwnProperty(user._id)) {
            delete self._users[user._id]

            if (self.history) {
                self.history.write({type: "user", action: "remove", timestamp: Date.now(), user: "the logged in user's _id"})  // Action
            }
        }
    }
}

module.exports = User
