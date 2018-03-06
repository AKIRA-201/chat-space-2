$(function() {

  var search_list = $('#user-search-result');

  function appendUser(user){
    var html =`<div class='chat-group-user clearfix'>
                 <p class='chat-group-user__name'>${user.name}</p>
                 <a class='user-search-add chat-group-user__btn chat-group-user__btn--add js-add-btn' data-user-id='${user.id}' data-user-name='${user.name}'>追加</a>
               </div>`
    search_list.append(html);
  }

  function appendNoUser(user){
    var html =`<div class='chat-group-user clearfix>
                 <p class='chat-group-user__name'>${user}</p>
               </div>`
    search_list.append(html);
  }

  $("#user-search-field").on("keyup",function() {
    var input = $("#user-search-field").val();
    if (input.length !== 0){
      $.ajax({
        type: 'GET',
        url: '/users',
        data: { keyword: input },
        dataType: 'json'
      })

      .done(function(user) {
        $("#user-search-result").empty();
        if (user.length !== 0){
          user.forEach(function(user){
            appendUser(user);
          });
        }
        else{
          appendNoUser('一致するユーザーはありません');
        }
      })
      .fail(function() {
        alert('ユーザー検索に失敗しました')
      })
    }
  });

  function addUser(user_id,user_name){
    var html=`<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${user_id}'>
                <p class='chat-group-user__name'>${user_name}</p>
                <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn' data-user-id="${user_id}" data-user-name="${user_name}">削除</a>
              </div>`
    $('.chat-group-users').append(html);
  }

  $(document).on('click','.user-search-add', function() {
    var user_id = $(this).data('user-id');
    var user_name = $(this).data('user-name');
    $(this).parent().remove();
    addUser(user_id,user_name);

    $(document).on('click','.user-search-remove',function() {
      $(this).parent().remove();
    });
  });
});
