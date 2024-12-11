<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="contextPath" value="${pageContext.request.contextPath}" />

<!DOCTYPE html>
<html lang="ko">
<head>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MY TODO LIST</title>
    <link rel="stylesheet" href="${contextPath}/css/mytodo.css">
</head>
<body>
<!-- 공통 헤더 -->
<%@ include file="/WEB-INF/views/common/common.jsp" %>

<div class="my-layout-container">
    <div class="header_st">
    <header>
        <h1 class="my-page-title">ATTENTION MY TODO-LIST!</h1>
    </header>
    </div>
    <main>
        <!-- 상단 차트 -->
        <div class="my-chart-section">
            <section class="my-chart">

                <div class="my-chart-container">
                    <canvas id="myChart"></canvas>
                </div>
                <ul class="my-chart-legend" id="myLegend">
                    <li><span style="background-color: #FF6384;"></span> 예정: <span>1건</span></li>
                    <li><span style="background-color: #36A2EB;"></span> 진행: <span>1건</span></li>
                    <li><span style="background-color: #FFCE56;"></span> 지연: <span>1건</span></li>
                    <li><span style="background-color: #4BC0C0;"></span> 완료: <span>1건</span></li>
                </ul>
            </section>
           <div class="my-buttons-container">
               <!-- 큰 버튼 -->
               <button class="my-large-button" id="openPopup">나의 할일 <br>등록하기</br></button>

               <!-- 작은 버튼 그룹 -->
               <div class="my-inline-buttons">
                   <button>선택 삭제</button>
                   <button>선택 숨기기</button>
                   <button>숨긴 업무 모두보기</button>
               </div>
           </div>

        </div>

        <!-- 정렬 옵션 -->
        <div class="my-sort-options">
               <button><span class="icon"><i class="fa-solid fa-list"></i></span> 우선순위순</button>
               <button><span class="icon"><i class="fa-solid fa-tasks"></i></span> 진행상황순</button>
               <button><span class="icon"><i class="fa-solid fa-calendar-day"></i></span> 시작일순</button>
               <button><span class="icon"><i class="fa-solid fa-calendar-check"></i></span> 종료일순</button>
        </div>

        <!-- 업무 리스트 -->
        <section class="my-task-list">
            <div class="my-task-item">
                <div class="my-task-checkbox">
                    <input type="checkbox" name="selectedTasks" value="1">
                </div>
                <div class="my-task-content">
                    <h3 class="my-task-title">
                        ⚡ 커버낫 의상 협찬문의, 피팅
                    </h3>
                    <p class="my-task-details">
                        의상협찬 가능여부 연락, 피팅진행<br>
                        (기간) 2024-11-22 ~ 11-27
                    </p>
                </div>
                <div class="my-task-status-buttons">
                    <button class="my-status in-progress">진행</button>
                    <button class="my-status delayed">지연</button>
                    <button class="my-status completed">완료</button>
                </div>
                <div class="my-task-actions">
                    <button class="my-edit">수정</button>
                    <button class="my-delete">삭제</button>
                </div>
            </div>

            <!-- 두 번째 업무 -->
            <div class="my-task-item">
                <div class="my-task-checkbox">
                    <input type="checkbox" name="selectedTasks" value="2">
                </div>
                <div class="my-task-content">
                    <h3 class="my-task-title">
                        📝 신입사원 교육 참여
                    </h3>
                    <p class="my-task-details">
                        준비물: 필기도구!<br>
                        (기간) 2024-11-22 ~ 11-27
                    </p>
                </div>
                <div class="my-task-status-buttons">
                    <button class="my-status in-progress">진행</button>
                    <button class="my-status delayed">지연</button>
                    <button class="my-status completed">완료</button>
                </div>
                <div class="my-task-actions">
                    <button class="my-edit">수정</button>
                    <button class="my-delete">삭제</button>
                </div>
            </div>
        </section>
    </main>
</div>
<!-- 팝업 배경 오버레이 -->
    <div class="popup-overlay" id="popupOverlay"></div>

    <!-- 팝업 -->
    <div class="popup hidden" id="popup">
        <button class="close-btn" id="closePopup">X</button>
        <h2>나의 할일 등록하기</h2>
        <form id="registerForm">
            <label for="title">제목</label>
            <input type="text" id="title" name="title" required /><br>
            <label for="priority">우선순위</label>
            <select class="priority">
                <option value="VU">매우 긴급</option>
                <option value="U">긴급</option>
                <option value="N" selected>보통</option>
                <option value="NU">천천히</option>
            </select>
            <div class="time">
                <label for="start-date">시작</label><br>
                <input type="date" id="start-date" name="start-date" required></input>
                <select name="start-hour" onfocus='this.size=4;' onblur='this.size=1;' onchange='this.size=1; this.blur();'>
                    <option selected>시</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                    <option>11</option>
                    <option>12</option>
                    <option>13</option>
                    <option>14</option>
                    <option>15</option>
                    <option>16</option>
                    <option>17</option>
                    <option>18</option>
                    <option>19</option>
                    <option>20</option>
                    <option>21</option>
                    <option>22</option>
                    <option>23</option>
                </select>
                <select name="start-minute">
                    <option>0</option>
                    <option>30</option>
                </select>
                <br>
                <label for="end-date">종료</label><br>
                <input type="date" id="end-date" name="end-date" required></input>
                <select name="end-hour" onfocus='this.size=4;' onblur='this.size=1;' onchange='this.size=1; this.blur();'>
                    <option selected>시</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                    <option>11</option>
                    <option>12</option>
                    <option>13</option>
                    <option>14</option>
                    <option>15</option>
                    <option>16</option>
                    <option>17</option>
                    <option>18</option>
                    <option>19</option>
                    <option>20</option>
                    <option>21</option>
                    <option>22</option>
                    <option>23</option>
                </select>
                <select name="end-minute">
                    <option selected>분</option>
                    <option>0</option>
                    <option>30</option>
                </select>
            </div>
            <label for="context">내용</label>
            <textarea name="context" cols="50" rows="10" required></textarea>
            <button type="submit" class="submit-btn">등록</button>
        </form>
    </div>
<script src="${contextPath}/js/mytodo.js"></script>
</body>
</html>
