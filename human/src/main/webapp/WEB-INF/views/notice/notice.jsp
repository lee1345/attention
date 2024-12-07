<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="contextPath" value="${pageContext.request.contextPath}" />

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>공지사항</title>
    <link rel="stylesheet" href="${contextPath}/css/notice.css" />
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script> <!-- jQuery CDN -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.18/summernote-lite.min.js"></script> <!-- Summernote CDN -->
    <script src="${contextPath}/js/notice.js" defer></script>
</head>
<body>
<%@ include file="/WEB-INF/views/common/common.jsp" %>

<div class="notice">
    <h2>공지사항</h2><br>

    <!-- 검색 및 등록 섹션 -->
    <div class="search-register">
        <form id="searchForm">
            <div class="filter-group">
                <select id="category" name="category">
                    <option value="B_ID" selected>번호</option>
                    <option value="B_TITLE">제목</option>
                    <option value="B_CONTENT">내용</option>
                    <option value="B_WRITER">작성자</option>
                </select>
                <input type="text" id="searchQuery" name="query" placeholder="검색어를 입력하세요" />
                <button type="submit" class="btn-search" id="searchBtn">조회</button>
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
<div class="popup-overlay" id="popupOverlay"></div>

<!-- 팝업 -->
<div class="popup hidden" id="popup">
    <button class="close-btn" id="closePopup">X</button>
    <h2>주소 등록</h2>
    <form id="registerForm" method="post" action="${contextPath}/registerAddress">
        <label for="title">제목</label>
        <input type="text" id="title" name="title" placeholder="제목을 입력하세요" required /><br>
        <label for="content">내용</label>
        <textarea id="content" name="content" placeholder="내용을 입력하세요" rows="10" required></textarea><br>
        <label for="name">작성자</label>
        <input type="text" id="name" name="name" placeholder="작성자를 입력하세요" required /><br>
        <button type="submit" class="submit-btn">등록</button>
    </form>
</div>
</body>
</html>
