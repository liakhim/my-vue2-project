// Принудительное скрытие системного header Telegram
(function hideTelegramHeader() {
    const styles = `
    .tg-head, 
    .tg-header, 
    [class*="header"], 
    [class*="Header"] {
      display: none !important;
      opacity: 0 !important;
      height: 0 !important;
      min-height: 0 !important;
      padding: 0 !important;
      margin: 0 !important;
    }
    
    body {
      margin-top: 0 !important;
      padding-top: 0 !important;
    }
    
    .tgweb-container {
      padding-top: 0 !important;
    }
  `;

    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);

    // Периодическая проверка и скрытие
    setInterval(() => {
        const headers = document.querySelectorAll('.tg-head, .tg-header, header, [class*="header"], [class*="Header"]');
        headers.forEach(header => {
            header.style.display = 'none';
            header.style.opacity = '0';
            header.style.height = '0';
        });
    }, 100);
})();