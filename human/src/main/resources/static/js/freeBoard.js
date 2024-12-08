
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

// 테이블 렌더링 함수
function renderTable(data) {
    const freeBoardTable = $('#freeBoardTable');
    freeBoardTable.empty(); // 기존 테이블 내용 초기화

    if (data.length === 0) {
        // 데이터가 없을 경우 메시지 출력
        freeBoardTable.append(`<tr><td colspan="4" style="text-align: center;">데이터가 없습니다.</td></tr>`);
        return;
    }

    // 날짜 포맷 변환 함수
    function formatDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    // 데이터를 반복하며 테이블 행 생성
    data.forEach(freeBoard => {
        const formattedDate = formatDate(freeBoard.b_CreatedDate);

        // 카테고리 변환
        const categoryMap = { Q: "QnA", T: "꿀팁", F: "자유이야기" };
        const categoryName = categoryMap[freeBoard.b_Category] || "알 수 없음";

        const row = `
            <tr>
                <td>${freeBoard.b_Id}</td>
                <td>${freeBoard.b_Title}</td>
                <td>${freeBoard.b_Content}</td>
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

    // Summernote 에디터 초기화
    $("#summernote").summernote({
        height: 300,
        placeholder: "내용을 입력하세요",
        toolbar: [
            ["style", ["bold", "italic", "underline", "clear"]],
            ["para", ["ul", "ol", "paragraph"]],
        ],
    });

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


// 팝업창
$(document).ready(function () {
    // 팝업 열기
    $('.btn-register').on('click', function () {
        $('#popupOverlay, #popup').fadeIn();
    });

    // 팝업 닫기
    $('#closePopup').on('click', function () {
        $('#popupOverlay, #popup').fadeOut();
    });

    // 등록 폼 제출
    $('#registerForm').on('submit', function (event) {
        event.preventDefault(); // 기본 폼 제출 방지

    // Summernote 값 가져오기 (HTML 태그 포함)
    let content = $('#summernote').summernote('code');
    // HTML 태그 제거
    content = $('<div>').html(content).text();

    const formData = {
        b_Title: $('#title').val(), // 제목 입력값
        b_Content: content,// Summernote 내용 (본문)
        b_Writer: '작성자', // 작성자 (동적으로 설정하거나 하드코딩 가능)
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




