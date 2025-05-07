// Обработка прокрутки для общего параллакса

window.addEventListener('scroll', () => {
    document.querySelectorAll('.parallax').forEach(el => {
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const scrollPercent = 1 - rect.top / windowHeight;
      const maxTranslate = 50;
      const translateX = (scrollPercent - 0.5) * 2 * maxTranslate;
      el.style.transform = `translateX(${translateX}px)`;
    });
  });
  
  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }
  
  // Логика для слоя внутри окна
  const specialWindow = document.getElementById('special-window');
  const layers = specialWindow.querySelectorAll('.layer');
  
  window.addEventListener('scroll', () => {
    const rect = specialWindow.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const scrollProgress = 1 - rect.top / windowHeight;
  
    const container = specialSection.querySelector('.parallax-container');
    const containerRect = container.getBoundingClientRect();
    const containerWidth = containerRect.width;
    const containerHeight = containerRect.height;
  
    layers.forEach(layer => {
      const speedX = parseFloat(layer.getAttribute('data-speed-x')) || 0;
      const speedY = parseFloat(layer.getAttribute('data-speed-y')) || 0;
  
      const layerRect = layer.getBoundingClientRect();
      const layerWidth = layerRect.width;
      const layerHeight = layerRect.height;
  
      const maxShiftX = (layerWidth / (containerWidth / layerWidth)) * speedX / 2;
      const maxShiftY = (layerHeight / (containerHeight / layerHeight)) * speedY / 2;
  
      let translateX = (scrollProgress - 0.5) * 2 * 100 * speedX;
      let translateY = (scrollProgress - 0.5) * 2 * 100 * speedY;
  
      translateX = clamp(translateX, -maxShiftX, maxShiftX);
      translateY = clamp(translateY, -maxShiftY, maxShiftY);
  
      layer.style.transform = `translate(${translateX}px, ${translateY}px)`;
    });
  });
  
  const specialSection = document.querySelectorAll('.section')[1];
  const layers2 = specialSection.querySelectorAll('.layer2');
  
  window.addEventListener('scroll', () => {
    // Обработка для первой секции
    document.querySelectorAll('.parallax').forEach(el => {
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const scrollPercent = 1 - rect.top / windowHeight;
      const maxTranslate = 50;
      const translateX = (scrollPercent - 0.5) * 2 * maxTranslate;
      el.style.transform = `translateX(${translateX}px)`;
    });
  
    // Обработка для второй секции
    const rect2 = specialSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const scrollProgress2 = 1 - rect2.top / windowHeight;
  
    const maxShift2 = 100;
  
    layers2.forEach(layer => {
      const speedX = parseFloat(layer.getAttribute('data-speed-x')) || 0;
      const speedY = parseFloat(layer.getAttribute('data-speed-y')) || 0;
  
      let translateX = (scrollProgress2 - 0.5) * -2 * maxShift2 * speedX;
      let translateY = (scrollProgress2 - 0.5) * -2 * maxShift2 * speedY;
  
      translateX = clamp(translateX, -maxShift2, maxShift2);
      translateY = clamp(translateY, -maxShift2, maxShift2);
  
      layer.style.transform = `translate(${translateX}px, ${translateY}px)`;
    });
  });
  
let animationPlayed = false;
  window.addEventListener('scroll', () => {
    const rightWindow = document.querySelector('.window.right');
    const rect3 = rightWindow.getBoundingClientRect();
    const windowHeight1 = window.innerHeight;

    if (rect3.top < windowHeight1 && rect3.bottom > 0) {
      if (!animationPlayed) {
        rightWindow.style.animation = 'ani 2s ease-in-out 1 forwards';
        animationPlayed = true; // больше не запускать
      }
        rightWindow.classList.add('visible');
    } else {
      rightWindow.classList.remove('visible');
      }
  });