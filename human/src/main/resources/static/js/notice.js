$(document).ready(function () {
    // 전체 데이터 로드 (GET)
    noticeAllData();

    // 엔터 키를 누르면 검색 버튼 클릭
    $('#searchQuery').on('keypress', function (event) {
        if (event.key === 'Enter') { // 엔터 키 감지
            event.preventDefault(); // 기본 동작 방지 (폼 제출 방지)
            $('#searchBtn').click(); // 검색 버튼 클릭 이벤트 실행
        }
    });

    // 검색 버튼 클릭 이벤트
    $('#searchBtn').on('click', function () {
        const category = $('#category').val(); // 선택된 카테고리
        const query = $('#searchQuery').val().trim(); // 입력된 검색어

        if (!query) {
            alert("검색어를 입력하세요!");
            return;
        }

        const searchData = {
            category: category,
            query: query
        };

        // AJAX POST 요청
        $.ajax({
            type: 'POST',
            url: '/api/notice/search',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            data: {
                   category: $('#category').val(),
                   query: $('#searchQuery').val().trim()
            },
            success: function (data) {
            console.log("AJAX Success Data:", data); // 성공 데이터 확인
            renderTable(data);
            },
            error: function (xhr) {
                   alert("검색어를 확인해주세요 !");
            }
        });
    });
});

// 공지사항 전체 데이터 로드 함수
function noticeAllData() {
    $.ajax({
        type: 'GET',
        url: '/api/notice', // 전체 데이터를 가져오는 URL
        success: function (data) {
            renderTable(data); // 성공 시 테이블 렌더링
        },
        error: function (xhr) {
            console.error("데이터 요청 실패:", xhr.responseText);
        }
    });
}

// 테이블 렌더링 함수
function renderTable(data) {
    const noticeTable = $('#noticeTable');
    noticeTable.empty(); // 기존 테이블 내용 초기화

    if (!data || data.length === 0) {
        // 데이터가 없을 경우 메시지 출력
        noticeTable.append(`<tr><td colspan="4" style="text-align: center;">데이터가 없습니다.</td></tr>`);
        return;
    }

// 날짜 포맷 변환 함수
    function formatDate(dateString) {
        const date = new Date(dateString); // ISO 형식 문자열을 Date 객체로 변환
        const year = date.getFullYear(); // 연도
        const month = String(date.getMonth() + 1).padStart(2, '0'); // 월 (0부터 시작하므로 +1)
        const day = String(date.getDate()).padStart(2, '0'); // 일
        return `${year}-${month}-${day}`; // "YYYY-MM-DD" 형식 반환
    }

    // 데이터를 반복하며 테이블 행 생성
    data.forEach(notice => {
        const formattedDate = formatDate(notice.b_CreatedDate); // 날짜 변환
        const row = `
            <tr>
                <td>${notice.b_Id}</td>
                <td>${notice.b_Title}</td>
                <td>${notice.b_Content}</td>
                <td>${notice.b_Writer}</td>
                <td>${formattedDate}</td> <!-- 변환된 날짜 사용 -->
            </tr>
        `;
        noticeTable.append(row);
    });
}

// 팝업창
$(document).ready(function () {
    $('.btn-register').on('click', function () {
        $('#popupOverlay, #popup').fadeIn();
    });

    // 팝업 닫기
    $('#closePopup, #popupOverlay').on('click', function () {
        $('#popupOverlay, #popup').fadeOut();
    });

    // 폼 제출
    $('#registerForm').on('submit', function (event) {
       event.preventDefault();
       const formData = $(this).serialize();

    $.ajax({
       type: 'POST',
       url: '/api/notice/register',
       data: formData,
       success: function () {
                 alert('등록 성공!');
       $('#popupOverlay, #popup').fadeOut();
           addressAllData();
       },
       error: function () {
              alert('등록 실패!');
           }
       });
   });
});


// 주소록 등록하기
$('#registerForm').on('submit', function (event) {
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
        url: '/api/notice/register',
        contentType: 'application/json', // JSON 타입으로 전송
        data: JSON.stringify(formData), // JSON 데이터로 변환
        success: function () {
            alert('등록 성공!');
            $('#popupOverlay, #popup').fadeOut(); // 팝업 닫기
            addressAllData(); // 데이터 다시 로드
        },
        error: function () {
            alert('등록 실패!');
        }
    });
});
