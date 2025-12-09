
---
title: NINE OS 知識庫建置筆記
sidebar_label: 01. 網站架設流程
sidebar_position: 1
tags: [架站, Docusaurus, Obsidian, 教學]
---

這是一份關於如何建立本知識庫（Wiki）的完整紀錄。
採用 **Docusaurus** 作為網頁框架，**Obsidian** 作為寫作後台，並部署於 **Vercel**。

## 🛠️ 第一階段：環境準備 (必備工具)

在開始之前，必須安裝以下軟體（全部按下一步安裝到底即可）：

1.  **[Node.js (LTS版本)](https://nodejs.org/)**
    * 用途：網站的運作引擎。
    * *驗證：* 安裝後在終端機輸入 `node -v` 確認版本。
2.  **[Git](https://git-scm.com/downloads)**
    * 用途：版本控制，上傳雲端必備。
3.  **[VS Code](https://code.visualstudio.com/)**
    * 用途：專案管理、執行指令、推送代碼。
4.  **[Obsidian](https://obsidian.md/)**
    * 用途：舒適的寫作環境，圖文編輯。

---

## 🏗️ 第二階段：建立網站骨架

1.  開啟 **VS Code**。
2.  按下 `Ctrl + ~` 開啟終端機 (Terminal)。
3.  移動到桌面（或你想存放的位置）：
    ```bash
    cd Desktop
    ```
4.  輸入安裝指令 (專案名稱可自訂)：
    ```bash
    npx create-docusaurus@latest bluz-j-note classic
    ```
5.  選擇 **JavaScript** (用鍵盤上下鍵選擇後按 Enter)。
6.  等待安裝完成 (顯示 `Success!`)。

---

## ⚙️ 第三階段：Obsidian 寫作環境調校 (關鍵！)

為了讓 Obsidian 能完美配合 Docusaurus，必須進行「相容性設定」。

### 1. 開啟專案
* 打開 Obsidian -> **Open folder as vault (開啟資料夾為儲存庫)**。
* ⚠️ **注意：** 選擇整個專案資料夾 `bluz-j-note` (不要只選 docs)。

### 2. 核心設定 (Settings)
進入 **設定 (齒輪圖示)** -> **檔案與連結 (Files & Links)**：

* **使用 Wiki 連結 (Use Wiki links)**：❌ **關閉 (Off)**
    * *原因：網站看不懂 `[[]]` 這種語法，必須強制用標準 Markdown `[]()`。*
* **新附件的預設位置 (Default location for new attachments)**：
    * 👉 選擇：**目前開啟檔案所在的資料夾 (Same folder as current file)**
    * *原因：讓圖片跟著文章走，方便管理與預覽。*
* **排除的檔案 (Excluded files)**：
    * 新增以下規則：`node_modules`、`.docusaurus`、`build`
    * *原因：防止 Obsidian 讀取系統垃圾檔，加快速度。*

---

## 📝 第四階段：建立標準化範本

為了讓新文章自動擁有正確的標題格式 (Front Matter)，我們設定自動範本。

1.  在 `docs` 資料夾內，建立一個新資料夾 `_Templates`。
    * *技巧：前面加底線 `_`，網頁編譯時就會自動隱藏它。*
2.  在裡面建立一個檔案 `New Doc.md`，內容如下：
    ```yaml
    ---
    title: 
    sidebar_label: 
    tags: []
    ---
    ```
    *(注意：冒號後面必須留一個空格)*
3.  進入 Obsidian 設定 -> **核心外掛** -> 開啟 **範本 (Templates)**。
4.  進入範本設定頁 -> **範本資料夾位置** -> 選擇 `docs/_Templates`。

---

## 🚀 第五階段：日常寫作流程 (SOP)

### 1. 寫新文章
1.  在 Obsidian 按 `Ctrl+N` 新增檔案。
2.  命名檔案：使用 **4碼編號+英文** (例：`0010-ninja-gaiden`)。
3.  插入範本：點擊「插入範本」按鈕 (或設定快捷鍵 `Alt+T`)。
4.  填寫標題：在 `title:` 後面寫上中文標題 (例：`忍者外傳`)。

### 2. 插入圖片
1.  直接截圖 (`Win + Shift + S`)。
2.  在文章內直接貼上 (`Ctrl + V`)。
3.  圖片會自動存到文章旁邊，語法會長這樣：
    ```markdown
    ![](Pasted image 2025....png)
    ```
    *(無需手動修改路徑，網站與預覽皆可正常顯示)*

### 3. 預覽網站
1.  打開 VS Code 終端機。
2.  輸入指令：
    ```bash
    npm run start
    ```
3.  打開瀏覽器 `http://localhost:3000` 觀看成果。

---

## 🐞 常見問題與除錯

| 狀況               | 原因         | 解法                                               |
| :--------------- | :--------- | :----------------------------------------------- |
| **網頁出現紅字 Error** | 檔案格式錯誤     | 檢查 YAML (`---`) 冒號後有無空格、`sidebar_position` 是否留白。 |
| **標題沒更新**        | 緩存 (Cache) | 在 VS Code 按 `Ctrl+C` 停止，重新 `npm run start`。      |
| **圖片破圖**         | 路徑錯誤       | 確認圖片是否在文章旁邊，且語法為相對路徑 `![](圖片.png)`。              |