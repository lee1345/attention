<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="contextPath" value="${pageContext.request.contextPath}" />

<!-- 동적 경로로 CSS 로드 -->
<link rel="stylesheet" href="${contextPath}/css/common.css" />
<link rel="stylesheet" href="${contextPath}/css/addressBook.css" />

<%@ include file="/WEB-INF/views/common/common.jsp" %> <!-- 공통 헤더 포함 -->
<div class="address-book">
    <h2>주소록</h2>
    <!-- 검색 및 등록 섹션 -->
    <div class="search-register">
        <form method="GET" action="${contextPath}/addressBook/search">
            <!-- 구분 -->
            <div class="filter-group">
                <label for="category">구분</label>
                <select id="category" name="category">
                    <option value="name">이름</option>
                    <option value="department">부서</option>
                    <option value="company">회사명</option>
                </select>
            </div>
            <!-- 검색창 -->
            <div class="filter-group">
                <input type="text" id="searchQuery" name="query" placeholder="검색어를 입력하세요" />
            </div>
            <!-- 조회 버튼 -->
            <button type="submit" class="btn-search">조회</button>
            <!-- 등록 버튼 -->
            <button type="button" class="btn-register" onclick="location.href='${contextPath}/addressBook/register'">등록하기</button>
        </form>
    </div>

    <!-- 주소록 리스트 -->
    <table class="address-table">
        <thead>
            <tr>
                <th>번호</th>
                <th>이름</th>
                <th>휴대폰</th>
                <th>이메일</th>
                <th>부서명</th>
                <th>회사명</th>
                <th>그룹(별칭)</th>
            </tr>
        </thead>
        <tbody>
            <c:forEach var="entry" items="${addressList}">
                <tr>
                    <td>${entry.id}</td>
                    <td>${entry.name}</td>
                    <td>${entry.phone}</td>
                    <td>${entry.email}</td>
                    <td>${entry.department}</td>
                    <td>${entry.company}</td>
                    <td>${entry.group}</td>
                </tr>
            </c:forEach>
        </tbody>
    </table>

    <!-- 페이지네이션 -->
    <div class="pagination">
        <c:forEach var="page" begin="1" end="${totalPages}">
            <a href="${contextPath}/addressBook?page=${page}" class="${page == currentPage ? 'active' : ''}">${page}</a>
        </c:forEach>
    </div>
</div>
