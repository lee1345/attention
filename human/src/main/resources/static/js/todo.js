let selectedParticipants = [];
let edit_t_id = "";

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
                               margin-right: 8px;
                               flex-shrink: 0; /* 아이콘 크기 고정 */
                           ">

                </span>

                 <span
                        style="
                            margin-right: 10px;
                            font-weight: bold;
                            white-space: nowrap; /* 줄바꿈 방지 */
                        ">
                        ${label}
                    </span>

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
                        cursor: pointer;
                        white-space: nowrap; /* 버튼 내부 줄바꿈 방지 */
                        "
                    onclick="onButtonClick('${label}', ${data[index]})"
                >
                    ${data[index]}건
                </button>
            </div>
        `).join('');

        return chart;
    }

    console.log('stageCounts', stageCounts);

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
        myStageCounts,
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
   // *** 추가하기 버튼 이벤트 ***
       const addButton = document.getElementById('add-task-button'); // 버튼 ID로 가져옴
       const titleInput = document.getElementById('title'); // 제목 입력 필드
       const priorityInput = document.getElementById('t-priority'); // 중요도 입력 필드
       const stageInput = document.getElementById('t-stage'); // 진행 상황 입력 필드
       const startDateInput = document.getElementById('start-date'); // 시작 날짜 필드
       const endDateInput = document.getElementById('end-date'); // 종료 날짜 필드
       const contentInput = document.getElementById('content'); // 내용 입력 필드
       const participantList = document.getElementById('participant-list'); // 참여자 체크박스 리스트

       addButton.addEventListener('click', () => {
           const title = titleInput.value.trim();
           const priority = priorityInput.value;
           const stage = stageInput.value;
           const startDate = startDateInput.value;
           const endDate = endDateInput.value;
           const content = contentInput.value.trim();

           // 데이터 검증
           if (!title || !priority || !stage) {
               alert('모든 필드를 입력해주세요.');
               return;
           }

           // 선택된 참여자 데이터 가져오기
//           const checkboxes = participantList.querySelectorAll('input[type="checkbox"]:checked');
//           const selectedParticipants = Array.from(checkboxes).map((checkbox) => checkbox.dataset.name);

           // 최대 선택 인원 제한
           if (selectedParticipants.length > 5) {
               alert('참여자는 최대 5명까지만 선택할 수 있습니다.');
               return;
           }

           console.log(selectedParticipants);

           // 요청 데이터 생성
           const requestData = {
               t_title: title,
               t_priority: priority,
               t_stage: stage,
               t_start_date: startDate,
               t_end_date: endDate,
               t_content: content,
               participants: selectedParticipants, // 선택된 참여자
           };

            // 커스텀 팝업 열기 함수
            function openCustomPopup(message) {
                document.getElementById('popup-message').innerText = message;
                document.getElementById('custom-popup').style.display = 'block';
                 document.getElementById('popup-overlay').classList.remove('hidden'); // 오버레이 표시
            }

            // 커스텀 팝업 닫기 함수
            function closeCustomPopup() {
                document.getElementById('custom-popup').style.display = 'none';
                 document.getElementById('popup-overlay').classList.add('hidden'); // 오버레이 숨기기
            }



           // 서버에 데이터 전송 업무등록
           fetch('/api/todo/todos', {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify(requestData),
           })
               .then((response) => response.json())
               .then((data) => {
                   console.log('서버 응답:', data);
                    if (data.status === 'success') {
                              openCustomPopup('업무가 성공적으로 추가되었습니다!');

                              // 모달 닫기 및 폼 초기화
                              document.getElementById('task-popup').style.display = 'none';
                              document.querySelector('.modal-overlay').style.display = 'none';
                              document.getElementById('t-registerForm').reset();

                              setTimeout(() => location.reload(true), 1000); // 1초 후 새로고침
                          } else {
                              openCustomPopup('업무 추가에 실패했습니다.');
                          }
                      })
               .catch((error) => {
                   console.error('요청 실패:', error);
                   alert('오류가 발생했습니다.');
               });
       });



       /////////////////////////////////////

       ///////// 수정하기 ///////////////////////
         const editButton = document.getElementById('save-changes-button'); // 버튼 ID로 가져옴
         const editTitleInput = document.getElementById('edit-title'); // 제목 입력 필드
         const editPriorityInput = document.getElementById('edit-priority'); // 중요도 입력 필드
         const editStageInput = document.getElementById('edit-stage'); // 진행 상황 입력 필드
         const editStartDateInput = document.getElementById('edit-start-date'); // 시작 날짜 필드
         const editEndDateInput = document.getElementById('edit-end-date'); // 종료 날짜 필드
         const editContentInput = document.getElementById('edit-content'); // 내용 입력 필드
         const editParticipantList = document.getElementById('edit-participant-list'); // 참여자 체크박스 리스트

        editButton.addEventListener('click', () => {
                               const title = editTitleInput.value.trim();
                               const priority = editPriorityInput.value;
                               const stage = editStageInput.value;
                               const startDate = editStartDateInput.value;
                               const endDate = editEndDateInput.value;
                               const content = editContentInput.value.trim();

                               console.log(title, priority, stage, startDate, endDate, content);

                               // 데이터 검증
                               if (!title || !priority || !stage) {
                                   alert('모든 필드를 입력해주세요.');
                                   return;
                               }

                               // 최대 선택 인원 제한
                               if (selectedParticipants.length > 5) {
                                   alert('참여자는 최대 5명까지만 선택할 수 있습니다.');
                                   return;
                               }

                               console.log(selectedParticipants);

                               // 요청 데이터 생성
                               const requestData = {
                                   t_id: edit_t_id,
                                   t_title: title,
                                   t_priority: priority,
                                   t_stage: stage,
                                   t_start_date: startDate,
                                   t_end_date: endDate,
                                   t_content: content,
                                   participants: selectedParticipants, // 선택된 참여자
                               };

                                 function openCustomPopup(message) {
                                                document.getElementById('popup-message').innerText = message;
                                                document.getElementById('custom-popup').style.display = 'block';
                                                 document.getElementById('popup-overlay').classList.remove('hidden'); // 오버레이 표시
                                            }

                                            // 커스텀 팝업 닫기 함수
                                            function closeCustomPopup() {
                                                document.getElementById('custom-popup').style.display = 'none';
                                                 document.getElementById('popup-overlay').classList.add('hidden'); // 오버레이 숨기기
                                            }


                               // 서버에 데이터 전송 업무 수정
                               fetch('/api/todo/update-todos', {
                                   method: 'PUT',
                                   headers: { 'Content-Type': 'application/json' },
                                   body: JSON.stringify(requestData),
                               })
                                   .then((response) => response.json())
                                   .then((data) => {
                                       console.log('서버 응답:', data);
                                       if (data.status === 'success') {
                                                                    openCustomPopup('업무가 성공적으로 수정되었습니다!');

                                                                    // 모달 닫기 및 폼 초기화
                                                                    document.getElementById('task-popup').style.display = 'none';
                                                                    document.querySelector('.modal-overlay').style.display = 'none';
                                                                    document.getElementById('t-registerForm').reset();

                                                                    setTimeout(() => location.reload(true), 1000); // 1초 후 새로고침
                                                                } else {
                                                                    openCustomPopup('업무 수정에 실패했습니다.');
                                                                }
                                   })
                                   .catch((error) => {
                                       console.error('요청 실패:', error);
                                       alert('오류가 발생했습니다.');
                                   });
                           });



    // 매우긴급, 긴급 아이콘 추가 코드
    const priorityRows = document.querySelectorAll('.priority-cell'); // 우선순위 셀 선택

    priorityRows.forEach((cell) => {
        const priorityText = cell.querySelector('.priority-label').textContent.trim();
        const iconSpan = cell.querySelector('.priority-icon'); // 아이콘 삽입 위치

        if (priorityText === '매우긴급') {
            cell.style.backgroundColor = '#ffcccc'; // 연한 빨간색 배경
            cell.style.color = 'red'; // 글씨 색상
            cell.style.fontWeight = 'bold'; // 글씨 진하게
            iconSpan.innerHTML = '⚠️';
            iconSpan.style.color = 'red';
            iconSpan.style.marginLeft = '5px';
        } else if (priorityText === '긴급') {
             cell.style.backgroundColor = '#ffedcc'; // 연한 주황색 배경
             cell.style.color = 'orange'; // 글씨 색상
             cell.style.fontWeight = 'bold'; // 글씨 진하게
             iconSpan.innerHTML = '⚡'; // 번개 아이콘
            iconSpan.style.color = 'orange';
            iconSpan.style.marginLeft = '5px';
        }
    });


});


//////////////////////////////////////////////////////////////////

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

    document.getElementById('edit-open-participant-popup').addEventListener('click', () => {
                console.log('버튼 클릭됨');
                const popup = document.getElementById('participant-popup');
                popup.classList.remove('hidden');
                popup.classList.add('visible');

        });

    // 참여자 선택 완료 버튼
    document.getElementById('close-participant-popup').addEventListener('click', () => {
        const checkboxes = document.querySelectorAll('#participant-list input[type="checkbox"]');

        selectedParticipants = []; //

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

        const editParticipantDisplay = document.getElementById('edit-selected-participants');
        editParticipantDisplay.textContent = selectedParticipants.join(', ') || '선택된 참여자가 없습니다.';
    }

    // 샘플 참여자 데이터
   /* const participants = [
        { department: '인사팀', name: '김혜민', position: '이사' },
        { department: '인사팀', name: '이정규', position: '부장' },
        { department: '인사팀', name: '이태웅', position: '과장' },
        { department: '인사팀', name: '전지훈', position: '대리' },
        { department: '인사팀', name: '강순구', position: '사원' },
        { department: '인사팀', name: '김길동', position: '인턴' },
    ];*/

//    M 경영
//    H 인사총무
//    F 재무회계
//    S 영업마케팅
// 코드와 해당하는 값을 매핑한 객체
const codeMapping = {
    M: '경영',
    H: '인사총무',
    F: '재무회계',
    S: '영업마케팅'
};
// C  대표
//  SM 수석
//  M 책임
//   SA 선임
//   JA 사원
const positionCodeMapping = {
    C: '대표',
    SM: '수석',
    M: '책임',
    SA: '선임',
    JA: '사원'
};
    let participants = employeeList.map((item) => {
        let obj = {};
        obj.department = codeMapping[item.e_dept] || item.e_dept // 코드값을 매핑하여 변환;
        obj.name = item.e_name;
        obj.position = positionCodeMapping[item.e_position] || item.e_position // 코드값을 매핑하여 변환;
        return obj;
    })
    console.log('participants', participants);

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

    // ** 팝업 및 오버레이 변수 선언**
        const overlay = document.querySelector('.modal-overlay');  // 오버레이
        const editPopup = document.getElementById('edit-popup');  // 수정 팝업
        const closeModalButton = document.querySelector('.btn-modal-close');  // 팝업 닫기 버튼
        const editButtons = document.querySelectorAll('.edit');  // 수정 버튼들

        // ** 수정 버튼 클릭 이벤트 추가**
        /*
        editButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const buttonClicked = event.target;  // 클릭된 버튼
                const taskRow = buttonClicked.closest('tr');  // 클릭된 버튼의 부모 tr 요소

                // ** 업무 데이터를 수정 팝업에 채우기**
                const taskId = taskRow.querySelector('input[type="checkbox"]').value;  // 업무 ID
                const taskTitle = taskRow.querySelector('.task-title').textContent.trim();  // 업무 제목
                const taskPriority = taskRow.querySelector('.task-priority').textContent.trim();  // 업무 우선순위
                const taskStage = taskRow.querySelector('.task-stage').textContent.trim();  // 업무 진행상황
                const taskContent = taskRow.querySelector('.task-content').textContent.trim();  // 업무 내용

                // 수정할 데이터 팝업에 채우기
                document.getElementById('edit-id').value = taskId;  // 숨겨진 ID 필드에 값 넣기
                document.getElementById('edit-title').value = taskTitle;  // 제목 입력 필드에 값 넣기
                document.getElementById('edit-priority').value = taskPriority;  // 우선순위 입력 필드에 값 넣기
                document.getElementById('edit-stage').value = taskStage;  // 진행상황 입력 필드에 값 넣기
                document.getElementById('edit-content').value = taskContent;  // 내용 입력 필드에 값 넣기

                // ** 수정 팝업과 오버레이 표시**
                editPopup.classList.remove('hidden');
                overlay.style.display = 'block';  // 오버레이 보이기
            });
        });


        // ** 팝업 닫기 버튼 클릭 이벤트**
        closeModalButton.addEventListener('click', () => {
            editPopup.classList.add('hidden');  // 수정 팝업 숨기기
            overlay.style.display = 'none';  // 오버레이 숨기기
        });

        // ** 저장 버튼 클릭 이벤트**
        const saveChangesButton = document.getElementById('save-changes-button');
        saveChangesButton.addEventListener('click', () => {
            const editForm = document.getElementById('edit-task-form');

            // ** 수정된 데이터 가져오기**
            const taskId = document.getElementById('edit-id').value;  // 수정된 ID
            const title = document.getElementById('edit-title').value;  // 제목
            const priority = document.getElementById('edit-priority').value;  // 우선순위
            const stage = document.getElementById('edit-stage').value;  // 진행상황
            const content = document.getElementById('edit-content').value;  // 내용

            // ** 수정된 데이터를 서버로 전송하는 코드 추가 (예시: POST 또는 PUT 요청)**
            const updatedData = {
                t_id: taskId,
                t_title: title,
                t_priority: priority,
                t_stage: stage,
                t_content: content,
            };

            // ** 서버로 수정된 데이터 보내기**
            fetch('/api/todo/update/' + taskId, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    alert('업무가 성공적으로 수정되었습니다!');
                    // 수정 후 팝업 숨기기
                    editPopup.classList.add('hidden');
                    overlay.style.display = 'none';  // 오버레이 숨기기
                } else {
                    alert('업무 수정에 실패했습니다.');
                }
            })
            .catch(error => {
                console.error('수정 실패:', error);
                alert('오류가 발생했습니다.');
            });
        });

        */
});

function editPopupOpen(t_id) {
    console.log(t_id);
    edit_t_id = t_id;

    // row value set to edit popup //////////
    const row = document.getElementById(t_id);

    if (!row) {
        console.error(`Row with ID ${t_id} not found.`);
        return;
    }

    // 컬럼별 데이터 가져오기
    let priority = row.cells[2].textContent.trim(); // 긴급 컬럼
    let stage = row.cells[3].textContent.trim(); //
    const title = row.cells[4].textContent.trim(); //
    const content = row.cells[5].textContent.trim(); //
    const startDate = row.cells[6].textContent.trim(); // 시작일
    const endDate = row.cells[7].textContent.trim(); // 종료일
    const writer = row.cells[8].textContent.trim(); // 작성자
    const participantList = row.cells[9].textContent.trim(); //

    // 값 확인
    console.log({ t_id, priority, stage, title, content, startDate, endDate, writer, participantList, });
    // 중요도 텍스트와 value 매핑
    const priorityMap = {
        "매우 긴급": "VU",
        "긴급": "U",
        "보통": "N",
        "천천히": "NU"
    };
    priority = priorityMap[priority] || priority;

    // 진행상황 텍스트와 value 매핑
    const stageMap = {
        "예정": "P",
        "진행지연": "PD",
        "완료지연": "CD",
        "완료": "C"
    };
    stage = stageMap[stage] || stage;

    // set value
    // 팝업 요소 가져오기
        const popup = document.getElementById('edit-popup');
        const form = document.getElementById('edit-task-form');

        // 폼 필드에 데이터 채우기
        form.querySelector('#edit-id').value = t_id;
        form.querySelector('#edit-title').value = title;
        form.querySelector('#edit-start-date').value = startDate;
        form.querySelector('#edit-end-date').value = endDate;

        // 참여자 및 내용
        const participantsDiv = document.getElementById('edit-selected-participants');
        participantsDiv.textContent = participantList; // 참여자 정보 추가
        form.querySelector('#edit-content').value = content;

        selectedParticipants = participantList.split(',').map(participant => participant.trim());
        console.log(selectedParticipants);


    ///////////////////////////////////

    // *** 모달 관련 코드 ***
    const editModal = document.querySelector('#edit-popup'); // 모달

    // 오버레이 추가
    const overlay = document.createElement('div');
//    overlay.className = 'modal-overlay';
//    document.body.appendChild(overlay);

    editModal.style.display = 'block';
    overlay.style.display = 'block';
}

//정렬버튼 클릭시 이벤트
document.getElementById('prBtn').addEventListener('click', () => {
            // 현재 페이지의 URL에서 쿼리 파라미터 가져오기
            const params = new URLSearchParams(window.location.search);
            // 특정 쿼리 파라미터 값 가져오기
            const sort = params.get('sort'); // 'yourParameterName'을 원하는 파라미터 이름으로 변경
            console.log(sort); // 해당 파라미터의 값 출력
            const type = params.get('type');
            const search = params.get('search');
            if(sort == 'priorityAsc') {
                location.href="/todo?sort=priorityDesc&type="+type+"&search="+search;
            } else {
                location.href="/todo?sort=priorityAsc&type="+type+"&search="+search;
            }
 });

 document.getElementById('stBtn').addEventListener('click', () => {
             // 현재 페이지의 URL에서 쿼리 파라미터 가져오기
             const params = new URLSearchParams(window.location.search);
             // 특정 쿼리 파라미터 값 가져오기
             const sort = params.get('sort'); // 'yourParameterName'을 원하는 파라미터 이름으로 변경
             console.log(sort); // 해당 파라미터의 값 출력
             const type = params.get('type');
             const search = params.get('search');
             if(sort == 'stageAsc') {
                 location.href="/todo?sort=stageDesc&type="+type+"&search="+search;
             } else {
                 location.href="/todo?sort=stageAsc&type="+type+"&search="+search;
             }
  });

   document.getElementById('startBtn').addEventListener('click', () => {
               // 현재 페이지의 URL에서 쿼리 파라미터 가져오기
               const params = new URLSearchParams(window.location.search);
               // 특정 쿼리 파라미터 값 가져오기
               const sort = params.get('sort'); // 'yourParameterName'을 원하는 파라미터 이름으로 변경
               console.log(sort); // 해당 파라미터의 값 출력
               const type = params.get('type');
               const search = params.get('search');
               if(sort == 'startAsc') {
                   location.href="/todo?sort=startDesc&type="+type+"&search="+search;
               } else {
                   location.href="/todo?sort=startAsc&type="+type+"&search="+search;
               }
    });

     document.getElementById('endBtn').addEventListener('click', () => {
                 // 현재 페이지의 URL에서 쿼리 파라미터 가져오기
                 const params = new URLSearchParams(window.location.search);
                 // 특정 쿼리 파라미터 값 가져오기
                 const sort = params.get('sort'); // 'yourParameterName'을 원하는 파라미터 이름으로 변경
                 console.log(sort); // 해당 파라미터의 값 출력
                 const type = params.get('type');
                 const search = params.get('search');
                 if(sort == 'endAsc') {
                     location.href="/todo?sort=endDesc&type="+type+"&search="+search;
                 } else {
                     location.href="/todo?sort=endAsc&type="+type+"&search="+search;
                 }
      });

 function hideRow(rowId) {
          var row = document.getElementById(rowId);
          row.style.display = 'none'; // 행 숨기기
 }

 // 숨겨진 행을 보이게 하는 함수
 function showHiddenRows() {
     // 테이블 내 모든 행을 선택
     const rows = document.querySelectorAll('table#todo-table tbody tr');

     // 각 행을 순회하면서 display 속성이 'none'인 행을 보이게 설정
     rows.forEach(row => {
         if (row.style.display === 'none') {
             row.style.display = '';
         }
     });
 }

  // 선택된 행들을 숨기는 함수
 function hideSelectedRows() {
     // 모든 체크박스를 선택
     const checkboxes = document.querySelectorAll('.row-checkbox');

     // 각 체크박스를 순회하면서 체크된 행을 숨김
     checkboxes.forEach((checkbox, index) => {
         const row = checkbox.closest('tr'); // 체크박스가 속한 행을 찾음
         if (checkbox.checked) {
             row.style.display = 'none'; // 체크된 행 숨기기
         }
     });
 }

 function resetSearch() {
       location.href="/todo";

 }// 선택된 행들을 숨기는 함수
  function hideSelectedRows() {
      // 모든 체크박스를 선택
      const checkboxes = document.querySelectorAll('.row-checkbox');

      // 체크된 체크박스 필터링
      const checkedCheckboxes = Array.from(checkboxes).filter(checkbox => checkbox.checked);

      // 체크된 항목이 없으면 팝업창 표시
      if (checkedCheckboxes.length === 0) {
          // 팝업창 생성 또는 기존 팝업 열기
          openCustomPopup('선택된 항목이 없습니다. 선택해주세요!');
          return; // 함수 종료
      }

      // 체크된 행 숨기기
      checkedCheckboxes.forEach(checkbox => {
          const row = checkbox.closest('tr'); // 체크박스가 속한 행을 찾음
          row.style.display = 'none'; // 체크된 행 숨기기
      });
  }

  // 팝업창 열기 함수
  function openCustomPopup(message) {
      // 팝업 메시지 설정
      const popupMessage = document.getElementById('popup-message');
      popupMessage.textContent = message;

      // 팝업 및 오버레이 표시
      const popup = document.getElementById('custom-popup');
      const overlay = document.getElementById('popup-overlay');

      popup.style.display = 'block';
      overlay.style.display = 'block';
  }

  // 팝업창 닫기 함수
  function closeCustomPopup() {
      // 팝업 및 오버레이 숨기기
      const popup = document.getElementById('custom-popup');
      const overlay = document.getElementById('popup-overlay');

      popup.style.display = 'none';
      overlay.style.display = 'none';
  }
