document.addEventListener("DOMContentLoaded", function () {
    // 팝업 열기
    $('#show-alarm-popup').on('click', function () {
        loadAlarmHistory();
        $('#alarm-popup').removeClass('hidden'); // 팝업 표시
    });

    // 팝업 닫기
    window.closeAlarmPopup = function () {
        $('#alarm-popup').addClass('hidden'); // 팝업 숨김
    };

    // 알림 기록 조회
    function loadAlarmHistory() {
        $.ajax({
            url: '/api/common/alarm/history',
            method: 'GET',
            success: function (data) {
                const tbody = $('#alarm-table-body');
                tbody.empty(); // 기존 데이터 초기화

                data.forEach((alarm) => {
                    const row = `
                        <tr>
                            <td>${alarm.alTime}</td>
                            <td>${alarm.alCycle === '30MIN' ? alarm.tTitle + ' 30분 전' : alarm.tTitle + ' 정각'}</td>
                            <td>
                                <button class="delete-btn" data-id="${alarm.alId}">삭제</button>
                            </td>
                        </tr>`;
                    tbody.append(row);
                });

                // 삭제 버튼 이벤트 바인딩
                $('.delete-btn').on('click', function () {
                    const alarmId = $(this).data('id');
                    deleteAlarm(alarmId);
                });
            },
            error: function (error) {
                console.error('알림 기록 조회 실패:', error);
            },
        });
    }
document.addEventListener("DOMContentLoaded", function () {
    setInterval(fetchPendingAlarms, 60 * 1000);

    function fetchPendingAlarms() {
        $.ajax({
            url: '/api/common/alarm/pending',
            method: 'GET',
            success: function (data) {
                data.forEach((alarm) => {
                    showAlert(alarm);
                });
            },
            error: function () {
                console.error("알람 조회 실패");
            },
        });
    }

    function showAlert(alarm) {
        alert(`${alarm.tTitle}: ${alarm.alCycle === "30MIN" ? "30분 전" : "정각"}`);
    }
});
});

// 알림 데이터를 주기적으로 가져오는 함수
function fetchAlerts() {
    $.ajax({
        url: '/common/alarms', // 알림 API 호출
        method: 'GET',
        success: function (data) {
            if (data && data.length > 0) {
                data.forEach(alertMessage => {
                    alert(alertMessage); // 알림 표시
                });
            }
        },
        error: function (error) {
            console.error('알림 데이터를 가져오는데 실패했습니다:', error);
        }
    });
}

// 페이지 로드 시 알림 확인 및 주기적인 알림 호출 설정
$(document).ready(function () {
    setInterval(fetchAlerts, 60000); // 1분마다 알림 확인
    fetchAlerts(); // 페이지 로드 시 한 번 호출
});
