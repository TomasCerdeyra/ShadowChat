interface User {
    name: string;
    email: string;
    password: string;
    session_active: boolean;
    chats?: [string];
    groups?: [string];
}

export default User