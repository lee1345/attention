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

// 주소록 데이터 로드 함수
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

// 등록하기
$(document).ready(function () {
    // 등록 버튼 클릭 이벤트
    $('#registerForm').on('submit', function (e) {
        e.preventDefault(); // 기본 폼 제출 동작 방지

        const formData = {
            adName: $('#name').val(),
            adPhone: $('#phone').val(),
            adEmail: $('#email').val(),
            adDeptName: $('#department').val(),
            adGroup: $('#group').val()
        };

        $.ajax({
            type: 'POST',
            url: '/api/address/addressModal',
            contentType: 'application/json; charset=UTF-8',
            data: JSON.stringify(formData),
            success: function () {
                alert("등록 성공!");
                $('#registerModal').modal('hide'); // 모달 닫기
                addressAllData(); // 전체 데이터 다시 로드
            },
            error: function (xhr) {
                alert("등록 실패: " + xhr.responseText);
            }
        });
    });
});
