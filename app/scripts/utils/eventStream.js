function EventStream() {

    var eventStream = new Rx.Subject();

    this.wire = function(viewComponent, logicalComponent) {
        return logicalComponent.getStateStream()
            .subscribe(viewComponent.setState.bind(viewComponent));
    };

    this.publish = function(event) {
        eventStream.onNext(event);
    };

    this.filter = function(eventFilter) {
        return eventStream.filter(eventFilter);
    };
}

eventStream = new EventStream()

