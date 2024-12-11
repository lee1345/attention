<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="contextPath" value="${pageContext.request.contextPath}" />

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>공지사항 등록</title>

    <link rel="stylesheet" href="${contextPath}/css/notice.css" />

    <!-- jQuery -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

    <!-- TinyMCE CDN -->
    <script src="https://cdn.tiny.cloud/1/0ejo1az83u9m3gt3maghj3ird3tp4ffzos68q557dpo3seb4/tinymce/6/tinymce.min.js" referrerpolicy="origin"></script>

    <script src="${contextPath}/js/notice.js" defer></script>
    <script>
        const loggedInUser = "${employee.e_name}"; // 로그인한 사용자 이름을 JavaScript 변수로 전달
    </script>

</head>
<body>

<%@ include file="/WEB-INF/views/common/common.jsp" %>

<div class="notice">
    <h2>공지사항</h2><br>

    <!-- 검색 및 등록 섹션 -->
    <div class="search-register">
        <form id="searchForm">
            <div class="filter-group">
                <!-- 검색 카테고리 -->
                <select id="category" name="category">
                    <option value="B_ID" selected>번호</option>
                    <option value="B_TITLE">제목</option>
                    <option value="B_CONTENT">내용</option>
                    <option value="B_WRITER">작성자</option>
                </select>
                <!-- 검색어 입력 -->
                <input type="text" id="query" name="query" placeholder="검색어를 입력하세요">
                <button type="button" class="btn-search" id="noticeSearchBtn">조회</button>
                <button type="button" class="btn-register">등록하기</button>
            </div>
        </form>
    </div>

    <!-- 공지사항 리스트 -->
    <table class="notice-table">
        <thead>
        <tr>
            <th>번호</th>
            <th>제목</th>
            <th>내용</th>
            <th>작성자</th>
            <th>날짜</th>
        </tr>
        </thead>
        <tbody id="noticeTable">
        <!-- AJAX로 데이터 로드 -->
        </tbody>
    </table>
</div>

<!-- 팝업 배경 오버레이 -->
<div class="popup-overlay hidden" id="popupOverlay"></div>

<!-- 등록 팝업 -->
<div class="popup hidden" id="popup">
    <button class="close-btn" id="closePopup">X</button>
    <h2>공지사항 등록</h2>
    <form id="registerForm">
        <div class="form-row">
            <!-- 제목 입력 -->
            <div class="form-group">
                <label for="title"></label>
                <input type="text" id="title" name="title" placeholder="제목을 입력하세요" required>
            </div>
        </div>
        <!-- 내용 입력 -->
        <label for="content"></label>
        <textarea id="content" name="content" placeholder="내용을 입력하세요"></textarea>
        <button type="submit" class="submit-btn">등록</button>
    </form>
</div>

<!-- 내용 팝업 -->
<div class="popup hidden" id="noticePopup">
    <button class="close-btn" id="closeNoticePopup">X</button>
    <div class="title"><h2 id="popupTitle">공지사항</h2></div>
    <div class="contentPopup">
        <div class="sub">
            <div>날짜   <span id="popupNoticeDate"></span></div>
            <div>작성자 <span id="popupNoticeWriter"></span></div>
        </div>
        <div class="content">
            <div id="popupNoticeTitle"></div><br>
            <p>상세 내용</p>
            <div id="popupNoticeContent">
            </div>
        </div>
    </div>
</div>
</body>
</html>
