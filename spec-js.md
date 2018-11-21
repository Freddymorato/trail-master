# Specifications for the Rails with jQuery Assessment

Specs:

- [x] Use jQuery for implementing new requirements
-     jQuery val(), serialize(), filter(), attr()
- [x] Include a show resource rendered using jQuery and an Active Model Serialization JSON backend.
-     A Comment's show resource is rendered on a Trail's show page.
- [x] Include an index resource rendered using jQuery and an Active Model Serialization JSON backend.
-     Comments index resource is rendered on a Trail's show page.
- [x] Include at least one has_many relationship in information rendered via JSON and appended to the DOM.
-     A User has_many Comments through Trails rendered on a Trail's show page.
- [x] Use your Rails API and a form to create a resource and render the response without a page refresh.
-     The Comment form submits new Comments on the Trail show page without page refresh.
- [x] Translate JSON responses into JS model objects.
-     Upon new Comment submission, Comment data used to create JS Comment object.
- [x] At least one of the JS model objects must have at least one method added by your code to the prototype.
-     let comment = new Comment(resp, user, trail); - comment data passed into showComment(comment.id) and appended to the DOM.

Confirm

- [x] You have a large number of small Git commits
- [x] Your commit messages are meaningful
- [x] You made the changes in a commit that relate to the commit message
- [x] You don't include changes in a commit that aren't related to the commit message
