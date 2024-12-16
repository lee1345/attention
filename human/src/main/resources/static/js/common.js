const navigationLinks = {
  comMyTodo: "/mytodo", // 나의 할일 경로
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
    $('#comMyPage').on('click', function () {
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
            e_phone: $('#phone').val().trim(),
            e_email: $('#email').val().trim(),
            e_pwd: $('#password').val().trim()
        };

        $.ajax({
            type: 'POST',
            url: '/api/common/update',
            contentType: 'application/json; charset=UTF-8',
            data: JSON.stringify(formData),
            success: function () {
                alert('정보가 성공적으로 업데이트되었습니다!');
                $('#comPopupOverlay, #comPopup').fadeOut(); // 팝업 닫기
                location.reload(); // 페이지 새로고침
            },
            error: function () {
                alert('정보 업데이트 중 오류가 발생했습니다.');
            }
        });
    });
});









//=======================

// 주기적으로 서버에서 알림 데이터를 가져와 표시
function checkAlarms() {
    $.ajax({
        type: "GET",
        url: "/api/common/alarms",
        success: function (alarms) {
            if (alarms.length > 0) {
                // 종 아이콘을 빨간색으로 변경
                const bellIcon = document.getElementById("show-alarm-popup");
                bellIcon.style.color = "red";

                // 팝업에 알림 내용 표시
                const alarmTableBody = document.getElementById("comAlarm-table-body");
                alarmTableBody.innerHTML = ""; // 기존 알림 초기화
                alarms.forEach((alarm) => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${alarm.time}</td>
                        <td>${alarm.message}</td>
                        <td><button onclick="DeleteAlarm('${alarm.id}')">삭제</button></td>
                    `;
                    alarmTableBody.appendChild(row);
                });
            }
        },
        error: function () {
            console.error("알림 데이터를 가져오는 중 오류가 발생했습니다.");
        },
    });
}

// 10초마다 알림 확인
setInterval(checkAlarms, 2000);


//=======================================

// DOM이 로드된 후 이벤트 리스너 추가
document.addEventListener("DOMContentLoaded", function () {
    const bellIcon = document.getElementById("show-alarm-popup");
    if (bellIcon) {
        bellIcon.addEventListener("click", openAlarmPopup); // 팝업 열기 함수 연결
    } else {
        console.error("종 아이콘을 찾을 수 없습니다.");
    }
});

// 알림 팝업 열기 함수
function openAlarmPopup() {
    $.ajax({
        type: "GET",
        url: "/api/common/alarms",
        success: function (alarms) {
            const alarmTableBody = document.getElementById("comAlarm-table-body");
            alarmTableBody.innerHTML = ""; // 기존 알림 초기화

            if (alarms.length === 0) {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td colspan="3" style="text-align: center;">알림이 없습니다.</td>
                `;
                alarmTableBody.appendChild(row);
            } else {
                    alarms.forEach((alarm) => {
                        const row = document.createElement("tr");
                        row.innerHTML = `
                            <td style="text-align: center;">${alarm.time.replace(" ", "<br>")}</td>
                            <td>${alarm.message}</td>
                            <td>
                                <button class="comDelete-btn" onclick="deleteAlarm('${alarm.id}')">삭제</button>
                            </td>
                        `;
                        alarmTableBody.appendChild(row);
                    });

            }

            document.getElementById("comAlarm-popup").classList.remove("hidden");
        },
        error: function () {
            console.error("알림 데이터를 가져오는 중 오류가 발생했습니다.");
        },
    });
}


// 팝업 닫기
function closeAlarmPopup() {
    document.getElementById("comAlarm-popup").classList.add("hidden");
}

//=======================================
document.addEventListener("DOMContentLoaded", function () {
    const socket = new SockJS('/ws'); // 서버 엔드포인트와 일치하도록 설정
    const stompClient = Stomp.over(socket);

    stompClient.connect({}, function () {
        console.log('WebSocket 연결 성공');

        // 서버로부터 메시지를 구독
        stompClient.subscribe('/topic/alerts', function (message) {
            const alertMessage = message.body;
            alert(alertMessage); // 알림 표시
        });
    }, function (error) {
        console.error('WebSocket 연결 실패:', error);
    });

    stompClient.onclose = function () {
        console.error('WebSocket 연결 종료');
    };
});
