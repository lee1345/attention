// 회원가입 버튼 클릭 시 화면 전환
document.getElementById('signup-link').addEventListener('click', () => {
    document.getElementById('login-page').style.display = 'none';
    document.getElementById('signup-page').style.display = 'block';
});

// 개인정보 활용 동의 모달
document.addEventListener("DOMContentLoaded", () => {
  const checkbox = document.getElementById("agree");
  const modal = document.getElementById("privacy-modal");
  const closeBtn = document.querySelector(".close-btn");

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


