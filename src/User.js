function User(props) {
    return (
        <span>{props.name || 'John Doe'}</span>
    )
}

export default User;