$(document).ready(function () {
    // 전체 데이터 로드 (GET)
    addressAllData();

    // 검색 버튼 클릭 이벤트
    $('#searchBtn').on('click', function () {
        const category = $('#category').val();
        const query = $('#searchQuery').val().trim();

        // 디버깅 로그로 요청 데이터 확인
        console.log("AJAX Request - Category:", category, "Query:", query);

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



$(document).ready(function () {

    // 등록하기 버튼 클릭 이벤트
    $('.btn-register').on('click', function () {
        event.preventDefault()

        // Ajax로 모달 HTML 가져오기
        $.ajax({
            url: '/address/addressModal', // 컨트롤러에서 반환하는 JSP 경로
            method: 'GET',
            success: function (data) {
                // 동적으로 모달 HTML 추가
                if ($('#registerModal').length === 0) {
                    $('body').append(data); // 가져온 HTML을 body에 추가
                }

                // Bootstrap 모달 띄우기
                $('#registerModal').modal('show');

                // 모달 닫힐 때 HTML 제거
                $('#registerModal').on('hidden.bs.modal', function () {
                    $(this).remove(); // 모달 DOM 삭제
                });
            },
            error: function (xhr) {
                alert('모달 로드 실패: ' + xhr.statusText);
            }
        });
    });
});
