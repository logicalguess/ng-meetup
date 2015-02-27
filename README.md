# Router Demo

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.11.0.

## Build & development

Run `npm install`, `bower install`, `grunt` for building and `grunt serve` for preview.

## Testing

Running `grunt test` will run the unit tests with karma.

## Reactive models

This is a modification of the original meetup project that uses RxJs to publish model state to
the views. The data and view components are POJOs that are free of Angular code. A router decorator
is used to convert the POJOs into Angular controllers. 

Example:

`GroupComponent` data model:

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
    
`membersViewModel`:

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
    
Configuration:

            .state( 'app.manage.groups', {
                    url : '^/manage',
                    views : {
                        'content' : {
                            templateUrl : 'views/manage-groups.html',
                            resolve : {
                                state : function ( groups ) {
                                    return {groups: groups};
                                }
                            },
                            viewModel: groupViewModel,
                            dataModel: groupDataModel
                        }
                    },
                    onEnter: function(){
                        eventStream.publish({event: {eventName: 'setDefault'}, components:['HeaderComponent']});
                    }
            } )
