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

var MembersComponent = {
    initialState: [
        {id : '101', name : 'Amy Adams'},
        {id : '102', name : 'Bill Bixby'},
        {id : '103', name : 'Chevy Chase'},
        {id : '103', name : 'Danny Devito'},
        {id : '103', name : 'Emilio Estevez'},
        {id : '103', name : 'Farah Fawcett'},
        {id : '103', name : 'Gordon Gecko'},
        {id : '103', name : 'Helen Hunt'}
    ],
    eventProcessor: function (state, event) {
        if (event.eventName == 'updateMembers') {
        }
        return state;
    },
    publishedStateMapper: function (state) {
        return state;
    }
};

var membersDataModel = LogicalComponent('MembersComponent', MembersComponent);
