// Schema = {};
// Schema.UserProfile = new SimpleSchema({
//     fullname: {
//         type: String,
//         label: "Full Name",
//
//         optional: false
//     },
//     type: {
//         type: String,
//         label: "Type",
//
//         optional: false
//     }
// });
//
// Schema.User = new SimpleSchema({
//     _id: {
//         type: String,
//         regEx: SimpleSchema.RegEx.Id
//     },
//     emails: {
//         optional: true,
//         type: [Object],
//         custom: function () {
//             console.log(this);
//         }
//     },
//     createdAt: {
//         type: Date
//     },
//     profile: {
//         type: Schema.UserProfile,
//         optional: true
//     }
// });
//
// Meteor.users.attachSchema(Schema.User);
