
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

//======================================================================================================

//// 날짜 포맷 변환 함수
//function formatDate(dateString) {
//    if (!dateString) {
//            return "날짜 없음"; // 기본 메시지
//    }
//
//    const parsedDate  = new Date(dateString);
//    if (isNaN(parsedDate )) {
//        return "유효하지 않은 날짜"; // 날짜 형식이 잘못된 경우
//    }
//
//    const date = new Date(dateString);
//    const year = date.getFullYear();
//    const month = String(date.getMonth() + 1).padStart(2, '0');
//    const day = String(date.getDate()).padStart(2, '0');
//    return `${year}-${month}-${day}`;
//}

//======================================================================================================

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
            <tr class="address-row" data-id="${address.adId}">
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

//======================================================================================================

// 등록 팝업창
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
            adName: $('#formName').val(),
            adPhone: $('#formPhone').val(),
            adEmail: $('#formEmail').val(),
            adDeptName: $('#formDept').val(),
            adGroup: $('#formGroup').val()
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

//======================================================================================================

// 테이블 데이터를 클릭하면 팝업 표시
$(document).on('click', '.address-row', function () {
    const addressId = $(this).data('id'); // 공지사항 ID 가져오기
    $('#popupOverlay, #addressPopup').fadeIn();

    // 팝업 닫기
    $('#closeAddressPopup').on('click', function () {
        $('#popupOverlay, #addressPopup').fadeOut();
    });

    // AJAX 요청으로 데이터 가져오기
    $.ajax({
        type: 'GET',
        url: `/api/address/${addressId}`,
        success: function (data) {
            $('#popupAddressName').text(data.adName);
            $('#popupAddressPhone').text(data.adPhone);
            $('#popupAddressEmail').text(data.adEmail);
            $('#popupAddressDeptName').text(data.adDeptName);
            $('#popupAddressGroup').text(data.adGroup);
            $('#AddressPopupOverlay, #AddressPopup').fadeIn();

            // 팝업에 ID 저장
            $('#addressPopup').data('id', addressId);
        },
        error: function () {
            alert('데이터를 가져오지 못했습니다.');
        }
    });
});

//======================================================================================================


$(document).ready(function () {
    // 수정 버튼 클릭
    $('#addressPopup .edit-btn').on('click', function () {
        // 현재 데이터를 <input>으로 변경
        $('#popupAddressName').html(`<input type="text" id="editName" value="${$('#popupAddressName').text()}">`);
        $('#popupAddressPhone').html(`<input type="text" id="editPhone" value="${$('#popupAddressPhone').text()}">`);
        $('#popupAddressEmail').html(`<input type="email" id="editEmail" value="${$('#popupAddressEmail').text()}">`);
        $('#popupAddressDeptName').html(`<input type="text" id="editDeptName" value="${$('#popupAddressDeptName').text()}">`);
        $('#popupAddressGroup').html(`<input type="text" id="editGroup" value="${$('#popupAddressGroup').text()}">`);

        // 수정/삭제 버튼 숨기고 저장/취소 버튼 추가
        $('.action-buttons').html(`
            <button class="edit-btn">저장</button>
            <button class="delete-btn">취소</button>
        `);

        // 저장 버튼 클릭
        $('.save-btn').on('click', function () {
            const addressId = $('#addressPopup').data('id'); // ID 가져오기
            const updatedData = {
                adId: addressId,
                adName: $('#editName').val(),
                adPhone: $('#editPhone').val(),
                adEmail: $('#editEmail').val(),
                adDeptName: $('#editDeptName').val(),
                adGroup: $('#editGroup').val()
            };

            // 데이터 업데이트 요청
            $.ajax({
                type: 'PUT',
                url: `/api/address/${addressId}`,
                contentType: 'application/json',
                data: JSON.stringify(updatedData),
                success: function () {
                    alert('수정 성공!');
                    $('#popupOverlay, #addressPopup').fadeOut();
                    addressAllData(); // 테이블 다시 로드
                },
                error: function (xhr) {
                    console.error('수정 실패:', xhr.responseText);
                    alert('수정 실패! 데이터를 확인해주세요.');
                }
            });
        });

        // 취소 버튼 클릭
        $('.cancel-btn').on('click', function () {
            // 원래 데이터로 되돌림
            $('#popupAddressName').html($('#editName').val());
            $('#popupAddressPhone').html($('#editPhone').val());
            $('#popupAddressEmail').html($('#editEmail').val());
            $('#popupAddressDeptName').html($('#editDeptName').val());
            $('#popupAddressGroup').html($('#editGroup').val());

            // 수정/삭제 버튼 복원
            $('.action-buttons').html(`
                <button class="edit-btn" data-id="${$('#addressPopup').data('id')}">수정</button>
                <button class="delete-btn" data-id="${$('#addressPopup').data('id')}">삭제</button>
            `);
        });
    });
});


//======================================================================================================

// 팝업 삭제 버튼 클릭
$('#addressPopup .delete-btn').on('click', function () {
    const addressId = $('#addressPopup').data('id'); // 팝업에 저장된 ID 가져오기
    console.log("삭제 버튼 클릭, ID:", addressId);

    if (!addressId) {
        alert("삭제할 데이터가 없습니다.");
        return;
    }

    if (confirm("정말 삭제하시겠습니까?")) {
        $.ajax({
            type: 'DELETE',
            url: `/api/address/${addressId}`,
            success: function () {
                alert('삭제 성공!');
                $('#popupOverlay, #addressPopup').fadeOut(); // 팝업 닫기
                addressAllData(); // 데이터 다시 로드
            },
            error: function (xhr) {
                console.error('삭제 요청 실패:', xhr.responseText);
                alert('삭제 실패! 데이터를 확인해주세요.');
            }
        });
    }
});
