document.addEventListener('DOMContentLoaded', () => {
    // *** 차트 생성 ***
    function createChart(canvasId, legendId, labels, data, colors) {
        const ctx = document.getElementById(canvasId).getContext('2d');
        const chart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: colors
                }]
            },
            options: {
                responsive: false,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        enabled: false
                    }
                }
            },
            plugins: [{
                id: 'textOverlay',
                afterDraw: (chart) => {
                    const ctx = chart.ctx;
                    const dataset = chart.data.datasets[0];

                    dataset.data.forEach((value, index) => {
                        if (value === 0) return;

                        const meta = chart.getDatasetMeta(0).data[index];
                        const { x, y } = meta.tooltipPosition();

                        ctx.save();
                        ctx.fillStyle = "black";
                        ctx.font = 'bold 14px Arial';
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';
                        ctx.fillText(`${value}건`, x, y);
                        ctx.restore();
                    });
                }
            }]
        });

        // 범례 동적 생성
        const legendContainer = document.getElementById(legendId);
        legendContainer.innerHTML = labels.map((label, index) => `
            <div style="display: flex; align-items: center; margin-bottom: 5px;">
                <span
                    style="
                        display: inline-block;
                        background-color: ${colors[index]};
                        width: 12px;
                        height: 12px;
                        border-radius: 50%;
                        margin-right: 8px;">
                </span>
                <span style="margin-right: 10px; font-weight: bold;">${label}</span>
                <button
                    style="
                        margin-left:15px;
                        font-size: 18px;
                        background: none;
                        border: none;
                        padding: 0;
                        margin: 0;
                        color: ${colors[index]};
                        text-decoration: underline;
                        cursor: pointer;"
                    onclick="onButtonClick('${label}', ${data[index]})"
                >
                    ${data[index]}건
                </button>
            </div>
        `).join('');

        return chart;
    }

    // 부서 업무 현황 차트 생성
    createChart(
        'departmentChart',
        'departmentLegend',
        ['예정', '진행지연', '진행중', '완료지연', '완료'],
        stageCounts,
        ['#FF6384', '#36A2EB', '#FFCE56', '#FFA07A', '#90EE90']
    );

    // 나의 업무 참여 현황 차트 생성
    createChart(
        'myTaskChart',
        'myTaskLegend',
        ['예정', '진행지연', '진행중', '완료지연', '완료'],
        [1, 2, 1, 1, 1],
        ['#FF6384', '#36A2EB', '#FFCE56', '#FFA07A', '#90EE90']
    );

    // *** 모달 관련 코드 ***
    const openModalButton = document.querySelector('.btn-open-register-modal'); // 버튼
    const modal = document.querySelector('.popup'); // 모달
    const closeModalButton = document.querySelector('.close-btn'); // 닫기 버튼

    // 오버레이 추가
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    document.body.appendChild(overlay);

    // 모달 열기 이벤트
    openModalButton.addEventListener('click', () => {
        modal.style.display = 'block';
        overlay.style.display = 'block';
    });

    // 모달 닫기 이벤트
    const closeModalButtons = document.querySelectorAll('.btn-modal-close');

    // 각 닫기 버튼에 이벤트 리스너 추가
    closeModalButtons.forEach((button) => {
        button.addEventListener('click', () => {
            console.log('닫기 버튼 클릭됨'); // 디버깅용 로그

            // 닫기 버튼이 속한 모달만 닫기
            const parentModal = button.closest('.popup, .participant-popup');
            if (parentModal) {
                parentModal.style.display = 'none';
            }

            // 오버레이 숨기기
            document.querySelector('.modal-overlay').style.display = 'none';
        });
    });



    // "추가하기" 버튼 클릭 시 이벤트 처리
    const addButton = modal.querySelector('button:last-of-type'); // '추가하기' 버튼
    addButton.addEventListener('click', () => {
        const title = modal.querySelector('input[type="text"]').value;
        const importance = modal.querySelector('select:nth-of-type(1)').value;
        const status = modal.querySelector('select:nth-of-type(2)').value;
        const date = modal.querySelector('input[type="date"]').value;
        const hour = modal.querySelector('select:nth-of-type(3)').value;
        const minute = modal.querySelector('select:nth-of-type(4)').value;
        const content = modal.querySelector('textarea').value;

        console.log({
            title,
            importance,
            status,
            date,
            hour,
            minute,
            content,
        });

        // 모달 닫기 및 초기화
        modal.style.display = 'none';
        overlay.style.display = 'none';
        modal.querySelectorAll('input, textarea, select').forEach((input) => {
            if (input.type === 'text' || input.type === 'date' || input.tagName === 'TEXTAREA') {
                input.value = '';
            } else if (input.tagName === 'SELECT') {
                input.selectedIndex = 0;
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
// 참여자 팝업 열기 버튼
document.getElementById('open-participant-popup').addEventListener('click', () => {
        console.log('버튼 클릭됨');
        const popup = document.getElementById('participant-popup');
        popup.classList.remove('hidden');
        popup.classList.add('visible');

});

// 닫기 버튼으로 팝업 숨기기
document.querySelectorAll('.btn-modal-close').forEach(button => {
    button.addEventListener('click', () => {
           const popup = button.closest('#participant-popup');
           popup.classList.add('hidden');
           popup.classList.remove('visible');
    });
});

// 참여자 선택 완료 버튼
document.getElementById('close-participant-popup').addEventListener('click', () => {
    const checkboxes = document.querySelectorAll('#participant-list input[type="checkbox"]');
    let selectedParticipants = [];

    // 선택된 체크박스에서 참여자 이름 가져오기
    checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
            selectedParticipants.push(participants[index].name);
        }
    });

    // 최대 선택 인원 제한 확인
    if (selectedParticipants.length > 5) {
        alert('최대 5명까지만 선택할 수 있습니다.');
        return;
    }

    // 선택된 참여자 표시 업데이트
    updateSelectedParticipantsDisplay(selectedParticipants);

    // 팝업 닫기
    const popup = document.getElementById('participant-popup'); // 팝업 ID 가져오기
    popup.classList.add('hidden'); // 숨김 클래스 추가
    popup.classList.remove('visible'); // 보임 클래스 제거
});

// 선택 초기화 버튼 추가 로직
document.getElementById('reset-participant-selection').addEventListener('click', () => {
    const checkboxes = document.querySelectorAll('#participant-list input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
        checkbox.checked = false; // 모든 체크박스 선택 해제
    });

    updateSelectedParticipantsDisplay([]); // 선택된 참여자 초기화
    alert('선택이 초기화되었습니다.');
});

// 선택된 참여자 표시 업데이트
function updateSelectedParticipantsDisplay(selectedParticipants) {
    const participantDisplay = document.getElementById('selected-participants');
    participantDisplay.textContent = selectedParticipants.join(', ') || '선택된 참여자가 없습니다.';
}

// 샘플 참여자 데이터
const participants = [
    { department: '인사팀', name: '김혜민', position: '이사' },
    { department: '인사팀', name: '이정규', position: '부장' },
    { department: '인사팀', name: '이태웅', position: '과장' },
    { department: '인사팀', name: '전지훈', position: '대리' },
    { department: '인사팀', name: '강순구', position: '사원' },
    { department: '인사팀', name: '김길동', position: '인턴' },
];

const participantList = document.getElementById('participant-list');

// 참여자 목록 채우기
participants.forEach(participant => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td><input type="checkbox"></td>
        <td>${participant.department}</td>
        <td>${participant.name}</td>
        <td>${participant.position}</td>
    `;
    participantList.appendChild(row);
});

});
// 팝업 열기
function openPopup(title, status) {
    document.getElementById('taskTitle').value = title;
    document.getElementById('taskStatus').value = status;
    document.getElementById('editPopup').style.display = 'block';
}

// 팝업 닫기
function closePopup() {
    document.getElementById('editPopup').style.display = 'none';
}

// 변경 저장
function saveChanges() {
    const updatedTitle = document.getElementById('taskTitle').value;
    const updatedStatus = document.getElementById('taskStatus').value;

    console.log('수정된 내용:', updatedTitle, updatedStatus);
    alert('수정이 완료되었습니다!');

    // 실제 데이터 업데이트 처리는 여기에 구현
    closePopup();
}

// =====================================================


function sortTable(column) {
    const currentOrder = sessionStorage.getItem("sortOrder") || "ASC";
    const newOrder = currentOrder === "ASC" ? "DESC" : "ASC";
    sessionStorage.setItem("sortOrder", newOrder);

    const url = `/todo?sortField=${column}&sortOrder=${newOrder}`;
    window.location.href = url; // 서버에 정렬 요청
}

document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.querySelector('form');
    const taskType = document.getElementById('taskType');
    const searchInput = document.getElementById('searchInput');

    // 검색 버튼 클릭 시 입력값 검증
    searchForm.addEventListener('submit', (e) => {
        // 'title' 또는 'master' 선택 시 검색어가 비어 있으면 알림창 표시
        if ((taskType.value === 'title' || taskType.value === 'master') && searchInput.value.trim() === '') {
            alert('검색 내용을 입력하세요.');
            e.preventDefault(); // 폼 전송 중지
        }

        // 'total' 선택 시 검색어는 없어도 됨 (서버에서 전체 데이터 반환)
        if (taskType.value === 'total') {
            console.log('전체 검색: 검색어 없이도 요청 가능');
        }
    });
});
