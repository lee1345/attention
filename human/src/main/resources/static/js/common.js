// 경로 설정:
const navigationLinks = {
  login: "/login", // 로그인 경로
  signup: "/signup", // 회원가입 경로
  todo: "/todo", // 팀별 할일 경로
  mytodo: "/mytodo", // 나의 할일 경로
  schedule: "/schedule", // 일정관리 경로
  notice: "/notice", // 공지사항 경로
  freeBoard: "/freeBoard", // 자유게시판 경로
  address: "/address", // 주소록 경로
};

// 링크 설정 함수
function setupNavigation() {
  // navigationLinks 객체의 각 항목을 순회하면서 동적으로 href 설정
  Object.keys(navigationLinks).forEach((key) => {
    const linkElement = document.getElementById(key); // 해당 id를 가진 요소 찾기
    if (linkElement && !linkElement.href) {
      linkElement.href = navigationLinks[key];
    }
  });
}

// DOM이 로드된 후 링크 설정
document.addEventListener("DOMContentLoaded", setupNavigation);

// ====================================================================

// 팝업창
$(document).ready(function () {
    // 팝업 열기
    $('#mypage').on('click', function () {
        $('#comPopupOverlay, #comPopup').fadeIn();
    });

    // 팝업 닫기
    $('#comClosePopup').on('click', function () {
        $('#comPopupOverlay, #comPopup').fadeOut();
        $('#comRegisterForm')[0].reset(); // 💡 폼 데이터 초기화
    });

    // 폼 제출
    $('#comRegisterForm').on('submit', function (event) {
        event.preventDefault(); // 기본 폼 제출 방지

        const formData = {
            adName: $('#name').val(),
            adPhone: $('#phone').val(),
            adEmail: $('#email').val(),
            adDeptName: $('#dept').val(),
            adGroup: $('#group').val()
        };

        $.ajax({
            type: 'POST',
            url: '/api/common/register',
            contentType: 'application/json; charset=UTF-8',
            data: JSON.stringify(formData), // JSON 데이터로 변환
            success: function () {
                alert('등록 성공!');
                $('#comPopupOverlay, #comPopup').fadeOut(); // 팝업 닫기
                addressAllData(); // 데이터 다시 로드
            },
            error: function () {
                alert('등록 실패!');
            }
        });
    });
});
