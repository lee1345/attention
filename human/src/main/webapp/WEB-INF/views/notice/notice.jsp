<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="contextPath" value="${pageContext.request.contextPath}" />

<!DOCTYPE html>
<html lang="ko">
<head>
    <!-- 동적 경로로 CSS 로드 -->
    <link rel="stylesheet" href="${contextPath}/css/notice.css" />

    <title>Notice</title>
</head>

<body>
<!-- 공통 헤더&사이드 -->
<%@ include file="/WEB-INF/views/common/common.jsp" %>

<div class="notice">
    <h2>공지사항</h2><br>
    <!-- 검색 및 등록 섹션 -->
    <div class="search-register">
        <form method="GET" action="${contextPath}/addressBook/search">
            <!-- 검색 필터 -->
            <div class="filter">
                <!-- 제목 선택 -->
                <div class="filter-group">
                    <label for="category"></label>
                    <select id="category" name="category">
                        <option value="title">제목</option>
                        <option value="author">작성자</option>
                    </select>
                </div>
                <!-- 검색 입력 -->
                <div class="filter-group">
                    <input type="text" id="searchQuery" name="query" placeholder="검색어를 입력하세요" />
                </div>
                <!-- 기간 필터 -->
                <div class="filter-group">
                    <label for="startDate"></label>
                    <input type="date" id="startDate" name="startDate" />
                    ~
                    <input type="date" id="endDate" name="endDate" />
                </div>
                <!-- 버튼 -->
                <div class="filter-group">
                    <button type="submit" class="btn-search">조회</button>
                    <button type="button" class="btn-register" onclick="location.href='${contextPath}/notice/register'">등록하기</button>
                </div>
            </div>
        </form>
    </div>


    <!-- 공지사항 리스트 -->
    <table class="notice-table">
        <thead>
        <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>등록일</th>
        </tr>
        </thead>
        <tbody>
        <c:forEach var="notice" items="${noticeList}">
            <tr>
                <td>${notice.id}</td>
                <td>${notice.name}</td>
                <td>${notice.phone}</td>
                <td>${notice.email}</td>
                <td>${notice.department}</td>
                <td>${notice.company}</td>
                <td>${notice.group}</td>
            </tr>
        </c:forEach>
        </tbody>
    </table>

    <!-- 페이지네이션 -->
    <div class="pagination">
        <c:forEach var="page" begin="1" end="${totalPages}">
            <a href="${contextPath}/notice?page=${page}" class="${page == currentPage ? 'active' : ''}">${page}</a>
        </c:forEach>
    </div>
</div>
</div> <!-- common.jsp에 container의 닫는부분 -->
</body>
</html>
