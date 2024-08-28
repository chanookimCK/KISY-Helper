// 챗봇 기능 구현
const chatbotResponses = {
    "school events": "The next school event is the Science Fair on September 15th.",
    "assignments": "You have a math assignment due on August 31st.",
    "holiday": "The next school holiday is on October 10th."
};

document.getElementById('chat-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const userInput = document.getElementById('chat-input').value.toLowerCase();
    const chatLog = document.getElementById('chat-log');

    // 사용자 입력을 추가
    const userMessage = document.createElement('div');
    userMessage.textContent = `You: ${userInput}`;
    chatLog.appendChild(userMessage);

    // 챗봇 응답 생성
    let botResponse = chatbotResponses[userInput] || "Sorry, I don't understand that. Try asking about school events or assignments.";
    const botMessage = document.createElement('div');
    botMessage.textContent = `Bot: ${botResponse}`;
    chatLog.appendChild(botMessage);

    // 입력란 초기화 및 스크롤 조정
    document.getElementById('chat-input').value = '';
    chatLog.scrollTop = chatLog.scrollHeight;
});

// 일정 관리 기능
document.getElementById('schedule-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const eventName = document.getElementById('event').value;
    const eventDate = document.getElementById('date').value;

    if (eventName && eventDate) {
        addSchedule(eventName, eventDate);
        document.getElementById('event').value = '';
        document.getElementById('date').value = '';
    }
});

function addSchedule(name, date) {
    const scheduleList = document.getElementById('schedule-list');
    const listItem = document.createElement('li');
    listItem.textContent = `${name} - ${date}`;
    
    scheduleList.appendChild(listItem);
    
    saveSchedule(name, date);
}

function saveSchedule(name, date) {
    const schedules = JSON.parse(localStorage.getItem('schedules')) || [];
    schedules.push({ name, date });
    localStorage.setItem('schedules', JSON.stringify(schedules));
}

function loadSchedules() {
    const schedules = JSON.parse(localStorage.getItem('schedules')) || [];
    schedules.forEach(schedule => addSchedule(schedule.name, schedule.date));
}

// 초기 로드 시 일정 로드
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('schedule-list')) {
        loadSchedules();
    }
});
