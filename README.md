# user-form

Building a webpage with a user creation form. 
 
I created 3 input, the first one with focus.
And 2 select options dropdown menu using get JSON request.
Which allow users to select from options returned by an endpoint. Users should only be able to select one occupation and one state. 

And also submitted the results of the form to the same endpoint via a POST request with a JSON body. 

The POST endpoint return a 200 status code if all fields are provided. 

I didn't allow form submission without completing the entire form and rovide feedback upon successful form submission.
I added another real time validation error message to the email input.
