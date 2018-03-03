$(function(){
  function buildHTML(message){
    console.log(message);
    console.log(message.image);
    var html = `<div class="messages-list" id="target">
                  <div class="messages-list--message">
                    <div class="messages-list--message-name">
                      ${message.user_name}
                    </div>
                    <div class="messages-list--message-time">
                      ${message.created_at}
                    </div>
                    <div class="messages-list--message-body">
                      ${message.body}
                    </div>
                    <img src=${message.image.url} class="img">
                  </div>
                </div>`
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    console.log(this);
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html =buildHTML(data);
      $('.chat-main__body').append(html).trigger('create');
      $('.chat-main__footer--form-message').val('')
      if(data.image.url == null)$('.img').remove();
      $('.chat-main__footer--form').val('')
      $('.img').val('')
      $('.chat-main__body').animate({scrollTop:$('#target')[0].scrollHeight});
    })
    .fail(function(){
      alert('error');
      })
    return false;
  });
});
