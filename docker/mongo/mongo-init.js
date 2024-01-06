try {
    print("CREATING USER")

    db.createUser(
        {
            user: "mongouser",
            pwd: "password",
            roles: [
                {
                    role: "readWrite",
                    db: "express-api"
                }
            ]
        }
    );
} catch (error) {
    print(`Failed to create developer db user:\n${error}`);
}