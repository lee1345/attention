document.addEventListener('DOMContentLoaded', function () {
    // 데이터 로드
    loadAddressData();

    // 검색 버튼 클릭 이벤트
    document.getElementById('searchBtn').addEventListener('click', function () {
        const category = document.getElementById('category').value;
        const query = document.getElementById('searchQuery').value.trim();

        if (!query) {
            alert("검색어를 입력하세요!");
            return;
        }

        searchAddressData(category, query);
    });
});

// 주소 데이터 로드
function loadAddressData() {
    $.ajax({
        url: '/api/address',
        type: 'GET',
        success: function (data) {
            renderTable(data);
        },
        error: function (xhr) {
            console.error("데이터 로드 실패:", xhr.responseText);
        }
    });
}

// 검색 데이터 로드
function searchAddressData(category, query) {
    $.ajax({
        url: `/api/address/search?category=${category}&query=${query}`,
        type: 'GET',
        success: function (data) {
            renderTable(data);
        },
        error: function (xhr) {
            console.error("검색 실패:", xhr.responseText);
        }
    });
}

// 테이블 렌더링
function renderTable(data) {
    const tableBody = document.getElementById('addressTableBody');
    tableBody.innerHTML = ''; // 기존 내용 초기화

    if (data.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="6" style="text-align: center;">데이터가 없습니다.</td></tr>`;
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
        tableBody.insertAdjacentHTML('beforeend', row);
    });
}
