Feedbacks.attachSchema(new SimpleSchema({
    content: {
        type: String,
        autoform: {
   label: false,
   rows: 5,
   placeholder: "Please provide some feedback"
}
    },
    feedbackType: {
    optional: true,
    type: String,
    autoform: {
        type: "select-radio",
        options: function() {
            return [{
                label: "Feedback",
                value: 'feedback'
            }, {
                label: "Bug",
                value: 'bug'
            }];
        }
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
