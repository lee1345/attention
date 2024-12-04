// 클라이언트에서 검색어가 비었는지 확인
    function validateSearch() {
        const query = document.getElementById('searchQuery').value.trim();
        if (!query) {
            alert("검색어를 입력하세요!");
            return false; // 요청 중단
        }
        return true; // 요청 진행
    }