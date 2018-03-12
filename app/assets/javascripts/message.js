$(function(){
  function buildHTML(message){
    var insertImage = message.image == null ? "" : `<img src=${message.image.url} class="img">`;
    var html = `<div class="messages-list" id="target" data-message-id="${message.id}">
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
                    ${insertImage}
                  </div>
                </div>`
    return html;
  }

  var interval = setInterval(update, 5000);

  function update(){
    if($('.messages-list')[0]){
      var messageId = $('.messages-list:last').data('message-id');
    } else{
      var messageId = 0
    }
    $.ajax({
      url: location.href,
      type: 'GET',
      dataType: 'json',
      data: {id: messageId}
    })
    .done(function(data){
      data.messages.forEach(function(message){
        if(message.id > messageId){
          var html =buildHTML(message);
          $('.chat-main__body').append(html);
          $('.chat-main__body').animate({scrollTop:$('#target')[0].scrollHeight});
        }
      });
    })
    .fail(function(data){
      alert('自動更新に失敗しました');
    })
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
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
      $('.chat-main__body').animate({scrollTop:$('#target')[0].scrollHeight});
    })
    .fail(function(){
      alert('error');
      })
    return false;
  });
});
