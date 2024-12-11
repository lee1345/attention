// 공통 함수: 차트 생성 및 범례 동적 생성
function createChart(canvasId, legendId, labels, data, colors) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
        console.error(`Canvas with id "${canvasId}" not found!`);
        return;
    }

    const ctx = canvas.getContext('2d');

    // 캔버스 크기 설정
    canvas.width = 400;  // 차트 너비
    canvas.height = 400; // 차트 높이

    const chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [
                {
                    data: data,
                    backgroundColor: colors,
                },
            ],
        },
        options: {
            responsive: true, // 반응형 활성화
            maintainAspectRatio: true, // 비율 유지
            plugins: {
                legend: {
                    display: false, // 기본 범례 비활성화
                },
                tooltip: {
                    enabled: true, // 툴팁 활성화
                },
            },
        },
        plugins: [
            {
                id: 'textOverlay',
                afterDraw: (chart) => {
                    const ctx = chart.ctx;
                    const dataset = chart.data.datasets[0];

                    dataset.data.forEach((value, index) => {
                        if (value === 0) return; // 값이 0이면 렌더링하지 않음

                        const meta = chart.getDatasetMeta(0).data[index];
                        const { x, y } = meta.tooltipPosition();

                        // 텍스트 스타일 설정
                        ctx.save();
                        ctx.fillStyle = "black"; // 텍스트 색상
                        ctx.font = 'bold 14px Arial'; // 텍스트 폰트
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';

                        // 텍스트 그리기
                        ctx.fillText(`${value}건`, x, y);
                        ctx.restore();
                    });
                },
            },
        ],
    });

    // 범례 동적 생성
    const legendContainer = document.getElementById(legendId);
    if (!legendContainer) {
        console.error(`Legend container with id "${legendId}" not found!`);
        return;
    }

    legendContainer.innerHTML = labels
        .map(
            (label, index) => `
            <li style="display: flex; align-items: center; margin-bottom: 5px;">
                <span style="
                    display: inline-block;
                    width: 20px
                    height: 20px;
                    background-color: ${colors[index]};
                    margin-right: 8px;
                    border-radius: 50%;"></span>
                <span style="font-size: 15px; font-weight: bold; color: #333;">
                    ${label}:
                </span>
                <button
                    style="
                        margin-left: 10px;
                        font-size: 18px; /* 텍스트 크기 키우기 */
                        background: none;
                        border: none;
                        padding: 0;
                        color: ${colors[index]};
                        text-decoration: underline;
                        cursor: pointer;"
                    onclick="onButtonClick('${label}', ${data[index]})"
                >
                    ${data[index]}건
                </button>
            </li>
        `
        )
        .join('');
}

// 버튼 클릭 핸들러 (현재는 동작 없음)
function onButtonClick(label, value) {
    console.log(`${label}에서 ${value}건 클릭`);
}

// "나의 업무 현황" 차트 생성 호출
createChart(
    'myChart', // JSP 파일의 캔버스 ID와 동일하게 수정
    'myLegend', // JSP 파일의 범례 컨테이너 ID
    ['예정', '진행지연', '진행중', '완료지연', '완료'], // 범례 라벨
    [2, 0, 1, 0, 1], // 데이터
    ['#FF6384', '#36A2EB', '#FFCE56', '#FFA07A', '#90EE90'] // 색상 배열
);
// 요소 선택
const openPopupBtn = document.getElementById('openPopup');
const closePopupBtn = document.getElementById('closePopup');
const popupOverlay = document.getElementById('popupOverlay');
const popup = document.getElementById('popup');

// 팝업 열기
openPopupBtn.addEventListener('click', () => {
    popupOverlay.style.display = 'block';
    popup.style.display = 'block';
});

// 팝업 닫기
closePopupBtn.addEventListener('click', () => {
    popupOverlay.style.display = 'none';
    popup.style.display = 'none';
});

// 팝업 외부 클릭 시 닫기
popupOverlay.addEventListener('click', () => {
    popupOverlay.style.display = 'none';
    popup.style.display = 'none';
});


//할일등록 ajax
$('#registerForm').submit(function (event) {
    event.preventDefault();

    const formData = {
        t_group: 'M',
        t_title: $('#title').val(),
        t_priority: $('.priority').val(),
        t_content: $('textarea[name="context"]').val(),
        t_start_date: $('#start-date').val() + ' ' + $('select[name="start-hour"]').val() + ':' + $('select[name="start-minute"]').val(),
        t_end_date: $('#end-date').val() + ' ' + $('select[name="end-hour"]').val() + ':' + $('select[name="end-minute"]').val(),
        t_hide: 'N',
        t_created_id: sessionStorage.getItem('user_id') || null // Session에서 가져오기
    };

    $.ajax({
        url: '/mytodo/addTodo',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(formData),
        success: function (response) {
            alert('등록 성공!');
            location.reload();
        },
        error: function () {
            alert('등록 실패');
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // 기본 날짜 설정
    const today = new Date().toISOString().split('T')[0];
    document.getElementById("start-date").value = today;
    document.getElementById("end-date").value = today;

    // 할일 조회 AJAX
    $.ajax({
        url: '/mytodo/list',
        method: 'GET',
        success: function (todos) {
            console.log(todos);
            const taskList = document.querySelector(".my-task-list");
            taskList.innerHTML = ''; // 기존 내용 제거

            todos.forEach((todo, index) => {
                // 상태에 따른 버튼 활성화
                const planActive = todo.t_stage === "P" ? "active" : "";
                const inProgressActive = todo.t_stage === "IP" ? "active" : "";
                const completeActive = todo.t_stage === "C" ? "active" : "";

                // NULL 상태 처리: 버튼 모두 비활성화 (흰색 배경)
                const nullState = !todo.t_stage ? "not-selected" : "";

                // 할일 항목 생성
                const taskItem = `
                    <div class="my-task-item">
                        <div class="my-task-checkbox">
                            <input type="checkbox" name="selectedTasks" value="${todo.t_id}" id="task-${index}">
                            <label for="task-${index}"></label>
                        </div>
                        <div class="my-task-content">
                            <h3 class="my-task-title">${todo.t_priority} ${todo.t_title}</h3>
                            <p class="my-task-details">
                                ${todo.t_content}<br>
                                (기간) ${todo.t_start_date} ~ ${todo.t_end_date}
                            </p>
                        </div>
                        <div class="my-task-status-buttons ${nullState}">
                            <button class="my-status Plan ${planActive}" value="P" onclick="updateStage(this, '${todo.t_id}')">예정</button>
                            <button class="my-status InProgress ${inProgressActive}" value="IP" onclick="updateStage(this, '${todo.t_id}')">진행</button>
                            <button class="my-status Complete ${completeActive}" value="C" onclick="updateStage(this, '${todo.t_id}')">완료</button>
                        </div>
                        <div class="my-task-actions">
                            <button class="my-edit">수정</button>
                            <button class="my-delete">삭제</button>
                        </div>
                    </div>`;
                taskList.innerHTML += taskItem;
            });
        },
        error: function (xhr, status, error) {
            console.error("할일 조회 에러:", error);
            alert("로그인을 해야지만 데이터 조회가 가능합니다.");
        }
    });
});

//버튼으로 status 수정
// 상태 변경 버튼 클릭 이벤트
function updateStage(button, todoId) {
    const stageValue = button.value;

    // 모든 버튼의 active 클래스를 제거
    const buttons = button.parentElement.querySelectorAll('.my-status');
    buttons.forEach(btn => btn.classList.remove('active'));

    // 선택된 버튼에 active 클래스 추가
    button.classList.add('active');

    // AJAX 요청으로 상태 업데이트
    $.ajax({
        url: '/mytodo/updateStage',
        method: 'POST',
        data: {
            t_id: todoId,
            t_stage: stageValue
        },
        success: function () {
            console.log('상태가 성공적으로 업데이트되었습니다!');
            // 상태 업데이트 후 동작 필요 시 추가
        },
        error: function (xhr) {
            alert('상태 업데이트에 실패했습니다.');
            console.error(xhr.responseText);
        }
    });
}
