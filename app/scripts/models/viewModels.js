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

var headerViewModel = {
    addFunc: function () {
        this.go( 'app.manage.groups.add' );
    }
};

var HeaderComponent = {
    initialState: {
        title: 'My Groups'
    },
    eventProcessor: function (state, event) {
        if (event.eventName == 'setTitle') {
            state.title = event.eventData;
        }
        if (event.eventName == 'setDefault') {
            state.title = 'My Groups';
        }
        return state;
    },
    publishedStateMapper: function (state) {
        return state;
    }
};

var headerDataModel = LogicalComponent('HeaderComponent', HeaderComponent);

var GroupComponent = {
    initialState: {
        groups: [
            {id: '34D', name: 'AM Classroom'},
            {id: 'A5C', name: 'PM Classroom'},
            {id: 'K3P', name: 'After School Care'}
        ]
    },
    eventProcessor: function (state, event) {
        if (event.eventName == 'addGroup') {
            var group = {
                id : Math.random().toString( 36 ).substring( 3 ),
                name : event.eventData
            };
            state.groups = state.groups.concat(group);

        }
        return state;
    },
    publishedStateMapper: function (state) {
        return state;
    }
};

var groupDataModel = LogicalComponent('GroupComponent', GroupComponent);

//var addGroupViewModel = {
//    addGroup: function(groupName) {
//        this.publish({eventName: 'addGroup', eventData: groupName});
//    }
//};

