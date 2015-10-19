/*
 * Big shoutout to angus croll and the twitter peeps, as I stole this mess from
 * their Flight framework and angus' awesome mixin article
 */

//var stayFree = ["_mixins"]

/*
 *function setLockdown (perp, lockedDown) {
 *    Object.keys(perp).forEach(function (prop) {
 *        if (stayFree.indexOf(prop) === -1) { // prop is not in free list, lock it
 *            Object.defineProperty(perp, prop, {writeable: lockedDown})
 *        }
 *    })
 *}
 */

function mixin (consumer, mixins) {
    var hasOwn = Object.prototype.hasOwnProperty.bind(consumer)

    consumer._mixins = hasOwn("_mixins") ? consumer._mixins : []

    for (var i = 0; i < mixins.length; i++) {
        var mixin = mixins[i]

        if (consumer._mixins.indexOf(mixin) === -1) {// if not here
            mixin.call(consumer) // withLogging.call(User) or asRecordedHistory.call(Campaign) or withEmailNotifications(Dialogue)
            consumer._mixins.push(mixin)
        }

        mixin = null // if I never pull this ref off the array, I wouldn't have to null it
    }
}

module.exports = mixin
