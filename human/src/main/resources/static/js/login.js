// 회원가입 버튼 클릭 시 화면 전환
document.getElementById('signup-link').addEventListener('click', () => {
    document.getElementById('login-page').style.display = 'none';
    document.getElementById('signup-page').style.display = 'block';
});
//아이디/비밀번호 찾기 페이지 클릭시 화면 전환
document.getElementById('forgot-link').addEventListener('click', () => {
    document.getElementById('login-page').style.display = 'none';
    document.getElementById('forgot-page').style.display = 'block';
});
//비밀번호 찾기 페이지 클릭시 화면 전환
document.getElementById('forgot-pw-link').addEventListener('click', () => {
    document.getElementById('forgot-page').style.display = 'none';
    document.getElementById('forgot-pw-page').style.display = 'block';
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
        alert("회원가입 요청 처리 중 문제가 발생했습니다. 입력 정보를 확인한 후 다시 시도해 주세요.: " + error);
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
            alert("로그인에 성공하였습니다! 환영합니다.");
            window.location.href = "/mytodo";
        },
        error: function(xhr) {
            alert("로그인 요청 처리 중 문제가 발생했습니다. 입력 정보를 확인한 후 다시 시도해 주세요. "+xhr.responseText);
            window.location.href = "/login";
        }
    });
});


////id 중복체크
function fn_idCheck() {
    const e_id = $('#e_id').val();

    $.ajax({
        type: "GET",
        url: "/login/idCheck",
        data: { e_id: e_id },
        success: function(response) {
            alert(response);
        },
        error: function(xhr) {
            if (xhr.status === 409) {
                alert("이미 사용 중인 아이디입니다.");
            } else {
                alert(xhr.responseText);
            }
        }
    });
}

// 비밀번호 확인
$('#pw_confirm').on('blur', function() {
    const password = $('#e_pwd').val();  // 비밀번호
    const passwordConfirm = $('#pw_confirm').val();  // 비밀번호 확인

    // 비밀번호와 비밀번호 확인이 일치하지 않으면
    if (password !== passwordConfirm) {
        $('#pwdStatus')
            .text('비밀번호가 일치하지않습니다')
            .css('color', 'red')
            .css('font-weight', 'bold')
            .css('font-size', '14px');
    } else {
        $('#pwdStatus')
            .text('비밀번호가 일치합니다')
            .css('color', 'green')
            .css('font-weight', 'bold')
            .css('font-size', '14px');
    }
});

//아이디 찾기 기능
function findId(event) {
    event.preventDefault(); // 폼 제출 기본 동작 방지

    const e_name = document.getElementById("input_name").value;
    const e_email = document.getElementById("input_email").value;

    $.ajax({
        type: "POST",
        url: "/login/find-id",
        data: {
            e_name: e_name,
            e_email: e_email
        },
        success: function(response) {
            if (response.e_id) {
                alert("회원님의 아이디는 " + response.e_id + " 입니다.");
                // 로그인 페이지로 돌아가기
                document.getElementById('forgot-page').style.display = 'none';
                document.getElementById('login-page').style.display = 'block';
            }
        },
        error: function(xhr) {
            alert(xhr.responseText);
        }
    });
}

// 비밀번호 초기화 요청
function resetPassword(event) {
    event.preventDefault();

    const e_id = document.getElementById("reset_id").value;
    const e_email = document.getElementById("reset_email").value;

    $.ajax({
        type: "POST",
        url: "/login/reset-password",
        data: {
            e_id: e_id,
            e_email: e_email
        },
        success: function(response) {
            alert("임시 비밀번호가 이메일로 전송되었습니다. 이메일을 확인하세요.");//이메일 전송 성공 메세지 표시
            window.location.href = "/login";
        },
        error: function(xhr) {
            alert(xhr.responseText);
        }
    });
}