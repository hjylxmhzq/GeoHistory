$(function () {
  $(".btn").click(function () {
    $(".form-signin").toggleClass("form-signin-left");
    $(".form-signup").toggleClass("form-signup-left");
    $(".frame").toggleClass("frame-long");
    $(".signup-inactive").toggleClass("signup-active");
    $(".signin-active").toggleClass("signin-inactive");
    $(".forgot").toggleClass("forgot-left");
    $(this).removeClass("idle").addClass("active");
  });
});

$(function () {
  $(".btn-signup").click(function () {
    $(".nav").toggleClass("nav-up");
    $(".form-signup-left").toggleClass("form-signup-down");
    $(".success").toggleClass("success-left");
    $(".frame").toggleClass("frame-short");
  });
});

$(function () {
  $('.btn-signin').bind('click', function (e) {
    e.preventDefault();
    const loginUrl = 'http://tony-space.top:8007/api/auth-login'
    const userName = $('#username')[0].value;
    const password = $('#password')[0].value;
    $.post(loginUrl, { userName, password }, function (data) {
      const j = JSON.parse(data);
      if (j.status === 0) {
        finishLogin(j.sessionId);
      } else {
        alert('密码错误')
      }
    })
  })
});

function finishLogin(cookie) {
  $(".btn-animate").toggleClass("btn-animate-grow");
  $(".welcome").toggleClass("welcome-left");
  $(".cover-photo").toggleClass("cover-photo-down");
  $(".frame").toggleClass("frame-short");
  $(".profile-photo").toggleClass("profile-photo-down");
  $(".btn-goback").toggleClass("btn-goback-up");
  $(".forgot").toggleClass("forgot-fade");
  document.cookie = `cid=${cookie}; path=/`;
}