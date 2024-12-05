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
        <form id="searchForm" action="javascript:void(0);" >
            <div class="filter-group">
                <select id="category" name="category">
                    <option value="B_ID" selected>번호</option>
                    <option value="B_TITLE">제목</option>
                    <option value="B_CONTENT">내용</option>
                    <option value="B_WRITER">작성자</option>
                </select>
                <input type="text" id="searchQuery" name="query" placeholder="검색어를 입력하세요" required/>
                <button type="button" class="btn-search" id="searchBtn">조회</button>
                <button type="button" class="btn-register" onclick="location.href='${contextPath}/notice/noticeModal'">등록하기</button>
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
        </tr>
        </thead>
        <tbody id="noticeTable">
        <!-- AJAX로 데이터 로드 -->
        </tbody>
    </table>
</div>
</div> <!-- common.jsp에 container의 닫는부분 -->
</body>
</html>
