// 주소록 전체 데이터 로드 함수
function addressAllData() {
    $.ajax({
        type: 'GET',
        url: '/api/address',
        success: function (data) {
            renderTable(data);
        },
        error: function (xhr) {
            Swal.fire({
                icon: 'error',
                title: '데이터 요청 실패',
                text: xhr.responseText || '서버와의 연결에 문제가 발생했습니다.',
            });
        }
    });
}

//======================================================================================================

// 테이블 렌더링 함수
function renderTable(data) {
    console.log("렌더링 데이터: ", data); // 디버깅 로그 추가
    const addressTable = $('#addressTable');
    addressTable.empty(); // 기존 내용 초기화

    if (data.length === 0) {
        addressTable.append(`<tr><td colspan="6" style="text-align: center;">데이터가 없습니다.</td></tr>`);
        return;
    }

    data.forEach(address => {
        const row = `
            <tr class="address-row" data-id="${address.adId}">
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

//======================================================================================================

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
            Swal.fire({
                icon: 'warning',
                title: '검색 오류',
                text: '검색어를 입력하세요!',
            });
            return;
        }

        // 디버깅: 입력값 확인
        console.log("검색 요청 카테고리: ", category);
        console.log("검색 요청 쿼리: ", query);

        // 검색어 AJAX POST 요청
        $.ajax({
            type: 'POST',
            url: '/api/address/search',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            data: {
                category: category,
                query: query,
            },
            success: function (data) {
                console.log("검색 결과 데이터: ", data); // 성공 데이터 확인
                renderTable(data);
            },
            error: function (xhr) {
                Swal.fire({
                    icon: 'error',
                    title: '검색 실패',
                    text: xhr.responseText || '검색어를 확인해주세요!',
                });
            }
        });
    });

    //======================================================================================================

    // 등록 팝업창
    $('.btn-register').on('click', function () {
        $('#popupOverlay, #popup').fadeIn();
        $('#registerForm')[0].reset();
    });

    // 팝업 닫기
    $('#closePopup').on('click', function () {
        $('#popupOverlay, #popup').fadeOut();
        $('#registerForm')[0].reset(); // 폼 데이터 초기화
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
                Swal.fire({
                    icon: 'success',
                    title: '등록 성공',
                    text: '주소록 등록이 완료되었습니다!',
                });
                $('#popupOverlay, #popup').fadeOut(); // 팝업 닫기
                $('#registerForm')[0].reset();
                addressAllData(); // 데이터 다시 로드
            },
            error: function () {
                Swal.fire({
                    icon: 'error',
                    title: '등록 실패',
                    text: '주소록 등록 요청 처리 중 문제가 발생했습니다. 입력 정보를 확인한 후 다시 시도해 주세요.',
                });
            }
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
            $('#editForm')[0].reset(); // 폼 데이터 초기화
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
                Swal.fire({
                    icon: 'error',
                    title: '데이터 로드 실패',
                    text: '데이터를 가져오지 못했습니다.',
                });
            }
        });
    });

    //======================================================================================================

    // 팝업 삭제 버튼 클릭
    $('#addressPopup .delete-btn').on('click', function () {
        const addressId = $('#addressPopup').data('id'); // 팝업에 저장된 ID 가져오기

        if (!addressId) {
            Swal.fire({
                icon: 'warning',
                title: '삭제 오류',
                text: '삭제할 데이터가 없습니다.',
            });
            return;
        }

        Swal.fire({
            icon: 'warning',
            title: '삭제 확인',
            text: '주소록을 삭제하시겠습니까?',
            showCancelButton: true,
            confirmButtonText: '삭제',
            cancelButtonText: '취소',
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    type: 'DELETE',
                    url: `/api/address/${addressId}`,
                    success: function () {
                        Swal.fire({
                            icon: 'success',
                            title: '삭제 성공',
                            text: '주소록 삭제가 완료되었습니다.',
                        });
                        $('#popupOverlay, #addressPopup').fadeOut(); // 팝업 닫기
                        addressAllData(); // 데이터 다시 로드
                    },
                    error: function (xhr) {
                        Swal.fire({
                            icon: 'error',
                            title: '삭제 실패',
                            text: xhr.responseText || '삭제 요청 처리 중 문제가 발생했습니다.',
                        });
                    }
                });
            }
        });
    });

    //======================================================================================================

    // 제목 클릭 정렬
    let sortOrder = 'ASC'; // 기본 정렬 순서 (오름차순)

     // 테이블 헤더 더블 클릭 이벤트
        $('.address-table th').on('click', function () {
            const column = $(this).data('column'); // 클릭한 헤더의 data-column 값 가져오기

            if (!column) return; // 정렬 가능한 컬럼이 아니면 종료

            // 정렬 요청 AJAX!
            $.ajax({
                type: 'GET',
                url: '/api/address/sort', // 정렬 API 엔드포인트
                data: {
                    column: column,
                    order: sortOrder
                },
                success: function (data) {
                    renderTable(data); // 정렬된 데이터 테이블에 렌더링
                    // 정렬 순서 토글 (ASC ↔ DESC)
                    sortOrder = sortOrder === 'ASC' ? 'DESC' : 'ASC';
                },
                error: function (xhr) {
                    Swal.fire({
                        icon: 'error',
                        title: '정렬 실패',
                        text: xhr.responseText || '정렬 요청 처리 중 문제가 발생했습니다.',
                    });
                }
            });
        });
    });