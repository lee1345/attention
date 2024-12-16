
// 공통 함수: 차트 생성 및 범례 동적 생성
function createChart(canvasId, legendId, labels, data, colors) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
        console.error(`Canvas with id "${canvasId}" not found!`);
        return;
    }

    const ctx = canvas.getContext('2d');


    // 캔버스 크기 설정
    canvas.width = 300;  // 차트 너비
    canvas.height = 300; // 차트 높이

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
            alert('나의 할일 등록이 완료되었습니다!');
            location.reload();
        },
        error: function () {
            alert('나의 할일 등록 요청 처리 중 문제가 발생했습니다. 입력 정보를 확인한 후 다시 시도해 주세요.');
        }
    });
});

function mapPriorityText(priority) {
    switch (priority) {
        case "VU":
            return `<i class="fa-solid fa-angles-up" style="color: red;"></i> [매우 긴급]`;
        case "U":
            return `<i class="fa-solid fa-angle-up" style="color: orange;"></i> [긴급]`;
        case "N":
            return `<i class="fa-solid fa-minus" style="color: green;"></i> [보통]`;
        case "L":
            return `<i class="fa-solid fa-angle-down" style="color: blue;"></i> [천천히]`;
        default:
            return `<i class="fa-solid fa-question" style="color: gray;"></i> [미정]`;
    }
}


document.addEventListener("DOMContentLoaded", function () {
    updateChartData()
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

                // 우선순위 변환
                const priorityText = mapPriorityText(todo.t_priority);

                // 할일 항목 생성
                const taskItem = `
                    <div class="my-task-item">
                        <div class="my-task-checkbox">
                            <input type="checkbox" name="selectedTasks" value="${todo.t_id}" id="task-${index}">
                            <label for="task-${index}"></label>
                        </div>
                        <div class="my-task-content">
                            <h3 class="my-task-title">${priorityText} ${todo.t_title}</h3>
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
                            <button class="my-edit" onclick="openEditPopup(${todo.t_id})">수정</button>
                            <button class="my-delete" onclick="deleteTodo(${todo.t_id})">삭제</button>
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
            location.reload();
            // 상태 업데이트 후 동작 필요 시 추가
        },
        error: function (xhr) {
            alert('상태 업데이트에 실패했습니다.');
            console.error(xhr.responseText);
        }
    });
}

// 할일 삭제
function deleteTodo(t_id) {
        $.ajax({
            url: '/mytodo/deleteTodo',
            type: 'DELETE',
            data: { t_id: t_id }, // 올바른 t_id 전달
            success: function(response) {
                console.log('삭제 성공!');
                location.reload(); // 새로고침 또는 해당 항목 제거
            },
            error: function(xhr) {
                console.error('삭제 실패: ' + xhr.responseText);
            }
        });

}

// 정렬기능
function sortTasks(sortType) {
    $.ajax({
        url: `/mytodo/sort`,
        method: 'GET',
        data: { sortType: sortType },
        success: function (sortedTodos) {
            const taskList = document.querySelector(".my-task-list");
            taskList.innerHTML = ''; // 기존 데이터 제거

            sortedTodos.forEach((todo, index) => {
                // 정렬된 데이터 렌더링
                const priorityText = mapPriorityText(todo.t_priority); // 우선순위 변환

                const planActive = todo.t_stage === "P" ? "active" : "";
                const inProgressActive = todo.t_stage === "IP" ? "active" : "";
                const completeActive = todo.t_stage === "C" ? "active" : "";

                const taskItem = `
                    <div class="my-task-item">
                        <div class="my-task-checkbox">
                            <input type="checkbox" name="selectedTasks" value="${todo.t_id}" id="task-${index}">
                            <label for="task-${index}"></label>
                        </div>
                        <div class="my-task-content">
                            <h3 class="my-task-title">${priorityText} ${todo.t_title}</h3>
                            <p class="my-task-details">
                                ${todo.t_content}<br>
                                (기간) ${todo.t_start_date} ~ ${todo.t_end_date}
                            </p>
                        </div>
                        <div class="my-task-status-buttons">
                            <button class="my-status Plan ${planActive}" value="P" onclick="updateStage(this, '${todo.t_id}')">예정</button>
                            <button class="my-status InProgress ${inProgressActive}" value="IP" onclick="updateStage(this, '${todo.t_id}')">진행</button>
                            <button class="my-status Complete ${completeActive}" value="C" onclick="updateStage(this, '${todo.t_id}')">완료</button>
                        </div>
                        <div class="my-task-actions">
                            <button class="my-edit" onclick="openEditPopup(${todo.t_id})">수정</button>
                            <button class="my-delete" onclick="deleteTodo('${todo.t_id}')">삭제</button>
                        </div>
                    </div>`;
                taskList.innerHTML += taskItem;
            });
        },
        error: function (xhr) {
            console.error("정렬 실패:", xhr.responseText);
            alert("정렬 중 문제가 발생했습니다.");
        }
    });
}

//선택 숨기기, 삭제, 숨기기취소

// 체크된 항목의 ID 배열 가져오기
function getSelectedIds() {
    const checkboxes = document.querySelectorAll("input[name='selectedTasks']:checked");
    return Array.from(checkboxes).map(checkbox => checkbox.value);
}
// 배치 작업 처리 함수
function handleBatchAction(actionType) {
    let url, successMessage, requestData;

    switch (actionType) {
        case 'delete':
            const selectedIds = getSelectedIds();
            if (selectedIds.length === 0) {
                alert("항목을 선택하세요.");
                return;
            }
            url = '/mytodo/deleteSelected';
            requestData = JSON.stringify(selectedIds); // 선택된 항목만 전송
            break;

        case 'hide':
            const idsToHide = getSelectedIds();
            if (idsToHide.length === 0) {
                alert("항목을 선택하세요.");
                return;
            }
            url = '/mytodo/hideSelected';
            requestData = JSON.stringify(idsToHide); // 선택된 항목만 전송
            break;

        case 'unhide':
            url = '/mytodo/unhideAll'; // 모든 숨기기를 취소
            requestData = null; // 선택된 항목 필요 없음
            break;

        default:
            return;
    }

    // AJAX 요청
    $.ajax({
        url: url,
        method: 'POST',
        contentType: 'application/json',
        data: requestData,
        success: function () {
            location.reload(); // 페이지 새로고침
        },
        error: function (xhr) {
            alert("작업에 실패했습니다: " + xhr.responseText);
        }
    });
}
// 수정 팝업 열기
function openEditPopup(t_id) {
    $.ajax({
        url: `/mytodo/getTodo`,
        method: 'GET',
        data: { t_id },
        success: function (todo) {
            if (!todo) {
                alert('데이터를 불러오지 못했습니다.');
                return;
            }

            // 기존 데이터로 팝업 채우기
            $('#edit-t-id').val(todo.t_id || '');
            $('#edit-title').val(todo.t_title || '');
            $('#edit-content').val(todo.t_content || '');

            // 팝업 열기
            $('#editPopupOverlay').show();
            $('#editPopup').show();
        },
        error: function () {
            alert('데이터를 불러오지 못했습니다.');
        },
    });
}

// 팝업 닫기
$('#closeEditPopup').on('click', function () {
    $('#editPopupOverlay').hide();
    $('#editPopup').hide();
});

// 수정 데이터 전송
$('#editForm').submit(function (event) {
    event.preventDefault();

    const formData = {
        t_id: $('#edit-t-id').val(),
        t_title: $('#edit-title').val(),
        t_priority: $('#edit-priority').val(),
        t_content: $('#edit-content').val(),
        t_start_date: $('#edit-start-date').val() + ' ' + $('select[name="edit-start-hour"]').val() + ':' + $('select[name="edit-start-minute"]').val(),
        t_end_date: $('#edit-end-date').val() + ' ' + $('select[name="edit-end-hour"]').val() + ':' + $('select[name="edit-end-minute"]').val(),


    };

    $.ajax({
        url: '/mytodo/updateTodo',
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(formData),
        success: function () {
            alert('수정 완료!');
            $('#editPopupOverlay').hide();
            $('#editPopup').hide();
            location.reload(); // 새로고침
        },
        error: function () {
            alert('수정 실패.');
        },
    });
});

// t_stage 값 카운트 및 차트 업데이트
function updateChartData() {
    $.ajax({
        url: '/mytodo/list',
        method: 'GET',
        success: function (todos) {
            // t_stage 값 카운트
            const stageCounts = { P: 0, IP: 0, C: 0 };
            todos.forEach(todo => {
                if (stageCounts.hasOwnProperty(todo.t_stage)) {
                    stageCounts[todo.t_stage]++;
                }
            });


            // 차트 데이터 생성
            const chartLabels = ['예정', '진행', '완료'];
            const chartData = [stageCounts.P, stageCounts.IP, stageCounts.C];
            const chartColors = ['#FF6384', '#FFCE56', '#90EE90'];



            // 차트 업데이트
            createChart('myChart', 'myLegend', chartLabels, chartData, chartColors);
        },
        error: function () {
            console.error("차트 데이터를 불러오는 데 실패했습니다.");
        }
    });
}