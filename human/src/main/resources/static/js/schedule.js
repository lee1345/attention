document.addEventListener('DOMContentLoaded', function () {
  var calendarEl = document.getElementById('calendar');

  // 서버에서 일정 데이터 가져오기 (AJAX 사용)
  $.ajax({
    type: 'GET',
    url: '/api/schedule',
    success: function (data) {
      console.log('AJAX 응답 데이터:', data);

      // 서버에서 가져온 데이터를 FullCalendar의 events 형식으로 변환
      var events = data.map(event => {
        // 날짜 형식 검증 및 변환
        let startDate = event.t_start_date ? event.t_start_date.replace(' ', 'T') : null;
        let endDate = event.t_end_date ? event.t_end_date.replace(' ', 'T') : null;

        // 종료 날짜가 시작 날짜와 동일하다면 null로 설정 (종일 일정 처리)
        if (startDate === endDate) {
          endDate = null;
        }

        // 기본 값 처리
        return {
          title: event.t_title || '제목 없음', // 제목이 없으면 기본값 설정
          start: startDate,
          end: endDate,
          description: event.t_content || '설명 없음', // 설명이 없으면 기본값 설정
          color: getColorByGroup(event.t_group), // t_group에 따른 색상 설정
          extendedProps: {
            stage: event.t_stage || '미정', // 단계가 없으면 기본값 설정
            priority: event.t_priority || 'N/A', // 우선순위 기본값
            group: event.t_group || '기타' // 그룹 기본값
          }
        };
      });


      console.log('FullCalendar 이벤트 데이터:', events);

      // FullCalendar 생성
      var calendar = new FullCalendar.Calendar(calendarEl, {
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
        events: events, // FullCalendar에 변환된 이벤트 데이터 추가

        eventClick: function (info) {
          // 모달창에 데이터 표시
          document.getElementById('modal-title').innerText = info.event.title;
          document.getElementById('modal-body').innerText =
            info.event.extendedProps.description || '설명 없음';

          // 모달 열기
          var modalEl = document.getElementById('eventModal');
          var modal = new bootstrap.Modal(modalEl);
          modal.show();
        },

        // 이벤트 추가 시 로그 확인
        eventAdd: function(info) {
          console.log('Event 추가됨:', info.event);
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
          if (!type || event.extendedProps.group === type) {
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

  // 그룹(t_group)에 따른 색상 결정 함수
  function getColorByGroup(group) {
    switch (group) {
      case 'T': return '#28a745';  // 팀 일정
      case 'M': return '#007bff';   // 개인 일정
    }
  }
});
