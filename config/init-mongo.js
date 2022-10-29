db.createUser(
    {
        user: "root",
        pwd: "asdfasdfasdf",
        roles: [
            {
                role: "readWrite",
                db: "myapp"
            }
        ]
    }
);