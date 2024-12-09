document.addEventListener('DOMContentLoaded', function () {
    const calendarEl = document.getElementById('calendar');

    // 팝업 요소 참조
    const popup = document.getElementById('popup');
    const popupTitle = document.getElementById('popup-title');
    const popupPriority = document.getElementById('popup-priority');
    const popupStage = document.getElementById('popup-stage');
    const popupStartDate = document.getElementById('popup-startDate');
    const popupEndDate = document.getElementById('popup-endDate');
    const popupDescription = document.getElementById('popup-description');
    const closePopupButton = document.getElementById('close-Popup');

    // 닫기 버튼 클릭 이벤트
    closePopupButton.addEventListener('click', function () {
        popup.classList.add('hidden');
    });

    // 서버에서 일정 데이터 가져오기
    $.ajax({
        type: 'GET',
        url: '/api/schedule',
        success: function (data) {
            console.log('AJAX 응답 데이터:', data);

            // 이벤트 데이터 매핑
            const events = data.map(event => ({
                title: event.t_title || '제목 없음',
                start: event.t_start_date.replace(' ', 'T'),
                end: event.t_end_date ? event.t_end_date.replace(' ', 'T') : null,
                description: event.t_content || '설명 없음',
                color: getColorByGroup(event.t_group),
                extendedProps: {
                    priority: transferPriority(event.t_priority) || 'N/A',
                    stage: transferStage(event.t_stage) || '미정',
                    group: event.t_group || '기타',
                    startDate: event.t_start_date,
                    endDate: event.t_end_date,
                }
            }));

            // FullCalendar 생성
            const calendar = new FullCalendar.Calendar(calendarEl, {
                initialView: 'dayGridMonth',
                locale: 'ko',
                headerToolbar: {
                  left: '',
                  center: 'prev title next',
                  right: 'today'
                },
                buttonText: {
                  today: '오늘로 이동하기'
                },
                events: events,
                eventClick: function (info) {
                    // 팝업 내용 설정
                    popupTitle.innerText = info.event.title;
                    popupPriority.innerText = info.event.extendedProps.priority;
                    popupStage.innerText = info.event.extendedProps.stage;
                    popupStartDate.innerText = info.event.extendedProps.startDate;
                    popupEndDate.innerText = info.event.extendedProps.endDate || '없음';
                    popupDescription.innerText = info.event.extendedProps.description;

                    // 팝업 표시
                    popup.classList.remove('hidden');
                }
            });

            calendar.render();

            // 뷰 변경 버튼 동작
            document.getElementById('view-month').addEventListener('click', function () {
                calendar.changeView('dayGridMonth');
            });

            document.getElementById('view-week').addEventListener('click', function () {
                calendar.changeView('timeGridWeek');
            });

            document.getElementById('view-day').addEventListener('click', function () {
                calendar.changeView('timeGridDay');
            });

            // 필터 버튼 동작
            document.getElementById('filter-my-events').addEventListener('click', function () {
                filterEvents('M'); // 개인 일정만 보기
                activateButton(this);
            });

            document.getElementById('filter-team-events').addEventListener('click', function () {
                filterEvents('T'); // 팀 일정만 보기
                activateButton(this);
            });

            document.getElementById('filter-all-events').addEventListener('click', function () {
                filterEvents(null); // 모든 일정 보기
                activateButton(this);
            });

            // 일정 필터링 함수
            function filterEvents(groupType) {
                // 기존 일정 제거
                const allEvents = calendar.getEvents();
                allEvents.forEach(event => event.remove());

                // 필터링된 일정만 추가
                const filteredEvents = events.filter(event => {
                    return !groupType || event.extendedProps.group === groupType;
                });

                filteredEvents.forEach(event => calendar.addEvent(event));
            }

            // 활성화 버튼 스타일 변경 함수
            function activateButton(button) {
                const buttons = document.querySelectorAll('.left-buttons .btn');
                buttons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            }
        },
        error: function (error) {
            console.error('AJAX 오류:', error);
        }
    });

    // t_group에 따른 색상 결정
    function getColorByGroup(group) {
        return group === 'T' ? '#28a745' : '#007bff';
    }

    // 중요도 변환 함수
    function transferPriority(priority) {
        switch (priority) {
            case 'VU': return '매우 긴급';
            case 'U': return '긴급';
            case 'N': return '보통';
            case 'NU': return '천천히';
            default: return '알 수 없음';
        }
    }

    // 진행 단계 변환 함수
    function transferStage(stage) {
        switch (stage) {
            case 'P': return '예정';
            case 'PD': return '진행지연';
            case 'IP': return '진행중';
            case 'CD': return '완료지연';
            case 'C': return '완료';
            default: return '알 수 없음';
        }
    }
});
