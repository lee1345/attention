<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="contextPath" value="${pageContext.request.contextPath}" />

<!DOCTYPE html>
<html lang="ko">
<head>
    <link rel="stylesheet" href="${contextPath}/css/notice.css" />
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script> <!-- jQuery CDN -->
    <script src="${contextPath}/js/notice.js" defer></script>
    <title>공지사항</title>
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
                <input type="text" id="searchQuery" name="query" placeholder="검색어를 입력하세요"/>
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
</div> <!-- common.jsp에 container의 닫는부분 -->

<!-- 팝업 -->
<div class="popup hidden" id="popup">
    <button class="close-btn" id="closePopup">X</button>
    <h2>주소 등록</h2>
    <form id="registerForm">
        <label for="name">제목</label>
        <input type="text" id="name" name="name" required /><br>
        <label for="phone">내용</label>
        <input type="text" id="phone" name="phone" required /><br>
        <label for="email">작성자</label>
        <input type="email" id="email" name="email" required /><br>
        <button type="submit" class="submit-btn">등록</button>
    </form>
</div>
</body>
</html>
