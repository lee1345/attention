$(document).ready(function () {
    // 전체 데이터 로드 (GET)
    freeBoardAllData();

    // 검색 버튼 클릭 이벤트
    $('#searchBtn').on('click', function () {
        const category = $('#category').val();
        const query = $('#searchQuery').val().trim();

        if (!query) {
            alert("검색어를 입력하세요 !");
            return;
        }

        const searchData = {
            category: category,
            query: query
        };

        $.ajax({
            type: 'POST',
            url: '/api/freeBoard/search',
            contentType: 'application/json; charset=UTF-8',
            data: JSON.stringify(searchData),
            success: function (data) {
                renderTable(data);
            },
            error: function (xhr) {
                alert("검색어를 확인해주세요 !");
            }
        });
    });
});

// 공지사항 데이터 로드 함수
function freeBoardAllData() {
    $.ajax({
        type: 'GET',
        url: '/api/freeBoard',
        success: function (data) {
            renderTable(data);
        },
        error: function (xhr) {
            console.error("데이터 요청 실패:", xhr.responseText);
        }
    });
}

// 테이블 렌더링 함수
function renderTable(data) {
    const freeBoardTable = $('#freeBoardTable');
    freeBoardTable.empty(); // 기존 내용 초기화

    if (data.length === 0) {
        freeBoardTable.append(`<tr><td colspan="6" style="text-align: center;">데이터가 없습니다.</td></tr>`);
        return;
    }

    data.forEach(freeBoard => {
        const row = `
            <tr>
                <td>${freeBoard.bid}</td>
                <td>${freeBoard.btitle}</td>
                <td>${freeBoard.bcontent}</td>
                <td>${freeBoard.bwriter}</td>
            </tr>
        `;
        freeBoardTable.append(row);
    });
}
