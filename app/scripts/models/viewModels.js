var headerViewModel = {
    addFunc: function () {
        this.go( 'app.manage.groups.add' );
    }
};

var groupViewModel = {}

var membersViewModel = {
    init: function (ctx) {
        var id = ctx.params.id;
        ctx.groupName = 'Unknown';
        for (var i = 0, c = ctx.groups.length; i < c; i++)
            if (ctx.groups[i].id === id) {
                ctx.groupName = ctx.groups[i].name;
                break;
            }

        ctx.publish({eventName: 'setTitle', eventData: ctx.groupName}, ['HeaderComponent']);
    },
    getMembersForGroup: function(id) {
        this.publish({eventName: 'addGroup', eventData: id});
    }
};


//var addGroupViewModel = {
//    addGroup: function(groupName) {
//        this.publish({eventName: 'addGroup', eventData: groupName});
//    }
//};

