Endpoints
Configure the API to handle to the following routes:

Method	Endpoint	Description

posts

#POST	/api/posts	Creates a post using the information sent inside the request body.
GET	/api/posts	Returns an array of all the post objects contained in the database.
GET	/api/posts/:id	Returns the post object with the specified id.
GET	/api/posts/:id/comments	Returns an array of all the comment objects associated with the post with the specified id.
DELETE	/api/posts/:id	Removes the post with the specified id and returns the deleted post object. You may need to make additional calls to the database in order to satisfy this requirement.
PUT	/api/posts/:id	Updates the post with the specified id using data from the request body. Returns the modified document, NOT the original.

comments

#POST	/api/posts/:id/comments	Creates a comment for the post with the specified id using information sent inside of the request body.
GET	/api/posts/:id/comments	Returns an array of all the comment objects associated with the post with the specified id.



## Endpoint Specifications



### When the client makes a POST request to /api/posts:
#POST	/api/posts	Creates a post using the information sent inside the request body.

If the request body is missing the title or contents property:

cancel the request.
respond with HTTP status code 400 (Bad Request).
return the following JSON response: { errorMessage: "Please provide title and contents for the post." }.
If the information about the post is valid:

save the new post the the database.
return HTTP status code 201 (Created).
return the newly created post.
If there's an error while saving the post:

cancel the request.
respond with HTTP status code 500 (Server Error).
return the following JSON object: { error: "There was an error while saving the post to the database" }.





### When the client makes a GET request to /api/posts:
GET	/api/posts	Returns an array of all the post objects contained in the database.

If there's an error in retrieving the posts from the database:
cancel the request.
respond with HTTP status code 500.
return the following JSON object: { error: "The posts information could not be retrieved." }.


### When the client makes a GET request to /api/posts/:id:

If the post with the specified id is not found:

return HTTP status code 404 (Not Found).
return the following JSON object: { message: "The post with the specified ID does not exist." }.
If there's an error in retrieving the post from the database:

cancel the request.
respond with HTTP status code 500.
return the following JSON object: { error: "The post information could not be retrieved." }.


### When the client makes a DELETE request to /api/posts/:id:

If the post with the specified id is not found:

return HTTP status code 404 (Not Found).
return the following JSON object: { message: "The post with the specified ID does not exist." }.
If there's an error in removing the post from the database:

cancel the request.
respond with HTTP status code 500.
return the following JSON object: { error: "The post could not be removed" }.


### When the client makes a PUT request to /api/posts/:id:

If the post with the specified id is not found:

return HTTP status code 404 (Not Found).
return the following JSON object: { message: "The post with the specified ID does not exist." }.
If the request body is missing the title or contents property:

cancel the request.
respond with HTTP status code 400 (Bad Request).
return the following JSON response: { errorMessage: "Please provide title and contents for the post." }.
If there's an error 

### when updating the post:

cancel the request.
respond with HTTP status code 500.
return the following JSON object: { error: "The post information could not be modified." }.
If the post is found and the new information is valid:

update the post document in the database using the new information sent in the request body.
return HTTP status code 200 (OK).
return the newly updated post.


### When the client makes a POST request to /api/posts/:id/comments:

If the post with the specified id is not found:

return HTTP status code 404 (Not Found).
return the following JSON object: { message: "The post with the specified ID does not exist." }.
If the request body is missing the text property:

cancel the request.
respond with HTTP status code 400 (Bad Request).
return the following JSON response: { errorMessage: "Please provide text for the comment." }.
If the information about the comment is valid:

save the new comment the the database.
return HTTP status code 201 (Created).
return the newly created comment.
If there's an error while saving the comment:

cancel the request.
respond with HTTP status code 500 (Server Error).
return the following JSON object: { error: "There was an error while saving the comment to the database" }.

### CLIENT
### When the client makes a GET request to /api/posts/:id/comments:

If the post with the specified id is not found:

return HTTP status code 404 (Not Found).
return the following JSON object: { message: "The post with the specified ID does not exist." }.
If there's an error in retrieving the comments from the database:

cancel the request.
respond with HTTP status code 500.
return the following JSON object: { error: "The comments information could not be retrieved." }.