function Action () {}

Action.mockGlobalHistory = []

Action.withHistory = function withHistory () {
    if (!Object.prototype.hasOwnProperty.call(this, "_history"))
        throw new Error("This object fails to expose the required api: _history")

    this.history = {}

    var self = this

    this.history.write = function write (action) {
        if (!Object.prototype.hasOwnProperty(action, "_id"))
            action._id = "some random id" // TODO
        self._history.push(action)
        Action.mockGlobalHistory.push(action)
    }

    this.history.getLastAction = function getLastAction () {
        return self._history[self._history.length - 1]
    }
}

module.exports = Action
