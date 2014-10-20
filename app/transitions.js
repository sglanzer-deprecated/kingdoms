export default function() {
    this.transition(
        this.fromNonEmptyModel(),
        this.hasClass('side-bar'),
        this.use('flex-grow')
    );
}