
let current_path = window.location.pathname;
let user = current_path.substring(7).slice(0, 1);
let trail = current_path.substring(current_path.lastIndexOf('/') + 1);
let url = `/users/${user}/trails/${trail}/`;
let auth_token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');


// ES6 class syntax
function Comment(resp, user, trail) {
  this.id = resp.id;
  this.content = resp.content;
  this.user_id = user;
  this.trail_id = trail;
};

// Object.prototype
Comment.prototype.renderComment = function() {
  showComment(this.id);
};

// Index of Comments
function commentList() {
  $('div#com-section').empty();
  $.get(url + 'comments.json', function (comments) {
    let trailComments = comments.filter(comment => comment.trail_id == trail);
    trailComments.forEach(function(comment) {
      $('div#com-section').append(`<div class="comment-wrapper">
      <small id="name-tag">${getUsername(comment)}</small><br><br>
      <p class="commentid-${comment.id}">${comment.content}</p></div>`);
      $(".commentid-"+comment.id).on('click', () => showComment(comment.id));
    });
  });
  $("#comment_list").hide();
  $("#my_comments").show();
};

// Show Comment
function showComment(commentid) {
  $("#comment_list").show();
  $.get(url + 'comments/' + commentid + '.json', function(data) {
    $('div#com-section').empty();
    let comment = data;
    $('div#com-section').append(
      `<div class="comment-wrapper">
      <small id="name-tag">${getUsername(comment)}</small><br><br>
      <p class="commentid-${comment.id}">${comment.content}<br><br>
      <button class="delete-commentid-${comment.id}">Delete Comment</button>
      </p></div>`
    );
    $(".delete-commentid-"+comment.id).on('click', () => deleteComment(comment));
  });
};

// Show Logged In User's Comments For Current Trail
function myComments(user) {
  $("#comment_list").show();
  $('div#com-section').empty();
  $.get(url + 'comments.json', function (comments) {
  let trailComments = comments.filter(comment => comment.trail_id == trail);
  let userComments = trailComments.filter(comment => comment.user_id == user);
  userComments.forEach(function(comment) {
      $('div#com-section').append(`<div class="comment-wrapper">
      <small id="name-tag">${getUsername(comment)}</small><br><br>
      <p class="commentid-${comment.id}">${comment.content}</p></div>`);
      $(".commentid-"+comment.id).on('click', () => showComment(comment.id));
    });
  });
  $("#my_comments").hide();
};

// Post New Comment
$(function() {
  //Listen for submission of the form
  $("#new_comment").submit(function(event) {
    //Get action and method from form itself - this
    event.preventDefault();
    $.ajax({
      method: 'POST',
      url: url + 'comments.json',
      data: $(this).serialize(), // serializes form data
      success: function(resp) {
        // on success update DOM with resp in the form of data
        let comment = new Comment(resp, user, trail);
        comment.renderComment();
      }
    });
    $("#new_comment").trigger('reset');
  });
});

 // Delete A Comment
function deleteComment(comment) {
  if (comment.user_id == user) {
    $.ajax({
      type: 'DELETE',
      url: url + 'comments/' + comment.id + '.json',
      data: {authenticity_token: auth_token},
      success: function (data) {
        $("#url" + comment.id).remove();
      },
      error: function (data) {
        console.error('Error:', data);
      }
    });
    event.preventDefault();
    alert("Comment successfully deleted.");
  }
  else {
    alert("You must own the comment inorder to delete it.");
  }
  commentList();
};

// Get Comment Owner's Name
function getUsername(comment) {
  return comment.user.name;
};

function attachListeners () {
  $("#comment_list").on('click', () => commentList());
  $("#my_comments").on('click', () => myComments(user));
};

$(document).ready(() => {
  attachListeners();
});
