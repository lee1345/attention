<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="contextPath" value="${pageContext.request.contextPath}" />

<!DOCTYPE html>
<html lang="ko">
<head>
    <title>Notice</title>
    <!-- 동적 경로로 CSS 로드 -->
    <link rel="stylesheet" href="${contextPath}/css/notice.css" />
    <!-- 부트스트랩 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />

    <!-- 부트스트랩 JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
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
                    <button type="button" class="btn-register" data-bs-toggle="modal" data-bs-target="#registerModal">등록하기</button>
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
<!-- Modal -->
<div class="modal fade" id="registerModal" tabindex="-1" aria-labelledby="registerModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <form method="POST" action="${contextPath}/addressBook/register">
                <div class="modal-header">
                    <h5 class="modal-title" id="registerModalLabel">주소록 등록</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <!-- 이름 -->
                    <div class="mb-3">
                        <label for="name" class="form-label">이름</label>
                        <input type="text" class="form-control" id="name" name="name" required>
                    </div>
                    <!-- 휴대폰 -->
                    <div class="mb-3">
                        <label for="phone" class="form-label">휴대폰</label>
                        <input type="text" class="form-control" id="phone" name="phone" required>
                    </div>
                    <!-- 이메일 -->
                    <div class="mb-3">
                        <label for="email" class="form-label">이메일</label>
                        <input type="email" class="form-control" id="email" name="email" required>
                    </div>
                    <!-- 부서명 -->
                    <div class="mb-3">
                        <label for="department" class="form-label">부서명</label>
                        <input type="text" class="form-control" id="department" name="department">
                    </div>
                    <!-- 회사명 -->
                    <div class="mb-3">
                        <label for="company" class="form-label">회사명</label>
                        <input type="text" class="form-control" id="company" name="company">
                    </div>
                    <!-- 그룹 -->
                    <div class="mb-3">
                        <label for="group" class="form-label">그룹(별칭)</label>
                        <input type="text" class="form-control" id="group" name="group">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
                    <button type="submit" class="btn btn-primary">저장</button>
                </div>
            </form>
        </div>
    </div>
</div>

</body>
</html>
