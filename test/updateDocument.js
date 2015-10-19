require("should")

/*
 * Given a document: Campaign
 * Given the need to update the Campaign by adding a technical contact
 * Campaign.contacts
 * Campaign.deltas || Campaign.taskHistory
 * Campaign.task.run()
 *
 * So should I decorate a Campaign with a Task? The task will assume a certain
 * api
 */

/* Dramatic Peeps */
var Campaign    = require("../models/campaign")
  , User        = require("../models/user")
  , Tasks       = require("../models/tasks")
  , Action      = require("../models/action")
  , mixin       = require("../core/mixin")
  ;

describe("Adding a user to a campaign", function () {
        var camp                = new Campaign({owner: "", group_id: "", _id: "camp_id"})
        var jim_VendorContact   = new User({name: "Jim Satan", group_id: "camp_1", role: "tech_contact", perms: 0666, campaigns: [], _id: "jims_id"})

        describe("the act of doing so", function () {
                mixin(camp, [User.withUserManagement, Action.withHistory]) // after this, camp.user.add, camp.user.findOne, camp.user.history
                console.log(camp._mixins)
                camp.user.add(jim_VendorContact)

                it("should set a user object by id in the _users object", shouldSetUser)
                it("should be timestamped", shouldBeTimestamped)
                it("should leave an action record in the camps action history", shouldCreateActionHistory)
        })

        function shouldCreateActionHistory () {
            var lastAction = camp.history.getLastAction()
            lastAction.should.have.property("type")
            lastAction.should.have.property("action")

            lastAction.type.should.eql("user")
            lastAction.action.should.eql("add")
        }

        function shouldSetUser () {
            camp._users.should.have.property("jims_id")
            camp._users["jims_id"].name.should.eql("Jim Satan")
        }

        function shouldBeTimestamped () {
            var task = camp.history.getLastAction()
            task.should.have.property("timestamp")
        }
})

/*
 *
 * Every task resolves with a timestamp
 * completed or something like
 *
 * What are some tasks?
 *
 * Collect this piece of info
 * Collect this signed pdf
 * Add this user to this campaign
 * Remove this user to this campaign
 * Set up this meeting between these users
 * Add this comment to this dialogue
 * Notify this person via a UI event
 *
 */

/*
 * Looks like I need a seperate abstraction: Action
 * The system needs to keep a detailed timeline of everything that happens, so
 * lets just make every mutation of an Entity work through Actions
 *
 * Actions will be mixins that depend on the Data object that is the subject of
 * the mixin exposing a certain state API
 *
 * So a campaign will have a .users property that withUserManagement will
 * expect
 */
