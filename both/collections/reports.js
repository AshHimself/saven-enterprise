Reports.attachSchema(new SimpleSchema({
    content: {
        type: String,
        autoform: {
   label: false,
   rows: 5,
   placeholder: "Please provide a brief description"
}
    },
user_id: {
    type: String,
    autoform: {
     type: "hidden",
     label: false
 },
    autoValue:function(){ return this.userId }
}
}));

Reports.allow({
    insert: function(userId, doc) {
        // only allow posting if you are logged in
        return !!userId;
    }
});
