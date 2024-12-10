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

    // 오버레이 클릭 시 모달 닫기
    overlay.addEventListener('click', () => {
        modal.style.display = 'none';
        overlay.style.display = 'none';
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
