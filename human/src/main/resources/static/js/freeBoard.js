
// 게시판 데이터 로드 함수
function freeBoardAllData() {
    $.ajax({
        type: 'GET',
        url: '/api/freeBoard', // 전체 데이터를 가져오는 URL
        success: function (data) {
            renderTable(data); // 성공 시 테이블 렌더링
        },
        error: function () {
            console.error("데이터 요청 실패");
        }
    });
}

//========================================================

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
    const freeBoardTable = $('#freeBoardTable');
    freeBoardTable.empty(); // 기존 테이블 내용 초기화

    if (data.length === 0) {
        // 데이터가 없을 경우 메시지 출력
        freeBoardTable.append(`<tr><td colspan="7" style="text-align: center;">데이터가 없습니다.</td></tr>`);
        return;
    }

    // HTML 태그 제거 함수
    function stripHtmlTags(str) { // [수정] HTML 태그 제거 함수 추가
        return str
            .replace(/<\/?[^>]+(>|$)/g, "") // HTML 태그 제거
            .replace(/ /g, "&nbsp;"); // 띄어쓰기를 &nbsp;로 변환
    }

    // 데이터를 반복하며 테이블 행 생성
    data.forEach(freeBoard => {
        const formattedDate = formatDate(freeBoard.b_CreatedDate);
        const contentPreview = stripHtmlTags(freeBoard.b_Content).substring(0, 50); // [수정] 내용 글자수 제한

        // 카테고리 변환
        const categoryMap = { Q: "QnA", T: "꿀팁", F: "자유이야기" };
        const categoryName = categoryMap[freeBoard.b_Category] || "알 수 없음";

        const row = `
            <tr class="freeBoard-row" data-id="${freeBoard.b_Id}">
                <td>${freeBoard.b_Id}</td>
                <td>${categoryName}</td>
                <td>${freeBoard.b_Title}</td>
                <td>${contentPreview}</td>
                <td>${freeBoard.b_Writer}</td>
                <td>${formattedDate}</td>
            </tr>
        `;
        freeBoardTable.append(row);
    });
}

//========================================================

$(document).ready(function () {
    // 전체 데이터 로드 (GET)
    freeBoardAllData();

    // 엔터 키를 누르면 검색 버튼 클릭
    $('#query').on('keypress', function (event) {
        if (event.key === 'Enter') { // 엔터 키 감지
            event.preventDefault(); // 기본 동작 방지 (폼 제출 방지)
            $('#searchBtn').click(); // 검색 버튼 클릭 이벤트 실행
        }
    });

    // 검색 버튼 클릭 이벤트
    $('#searchBtn').on('click', function () {
        const category = $('#category').val(); // 선택된 카테고리
        const query = $('#query').val().trim(); // 입력된 검색어

        if (!query) {
            alert("검색어를 입력하세요!");
            return;
        }

        // 검색어 AJAX POST 요청
        $.ajax({
            type: 'POST',
            url: '/api/freeBoard/search',
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
    freeBoardAllData();

    // TinyMCE 등록 팝업 열기
    $('.btn-register').on('click', function () {
        $('#popupOverlay, #popup').fadeIn();
        initializeTinyMCE('#content'); // TinyMCE 초기화
        $('#registerForm')[0].reset(); // 폼 데이터 초기화
    });

    // 등록 팝업 닫기
    $('#closePopup').on('click', function () {
        $('#popupOverlay, #popup').fadeOut();
        tinymce.remove('#content'); // TinyMCE 초기화 제거
        $('#registerForm')[0].reset();
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
        b_Category: $('#categorySelect').val(), // 선택된 카테고리 추가
        b_Group: 'F' // 자유게시판 그룹 고정
    };

        $.ajax({
            type: 'POST',
            url: '/api/freeBoard/register',
            contentType: 'application/json; charset=UTF-8',
            data: JSON.stringify(formData),
            success: function () {
                alert('등록 성공!');
                $('#popupOverlay, #popup').fadeOut(); // 팝업 닫기
                freeBoardAllData(); // 전체 데이터 다시 로드
            },
            error: function () {
                alert('등록 실패!');
            }
        });
    });
});

//======================================================================================================

// 카테고리 클릭 시 해당 데이터 조회
$(document).ready(function () {
    // 네비게이션 카테고리 클릭 이벤트
    $('.category-link').on('click', function (event) {
        event.preventDefault(); // 기본 클릭 동작 방지

        const category = $(this).data('category'); // 클릭한 카테고리 값 가져오기

        // AJAX로 데이터 조회 요청
        $.ajax({
            type: 'GET',
            url: `/api/freeBoard/category/${category}`, // 카테고리를 URL에 포함
            success: function (data) {
                renderTable(data); // 성공 시 테이블 렌더링
            },
            error: function () {
                alert("데이터 조회 실패!");
            }
        });
    });
});

//======================================================================================================

// 테이블 데이터를 클릭하면 팝업 표시
$(document).on('click', '.freeBoard-row', function () {
    const freeBoardId = $(this).data('id'); // 공지사항 ID 가져오기
    $('#popupOverlay').fadeIn();

    // 팝업 닫기
    $('#closeFreeBoardPopup').on('click', function () {
        $('#popupOverlay, #freeBoardPopup').fadeOut();
    });

    // AJAX 요청으로 데이터 가져오기
    $.ajax({
        type: 'GET',
        url: `/api/freeBoard/${freeBoardId}`,
        success: function (data) {
            console.log("Fetched Data:", data);

            const categoryMap = { Q: "QnA", T: "꿀팁", F: "자유이야기" };
            const categoryName = categoryMap[data.b_Category] || "알 수 없음";

            $('#popupCategory').text(categoryName);
            $('#popupFreeBoardTitle').text(data.b_Title);
            $('#popupFreeBoardContent').html(data.b_Content);
            $('#popupFreeBoardWriter').text(data.b_Writer);
            $('#popupFreeBoardDate').text(formatDate(data.b_CreatedDate));
            $('#FreeBoardePopupOverlay, #freeBoardPopup').fadeIn();

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

            $('#popupOverlay, #freeBoardPopup').fadeIn();

        },
        error: function () {
            alert('데이터를 가져오지 못했습니다.');
        }
    });
});

// 수정 버튼 클릭
$(document).on('click', '.edit-btn', function () {
    const freeBoardId = $(this).data('id'); // 수정할 게시글 ID 가져오기
    $('#freeBoardPopup').fadeOut(); // 기존 팝업 닫기

    // 팝업 닫기
    $('#closeEditPopup').on('click', function () {
        $('#popupOverlay, #editPopup').fadeOut();
        tinymce.remove('#editContent'); // TinyMCE 초기화 제거
    });

    // 서버에서 해당 글의 데이터 가져오기
    $.ajax({
        type: 'GET',
        url: `/api/freeBoard/${freeBoardId}`,
        success: function (data) {

            $('#editTitle').val(data.b_Title); // 제목 로드
            $('#editCategory').val(data.b_Category); // 카테고리 로드
            $('#editSummernote').summernote('code', data.b_Content); // 내용 로드
            $('#editFreeBoardId').val(data.b_Id); // 게시글 ID 저장

        // TinyMCE 초기화 및 데이터 로드
            initializeTinyMCE('#editContent'); // TinyMCE 초기화
            tinymce.get('editContent').setContent(data.b_Content); // 내용 로드

            $('#popupOverlay, #editPopup').fadeIn();
        },
        error: function () {
            alert('수정 데이터를 불러오지 못했습니다.');
        }
    });
});

// 수정 데이터 저장
$('#editForm').on('submit', function (event) {
    event.preventDefault(); // 기본 동작 방지

    // TinyMCE에서 수정된 내용을 가져옵니다.
    const content = tinymce.get('editContent').getContent();

    const formData = {
        b_Id: $('#editFreeBoardId').val(),
        b_Title: $('#editTitle').val(),
        b_Content: content, // TinyMCE 내용
        b_Writer: loggedInUser, // 현재 로그인 사용자
        b_Category: $('#editCategory').val() // 수정된 카테고리
    };

    $.ajax({
        type: 'PUT',
        url: `/api/freeBoard/${formData.b_Id}`,
        contentType: 'application/json; charset=UTF-8',
        data: JSON.stringify(formData),
        success: function () {
            alert('수정 성공!');
            $('#popupOverlay, #editPopup').fadeOut();
            freeBoardAllData(); // 데이터 다시 로드
        },
        error: function () {
            alert('수정 실패!');
        }
    });
});

// 삭제 버튼 클릭
$(document).on('click', '.delete-btn', function () {
    const freeBoardId = $(this).data('id'); // 삭제할 게시글 ID 가져오기

    if (confirm("정말 삭제하시겠습니까?")) {
        $.ajax({
            type: 'DELETE',
            url: `/api/freeBoard/${freeBoardId}?user=${loggedInUser}`,
            success: function () {
                alert('삭제 성공!');
                $('#popupOverlay, #freeBoardPopup').fadeOut(); // 팝업 닫기
                freeBoardAllData(); // 데이터 다시 로드
            },
            error: function () {
                alert('삭제 실패!');
            }
        });
    }
});
