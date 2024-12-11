<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="contextPath" value="${pageContext.request.contextPath}" />

<!DOCTYPE html>
<html lang="ko">
<head>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script> <!-- jQuery CDN -->
    <link rel="stylesheet" href="${contextPath}/css/address.css" />
    <script src="${contextPath}/js/address.js" defer></script>
    <title>주소록</title>
    <script>
        const loggedInUser = "${employee.e_id}"; // 로그인한 사용자 ID를 JavaScript로 전달
    </script>
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
                    <input type="text" id="query" name="query" placeholder="검색어를 입력하세요" />
                    <button type="button" class="btn-search" id="searchBtn">조회</button>
                    <button type="button" class="btn-register btn btn-primary">등록하기</button>
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
                <th>그룹(별칭)</th>
            </tr>
            </thead>
            <tbody id="addressTable">
            <!-- AJAX로 데이터 로드 -->
            </tbody>
        </table>
    </div>
</div> <!-- common.jsp에 container의 닫는부분 -->

<!-- 팝업 배경 오버레이 -->
<div class="popup-overlay" id="popupOverlay"></div>

<!-- 팝업 등록 -->
<div class="popup hidden" id="popup">
    <button class="close-btn" id="closePopup">X</button>
    <h2>주소록 등록</h2>
    <form id="registerForm">
        <label for="formName">이름</label>
        <input type="text" id="formName" name="formName" required /><br>
        <label for="formPhone">핸드폰</label>
        <input type="text" id="formPhone" name="formPhone" required /><br>
        <label for="formEmail">이메일</label>
        <input type="email" id="formEmail" name="formEmail" required /><br>
        <label for="formDept">부서명</label>
        <input type="text" id="formDept" name="formDept" /><br>
        <label for="formGroup">그룹(별칭)</label>
        <input type="text" id="formGroup" name="formGroup" /><br>
        <button type="submit" class="submit-btn">등록</button>
    </form>
</div>

<!-- 내용 팝업 -->
<div class="popup hidden" id="addressPopup">
    <button class="close-btn" id="closeAddressPopup">X</button>
    <h2>주소록</h2>
    <div id="registerForm">
        <label for="popupAddressName">이름</label>
        <div id="popupAddressName"/></div>
        <label for="popupAddressPhone">핸드폰</label>
        <div id="popupAddressPhone"/></div>
        <label for="popupAddressEmail">이메일</label>
        <div id="popupAddressEmail"/></div>
        <label for="popupAddressDeptName">부서명</label>
        <div id="popupAddressDeptName"/></div>
        <label for="popupAddressGroup">그룹(별칭)</label>
        <div id="popupAddressGroup"/></div>

        <!-- 수정/삭제 버튼 -->
        </div>
        <div class="action-buttons">
            <button class="edit-btn" data-id="${address.adId}">수정</button>
            <button class="delete-btn" data-id="${address.adId}">삭제</button>
        </div>
    </div>
</div>

<!-- 수정 팝업 -->
<div class="popup hidden" id="editPopup">
    <button class="close-btn" id="closeEditPopup">X</button>
    <h2>게시글 수정</h2>
    <form id="editForm">
        <div class="form-row">
            <!-- 제목 입력 -->
            <div class="form-group">
                <label for="popupAddressName">이름</label>
                <div id="popupAddressName"/></div>
                <label for="popupAddressPhone">핸드폰</label>
                <div id="popupAddressPhone"/></div>
                <label for="popupAddressEmail">이메일</label>
                <div id="popupAddressEmail"/></div>
                <label for="popupAddressDeptName">부서명</label>
                <div id="popupAddressDeptName"/></div>
                <label for="popupAddressGroup">그룹(별칭)</label>
                <div id="popupAddressGroup"/></div>
            </div>
        </div>
        <button type="editBtn" class="submit-btn">저장</button>
    </form>
</div>
</body>
</html>
