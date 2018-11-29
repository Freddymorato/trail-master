
let current_path = window.location.pathname;
let user = current_path.substring(7).slice(0, 1);
let trail = current_path.substring(current_path.lastIndexOf('/') + 1);
let url = `/users/${user}/trails/${trail}`;
let auth_token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');


class Comment {
  constructor(resp) {
    this.id = resp.id;
    this.content = resp.content;
    this.userId = resp.user_id;
    this.trailId = resp.trail_id;
    this.userName = resp.comment_owner;
  };

  // Show Comment
  showComment() {
    $("#comment_list").show();
    $('div#com-section').empty();
    $('div#com-section').append(
      `<div class="comment-wrapper">
      <small id="name-tag">${this.userName}</small><br><br>
      <p class="commentid-${this.id}">${this.content}<br><br>
      <button class="delete-commentid-${this.id}">Delete Comment</button>
      </p></div>`);
      $(".delete-commentid-"+this.id).on('click', () => this.deleteComment());
  };

  // Delete A Comment
  deleteComment() {
    if (this.userId == user) {
      $.ajax({
        type: 'DELETE',
        url: url + '/comments/' + this.id + '.json',
        data: {authenticity_token: auth_token},
        success: function (data) {
          $("#url" + this.id).remove();
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
};

// Comment Index
function commentList() {
  $('div#com-section').empty();
  $.get(url + '.json', function (trailJson) {
    trailJson.comments.forEach(function(commentJson) {
      let comment = new Comment(commentJson);
      $('div#com-section').append(`<div class="comment-wrapper">
      <small id="name-tag">${comment.userName}</small><br><br>
      <p class="commentid-${comment.id}">${comment.content}</p></div>`);
      $(".commentid-"+comment.id).on('click', () => comment.showComment());
    });
  });
  $("#comment_list").hide();
  $("#my_comments").show();
};

// Show current User's Comments for Trail
function myComments(user) {
  $("#comment_list").show();
  $('div#com-section').empty();
  $.get(url + '.json', function (trailJson) {
    let userComments = trailJson.comments.filter(comment => comment.user_id == user);
    userComments.forEach(function(userComment) {
      let comment = new Comment(userComment);
      $('div#com-section').append(`<div class="comment-wrapper">
      <small id="name-tag">${comment.userName}</small><br><br>
      <p class="commentid-${comment.id}">${comment.content}</p></div>`);
      $(".commentid-"+comment.id).on('click', () => comment.showComment());
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
      url: url + '/comments.json',
      data: $(this).serialize(), // serializes form data
      success: function(resp) {
        // on success update DOM with resp in the form of data
        let comment = new Comment(resp);
        comment.showComment();
      }
    });
    $("#new_comment").trigger('reset');
  });
});



function attachListeners () {
  $("#comment_list").on('click', () => commentList());
  $("#my_comments").on('click', () => myComments(user));
};

$(document).on("turbolinks:load", () => {
  attachListeners();
});
