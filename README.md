# nosql-socialnetwork-api
# Authors

Allen Klein

- [Link to Github Repository](https://github.com/allen-ek/nosql-socialnetwork-api)

## Why?
I wanted to create a nosql backend using mongodb to manage the data base for a social network platform that has users able to friend create thoughts and reactions to those thoughts.

## What I learned
I learned how to use Node.js, Express npm to serve client side data as well as how to incorparate a server to fetch and host the data using mongodb for 
the social network application. I also learned how to create api paths to handle requests and how to respond to these requests. I also learned the fundamentals of MVC frameworks.
## Technologies Used
Moment
Express
Node.js
MongoDB
Github

## Code Snippet
```html
 createThought({ params, body }, res) {
    Thought.create(body)
      .then(data => {
        User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { thoughts: data._id }},
          { new: true }
        )
      .then(data => {
        if(!data) {
          res.status(404).json({ message: "User not found" });
          return;
        }
        res.json(data);
      })
      .catch(err => res.status(500).json(err));
    })
    .catch(err => res.status(500).json(err));
  },
```
The code snippet above was the code in order to make a request to the server to create a thought with the assicated user and have it stored in MongoDB for access.