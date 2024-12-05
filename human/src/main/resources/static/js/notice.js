$(document).ready(function () {
    // 전체 데이터 로드 (GET 요청)
    noticeAllData();

    // 검색 버튼 클릭 이벤트
    $('#searchBtn').on('click', function () {
        const category = $('#category').val(); // 선택된 카테고리
        const query = $('#searchQuery').val().trim(); // 입력된 검색어

        if (!query) {
            alert("검색어를 입력하세요!");
            return; // 검색어가 없으면 요청 중단
        }

        const searchData = {
            category: category,
            query: query
        };

        // AJAX GET 요청
        $.ajax({
            type: 'GET',
            url: `/api/notice/search?category=${encodeURIComponent(category)}&query=${encodeURIComponent(query)}`, // 템플릿 리터럴로 URL 생성
            success: function (data) {
                renderTable(data); // 성공 시 테이블 렌더링
            },
            error: function (xhr) {
                alert("검색 요청에 실패했습니다!");
                console.error(xhr.responseText);
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
                <td>${notice.bid}</td> <!-- 서버에서 반환하는 필드 이름에 맞게 수정 -->
                <td>${notice.btitle}</td>
                <td>${notice.bcontent}</td>
                <td>${notice.bwriter}</td>
            </tr>
        `;
        noticeTable.append(row); // 테이블에 행 추가
    });
}
