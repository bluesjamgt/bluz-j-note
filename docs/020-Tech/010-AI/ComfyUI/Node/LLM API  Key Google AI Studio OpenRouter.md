#  2025-12-11｜LLM API 串接與開發日誌 (ComfyUI / RAG)

### 1. 核心資源申請流程

###  Google AI Studio (原廠核心)

這是取得免費且強大模型 (Gemini) 的源頭。

- **目標：** 取得 原廠 API Key。
- **流程：**
    1. 前往 [**Google AI Studio**](https://aistudio.google.com/?authuser=2)。
    2. 登入 Google 帳號。
    3. 點擊左側 **"Get API key"** -> **"Create API key"**。
    4. 選擇 "Create in new project" (若無專案)。
    5. **保存 Key**。
- **注意：** 預設為 **Free Tier** (免費層級)，每日請求限制約 1500 次，輸入資料會被 Google 用於優化模型。

### 🔌 OpenRouter (萬能轉接頭)

這是為了解決 ComfyUI 節點對 OpenAI 格式相容性問題的最佳方案。

- **目標：** 取得標準化 Key，並管理模型路由。
- **流程：**
    1. 前往 [**OpenRouter.ai**](https://openrouter.ai/) 並登入。
    2. 點擊頭像 -> **Keys** -> **Create Key**。
    3. 輸入名稱 (如 "ComfyUI") -> Create -> **複製 Key (只顯示一次)**。
- **進階設定 (BYOK - Bring Your Own Key)：**
    - 為了使用自己的 Google 免費額度，需前往 [**Integrations Settings**](https://openrouter.ai/settings/integrations)。
    - 在 "Google AI Studio" 欄位貼上 原廠 Key。

---

### 2. ComfyUI 節點設定參數對照表

針對 **OpenAI Compatible Node** (如 `Runninghub LLM API Node`) 的填寫規範。

| **設定項目**                                  | **方案 A：OpenRouter (推薦/穩定)**    | **方案 B：Google 直連 (備用/嚴格)**                                 |
| ----------------------------------------- | ------------------------------ | ---------------------------------------------------------- |
| **API Base URL**                          | `https://openrouter.ai/api/v1` | `https://generativelanguage.googleapis.com/v1beta/openai/` |
| **API Key**                               | 填入 OpenRouter Key)             | 填入 (Google Key)                                            |
| **Model Name**                            | **必須加上廠商前綴**                   |                                                            |
| • 公用免費：`google/gemini-2.0-flash-exp:free` |                                |                                                            |
| • 穩定免費：`google/gemini-flash-1.5-8b:free`  |                                |                                                            |
| • 自帶 Key：`google/gemini-flash-1.5`        | **僅填型號**                       |                                                            |
| • `gemini-1.5-flash`                      |                                |                                                            |
| • `models/gemini-1.5-flash`               |                                |                                                            |
| _(視節點相容性而定)_                              |                                |                                                            |
| **優點**                                    | 格式絕對相容，不會報 404 路徑錯誤。           | 少一層轉發，理論延遲最低。                                              |
| **缺點**                                    | 需注意免費公車 (:free) 容易塞車 (429)。    | 節點對 URL 處理不佳時容易連線失敗。                                       |

### 3. 未來專案：自我介紹 RAG 機器人 (Resume Bot)

### 專案目標

開發一個能回答關於經歷、技能、作品集的 AI 機器人，用於求職或個人展示。

### 技術架構構想

- **核心模型：** **Gemini 1.5 Flash** (利用其 100萬 Token 超大 Context Window)。
    
- **策略：** **Long Context RAG (長文本全量讀取)**。
    
    - 不使用向量資料庫 (Vector DB) 切片，避免碎片化資訊遺失。
    - 直接將整份履歷、自傳、作品集文字放入 `System Prompt`。
- **Prompt 結構範例：**Plaintext
    
    `Role: 你是 [] 的專屬面試替身。 Context: 以下是我的完整履歷資料： (貼上所有文字資料...) Task: 請依據上述資料，以專業且自信的語氣回答面試官的問題。若資料中未提及，請回答「這部分需要您親自詢問本人」。`
    

---

### 4. 開發日誌狀態 (Current Status)

- **日期：** 2025-12-11
- **測試環境：** ComfyUI / Runninghub LLM API Node
- **遭遇問題：**
    - **直連 Google：** 因節點自動添加 `/v1` 路徑，導致 Google API 回傳 `404 Not Found` (路徑錯誤)。
    - **OpenRouter (BYOK)：** 綁定 Key 後使用標準名稱 (`google/gemini-flash-1.5`)，遭遇到 `404 No endpoints found`，推測是 OpenRouter 針對 0 餘額帳號的路由限制或 Google 模型標籤更新導致。
    - **OpenRouter (Public Free)：** 使用帶有 `:free` 後綴的模型 (`google/gemini-2.0-flash-exp:free`) **成功連線並生成內容**，但極易遇到 `429 Rate Limit` (塞車)。
- **目前結論：**
    - 暫時使用 OpenRouter 的 `:free` 通道進行小規模測試。
    - **最佳穩定解法：** 建議改用 **`google/gemini-flash-1.5-8b:free`**，該模型目前在 OpenRouter 上較少人排隊，成功率最高。