<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="contextPath" value="${pageContext.request.contextPath}" />

<!DOCTYPE html>
<html lang="ko">
<head>
    <title>주소록</title>
    <link rel="stylesheet" href="${contextPath}/css/address.css" />
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script> <!-- jQuery CDN -->
    <script src="${contextPath}/js/address.js" defer></script>
    <!-- 부트스트랩 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />

    <!-- 부트스트랩 JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</head>

<body>
    <%@ include file="/WEB-INF/views/common/common.jsp" %>

    <div class="address-book">
        <h2>주소록</h2><br>

        <!-- 검색 및 등록 섹션 -->
        <div class="search-register">
            <form id="searchForm">
                <div class="filter-group">
                    <select id="category" name="category">
                        <option value="AD_NAME" selected>이름</option>
                        <option value="AD_PHONE">휴대폰</option>
                        <option value="AD_EMAIL">이메일</option>
                        <option value="AD_DEPT_NAME">부서명</option>
                        <option value="AD_GROUP">그룹(별칭)</option>
                    </select>
                    <input type="text" id="searchQuery" name="query" placeholder="검색어를 입력하세요" />
                    <button type="button" class="btn-search" id="searchBtn">조회</button>
                    <button type="button" class="btn-register" data-bs-toggle="modal" data-bs-target="#registerModal">등록하기</button>
                </div>
            </form>
        </div>

        <!-- 주소록 리스트 -->
        <table class="address-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>이름</th>
                    <th>핸드폰</th>
                    <th>이메일</th>
                    <th>부서명</th>
                    <th>그룹(별칭)</th>
                </tr>
            </thead>
            <tbody id="addressTable">
                <!-- AJAX로 데이터 로드 -->
            </tbody>
        </table>
    </div>
    <!-- 등록 모달 -->
    <div class="modal fade" id="registerModal" tabindex="-1" aria-labelledby="registerModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="registerModalLabel">주소록 등록</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="registerForm" method="POST" action="${contextPath}/addressBook/register">
                        <div class="mb-3">
                            <label for="name" class="form-label">이름</label>
                            <input type="text" class="form-control" id="name" name="name" required />
                        </div>
                        <div class="mb-3">
                            <label for="phone" class="form-label">휴대폰</label>
                            <input type="text" class="form-control" id="phone" name="phone" required />
                        </div>
                        <div class="mb-3">
                            <label for="email" class="form-label">이메일</label>
                            <input type="email" class="form-control" id="email" name="email" required />
                        </div>
                        <div class="mb-3">
                            <label for="department" class="form-label">부서명</label>
                            <input type="text" class="form-control" id="department" name="department" />
                        </div>
                        <div class="mb-3">
                            <label for="company" class="form-label">회사명</label>
                            <input type="text" class="form-control" id="company" name="company" />
                        </div>
                        <div class="mb-3">
                            <label for="group" class="form-label">그룹(별칭)</label>
                            <input type="text" class="form-control" id="group" name="group" />
                        </div>
                        <button type="submit" class="btn btn-primary">등록</button>
                    </form>
                </div>
            </div>
        </div>
    </div>

</body>
</html>
