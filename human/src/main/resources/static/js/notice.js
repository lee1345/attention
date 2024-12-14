
// 게시판 데이터 로드 함수
function noticeAllData() {
    $.ajax({
        type: 'GET',
        url: '/api/notice', // 전체 데이터를 가져오는 URL
        success: function (data) {
            renderTable(data); // 성공 시 테이블 렌더링
        },
        error: function () {
            console.error("데이터 요청 실패");
        }
    });
}

//======================================================================================================

// 날짜 포맷 변환 함수
function formatDate(dateString) {
    if (!dateString) {
            return "날짜 없음"; // 기본 메시지
    }

    const parsedDate  = new Date(dateString);
    if (isNaN(parsedDate )) {
        return "유효하지 않은 날짜"; // 날짜 형식이 잘못된 경우
    }

    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

//======================================================================================================


// TinyMCE 에디터 초기화 함수
function initializeTinyMCE(selector) {
    tinymce.init({
        selector: selector,
        height: 300,
        menubar: false,
        plugins: 'lists link image code',
        toolbar: 'undo redo | bold italic underline | bullist numlist | link image | code',
        placeholder: '내용을 입력하세요',
    });
}

//======================================================================================================

// 테이블 렌더링 함수
function renderTable(data) {
    const noticeTable = $('#noticeTable');
    noticeTable.empty(); // 기존 테이블 내용 초기화

    if (data.length === 0) {
        // 데이터가 없을 경우 메시지 출력
        noticeTable.append(`<tr><td colspan="7" style="text-align: center;">데이터가 없습니다.</td></tr>`);
        return;
    }

    // HTML 태그 제거 함수
    function stripHtmlTags(str) { // [수정] HTML 태그 제거 함수 추가
        return str
            .replace(/<\/?[^>]+(>|$)/g, "") // HTML 태그 제거
            .replace(/ /g, "&nbsp;"); // 띄어쓰기를 &nbsp;로 변환
    }

    // 데이터를 반복하며 테이블 행 생성
    data.forEach(notice => {
        const formattedDate = formatDate(notice.b_CreatedDate);
        const contentPreview = stripHtmlTags(notice.b_Content).substring(0, 50); // [수정] 내용 글자수 제한

        const row = `
            <tr class="notice-row" data-id="${notice.b_Id}">
                <td>${notice.b_Id}</td>
                <td>${notice.b_Title}</td>
                <td>${contentPreview}</td>
                <td>${notice.b_Writer || '익명'}</td>
                <td>${formattedDate}</td>
                <td>${notice.b_ViewCount || 0}</td> <!-- 조회수 표시 -->

            </tr>
        `;
        noticeTable.append(row);
    });
}

//======================================================================================================


$(document).ready(function () {
    // 전체 데이터 로드 (GET)
    noticeAllData();

    // 엔터 키를 누르면 검색 버튼 클릭
    $('#query').on('keypress', function (event) {
        if (event.key === 'Enter') { // 엔터 키 감지
            event.preventDefault(); // 기본 동작 방지 (폼 제출 방지)
            $('#noticeSearchBtn').click(); // 검색 버튼 클릭 이벤트 실행
        }
    });

    // 검색 버튼 클릭 이벤트
    $('#noticeSearchBtn').on('click', function () {
        const category = $('#category').val(); // 선택된 카테고리
        const query = $('#query').val().trim(); // 입력된 검색어

        if (!query) {
            alert("검색어를 입력하세요!");
            return;
        }

        // 검색어 AJAX POST 요청
        $.ajax({
            type: 'POST',
            url: '/api/notice/search',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            data: {
                category: category,
                query: query
            },
            success: function (data) {
                console.log("AJAX Success Data:", data); // 성공 데이터 확인
                renderTable(data);
            },
            error: function () {
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
        initializeTinyMCE('#content'); // TinyMCE 초기화
        $('#registerForm')[0].reset(); // 폼 데이터 초기화
    });

    // 팝업 닫기
    $('#closePopup').on('click', function () {
        $('#popupOverlay, #popup').fadeOut();
        tinymce.remove('#content'); // TinyMCE 초기화 제거
        $('#registerForm')[0].reset(); // 폼 데이터 초기화
    });

    // 등록 폼 제출
    $('#registerForm').on('submit', function (event) {
        event.preventDefault(); // 기본 폼 제출 방지

    // TinyMCE 내용 가져오기
    const content = tinymce.get('content').getContent();
    const formData = {
        b_Title: $('#title').val(), // 제목 입력값
        b_Content: content, // TinyMCE 내용 (본문)
        b_Writer: loggedInUser, // 작성자 (동적으로 설정)
        b_Group: 'N' // 공지사항 그룹 고정
    };

        $.ajax({
            type: 'POST',
            url: '/api/notice/register',
            contentType: 'application/json; charset=UTF-8',
            data: JSON.stringify(formData),
            success: function () {
                alert('등록 성공!');
                $('#popupOverlay, #popup').fadeOut(); // 팝업 닫기
                noticeAllData(); // 전체 데이터 다시 로드
            },
            error: function () {
                alert('등록 실패!');
            }
        });
    });
});

//======================================================================================================

//// 테이블 데이터를 클릭하면 팝업 표시
//$(document).on('click', '.notice-row', function () {
//    const noticeId = $(this).data('id'); // 공지사항 ID 가져오기
//    $('#popupOverlay').fadeIn();
//
//    // 팝업 닫기
//    $('#closeNoticePopup').on('click', function () {
//        $('#popupOverlay, #noticePopup').fadeOut();
//    });
//
//    // AJAX 요청으로 데이터 가져오기
//    $.ajax({
//        type: 'GET',
//        url: `/api/notice/${noticeId}`,
//        success: function (data) {
//            console.log("Fetched Data:", data);
//            console.log("Created Date:", data.b_CreatedDate);
//
//            $('#popupNoticeTitle').text(data.b_Title);
//            $('#popupNoticeContent').html(data.b_Content);
//            $('#popupNoticeWriter').text(data.b_Writer);
//            $('#popupNoticeDate').text(formatDate(data.b_CreatedDate));
//            $('#noticePopupOverlay, #noticePopup').fadeIn();
//        },
//        error: function () {
//            alert('데이터를 가져오지 못했습니다.');
//        }
//    });
//});
//
//
////======================================================================================================
//
//// 공지사항 행 클릭 이벤트 ( 조회수 증가 )
//$(document).off('click', '.notice-row').on('click', '.notice-row', function () {
//    const noticeId = $(this).data('id'); // 클릭한 공지사항의 ID 가져오기
//
//    // 조회수 증가 및 공지사항 데이터 요청
//    $.ajax({
//        type: 'GET',
//        url: `/api/notice/${noticeId}`,
//        success: function (data) {
//            // 성공 시 조회수와 데이터 확인
//            console.log(`조회수 증가 성공: ID ${noticeId}, 현재 조회수: ${data.b_ViewCount}`);
//        },
//        error: function () {
//            console.error(`조회수 증가 실패: ID ${noticeId}`);
//        }
//    });
//});

//======================================================================================================

// 공지사항 행 클릭 이벤트
$(document).off('click', '.notice-row').on('click', '.notice-row', function () {
    const noticeId = $(this).data('id'); // 클릭한 공지사항의 ID 가져오기
    $('#popupOverlay').fadeIn();

    // AJAX 요청으로 조회수 증가 및 데이터 가져오기
    $.ajax({
        type: 'GET',
        url: `/api/notice/${noticeId}`, // 조회수 증가 및 데이터 반환 API
        success: function (data) {
            if (!data) {
                alert("해당 공지사항 데이터를 찾을 수 없습니다.");
                return;
            }

            // 조회수 증가 및 데이터 확인
            console.log(`조회수 증가 성공: ID ${noticeId}, 현재 조회수: ${data.b_ViewCount}`);
            console.log("Fetched Data:", data);

            // 테이블의 특정 행만 업데이트
            const row = $(`.notice-row[data-id="${noticeId}"]`);
            row.find('td').eq(5).text(data.b_ViewCount || 0); // 조회수 업데이트

            // 팝업에 데이터 채우기
            $('#popupNoticeTitle').text(data.b_Title || '제목 없음');
            $('#popupNoticeContent').html(data.b_Content || '내용 없음');
            $('#popupNoticeWriter').text(data.b_Writer || '익명');
            $('#popupNoticeDate').text(formatDate(data.b_CreatedDate));

            // 수정/삭제 버튼 렌더링
            const popupActions = $('.action-buttons');
            popupActions.empty(); // 기존 버튼 제거

            // 로그인한 사용자와 작성자가 같을 때만 버튼 추가
            if (loggedInUser === data.b_Writer) {
                popupActions.append(`
                    <button class="edit-btn" data-id="${data.b_Id}">수정</button>
                    <button class="delete-btn" data-id="${data.b_Id}">삭제</button>
                `);
            }

            // 팝업 표시
            $('#PopupOverlay, #noticePopup').fadeIn();
        },
        error: function () {
            alert('데이터를 가져오는 데 실패했습니다.');
            console.error(`조회수 증가 및 데이터 로드 실패: ID ${noticeId}`);
        }
    });

    // 팝업 닫기 이벤트
    $('#closeNoticePopup').off('click').on('click', function () {
        $('#popupOverlay, #noticePopup').fadeOut();
    });
});

//======================================================================================================


// 수정 버튼 클릭
$(document).on('click', '.edit-btn', function () {
    const noticeId = $(this).data('id'); // 수정할 게시글 ID 가져오기
    $('#noticePopup').fadeOut(); // 기존 팝업 닫기
    console.log("수정할 게시글 ID:", noticeId); // 콘솔 출력

    // AJAX 요청으로 데이터 가져오기
    $.ajax({
        type: 'GET',
        url: `/api/notice/${noticeId}`,
        success: function (data) {
            if (!data) {
                alert("해당 데이터를 찾을 수 없습니다.");
                return;
            }

            // 데이터 로드
            $('#editTitle').val(data.b_Title || ''); // 제목
            $('#editNoticeId').val(data.b_Id); // ID
            $('#editContent').val(data.b_Content || ''); // TinyMCE에 내용 로드

            // TinyMCE 초기화 및 데이터 로드
            initializeTinyMCE('#editContent'); // TinyMCE 초기화
            tinymce.get('editContent').setContent(data.b_Content || ''); // 내용 설정

            $('#popupOverlay, #editPopup').fadeIn();
        },
        error: function () {
            alert('수정 데이터를 불러오지 못했습니다.');
        }
    });

    // 팝업 닫기
    $('#closeEditPopup').on('click', function () {
        $('#popupOverlay, #editPopup').fadeOut();
        tinymce.remove('#editContent'); // TinyMCE 초기화 제거
    });
});

// 수정 데이터 저장
$('#editForm').on('submit', function (event) {
    event.preventDefault(); // 기본 동작 방지

    // ID 가져오기
    const noticeId = $('#editNoticeId').val();
    // TinyMCE에서 수정된 내용을 가져옵니다.
    const content = tinymce.get('editContent').getContent();

    if (!noticeId) {
        alert("수정할 게시글 ID가 누락되었습니다.");
        return;
    }

    const formData = {
        b_Id: $('#editNoticeId').val(),
        b_Title: $('#editTitle').val(),
        b_Content: content, // TinyMCE 내용
        b_Writer: loggedInUser, // 현재 로그인 사용자
    };

    console.log("FormData:", formData); // 데이터 확인

    $.ajax({
        type: 'PUT',
        url: `/api/notice/${formData.b_Id}`,
        contentType: 'application/json; charset=UTF-8',
        data: JSON.stringify(formData),
        success: function () {
            alert('수정 성공!');
            $('#popupOverlay, #editPopup').fadeOut();
            noticeAllData(); // 데이터 다시 로드
        },
        error: function () {
            console.error("수정 실패:", xhr.responseText || error);
            alert('수정 실패!');
        }
    });
});

// 삭제 버튼 클릭
$(document).on('click', '.delete-btn', function () {
    const noticeId = $(this).data('id'); // 삭제할 게시글 ID 가져오기

    if (confirm("정말 삭제하시겠습니까?")) {
        $.ajax({
            type: 'DELETE',
            url: `/api/notice/${noticeId}?user=${loggedInUser}`,
            success: function () {
                alert('삭제 성공!');
                $('#popupOverlay, #noticePopup').fadeOut(); // 팝업 닫기
                noticeAllData(); // 데이터 다시 로드
            },
            error: function () {
                alert('삭제 실패!');
            }
        });
    }
});



// 제목 더블클릭 정렬
$(document).ready(function () {
    let sortOrder = 'ASC'; // 기본 정렬 순서 (오름차순)

    // 테이블 헤더 더블 클릭 이벤트
    $('.notice-table th').on('click', function () {
        const column = $(this).data('column'); // 클릭한 헤더의 data-column 값 가져오기

        if (!column) return; // 정렬 가능한 컬럼이 아니면 종료

        // 정렬 요청 AJAX
        $.ajax({
            type: 'GET',
            url: '/api/notice/sort', // 정렬 API 엔드포인트
            data: {
                column: column, // 정렬 기준 컬럼명
                order: sortOrder // 정렬 순서
            },
            success: function (data) {
                renderTable(data); // 테이블 다시 렌더링
                // 정렬 순서 토글 (ASC ↔ DESC)
                sortOrder = sortOrder === 'ASC' ? 'DESC' : 'ASC';
            },
            error: function () {
                alert('정렬 요청 실패! 다시 시도해주세요.');
            }
        });
    });
});
