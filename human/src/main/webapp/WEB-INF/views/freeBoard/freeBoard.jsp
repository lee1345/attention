<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="contextPath" value="${pageContext.request.contextPath}" />

<!DOCTYPE html>
<html lang="ko">
<head>
    <link rel="stylesheet" href="${contextPath}/css/freeBoard.css" />
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script> <!-- jQuery CDN -->
    <script src="${contextPath}/js/freeBoard.js" defer></script>
    <title>공지사항</title>
</head>
<body>
<%@ include file="/WEB-INF/views/common/common.jsp" %>

<div class="freeBoard">
    <h2>자유게시판</h2><br>

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
                <button type="button" class="btn-search" id="searchBtn">조회</button>
                <button type="button" class="btn-register">등록하기</button>
            </div>
        </form>
    </div>

    <!-- 네비게이션 바 -->
    <div class="navbar">
        <ul>
            <li><a href="#">QnA</a></li>
            <li><a href="#">꿀팁</a></li>
            <li><a href="#">자유이야기</a></li>
        </ul>
    </div>

    <!-- 공지사항 리스트 -->
    <table class="freeBoard-table">
        <thead>
        <tr>
            <th>번호</th>
            <th>제목</th>
            <th>내용</th>
            <th>작성자</th>
        </tr>
        </thead>
        <tbody id="freeBoardTable">
        <!-- AJAX로 데이터 로드 -->
        </tbody>
    </table>
</div>
</div> <!-- common.jsp에 container의 닫는부분 -->

<!-- 팝업 배경 오버레이 -->
<div class="popup-overlay" id="popupOverlay"></div>

<!-- 팝업 -->
<div class="popup hidden" id="popup">
    <button class="close-btn" id="closePopup">X</button>
    <h2>게시판 등록</h2>
    <form id="registerForm">
        <label for="title">구분</label>
        <input type="text" id="QnA" name="QnA" required /><br>
        <label for="title">제목</label>
        <input type="text" id="title" name="title" required /><br>
        <label for="content">내용</label>
        <input type="text" id="content" name="content" required /><br>
        <label for="name">작성자</label>
        <input type="email" id="name" name="name" required /><br>
        <button type="submit" class="submit-btn">등록</button>
    </form>
</div>
</body>
</html>
