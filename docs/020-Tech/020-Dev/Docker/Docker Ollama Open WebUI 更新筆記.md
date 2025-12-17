
---

## 1. 前置檢查作業 (Pre-requisites)

在執行任何容器操作指令前，必須確保以下系統狀態，以避免連接埠衝突或執行失敗。

1. **確認 Docker 引擎運作中**
    
    - 開啟 Docker Desktop 應用程式。
        
    - 確認左下角狀態列顯示綠色 **`Engine running`**。
        
2. **終止本機 Ollama 服務**
    
    - 檢查 Windows 系統匣 (System Tray)，確認無 Ollama 圖示（羊駝圖示）。
        
    - 若有，請右鍵點擊並選擇 **`Quit Ollama`**，以釋放 `11434` 連接埠。
        

---

## 2. Ollama 核心服務升級流程

本節說明如何更新後端推論引擎，並確保容器正確掛載 Windows 本機模型儲存庫。

### 步驟 2.1：移除舊版容器

執行以下指令強制停止並移除舊有容器實例。 _(註：此操作僅移除執行環境，不影響模型檔案。)_

PowerShell

```
docker rm -f ollama
```

### 步驟 2.2：下載最新映像檔 (Pull Image)

從 Docker Hub 取得最新版 Ollama 映像檔。

PowerShell

```
docker pull ollama/ollama
```

### 步驟 2.3：啟動服務 (Deploy Container)

**關鍵配置說明：**

- `--gpus=all`：啟用 NVIDIA GPU 加速。
    
- `-v "C:\Users\Blu\.ollama:/root/.ollama"`：**綁定掛載 (Bind Mount)**。強制容器讀取主機 `C:\Users\Blu\.ollama` 路徑下的模型檔案，而非使用容器內部儲存空間。
    

請複製並執行以下完整指令：

PowerShell

```
docker run -d --gpus=all -v "C:\Users\Blu\.ollama:/root/.ollama" -p 11434:11434 --name ollama ollama/ollama
```

### 步驟 2.4：驗證服務狀態

執行以下指令確認 GPU 掛載與模型讀取狀態。

PowerShell

```
# 1. 驗證 GPU 存取權限 (應顯示 RTX 5070 Ti 資訊)
docker exec -it ollama nvidia-smi

# 2. 驗證模型清單 (應顯示本機已下載之模型)
docker exec -it ollama ollama list
```

---

## 3. Open WebUI 介面升級流程

本節說明如何更新前端網頁介面，並確保對話紀錄資料庫（SQLite/Vector DB）正確繼承。

### 步驟 3.1：移除舊版容器

PowerShell

```
docker rm -f open-webui
```

### 步驟 3.2：下載最新映像檔

PowerShell

```
docker pull ghcr.io/open-webui/open-webui:main
```

### 步驟 3.3：啟動服務 (Deploy Container)

**關鍵配置說明：**

- `-v open-webui:/app/backend/data`：使用 Docker **Volume** 儲存應用程式資料（使用者設定、對話紀錄）。**請勿更更動此參數名稱**，否則將導致資料遺失。
    
- `--add-host=host.docker.internal:host-gateway`：允許容器與主機網路通訊（連接 Ollama）。
    

請複製並執行以下完整指令：

PowerShell

```
docker run -d -p 3000:8080 --add-host=host.docker.internal:host-gateway -v open-webui:/app/backend/data --name open-webui --restart always ghcr.io/open-webui/open-webui:main
```

### 步驟 3.4：驗證服務狀態

1. 開啟瀏覽器存取 `http://localhost:3000`。
    
2. 確認版本號已更新。
    
3. 確認左側歷史對話紀錄完整保留。
    

---

## 4. 故障排除與關鍵配置說明 (Troubleshooting)

### 4.1 模型遺失問題 (Model Not Found)

- **原因：** 啟動 Ollama 時使用了錯誤的 Volume 參數（如 `-v ollama:/root/.ollama`），導致容器建立全新的空資料夾。
    
- **解決方案：** 必須使用 **步驟 2.3** 中的絕對路徑掛載方式，明確指向 Windows 使用者目錄下的 `.ollama` 資料夾。
    

### 4.2 啟動失敗或連接埠被佔用 (Port Conflict)

- **錯誤訊息：** `Bind for 0.0.0.0:11434 failed: port is already allocated`。
    
- **原因：** Windows 本機安裝的 Ollama 程式正在執行。
    
- **解決方案：** 參照 **步驟 1**，完全關閉 Windows 版 Ollama 應用程式。
    

### 4.3 Open WebUI 資料遺失

- **原因：** 啟動指令中更換了 Volume 名稱（例如未指定 `-v open-webui:...`）。
    
- **解決方案：** Open WebUI 的資料儲存於 Docker 內部 Volume。務必確保每次升級時，`-v` 參數後的來源名稱（`open-webui`）保持一致。