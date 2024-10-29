module.exports = {
    "openapi": "3.0.0",
    "info": {
        "title": "API Documentation",
        "description": "OpenAPI documentation",
        "version": "1.0.0"
    },
    "tags": [
        {
            "name": "Auth",
            "description": "Operations for user authentication"
        },
        {
            "name": "Users",
            "description": "Operations related to users"
        },
        {
            "name": "Posts",
            "description": "Operations related to posts"
        },
        {
            "name": "Socket",
            "description": "Operations related to WebSocket notifications"
        }
    ],
    "components": {
        "securitySchemes": {
            "apiToken": {
                "type": "apiKey",
                "in": "header",
                "name": "access_token",
                "description": "Enter the token directly without 'Bearer ' prefix"
            }
        }
    },
    "paths": {
        "/api/users": {
            "post": {
                "summary": "Create a new user",
                "description": "Creates a new user with the provided information.",
                "tags": ["Users"],
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "email": { "type": "string" },
                                    "password": { "type": "string" },
                                    "name": { "type": "string" },
                                    "profilePicture": { "type": "string" },
                                    "roles": {
                                        "type": "array",
                                        "items": { "type": "string" }
                                    }
                                },
                                "required": ["email", "password", "roles"]
                            }
                        }
                    }
                },
                "responses": {
                    "201": {
                        "description": "User created successfully",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "id": { "type": "integer" },
                                        "email": { "type": "string" },
                                        "name": { "type": "string" },
                                        "profilePicture": { "type": "string" },
                                        "roles": {
                                            "type": "array",
                                            "items": { "type": "string" }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "get": {
                "summary": "Get all users",
                "description": "Returns a list of all users.",
                "tags": ["Users"],
                "security": [{ "apiToken": [] }],
                "responses": {
                    "200": {
                        "description": "A list of users",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "type": "object",
                                        "properties": {
                                            "id": { "type": "integer" },
                                            "email": { "type": "string" },
                                            "name": { "type": "string" },
                                            "profilePicture": {
                                                "type": "string"
                                            },
                                            "roles": {
                                                "type": "array",
                                                "items": { "type": "string" }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/users/{id}": {
            "patch": {
                "summary": "Update user by ID",
                "tags": ["Users"],
                "description": "Updates a user's information based on their ID.",
                "security": [{ "apiToken": [] }],
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "schema": { "type": "integer" }
                    }
                ],
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "email": { "type": "string" },
                                    "name": { "type": "string" },
                                    "profilePicture": { "type": "string" },
                                    "roles": {
                                        "type": "array",
                                        "items": { "type": "string" }
                                    }
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "User updated successfully",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "id": { "type": "integer" },
                                        "email": { "type": "string" },
                                        "name": { "type": "string" },
                                        "profilePicture": { "type": "string" },
                                        "roles": {
                                            "type": "array",
                                            "items": { "type": "string" }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "delete": {
                "summary": "Delete user by ID",
                "tags": ["Users"],
                "description": "Deletes a user based on their ID.",
                "security": [{ "apiToken": [] }],
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "schema": { "type": "integer" }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "User deleted successfully",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "message": { "type": "string" }
                                    }
                                }
                            }
                        }
                    },
                    "404": {
                        "description": "User not found",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "error": { "type": "string" }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/auth": {
            "post": {
                "summary": "Authenticate user",
                "tags": ["Auth"],
                "description": "Authenticates a user and returns a token.",
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "email": { "type": "string" },
                                    "password": { "type": "string" }
                                },
                                "required": ["email", "password"]
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Authentication successful",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "user": {
                                            "type": "object",
                                            "properties": {
                                                "id": { "type": "integer" },
                                                "email": { "type": "string" },
                                                "name": { "type": "string" }
                                            }
                                        },
                                        "token": { "type": "string" }
                                    }
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Authentication failed",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "error": { "type": "string" }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/posts": {
            "post": {
                "summary": "Create a new post",
                "description": "Creates a new post with the provided details.",
                "tags": ["Posts"],
                "security": [{ "apiToken": [] }],
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "title": { "type": "string" },
                                    "content": { "type": "string" },
                                    "authorId": { "type": "integer" }
                                },
                                "required": ["title", "authorId"]
                            }
                        }
                    }
                },
                "responses": {
                    "201": {
                        "description": "Post created successfully",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "id": { "type": "integer" },
                                        "title": { "type": "string" },
                                        "content": { "type": "string" },
                                        "authorId": { "type": "integer" }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "get": {
                "summary": "Get all posts",
                "description": "Retrieves a list of all posts.",
                "tags": ["Posts"],
                "security": [{ "apiToken": [] }],
                "responses": {
                    "200": {
                        "description": "A list of posts",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "type": "object",
                                        "properties": {
                                            "id": { "type": "integer" },
                                            "title": { "type": "string" },
                                            "content": { "type": "string" },
                                            "authorId": { "type": "integer" }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/posts/user/{authorId}": {
            "get": {
                "summary": "Get posts by user ID",
                "description": "Retrieves posts created by a specific user.",
                "tags": ["Posts"],
                "security": [{ "apiToken": [] }],
                "parameters": [
                    {
                        "name": "authorId",
                        "in": "path",
                        "required": true,
                        "schema": { "type": "integer" }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "A list of posts by the specified user",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "type": "object",
                                        "properties": {
                                            "id": { "type": "integer" },
                                            "title": { "type": "string" },
                                            "content": { "type": "string" },
                                            "authorId": { "type": "integer" }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/posts/{id}": {
            "patch": {
                "summary": "Update post by ID",
                "description": "Updates an existing post's information based on its ID.",
                "tags": ["Posts"],
                "security": [{ "apiToken": [] }],
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "schema": { "type": "integer" }
                    }
                ],
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "title": { "type": "string" },
                                    "content": { "type": "string" }
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Post updated successfully",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "id": { "type": "integer" },
                                        "title": { "type": "string" },
                                        "content": { "type": "string" }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "delete": {
                "summary": "Delete post by ID",
                "description": "Deletes a post based on its ID.",
                "tags": ["Posts"],
                "security": [{ "apiToken": [] }],
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "schema": { "type": "integer" }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Post deleted successfully",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "message": { "type": "string" }
                                    }
                                }
                            }
                        }
                    },
                    "404": {
                        "description": "Post not found",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "error": { "type": "string" }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/socket/notification": {
            "post": {
                "summary": "Send notification to all users",
                "description": "Sends a notification to all connected users via WebSocket.",
                "tags": ["Socket"],
                "security": [{ "apiToken": [] }],
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "message": { "type": "string" }
                                },
                                "required": ["message"]
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Notification sent successfully",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "status": { "type": "string" }
                                    }
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Notification failed",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "error": { "type": "string" }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
