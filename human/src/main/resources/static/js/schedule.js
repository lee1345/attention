document.addEventListener('DOMContentLoaded', function () {
  var calendarEl = document.getElementById('calendar');

  // 서버에서 일정 데이터 가져오기 (AJAX 사용)
  $.ajax({
    type: 'GET',  // 요청 방식 (GET)
    url: '/api/schedule',  // 서버 요청 URL
    success: function (data) {
      console.log('AJAX 응답 데이터:', data);

      // 응답 데이터가 없거나 잘못된 경우를 처리
      if (!data || !Array.isArray(data)) {
        console.error('응답 데이터가 배열이 아니거나 비어 있습니다:', data);
        data = []; // 빈 배열로 초기화
      }

      // 서버에서 가져온 데이터를 FullCalendar의 events 형식으로 변환
      var events = data.map(event => ({
        title: event.t_title,
        start: `${event.t_start_date}T${event.t_start_time || '00:00'}`,
        end: `${event.t_end_date}T${event.t_end_time || '23:59'}`,
        description: event.t_content,
        color: event.t_stage === 'T' ? 'green' : 'blue', // T: 팀 일정 (녹색), M: 개인 일정 (파란색)
        extendedProps: { type: event.t_stage }
      }));

      // FullCalendar 생성
      var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        locale: 'ko',
        headerToolbar: {
          left: '', // 왼쪽에 아무것도 배치하지 않음
          center: 'prev title next', // 중앙에 prev, title, next 배치
          right: 'today'
        },
        buttonText: {
          today: '오늘로 이동하기'
        },
        events: events, // 서버에서 가져온 일정 데이터 추가

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
        filterEvents('M'); // 개인 일정만 보기
        this.classList.add('active');
      });

      document.getElementById('filter-team-events').addEventListener('click', function () {
        filterEvents('T'); // 팀 일정만 보기
        this.classList.add('active');
      });

      document.getElementById('filter-all-events').addEventListener('click', function () {
        filterEvents(null); // 모든 일정 보기
        this.classList.add('active');
      });

      // 일정 필터링 함수
      function filterEvents(type) {
        // 기존 일정 제거
        const allEvents = calendar.getEvents();
        allEvents.forEach(event => event.remove());

        // 필터링된 일정만 추가
        events.forEach(event => {
          if (!type || event.extendedProps.type === type) {
            calendar.addEvent(event);
          }
        });
      }

      const leftButtons = document.querySelectorAll('.left-buttons .btn');

      // 각 버튼에 클릭 이벤트 추가
      leftButtons.forEach((button) => {
        button.addEventListener('click', function () {
          // 기존 활성화된 버튼에서 active 클래스 제거
          leftButtons.forEach((btn) => {
            btn.classList.remove('active');
          });

          // 현재 클릭된 버튼에 active 클래스 추가
          this.classList.add('active');
        });
      });

      const rightButtons = document.querySelectorAll('.right-buttons .btn');

      // 각 버튼에 클릭 이벤트 추가
      rightButtons.forEach((button) => {
        button.addEventListener('click', function () {
          // 기존 활성화된 버튼에서 active 클래스 제거
          rightButtons.forEach((btn) => {
            btn.classList.remove('active');
          });

          // 현재 클릭된 버튼에 active 클래스 추가
          this.classList.add('active');
        });
      });
    },
    error: function (error) {
      console.error('AJAX 오류:', error);
    }
  });
});
