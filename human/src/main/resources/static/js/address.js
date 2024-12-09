
// 주소록 전체 데이터 로드 함수
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

//========================================================

$(document).ready(function () {
    // 전체 데이터 로드 (GET)
    addressAllData();

    // 엔터 키를 누르면 검색 버튼 클릭
    $('#query').on('keypress', function (event) {
        if (event.key === 'Enter') { // 엔터 키 감지
            event.preventDefault(); // 기본 동작 방지 (폼 제출 방지)
            $('#searchBtn').click(); // 검색 버튼 클릭 이벤트 실행
        }
    });

    // 검색 버튼 클릭 이벤트
    $('#searchBtn').on('click', function () {
        const category = $('#category').val();
        const query = $('#query').val().trim();

        if (!query) {
            alert("검색어를 입력하세요 !");
            return;
        }

        // 검색어 AJAX POST 요청
        $.ajax({
            type: 'POST',
            url: '/api/address/search',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            data: {
                category: category,
                query: query
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


// 팝업창
$(document).ready(function () {
    // 팝업 열기
    $('.btn-register').on('click', function () {
        $('#popupOverlay, #popup').fadeIn();
    });

    // 팝업 닫기
    $('#closePopup').on('click', function () {
        $('#popupOverlay, #popup').fadeOut();
        $('#registerForm')[0].reset(); // 💡 폼 데이터 초기화
    });

    // 폼 제출
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
            url: '/api/address/register',
            contentType: 'application/json; charset=UTF-8',
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
});
