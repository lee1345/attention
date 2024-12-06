document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendar');

    // 샘플 일정 데이터
    var sampleEvents = [
      {
        id: '1',
        title: '개인 일정 1',
        start: '2024-11-03',
        end: '2024-11-04',
        description: '개인 일정 설명입니다.',
        extendedProps: { type: 'M' } // M: 내 일정
      },
      {
        id: '2',
        title: '팀 프로젝트 준비',
        start: '2024-11-07 10:00',
        end: '2024-11-09 10:00',
        description: '팀 발표 준비를 위한 일정입니다.',
        extendedProps: { type: 'T' } // T: 팀 일정
      },
      {
        id: '3',
        title: '개인 일정 2',
        start: '2024-11-10',
        description: '또 다른 개인 일정입니다.',
        extendedProps: { type: 'M' }
      },
      {
        id: '4',
        title: '팀 워크샵',
        start: '2024-11-15',
        description: '팀 워크샵 일정입니다.',
        extendedProps: { type: 'T' }
      }
    ];

    var calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',

      headerToolbar: {
        left: 'prev,next', // 왼쪽에 아무것도 배치하지 않음
        center: 'title', // 중앙에 prev, title, next 배치
        right: 'today' // 오른쪽에 아무것도 배치하지 않음
      },

      events: sampleEvents.map(event => {
        // T: 팀 일정은 녹색, M: 내 일정은 파란색
        if (event.extendedProps.type === 'T') {
          event.color = 'green';
        } else if (event.extendedProps.type === 'M') {
          event.color = 'blue';
        }
        return event;
      }),

      eventClick: function (info) {
        // 모달창에 데이터 표시
        document.getElementById('modal-title').innerText = info.event.title;
        document.getElementById('modal-body').innerText =
          info.event.extendedProps.description || '설명 없음';

        // 모달 열기
        var modalEl = document.getElementById('eventModal');
        var modal = new bootstrap.Modal(modalEl);
        modal.show();
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
      filterEvents('M'); // 내 일정 보기
    });

    document.getElementById('filter-team-events').addEventListener('click', function () {
      filterEvents('T'); // 팀 일정 보기
    });

    document.getElementById('filter-all-events').addEventListener('click', function () {
      filterEvents(null); // 모든 일정 보기
    });

    function filterEvents(type) {
      // 기존 일정 제거
      const allEvents = calendar.getEvents();
      allEvents.forEach(event => event.remove());

      // 일정 필터링 후 다시 추가
      sampleEvents.forEach(event => {
        if (!type || event.extendedProps.type === type) {
          calendar.addEvent(event);
        }
      });
    }
  });