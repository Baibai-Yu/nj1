document.addEventListener('DOMContentLoaded', function() {

    const messagesList = document.getElementById('messages-list');
    const messageForm = document.getElementById('message-form');
    const nicknameInput = document.getElementById('nickname');
    const messageContentInput = document.getElementById('message-content');

    // ===============================================
    // 新增：从 localStorage 加载留言
    // ===============================================
    function loadMessages() {
        const storedMessages = localStorage.getItem('guestbookMessages');
        // 如果 localStorage 中有数据，则解析为 JSON；否则返回空数组
        return storedMessages ? JSON.parse(storedMessages) : [];
    }

    // ===============================================
    // 新增：将留言保存到 localStorage
    // ===============================================
    function saveMessages(messages) {
        localStorage.setItem('guestbookMessages', JSON.stringify(messages));
    }

    // 预设的留言数据，仅在 localStorage 中没有数据时使用
const initialMessages = [
    { nickname: '百百', content: '你好，南京！', date: '2025-08-10' },
    { nickname: '未央', content: '一座南京城，半部近代史', date: '2025-08-13' },
    { nickname: 'Myron', content: '愿以寸心寄华夏，且将岁月赠山河。', date: '2025-08-11' },
    { nickname: '予le', content: '仰金陵英雄迹，承千秋赤子心', date: '2025-08-13' },
    { nickname: 'Ring', content: '金陵红迹印初心，先辈风骨照前行，吾辈当承志致远。', date: '2025-08-13' },
    { nickname: 'Chloe', content: '希望南京越来越好', date: '2025-08-10' },
];

    // 加载或初始化留言
    let existingMessages = loadMessages();
    if (existingMessages.length === 0) {
        existingMessages = initialMessages;
        saveMessages(existingMessages); // 将初始留言保存到 localStorage
    }

    // 随机样式生成函数
    function getRandomStyle() {
        const minFontSize = 14;
        const maxFontSize = 24;
        const size = (Math.random() * (maxFontSize - minFontSize) + minFontSize).toFixed(0) + 'px';

        const colors = ['#c0392b', '#e74c3c', '#9b59b6', '#3498db', '#1abc9c', '#2ecc71', '#f1c40f'];
        const color = colors[Math.floor(Math.random() * colors.length)];

        const listRect = messagesList.getBoundingClientRect();
        const top = Math.random() * (listRect.height - 50); // 随机顶部位置
        const left = Math.random() * (listRect.width - 300); // 随机左侧位置，避免超出

        return { size, color, top: top + 'px', left: left + 'px' };
    }

    // 渲染留言的函数
    function renderMessages(messages) {
        messagesList.innerHTML = '';
        messages.forEach(message => {
            const style = getRandomStyle();
            const messageItem = document.createElement('div');
            messageItem.classList.add('message-item');
            messageItem.style.cssText = `
                top: ${style.top};
                left: ${style.left};
                font-size: ${style.size};
                color: ${style.color};
            `;
            messageItem.innerHTML = `
                <h4>${message.nickname}</h4>
                <p>${message.content}</p>
            `;
            messagesList.appendChild(messageItem);
        });
    }

    // 页面加载时立即渲染已有留言
    renderMessages(existingMessages);

    // 监听表单提交事件
    messageForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const newNickname = nicknameInput.value;
        const newContent = messageContentInput.value;
        const newDate = new Date().toISOString().slice(0, 10);

        if (newNickname && newContent) {
            const newMessage = {
                nickname: newNickname,
                content: newContent,
                date: newDate
            };

            // 将新留言添加到数组开头，使其最新显示
            existingMessages.unshift(newMessage);
            // ===============================================
            // 新增：每次添加新留言后，保存到 localStorage
            // ===============================================
            saveMessages(existingMessages);

            // 重新渲染留言列表，展示新留言
            renderMessages(existingMessages);

            // 清空表单输入框
            nicknameInput.value = '';
            messageContentInput.value = '';
        }
    });



        const urlHash = window.location.hash;
    if (urlHash && document.querySelector(urlHash)) {
        setTimeout(() => {
            document.querySelector(urlHash).scrollIntoView({ behavior: 'smooth' });
        }, 100);
    }
});

     const scrollToTopBtn = document.getElementById("scrollToTopBtn");

    // 当用户向下滚动超过 20px 时，显示按钮；否则隐藏
    window.onscroll = function() {
        scrollFunction();
    };

    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            scrollToTopBtn.style.display = "block";
        } else {
            scrollToTopBtn.style.display = "none";
        }
    }

    // 当用户点击按钮时，平滑滚动到页面顶部
    window.topFunction = function() {
        // 使用 window.scrollTo() 实现平滑滚动
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    // ... (其他 JavaScript 代码) ...


    // 高德地图初始化
    const mapContainer = document.getElementById('container');
    if (mapContainer) {
        const map = new AMap.Map('container', {
            zoom: 10, // 初始缩放级别
            center: [118.796624,32.059344] // 南京市中心坐标
        });

        const redSpots = [
            { name: '纪念“五二〇”学生运动广场', position: [118.788793,32.044131], url: 'https://baike.baidu.com/item/%E4%BA%94%E4%BA%8C%E3%80%87%E5%B9%BF%E5%9C%BA/4680435' },
            { name: '国民大会堂旧址', position: [118.793097,32.044188], url: 'https://baike.baidu.com/item/%E5%9B%BD%E6%B0%91%E5%A4%A7%E4%BC%9A%E5%A0%82%E6%97%A7%E5%9D%80/3997471' },
            { name: '总统府', position: [118.797398,32.044228], url: 'https://www.njztf.cn/index.sh' },
            { name: '梅园新村纪念馆', position: [118.801602,32.042379], url: 'https://yht.nanjing.gov.cn/rednanjing/hszxmap/202506/t20250611_5583676.html' },
            { name: '王荷波纪念馆', position: [118.609507,32.025113], url: 'http://www.jsdsw.org.cn/web/detail/detail.html?id=6991' },
            { name: '浦口革命烈士纪念碑', position: [118.618447,32.057146], url: 'https://baike.baidu.com/item/%E6%B5%A6%E5%8F%A3%E9%9D%A9%E5%91%BD%E7%83%88%E5%A3%AB%E7%BA%AA%E5%BF%B5%E7%A2%91/59222202' },
            { name: '浦口无名烈士纪念陵园', position: [118.646211,32.129809], url: 'https://baike.baidu.com/item/%E6%B5%A6%E5%8F%A3%E6%97%A0%E5%90%8D%E7%83%88%E5%A3%AB%E7%BA%AA%E5%BF%B5%E9%99%B5%E5%9B%AD/63875087' },
            { name: '石村抗日英雄纪念碑', position: [118.365846,31.936538], url: 'https://yht.nanjing.gov.cn/rednanjing/hszxmap/202506/t20250611_5583616.html' },
            { name: '云台山抗日烈士陵园', position: [118.736224,31.737717], url: 'http://wm.jschina.com.cn/2025/bxfb/jyl/gjjlsly_56530/202503/t20250330_8471678.shtml?f_link_type=f_linkinlinenote&flow_extra=eyJpbmxpbmVfZGlzcGxheV9wb3NpdGlvbiI6MCwiZG9jX3Bvc2l0aW9uIjoyLCJkb2NfaWQiOiJmNTc5YTBkODAwZGU3M2FhLWRiMjZlYTcyZTBmNjg3OTUifQ%3D%3D&use_xbridge3=true&loader_name=forest&need_sec_link=1&sec_link_scene=im&theme=light" target="_blank' },
            { name: '新四军第一支队指挥部旧址', position: [118.824861,31.651655], url: 'http://www.jjzb.net/hengshan.html' },
            { name: '横山新四军革命纪念馆', position: [118.834637,31.672023], url: 'https://baike.baidu.com/item/%E6%A8%AA%E5%B1%B1%E6%96%B0%E5%9B%9B%E5%86%9B%E9%9D%A9%E5%91%BD%E7%BA%AA%E5%BF%B5%E9%A6%86/57991571' },
            { name: '邹家红色展览馆', position: [118.908775,31.821711], url: 'http://www.19490423.com/jd/27/detail_7268.html?use_xbridge3=true&loader_name=forest&need_sec_link=1&sec_link_scene=im&theme=light' },
            { name: '龙都烈士陵园', position: [118.931324,31.833305], url: 'https://baike.baidu.com/item/%E9%BE%99%E9%83%BD%E7%83%88%E5%A3%AB%E5%A2%93/16742071' },
            { name: '竹山烈士陵园', position: [118.841819,31.94812], url: 'http://zzb.nanjing.gov.cn/zzjs/dyjygl/dyjysjkt/202112/t20211210_3227929.html?use_xbridge3=true&loader_name=forest&need_sec_link=1&sec_link_scene=im&theme=light' },
            { name: '仲铭亭', position: [118.841106,31.948559], url: 'http://www.jiangning.gov.cn/zjjn/jngk/jnww/201712/t20171215_189035.html?use_xbridge3=true&loader_name=forest&need_sec_link=1&sec_link_scene=im&theme=light' },
            { name: '溪田廉政教育基地', position: [118.698031,31.649267], url: 'http://www.19490423.com/jd/28/detail_4217.html' },
            { name: '大金山国防园', position: [119.119618,31.692753], url: 'http://www.djsgfy.com/' },
            { name: '红色李巷革命教育基地', position: [119.142474,31.52452], url: 'https://ent.cnr.cn/zx/20210531/t20210531_525500008.shtml' },
            { name: '苏南反顽战役铜山战斗纪念广场及抗大九分校历史陈列馆', position: [119.140602,31.464581], url: 'http://www.cngongji.cn/2023-03/19/c_1310704176.htm' },
            { name: '中山烈士陵园', position: [119.070392,31.63089], url: 'https://baike.baidu.com/item/%E4%B8%AD%E5%B1%B1%E7%83%88%E5%A3%AB%E9%99%B5%E5%9B%AD/4082039' },
            { name: '横山人民抗日斗争纪念馆', position: [118.864965,31.630041], url: 'http://www.jsdsw.org.cn/web/detail/detail.html?id=1728' },
            { name: '南京中国科举博物馆', position: [118.79063,32.02044], url: 'https://www.njiemuseum.com' },
            { name: '九龙桥', position: [118.800403,32.023187], url: 'https://baike.baidu.com/item/%E4%B9%9D%E9%BE%99%E6%A1%A5/23280289' },
            { name: '复成新村10号', position: [118.79875,32.032138], url: 'https://dag.nanjing.gov.cn/dawh/dags/202404/t20240430_4657730.html' },
            { name: '五老村爱国卫生运动纪念馆', position: [118.799779,32.034214], url: 'https://baike.baidu.com/item/%E4%BA%94%E8%80%81%E6%9D%91%E7%88%B1%E5%9B%BD%E5%8D%AB%E7%94%9F%E7%BA%AA%E5%BF%B5%E9%A6%86/57940427' },
            { name: '金陵兵工厂旧址', position: [118.785697,32.006736], url: 'https://baike.baidu.com/item/%E9%87%91%E9%99%B5%E5%85%B5%E5%B7%A5%E5%8E%82%E6%97%A7%E5%9D%80/59254711' },
            { name: '民国南京第一贫儿教养院旧址', position: [118.788646,32.029577], url: 'https://www.sohu.com/a/495848991_121124421' },
            { name: '瞻园路126号', position: [118.786296,32.020397], url: 'https://baike.baidu.com/item/%E7%9E%BB%E5%9B%AD%E8%B7%AF126%E5%8F%B7%E5%BB%BA%E7%AD%91/59255035' },
            { name: '南京工运纪念馆', position: [118.6932,32.124637], url: 'http://www.jjzb.net/gongyun.html' },
            { name: '侵华日军南京大屠杀遇难同胞纪念馆', position: [118.742372,32.035217], url: 'https://www.19371213.com.cn/' },
            { name: '渡江胜利纪念馆', position: [118.73173,32.073563], url: 'https://www.njmuseumadmin.com/Stadium/index/id/7' },
            { name: '五马渡', position: [118.786951,32.127234], url: 'http://resource.njstudy.com/new/index.html?cid=6999' },
            { name: '栖霞山', position: [118.969792,32.158175], url: 'http://www.njqixiashan.com/' },
            { name: '八卦洲', position: [118.795538,32.154152], url: 'https://baike.baidu.com/item/%E5%85%AB%E5%8D%A6%E6%B4%B2/1469803' },
            { name: '恽代英烈士殉难处', position: [118.743174,32.036054], url: 'http://www.chinamartyrs.gov.cn/wusi/bfzmyl/202404/t20240425_415014.html' },
            { name: '新四军第一支队司令部旧址', position: [118.868931,31.318968], url: 'http://www.jsdsw.org.cn/web/detail/detail.html?id=6979' },
            { name: '西舍“红色堡垒”教育基地', position: [119.128556,31.389541], url: 'http://njlyw.cn/websitenew/web/ScenicDetail?i=1314 ' },
            { name: '新四军驻高淳办事处旧址', position: [118.870637,31.319201], url: 'http://mzt.jiangsu.gov.cn/art/2022/6/15/art_86178_10494183.html' },
            { name: '中共淳溪第三支部（东阳店支部）旧址', position: [118.883808,31.328433], url: 'http://wap.bytravel.cn/landscape/62/xinsijunzhugaochunbanshichujiuzhi.html' },
            { name: '福昌五洋商店旧址', position: [118.867736,31.320094], url: 'https://www.jsgctv.com/special/detail?key=60e171afd0543e0a038b4580' },
            { name: '潘家花园 ', position: [118.993017,31.383714], url: 'https://www.jsgctv.com/special/detail?key=60e171afd0543e0a038b4580' },
            { name: '花墙门战斗遗址', position: [119.134574,31.325645], url: 'http://yht.nanjing.gov.cn/rednanjing/hszxmap/202506/t20250611_5583519.html' },
            { name: '雨花台烈士陵园', position: [118.780177,31.998425], url: 'https://yht.nanjing.gov.cn/' },
            { name: '八路军驻京办事处纪念馆', position: [118.78129,32.065491], url: 'https://baike.baidu.com/item/%E5%85%AB%E8%B7%AF%E5%86%9B%E9%A9%BB%E4%BA%AC%E5%8A%9E%E4%BA%8B%E5%A4%84%E7%BA%AA%E5%BF%B5%E9%A6%86/4542872' },
            { name: '南京长江大桥纪念馆', position: [118.750526,32.110086], url: 'https://baike.baidu.com/item/%E5%8D%97%E4%BA%AC%E9%95%BF%E6%B1%9F%E5%A4%A7%E6%A1%A5%E7%BA%AA%E5%BF%B5%E9%A6%86/24217107' },
            { name: '张闻天陈列馆', position: [118.758034,32.055716], url: 'https://baike.baidu.com/item/%E5%BC%A0%E9%97%BB%E5%A4%A9%E9%99%88%E5%88%97%E9%A6%86/61486520' },
            { name: '南京大学拉贝与国际安全区纪念馆', position: [118.78329,32.050504], url: 'https://rabe.nju.edu.cn/' },
            { name: '颐和路社区将军馆', position: [118.769721,32.060353], url: 'https://baike.baidu.com/item/%E9%A2%90%E5%92%8C%E8%B7%AF%E7%A4%BE%E5%8C%BA%E5%B0%86%E5%86%9B%E9%A6%86/61486711' },
            { name: '丁山社区“红色记忆”电影文化馆', position: [118.750238,32.075703], url: 'https://baike.baidu.com/item/%E4%B8%81%E5%B1%B1%E7%A4%BE%E5%8C%BA%E7%BA%A2%E8%89%B2%E8%AE%B0%E5%BF%86%E7%94%B5%E5%BD%B1%E6%96%87%E5%8C%96%E9%99%88%E5%88%97%E9%A6%86/53590585' },
            { name: '中央大学二部旧址', position: [118.776028,32.074858], url: 'https://baike.baidu.com/item/%E4%B8%AD%E5%A4%AE%E5%A4%A7%E5%AD%A6%E6%97%A7%E5%9D%80/3794594' },
            { name: '回龙桥小学（中共南京地下组织联络点遗址）', position: [118.75764,32.075165], url: 'https://baike.baidu.com/item/%E5%8D%97%E4%BA%AC%E5%B8%82%E5%9B%9E%E9%BE%99%E6%A1%A5%E5%B0%8F%E5%AD%A6/7091541' },
            { name: '竹镇市抗日民主政府旧址', position: [118.686345,32.515307], url: 'https://yht.nanjing.gov.cn/rednanjing/hsjy/dsdbknew/yjyz/202504/t20250410_5116717.html' },
            { name: '桂子山烈士陵园', position: [118.934534,32.458496], url: 'https://baike.baidu.com/item/%E6%A1%82%E5%AD%90%E5%B1%B1%E7%83%88%E5%A3%AB%E9%99%B5%E5%9B%AD/18565084' },
            { name: '金牛山战斗纪念碑', position: [118.994096,32.46776], url: 'https://baike.baidu.com/item/%E9%87%91%E7%89%9B%E5%B1%B1%E6%88%98%E6%96%97%E7%BA%AA%E5%BF%B5%E7%A2%91/18564943' },

            // 添加更多红色地点
        ];

        redSpots.forEach(spot => {
            const marker = new AMap.Marker({
                position: spot.position,
                map: map,
                title: spot.name
            });

            // 添加点击事件
            marker.on('click', function() {
                window.open(spot.url, '_blank');
            });

            // 添加信息窗口
            const infoWindow = new AMap.InfoWindow({
                content: `<h3>${spot.name}</h3>`,
                offset: new AMap.Pixel(0, -30)
            });
            marker.on('mouseover', function() {
                infoWindow.open(map, marker.getPosition());
            });
            marker.on('mouseout', function() {
                infoWindow.close();
            });
        });
    }


