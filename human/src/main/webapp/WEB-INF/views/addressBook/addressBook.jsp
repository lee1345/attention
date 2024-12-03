<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="contextPath" value="${pageContext.request.contextPath}" />

<!DOCTYPE html>
<html lang="ko">
<head>
    <title>AddressBook</title>
    <!-- 동적 경로로 CSS 로드 -->
    <link rel="stylesheet" href="${contextPath}/css/addressBook.css" />
    <!-- 부트스트랩 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />

    <!-- 부트스트랩 JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

</head>

<body>
    <!-- 공통 헤더&사이드 -->
   <%@ include file="/WEB-INF/views/common/common.jsp" %>

        <div class="address-book">
            <h2>주소록</h2><br>
            <!-- 검색 및 등록 섹션 -->
            <div class="search-register">
                <form method="GET" action="${contextPath}/addressBook/search">
                    <!-- 구분 -->
                    <div class="filter">
                        <div class="filter-group">
                            <label for="category"></label>
                            <select id="category" name="category">
                                <option value="name">이름</option>
                                <option value="phone">휴대폰</option>
                                <option value="email">이메일</option>
                                <option value="department">부서명</option>
                                <option value="company">회사명</option>
                                <option value="byname">그룹(별칭)</option>
                            </select>
                        </div>
                        <!-- 검색창 -->
                        <div class="filter-group">
                            <input type="text" id="searchQuery" name="query" placeholder="검색어를 입력하세요" />
                            <button type="submit" class="btn-search">조회</button>
                            <button type="button" class="btn-register" data-bs-toggle="modal" data-bs-target="#registerModal">등록하기</button>
                        </div>


                    </div>
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
    </div> <!-- common.jsp에 container의 닫는부분 -->

    <!-- 게시글 작성 모달 -->
                            <div class="modal fade" id="registerModal" tabindex="-1" aria-labelledby="registerModalLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <!-- 모달 헤더 -->
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="registerModalLabel">주소록 등록</h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <!-- 모달 바디 -->
                                        <div class="modal-body">
                                            <form id="registerForm" method="POST" action="${contextPath}/addressBook/register">
                                                <div class="mb-3">
                                                    <label for="title" class="form-label">이름</label>
                                                    <input type="text" class="form-control" id="title" name="title" required />
                                                </div>
                                                <div class="mb-3">
                                                    <label for="title" class="form-label">휴대폰</label>
                                                    <input type="number" class="form-control" id="content" name="content" required></textarea>
                                                </div>
                                                <div class="mb-3">
                                                    <label for="title" class="form-label">이메일</label>
                                                    <input type="email" class="form-control" id="content" name="content" required></textarea>
                                                </div>
                                                <div class="mb-3">
                                                    <label for="title" class="form-label">부서명</label>
                                                    <input type="text" class="form-control" id="content" name="content" required></textarea>
                                                </div>
                                                <div class="mb-3">
                                                    <label for="title" class="form-label">회사명</label>
                                                    <input type="text" class="form-control" name="content" required></textarea>
                                                </div>
                                                <div class="mb-3">
                                                    <label for="title" class="form-label">그룹</label>
                                                    <input type="text" class="form-control" id="content" name="content" required></textarea>
                                                </div>
                                                <button type="submit" class="btn btn-primary">추가하기</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
</body>
</html>
