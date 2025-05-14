// 职场苏丹 - 主脚本文件

// 等待页面加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 初始化游戏界面
    initializeUI();
    
    // 初始化事件监听
    initializeEventListeners();
    
    // 初始化光效
    initializeLightEffects();
    
    // 初始化卡牌
    initializeCards();
});

// 初始化游戏界面
function initializeUI() {
    // 添加太阳光芒效果
    const sunRay = document.createElement('div');
    sunRay.classList.add('sun-ray', 'light-effect');
    document.body.appendChild(sunRay);
    
    // 使用GSAP动画库设置太阳光芒动画
    gsap.to(sunRay, {
        duration: 20,
        rotation: 360,
        repeat: -1,
        ease: "none"
    });
    
    // 添加呼吸效果到桌面区域
    gsap.to('.desktop-area', {
        boxShadow: '0 8px 20px rgba(74, 144, 226, 0.3)',
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
}

// 初始化事件监听
function initializeEventListeners() {
    // 文件夹点击事件
    const folders = document.querySelectorAll('.event-folder');
    folders.forEach(folder => {
        folder.addEventListener('click', function() {
            openEventModal('日常事件', '这是一个日常工作事件，需要你处理一些常规任务。');
        });
    });
    
    // 随机事件点击事件
    const randomEvents = document.querySelectorAll('.event-bubble');
    randomEvents.forEach(event => {
        event.addEventListener('click', function() {
            openEventModal('随机事件', '突发状况！你的一位重要客户临时提出了新需求，需要紧急处理。');
        });
    });
    
    // 卡牌按钮点击事件
    const cardButtons = document.querySelectorAll('.card-btn');
    cardButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (button.classList.contains('character-btn')) {
                updateCardSection('character');
            } else if (button.classList.contains('privilege-btn')) {
                updateCardSection('privilege');
            } else if (button.classList.contains('tool-btn')) {
                updateCardSection('tool');
            }
        });
    });
    
    // 关闭模态框按钮
    const closeModalButtons = document.querySelectorAll('.close-modal, .close-card-detail');
    closeModalButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (button.classList.contains('close-modal')) {
                closeEventModal();
            } else {
                closeCardDetailModal();
            }
        });
    });
    
    // 事件选择按钮
    const choiceButtons = document.querySelectorAll('.choice-btn');
    choiceButtons.forEach(button => {
        button.addEventListener('click', function() {
            closeEventModal();
            // 这里可以添加选择后的逻辑
        });
    });
    
    // 卡牌操作按钮
    const cardActionButtons = document.querySelectorAll('.use-card-btn, .cancel-card-btn');
    cardActionButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (button.classList.contains('use-card-btn')) {
                // 使用卡牌的逻辑
                alert('卡牌已使用！');
            }
            closeCardDetailModal();
        });
    });
    
    // 工作日结算按钮
    const endDayButton = document.querySelector('.end-day-btn');
    endDayButton.addEventListener('click', function() {
        alert('工作日已结算，进入下一回合！');
        // 这里可以添加回合结算逻辑
    });
}

// 初始化光效
function initializeLightEffects() {
    // 为文件夹添加悬停光效
    const folders = document.querySelectorAll('.event-folder');
    folders.forEach(folder => {
        folder.addEventListener('mouseenter', function() {
            gsap.to(this.querySelector('.folder-icon'), {
                duration: 0.3,
                filter: 'drop-shadow(0 4px 8px rgba(248, 213, 108, 0.8))',
                ease: "power2.out"
            });
        });
        
        folder.addEventListener('mouseleave', function() {
            gsap.to(this.querySelector('.folder-icon'), {
                duration: 0.3,
                filter: 'drop-shadow(0 2px 5px rgba(0, 0, 0, 0.2))',
                ease: "power2.out"
            });
        });
    });
    
    // 为随机事件添加悬停光效
    const randomEvents = document.querySelectorAll('.event-bubble');
    randomEvents.forEach(event => {
        event.addEventListener('mouseenter', function() {
            gsap.to(this.querySelector('.bubble-icon'), {
                duration: 0.3,
                filter: 'drop-shadow(0 4px 8px rgba(74, 144, 226, 0.8))',
                ease: "power2.out"
            });
        });
        
        event.addEventListener('mouseleave', function() {
            gsap.to(this.querySelector('.bubble-icon'), {
                duration: 0.3,
                filter: 'drop-shadow(0 2px 5px rgba(0, 0, 0, 0.2))',
                ease: "power2.out"
            });
        });
    });
}

// 初始化卡牌
function initializeCards() {
    // 模拟数据
    const characterCards = [
        { id: 1, name: '主角', icon: 'https://cdn-icons-png.flaticon.com/512/4086/4086679.png' },
        { id: 2, name: '老板', icon: 'https://cdn-icons-png.flaticon.com/512/4333/4333609.png' },
        { id: 3, name: '对象', icon: 'https://cdn-icons-png.flaticon.com/512/4086/4086691.png' },
        { id: 4, name: '闺蜜', icon: 'https://cdn-icons-png.flaticon.com/512/4086/4086688.png' }
    ];
    
    const privilegeCards = [
        { id: 1, name: '暧昧卡', icon: 'https://cdn-icons-png.flaticon.com/512/1029/1029132.png' },
        { id: 2, name: '挥霍卡', icon: 'https://cdn-icons-png.flaticon.com/512/2933/2933116.png' },
        { id: 3, name: '装X卡', icon: 'https://cdn-icons-png.flaticon.com/512/3069/3069172.png' },
        { id: 4, name: '陷害卡', icon: 'https://cdn-icons-png.flaticon.com/512/1680/1680022.png' }
    ];
    
    const toolCards = [
        { id: 1, name: '加班券', icon: 'https://cdn-icons-png.flaticon.com/512/2910/2910791.png' },
        { id: 2, name: '休假券', icon: 'https://cdn-icons-png.flaticon.com/512/5501/5501961.png' },
        { id: 3, name: '保密协议', icon: 'https://cdn-icons-png.flaticon.com/512/3349/3349528.png' }
    ];
    
    // 默认显示角色卡
    updateCardSection('character');
}

// 更新卡牌区域
function updateCardSection(cardType) {
    const cardsSection = document.querySelector('.cards-section');
    cardsSection.innerHTML = ''; // 清空卡牌区域
    
    let cards = [];
    let cardClass = '';
    
    // 根据类型设置卡牌数据
    switch (cardType) {
        case 'character':
            cards = [
                { id: 1, name: '主角', icon: 'https://cdn-icons-png.flaticon.com/512/4086/4086679.png' },
                { id: 2, name: '老板', icon: 'https://cdn-icons-png.flaticon.com/512/4333/4333609.png' },
                { id: 3, name: '对象', icon: 'https://cdn-icons-png.flaticon.com/512/4086/4086691.png' },
                { id: 4, name: '闺蜜', icon: 'https://cdn-icons-png.flaticon.com/512/4086/4086688.png' }
            ];
            cardClass = 'character-card';
            break;
        case 'privilege':
            cards = [
                { id: 1, name: '暧昧卡', icon: 'https://cdn-icons-png.flaticon.com/512/1029/1029132.png' },
                { id: 2, name: '挥霍卡', icon: 'https://cdn-icons-png.flaticon.com/512/2933/2933116.png' },
                { id: 3, name: '装X卡', icon: 'https://cdn-icons-png.flaticon.com/512/3069/3069172.png' },
                { id: 4, name: '陷害卡', icon: 'https://cdn-icons-png.flaticon.com/512/1680/1680022.png' }
            ];
            cardClass = 'privilege-card';
            break;
        case 'tool':
            cards = [
                { id: 1, name: '加班券', icon: 'https://cdn-icons-png.flaticon.com/512/2910/2910791.png' },
                { id: 2, name: '休假券', icon: 'https://cdn-icons-png.flaticon.com/512/5501/5501961.png' },
                { id: 3, name: '保密协议', icon: 'https://cdn-icons-png.flaticon.com/512/3349/3349528.png' }
            ];
            cardClass = 'tool-card';
            break;
    }
    
    // 创建卡牌元素
    cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card', cardClass);
        cardElement.setAttribute('data-card-id', card.id);
        
        const cardInner = document.createElement('div');
        cardInner.classList.add('card-inner');
        
        const cardIcon = document.createElement('div');
        cardIcon.classList.add('card-icon');
        cardIcon.style.backgroundImage = `url('${card.icon}')`;
        
        const cardName = document.createElement('div');
        cardName.classList.add('card-name');
        cardName.textContent = card.name;
        
        cardInner.appendChild(cardIcon);
        cardInner.appendChild(cardName);
        cardElement.appendChild(cardInner);
        
        // 添加点击事件
        cardElement.addEventListener('click', function() {
            openCardDetailModal(card.name, `这是一张${card.name}，可以在合适的时机使用它。`);
        });
        
        cardsSection.appendChild(cardElement);
        
        // 添加入场动画
        gsap.from(cardElement, {
            y: 50,
            opacity: 0,
            duration: 0.5,
            delay: card.id * 0.1,
            ease: "back.out(1.7)"
        });
    });
    
    // 高亮选中的按钮
    const buttons = document.querySelectorAll('.card-btn');
    buttons.forEach(button => {
        button.style.opacity = '0.6';
    });
    
    let activeButton;
    switch (cardType) {
        case 'character':
            activeButton = document.querySelector('.character-btn');
            break;
        case 'privilege':
            activeButton = document.querySelector('.privilege-btn');
            break;
        case 'tool':
            activeButton = document.querySelector('.tool-btn');
            break;
    }
    
    if (activeButton) {
        activeButton.style.opacity = '1';
    }
}

// 打开事件模态框
function openEventModal(title, description) {
    const modal = document.getElementById('eventModal');
    const modalTitle = modal.querySelector('.modal-title');
    const modalDescription = modal.querySelector('.event-description');
    
    modalTitle.textContent = title;
    modalDescription.textContent = description;
    
    modal.classList.add('active');
    
    // 添加模态框动画
    gsap.from(modal.querySelector('.modal-content'), {
        y: 30,
        opacity: 0.8,
        duration: 0.4,
        ease: "power2.out"
    });
}

// 关闭事件模态框
function closeEventModal() {
    const modal = document.getElementById('eventModal');
    
    gsap.to(modal.querySelector('.modal-content'), {
        y: 30,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: function() {
            modal.classList.remove('active');
            gsap.set(modal.querySelector('.modal-content'), {
                y: 0,
                opacity: 1
            });
        }
    });
}

// 打开卡牌详情模态框
function openCardDetailModal(title, description) {
    const modal = document.getElementById('cardDetailModal');
    const modalTitle = modal.querySelector('.card-title');
    const modalDescription = modal.querySelector('.card-description');
    
    modalTitle.textContent = title;
    modalDescription.textContent = description;
    
    modal.classList.add('active');
    
    // 添加模态框动画
    gsap.from(modal.querySelector('.card-detail-content'), {
        y: 30,
        opacity: 0.8,
        duration: 0.4,
        ease: "power2.out"
    });
}

// 关闭卡牌详情模态框
function closeCardDetailModal() {
    const modal = document.getElementById('cardDetailModal');
    
    gsap.to(modal.querySelector('.card-detail-content'), {
        y: 30,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: function() {
            modal.classList.remove('active');
            gsap.set(modal.querySelector('.card-detail-content'), {
                y: 0,
                opacity: 1
            });
        }
    });
} 