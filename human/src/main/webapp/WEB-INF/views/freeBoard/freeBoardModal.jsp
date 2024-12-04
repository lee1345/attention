<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="contextPath" value="${pageContext.request.contextPath}" />

<!DOCTYPE html>
<html lang="ko">
<head>
    <title>freeBoard</title>
    <!-- 동적 경로로 CSS 로드 -->
    <link rel="stylesheet" href="${contextPath}/css/freeBoard.css" />
    <!-- 부트스트랩 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />

    <!-- 부트스트랩 JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</head>

<body>
<!-- 공통 헤더&사이드 -->
<%@ include file="/WEB-INF/views/common/common.jsp" %>

<div class="freeBoard">
    <h2>자유게시판</h2><br>
    <!-- 검색 및 등록 섹션 -->
    <div class="search-register">
        <form method="GET" action="${contextPath}/addressBook/search">
            <!-- 검색 필터 -->
            <div class="filter">
                <!-- 제목 선택 -->
                <div class="filter-group">
                    <label for="category"></label>
                    <select id="category" name="category">
                        <option value="group">분류</option>
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

    <!-- 탭 메뉴 추가 -->
    <div class="tabs">
        <ul class="tab-menu">
            <li class="tab-item active"><a href="${contextPath}/freeBoard?tab=qna">Q&A</a></li>
            <li class="separator"></li>
            <li class="tab-item"><a href="${contextPath}/freeBoard?tab=tip">꿀팁</a></li>
            <li class="separator"></li>
            <li class="tab-item"><a href="${contextPath}/freeBoard?tab=free">자유이야기</a></li>
        </ul>
    </div>

    <!-- 공지사항 리스트 -->
    <table class="freeBoard-table">
        <thead>
        <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>등록일</th>
        </tr>
        </thead>
        <tbody>
        <c:forEach var="entry" items="${freeBoardList}">
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
            <a href="${contextPath}/freeBoard?page=${page}" class="${page == currentPage ? 'active' : ''}">${page}</a>
        </c:forEach>
    </div>
</div>
</div> <!-- common.jsp에 container의 닫는부분 -->
<!-- 게시글 작성 모달 -->
<div class="modal fade" id="registerModal" tabindex="-1" aria-labelledby="registerModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <!-- 모달 헤더 -->
            <div class="modal-header">
                <h5 class="modal-title" id="registerModalLabel">게시글 작성</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <!-- 모달 바디 -->
            <div class="modal-body">
                <form id="registerForm" method="POST" action="${contextPath}/addressBook/register">
                    <div class="mb-3">
                        <label for="title" class="form-label">제목</label>
                        <input type="text" class="form-control" id="title" name="title" placeholder="제목을 입력하세요" required />
                    </div>
                    <div class="mb-3">
                        <label for="category" class="form-label">분류</label>
                        <select name="category" class="form-control" id="category">
                            <option value="select">분류를 선택하세요</option>
                            <option value="Q&A">Q&A</option>
                            <option value="honeytip">꿀팁</option>
                            <option value="freetalk">자유이야기</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="content" class="form-label">내용</label>
                        <textarea class="form-control" id="content" name="content" rows="5" placeholder="내용을 입력하세요" required></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary">등록</button>
                </form>
            </div>
        </div>
    </div>
</div>

</body>
</html>
