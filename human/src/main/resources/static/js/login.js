// 회원가입 버튼 클릭 시 화면 전환
document.getElementById('signup_link').addEventListener('click', () => {
    document.getElementById('login_page').style.display = 'none';
    document.getElementById('signup_page').style.display = 'block';
});

// 개인정보 활용 동의 모달
document.addEventListener("DOMContentLoaded", () => {
  const checkbox = document.getElementById("agree");
  const modal = document.getElementById("privacyModal");
  const closeBtn = document.querySelector(".close_btn");

  // 체크박스 클릭 시 모달 표시
  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      modal.style.display = "block";
    } else {
      modal.style.display = "none";
    }
  });

  // 닫기 버튼 클릭 시 모달 숨기기
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
    checkbox.checked = true; // 체크박스 해제
  });

  // 모달 외부 클릭 시 모달 숨기기
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
      checkbox.checked = true; // 체크박스 해제
    }
  });
});

// 회원가입 ajax 통신
$(document).ready(function() {
  $('#btn_submit').on('click', function() {
    const formData = {
      e_id: $('#e_id').val(),
      e_name: $('#e_name').val(),
      e_pwd: $('#e_pwd').val(),
      e_phone: $('#e_phone').val(),
      e_email: $('#e_email').val(),
      e_dept: $('#e_dept').val(),
      e_position: $('#e_position').val()
    };


    $.ajax({
      type: "POST",
      url: "/login/signIn",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(formData),
      success: function(response) {
        alert("회원가입에 성공하였습니다. 로그인 페이지로 이동합니다.");
        window.location.href = "/login";

      },
      error: function(xhr, status, error) {
        alert("회원가입 실패: " + error);
      }
    });
  });
});

//로그인 기능
$('#btn_login').on('click', function(event) {
    event.preventDefault()
    const loginData = {
        e_id: $('#login_id').val(),
        e_pwd: $('#login_pw').val()
    };

    $.ajax({
        type: "POST",
        url: "/login/logIn",
        data: loginData,
        success: function(response) {
            alert("로그인 성공하였습니다.");
            window.location.href = "/common";
        },
        error: function(xhr) {
            alert("로그인 실패 "+xhr.responseText);
        }
    });
});




//아이디 중복확인
//$('#e_id').on('input', function(){
//    const e_id = $(this).val().trim();
//
//    if(e_id === ''){
//        $('#idWarning').text('');
//        return;
//    }
//    $.ajax({
//        type:"POST",
//        url: "/login/checkId"
//        data: { e_id: e_id },
//        success: function (idAvailable) {
//            if (idAvailable) {
//                $('#idWarning').text('사용 가능합니다.').css('color', 'green');
//            } else {
//                $('#idWarning').text('중복된 아이디입니다.').css('color', 'red');
//            }
//        },
//        error: function () {
//            $('#idWarning').text('아이디 확인 중 오류가 발생했습니다.').css('color', 'red');
//        }
//    });
//
//})

// 비밀번호 일치 여부 확인
//$('#pw_confirm').on('input', function () {
//    const password = $('#e_pwd').val();
//    const confirmPassword = $(this).val();
//
//    if (password === '' || confirmPassword === '') {
//        $('#pwdWarning').text(''); // 비어 있을 때 경고 문구 제거
//        return;
//    }
//
//    if (password === confirmPassword) {
//        $('#pwdWarning').text('비밀번호가 일치합니다.').css('color', 'green');
//    } else {
//        $('#pwdWarning').text('비밀번호가 같지 않습니다.').css('color', 'red');
//    }
//});

