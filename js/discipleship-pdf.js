// 通用门徒训练PDF查看器
(function() {
    'use strict';

    // 配置
    const PDF_JS_CDN = 'https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.min.js';
    const PDF_WORKER_CDN = 'https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js';

    let pdfDoc = null;
    let currentPage = 1;
    let totalPages = 0;
    let pdfUrl = '';
    let scale = 1.5;

    // 加载pdf.js库
    function loadScript(src) {
        return new Promise((resolve, reject) => {
            if (window.pdfjsLib) {
                resolve();
                return;
            }
            const script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    // 初始化PDF查看器
    async function initPDFViewer(containerId, url) {
        // URL-encode to handle Chinese characters and spaces in filenames
        const encodedUrl = encodeURI(url);
        pdfUrl = encodedUrl;
        const container = document.getElementById(containerId);
        if (!container) return;

        // 替换内容为PDF查看器结构
        container.innerHTML = `
            <div class="pdf-loading" style="text-align: center; padding: 40px; color: #666;">
                <p>PDF加载中...</p>
            </div>
            <div class="pdf-canvas-wrapper" style="display: none; text-align: center; overflow: auto;">
                <canvas id="${containerId}-canvas" style="max-width: 100%; box-shadow: 0 2px 8px rgba(0,0,0,0.15);"></canvas>
            </div>
            <div class="pdf-error" style="display: none; text-align: center; padding: 40px; color: #999;">
                <p>PDF加载失败，请尝试下载后查看</p>
            </div>
            <div class="pdf-nav" style="display: none; justify-content: center; align-items: center; gap: 15px; padding: 15px; background: #f5f5f5; border-top: 1px solid #eee; margin-top: 10px;">
                <button id="${containerId}-prev" class="pdf-nav-btn" style="background: #1890ff; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">上一页</button>
                <span class="pdf-page-info" style="color: #666; font-size: 0.9rem;">
                    <input id="${containerId}-input" type="number" value="1" min="1" style="width: 50px; text-align: center; padding: 4px; border: 1px solid #ddd; border-radius: 4px;"> / <span id="${containerId}-total">1</span>
                </span>
                <button id="${containerId}-next" class="pdf-nav-btn" style="background: #1890ff; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">下一页</button>
            </div>
        `;

        try {
            await loadScript(PDF_JS_CDN);
            pdfjsLib.GlobalWorkerOptions.workerSrc = PDF_WORKER_CDN;

            pdfDoc = await pdfjsLib.getDocument({
                url: encodedUrl,
                cMapUrl: 'https://unpkg.com/pdfjs-dist@3.11.174/cmaps/',
                cMapPacked: true,
                verbosity: pdfjsLib.VerbosityLevel.ERRORS
            }).promise;

            totalPages = pdfDoc.numPages;
            currentPage = 1;

            container.querySelector('.pdf-loading').style.display = 'none';
            container.querySelector('.pdf-canvas-wrapper').style.display = 'block';
            container.querySelector('.pdf-nav').style.display = 'flex';

            document.getElementById(`${containerId}-total`).textContent = totalPages;

            // 绑定事件
            document.getElementById(`${containerId}-prev`).addEventListener('click', () => {
                if (currentPage > 1) {
                    currentPage--;
                    renderPdfPage(containerId, currentPage);
                }
            });
            document.getElementById(`${containerId}-next`).addEventListener('click', () => {
                if (currentPage < totalPages) {
                    currentPage++;
                    renderPdfPage(containerId, currentPage);
                }
            });
            document.getElementById(`${containerId}-input`).addEventListener('change', (e) => {
                const num = parseInt(e.target.value);
                if (num >= 1 && num <= totalPages) {
                    currentPage = num;
                    renderPdfPage(containerId, currentPage);
                }
            });

            renderPdfPage(containerId, currentPage);
        } catch (error) {
            console.error('PDF加载失败:', error);
            container.querySelector('.pdf-loading').style.display = 'none';
            container.querySelector('.pdf-error').style.display = 'block';
        }
    }

    async function renderPdfPage(containerId, pageNum) {
        if (!pdfDoc) return;
        const canvas = document.getElementById(`${containerId}-canvas`);
        const ctx = canvas.getContext('2d');

        try {
            const page = await pdfDoc.getPage(pageNum);
            const viewport = page.getViewport({ scale: scale });
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            await page.render({
                canvasContext: ctx,
                viewport: viewport
            }).promise;

            document.getElementById(`${containerId}-input`).value = pageNum;
            document.getElementById(`${containerId}-prev`).disabled = pageNum <= 1;
            document.getElementById(`${containerId}-next`).disabled = pageNum >= totalPages;

            // Auto-scroll to the PDF canvas so the user sees it immediately
            canvas.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } catch (error) {
            console.error('PDF渲染失败:', error);
        }
    }

    // 暴露到全局
    window.initPDFViewer = initPDFViewer;
})();
