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
