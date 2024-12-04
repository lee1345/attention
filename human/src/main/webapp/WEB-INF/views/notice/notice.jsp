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
        <div class="search-register">
            <div class="filter-group">
                <select id="category">
                    <option value="bTitle">제목</option>
                    <option value="bContent">내용</option>
                    <option value="bWriter">작성자</option>
                </select>
                <input type="text" id="searchQuery" placeholder="검색어를 입력하세요" />
                <button id="btnSearch" class="btn-search">조회</button>
            </div>
        </div>
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
                <!-- 데이터는 JS로 렌더링 -->
            </tbody>
        </table>
    </div>
</body>
</html>
