# Specifications for the Rails Assessment

Specs:
- [x] Using Ruby on Rails for the project.
- [x] Include at least one has_many relationship.
-     A User has_many Trails.
- [x] Include at least one belongs_to relationship.
-     A Trail belongs_to a User.
- [x] Include at least one has_many through relationship.
-     A User has_many Countries through Trails.
- [x] The "through" part of the has_many through includes at least one user submittable attribute.
-     comment.content.
- [x] Include reasonable validations for simple model objects .
-     List of model objects with validations e.g. User, Trail, Country, Comment.
- [x] Include a class level ActiveRecord scope method.
-     Trail.search(search)
- [x] Include signup.
-     how e.g. Devise.
- [x] Include login.
-     bcrypt.
- [x] Include logout.
-     bcrypt.
- [x] Include third party signup/login.
-     bcrypt./OmniAuth.
- [x] Include nested resource show or index.
-     users/:id/trails/:id.
- [x] Include nested resource "new" form.
-     users/:id/trails/new.
- [x] Include form display of validation errors.
-     form URL e.g. /trails/new.

Confirm:
- [x] The application is pretty DRY
- [x] Limited logic in controllers
- [x] Views use helper methods if appropriate
- [x] Views use partials if appropriate
