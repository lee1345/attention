$(document).ready(function () {
    // 전체 데이터 로드 (GET)
    noticeAllData();

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

        // AJAX GET 요청
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

    // 데이터를 반복하며 테이블 행 생성
    data.forEach(notice => {
        const row = `
            <tr>
                <td>${notice.bid}</td>
                <td>${notice.btitle}</td>
                <td>${notice.bcontent}</td>
                <td>${notice.bwriter}</td>
                <td>${notice.bcreatedDate}</td>
            </tr>
        `;
        noticeTable.append(row);
    });
}
