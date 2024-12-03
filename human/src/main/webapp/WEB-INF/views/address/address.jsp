<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="contextPath" value="${pageContext.request.contextPath}" />

<!DOCTYPE html>
<html lang="ko">
<head>
    <!-- CSS 로드 -->
    <link rel="stylesheet" href="${contextPath}/css/address.css" />
    <!-- JS 파일 로드 -->
    <script src="${contextPath}/js/address.js" defer></script>

    <title>주소록</title>
</head>

<body>
    <!-- 공통 헤더&사이드 -->
    <%@ include file="/WEB-INF/views/common/common.jsp" %>

    <div class="address-book">
        <h2>주소록</h2><br>

        <!-- 검색 및 등록 섹션 -->
        <div class="search-register">
            <form method="GET" action="${contextPath}/address/search" onsubmit="return validateSearch();">
                <div class="filter-group">
                    <!-- 기본 필터 -->
                    <select id="category" name="category">
                        <option value="AD_NAME" selected>이름</option>
                        <option value="AD_PHONE">휴대폰</option>
                        <option value="AD_EMAIL">이메일</option>
                        <option value="AD_DEPT_NAME">부서명</option>
                        <option value="AD_GROUP">그룹(별칭)</option>
                    </select>

                    <!-- 검색어 입력 -->
                    <input type="text" id="searchQuery" name="query" placeholder="검색어를 입력하세요" />

                    <!-- 버튼 -->
                    <button type="submit" class="btn-search">조회</button>
                    <button type="button" class="btn-register" onclick="location.href='${contextPath}/address/register'">등록하기</button>
                </div>
            </form>

        </div>

        <!-- 주소록 리스트 -->
        <table class="address-table">
            <thead>
                <tr>
                    <th>ID</th>
<!--                    <th>EMPL_ID</th>-->
                    <th>이름</th>
                    <th>핸드폰</th>
                    <th>이메일</th>
                    <th>부서명</th>
<!--                    <th>회사명</th>-->
                    <th>그룹(별칭)</th>
                </tr>
            </thead>
            <tbody>
                <c:forEach var="address" items="${addressList}">
                    <tr>
                        <td>${address.adId}</td>
<!--                        <td>${address.adEmplId}</td>-->
                        <td>${address.adName}</td>
                        <td>${address.adPhone}</td>
                        <td>${address.adEmail}</td>
                        <td>${address.adDeptName}</td>
                        <td>${address.adGroup}</td>
                    </tr>
                </c:forEach>
                <c:if test="${empty addressList}">
                    <tr>
                        <td colspan="7" style="text-align:center;">데이터가 없습니다.</td>
                    </tr>
                </c:if>
            </tbody>
        </table>

        <!-- 페이지네이션 -->
        <div class="pagination">
            <c:forEach var="page" begin="1" end="${totalPages}">
                <a href="${contextPath}/address?page=${page}" class="${page == currentPage ? 'active' : ''}">${page}</a>
            </c:forEach>
        </div>
    </div>
    </div> <!-- common.jsp에 container의 닫는부분 -->
</body>
</html>
