  // 初始化Swiper轮播图
  const swiper = new Swiper('.swiper', {
    loop: true, // 循环播放
    autoplay: {
      delay: 3000, // 3秒切换
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
//头部视差
const barnerImagesData1 = [
  {
    url: 'https://pic.imgdb.cn/item/64d89f131ddac507ccdb7db2.webp',
    transform: [1, 0, 0, 1, 0, 0],
    width: 1950,
    a: 0.01
  },
  {
    url: 'https://pic.imgdb.cn/item/64d89f821ddac507ccdc71e4.webp',
    transform: [1, 0, 0, 1, -240, -5],
    width: 457.5,
    deg: -Math.PI / 60000,
    a: 0.035,
  }, {
    url: 'https://pic.imgdb.cn/item/64d89f561ddac507ccdc10d9.webp',
    transform: [1, 0, 0, 1, -300, 45],
    width: 157.5,
    deg: -Math.PI / 15000,
    a: 0.03,
    g: -0.02
  }, {
    url: 'https://pic.imgdb.cn/item/64d89f811ddac507ccdc715c.webp',
    transform: [1, 0, 0, 1, -180, 0],
    width: 314.3,
    a: -0.035
  }, {
    url: 'https://pic.imgdb.cn/item/64d89f7c1ddac507ccdc64c2.webp',
    transform: [1, 0, 0, 1, -300, 20],
    width: 571.2,
    deg: Math.PI / 40000,
    a: 0.05
  }, {
    url: 'https://pic.imgdb.cn/item/64d89f7c1ddac507ccdc65e6.webp',
    transform: [1, 0, 0, 1, 100, 0],
    width: 1446,
    a: 0.01
  }, {
    url: 'https://pic.imgdb.cn/item/64d89f7c1ddac507ccdc655c.webp',
    transform: [1, 0, 0, 1, 220, 0],
    width: 158.25,
    deg: Math.PI / 10000,
    a: 0.06,
    g: 0.045
  }, {
    url: 'https://pic.imgdb.cn/item/64d89f7c1ddac507ccdc6536.webp',
    transform: [1, 0, 0, 1, -240, 0],
    width: 1721.3,
    a: 0.01
  }, {
    url: 'https://pic.imgdb.cn/item/64d89f811ddac507ccdc7133.webp',
    transform: [1, 0, 0, 1, 320, 0],
    width: 642.96,
    a: 0.075,
    g: -0.025
  }, {
    url: 'https://pic.imgdb.cn/item/64d89f7c1ddac507ccdc649b.webp',
    transform: [1, 0, 0, 1, 20, 0],
    blur: 1,
    width: 2131.5,
    a: 0.18
  }, {
    url: 'https://pic.imgdb.cn/item/64d89f5c1ddac507ccdc1bbd.webp',
    transform: [1, 0, 0, 1, 400, 0],
    blur: 2.5,
    width: 299.52,
    deg: -Math.PI / 30000,
    a: 0.15,
    g: -0.02
  }, {
    url: 'https://pic.imgdb.cn/item/64d89f571ddac507ccdc113d.webp',
    transform: [1, 0, 0, 1, 0, 10],
    width: 457.1,
    deg: Math.PI / 20000,
    f: 0.0001,
    a: 0.06,
    g: 0.01
  },
   {
    url: 'https://pic.imgdb.cn/item/64d89f561ddac507ccdc10aa.webp',
    transform: [1, 0, 0, 1, -150, 0],
    width: 419.2,
    opacity: [0.1, 1],
    a: -0.02
  },
  {
    url: 'https://pic.imgdb.cn/item/64d89f561ddac507ccdc1077.webp',
    transform: [1, 0, 0, 1, 40, 10],
    width: 816.9,
    blur: 1,
    a: 0.09
  }, {
    url: 'https://pic.imgdb.cn/item/64d89f561ddac507ccdc102a.webp',
    transform: [1, 0, 0, 1, 20, 0],
    blur: 3,
    width: 1805.6,
    a: 0.3
  }, {
    url: 'https://pic.imgdb.cn/item/64d89f821ddac507ccdc71c6.webp',
    transform: [1, 0, 0, 1, 0, 0],
    width: 2400,
    a: 0.25
  }]

const body = document.getElementById('app')
const lerp = (start, end, amt) => (1 - amt) * start + amt * end; // 计算线性插值

let allImagesData = barnerImagesData1
let compensate = 0 // 视窗补偿值
let layers = [] // DOM集合

// 添加图片元素
function initItems() {
  compensate = window.innerWidth > 1650 ? window.innerWidth / 1650 : 1
  if (layers.length <= 0) {
    body.style.display = 'none'
    for (let i = 0; i < allImagesData.length; i++) {
      const item = allImagesData[i]
      const layer = document.createElement('div')
      layer.classList.add('layer')
      layer.style = 'transform:' + new DOMMatrix(item.transform)
      item.opacity && (layer.style.opacity = item.opacity[0])
      const img = document.createElement('img')
      
      img.src = item.url
      img.style.filter = `blur(${item.blur||0}px)`
      img.style.width = `${item.width * compensate}px`
      layer.appendChild(img)
      body.appendChild(layer)
    }
    body.style.display = ''
    layers = document.querySelectorAll(".layer")
  } else {
    for (let i = 0; i < layers.length; i++) {
      layers[i].firstElementChild.style.width = `${allImagesData[i].width * compensate}px`
    }
  }
}
initItems()

let initX = 0
let moveX = 0
let startTime = 0;
const duration = 300; // 动画持续时间（毫秒）
function mouseMove() { // 滑动操作
  animate()
}
function leave() {
  startTime = 0;
  requestAnimationFrame(homing); // 开始动画
}
function homing(timestamp) {
  !startTime && (startTime = timestamp)
  const elapsed = timestamp - startTime
  const progress = Math.min(elapsed / duration, 1)
  animate(progress) // 传递动画进度
  progress < 1 && requestAnimationFrame(homing) // 继续下一帧
}
// 动画执行
function animate(progress) {
  if(layers.length <= 0) return
  const isHoming = typeof progress === 'number'
  for (let i = 0; i < layers.length; i++) {
    const layer = layers[i];
    const item = allImagesData[i]
    let m = new DOMMatrix(item.transform)
    let move = moveX * (item.a || 0)  // 添加 || 0// 移动X translateX
    let s = item.f ? item.f * moveX + 1 : 1 // 放大比例 Scale
    let g = moveX * (item.g || 0) // 移动Y translateY
    if (isHoming) { // 回正时处理
      m.e = lerp(moveX * item.a + item.transform[4], item.transform[4], progress)
      move = 0
      s = lerp(item.f ? item.f * moveX + 1 : 1, 1, progress)
      g = lerp(item.g ? item.g * moveX : 0, 0, progress)
    }
    m = m.multiply(new DOMMatrix([m.a * s, m.b, m.c, m.d * s, move, g]))
    if (item.deg) { // 有旋转角度
      const deg = isHoming ? lerp(item.deg * moveX, 0, progress) : item.deg * moveX
      m = m.multiply(new DOMMatrix([Math.cos(deg), Math.sin(deg), -Math.sin(deg), Math.cos(deg), 0, 0]))
    }
    if (item.opacity) { // 有透明度变化
      layer.style.opacity = isHoming && moveX > 0 ? lerp(item.opacity[1], item.opacity[0], progress) : lerp(item.opacity[0], item.opacity[1], moveX / window.innerWidth * 2)
    }
    layer.style.transform = m // 应用所有变换效果
  }
}
// 鼠标滑入与滑动
body.addEventListener('mouseover', (e) => initX = e.pageX)
body.addEventListener('mousemove', (e) => {
  moveX = e.pageX - initX
  requestAnimationFrame(mouseMove)
})
// 鼠标已经离开了视窗或者切出浏览器，执行回正动画
body.addEventListener("mouseleave", leave)
// document.addEventListener("mouseleave", leave)
window.onblur = leave
// 添加窗口大小监听
window.addEventListener('resize', initItems)
//鼠标滑动
  const rightFixedModule = document.getElementById('rightFixedModule');
  const scrollThreshold = 300; // 滑动300px后显示
  
  // 监听滚动事件
  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > scrollThreshold) {
      // 显示右侧固定模块
      rightFixedModule.classList.add('visible');
    } else {
      // 隐藏右侧固定模块
      rightFixedModule.classList.remove('visible');
    }
  });
  
  // 点击置顶按钮回到顶部
  const topBtn = document.querySelector('.fixed-btn .to-top');
  if (topBtn) {
    topBtn.addEventListener('click', function(e) {
      e.stopPropagation(); // 阻止事件冒泡
      window.scrollTo({
        top: 0,
        behavior: 'smooth' // 平滑滚动
      });
    });
  }
  
  // 点击新版反馈按钮
  const feedbackBtn = document.querySelector('.hidden-btn:nth-child(1)');
  if (feedbackBtn) {
    feedbackBtn.addEventListener('click', function() {
      alert('新版反馈功能即将开放！');
    });
  }
  
  // 点击客服按钮
  const serviceBtn = document.querySelector('.hidden-btn:nth-child(2)');
  if (serviceBtn) {
    serviceBtn.addEventListener('click', function() {
      alert('客服功能即将开放！');
    });
  }
  //视频无限加载功能
    // DOM元素
    const videoContainer = document.getElementById('videoContainer');
    const loading = document.getElementById('loading');
    const noMore = document.getElementById('noMore');
    
    // 配置参数
    const columns = 5; // 每行显示5个视频
    const rowsPerLoad = 2; // 每次加载2行
    const itemsPerLoad = columns * rowsPerLoad; // 每次加载的视频数量（5×2=10个）
    const initialRows = 4; // 初始加载4行
    
    // 状态变量
    let page = 1;
    let isLoading = false;
    let hasMoreData = true;
    
    // 生成模拟视频数据
    function generateVideoData(page, count) {
      return Array(count).fill().map((_, index) => {
        const id = (page - 1) * itemsPerLoad + index + 1;// 计算每个视频的唯一ID
        return {
          id,
          title: `视频 ${id}`,
          cover: `https://picsum.photos/300/180?random=${id}`,
          views: Math.floor(Math.random() * 100000),
          duration: `${Math.floor(Math.random() * 50) + 10}:${Math.floor(Math.random() * 59).toString().padStart(2, '0')}`
        };
      });
    }
    
    // 格式化播放量
    function formatViews(views) {
      if (views >= 10000) {
        return (views / 10000).toFixed(1) + '万';
      }
      return views.toString();
    }
    
    // 渲染视频卡片
    function renderVideos(videos) {
      videos.forEach(video => {
        const card = document.createElement('div');
        card.className = 'video-card';
        card.innerHTML = `
          <img src="${video.cover}" alt="${video.title}" loading="lazy">
          <div class="video-loadinginfo">
            <div class="video-loadingtitle">${video.title}
               <span class="threedot">⋮</span>
        <div class="popup">
        <button>不感兴趣</button>
        <button>不想看up主</button>
        </div></div>
            <div class="video-meta">
              <span>${formatViews(video.views)}次观看</span>
              <span>${video.duration}</span>
            </div>
          </div>
        `;
        videoContainer.appendChild(card);
      });
    }
    
    // 加载视频数据
    async function loadVideos() {
      // 防止重复加载或没有更多数据时继续加载
      if (isLoading || !hasMoreData) return;
      
      isLoading = true;
      loading.classList.add('active');
      
      try {
        // 模拟API请求延迟
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // 生成视频数据（实际项目中替换为真实API请求）
        const videos = generateVideoData(page, itemsPerLoad);
        
        // 渲染视频
        renderVideos(videos);
        

        
        page++;
      } catch (error) {
        console.error('加载失败:', error);
        alert('加载视频失败，请重试');
      } finally {
        isLoading = false;
        loading.classList.remove('active');
      }
    }
    
    // 初始化加载更多视频
    async function loadInitialVideos() {
      // 直接加载足够多的初始视频（2行 = 10个）
      const initialVideos = generateVideoData(page,10);
      renderVideos(initialVideos);
      page++;
      
      // 确保页面有足够的高度可以滚动
      setTimeout(() => {
        if (document.documentElement.scrollHeight <= window.innerHeight + 100) {
          // 如果页面高度还是不够，再加载一行
          loadVideos();
        }
      }, 100);
    }
    
    // 监听滚动事件
    function handleScroll() {
      // 如果没有更多数据，停止监听
      if (!hasMoreData) return;
      
      // 计算滚动位置
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // 当滚动到距离底部300px时加载更多
      if (scrollTop + windowHeight >= documentHeight - 300) {
        loadVideos();
      }
    }
    
    // 初始化
    function init() {
      // 初始加载足够的视频
      loadInitialVideos();
      
      // 绑定滚动事件（使用节流优化性能）
      let scrollTimeout;
      window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(handleScroll, 100);
      });
    }
    
    // 页面加载完成后初始化
    window.addEventListener('DOMContentLoaded', init);
    // ================== 登录弹窗功能 ==================
const loginBtn = document.getElementById('loginBtn');
const loginModal = document.getElementById('loginModal');
const closeLogin = document.getElementById('closeLogin');

// 打开登录弹窗
loginBtn.addEventListener('click', function(e) {
  e.preventDefault();
  loginModal.classList.add('show');
});

// 关闭登录弹窗
closeLogin.addEventListener('click', function() {
  loginModal.classList.remove('show');
});

// 点击模态框背景关闭
loginModal.addEventListener('click', function(e) {
  if (e.target === loginModal) {
    loginModal.classList.remove('show');
  }
});

// ESC键关闭弹窗
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && loginModal.classList.contains('show')) {
    loginModal.classList.remove('show');
  }
});

// 选项卡切换
const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
  tab.addEventListener('click', function() {
    const tabId = this.getAttribute('data-tab');
    
    // 更新选项卡激活状态
    tabs.forEach(t => t.classList.remove('active'));
    this.classList.add('active');
    
    // 显示对应内容
    tabContents.forEach(content => {
      content.classList.remove('active');
      if (content.id === tabId + 'Tab') {
        content.classList.add('active');
      }
    });
  });
});

// 表单验证函数
function validateUsername(username) {
  // 用户名验证：4-16位，字母数字下划线，[a-zA-Z0-9_]：允许字母（大小写）、数字、下划线{4,16}：长度4到16位
  const usernameRegex = /^[a-zA-Z0-9_]{4,16}$/;
  return usernameRegex.test(username);
}

function validatePassword(password) {
  // 密码验证：6-20位，至少包含字母和数字
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/;
  return passwordRegex.test(password);
}

function validatePhone(phone) {
  // 手机号验证：中国手机号格式^1：以1开头[3-9]：第二位是3-9（中国手机号规则）\d{9}：后面9位数字总长度：11位
  const phoneRegex = /^1[3-9]\d{9}$/;
  return phoneRegex.test(phone);
}

function validateSMSCode(code) {
  // 验证码验证：6位数字
  const codeRegex = /^\d{6}$/;
  return codeRegex.test(code);
}

// 显示错误信息
function showError(inputElement, message) {
  const inputGroup = inputElement.parentElement;
  inputGroup.classList.add('error');
  
  let errorElement = inputGroup.querySelector('.error-message');
  if (!errorElement) {
    errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    inputGroup.appendChild(errorElement);
  }
  errorElement.textContent = message;
}

// 清除错误信息
function clearError(inputElement) {
  const inputGroup = inputElement.parentElement;
  inputGroup.classList.remove('error');
  
  const errorElement = inputGroup.querySelector('.error-message');
  if (errorElement) {
    errorElement.textContent = '';
  }
}

// 密码登录表单提交
const passwordForm = document.getElementById('passwordForm');
if (passwordForm) {
  passwordForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    let isValid = true;
    
    // 清除之前的错误信息
    clearError(document.getElementById('username'));
    clearError(document.getElementById('password'));
    
    // 验证用户名
    if (!username) {
      showError(document.getElementById('username'), '请输入账号');
      isValid = false;
    } else if (!validateUsername(username)) {
      showError(document.getElementById('username'), '账号格式错误：4-16位字母数字下划线');
      isValid = false;
    }
    
    // 验证密码
    if (!password) {
      showError(document.getElementById('password'), '请输入密码');
      isValid = false;
    } else if (!validatePassword(password)) {
      showError(document.getElementById('password'), '密码格式错误：6-20位，需包含字母和数字');
      isValid = false;
    }
    
    // 如果验证通过
    if (isValid) {
      // 这里应该是实际的登录请求
      console.log('登录信息：', { username, password });
      alert('登录成功！');
      loginModal.classList.remove('show');
      // 清空表单
      passwordForm.reset();
    }
  });
}

// 短信登录表单提交
const smsForm = document.getElementById('smsForm');
if (smsForm) {
  smsForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const countryCode = document.getElementById('countryCode').value;
    const phone = document.getElementById('phone').value.trim();
    const smsCode = document.getElementById('smsCode').value.trim();
    let isValid = true;
    
    // 清除之前的错误信息
    clearError(document.getElementById('phone'));
    clearError(document.getElementById('smsCode'));
    
    // 验证手机号
    if (!phone) {
      showError(document.getElementById('phone'), '请输入手机号');
      isValid = false;
    } else if (!validatePhone(phone)) {
      showError(document.getElementById('phone'), '手机号格式错误');
      isValid = false;
    }
    
    // 验证验证码
    if (!smsCode) {
      showError(document.getElementById('smsCode'), '请输入验证码');
      isValid = false;
    } else if (!validateSMSCode(smsCode)) {
      showError(document.getElementById('smsCode'), '验证码必须是6位数字');
      isValid = false;
    }
    
    // 如果验证通过
    if (isValid) {
      console.log('短信登录信息：', { 
        countryCode, 
        phone, 
        smsCode 
      });
      alert('登录/注册成功！');
      loginModal.classList.remove('show');
      // 清空表单
      smsForm.reset();
    }
  });
}

// 获取验证码功能
const getCodeBtn = document.getElementById('getCodeBtn');
if (getCodeBtn) {
  getCodeBtn.addEventListener('click', function() {
    const phone = document.getElementById('phone').value.trim();
    
    // 验证手机号
    if (!phone || !validatePhone(phone)) {
      showError(document.getElementById('phone'), '请输入正确的手机号');
      return;
    }
    
    // 禁用按钮并开始倒计时
    this.classList.add('disabled');
    this.disabled = true;
    
    let countdown = 60;
    this.textContent = `${countdown}秒后重试`;
    
    const timer = setInterval(() => {
      countdown--;
      this.textContent = `${countdown}秒后重试`;``
      
      if (countdown <= 0) {
        clearInterval(timer);
        this.classList.remove('disabled');
        this.disabled = false;
        this.textContent = '获取验证码';
      }
    }, 1000);
    
    // 模拟发送验证码
    console.log(`向${phone}发送验证码`);
    alert(`验证码已发送至 ${phone}，请注意查收`);
  });
}

// 第三方登录按钮
document.querySelectorAll('.social-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    const platform = this.classList.contains('wechat') ? '微信' :
                    this.classList.contains('weibo') ? '微博' : 'QQ';
    alert(`即将跳转到${platform}登录`);
  });
});

// 实时输入验证
document.querySelectorAll('#username, #password, #phone, #smsCode').forEach(input => {
  input.addEventListener('input', function() {
    clearError(this);
  });
});
function togglePopup(e) {
  e.preventDefault(); // 阻止默认行为
  e.stopPropagation(); // 阻止事件冒泡
  
  const popup = document.getElementById('simplePopup');
  
  // 切换显示/隐藏
  if (popup.style.display === 'block') {
    popup.style.display = 'none';
  } else {
    popup.style.display = 'block';
  }
}

function selectOption(option) {
  alert(`${option}`);
  document.getElementById('simplePopup').style.display = 'none';
}

// 添加：点击页面其他地方关闭弹窗
document.addEventListener('click', function(e) {
  const popup = document.getElementById('simplePopup');
  const link = document.querySelector('.forgot-password a');
  
  // 如果点击的不是弹窗和链接，则关闭弹窗
  if (!popup.contains(e.target) && e.target !== link) {
    popup.style.display = 'none';
  }
});
