$(document).ready(function () {
    // 전체 데이터 로드 (GET)
    addressAllData();

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
            url: '/api/address/search',
            contentType: 'application/json; charset=UTF-8',
            data: JSON.stringify(searchData),
            success: function (data)    {
                     renderTable(data);
            },
            error: function (xhr) {
                alert("검색어를 확인해주세요 !");
            }
        });
    });
});

// 전체 데이터 로드 함수
function addressAllData() {
    $.ajax({
        type: 'GET',
        url: '/api/address',
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
    const addressTable = $('#addressTable');
    addressTable.empty(); // 기존 내용 초기화

    if (data.length === 0) {
        addressTable.append(`<tr><td colspan="6" style="text-align: center;">데이터가 없습니다.</td></tr>`);
        return;
    }

    data.forEach(address => {
        const row = `
            <tr>
                <td>${address.adId}</td>
                <td>${address.adName}</td>
                <td>${address.adPhone}</td>
                <td>${address.adEmail}</td>
                <td>${address.adDeptName}</td>
                <td>${address.adGroup}</td>
            </tr>
        `;
        addressTable.append(row);
    });
}
