$(document).ready(function () {
    // 초기 데이터 로드
    NoticeAllData();

    // 검색 버튼 클릭 이벤트
    $('#btnSearch').on('click', function () {
        const category = $('#category').val();
        const query = $('#searchQuery').val().trim();

        if (!query) {
            alert("검색어를 입력하세요!");
            return;
        }

         // 검색 데이터 로드
         searchNoticeData(category, query);
    });
});

// 공지사항 데이터 로드
function NoticeAllData() {
    $.ajax({
        type: 'GET',
        url: '/api/notice',
        success: function (data) {
            renderNoticeTable(data);
        },
        error: function (xhr) {
              console.error("데이터 요청 실패:", xhr.responseText);
        }
    });
}

// 검색 데이터 로드
function searchNoticeData(category, query) {
    $.ajax({
        type: 'GET', // GET 요청으로 변경
        url: `/api/notice/search?category=${category}&query=${query}`, // URL에 파라미터 추가
        success: function (data) {
            renderNoticeTable(data);
        },
        error: function (xhr) {
            console.error("검색 실패:", xhr.responseText);
        }
    });
}

// 테이블 렌더링
function renderNoticeTable(data) {
    const noticeTable = $('#noticeTable');
    noticeTable.empty(); // 기존 내용 초기화

    if (data.length === 0) {
        noticeTable.append(`<tr><td colspan="6" style="text-align: center;">데이터가 없습니다.</td></tr>`);
        return;
    }

    data.forEach(notice => {
        const row = `
            <tr>
                <td>${notice.bId}</td>
                <td>${notice.bTitle}</td>
                <td>${notice.bContent}</td>
                <td>${notice.bWriter}</td>
                <td>${notice.bGroup}</td>
                <td>${notice.bCategory}</td>
            </tr>
        `;
        noticeTable.append(row);
    });

}
